import React, { useState } from 'react';
import { SCENARIO_CASES } from '../data/scenarios';
import { soundManager } from '../utils/audio';
import { 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  RotateCcw, 
  Briefcase, 
  Target, 
  BookMarked,
  Sparkles
} from 'lucide-react';

export const ScenarioView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(SCENARIO_CASES[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> chosenOptionId
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const currentCase = SCENARIO_CASES.find((c) => c.id === selectedCaseId) || SCENARIO_CASES[0];

  const handleSelectCase = (caseId: string) => {
    soundManager.playClick();
    setSelectedCaseId(caseId);
    setAnswers({});
    setActiveStageIndex(0);
  };

  const handleChooseOption = (qId: string, optId: string, isBest: boolean) => {
    if (answers[qId]) return; // already answered
    if (isBest) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }
    setAnswers((prev) => ({
      ...prev,
      [qId]: optId
    }));
  };

  const handleResetCurrentCase = () => {
    soundManager.playClick();
    setAnswers({});
    setActiveStageIndex(0);
  };

  const currentQuestion = currentCase.questions[activeStageIndex];
  const totalStages = currentCase.questions.length;
  const answeredCount = Object.keys(answers).filter(qId => 
    currentCase.questions.some(q => q.id === qId)
  ).length;

  // Calculate current case score
  let currentScore = 0;
  currentCase.questions.forEach((q) => {
    const chosenOptId = answers[q.id];
    if (chosenOptId) {
      const opt = q.options.find((o) => o.id === chosenOptId);
      if (opt) currentScore += opt.score;
    }
  });
  const maxPossibleScore = currentCase.questions.length * 10;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Lightbulb size={14} />
            <span>餐飲實務顧問情境演練</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">情境決策分析 ‧ 餐飲現場實務模擬</h2>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            融合國宴禮賓禁忌、素食標示法規、食品機能定位與菜系刀工評審等 4 大情境，考驗餐飲工作者的現場應變與法規知識！
          </p>
        </div>
      </div>

      {/* Case Tabs Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SCENARIO_CASES.map((cs) => {
          const isSelected = cs.id === currentCase.id;
          return (
            <div
              key={cs.id}
              onClick={() => handleSelectCase(cs.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/80 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-amber-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                  {cs.category}
                </span>
                <h4 className="font-bold text-gray-900 text-sm mt-2 line-clamp-2">
                  {cs.title}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <span>角色：{cs.role.split(' ')[0]}</span>
                <ChevronRight size={14} className={isSelected ? 'text-amber-600' : 'text-gray-400'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Case Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Case Background & Objectives */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4 sticky top-24">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                演練情境背景
              </span>
              <h3 className="text-lg font-black text-gray-900 pt-2 leading-snug">
                {currentCase.title}
              </h3>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <Briefcase size={14} className="text-amber-600" />
                <span>擬真職務角色：{currentCase.role}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{currentCase.background}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-gray-800 flex items-center gap-1.5">
                <Target size={14} className="text-amber-600" />
                <span>情境演練目標：</span>
              </div>
              <ul className="space-y-1 text-gray-600 pl-4 list-disc marker:text-amber-500">
                {currentCase.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-[11px] font-bold text-gray-500 mb-1 flex items-center gap-1">
                <BookMarked size={12} className="text-amber-600" /> 相關教材重點：
              </div>
              <div className="flex flex-wrap gap-1">
                {currentCase.relatedSlideTopics.map((topic, i) => (
                  <span key={i} className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                本案得分：<strong className="text-amber-700 text-sm font-mono">{currentScore}</strong> / {maxPossibleScore} 分
              </span>
              <button
                onClick={handleResetCurrentCase}
                className="text-xs text-gray-500 hover:text-amber-800 flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw size={13} />
                <span>重置案例</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-stage Decisions & Feedbacks */}
        <div className="lg:col-span-2 space-y-5">
          {currentCase.questions.map((q, qIndex) => {
            const chosenOptId = answers[q.id];
            const chosenOpt = q.options.find((o) => o.id === chosenOptId);
            const isCompleted = !!chosenOptId;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all ${
                  isCompleted ? 'border-amber-200 shadow-xs' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                    階段 {qIndex + 1} / {totalStages} ‧ {q.stageTitle}
                  </span>
                  {chosenOpt && (
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      chosenOpt.isBest ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      得 {chosenOpt.score} 分
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-gray-900 leading-snug mb-4">
                  {q.description}
                </h4>

                {/* Decision Options */}
                <div className="space-y-3">
                  {q.options.map((opt) => {
                    const isChosen = chosenOptId === opt.id;
                    let optStyle = 'border-gray-200 hover:border-amber-300 bg-gray-50/50';

                    if (isCompleted) {
                      if (opt.isBest) {
                        optStyle = 'border-emerald-500 bg-emerald-50/60 font-semibold';
                      } else if (isChosen && !opt.isBest) {
                        optStyle = 'border-orange-400 bg-orange-50/60';
                      } else {
                        optStyle = 'border-gray-200 opacity-50 bg-gray-50';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleChooseOption(q.id, opt.id, opt.isBest)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${optStyle}`}
                      >
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5">
                          {isChosen ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-transparent" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                            {opt.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Instant Feedback Panel */}
                {chosenOpt && (
                  <div className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn space-y-1 ${
                    chosenOpt.isBest ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-orange-50 border-orange-200 text-orange-950'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {chosenOpt.isBest ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <AlertCircle size={16} className="text-orange-600" />
                      )}
                      <span>專業顧問點評：{chosenOpt.isBest ? '最佳決策方案' : '次佳或有待改善'}</span>
                    </div>
                    <p className="leading-relaxed pl-5">{chosenOpt.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* All Stages Debriefing Summary */}
          {answeredCount === totalStages && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-7 border border-amber-200 shadow-xs space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-900 font-black text-base">
                <Sparkles size={18} className="text-amber-600" />
                <span>案例實務總結講評 (Debriefing)</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                {currentCase.debriefing}
              </p>
              <div className="pt-2 text-xs text-amber-800 font-bold">
                🎉 本情境演練達成率：{Math.round((currentScore / maxPossibleScore) * 100)}% ({currentScore}/{maxPossibleScore} 分)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
