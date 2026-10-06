import React from 'react';
import { StudentProfile, QuizResult } from '../types';
import { soundManager } from '../utils/audio';
import { openPrintCertificate } from '../utils/pdfExport';
import { 
  FileDown, 
  Printer, 
  Award, 
  User, 
  Calendar, 
  CheckCircle, 
  BarChart3, 
  FileCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SummaryPdfModalProps {
  student: StudentProfile;
  lastQuizResult: QuizResult | null;
  onGoToQuiz: () => void;
  onEditStudent: () => void;
}

export const SummaryPdfModal: React.FC<SummaryPdfModalProps> = ({
  student,
  lastQuizResult,
  onGoToQuiz,
  onEditStudent
}) => {
  // If no quiz has been taken yet, create a provisional mock result for preview
  const previewResult: QuizResult = lastQuizResult || {
    studentProfile: student,
    totalQuestions: 10,
    correctCount: 9,
    score: 90,
    timeSpentSeconds: 210,
    date: new Date().toLocaleString('zh-TW'),
    sectionScores: {
      sec1_history: { correct: 5, total: 6 },
      sec2_cuisines: { correct: 4, total: 4 },
      sec3_world: { correct: 0, total: 0 },
      sec4_trends: { correct: 0, total: 0 }
    },
    userAnswers: {}
  };

  const handlePrint = () => {
    soundManager.playClick();
    openPrintCertificate(previewResult);
  };

  const percentage = Math.round((previewResult.correctCount / previewResult.totalQuestions) * 100);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <Award size={14} />
              <span>官方認證修課證書生成系統</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">學習成效報告書 ＆ PDF 證書輸出</h2>
            <p className="text-amber-100 text-xs sm:text-sm">
              自動整合學員學號、姓名、作答成績與各單元精熟分析，點擊即可一鍵列印或儲存為高畫質 PDF。
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="px-5 py-3 bg-white text-orange-600 hover:bg-amber-50 font-bold rounded-xl shadow-lg cursor-pointer flex items-center gap-2 text-sm transition-all hover:scale-105"
            >
              <Printer size={18} />
              <span>匯出 / 列印 PDF</span>
            </button>
          </div>
        </div>
      </div>

      {!lastQuizResult && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-amber-600 shrink-0" />
            <div className="text-xs sm:text-sm text-amber-900">
              <strong>提示：</strong> 您尚未完成測驗，下方為即時預覽樣版（90 分示範）。建議先至模擬測驗完成考評以記錄您的真實成績！
            </div>
          </div>
          <button
            onClick={onGoToQuiz}
            className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>前往測驗</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Certificate Preview Card */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-amber-300 p-8 shadow-sm space-y-6 relative overflow-hidden">
        {/* Certificate Watermark / Header */}
        <div className="text-center space-y-2 border-b border-gray-100 pb-6">
          <div className="inline-block p-2 rounded-2xl bg-amber-50 text-amber-800 mb-1">
            <Award size={36} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-wide">
            食物製備 (Food Preparation) 課程修業與測驗證明書
          </h3>
          <p className="text-xs text-gray-500">
            餐飲工作者必備的基本常識 ‧ 第一章 導論 數位學習認證
          </p>
          <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded border border-gray-200">
            證書修業編號：CERT-FP-{Date.now().toString(36).toUpperCase()}
          </span>
        </div>

        {/* Student Profile Info Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
          <div>
            <span className="text-gray-400 block mb-0.5">學生學號</span>
            <strong className="text-gray-900 text-sm font-mono">{student.studentId}</strong>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">學生姓名</span>
            <div className="flex items-center gap-2">
              <strong className="text-gray-900 text-sm">{student.name}</strong>
              <button
                onClick={onEditStudent}
                className="text-[10px] text-amber-600 underline cursor-pointer"
              >
                修改
              </button>
            </div>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">科系 / 班級</span>
            <strong className="text-gray-900">{student.department} {student.classGroup}</strong>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">發證完成日期</span>
            <strong className="text-gray-900">{previewResult.date}</strong>
          </div>
        </div>

        {/* Score & Evaluation Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/60 border border-amber-200">
          <div className="text-center">
            <span className="text-xs text-gray-500 font-medium">總評分</span>
            <div className="text-5xl font-black text-amber-600 leading-none my-1">
              {previewResult.score}
              <span className="text-xl text-gray-500 font-normal"> 分</span>
            </div>
            <span className="text-xs text-gray-500">
              答對 {previewResult.correctCount} / {previewResult.totalQuestions} 題
            </span>
          </div>

          <div className="text-center border-y sm:border-y-0 sm:border-x border-amber-200 py-3 sm:py-0 sm:px-8">
            <span className="text-xs text-gray-500 font-medium">評定等第</span>
            <div className="text-4xl font-black text-emerald-600 my-1">
              {percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 60 ? 'B' : 'C'}
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
              {percentage >= 60 ? '合格通關' : '建議補測'}
            </span>
          </div>

          <div className="text-center">
            <span className="text-xs text-gray-500 font-medium">答對率與用時</span>
            <div className="text-4xl font-black text-gray-900 my-1">{percentage}%</div>
            <span className="text-xs text-gray-500">
              用時 {Math.floor(previewResult.timeSpentSeconds / 60)} 分 {previewResult.timeSpentSeconds % 60} 秒
            </span>
          </div>
        </div>

        {/* Breakdown by Sections */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <BarChart3 size={16} className="text-amber-600" />
            <span>各單元能力指標分析</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-gray-200 bg-white space-y-1.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>第1節 中華飲食文化歷程與機能特性</span>
                <span className="text-amber-700">
                  {previewResult.sectionScores.sec1_history.correct}/{previewResult.sectionScores.sec1_history.total}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{
                    width: `${previewResult.sectionScores.sec1_history.total > 0 ? (previewResult.sectionScores.sec1_history.correct / previewResult.sectionScores.sec1_history.total) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-white space-y-1.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>第2節 中餐菜系 (四大/八大/地方菜)</span>
                <span className="text-amber-700">
                  {previewResult.sectionScores.sec2_cuisines.correct}/{previewResult.sectionScores.sec2_cuisines.total}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{
                    width: `${previewResult.sectionScores.sec2_cuisines.total > 0 ? (previewResult.sectionScores.sec2_cuisines.correct / previewResult.sectionScores.sec2_cuisines.total) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-white space-y-1.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>第3節 各國料理 (西餐/日韓/東南亞)</span>
                <span className="text-amber-700">
                  {previewResult.sectionScores.sec3_world.correct}/{previewResult.sectionScores.sec3_world.total}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{
                    width: `${previewResult.sectionScores.sec3_world.total > 0 ? (previewResult.sectionScores.sec3_world.correct / previewResult.sectionScores.sec3_world.total) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-white space-y-1.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>第4節 飲食新趨勢 (素食/速食/慢食/生機)</span>
                <span className="text-amber-700">
                  {previewResult.sectionScores.sec4_trends.correct}/{previewResult.sectionScores.sec4_trends.total}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full"
                  style={{
                    width: `${previewResult.sectionScores.sec4_trends.total > 0 ? (previewResult.sectionScores.sec4_trends.correct / previewResult.sectionScores.sec4_trends.total) * 100 : 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Official Stamp and Sign */}
        <div className="flex items-end justify-between pt-6 border-t border-gray-100 text-xs text-gray-400">
          <div>
            <p className="font-semibold text-gray-600">學科主持教授：食物製備學科教研組</p>
            <p>數位評量認證系統 ‧ 具備正式課堂評核紀錄效力</p>
          </div>

          <div className="text-center border-2 border-dashed border-amber-300 text-amber-800 p-2.5 rounded-xl bg-amber-50/50">
            <span className="font-black block">【 數位學習認證專用章 】</span>
            <span className="text-[10px]">數位簽署核可</span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Bar */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={handlePrint}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-black rounded-2xl shadow-lg cursor-pointer flex items-center gap-2 text-base transition-all hover:scale-105"
        >
          <FileDown size={20} />
          <span>列印 / 下載本成績單為 PDF</span>
        </button>
      </div>
    </div>
  );
};
