import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Search, 
  Check, 
  Sparkles, 
  RotateCw, 
  BookOpen, 
  Layers, 
  ListFilter,
  CheckCircle2,
  XCircle,
  Shuffle,
  Eye,
  EyeOff,
  HelpCircle,
  Award,
  Crown,
  Plus,
  Edit3,
  Trash2,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { VocabWord } from '../types';
import { VOCAB_WORDS, VOCAB_CATEGORIES } from '../data/vocabData';
import { speakKorean, playClickSound, playCorrectSound, playWrongSound } from '../utils/audio';
import { OwnerVocabModal } from './OwnerVocabModal';
import { OwnerAuthModal } from './OwnerAuthModal';

interface VocabularyViewProps {
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  learnedWordIds: string[];
  onToggleLearned: (id: string) => void;
  speechRate: number;
  onAddXP?: (amount: number) => void;
  customWords: VocabWord[];
  onSaveWord: (word: VocabWord) => void;
  onDeleteWord: (wordId: string) => void;
  onImportWords: (words: VocabWord[]) => void;
  isOwnerMode: boolean;
  onSetOwnerMode: (active: boolean) => void;
  ownerEmail: string;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  selectedLevel,
  onSelectLevel,
  learnedWordIds,
  onToggleLearned,
  speechRate,
  onAddXP,
  customWords,
  onSaveWord,
  onDeleteWord,
  onImportWords,
  isOwnerMode,
  onSetOwnerMode,
  ownerEmail
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Flashcard Interactivity State
  const [flashcardMode, setFlashcardMode] = useState<'quiz' | 'type' | 'flip'>('quiz');
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [showRomanizationHint, setShowRomanizationHint] = useState<boolean>(false);
  const [flashcardStats, setFlashcardStats] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Owner Modals State
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);
  const [editingWord, setEditingWord] = useState<VocabWord | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Combined words (Custom words by owner on top)
  const allWords = useMemo(() => {
    return [...customWords, ...VOCAB_WORDS];
  }, [customWords]);

  // Combined categories
  const allCategories = useMemo(() => {
    const set = new Set(VOCAB_CATEGORIES);
    customWords.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set);
  }, [customWords]);

  // Filter words
  const filteredWords = useMemo(() => {
    return allWords.filter((word) => {
      const matchLevel = selectedLevel === 0 || word.level === selectedLevel;
      const matchCategory = 
        selectedCategory === 'Tất cả' ? true :
        selectedCategory === '__owner__' ? word.isCustom :
        word.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        word.korean.toLowerCase().includes(query) ||
        word.vietnamese.toLowerCase().includes(query) ||
        word.romanization.toLowerCase().includes(query);

      return matchLevel && matchCategory && matchQuery;
    });
  }, [allWords, selectedLevel, selectedCategory, searchQuery]);

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  // Reset quiz state when flashcard changes
  useEffect(() => {
    setIsFlipped(false);
    setSelectedQuizOption(null);
    setTypedAnswer('');
    setIsQuizSubmitted(false);
    setIsAnswerCorrect(false);
  }, [flashcardIndex, selectedLevel, selectedCategory]);

  // Generate 4 dynamic choices for the current card in quiz mode
  const currentOptions = useMemo(() => {
    if (!currentFlashcard) return [];
    const correct = currentFlashcard.vietnamese;
    const others = allWords.filter(w => w.id !== currentFlashcard.id && w.vietnamese !== correct);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map(w => w.vietnamese);
    return [correct, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentFlashcard?.id, allWords]);

  const handleSelectQuizOption = (option: string) => {
    if (isQuizSubmitted || !currentFlashcard) return;
    playClickSound();
    setSelectedQuizOption(option);
    const correct = option === currentFlashcard.vietnamese;
    setIsAnswerCorrect(correct);
    setIsQuizSubmitted(true);
    setFlashcardStats(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));

    if (correct) {
      playCorrectSound();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      onAddXP?.(10);
      if (!learnedWordIds.includes(currentFlashcard.id)) {
        onToggleLearned(currentFlashcard.id);
      }
      setIsFlipped(true);
    } else {
      playWrongSound();
    }
  };

  const handleCheckTypedAnswer = () => {
    if (isQuizSubmitted || !currentFlashcard || !typedAnswer.trim()) return;
    playClickSound();
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .trim()
        .replace(/[.,!?;:/\\-]/g, ' ')
        .replace(/\s+/g, ' ');

    const userNorm = normalize(typedAnswer);
    const correctNorm = normalize(currentFlashcard.vietnamese);
    const correct =
      userNorm.length > 0 &&
      (userNorm === correctNorm ||
        correctNorm.includes(userNorm) ||
        userNorm.includes(correctNorm));

    setIsAnswerCorrect(correct);
    setIsQuizSubmitted(true);
    setFlashcardStats(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));

    if (correct) {
      playCorrectSound();
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      onAddXP?.(10);
      if (!learnedWordIds.includes(currentFlashcard.id)) {
        onToggleLearned(currentFlashcard.id);
      }
      setIsFlipped(true);
    } else {
      playWrongSound();
    }
  };

  const handleShuffleCards = () => {
    playClickSound();
    if (filteredWords.length > 1) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      setFlashcardIndex(randomIndex);
    }
  };

  const handleSpeak = (text: string, rateMultiplier: number = 1.0, id?: string) => {
    playClickSound();
    if (id) setPlayingId(id);
    speakKorean(text, speechRate * rateMultiplier).then(() => {
      if (id) setPlayingId(null);
    });
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  const learnedCount = filteredWords.filter(w => learnedWordIds.includes(w.id)).length;
  const progressPercent = filteredWords.length > 0 ? Math.round((learnedCount / filteredWords.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        {/* Owner Management Banner */}
        {isOwnerMode ? (
          <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-rose-500/10 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Crown className="w-5 h-5 text-amber-100 fill-amber-100" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase text-amber-900 tracking-wide">
                    Quyền Người Sở Hữu Đang Hoạt Động
                  </span>
                  <span className="text-[11px] font-bold text-stone-600 bg-white/90 px-2 py-0.5 rounded-full border border-stone-200">
                    {ownerEmail}
                  </span>
                  <span className="text-[11px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">
                    {customWords.length} từ đã thêm
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Bạn có toàn quyền thêm từ vựng mới, chỉnh sửa và đưa vào bài tập học sinh ngay lập tức.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setEditingWord(null);
                  setIsOwnerModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm từ vựng mới</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsOwnerModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Quản lý danh sách ({customWords.length})</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-stone-50/80 border border-stone-200 rounded-xl px-3.5 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>
                Bạn là Người sở hữu (<strong>{ownerEmail}</strong>)?
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsAuthModalOpen(true);
              }}
              className="font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Kích hoạt quyền Thêm Từ Vựng →</span>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-stone-900">
                Kho Từ Vựng Tiếng Hàn Theo Chủ Đề
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                Cấp độ {selectedLevel}
              </span>
              {customWords.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-600" />
                  <span>+{customWords.length} từ chủ sở hữu</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Tích hợp phát âm chuẩn, phiên âm Romanization, chữ Hán (Hanja) và ví dụ thực tế.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('grid');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Dạng Danh sách</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setViewMode('flashcard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'flashcard'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thẻ Flashcard 3D</span>
            </button>
          </div>
        </div>

        {/* Level filter bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 whitespace-nowrap">Chọn Cấp:</span>
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playClickSound();
                onSelectLevel(lvl);
                setFlashcardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-pink-500 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              Cấp {lvl}
            </button>
          ))}
        </div>

        {/* Search bar & Category filter */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm từ tiếng Hàn, tiếng Việt hoặc phiên âm..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:border-pink-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {customWords.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedCategory('__owner__');
                  setFlashcardIndex(0);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer shrink-0 ${
                  selectedCategory === '__owner__'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Crown className="w-3 h-3 fill-current" />
                <span>Từ Người sở hữu ({customWords.length})</span>
              </button>
            )}

            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                  setFlashcardIndex(0);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar in current filter */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span>Tiến độ từ vựng: <strong>{learnedCount}</strong> / {filteredWords.length} từ đã thuộc</span>
            <span className="font-bold text-emerald-700">({progressPercent}%)</span>
          </div>
          <div className="w-32 sm:w-48 bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-emerald-500 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* VIEW MODE: Flashcard 3D */}
      {viewMode === 'flashcard' && filteredWords.length > 0 && (
        <div className="max-w-xl mx-auto space-y-4">
          {/* Controls Bar: Mode selector & Stats */}
          <div className="bg-white rounded-2xl border border-stone-200 p-3 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-500">Chế độ luyện:</span>
                <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setFlashcardMode('quiz');
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      flashcardMode === 'quiz'
                        ? 'bg-pink-500 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    🎯 Trắc nghiệm
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setFlashcardMode('type');
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      flashcardMode === 'type'
                        ? 'bg-pink-500 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ✍️ Tự gõ nghĩa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setFlashcardMode('flip');
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      flashcardMode === 'flip'
                        ? 'bg-pink-500 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    📖 Lật thẻ
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShuffleCards}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Xáo trộn thẻ ngẫu nhiên"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Xáo trộn</span>
                </button>

                {flashcardStats.total > 0 && (
                  <div className="flex items-center gap-1 text-xs font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200">
                    <Award className="w-3.5 h-3.5" />
                    <span>Đúng {flashcardStats.correct}/{flashcardStats.total}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
              <span>Thẻ {flashcardIndex + 1} / {filteredWords.length}</span>
              <span className="font-semibold text-pink-600">Chủ đề: {currentFlashcard.category}</span>
            </div>
          </div>

          {/* Flashcard Box */}
          <div
            className={`min-h-[260px] sm:min-h-[290px] rounded-3xl p-6 sm:p-8 shadow-sm border-2 transition-all flex flex-col justify-between text-center relative select-none ${
              isQuizSubmitted
                ? isAnswerCorrect
                  ? 'bg-gradient-to-b from-emerald-50/70 via-white to-white border-emerald-400 shadow-emerald-100'
                  : 'bg-gradient-to-b from-rose-50/70 via-white to-white border-rose-300 shadow-rose-100'
                : 'bg-gradient-to-b from-pink-50/40 via-white to-white border-pink-200 hover:border-pink-300'
            }`}
          >
            {/* Top Card Bar */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  Cấp độ {currentFlashcard.level}
                </span>
                {currentFlashcard.isCustom && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    <Crown className="w-3 h-3 fill-amber-600 text-amber-600" /> Chủ sở hữu thêm
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {learnedWordIds.includes(currentFlashcard.id) && (
                  <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Check className="w-3 h-3" /> Đã thuộc
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setShowRomanizationHint(!showRomanizationHint);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
                  title="Hiện/Ẩn phiên âm"
                >
                  {showRomanizationHint ? <EyeOff className="w-3 h-3 text-pink-600" /> : <Eye className="w-3 h-3" />}
                  <span>{showRomanizationHint ? 'Ẩn phiên âm' : 'Phiên âm'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setIsFlipped(!isFlipped);
                  }}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 px-2 py-0.5 rounded-md bg-pink-50 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" /> {isFlipped ? 'Mặt trước' : 'Lật xem nghĩa'}
                </button>
              </div>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              <div className="py-6 space-y-2">
                <div className="font-korean text-4xl sm:text-5xl font-black text-stone-900 tracking-wide">
                  {currentFlashcard.korean}
                </div>
                {showRomanizationHint && (
                  <div className="text-sm font-semibold text-pink-600 font-mono animate-fadeIn">
                    [{currentFlashcard.romanization}]
                  </div>
                )}
                {currentFlashcard.hanja && (
                  <div className="text-xs text-stone-400 font-medium">
                    Hán tự: {currentFlashcard.hanja}
                  </div>
                )}
                <p className="text-xs text-stone-500 font-medium pt-1">
                  {flashcardMode === 'flip'
                    ? '(Bấm "Lật xem nghĩa" hoặc bấm vào thẻ để xem nghĩa tiếng Việt)'
                    : '(Hãy trả lời nghĩa tiếng Việt bên dưới)'}
                </p>
              </div>
            ) : (
              <div className="py-3 space-y-3 animate-fadeIn">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Nghĩa tiếng Việt</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-0.5">
                    {currentFlashcard.vietnamese}
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-2xl border border-stone-200 text-left space-y-1 text-xs sm:text-sm shadow-2xs">
                  <div className="flex items-center justify-between text-stone-400 font-bold text-[11px] uppercase">
                    <span>Ví dụ minh họa:</span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(currentFlashcard.exampleKr, 1.0)}
                      className="text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" /> Nghe ví dụ
                    </button>
                  </div>
                  <div className="font-korean font-semibold text-stone-900">
                    {currentFlashcard.exampleKr}
                  </div>
                  <div className="text-stone-600 text-xs">
                    {currentFlashcard.exampleVi}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions on Card */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-3 border-t border-pink-100 flex-wrap">
              <button
                type="button"
                onClick={() => handleSpeak(currentFlashcard.korean, 1.0)}
                className="px-3.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe chuẩn</span>
              </button>

              <button
                type="button"
                onClick={() => handleSpeak(currentFlashcard.korean, 0.7)}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>🐢 Chậm</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCorrectSound();
                  onToggleLearned(currentFlashcard.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  learnedWordIds.includes(currentFlashcard.id)
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{learnedWordIds.includes(currentFlashcard.id) ? 'Đã nhớ từ' : 'Đánh dấu thuộc'}</span>
              </button>

              {currentFlashcard.isCustom && isOwnerMode && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setEditingWord(currentFlashcard);
                    setIsOwnerModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Chỉnh sửa từ do chủ sở hữu tạo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa từ</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Flashcard Answering Area: 4 Quiz Options */}
          {flashcardMode === 'quiz' && (
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">
                  Chọn nghĩa tiếng Việt của từ: <strong className="font-korean text-stone-900 text-sm">{currentFlashcard.korean}</strong>
                </span>
                {isQuizSubmitted && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isAnswerCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {isAnswerCorrect ? '🎉 Chính xác (+10 XP)' : 'Chưa chính xác'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {currentOptions.map((option, idx) => {
                  const isSelected = selectedQuizOption === option;
                  let optionStyle = 'border-stone-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-stone-800';

                  if (isQuizSubmitted) {
                    if (option === currentFlashcard.vietnamese) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400 font-bold';
                    } else if (isSelected && !isAnswerCorrect) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-300 line-through';
                    } else {
                      optionStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-pink-500 bg-pink-50 ring-2 ring-pink-400 text-pink-800 font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isQuizSubmitted}
                      onClick={() => handleSelectQuizOption(option)}
                      className={`p-3.5 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="font-semibold">{option}</span>
                      </div>

                      {isQuizSubmitted && option === currentFlashcard.vietnamese && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isQuizSubmitted && isSelected && !isAnswerCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Flashcard Answering Area: Type Vietnamese Meaning */}
          {flashcardMode === 'type' && (
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
              <label className="text-xs font-bold text-stone-700 block">
                Gõ nghĩa tiếng Việt của từ: <strong className="font-korean text-stone-900 text-sm">{currentFlashcard.korean}</strong>
              </label>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    disabled={isQuizSubmitted}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isQuizSubmitted && typedAnswer.trim()) {
                        handleCheckTypedAnswer();
                      }
                    }}
                    placeholder="Ví dụ: Xin chào, Cảm ơn, Ăn cơm..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-hidden ${
                      isQuizSubmitted
                        ? isAnswerCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                          : 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-200'
                        : 'border-stone-300 bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                    }`}
                  />
                </div>

                {!isQuizSubmitted ? (
                  <button
                    type="button"
                    disabled={!typedAnswer.trim()}
                    onClick={handleCheckTypedAnswer}
                    className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer shrink-0"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-xs font-bold">
                    {isAnswerCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đúng rồi (+10 XP)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-600" /> Đáp án: {currentFlashcard.vietnamese}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-stone-400">
                Hỗ trợ gõ tiếng Việt có dấu hoặc không dấu, bấm <kbd className="px-1 py-0.5 bg-stone-100 border rounded text-[10px]">Enter</kbd> để kiểm tra.
              </p>
            </div>
          )}

          {/* Flashcard Navigation Buttons */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-colors cursor-pointer"
            >
              ← Từ trước
            </button>
            <button
              onClick={handleNextCard}
              className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Từ tiếp theo →
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE: Grid List */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredWords.map((word) => {
            const isLearned = learnedWordIds.includes(word.id);
            return (
              <div
                key={word.id}
                className={`bg-white rounded-2xl border p-4 transition-all hover:shadow-xs relative flex flex-col justify-between ${
                  word.isCustom
                    ? 'border-amber-200 bg-gradient-to-b from-amber-50/20 via-white to-white'
                    : isLearned
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-stone-200 hover:border-pink-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        {word.category}
                      </span>
                      {word.isCustom && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <Crown className="w-2.5 h-2.5 text-amber-600 fill-amber-600" />
                          <span>Người sở hữu thêm</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-pink-600">
                        Cấp {word.level}
                      </span>
                      {word.isCustom && isOwnerMode && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setEditingWord(word);
                              setIsOwnerModalOpen(true);
                            }}
                            className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Sửa từ này"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              if (window.confirm(`Bạn có chắc muốn xóa từ "${word.korean}" (${word.vietnamese}) do chủ sở hữu thêm không?`)) {
                                onDeleteWord(word.id);
                              }
                            }}
                            className="p-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Xóa từ này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-korean text-2xl font-black text-stone-900">
                        {word.korean}
                      </h3>
                      <div className="text-xs text-stone-400 font-mono mt-0.5">
                        [{word.romanization}] {word.hanja && `• ${word.hanja}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleSpeak(word.korean, 1.0, word.id)}
                        title="Nghe chuẩn"
                        className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSpeak(word.korean, 0.7)}
                        title="Nghe chậm"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs transition-colors cursor-pointer"
                      >
                        🐢
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-bold text-emerald-700 mt-2">
                    {word.vietnamese}
                  </div>

                  {/* Example Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs space-y-1">
                    <div className="flex items-center justify-between text-stone-900 font-korean font-semibold">
                      <span>{word.exampleKr}</span>
                      <button
                        onClick={() => handleSpeak(word.exampleKr, 0.9)}
                        className="text-stone-400 hover:text-pink-600 p-0.5 cursor-pointer"
                        title="Nghe câu ví dụ"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-stone-500">
                      {word.exampleVi}
                    </div>
                  </div>
                </div>

                {/* Mark as learned toggle button */}
                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (!isLearned) playCorrectSound();
                      else playClickSound();
                      onToggleLearned(word.id);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                      isLearned
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isLearned ? 'Đã thuộc từ này' : 'Chưa thuộc • Bấm nhớ'}</span>
                  </button>

                  <span className="text-[11px] text-stone-400">
                    +5 XP khi thuộc
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-stone-600 font-medium">Không tìm thấy từ vựng phù hợp với bộ lọc hiện tại.</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
              }}
              className="text-xs font-bold text-pink-600 hover:underline cursor-pointer"
            >
              Xóa bộ lọc tìm kiếm
            </button>
            {isOwnerMode && (
              <button
                onClick={() => {
                  setEditingWord(null);
                  setIsOwnerModalOpen(true);
                }}
                className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                + Thêm từ vựng mới ngay
              </button>
            )}
          </div>
        </div>
      )}

      {/* Owner Vocabulary Modal */}
      <OwnerVocabModal
        isOpen={isOwnerModalOpen}
        onClose={() => {
          setIsOwnerModalOpen(false);
          setEditingWord(null);
        }}
        onSaveWord={onSaveWord}
        onDeleteWord={onDeleteWord}
        editingWord={editingWord}
        customWords={customWords}
        onImportWords={onImportWords}
        ownerEmail={ownerEmail}
        speechRate={speechRate}
      />

      {/* Owner Auth Modal */}
      <OwnerAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isOwnerMode={isOwnerMode}
        onSetOwnerMode={onSetOwnerMode}
        ownerEmail={ownerEmail}
      />
    </div>
  );
};
