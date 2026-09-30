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
import { AppTab, UserStats, VocabWord } from './types';
import { Heart, Sparkles, BookOpen, Volume2, Crown } from 'lucide-react';

const STORAGE_KEY = 'korean_is_easy_user_stats_v1';
const CUSTOM_VOCAB_STORAGE_KEY = 'korean_is_easy_custom_vocab_v1';
const OWNER_MODE_STORAGE_KEY = 'korean_is_easy_owner_mode_v1';
const OWNER_EMAIL = 'iywyn271@gmail.com';

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

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('roadmap');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Owner Mode State
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(OWNER_MODE_STORAGE_KEY);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [isOwnerAuthModalOpen, setIsOwnerAuthModalOpen] = useState<boolean>(false);

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

  // Sync custom words to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_VOCAB_STORAGE_KEY, JSON.stringify(customWords));
    } catch {
      // ignore
    }
  }, [customWords]);

  // Sync owner mode to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(OWNER_MODE_STORAGE_KEY, isOwnerMode ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isOwnerMode]);

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

  return (
    <div className="min-h-screen bg-[#FAFDF9] text-stone-800 flex flex-col font-sans">
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
        customWordsCount={customWords.length}
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
            customWords={customWords}
          />
        )}

        {currentTab === 'stats' && (
          <AchievementsView stats={stats} />
        )}
      </main>

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
              HANU <span className="text-pink-600 font-korean font-semibold text-xs ml-0.5">한국어</span>
            </span>
            <span>• Học tiếng Hàn trực quan Cấp độ 1 đến 6</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setCurrentTab('hangeul')}
              className="hover:text-pink-600 transition-colors cursor-pointer"
            >
              Bảng chữ cái Hangeul
            </button>
            <button
              onClick={() => setCurrentTab('vocabulary')}
              className="hover:text-pink-600 transition-colors cursor-pointer"
            >
              Từ vựng theo chủ đề
            </button>
            <button
              onClick={() => setCurrentTab('practice')}
              className="hover:text-pink-600 transition-colors cursor-pointer"
            >
              Làm bài tập trắc nghiệm
            </button>
            <button
              onClick={() => setCurrentTab('stats')}
              className="hover:text-pink-600 transition-colors cursor-pointer"
            >
              Bảng thành tích
            </button>
            <button
              onClick={() => setIsOwnerAuthModalOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-500" />
              <span>{isOwnerMode ? 'Chủ sở hữu (Đang bật)' : 'Quyền Chủ sở hữu'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-stone-400">
            <span>Thiết kế cho người mới bắt đầu</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
