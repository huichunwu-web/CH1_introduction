import React from 'react';
import { StudentProfile } from '../types';
import { Volume2, VolumeX, User, BookOpen, CheckSquare, Lightbulb, FileText, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  student: StudentProfile;
  activeTab: 'cards' | 'quiz' | 'scenario' | 'syllabus' | 'certificate';
  setActiveTab: (tab: 'cards' | 'quiz' | 'scenario' | 'syllabus' | 'certificate') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenStudentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onOpenStudentModal
}) => {
  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
    if (!nextState) {
      soundManager.playClick();
    }
  };

  const handleTabChange = (tab: 'cards' | 'quiz' | 'scenario' | 'syllabus' | 'certificate') => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo & Course Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <span className="text-xl font-bold">食</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  食物製備 <span className="text-sm font-medium text-amber-700 hidden sm:inline">Food Preparation</span>
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                  第1章 導論
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden md:block">
                餐飲工作者必備的基本常識 ‧ 數位互動教學評量系統
              </p>
            </div>
          </div>

          {/* Student Badge & Sound Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Info Pill */}
            <button
              onClick={onOpenStudentModal}
              title="點擊修改學生資料"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 transition-colors cursor-pointer text-xs sm:text-sm group"
            >
              <div className="w-6 h-6 rounded-full bg-amber-200/80 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
                <User size={13} />
              </div>
              <div className="text-left">
                <div className="font-semibold leading-tight flex items-center gap-1.5">
                  <span>{student.name || '未設姓名'}</span>
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-100/80 px-1 rounded">
                    {student.studentId || '無學號'}
                  </span>
                </div>
              </div>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? '音效已靜音，點擊開啟答題音效' : '答題音效已開啟，點擊靜音'}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-gray-100 border-gray-300 text-gray-400 hover:text-gray-600'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 shadow-xs'
              }`}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none border-t border-gray-100 text-xs sm:text-sm font-medium">
          <button
            onClick={() => handleTabChange('cards')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
            }`}
          >
            <BookOpen size={16} />
            <span>學習字卡</span>
          </button>

          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
            }`}
          >
            <CheckSquare size={16} />
            <span>模擬測驗</span>
            <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-orange-100 text-orange-700 font-mono font-bold">
              音效支援
            </span>
          </button>

          <button
            onClick={() => handleTabChange('scenario')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'scenario'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
            }`}
          >
            <Lightbulb size={16} />
            <span>情境分析</span>
          </button>

          <button
            onClick={() => handleTabChange('syllabus')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'syllabus'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
            }`}
          >
            <FileText size={16} />
            <span>教材大綱速查</span>
          </button>

          <button
            onClick={() => handleTabChange('certificate')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-900'
            }`}
          >
            <Award size={16} />
            <span>成績單與PDF輸出</span>
          </button>
        </div>
      </div>
    </header>
  );
};
