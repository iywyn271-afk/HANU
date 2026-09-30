import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Lightbulb,
  Award,
  Flame,
  Check,
  Shuffle,
  UserCheck,
  Layers,
  Eye,
  EyeOff,
  PenTool,
  RotateCw
} from 'lucide-react';
import { QuizQuestion, QuizType, VocabWord } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { 
  playCorrectSound, 
  playWrongSound, 
  playFanfareSound, 
  playClickSound, 
  speakKorean 
} from '../utils/audio';

interface PracticeViewProps {
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  onAddXP: (amount: number) => void;
  onQuizCompleted: (correctCount: number, totalCount: number) => void;
  speechRate: number;
  playerName?: string;
  customWords?: VocabWord[];
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  selectedLevel,
  onSelectLevel,
  onAddXP,
  onQuizCompleted,
  speechRate,
  playerName,
  customWords = []
}) => {
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | QuizType>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // Multiple Choice / Fill Blank State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Match Pairs State (Shuffled for real game challenge)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedKrPair, setSelectedKrPair] = useState<string | null>(null);
  const [selectedViPair, setSelectedViPair] = useState<string | null>(null);
  const [shuffledKrList, setShuffledKrList] = useState<string[]>([]);
  const [shuffledViList, setShuffledViList] = useState<string[]>([]);
  const [mismatchPairs, setMismatchPairs] = useState<{ kr?: string; vi?: string } | null>(null);

  // Word Order State
  const [selectedOrderBlocks, setSelectedOrderBlocks] = useState<string[]>([]);
  const [shuffledWordBlocks, setShuffledWordBlocks] = useState<string[]>([]);

  // Flashcard State (Korean -> Vietnamese Answer)
  const [flashcardInputMode, setFlashcardInputMode] = useState<'choice' | 'type'>('choice');
  const [typedViAnswer, setTypedViAnswer] = useState<string>('');
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [showRomanizationHint, setShowRomanizationHint] = useState<boolean>(false);

  // Verification & Feedback State
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Synthesize Flashcard Questions from Owner-added vocabulary
  const customQuestions = React.useMemo<QuizQuestion[]>(() => {
    if (!customWords || customWords.length === 0) return [];
    return customWords.map((cw, idx) => {
      const otherMeanings = [
        ...customWords.filter(w => w.id !== cw.id).map(w => w.vietnamese),
        'Xin chào', 'Cảm ơn', 'Trường học', 'Gia đình', 'Nước uống', 'Học sinh', 'Bệnh viện', 'Thư viện'
      ].filter(m => m !== cw.vietnamese);
      const shuffledOthers = [...otherMeanings].sort(() => 0.5 - Math.random());
      const distractors = shuffledOthers.slice(0, 3);
      const options = [cw.vietnamese, ...distractors].sort(() => 0.5 - Math.random());

      return {
        id: `q-owner-${cw.id || idx}`,
        type: 'flashcard-vi',
        level: cw.level,
        category: `[Chủ sở hữu] ${cw.category}`,
        question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
        koreanWord: cw.korean,
        romanization: cw.romanization,
        options,
        correctAnswer: cw.vietnamese,
        explanation: `"${cw.korean}" nghĩa là "${cw.vietnamese}". (Từ vựng do Người sở hữu thêm).`,
        hint: cw.hanja ? `Hán tự: ${cw.hanja}` : `Chủ đề: ${cw.category}`,
        exampleKr: cw.exampleKr,
        exampleVi: cw.exampleVi
      };
    });
  }, [customWords]);

  const allQuestions = React.useMemo(() => {
    return [...customQuestions, ...QUIZ_QUESTIONS];
  }, [customQuestions]);

  // Filter questions
  const filteredQuestions = allQuestions.filter((q) => {
    const matchLevel = selectedLevel === 0 || q.level === selectedLevel;
    const matchType = activeTypeFilter === 'all' || q.type === activeTypeFilter;
    return matchLevel && matchType;
  });

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  // Helper to shuffle array
  const shuffleArray = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Shuffle both Korean and Vietnamese items ensuring they don't align on same row
  const randomizePairs = (pairs: { korean: string; vietnamese: string }[]) => {
    if (!pairs || pairs.length === 0) return;
    const krArr = pairs.map((p) => p.korean);
    const viArr = pairs.map((p) => p.vietnamese);

    const sKr = shuffleArray(krArr);
    let sVi = shuffleArray(viArr);

    // If 2 or more pairs, make sure at least one is not lined up identically with its match
    if (pairs.length > 1) {
      let tries = 0;
      while (tries < 8) {
        const matchesStraightAcross = sKr.some((k, idx) => {
          const directMatch = pairs.find((p) => p.korean === k)?.vietnamese;
          return directMatch === sVi[idx];
        });
        if (!matchesStraightAcross) break;
        sVi = shuffleArray(viArr);
        tries++;
      }
    }

    setShuffledKrList(sKr);
    setShuffledViList(sVi);
  };

  // Reset interactive inputs when changing questions
  const resetQuestionState = () => {
    setSelectedOption(null);
    setMatchedPairs([]);
    setSelectedKrPair(null);
    setSelectedViPair(null);
    setMismatchPairs(null);
    setSelectedOrderBlocks([]);
    setTypedViAnswer('');
    setIsFlashcardFlipped(false);
    setShowRomanizationHint(false);
    setIsAnswerChecked(false);
    setIsCorrect(false);

    if (currentQ?.type === 'match-pairs' && currentQ.pairs) {
      randomizePairs(currentQ.pairs);
    } else if (currentQ?.type === 'word-order' && currentQ.wordBlocks) {
      setShuffledWordBlocks(shuffleArray(currentQ.wordBlocks));
    }
  };

  useEffect(() => {
    resetQuestionState();
  }, [currentQuestionIndex, activeTypeFilter, selectedLevel]);

  // Handle manual reshuffle button click
  const handleManualReshuffle = () => {
    playClickSound();
    if (currentQ?.type === 'match-pairs' && currentQ.pairs) {
      randomizePairs(currentQ.pairs);
      setSelectedKrPair(null);
      setSelectedViPair(null);
      setMismatchPairs(null);
    } else if (currentQ?.type === 'word-order' && currentQ.wordBlocks) {
      setShuffledWordBlocks(shuffleArray(currentQ.wordBlocks));
      setSelectedOrderBlocks([]);
    }
  };

  if (!currentQ) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
        <HelpCircle className="w-10 h-10 text-stone-300 mx-auto" />
        <h3 className="text-lg font-bold text-stone-800">Không có câu hỏi trong bộ lọc này</h3>
        <p className="text-xs text-stone-500">Hãy chọn lại cấp độ hoặc dạng bài tập khác.</p>
        <button
          onClick={() => {
            setActiveTypeFilter('all');
            onSelectLevel(1);
          }}
          className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold"
        >
          Đặt lại bộ lọc
        </button>
      </div>
    );
  }

  // Check Answer Handler
  const handleCheckAnswer = () => {
    playClickSound();
    let correct = false;

    if (currentQ.type === 'multiple-choice' || currentQ.type === 'fill-blank') {
      correct = selectedOption === currentQ.correctAnswer;
    } else if (currentQ.type === 'flashcard-vi') {
      if (flashcardInputMode === 'choice') {
        correct = selectedOption === currentQ.correctAnswer;
      } else {
        const normalize = (str: string) =>
          str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .trim()
            .replace(/[.,!?;:/\\-]/g, ' ')
            .replace(/\s+/g, ' ');

        const userNorm = normalize(typedViAnswer);
        const correctNorm = normalize(currentQ.correctAnswer as string);

        correct =
          userNorm.length > 0 &&
          (userNorm === correctNorm ||
            correctNorm.includes(userNorm) ||
            userNorm.includes(correctNorm));
      }
      if (correct) {
        setIsFlashcardFlipped(true);
      }
    } else if (currentQ.type === 'word-order') {
      const correctArr = currentQ.correctAnswer as string[];
      correct = JSON.stringify(selectedOrderBlocks) === JSON.stringify(correctArr);
    } else if (currentQ.type === 'match-pairs') {
      correct = matchedPairs.length === (currentQ.pairs?.length || 0);
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      playCorrectSound();
      setScoreCount((prev) => prev + 1);
      onAddXP(10);
    } else {
      playWrongSound();
    }
  };

  // Next Question Handler
  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      resetQuestionState();
    } else {
      // Quiz Finished!
      playFanfareSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowSummary(true);
      onQuizCompleted(scoreCount + (isCorrect ? 1 : 0), filteredQuestions.length);
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    playClickSound();
    setCurrentQuestionIndex(0);
    setScoreCount(0);
    setShowSummary(false);
    resetQuestionState();
  };

  // Handle Match Pairs Click
  const handlePairSelect = (type: 'kr' | 'vi', item: string) => {
    playClickSound();
    if (isAnswerChecked) return;

    if (type === 'kr') {
      speakKorean(item, speechRate);
      setSelectedKrPair(item);
      if (selectedViPair) {
        verifyPairMatch(item, selectedViPair);
      }
    } else {
      setSelectedViPair(item);
      if (selectedKrPair) {
        verifyPairMatch(selectedKrPair, item);
      }
    }
  };

  const verifyPairMatch = (kr: string, vi: string) => {
    const pair = currentQ?.pairs?.find((p) => p.korean === kr && p.vietnamese === vi);
    if (pair) {
      playCorrectSound();
      const nextMatched = [...matchedPairs, kr];
      setMatchedPairs(nextMatched);
      setSelectedKrPair(null);
      setSelectedViPair(null);
      setMismatchPairs(null);

      // Check if all pairs matched!
      if (currentQ?.pairs && nextMatched.length === currentQ.pairs.length) {
        setIsCorrect(true);
        setIsAnswerChecked(true);
        setScoreCount((prev) => prev + 1);
        onAddXP(10);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      playWrongSound();
      setMismatchPairs({ kr, vi });
      setTimeout(() => {
        setSelectedKrPair(null);
        setSelectedViPair(null);
        setMismatchPairs(null);
      }, 700);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Quiz Top Control Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                Làm bài tập & Tính điểm
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                Cấp độ {selectedLevel}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 mt-1">
              Hệ Thống Kiểm Tra Trực Quan
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {playerName && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-pink-600" />
                <span>Người chơi: <strong className="text-stone-900">{playerName}</strong></span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Đúng: {scoreCount} / {filteredQuestions.length} câu</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>+10 XP / câu đúng</span>
            </div>
          </div>
        </div>

        {/* Filter Type Pills (Flashcard, Trắc nghiệm, Điền từ, Ghép từ) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400">Dạng bài:</span>
          {[
            { id: 'all', label: 'Tất cả bài tập' },
            { id: 'flashcard-vi', label: '🃏 Thẻ Flashcard (Hàn ➔ Việt)' },
            { id: 'multiple-choice', label: '1. Trắc nghiệm' },
            { id: 'fill-blank', label: '2. Điền từ' },
            { id: 'match-pairs', label: '3. Ghép từ' },
            { id: 'word-order', label: '4. Ghép câu' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => {
                playClickSound();
                setActiveTypeFilter(type.id as any);
                setCurrentQuestionIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTypeFilter === type.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Câu hỏi {currentQuestionIndex + 1} trên {filteredQuestions.length}</span>
            <span>Tiến độ: {Math.round(((currentQuestionIndex + 1) / filteredQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUIZ COMPLETED SUMMARY VIEW */}
      {showSummary ? (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-pink-200 p-8 text-center space-y-6 shadow-lg animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-pink-100 text-pink-600 flex items-center justify-center text-4xl mx-auto shadow-inner">
            🎉
          </div>

          <div>
            <h3 className="text-2xl font-black text-stone-900">
              {playerName ? `Chúc Mừng ${playerName}!` : 'Hoàn Thành Luyện Tập!'}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Bạn đã hoàn thành xuất sắc các bài tập trắc nghiệm và ghép từ tiếng Hàn.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200">
              <span className="text-xs text-pink-600 font-bold uppercase block">Số câu trả lời đúng</span>
              <span className="text-3xl font-extrabold text-pink-700">{scoreCount} / {filteredQuestions.length}</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs text-emerald-700 font-bold uppercase block">Điểm XP nhận được</span>
              <span className="text-3xl font-extrabold text-emerald-700">+{scoreCount * 10} XP</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài tập</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onSelectLevel((selectedLevel % 6) + 1);
                handleRestart();
              }}
              className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tiến lên Cấp {(selectedLevel % 6) + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Question Category & Type Header */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                {currentQ.category}
              </span>
              <span className="text-xs text-stone-400">
                {currentQ.type === 'multiple-choice' && '• Trắc nghiệm 4 đáp án'}
                {currentQ.type === 'fill-blank' && '• Điền từ vào chỗ trống'}
                {currentQ.type === 'match-pairs' && '• Ghép từ tiếng Hàn - tiếng Việt'}
                {currentQ.type === 'word-order' && '• Sắp xếp các khối từ thành câu'}
              </span>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Cấp độ {currentQ.level}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h3>
            {currentQ.koreanContext && (
              <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-200 font-korean text-base sm:text-lg font-bold text-stone-900 flex items-center justify-between">
                <span>{currentQ.koreanContext}</span>
                <button
                  onClick={() => speakKorean(currentQ.koreanContext!.replace(/___/g, ''), speechRate)}
                  className="p-1 rounded-md text-pink-600 hover:bg-pink-100 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* DẠNG 1 & 2: TRẮC NGHIỆM VÀ ĐIỀN TỪ (Options Grid) */}
          {(currentQ.type === 'multiple-choice' || currentQ.type === 'fill-blank') && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                let optionStyle = 'border-stone-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-stone-800';

                if (isAnswerChecked) {
                  if (option === currentQ.correctAnswer) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-300 line-through';
                  } else {
                    optionStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-pink-500 bg-pink-50 ring-2 ring-pink-400 text-pink-800 font-bold';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerChecked}
                    onClick={() => {
                      playClickSound();
                      setSelectedOption(option);
                    }}
                    className={`p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-korean">{option}</span>
                    </div>

                    {isAnswerChecked && option === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerChecked && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* DẠNG 5: THẺ FLASHCARD (HÀN ➔ VIỆT) */}
          {currentQ.type === 'flashcard-vi' && (
            <div className="space-y-4">
              {/* Flashcard Header Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-stone-600 font-medium">Chế độ trả lời:</span>
                  <div className="inline-flex rounded-lg bg-white p-0.5 border border-stone-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setFlashcardInputMode('choice');
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        flashcardInputMode === 'choice'
                          ? 'bg-pink-500 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Trắc nghiệm 4 đáp án
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setFlashcardInputMode('type');
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        flashcardInputMode === 'type'
                          ? 'bg-pink-500 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Tự gõ nghĩa tiếng Việt
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {currentQ.romanization && (
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setShowRomanizationHint(!showRomanizationHint);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                      title="Bật/Tắt phiên âm"
                    >
                      {showRomanizationHint ? <EyeOff className="w-3.5 h-3.5 text-pink-600" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showRomanizationHint ? 'Ẩn phiên âm' : 'Hiện phiên âm'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setIsFlashcardFlipped(!isFlashcardFlipped);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 text-xs font-semibold transition-colors cursor-pointer"
                    title="Lật thẻ xem mặt sau"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlashcardFlipped ? 'Xem mặt trước' : 'Lật thẻ'}</span>
                  </button>
                </div>
              </div>

              {/* 3D Flashcard Presentation */}
              <div
                className={`relative min-h-[200px] sm:min-h-[230px] rounded-3xl p-6 sm:p-7 text-center transition-all duration-300 border-2 shadow-sm flex flex-col justify-between select-none ${
                  isAnswerChecked
                    ? isCorrect
                      ? 'bg-gradient-to-b from-emerald-50/70 to-white border-emerald-400 shadow-emerald-100'
                      : 'bg-gradient-to-b from-rose-50/70 to-white border-rose-300 shadow-rose-100'
                    : 'bg-gradient-to-b from-pink-50/40 via-white to-white border-pink-200 hover:border-pink-300'
                }`}
              >
                {/* Top of Card */}
                <div className="flex items-center justify-between w-full">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                    Cấp {currentQ.level} • {currentQ.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakKorean(currentQ.koreanWord || currentQ.question, speechRate)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold transition-colors cursor-pointer"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe chuẩn</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakKorean(currentQ.koreanWord || currentQ.question, speechRate * 0.7)}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
                      title="Nghe tốc độ chậm"
                    >
                      🐢 Chậm
                    </button>
                  </div>
                </div>

                {/* Center of Card: Front vs Back */}
                {!isFlashcardFlipped ? (
                  <div className="py-3 space-y-2">
                    <div className="font-korean text-4xl sm:text-5xl font-black text-stone-900 tracking-wide">
                      {currentQ.koreanWord || currentQ.question}
                    </div>
                    {currentQ.romanization && showRomanizationHint && (
                      <div className="text-xs sm:text-sm font-semibold text-pink-600 font-mono animate-fadeIn">
                        [{currentQ.romanization}]
                      </div>
                    )}
                    <p className="text-xs text-stone-500 font-medium pt-1">
                      (Hãy chọn hoặc gõ nghĩa tiếng Việt bên dưới để kiểm tra)
                    </p>
                  </div>
                ) : (
                  <div className="py-2 space-y-3 animate-fadeIn">
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Nghĩa Tiếng Việt
                      </span>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-0.5">
                        {currentQ.correctAnswer as string}
                      </div>
                    </div>
                    {currentQ.exampleKr && (
                      <div className="p-3 bg-white rounded-xl border border-stone-200 text-left text-xs sm:text-sm space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-stone-400">
                          <span>VÍ DỤ THỰC TẾ:</span>
                          <button
                            type="button"
                            onClick={() => speakKorean(currentQ.exampleKr!, speechRate)}
                            className="text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" /> Nghe ví dụ
                          </button>
                        </div>
                        <div className="font-korean font-semibold text-stone-900">
                          {currentQ.exampleKr}
                        </div>
                        <div className="text-stone-600 text-xs">
                          {currentQ.exampleVi}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom of Card */}
                <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100">
                  <span>Thẻ Flashcard từ vựng</span>
                  <span className="font-semibold text-pink-600">
                    {isFlashcardFlipped ? 'Mặt sau (Đáp án & Ví dụ)' : 'Mặt trước (Từ tiếng Hàn)'}
                  </span>
                </div>
              </div>

              {/* Answering Area: Options OR Text Input */}
              {flashcardInputMode === 'choice' && currentQ.options && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-stone-600">
                    Chọn nghĩa tiếng Việt chính xác của từ trên:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      let optionStyle = 'border-stone-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-stone-800';

                      if (isAnswerChecked) {
                        if (option === currentQ.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400 font-bold';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-300 line-through';
                        } else {
                          optionStyle = 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-pink-500 bg-pink-50 ring-2 ring-pink-400 text-pink-800 font-bold';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            playClickSound();
                            setSelectedOption(option);
                          }}
                          className={`p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                              isSelected ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-semibold">{option}</span>
                          </div>

                          {isAnswerChecked && option === currentQ.correctAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {flashcardInputMode === 'type' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-600 block">
                    Gõ nghĩa tiếng Việt của từ tiếng Hàn trên:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      disabled={isAnswerChecked}
                      value={typedViAnswer}
                      onChange={(e) => setTypedViAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isAnswerChecked && typedViAnswer.trim()) {
                          handleCheckAnswer();
                        }
                      }}
                      placeholder="Ví dụ: Xin chào, Cảm ơn, Thầy cô giáo..."
                      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-hidden ${
                        isAnswerChecked
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300'
                            : 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-200'
                          : 'border-stone-300 bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-200'
                      }`}
                    />
                    {isAnswerChecked && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" /> Đúng rồi
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-600 font-bold text-xs bg-white px-2 py-0.5 rounded-lg border border-rose-200">
                            <XCircle className="w-4 h-4" /> Đáp án: {currentQ.correctAnswer as string}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Mẹo: Có thể gõ tiếng Việt có dấu hoặc không dấu, bấm <kbd className="px-1.5 py-0.5 bg-stone-100 border rounded text-[10px] font-mono">Enter</kbd> để kiểm tra nhanh.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* DẠNG 3: GHÉP TỪ (Match Pairs) - Shuffled for fun and challenge */}
          {currentQ.type === 'match-pairs' && currentQ.pairs && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-stone-600 font-medium">
                    Chọn 1 từ tiếng Hàn và 1 nghĩa tương ứng để nối cặp:
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs">
                    Đã nối: {matchedPairs.length} / {currentQ.pairs.length} cặp
                  </span>
                </div>

                <button
                  onClick={handleManualReshuffle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
                  title="Đảo ngẫu nhiên vị trí các thẻ từ để tạo thử thách mới"
                >
                  <Shuffle className="w-3.5 h-3.5 text-pink-600" />
                  <span>Đảo vị trí ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Korean Column (Shuffled) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block">
                      Tiếng Hàn (Bấm để nghe & chọn)
                    </span>
                    <span className="text-[11px] text-stone-400">Cột 1</span>
                  </div>
                  {(shuffledKrList.length ? shuffledKrList : currentQ.pairs.map((p) => p.korean)).map((koreanWord, idx) => {
                    const isMatched = matchedPairs.includes(koreanWord);
                    const isSelected = selectedKrPair === koreanWord;
                    const isMismatch = mismatchPairs?.kr === koreanWord;

                    return (
                      <button
                        key={`kr-${idx}-${koreanWord}`}
                        disabled={isMatched}
                        onClick={() => handlePairSelect('kr', koreanWord)}
                        className={`w-full p-3.5 rounded-xl border text-left font-korean font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-700 opacity-80 cursor-default'
                            : isMismatch
                            ? 'bg-rose-100 border-rose-500 text-rose-800 ring-2 ring-rose-400'
                            : isSelected
                            ? 'bg-pink-100 border-pink-500 text-pink-800 ring-2 ring-pink-400 scale-[1.01]'
                            : 'bg-white border-stone-200 hover:border-pink-300 hover:bg-pink-50/40'
                        }`}
                      >
                        <span className="text-base">{koreanWord}</span>
                        <div className="flex items-center gap-1.5">
                          {isMatched ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              <Check className="w-3.5 h-3.5" /> Đã nối
                            </span>
                          ) : (
                            <Volume2 className="w-4 h-4 text-pink-400 hover:text-pink-600" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Vietnamese Column (Shuffled) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                      Nghĩa tiếng Việt
                    </span>
                    <span className="text-[11px] text-stone-400">Cột 2</span>
                  </div>
                  {(shuffledViList.length ? shuffledViList : currentQ.pairs.map((p) => p.vietnamese)).map((viMeaning, idx) => {
                    const matchingPair = currentQ.pairs?.find((p) => p.vietnamese === viMeaning);
                    const isMatched = matchingPair ? matchedPairs.includes(matchingPair.korean) : false;
                    const isSelected = selectedViPair === viMeaning;
                    const isMismatch = mismatchPairs?.vi === viMeaning;

                    return (
                      <button
                        key={`vi-${idx}-${viMeaning}`}
                        disabled={isMatched}
                        onClick={() => handlePairSelect('vi', viMeaning)}
                        className={`w-full p-3.5 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isMatched
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-700 opacity-80 cursor-default'
                            : isMismatch
                            ? 'bg-rose-100 border-rose-500 text-rose-800 ring-2 ring-rose-400'
                            : isSelected
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-800 ring-2 ring-emerald-400 scale-[1.01]'
                            : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                        }`}
                      >
                        <span>{viMeaning}</span>
                        {isMatched && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            <Check className="w-3.5 h-3.5" /> Đúng
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* DẠNG 4: GHÉP CÂU HOÀN CHỈNH (Word Order - Shuffled) */}
          {currentQ.type === 'word-order' && currentQ.wordBlocks && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-stone-500 italic">
                  Bấm các khối từ bên dưới để sắp xếp vào dòng trả lời theo đúng ngữ pháp:
                </p>
                <button
                  onClick={handleManualReshuffle}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  title="Xáo trộn lại vị trí các khối từ"
                >
                  <Shuffle className="w-3.5 h-3.5 text-stone-600" />
                  <span>Xáo trộn vị trí từ</span>
                </button>
              </div>

              {/* Answer Assembly Dropzone */}
              <div className="p-4 rounded-2xl bg-stone-50 border-2 border-dashed border-pink-200 min-h-[64px] flex items-center flex-wrap gap-2">
                {selectedOrderBlocks.length === 0 ? (
                  <span className="text-xs text-stone-400 italic">
                    Chưa có khối từ nào được chọn. Bấm vào các từ bên dưới...
                  </span>
                ) : (
                  selectedOrderBlocks.map((block, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playClickSound();
                        setSelectedOrderBlocks((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="px-3.5 py-2 rounded-xl bg-pink-500 text-white font-korean font-bold text-sm shadow-2xs hover:bg-pink-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Bấm để gỡ từ này"
                    >
                      <span>{block}</span>
                      <span className="text-xs opacity-75">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Word Blocks to Choose From (Shuffled) */}
              <div className="flex items-center flex-wrap gap-2.5 pt-2">
                {(shuffledWordBlocks.length ? shuffledWordBlocks : currentQ.wordBlocks).map((block, idx) => {
                  const isUsed = selectedOrderBlocks.includes(block);
                  return (
                    <button
                      key={idx}
                      disabled={isUsed || isAnswerChecked}
                      onClick={() => {
                        playClickSound();
                        speakKorean(block, speechRate);
                        setSelectedOrderBlocks((prev) => [...prev, block]);
                      }}
                      className={`px-4 py-2.5 rounded-xl font-korean font-bold text-sm border transition-all cursor-pointer ${
                        isUsed
                          ? 'bg-stone-100 text-stone-400 border-stone-200 opacity-40 cursor-not-allowed'
                          : 'bg-white border-stone-300 text-stone-800 hover:border-pink-400 hover:bg-pink-50 shadow-2xs hover:scale-105'
                      }`}
                    >
                      {block}
                    </button>
                  );
                })}

                {selectedOrderBlocks.length > 0 && !isAnswerChecked && (
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedOrderBlocks([]);
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline px-3 py-1 cursor-pointer"
                  >
                    Xóa làm lại
                  </button>
                )}
              </div>
            </div>
          )}

          {/* HINT / EXPLANATION BOX */}
          {isAnswerChecked && (
            <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
              isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-800">Chính xác tuyệt vời! (+10 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span className="text-rose-800">Chưa chính xác, hãy xem giải thích nhé:</span>
                    </>
                  )}
                </div>

                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/80 text-stone-700">
                  Đáp án chuẩn
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* ACTION BUTTONS (Kiểm tra / Câu tiếp theo) */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            {currentQ.hint && !isAnswerChecked && (
              <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Gợi ý: {currentQ.hint}</span>
              </div>
            )}

            <div className="ml-auto flex items-center gap-3">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    ((currentQ.type === 'multiple-choice' || currentQ.type === 'fill-blank') && !selectedOption) ||
                    (currentQ.type === 'flashcard-vi' && (flashcardInputMode === 'choice' ? !selectedOption : !typedViAnswer.trim())) ||
                    (currentQ.type === 'word-order' && selectedOrderBlocks.length === 0) ||
                    (currentQ.type === 'match-pairs' && matchedPairs.length < (currentQ.pairs?.length || 0))
                  }
                  className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentQuestionIndex + 1 < filteredQuestions.length ? 'Câu tiếp theo' : 'Xem kết quả tổng kết'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
