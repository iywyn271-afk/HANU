import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Users, 
  Trophy, 
  Zap, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  Flame, 
  Check, 
  Play, 
  Award,
  Layers,
  Heart,
  Volume2
} from 'lucide-react';
import { SharedQuizSet, QuizQuestion, ThemeId } from '../types';
import { SHARED_QUIZ_SETS } from '../data/sharedQuizzesData';
import { SharedQuizArena } from './SharedQuizArena';
import { getThemeConfig } from '../data/themeData';
import { 
  playClickSound, 
  playCorrectSound, 
  playWrongSound, 
  playFanfareSound, 
  speakKorean 
} from '../utils/audio';
import confetti from 'canvas-confetti';

interface GamesViewProps {
  playerName: string;
  playerAvatar: string;
  speechRate: number;
  themeId: ThemeId;
  onAddXP: (amount: number) => void;
  customQuizzes?: QuizQuestion[];
  onOpenCreateQuiz?: () => void;
}

// Memory Cards vocabulary pairs
const MEMORY_CARD_PAIRS = [
  { id: '1', kr: '사과', vi: 'Quả táo', icon: '🍎' },
  { id: '2', kr: '물', vi: 'Nước uống', icon: '💧' },
  { id: '3', kr: '친구', vi: 'Bạn bè', icon: '👫' },
  { id: '4', kr: '학교', vi: 'Trường học', icon: '🏫' },
  { id: '5', kr: '사랑', vi: 'Tình yêu', icon: '💖' },
  { id: '6', kr: '고양이', vi: 'Con mèo', icon: '🐱' },
];

