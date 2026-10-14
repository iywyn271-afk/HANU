import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Users, 
  Play, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Flame, 
  Award, 
  Volume2, 
  Layers, 
  HelpCircle,
  Plus,
  Send,
  Hash,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { SharedQuizSet, QuizLeaderboardEntry, QuizQuestion, ThemeId } from '../types';
import { SHARED_QUIZ_SETS } from '../data/sharedQuizzesData';
import { getThemeConfig } from '../data/themeData';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound, speakKorean } from '../utils/audio';
import { CreateRoomModal } from './CreateRoomModal';
import confetti from 'canvas-confetti';

interface SharedQuizArenaProps {
  playerName: string;
  playerAvatar: string;
  speechRate: number;
  themeId: ThemeId;
  onAddXP: (amount: number) => void;
  customQuizzes?: QuizQuestion[];
  onOpenCreateQuiz?: () => void;
}

const CUSTOM_ROOMS_STORAGE_KEY = 'hanu_custom_quiz_rooms_v1';

export const SharedQuizArena: React.FC<SharedQuizArenaProps> = ({
  playerName,
  playerAvatar,
  speechRate,
  themeId,
  onAddXP,
  customQuizzes = [],
  onOpenCreateQuiz
}) => {
  const themeConfig = getThemeConfig(themeId);

  // Custom User Created Rooms
  const [customRooms, setCustomRooms] = useState<SharedQuizSet[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_ROOMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Sync custom rooms to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_ROOMS_STORAGE_KEY, JSON.stringify(customRooms));
    } catch {}
  }, [customRooms]);

  // Combined rooms
  const allRooms: SharedQuizSet[] = [...customRooms, ...SHARED_QUIZ_SETS];

  // Room Filter Tab
  const [filterTab, setFilterTab] = useState<'all' | 'custom' | 'community'>('all');

  // Modals state
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [passwordPromptRoom, setPasswordPromptRoom] = useState<SharedQuizSet | null>(null);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Arena State
  const [activeSet, setActiveSet] = useState<SharedQuizSet | null>(null);
  const [inputRoomCode, setInputRoomCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // In-Game Quiz State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);

  // Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Results & Leaderboard State
  const [showResults, setShowResults] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<QuizLeaderboardEntry[]>([]);

  // Timer effect during quiz
  useEffect(() => {
    if (isPlaying && !showResults) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, showResults]);

  // Request to start a room (checks password if needed)
  const handleRequestStartQuiz = (set: SharedQuizSet) => {
    playClickSound();
    if (set.hasPassword && set.password) {
      setPasswordPromptRoom(set);
      setEnteredPassword('');
      setPasswordError('');
    } else {
      handleStartQuiz(set);
    }
  };

  // Confirm Room Password
  const handleConfirmPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordPromptRoom) return;

    if (enteredPassword.trim() === (passwordPromptRoom.password || '')) {
      playCorrectSound();
      const target = passwordPromptRoom;
      setPasswordPromptRoom(null);
      handleStartQuiz(target);
    } else {
      playWrongSound();
      setPasswordError('Mật mã phòng không chính xác! Vui lòng hỏi lại chủ phòng.');
    }
  };

  // Start a Quiz Set
  const handleStartQuiz = (set: SharedQuizSet) => {
    setActiveSet(set);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setUserScore(0);
    setElapsedSeconds(0);
    setShowResults(false);
    setIsPlaying(true);
    setLeaderboard([...(set.defaultLeaderboard || [])]);
    setErrorMessage('');
  };

  // Join Room by Code
  const handleJoinByCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    const code = inputRoomCode.trim().toUpperCase();
    if (!code) {
      setErrorMessage('Vui lòng nhập mã phòng hoặc mã đề thi (ví dụ: HANU-TOPIK)!');
      return;
    }

    const found = allRooms.find(r => r.code.toUpperCase() === code || r.id.toUpperCase() === code);
    if (found) {
      setInputRoomCode('');
      handleRequestStartQuiz(found);
    } else {
      setErrorMessage(`Không tìm thấy phòng thi nào có mã "${code}". Vui lòng thử lại!`);
    }
  };

  // Check answer for current question
  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    playClickSound();
    setSelectedOption(option);
  };

  const handleVerifyAnswer = () => {
    if (!activeSet || !selectedOption) return;
    const currentQ = activeSet.questions[currentIndex];
    if (!currentQ) return;

    const correct = selectedOption === currentQ.correctAnswer;
    setIsAnswerCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      playCorrectSound();
      setUserScore((prev) => prev + 1);
      onAddXP(15);
    } else {
      playWrongSound();
    }
  };

  // Next Question or Finish Quiz
  const handleNextQuestion = () => {
    playClickSound();
    if (!activeSet) return;

    if (currentIndex + 1 < activeSet.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsAnswerCorrect(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeSet) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const finalScore = userScore + (isAnswerCorrect ? 1 : 0);
    const finalSeconds = elapsedSeconds;

    const userEntry: QuizLeaderboardEntry = {
      id: `user-${Date.now()}`,
      playerName: playerName || 'Bạn (Học viên)',
      playerAvatar: playerAvatar || '🌸',
      score: finalScore,
      totalQuestions: activeSet.questions.length,
      timeSpentSeconds: finalSeconds,
      completedAt: 'Vừa xong',
      isCurrentUser: true,
      badge: finalScore === activeSet.questions.length ? '🌟 Toàn Thắng' : undefined
    };

    // Sort leaderboard by score desc, then timeSpentSeconds asc
    const merged = [userEntry, ...(activeSet.defaultLeaderboard || [])].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSpentSeconds - b.timeSpentSeconds;
    });

    setLeaderboard(merged);
    setShowResults(true);
    setIsPlaying(false);

    // If it's a custom room, update its leaderboard in local storage
    if (activeSet.isCustomRoom) {
      setCustomRooms(prev => prev.map(r => {
        if (r.id === activeSet.id) {
          return {
            ...r,
            participantsCount: (r.participantsCount || 1) + 1,
            defaultLeaderboard: merged
          };
        }
        return r;
      }));
    }

    playFanfareSound();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleCopyRoomInvite = (set: SharedQuizSet) => {
    playClickSound();
    const text = `🎮 THÁCH ĐẤU QUIZ TIẾNG HÀN: ${set.title}
🔑 Mã phòng: ${set.code}
${set.hasPassword ? `🔒 Mật mã phòng: ${set.password}` : '🌐 Mật mã: Mở tự do (Không cần mật mã)'}
👥 Số lượng: Không giới hạn người tham gia!
👉 Mở tab "Trò chơi" -> Nhập mã "${set.code}" để thi đua top ngay!`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePronounce = (text: string) => {
    playClickSound();
    speakKorean(text, speechRate);
  };

  // Filtered rooms list
  const displayedRooms = allRooms.filter(r => {
    if (filterTab === 'custom') return r.isCustomRoom;
    if (filterTab === 'community') return !r.isCustomRoom;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* ARENA HERO BANNER */}
      <div 
        className="rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="p-1 rounded-lg bg-white/20 text-white">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Phòng Thi Chung & Đấu Trường Quiz
            </span>
            <span className="text-[11px] font-semibold bg-white/10 px-2 py-0.5 rounded-full">
              ♾️ Không giới hạn người chơi
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Thách Đấu & Cùng Làm Quiz Tiếng Hàn
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
            Chọn phòng thi có sẵn, tự <strong>Tạo phòng mới (có mật mã bảo vệ)</strong> hoặc nhập <strong>Mã Phòng</strong> để cùng bạn bè đua top bảng vàng!
          </p>

          {/* Quick Join & Create Room Action Row */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <form onSubmit={handleJoinByCode} className="flex-1 flex items-center gap-2 max-w-md">
              <div className="relative flex-1">
                <Hash className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Nhập mã phòng (ví dụ: HANU-TOPIK, KPOP-VIBE)..."
                  value={inputRoomCode}
                  onChange={(e) => setInputRoomCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-stone-900 text-xs sm:text-sm font-bold uppercase placeholder:normal-case placeholder:font-normal focus:outline-hidden shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                <span>Vào thi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsCreateRoomModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-stone-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-amber-200"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>TẠO PHÒNG MỚI (CÓ MẬT MÃ)</span>
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs font-bold bg-white/20 backdrop-blur-xs text-rose-100 p-2 rounded-xl mt-2 inline-block">
              ⚠️ {errorMessage}
            </p>
          )}
        </div>
      </div>

      {/* PASSWORD ENTRY MODAL (When room has password) */}
      {passwordPromptRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-sm w-full p-6 space-y-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                Phòng Thi Yêu Cầu Mật Mã
              </h3>
              <p className="text-xs text-stone-500">
                Phòng <strong>"{passwordPromptRoom.title}"</strong> (Mã: {passwordPromptRoom.code}) được bảo vệ bằng mật khẩu.
              </p>
            </div>

            <form onSubmit={handleConfirmPassword} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Nhập mật mã phòng:
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="Mật mã phòng..."
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-bold focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {passwordError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2 rounded-xl">
                  ⚠️ {passwordError}
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordPromptRoom(null)}
                  className="flex-1 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs"
                >
                  Xác nhận & Vào thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 1: ACTIVE QUIZ IN PROGRESS */}
      {isPlaying && activeSet && !showResults && (
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6 animate-fadeIn">
          {/* Top In-Game Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{activeSet.icon}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-stone-900 text-sm sm:text-base">
                    {activeSet.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
                    Mã: {activeSet.code}
                  </span>
                  {activeSet.hasPassword && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Có mật mã</span>
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ♾️ Không giới hạn người
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Câu hỏi {currentIndex + 1} / {activeSet.questions.length} • Điểm hiện tại: {userScore}
                </p>
              </div>
            </div>

            {/* Live Clock & Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>Thời gian: {elapsedSeconds}s</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsPlaying(false);
                }}
                className="px-3 py-1.5 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Rời phòng
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentIndex + 1) / activeSet.questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
              }}
            />
          </div>

          {/* Current Question Body */}
          {(() => {
            const q = activeSet.questions[currentIndex];
            if (!q) return null;

            return (
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200 inline-block">
                    {q.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {q.question}
                  </h4>

                  {q.koreanContext && (
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
                      <span className="font-korean font-bold text-base sm:text-lg text-stone-800">
                        {q.koreanContext}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePronounce(q.koreanContext || '')}
                        className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
                        title="Nghe phát âm tiếng Hàn"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {q.koreanWord && (
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
                      <div className="font-korean font-black text-2xl text-stone-900 flex items-center justify-center gap-2">
                        <span>{q.koreanWord}</span>
                        <button
                          type="button"
                          onClick={() => handlePronounce(q.koreanWord || '')}
                          className="p-1.5 rounded-full hover:bg-white text-stone-500 hover:text-pink-600 transition-colors cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      {q.romanization && (
                        <div className="font-mono text-xs text-stone-400">
                          [{q.romanization}]
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options?.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrectChoice = isAnswerChecked && opt === q.correctAnswer;
                    const isWrongChoice = isAnswerChecked && isSelected && !isAnswerCorrect;

                    let btnStyle = 'border-stone-200 hover:border-stone-300 bg-stone-50/70 hover:bg-stone-100/70 text-stone-800';
                    if (isSelected && !isAnswerChecked) {
                      btnStyle = 'border-stone-900 bg-stone-900 text-white shadow-xs';
                    } else if (isCorrectChoice) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold';
                    } else if (isWrongChoice) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-300';
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => handleOptionClick(opt)}
                        className={`p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected && !isAnswerChecked
                              ? 'bg-white/20 text-white'
                              : isCorrectChoice
                              ? 'bg-emerald-600 text-white'
                              : isWrongChoice
                              ? 'bg-rose-600 text-white'
                              : 'bg-stone-200 text-stone-700'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isCorrectChoice && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isWrongChoice && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer */}
                {isAnswerChecked && (
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 animate-fadeIn ${
                    isAnswerCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5">
                      {isAnswerCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác! (+15 XP)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Chưa chính xác! Đáp án đúng: {String(q.correctAnswer)}</span>
                        </>
                      )}
                    </div>
                    <p className="text-stone-700">{q.explanation}</p>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-end pt-3 border-t border-stone-100">
                  {!isAnswerChecked ? (
                    <button
                      type="button"
                      disabled={!selectedOption}
                      onClick={handleVerifyAnswer}
                      className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(90deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
                      }}
                    >
                      <span>{currentIndex + 1 < activeSet.questions.length ? 'Câu tiếp theo' : 'Xem kết quả & Bảng xếp hạng'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 2: RESULTS & LEADERBOARD OF THE SHARED ROOM */}
      {showResults && activeSet && (
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="text-center space-y-2 pb-4 border-b border-stone-100">
            <span className="text-4xl inline-block animate-bounce">🏆</span>
            <h3 className="text-2xl font-black text-stone-900">
              Hoàn Thành Đề Thi: {activeSet.title}
            </h3>
            <p className="text-xs text-stone-500">
              Mã phòng: <strong className="text-stone-800 font-mono">{activeSet.code}</strong> • 
              {activeSet.hasPassword && <span className="ml-1 text-amber-700 font-bold">🔒 Có mật mã •</span>}
              <span className="ml-1 text-emerald-700 font-bold">♾️ Không giới hạn người</span>
            </p>

            <div className="inline-flex items-center gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 mt-2">
              <div className="text-center">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Điểm số</span>
                <span className="text-lg font-black text-pink-600">{userScore} / {activeSet.questions.length}</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div className="text-center">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Thời gian</span>
                <span className="text-lg font-black text-emerald-600">{elapsedSeconds}s</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div className="text-center">
                <span className="text-[10px] text-stone-500 font-bold uppercase block">XP Thưởng</span>
                <span className="text-lg font-black text-amber-600">+{userScore * 15} XP</span>
              </div>
            </div>
          </div>

          {/* Share Room Code Bar */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-black text-stone-900 block">
                  Chia sẻ phòng thi cho bạn bè cùng đua điểm:
                </span>
                <div className="flex items-center gap-2 text-xs text-stone-600 font-mono flex-wrap">
                  <span>Mã phòng: <strong className="text-pink-600 font-black">{activeSet.code}</strong></span>
                  {activeSet.hasPassword && (
                    <span className="text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded font-bold">
                      Mật mã: {activeSet.password}
                    </span>
                  )}
                  <span className="text-emerald-700 font-sans font-bold">♾️ Không giới hạn người</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopyRoomInvite(activeSet)}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-amber-300 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs self-start sm:self-auto shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Đã chép thông tin phòng!' : 'Sao chép mã & mật khẩu'}</span>
            </button>
          </div>

          {/* LEADERBOARD TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Bảng Xếp Hạng Phòng Thi ({leaderboard.length} người • Không giới hạn ♾️)</span>
              </h4>
              <span className="text-[11px] text-stone-400">Xếp hạng theo điểm & thời gian</span>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {leaderboard.map((item, index) => {
                const isCurrentUser = item.isCurrentUser;
                const isTop1 = index === 0;
                const isTop2 = index === 1;
                const isTop3 = index === 2;

                return (
                  <div
                    key={item.id || index}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrentUser
                        ? 'border-pink-500 bg-pink-50/70 ring-2 ring-pink-300'
                        : isTop1
                        ? 'border-amber-300 bg-amber-50/50'
                        : 'border-stone-200 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isTop1 ? 'bg-amber-500 text-white shadow-xs' :
                        isTop2 ? 'bg-slate-400 text-white' :
                        isTop3 ? 'bg-amber-700 text-white' :
                        'bg-stone-200 text-stone-700'
                      }`}>
                        {index + 1}
                      </span>

                      <span className="text-xl shrink-0">{item.playerAvatar}</span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {item.playerName}
                          </span>
                          {isCurrentUser && (
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-pink-500 text-white">
                              BẠN
                            </span>
                          )}
                          {item.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400">
                          {item.completedAt}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-black text-stone-900">
                        {item.score} / {item.totalQuestions} câu
                      </div>
                      <div className="text-[11px] font-mono text-emerald-700">
                        ⏱️ {item.timeSpentSeconds}s
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowResults(false);
                setIsPlaying(false);
              }}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
            >
              ← Chọn phòng khác
            </button>

            <button
              type="button"
              onClick={() => handleStartQuiz(activeSet)}
              className="px-5 py-2.5 rounded-xl text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              style={{
                background: `linear-gradient(90deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thi lại để bứt phá Top 1</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 3: BROWSE ALL SHARED QUIZ SETS & ROOMS */}
      {!isPlaying && !showResults && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <span>Kho Phòng Thi & Đấu Trường Quiz</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  {allRooms.length} phòng thi
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Tham gia phòng thi có sẵn hoặc tạo phòng riêng có mật mã để mời bạn bè không giới hạn số người!
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsCreateRoomModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>TẠO PHÒNG MỚI (CÓ MẬT MÃ)</span>
              </button>

              {onOpenCreateQuiz && (
                <button
                  type="button"
                  onClick={onOpenCreateQuiz}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tạo Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 w-fit text-xs font-bold">
            <button
              onClick={() => {
                playClickSound();
                setFilterTab('all');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterTab === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tất cả phòng ({allRooms.length})
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilterTab('custom');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                filterTab === 'custom' ? 'bg-white text-amber-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Crown className="w-3 h-3 text-amber-500" />
              <span>Phòng bạn tạo ({customRooms.length})</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setFilterTab('community');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterTab === 'community' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Phòng chuẩn ({SHARED_QUIZ_SETS.length})
            </button>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedRooms.map((quizSet) => (
              <div
                key={quizSet.id}
                className={`bg-white rounded-3xl border transition-all flex flex-col justify-between group space-y-4 p-5 shadow-xs hover:shadow-md ${
                  quizSet.isCustomRoom ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200 hover:border-pink-300'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl p-2 rounded-2xl bg-stone-50 border border-stone-100 group-hover:scale-110 transition-transform">
                        {quizSet.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-pink-600 transition-colors">
                            {quizSet.title}
                          </h4>
                          {quizSet.isCustomRoom && (
                            <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-amber-500 text-white">
                              Phòng Bạn Tạo
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 font-mono">
                            Mã: {quizSet.code}
                          </span>

                          {quizSet.hasPassword ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-amber-700" />
                              <span>Có mật mã</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                              <Unlock className="w-3 h-3 text-emerald-600" />
                              <span>Mở tự do</span>
                            </span>
                          )}

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                            ♾️ Không giới hạn người
                          </span>

                          <span className="text-[10px] text-stone-400">
                            • {quizSet.questionsCount} câu hỏi
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {quizSet.subTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Users className="w-3.5 h-3.5 text-stone-400" />
                    <span>{quizSet.participantsCount.toLocaleString()} người đã tham gia</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyRoomInvite(quizSet)}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                      title="Sao chép lời mời & mật mã phòng để gửi bạn bè"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRequestStartQuiz(quizSet)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer group-hover:bg-pink-600"
                    >
                      {quizSet.hasPassword ? <Lock className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      <span>{quizSet.hasPassword ? 'Nhập mã vào thi' : 'Vào thi ngay'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE ROOM MODAL */}
      <CreateRoomModal
        isOpen={isCreateRoomModalOpen}
        onClose={() => setIsCreateRoomModalOpen(false)}
        playerName={playerName}
        onRoomCreated={(newRoom) => {
          setCustomRooms(prev => [newRoom, ...prev]);
        }}
        customQuizzes={customQuizzes}
      />
    </div>
  );
};
