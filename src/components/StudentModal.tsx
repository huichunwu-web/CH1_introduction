import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { X, UserCheck, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile;
  onSave: (student: StudentProfile) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onSave
}) => {
  const [studentId, setStudentId] = useState(currentStudent.studentId);
  const [name, setName] = useState(currentStudent.name);
  const [department, setDepartment] = useState(currentStudent.department || '餐飲管理科');
  const [classGroup, setClassGroup] = useState(currentStudent.classGroup || '二年甲班');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    onSave({
      studentId: studentId.trim() || '41108201',
      name: name.trim() || '學生學員',
      department: department.trim() || '餐飲管理科',
      classGroup: classGroup.trim() || '二年甲班'
    });
    onClose();
  };

  const handleQuickFill = (presetId: string, presetName: string) => {
    soundManager.playClick();
    setStudentId(presetId);
    setName(presetName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-5 text-white flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">學員資料設定</h3>
            <p className="text-xs text-amber-100 mt-0.5">學號與姓名將直接印於測驗成績單與 PDF 報告中</p>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              學生學號 (Student ID) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="例：41108201 或 S112001"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              學生姓名 (Student Name) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：王小明 或 林美玲"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                科系 / 學院
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="餐飲管理科"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                班級組別
              </label>
              <input
                type="text"
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                placeholder="二年甲班"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-2">
            <span className="text-xs text-gray-500 flex items-center gap-1 mb-2 font-medium">
              <Sparkles size={12} className="text-amber-500" /> 快速填入範例：
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('41108201', '林曉明')}
                className="text-xs px-2.5 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 cursor-pointer"
              >
                林曉明 (41108201)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('41108202', '陳思妤')}
                className="text-xs px-2.5 py-1 rounded border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 cursor-pointer"
              >
                陳思妤 (41108202)
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-gradient-to-r from-amber-600 to-orange-500 text-white font-medium rounded-lg shadow-sm hover:from-amber-700 hover:to-orange-600 cursor-pointer flex items-center gap-1.5"
            >
              <UserCheck size={16} />
              <span>確認保存</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