export const GamesView: React.FC<GamesViewProps> = ({
  playerName,
  playerAvatar,
  speechRate,
  themeId,
  onAddXP,
  customQuizzes = [],
  onOpenCreateQuiz
}) => {
  const themeConfig = getThemeConfig(themeId);
  const [activeGameMode, setActiveGameMode] = useState<'shared-arena' | 'memory-game' | 'speed-sprint'>('shared-arena');

  // --- MEMORY MATCH MINI-GAME STATE ---
  interface MemoryCard {
    cardId: string;
    pairId: string;
    content: string;
    type: 'kr' | 'vi';
    icon: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [memoryTimer, setMemoryTimer] = useState<number>(0);
  const [isMemoryPlaying, setIsMemoryPlaying] = useState<boolean>(false);
  const [memoryFinished, setMemoryFinished] = useState<boolean>(false);

  // Initialize Memory Game
  const initMemoryGame = () => {
    const deck: MemoryCard[] = [];
    MEMORY_CARD_PAIRS.forEach((pair) => {
      deck.push({
        cardId: `${pair.id}-kr`,
        pairId: pair.id,
        content: pair.kr,
        type: 'kr',
        icon: pair.icon,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        cardId: `${pair.id}-vi`,
        pairId: pair.id,
        content: pair.vi,
        type: 'vi',
        icon: pair.icon,
        isFlipped: false,
        isMatched: false
      });
    });

    const shuffled = deck.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedCards([]);
    setMovesCount(0);
    setMatchedPairsCount(0);
    setMemoryTimer(0);
    setMemoryFinished(false);
    setIsMemoryPlaying(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMemoryPlaying && !memoryFinished) {
      interval = setInterval(() => {
        setMemoryTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMemoryPlaying, memoryFinished]);

  const handleCardClick = (card: MemoryCard) => {
    if (!isMemoryPlaying || card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    playClickSound();
    if (card.type === 'kr') {
      speakKorean(card.content, speechRate);
    }

    const updated = cards.map((c) => (c.cardId === card.cardId ? { ...c, isFlipped: true } : c));
    setCards(updated);

    const nextFlipped = [...flippedCards, card];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMovesCount((prev) => prev + 1);
      const [first, second] = nextFlipped;

      if (first.pairId === second.pairId) {
        // MATCH!
        playCorrectSound();
        const nextMatchedCount = matchedPairsCount + 1;
        setMatchedPairsCount(nextMatchedCount);

        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) => (c.pairId === first.pairId ? { ...c, isMatched: true } : c))
          );
          setFlippedCards([]);

          if (nextMatchedCount === MEMORY_CARD_PAIRS.length) {
            setMemoryFinished(true);
            setIsMemoryPlaying(false);
            onAddXP(50);
            playFanfareSound();
            confetti({ particleCount: 60, spread: 70 });
          }
        }, 500);
      } else {
        // NOT A MATCH
        playWrongSound();
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.cardId === first.cardId || c.cardId === second.cardId ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* GAME HUB TOP BAR */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1 rounded-lg bg-pink-100 text-pink-700">
                <Gamepad2 className="w-5 h-5" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
                K-Games & Đấu Trường Quiz
              </span>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                🔥 Tính điểm & Đua Top
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              Trung Tâm Trò Chơi Học Tiếng Hàn
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Vừa chơi vừa nhớ từ vựng phản xạ siêu tốc, thi đấu đối kháng trực tiếp và giải trí xả stress!
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold">
              <span>{playerAvatar}</span>
              <span>{playerName}</span>
            </div>
          </div>
        </div>

        {/* Game Mode Switcher Navigation Pills */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveGameMode('shared-arena');
            }}
            className={`flex-1 min-w-[200px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeGameMode === 'shared-arena'
                ? 'bg-white text-stone-900 shadow-sm ring-1 ring-black/5'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-4 h-4 text-pink-600" />
            <span>👥 Đấu Trường Quiz (5 Phòng Thi)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveGameMode('memory-game');
              if (cards.length === 0) {
                initMemoryGame();
              }
            }}
            className={`flex-1 min-w-[190px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeGameMode === 'memory-game'
                ? 'bg-white text-stone-900 shadow-sm ring-1 ring-black/5'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>🎴 Thử Thách Lật Thẻ Trí Nhớ</span>
          </button>
        </div>
      </div>

      {/* MODE 1: SHARED QUIZ ARENA (5 Multiplayer Game Rooms) */}
      {activeGameMode === 'shared-arena' && (
        <SharedQuizArena
          playerName={playerName}
          playerAvatar={playerAvatar}
          speechRate={speechRate}
          themeId={themeId}
          onAddXP={onAddXP}
          customQuizzes={customQuizzes}
          onOpenCreateQuiz={onOpenCreateQuiz}
        />
      )}

      {/* MODE 2: MEMORY MATCH MINI-GAME */}
      {activeGameMode === 'memory-game' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6 animate-fadeIn">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎴</span>
                <h3 className="text-lg font-black text-stone-900">
                  Lật Thẻ Trí Nhớ Hàn - Việt (Memory Card Match)
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Lật mở các cặp thẻ từ tiếng Hàn và nghĩa tiếng Việt tương ứng để hoàn thành trong thời gian nhanh nhất!
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Thời gian: {memoryTimer}s</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold">
                <Flame className="w-4 h-4 text-pink-600" />
                <span>Số bước: {movesCount}</span>
              </div>

              <button
                type="button"
                onClick={initMemoryGame}
                className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                title="Chơi lại ván mới"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Winning Screen */}
          {memoryFinished && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-2 border-emerald-300 text-center space-y-3 animate-fadeIn">
              <span className="text-4xl block animate-bounce">🎉</span>
              <h4 className="text-xl font-black text-stone-900">
                Xuất Sắc! Bạn Đã Hoàn Thành Trò Chơi!
              </h4>
              <p className="text-xs text-stone-600">
                Thời gian: <strong>{memoryTimer} giây</strong> • Tổng số bước: <strong>{movesCount}</strong> • Thưởng: <strong className="text-emerald-700">+50 XP</strong>
              </p>
              <button
                type="button"
                onClick={initMemoryGame}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Chơi lại màn tiếp theo 🔄
              </button>
            </div>
          )}

          {/* Memory Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {cards.map((card) => {
              const isRevealed = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.cardId}
                  onClick={() => handleCardClick(card)}
                  className={`h-28 rounded-2xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer select-none transform ${
                    card.isMatched
                      ? 'border-emerald-400 bg-emerald-50 opacity-80 scale-95 shadow-2xs'
                      : isRevealed
                      ? 'border-pink-500 bg-white shadow-md ring-2 ring-pink-200'
                      : 'border-stone-200 bg-gradient-to-tr from-stone-100 to-stone-50 hover:border-pink-300 hover:bg-pink-50/30'
                  }`}
                >
                  {isRevealed ? (
                    <div className="space-y-1 animate-fadeIn">
                      <span className="text-2xl block">{card.icon}</span>
                      <span className={`text-xs font-bold block ${
                        card.type === 'kr' ? 'font-korean font-extrabold text-pink-700' : 'text-stone-800'
                      }`}>
                        {card.content}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">
                        {card.type === 'kr' ? 'Tiếng Hàn' : 'Tiếng Việt'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-stone-300 flex flex-col items-center justify-center">
                      <Sparkles className="w-6 h-6 text-pink-300" />
                      <span className="text-[10px] font-bold font-korean mt-1 text-stone-400">한</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-stone-400">
            Tiến độ: {matchedPairsCount} / {MEMORY_CARD_PAIRS.length} cặp đã ghép đúng
          </div>
        </div>
      )}
    </div>
  );
};
