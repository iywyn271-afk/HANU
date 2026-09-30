export type AppTab = 
  | 'roadmap' 
  | 'hangeul' 
  | 'vocabulary' 
  | 'grammar' 
  | 'pronunciation' 
  | 'practice' 
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
