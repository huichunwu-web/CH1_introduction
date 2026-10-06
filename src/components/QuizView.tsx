import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion, StudentProfile, QuizResult, CourseSection } from '../types';
import { QUICK_QUIZ_10_QUESTIONS } from '../data/quizQuestions';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileDown, 
  ChevronRight, 
  Flame, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';
import { openPrintCertificate } from '../utils/pdfExport';

interface QuizViewProps {
  student: StudentProfile;
  onViewCertificateTab: (lastResult: QuizResult) => void;
  lastQuizResult: QuizResult | null;
  setLastQuizResult: (res: QuizResult) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  student,
  onViewCertificateTab,
  lastQuizResult,
  setLastQuizResult
}) => {
  // Quiz Setup States
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  
  // Active Exam States
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<number[]>([]);
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  const [userAnswersRecord, setUserAnswersRecord] = useState<Record<string, number[]>>({});
  
  // Stats & Combo
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Initialize or restart quiz (dedicated 10 questions)
  const startQuiz = (customQuestions?: QuizQuestion[]) => {
    soundManager.playClick();
    const questionsToUse = (customQuestions && customQuestions.length > 0)
      ? [...customQuestions]
      : [...QUICK_QUIZ_10_QUESTIONS];

    setCurrentQuestions(questionsToUse);
    setCurrentIndex(0);
    setSelectedOptionIndices([]);
    setHasSubmittedCurrent(false);
    setUserAnswersRecord({});
    setCombo(0);
    setMaxCombo(0);
    setTimerSeconds(0);
    setIsExamStarted(true);
    setIsExamCompleted(false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQ = currentQuestions[currentIndex];

  // Option selection
  const handleToggleOption = (optIndex: number) => {
    if (hasSubmittedCurrent) return;
    soundManager.playClick();

    if (currentQ.type === 'multiple') {
      // Multiple selection
      if (selectedOptionIndices.includes(optIndex)) {
        setSelectedOptionIndices(selectedOptionIndices.filter((i) => i !== optIndex));
      } else {
        setSelectedOptionIndices([...selectedOptionIndices, optIndex]);
      }
    } else {
      // Single choice or T/F
      setSelectedOptionIndices([optIndex]);
    }
  };

  // Submit Answer for current question
  const handleSubmitAnswer = () => {
    if (selectedOptionIndices.length === 0 || hasSubmittedCurrent) return;

    // Check correctness
    const correct = currentQ.correctAnswers;
    const isCorrect =
      selectedOptionIndices.length === correct.length &&
      selectedOptionIndices.every((val) => correct.includes(val));

    if (isCorrect) {
      soundManager.playCorrect(); // 答對音效
      setCombo((prev) => {
        const next = prev + 1;
        if (next > maxCombo) setMaxCombo(next);
        return next;
      });
    } else {
      soundManager.playWrong(); // 答錯音效
      setCombo(0);
    }

    setUserAnswersRecord((prev) => ({
      ...prev,
      [currentQ.id]: selectedOptionIndices
    }));
    setHasSubmittedCurrent(true);
  };

  // Move to next question or complete exam
  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndices([]);
      setHasSubmittedCurrent(false);
    } else {
      finishExam();
    }
  };

  // Finish exam
  const finishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    const sectionScores: Record<CourseSection, { correct: number; total: number }> = {
      sec1_history: { correct: 0, total: 0 },
      sec2_cuisines: { correct: 0, total: 0 },
      sec3_world: { correct: 0, total: 0 },
      sec4_trends: { correct: 0, total: 0 }
    };

    currentQuestions.forEach((q) => {
      const chosen = userAnswersRecord[q.id] || (q.id === currentQ.id ? selectedOptionIndices : []);
      const isCorrect =
        chosen.length === q.correctAnswers.length &&
        chosen.every((val) => q.correctAnswers.includes(val));

      if (sectionScores[q.section]) {
        sectionScores[q.section].total += 1;
        if (isCorrect) {
          sectionScores[q.section].correct += 1;
          correctCount += 1;
        }
      }
    });

    const finalScore = Math.round((correctCount / currentQuestions.length) * 100);

    const result: QuizResult = {
      studentProfile: student,
      totalQuestions: currentQuestions.length,
      correctCount,
      score: finalScore,
      timeSpentSeconds: timerSeconds,
      date: new Date().toLocaleString('zh-TW'),
      sectionScores,
      userAnswers: { ...userAnswersRecord, [currentQ.id]: selectedOptionIndices }
    };

    setLastQuizResult(result);
    setIsExamCompleted(true);
    soundManager.playFanfare();

    // Trigger celebration confetti
    if (finalScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Re-attempt only the wrong questions
  const handleRetryWrongQuestions = () => {
    if (!lastQuizResult) return;
    const wrongQuestions = currentQuestions.filter((q) => {
      const chosen = lastQuizResult.userAnswers[q.id] || [];
      const isCorrect =
        chosen.length === q.correctAnswers.length &&
        chosen.every((v) => q.correctAnswers.includes(v));
      return !isCorrect;
    });

    if (wrongQuestions.length > 0) {
      startQuiz(wrongQuestions);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {!isExamStarted ? (
        /* Quiz Entry / Mode Selection Screen */
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 text-white shadow-lg text-center md:text-left relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
                  <Award size={14} />
                  <span>實戰模擬測驗系統</span>
                </div>
                <h2 className="text-3xl font-black">餐飲常識 ‧ 第1章 導論測驗</h2>
                <p className="text-amber-100 text-sm max-w-lg leading-relaxed">
                  包含單選題、是非題、複選情境題。作答立即提供音效回饋，測驗完畢可匯出帶有學號姓名的正式 PDF 成績證明！
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-200">
                  <span>👤 受試學員：<strong>{student.name}</strong> ({student.studentId})</span>
                  <span>⏱️ 答題計時評分</span>
                  <span>🔊 悅耳音效反饋</span>
                </div>
              </div>

              <button
                onClick={() => startQuiz()}
                className="px-8 py-4 bg-white text-orange-600 hover:bg-amber-50 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap text-lg"
              >
                <Play fill="currentColor" size={20} />
                <span>立即開始測驗</span>
              </button>
            </div>
          </div>

          {/* Dedicated 10-Question Sprint Quiz Card */}
          <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Zap size={18} className="text-amber-600" />
                <span>快速衝刺測驗規範 (固定精選 10 題)</span>
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200">
                10 題核心精華
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/70 to-orange-50/70 border border-amber-200 text-xs sm:text-sm text-gray-800 space-y-2.5">
              <p className="leading-relaxed font-medium">
                本測驗精選第1章導論<strong>全體 10 題核心知識點</strong>，適合課堂快速檢測、隨堂測驗與重點複習：
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 pl-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>1. 中華烹飪用具與火演進（火➔石➔陶銅➔鐵）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>2. 一次機能特性（維持生命營養）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>3. 二次機能特性（感官色香味與食感性）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>4. 三次機能特性（兒茶素生理調節）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>5. 食品機能性交集核心（安全衛生）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>6. 四次機能特性（茶道精神文化）</span>
                </li>
                <li className="flex items-center gap-1.5 text-amber-900 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                  <span>7. 國菜與宮廷第二大菜系（蘇菜／淮揚菜）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>8. 八大菜系之首北食代表（魯菜風味）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>9. 孔府菜名言理念（食不厭精膾不厭細）</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>10. 民間最大特色菜系（川菜調味）</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <span>⏱️ 作答時間約 3-5 分鐘 ‧ 作答即時播放音效反饋</span>
              <button
                onClick={() => startQuiz()}
                className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Play size={14} fill="currentColor" />
                <span>開始 10 題測驗</span>
              </button>
            </div>
          </div>

          {/* Last Result Mini Card if available */}
          {lastQuizResult && (
            <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  上次測驗紀錄
                </span>
                <div className="text-lg font-black text-gray-900 mt-1">
                  得分：{lastQuizResult.score} 分 ({lastQuizResult.correctCount}/{lastQuizResult.totalQuestions} 題)
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  受試者：{lastQuizResult.studentProfile.name} ‧ {lastQuizResult.date}
                </div>
              </div>
              <button
                onClick={() => onViewCertificateTab(lastQuizResult)}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <FileDown size={14} />
                <span>查看成績單 & PDF</span>
              </button>
            </div>
          )}
        </div>
      ) : isExamCompleted ? (
        /* Quiz Finished Result Screen */
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-lg text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Award size={40} />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                測驗成果結算
              </span>
              <h2 className="text-3xl font-black text-gray-900 mt-2">
                {student.name} 的測驗成績：{lastQuizResult?.score ?? 0} 分
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                學號：{student.studentId} ‧ 耗時 {Math.floor(timerSeconds / 60)} 分 {timerSeconds % 60} 秒 ‧ 最高連擊：{maxCombo} 連對
              </p>
            </div>

            {/* Score Metrics */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div>
                <div className="text-xs text-gray-500 font-medium">答對率</div>
                <div className="text-2xl font-black text-emerald-600">
                  {lastQuizResult ? Math.round((lastQuizResult.correctCount / lastQuizResult.totalQuestions) * 100) : 0}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">答對題數</div>
                <div className="text-2xl font-black text-amber-600">
                  {lastQuizResult?.correctCount} / {lastQuizResult?.totalQuestions}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">評定等第</div>
                <div className="text-2xl font-black text-blue-600">
                  {((lastQuizResult?.score ?? 0) >= 90) ? 'A+' : ((lastQuizResult?.score ?? 0) >= 75) ? 'A' : ((lastQuizResult?.score ?? 0) >= 60) ? 'B' : 'C'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  if (lastQuizResult) openPrintCertificate(lastQuizResult);
                }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <FileDown size={18} />
                <span>匯出 / 列印 PDF 成績證明單</span>
              </button>

              {lastQuizResult && lastQuizResult.correctCount < lastQuizResult.totalQuestions && (
                <button
                  onClick={handleRetryWrongQuestions}
                  className="px-6 py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  <span>重練錯題 ({lastQuizResult.totalQuestions - lastQuizResult.correctCount} 題)</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsExamStarted(false);
                }}
                className="px-5 py-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-xl cursor-pointer"
              >
                回測驗首頁
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={20} className="text-amber-600" />
              <span>本回測驗題目詳解與檢視</span>
            </h3>

            <div className="space-y-4">
              {currentQuestions.map((q, idx) => {
                const userChoice = userAnswersRecord[q.id] || [];
                const isCorrect =
                  userChoice.length === q.correctAnswers.length &&
                  userChoice.every((v) => q.correctAnswers.includes(v));

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-red-50/40 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle size={18} className="text-red-600 shrink-0" />
                        )}
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-700">
                          第 {idx + 1} 題 ‧ {q.sectionName.split(' ')[0]}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {q.type === 'multiple' ? '【複選題】' : q.type === 'tf' ? '【是非題】' : '【單選題】'}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm mt-2 leading-relaxed">
                      {q.question}
                    </h4>

                    {/* Options status */}
                    <div className="mt-3 space-y-1.5 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice.includes(optIdx);
                        const isAnswer = q.correctAnswers.includes(optIdx);

                        let badgeStyle = 'border-gray-200 bg-white text-gray-700';
                        if (isAnswer && isChosen) {
                          badgeStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold';
                        } else if (isAnswer && !isChosen) {
                          badgeStyle = 'border-emerald-400 bg-emerald-50 text-emerald-800 font-bold';
                        } else if (!isAnswer && isChosen) {
                          badgeStyle = 'border-red-400 bg-red-100 text-red-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg border flex items-center justify-between ${badgeStyle}`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            <div className="flex items-center gap-1.5 text-[11px]">
                              {isChosen && <span className="text-gray-600 font-normal">[你的選擇]</span>}
                              {isAnswer && <span className="text-emerald-700 font-bold">✓ 正確答案</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="mt-3 p-3 bg-white/80 rounded-xl border border-gray-200 text-xs text-gray-700">
                      <strong className="text-amber-800">解析要點：</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Active Exam Question Screen */
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Top Progress & Stats Bar */}
          <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                題號 {currentIndex + 1} / {currentQuestions.length}
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline">
                {currentQ.sectionName.split(' ')[0]}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              {combo >= 2 && (
                <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-200 animate-pulse">
                  <Flame size={14} />
                  <span>{combo} 連對！</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock size={15} />
                <span className="font-mono">
                  {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
                  {(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-md space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  {currentQ.type === 'multiple' ? '複選題' : currentQ.type === 'tf' ? '是非題' : '單選題'}
                </span>
                <span className="text-xs text-gray-400">
                  難度：{currentQ.difficulty === 'easy' ? '基礎' : currentQ.difficulty === 'medium' ? '中等' : '進階'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = selectedOptionIndices.includes(optIdx);
                const isCorrect = currentQ.correctAnswers.includes(optIdx);

                let optClass = 'border-gray-200 bg-gray-50/70 hover:bg-amber-50/60 hover:border-amber-300 text-gray-800';

                if (hasSubmittedCurrent) {
                  if (isCorrect) {
                    optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'border-red-400 bg-red-50 text-red-950 line-through';
                  } else {
                    optClass = 'border-gray-200 bg-gray-50 opacity-60 text-gray-500';
                  }
                } else if (isSelected) {
                  optClass = 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-300';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleToggleOption(optIdx)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between select-none ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{optText}</span>
                    </div>

                    {hasSubmittedCurrent && (
                      <div>
                        {isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle size={18} className="text-red-500" />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Instant Feedback Panel if submitted */}
            {hasSubmittedCurrent && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 animate-fadeIn text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles size={14} className="text-amber-600" />
                    詳解要點說明
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Submit / Next Button */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                {currentQ.type === 'multiple' ? '※ 本題為多選題，可選擇多個選項' : '※ 請點選選項作答'}
              </span>

              {!hasSubmittedCurrent ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIndices.length === 0}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer ${
                    selectedOptionIndices.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  確認答案 (觸發音效)
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentIndex + 1 < currentQuestions.length ? '下一題' : '完成測驗結算'}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
