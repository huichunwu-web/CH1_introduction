import React, { useState, useEffect } from 'react';
import { StudentProfile, QuizResult } from './types';
import { Header } from './components/Header';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { ScenarioView } from './components/ScenarioView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { SummaryPdfModal } from './components/SummaryPdfModal';
import { StudentModal } from './components/StudentModal';

const DEFAULT_STUDENT: StudentProfile = {
  studentId: '41108201',
  name: '林小華',
  department: '餐飲管理科',
  classGroup: '二年甲班'
};

export default function App() {
  // Student Profile State with LocalStorage persistence
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('food_prep_student');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_STUDENT;
  });

  const [activeTab, setActiveTab] = useState<'cards' | 'quiz' | 'scenario' | 'syllabus' | 'certificate'>('cards');
  const [isMuted, setIsMuted] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(null);

  // Sync student to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('food_prep_student', JSON.stringify(student));
    } catch {
      // ignore
    }
  }, [student]);

  const handleSaveStudent = (updatedStudent: StudentProfile) => {
    setStudent(updatedStudent);
    if (lastQuizResult) {
      setLastQuizResult({
        ...lastQuizResult,
        studentProfile: updatedStudent
      });
    }
  };

  const handleViewCertificateTab = (result: QuizResult) => {
    setLastQuizResult(result);
    setActiveTab('certificate');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Top Sticky Header */}
      <Header
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'cards' && (
          <FlashcardsView onStartQuizWithSection={() => setActiveTab('quiz')} />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            student={student}
            onViewCertificateTab={handleViewCertificateTab}
            lastQuizResult={lastQuizResult}
            setLastQuizResult={setLastQuizResult}
          />
        )}

        {activeTab === 'scenario' && <ScenarioView />}

        {activeTab === 'syllabus' && <KnowledgeBaseView />}

        {activeTab === 'certificate' && (
          <SummaryPdfModal
            student={student}
            lastQuizResult={lastQuizResult}
            onGoToQuiz={() => setActiveTab('quiz')}
            onEditStudent={() => setIsStudentModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-800">食物製備 Food Preparation</span>
            <span>‧ 餐飲工作者必備的基本常識 (第1章 導論)</span>
          </div>
          <div>
            當前就讀學員：<strong className="text-gray-800 font-mono">{student.name} ({student.studentId})</strong>
          </div>
        </div>
      </footer>

      {/* Student Profile Settings Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        currentStudent={student}
        onSave={handleSaveStudent}
      />
    </div>
  );
}
