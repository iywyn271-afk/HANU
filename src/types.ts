export type AppTab = 
  | 'roadmap' 
  | 'hangeul' 
  | 'vocabulary' 
  | 'grammar' 
  | 'pronunciation' 
  | 'practice' 
  | 'games'
  | 'stats';

export interface LevelInfo {
  level: number;
  name: string;
  subTitle: string;
  badge: string;
  targetAudience: string;
  vocabTarget: number;
  grammarTarget: number;
  description: string;
  keyTopics: string[];
  skillsGained: string[];
}

export interface HangeulCharacter {
  char: string;
  name: string;
  romanization: string;
  vietnameseSound: string;
  type: 'basic-vowel' | 'compound-vowel' | 'basic-consonant' | 'double-consonant' | 'patchim';
  exampleWord?: {
    kr: string;
    vi: string;
    rom: string;
  };
  pronunciationTip?: string;
}

export interface VocabWord {
  id: string;
  korean: string;
  vietnamese: string;
  romanization: string;
  hanja?: string;
  level: number; // 1 to 6
  category: string;
  exampleKr: string;
  exampleVi: string;
  isLearned?: boolean;
  isCustom?: boolean;
  createdBy?: string;
  createdAt?: string;
}

export interface GrammarLesson {
  id: string;
  level: number;
  title: string;
  pattern: string;
  summary: string;
  explanation: string;
  formula: {
    hasPatchim: string;
    noPatchim: string;
    irregular?: string;
  };
  examples: {
    kr: string;
    vi: string;
  }[];
  tip?: string;
  isCustom?: boolean;
  createdBy?: string;
  createdAt?: string;
}

export interface DialogueLine {
  speaker: string;
  avatar?: string;
  kr: string;
  vi: string;
  romanization: string;
}

export interface DialogueLesson {
  id: string;
  level: number;
  topic: string;
  title: string;
  context: string;
  lines: DialogueLine[];
  vocabularyHighlight: { kr: string; vi: string }[];
}

export interface PronunciationRule {
  id: string;
  name: string;
  ruleKorean: string;
  description: string;
  formula: string;
  examples: {
    written: string;
    pronounced: string;
    meaning: string;
    explanation: string;
  }[];
}

export type QuizType = 'multiple-choice' | 'fill-blank' | 'match-pairs' | 'word-order' | 'flashcard-vi';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  level: number;
  category: string;
  question: string;
  koreanContext?: string;
  koreanWord?: string;
  romanization?: string;
  options?: string[]; // For multiple-choice & flashcard-vi
  correctAnswer: string | string[]; // Single string or array of ordered tokens
  explanation: string;
  hint?: string;
  pairs?: { korean: string; vietnamese: string }[]; // For match-pairs
  wordBlocks?: string[]; // For word-order
  exampleKr?: string;
  exampleVi?: string;
  isCustom?: boolean;
  createdBy?: string;
  createdAt?: string;
}

export interface UserStats {
  playerName?: string;
  playerAvatar?: string;
  xp: number;
  streak: number;
  learnedWords: string[];
  passedQuizzes: string[];
  levelSelected: number;
  highScore: number;
  totalQuizzesTaken: number;
  correctAnswersCount: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export type AgeBracket = 'kids' | 'teens' | 'young-adult' | 'adult' | 'senior';

export type ThemeId = 
  | 'cherry'     // Hoa đào Seoul (Hồng phấn & Rose)
  | 'mint'       // Trà xanh Jeju (Emerald & Mint)
  | 'ocean'      // Biển Busan (Cyan & Ocean Blue)
  | 'gold'       // Hoàng gia Hanbok (Amber & Gold)
  | 'lavender'   // K-Pop Vibe (Tím & Neon Violet)
  | 'sunset'     // Quýt vàng Jeju (Cam & Coral)
  | 'midnight';  // Trăng đêm Hanok (Slate & Indigo)

export interface UserPreferences {
  hasCompletedOnboarding: boolean;
  ageBracket: AgeBracket;
  learningGoal: string;
  dailyTimeMinutes: number;
  themeId: ThemeId;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subTitle: string;
  emoji: string;
  recommendedFor: string;
  ageMatch: AgeBracket[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  gradientClass: string;
  bgLight: string;
  borderClass: string;
  badgeBgClass: string;
  badgeTextClass: string;
  primaryBtnClass: string;
  hoverBtnClass: string;
  ringClass: string;
}

export interface QuizLeaderboardEntry {
  id: string;
  playerName: string;
  playerAvatar: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  completedAt: string;
  badge?: string;
  isCurrentUser?: boolean;
}

export interface SharedQuizSet {
  id: string;
  code: string; // e.g. "HANU-TOPIK", "KPOP-IDOL", "TRAVEL-KR", "BIZ-KOREA", "HANJA-PRO"
  title: string;
  subTitle: string;
  category: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Thử thách';
  icon: string;
  questionsCount: number;
  participantsCount: number;
  author: string;
  questions: QuizQuestion[];
  isCommunity?: boolean;
  defaultLeaderboard: QuizLeaderboardEntry[];
  password?: string; // Mật mã phòng (nếu có)
  hasPassword?: boolean;
  isUnlimited?: boolean; // Không giới hạn người chơi
  isCustomRoom?: boolean; // Phòng do người dùng tự tạo
  createdAt?: string;
  hostName?: string;
}

export interface CustomQuizRoom {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Thử thách';
  category: string;
  createdBy: string;
  createdAt: string;
  password?: string;
  hasPassword: boolean;
  isUnlimited: boolean;
  questions: QuizQuestion[];
  leaderboard: QuizLeaderboardEntry[];
  participantsCount: number;
}


