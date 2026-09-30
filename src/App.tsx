import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RoadmapView } from './components/RoadmapView';
import { HangeulView } from './components/HangeulView';
import { VocabularyView } from './components/VocabularyView';
import { GrammarView } from './components/GrammarView';
import { PronunciationView } from './components/PronunciationView';
import { PracticeView } from './components/PracticeView';
import { AchievementsView } from './components/AchievementsView';
import { OwnerAuthModal } from './components/OwnerAuthModal';
import { OwnerVocabModal } from './components/OwnerVocabModal';
import { OwnerQuizModal } from './components/OwnerQuizModal';
import { OwnerGrammarModal } from './components/OwnerGrammarModal';
import { OnboardingSurveyModal } from './components/OnboardingSurveyModal';
import { ThemePaletteModal } from './components/ThemePaletteModal';
import { GamesView } from './components/GamesView';
import { AppTab, UserStats, VocabWord, QuizQuestion, GrammarLesson, UserPreferences, ThemeId } from './types';
import { getThemeConfig } from './data/themeData';
import { Heart, Sparkles, BookOpen, Volume2, Crown, Plus, Palette, RotateCcw, Gamepad2 } from 'lucide-react';

const STORAGE_KEY = 'korean_is_easy_user_stats_v1';
const CUSTOM_VOCAB_STORAGE_KEY = 'korean_is_easy_custom_vocab_v1';
const CUSTOM_QUIZ_STORAGE_KEY = 'korean_is_easy_custom_quizzes_v1';
const CUSTOM_GRAMMAR_STORAGE_KEY = 'korean_is_easy_custom_grammar_v1';
const PREFERENCES_STORAGE_KEY = 'hanu_user_preferences_v1';
const OWNER_MODE_STORAGE_KEY = 'korean_is_easy_owner_mode_v1';
const OWNER_EMAIL = 'iywyn271@gmail.com';

const DEFAULT_PREFERENCES: UserPreferences = {
  hasCompletedOnboarding: false,
  ageBracket: 'young-adult',
  learningGoal: 'hangeul',
  dailyTimeMinutes: 20,
  themeId: 'cherry'
};

