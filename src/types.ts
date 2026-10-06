export interface StudentProfile {
  studentId: string;
  name: string;
  department: string;
  classGroup: string;
}

export type CourseSection = 
  | 'sec1_history' // 中華飲食文化與食物機能
  | 'sec2_cuisines' // 中餐八大菜系與其他菜系
  | 'sec3_world' // 各國料理 (西餐、東北亞、東南亞)
  | 'sec4_trends'; // 飲食新趨勢 (素食、速食、慢食、生機)

export interface Flashcard {
  id: string;
  section: CourseSection;
  sectionName: string;
  title: string;
  subtitle?: string;
  frontContent: string;
  backDefinition: string;
  keyPoints: string[];
  examples?: string[];
  mnemonic?: string; // 記憶口訣
  tags: string[];
}

export type QuestionType = 'single' | 'multiple' | 'tf';

export interface QuizQuestion {
  id: string;
  section: CourseSection;
  sectionName: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswers: number[]; // index 0-based
  explanation: string;
  slideRef: string; // 簡報參考頁碼
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  studentProfile: StudentProfile;
  totalQuestions: number;
  correctCount: number;
  score: number;
  timeSpentSeconds: number;
  date: string;
  sectionScores: Record<CourseSection, { correct: number; total: number }>;
  userAnswers: Record<string, number[]>; // questionId -> chosen indices
}

export interface ScenarioOption {
  id: string;
  text: string;
  score: number; // 0 to 10
  feedback: string;
  isBest: boolean;
}

export interface ScenarioQuestion {
  id: string;
  stageTitle: string;
  description: string;
  options: ScenarioOption[];
}

export interface ScenarioCase {
  id: string;
  title: string;
  category: string;
  role: string;
  background: string;
  objectives: string[];
  questions: ScenarioQuestion[];
  debriefing: string;
  relatedSlideTopics: string[];
}