const INITIAL_CUSTOM_WORDS: VocabWord[] = [
  {
    id: 'owner-init-1',
    korean: '행복하다',
    vietnamese: 'Hạnh phúc',
    romanization: 'haeng-bok-ha-da',
    hanja: '幸福하다',
    level: 1,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '오늘 하루 정말 행복해요.',
    exampleVi: 'Hôm nay tôi thực sự rất hạnh phúc.',
    isCustom: true,
    createdBy: OWNER_EMAIL,
    createdAt: new Date().toISOString()
  },
  {
    id: 'owner-init-2',
    korean: '선물',
    vietnamese: 'Món quà',
    romanization: 'seon-mul',
    hanja: '膳物',
    level: 1,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '생일 선물을 받아서 기뻐요.',
    exampleVi: 'Tôi rất vui vì được nhận quà sinh nhật.',
    isCustom: true,
    createdBy: OWNER_EMAIL,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CUSTOM_QUIZZES: QuizQuestion[] = [
  {
    id: 'owner-quiz-init-1',
    type: 'multiple-choice',
    level: 1,
    category: 'Từ vựng & Giao tiếp',
    question: 'Khi gặp người lớn tuổi hoặc đối tác Hàn Quốc lần đầu, câu chào lịch sự chuẩn là:',
    options: ['안녕하세요!', '안녕!', '잘 가!', '고마워!'],
    correctAnswer: '안녕하세요!',
    explanation: '"안녕하세요!" là lời chào trang trọng và lịch sự nhất dùng trong mọi tình huống giao tiếp chuẩn.',
    hint: 'Gốc từ kính ngữ mang ý chúc an khang.',
    isCustom: true,
    createdBy: OWNER_EMAIL,
    createdAt: new Date().toISOString()
  },
  {
    id: 'owner-quiz-init-2',
    type: 'flashcard-vi',
    level: 2,
    category: 'Địa điểm & Đời sống',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '도서관',
    romanization: 'do-seo-gwan',
    options: ['Thư viện', 'Bệnh viện', 'Sân bay', 'Ngân hàng'],
    correctAnswer: 'Thư viện',
    explanation: '"도서관" (Đồ Thư Quán) nghĩa là thư viện nơi đọc sách và mượn tài liệu.',
    hint: 'Nơi yên tĩnh chứa rất nhiều sách để bạn học tập và nghiên cứu.',
    isCustom: true,
    createdBy: OWNER_EMAIL,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CUSTOM_GRAMMAR: GrammarLesson[] = [
  {
    id: 'owner-grammar-init-1',
    level: 1,
    title: 'V/A + ~(으)ㄹ 때',
    pattern: '~(으)ㄹ 때',
    summary: 'Khi / Vào lúc thực hiện một hành động hoặc trạng thái xảy ra',
    explanation: 'Dùng để diễn tả thời điểm hoặc khoảng thời gian mà một hành động, sự việc hoặc trạng thái nào đó diễn ra.',
    formula: {
      hasPatchim: 'Động từ/Tính từ có patchim + 을 때 (먹다 -> 먹을 때, 읽다 -> 읽을 때)',
      noPatchim: 'Động từ/Tính từ không patchim hoặc có patchim ㄹ + ㄹ 때 (가다 -> 갈 때, 살다 -> 살 때)',
      irregular: 'Bất quy tắc ㄷ: 듣다 -> 들을 때; ㅂ: 돕다 -> 도울 때'
    },
    examples: [
      {
        kr: '한국에 갈 때 비행기를 타요.',
        vi: 'Khi đi Hàn Quốc tôi đi bằng máy bay.'
      },
      {
        kr: '시간이 있을 때 음악을 들어요.',
        vi: 'Khi có thời gian rảnh rỗi tôi thường nghe nhạc.'
      }
    ],
    tip: 'Nếu là danh từ, ta chỉ cần kết hợp trực tiếp với 때 (ví dụ: 방학 때 - lúc nghỉ hè, 점심 때 - lúc ăn trưa).',
    isCustom: true,
    createdBy: OWNER_EMAIL,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('roadmap');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // User Preferences (Age, Goals, Theme)
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PREFERENCES;
  });

  // Modal triggers
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Auto show onboarding questionnaire for new visitors
  useEffect(() => {
    if (!preferences.hasCompletedOnboarding) {
      const timer = setTimeout(() => {
        setIsOnboardingModalOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [preferences.hasCompletedOnboarding]);

  // Owner Mode State - default to true so iywyn271@gmail.com has instant access
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(OWNER_MODE_STORAGE_KEY);
      if (saved !== null) return saved === 'true';
    } catch {
      // ignore
    }
    return true; // Default enabled for instant owner usability
  });

  const [isOwnerAuthModalOpen, setIsOwnerAuthModalOpen] = useState<boolean>(false);
  const [isOwnerVocabModalOpen, setIsOwnerVocabModalOpen] = useState<boolean>(false);
  const [isOwnerQuizModalOpen, setIsOwnerQuizModalOpen] = useState<boolean>(false);
  const [isOwnerGrammarModalOpen, setIsOwnerGrammarModalOpen] = useState<boolean>(false);
  const [editingWord, setEditingWord] = useState<VocabWord | null>(null);
  const [editingQuiz, setEditingQuiz] = useState<QuizQuestion | null>(null);
  const [editingGrammar, setEditingGrammar] = useState<GrammarLesson | null>(null);

  // Custom Vocabulary Words added by Owner
  const [customWords, setCustomWords] = useState<VocabWord[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_VOCAB_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_CUSTOM_WORDS;
  });

  // Custom Quizzes added by Owner
  const [customQuizzes, setCustomQuizzes] = useState<QuizQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_QUIZ_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_CUSTOM_QUIZZES;
  });

  // Custom Grammar added by Owner
  const [customGrammar, setCustomGrammar] = useState<GrammarLesson[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_GRAMMAR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_CUSTOM_GRAMMAR;
  });

  // Persistent User Statistics
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          playerName: parsed.playerName || 'Minh Anh',
          playerAvatar: parsed.playerAvatar || '🌸',
          ...parsed
        };
      }
    } catch {
      // ignore
    }
    return {
      playerName: 'Minh Anh',
      playerAvatar: '🌸',
      xp: 40,
      streak: 1,
      learnedWords: ['v1-1', 'v1-2'],
      passedQuizzes: [],
      levelSelected: 1,
      highScore: 0,
      totalQuizzesTaken: 2,
      correctAnswersCount: 2
    };
  });

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Sync preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  // Sync custom words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_VOCAB_STORAGE_KEY, JSON.stringify(customWords));
    } catch {
      // ignore
    }
  }, [customWords]);

  // Sync custom quizzes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_QUIZ_STORAGE_KEY, JSON.stringify(customQuizzes));
    } catch {
      // ignore
    }
  }, [customQuizzes]);

  // Sync custom grammar to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_GRAMMAR_STORAGE_KEY, JSON.stringify(customGrammar));
    } catch {
      // ignore
    }
  }, [customGrammar]);

  // Sync owner mode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(OWNER_MODE_STORAGE_KEY, isOwnerMode ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isOwnerMode]);

  // Preferences & Theme Handlers
  const handleSavePreferences = (newPrefs: UserPreferences, newName?: string, newAvatar?: string) => {
    setPreferences(newPrefs);
    if (newName || newAvatar) {
      setStats((prev) => ({
        ...prev,
        playerName: newName || prev.playerName,
        playerAvatar: newAvatar || prev.playerAvatar
      }));
    }
  };

  const handleSelectTheme = (newThemeId: ThemeId) => {
    setPreferences((prev) => ({
      ...prev,
      themeId: newThemeId
    }));
  };

  // Custom Vocab CRUD Handlers
  const handleSaveCustomWord = (word: VocabWord) => {
    setCustomWords((prev) => {
      const index = prev.findIndex((w) => w.id === word.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = word;
        return updated;
      } else {
        return [word, ...prev];
      }
    });
  };

  const handleDeleteCustomWord = (wordId: string) => {
    setCustomWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  const handleImportCustomWords = (newWords: VocabWord[]) => {
    setCustomWords((prev) => {
      const existingIds = new Set(prev.map((w) => w.id));
      const filteredNew = newWords.filter((w) => !existingIds.has(w.id));
      return [...filteredNew, ...prev];
    });
  };

  // Custom Quiz CRUD Handlers
  const handleSaveCustomQuiz = (quiz: QuizQuestion) => {
    setCustomQuizzes((prev) => {
      const index = prev.findIndex((q) => q.id === quiz.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = quiz;
        return updated;
      } else {
        return [quiz, ...prev];
      }
    });
  };

  const handleDeleteCustomQuiz = (quizId: string) => {
    setCustomQuizzes((prev) => prev.filter((q) => q.id !== quizId));
  };

  const handleImportCustomQuizzes = (newQuizzes: QuizQuestion[]) => {
    setCustomQuizzes((prev) => {
      const existingIds = new Set(prev.map((q) => q.id));
      const filtered = newQuizzes.filter((q) => !existingIds.has(q.id));
      return [...filtered, ...prev];
    });
  };

  // Custom Grammar CRUD Handlers
  const handleSaveCustomGrammar = (lesson: GrammarLesson) => {
    setCustomGrammar((prev) => {
      const index = prev.findIndex((g) => g.id === lesson.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = lesson;
        return updated;
      } else {
        return [lesson, ...prev];
      }
    });
  };

  const handleDeleteCustomGrammar = (id: string) => {
    setCustomGrammar((prev) => prev.filter((g) => g.id !== id));
  };

  const handleImportCustomGrammar = (newLessons: GrammarLesson[]) => {
    setCustomGrammar((prev) => {
      const existingIds = new Set(prev.map((g) => g.id));
      const filtered = newLessons.filter((g) => !existingIds.has(g.id));
      return [...filtered, ...prev];
    });
  };

  const handleUpdatePlayer = (name: string, avatar?: string) => {
    setStats((prev) => ({
      ...prev,
      playerName: name.trim() || prev.playerName || 'Học viên',
      playerAvatar: avatar || prev.playerAvatar || '🌸'
    }));
  };

  const handleToggleSpeechRate = () => {
    setSpeechRate((prev) => (prev < 0.85 ? 0.95 : 0.72));
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleToggleLearnedWord = (wordId: string) => {
    setStats((prev) => {
      const exists = prev.learnedWords.includes(wordId);
      const updatedList = exists
        ? prev.learnedWords.filter((id) => id !== wordId)
        : [...prev.learnedWords, wordId];

      return {
        ...prev,
        learnedWords: updatedList,
        xp: exists ? prev.xp : prev.xp + 5
      };
    });
  };

  const handleAddXP = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const handleQuizCompleted = (correctCount: number, totalCount: number) => {
    setStats((prev) => ({
      ...prev,
      totalQuizzesTaken: prev.totalQuizzesTaken + totalCount,
      correctAnswersCount: prev.correctAnswersCount + correctCount
    }));
  };

  const currentThemeConfig = getThemeConfig(preferences.themeId);

  return (
    <div 
      className="min-h-screen text-stone-800 flex flex-col font-sans relative pb-16 transition-colors duration-300"
      style={{ backgroundColor: currentThemeConfig.bgLight }}
    >
      {/* Top Navigation & Live Stats */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        stats={stats}
        speechRate={speechRate}
        onToggleSpeechRate={handleToggleSpeechRate}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        isOwnerMode={isOwnerMode}
        onOpenOwnerAuth={() => setIsOwnerAuthModalOpen(true)}
        onOpenAddVocab={() => {
          setEditingWord(null);
          setIsOwnerVocabModalOpen(true);
        }}
        onOpenAddQuiz={() => {
          setEditingQuiz(null);
          setIsOwnerQuizModalOpen(true);
        }}
        onOpenAddGrammar={() => {
          setEditingGrammar(null);
          setIsOwnerGrammarModalOpen(true);
        }}
        customWordsCount={customWords.length}
        customQuizzesCount={customQuizzes.length}
        customGrammarCount={customGrammar.length}
        themeId={preferences.themeId}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenSurveyModal={() => setIsOnboardingModalOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'roadmap' && (
          <RoadmapView
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onNavigate={setCurrentTab}
            stats={stats}
            onUpdatePlayer={handleUpdatePlayer}
            speechRate={speechRate}
          />
        )}

        {currentTab === 'hangeul' && (
          <HangeulView speechRate={speechRate} />
        )}

        {currentTab === 'vocabulary' && (
          <VocabularyView
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            learnedWordIds={stats.learnedWords}
            onToggleLearned={handleToggleLearnedWord}
            speechRate={speechRate}
            onAddXP={handleAddXP}
            customWords={customWords}
            onSaveWord={handleSaveCustomWord}
            onDeleteWord={handleDeleteCustomWord}
            onImportWords={handleImportCustomWords}
            isOwnerMode={isOwnerMode}
            onSetOwnerMode={setIsOwnerMode}
            ownerEmail={OWNER_EMAIL}
          />
        )}

        {currentTab === 'grammar' && (
          <GrammarView
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            speechRate={speechRate}
            customGrammar={customGrammar}
            onOpenAddGrammar={() => {
              setEditingGrammar(null);
              setIsOwnerGrammarModalOpen(true);
            }}
            onEditGrammar={(item) => {
              setEditingGrammar(item);
              setIsOwnerGrammarModalOpen(true);
            }}
            onDeleteGrammar={handleDeleteCustomGrammar}
            isOwnerMode={isOwnerMode}
          />
        )}

        {currentTab === 'pronunciation' && (
          <PronunciationView speechRate={speechRate} />
        )}

        {currentTab === 'practice' && (
          <PracticeView
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onAddXP={handleAddXP}
            onQuizCompleted={handleQuizCompleted}
            speechRate={speechRate}
            playerName={stats.playerName}
            playerAvatar={stats.playerAvatar}
            themeId={preferences.themeId}
            customWords={customWords}
            customQuizzes={customQuizzes}
            onOpenAddQuiz={() => {
              setEditingQuiz(null);
              setIsOwnerQuizModalOpen(true);
            }}
          />
        )}

        {currentTab === 'games' && (
          <GamesView
            playerName={stats.playerName || 'Học viên'}
            playerAvatar={stats.playerAvatar || '🌸'}
            speechRate={speechRate}
            themeId={preferences.themeId}
            onAddXP={handleAddXP}
            customQuizzes={customQuizzes}
            onOpenCreateQuiz={() => {
              setEditingQuiz(null);
              setIsOwnerQuizModalOpen(true);
            }}
          />
        )}

        {currentTab === 'stats' && (
          <AchievementsView stats={stats} />
        )}
      </main>

      {/* Floating Quick Action Buttons (Always Visible at bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 animate-fadeIn">
        <button
          onClick={() => setIsThemeModalOpen(true)}
          className="px-3.5 py-2 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs shadow-md border border-stone-200 flex items-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          title="Đổi màu sắc giao diện"
        >
          <Palette className="w-4 h-4 text-stone-600" />
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: currentThemeConfig.accentColor }} 
          />
          <span className="hidden sm:inline">Màu: {currentThemeConfig.name}</span>
        </button>

        <button
          onClick={() => setCurrentTab('games')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-white/60"
          title="Vào trung tâm Trò chơi & Đấu trường Quiz cùng dùng"
        >
          <Gamepad2 className="w-4 h-4 stroke-[2.5]" />
          <span>🎮 Trò Chơi</span>
        </button>

        <button
          onClick={() => {
            setEditingWord(null);
            setIsOwnerVocabModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-white/60"
          style={{
            background: `linear-gradient(90deg, ${currentThemeConfig.gradientFrom}, ${currentThemeConfig.gradientTo})`
          }}
          title="Bấm để thêm từ vựng tiếng Hàn mới"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>➕ Thêm Từ Vựng</span>
        </button>

        <button
          onClick={() => {
            setEditingGrammar(null);
            setIsOwnerGrammarModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-white/60"
          title="Bấm để thêm cấu trúc ngữ pháp mới"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>➕ Thêm Ngữ Pháp</span>
        </button>

        <button
          onClick={() => {
            setEditingQuiz(null);
            setIsOwnerQuizModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-white/60"
          title="Bấm để tạo câu hỏi bài tập / quiz mới"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>➕ Thêm Quiz</span>
        </button>
      </div>

      {/* Onboarding Survey & Age Input Modal */}
      <OnboardingSurveyModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        onSavePreferences={handleSavePreferences}
        currentAgeBracket={preferences.ageBracket}
        currentThemeId={preferences.themeId}
        currentGoal={preferences.learningGoal}
        currentTime={preferences.dailyTimeMinutes}
        currentName={stats.playerName}
        currentAvatar={stats.playerAvatar}
      />

      {/* Theme Palette Modal (Được Chọn Màu) */}
      <ThemePaletteModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentThemeId={preferences.themeId}
        onSelectTheme={handleSelectTheme}
        currentAgeBracket={preferences.ageBracket}
        onOpenSurvey={() => setIsOnboardingModalOpen(true)}
      />

      {/* Owner Vocabulary Modal */}
      <OwnerVocabModal
        isOpen={isOwnerVocabModalOpen}
        onClose={() => {
          setIsOwnerVocabModalOpen(false);
          setEditingWord(null);
        }}
        onSaveWord={handleSaveCustomWord}
        onDeleteWord={handleDeleteCustomWord}
        editingWord={editingWord}
        customWords={customWords}
        onImportWords={handleImportCustomWords}
        ownerEmail={OWNER_EMAIL}
        speechRate={speechRate}
      />

      {/* Owner Quiz Modal */}
      <OwnerQuizModal
        isOpen={isOwnerQuizModalOpen}
        onClose={() => {
          setIsOwnerQuizModalOpen(false);
          setEditingQuiz(null);
        }}
        onSaveQuiz={handleSaveCustomQuiz}
        onDeleteQuiz={handleDeleteCustomQuiz}
        editingQuiz={editingQuiz}
        customQuizzes={customQuizzes}
        onImportQuizzes={handleImportCustomQuizzes}
        ownerEmail={OWNER_EMAIL}
        speechRate={speechRate}
      />

      {/* Owner Grammar Modal */}
      <OwnerGrammarModal
        isOpen={isOwnerGrammarModalOpen}
        onClose={() => {
          setIsOwnerGrammarModalOpen(false);
          setEditingGrammar(null);
        }}
        onSaveGrammar={handleSaveCustomGrammar}
        onDeleteGrammar={handleDeleteCustomGrammar}
        editingGrammar={editingGrammar}
        customGrammar={customGrammar}
        onImportGrammar={handleImportCustomGrammar}
        ownerEmail={OWNER_EMAIL}
        speechRate={speechRate}
      />

      {/* Owner Authentication Modal */}
      <OwnerAuthModal
        isOpen={isOwnerAuthModalOpen}
        onClose={() => setIsOwnerAuthModalOpen(false)}
        isOwnerMode={isOwnerMode}
        onSetOwnerMode={setIsOwnerMode}
        ownerEmail={OWNER_EMAIL}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-stone-900 tracking-tight">
              HANU 
              <span 
                className="font-korean font-semibold text-xs ml-0.5"
                style={{ color: currentThemeConfig.accentColor }}
              >
                한국어
              </span>
            </span>
            <span>• Học tiếng Hàn trực quan Cấp độ 1 đến 6</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="font-bold flex items-center gap-1 cursor-pointer transition-colors"
              style={{ color: currentThemeConfig.accentColor }}
              title="Đổi màu sắc giao diện"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Màu: {currentThemeConfig.name}</span>
            </button>
            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1 cursor-pointer"
              title="Làm lại khảo sát độ tuổi & mục tiêu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khảo sát độ tuổi</span>
            </button>
            <button
              onClick={() => setCurrentTab('vocabulary')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Từ vựng
            </button>
            <button
              onClick={() => setCurrentTab('grammar')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Ngữ pháp
            </button>
            <button
              onClick={() => setCurrentTab('practice')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Làm bài tập
            </button>
            <button
              onClick={() => setCurrentTab('games')}
              className="font-bold text-amber-700 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Trò chơi & Đấu trường</span>
            </button>
            <button
              onClick={() => {
                setEditingWord(null);
                setIsOwnerVocabModalOpen(true);
              }}
              className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Từ Vựng</span>
            </button>
            <button
              onClick={() => {
                setEditingGrammar(null);
                setIsOwnerGrammarModalOpen(true);
              }}
              className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Ngữ Pháp</span>
            </button>
            <button
              onClick={() => {
                setEditingQuiz(null);
                setIsOwnerQuizModalOpen(true);
              }}
              className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Quiz</span>
            </button>
            <button
              onClick={() => setIsOwnerAuthModalOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-500" />
              <span>{isOwnerMode ? 'Chủ sở hữu' : 'Quyền Sở hữu'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Thiết kế cho mọi lứa tuổi</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
