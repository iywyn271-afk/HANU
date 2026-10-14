import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Lock, 
  Unlock, 
  Sparkles, 
  Key, 
  Copy, 
  Check, 
  HelpCircle,
  Hash,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import { SharedQuizSet, QuizQuestion } from '../types';
import { SHARED_QUIZ_SETS } from '../data/sharedQuizzesData';
import { playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  onRoomCreated: (newRoom: SharedQuizSet) => void;
  customQuizzes?: QuizQuestion[];
}

const ROOM_ICONS = ['🏆', '🎮', '🎧', '✈️', '💼', '👑', '⭐', '🚀', '🔥', '🌸', '🐯', '🐼'];

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
  playerName,
  onRoomCreated,
  customQuizzes = []
}) => {
  // Form State
  const [title, setTitle] = useState('');
  const [code, setCode] = useState(() => `ROOM-${Math.floor(1000 + Math.random() * 9000)}`);
  const [selectedIcon, setSelectedIcon] = useState('🎮');
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedSetPresetId, setSelectedSetPresetId] = useState(SHARED_QUIZ_SETS[0]?.id || 'sq-topik-1');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Generated success state
  const [createdRoomInfo, setCreatedRoomInfo] = useState<SharedQuizSet | null>(null);
  const [copiedShareText, setCopiedShareText] = useState(false);

  if (!isOpen) return null;

  const handleGenerateRandomCode = () => {
    playClickSound();
    const prefix = ['KOREA', 'HANU', 'SEOUL', 'TOPIK', 'CHALLENGE', 'ROOM'];
    const p = prefix[Math.floor(Math.random() * prefix.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    setCode(`${p}-${num}`);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên phòng thi!');
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMessage('Vui lòng nhập mã phòng!');
      return;
    }

    if (hasPassword && !password.trim()) {
      setErrorMessage('Bạn đã bật mật mã bảo vệ, vui lòng nhập mật khẩu phòng!');
      return;
    }

    // Determine questions based on preset
    const preset = SHARED_QUIZ_SETS.find(s => s.id === selectedSetPresetId) || SHARED_QUIZ_SETS[0];
    let questionsToUse: QuizQuestion[] = [...preset.questions];

    if (selectedSetPresetId === 'custom' && customQuizzes.length > 0) {
      questionsToUse = [...customQuizzes];
    }

    const newRoom: SharedQuizSet = {
      id: `custom-room-${Date.now()}`,
      code: cleanCode,
      title: title.trim(),
      subTitle: description.trim() || `Phòng thi đấu do ${playerName || 'Chủ phòng'} tạo • Không giới hạn người tham gia`,
      category: preset.category || 'Phòng thi tùy chỉnh',
      difficulty: preset.difficulty || 'Trung bình',
      icon: selectedIcon,
      questionsCount: questionsToUse.length,
      participantsCount: 1,
      author: playerName || 'Bạn (Chủ phòng)',
      questions: questionsToUse,
      isCommunity: true,
      isCustomRoom: true,
      isUnlimited: true,
      hasPassword: hasPassword,
      password: hasPassword ? password.trim() : undefined,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      hostName: playerName || 'Chủ phòng',
      defaultLeaderboard: [
        {
          id: `host-${Date.now()}`,
          playerName: `${playerName || 'Chủ phòng'} (Host)`,
          playerAvatar: selectedIcon,
          score: questionsToUse.length,
          totalQuestions: questionsToUse.length,
          timeSpentSeconds: 45,
          completedAt: 'Vừa tạo phòng',
          badge: '👑 Chủ Phòng'
        }
      ]
    };

    onRoomCreated(newRoom);
    setCreatedRoomInfo(newRoom);
    playCorrectSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyShare = () => {
    if (!createdRoomInfo) return;
    playClickSound();

    const text = `🎮 THÁCH ĐẤU QUIZ TIẾNG HÀN: ${createdRoomInfo.title}
🔑 Mã phòng: ${createdRoomInfo.code}
${createdRoomInfo.hasPassword ? `🔒 Mật mã phòng: ${createdRoomInfo.password}` : '🌐 Mật mã: Mở tự do (Không cần mật mã)'}
👥 Số lượng: Không giới hạn người tham gia (Đua top bảng vàng)!
👉 Vào web mở tab "Trò chơi" -> Nhập mã "${createdRoomInfo.code}" để thi ngay!`;

    navigator.clipboard.writeText(text);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="p-1 rounded-lg bg-white/20 text-white">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Đấu Trường Quiz Chung
            </span>
            <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>♾️ Không giới hạn người</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Tạo Phòng Chơi Trò Chơi Mới
          </h3>
          <p className="text-xs text-white/90 mt-0.5">
            Tạo phòng thi riêng, cài đặt mật mã bảo vệ hoặc mở tự do để bạn bè và cộng đồng cùng vào so tài!
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {createdRoomInfo ? (
            /* Success Screen after room created */
            <div className="space-y-5 text-center py-2 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-3xl flex items-center justify-center mx-auto shadow-sm animate-bounce">
                {createdRoomInfo.icon}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                  🎉 Phòng chơi đã sẵn sàng!
                </span>
                <h4 className="text-xl font-black text-stone-900">
                  {createdRoomInfo.title}
                </h4>
                <p className="text-xs text-stone-500">
                  {createdRoomInfo.subTitle}
                </p>
              </div>

              {/* Room Card Preview */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2.5 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-bold">MÃ PHÒNG:</span>
                  <span className="text-base font-black font-mono text-pink-600 bg-white px-3 py-1 rounded-xl border border-pink-200">
                    {createdRoomInfo.code}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-bold">MẬT MÃ PHÒNG:</span>
                  <span className="text-xs font-bold text-stone-800 bg-white px-2.5 py-1 rounded-xl border border-stone-200 flex items-center gap-1">
                    {createdRoomInfo.hasPassword ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-mono text-stone-900 font-black">{createdRoomInfo.password}</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mở tự do (Không có mật mã)</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-bold">GIỚI HẠN NGƯỜI CHƠI:</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ♾️ Không giới hạn
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-bold">SỐ CÂU HỎI:</span>
                  <span className="text-xs font-bold text-stone-800">
                    {createdRoomInfo.questionsCount} câu trắc nghiệm
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copiedShareText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedShareText ? 'Đã sao chép tin nhắn mời bạn bè!' : 'Sao chép mã & mật khẩu để gửi bạn bè'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  Xong & Vào phòng thi đấu ngay 🚀
                </button>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleCreateRoom} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold animate-fadeIn">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* Room Name */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Tên phòng thi / Trò chơi: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ví dụ: Đấu trường Tiếng Hàn 12A1, K-Pop Club Seoul..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm font-bold text-stone-900 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                />
              </div>

              {/* Room Code & Random Button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Mã phòng (Dùng để mời người khác vào): <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomCode}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Tạo mã ngẫu nhiên</span>
                  </button>
                </div>

                <div className="relative">
                  <Hash className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Mã phòng (ví dụ: HANU-9921)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-black font-mono uppercase text-pink-600 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Icon Selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Biểu tượng phòng thi:
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ROOM_ICONS.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedIcon(ic);
                      }}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer ${
                        selectedIcon === ic
                          ? 'bg-amber-100 ring-2 ring-amber-500 scale-110 shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Preset Selection */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Chọn bộ đề thi cho phòng:
                </label>
                <select
                  value={selectedSetPresetId}
                  onChange={(e) => setSelectedSetPresetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 font-bold text-xs sm:text-sm text-stone-800 focus:outline-hidden focus:border-amber-500"
                >
                  {SHARED_QUIZ_SETS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.title} ({s.questionsCount} câu • Độ khó: {s.difficulty})
                    </option>
                  ))}
                  {customQuizzes.length > 0 && (
                    <option value="custom">
                      📝 Sử dụng các câu hỏi do bạn tự tạo ({customQuizzes.length} câu)
                    </option>
                  )}
                </select>
              </div>

              {/* Password Protection Section (User Request) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-amber-950 block">
                        Cài Đặt Mật Mã Phòng (Passcode)
                      </span>
                      <span className="text-[11px] text-amber-800">
                        Chỉ ai có mật khẩu mới có thể tham gia
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPassword}
                      onChange={(e) => {
                        playClickSound();
                        setHasPassword(e.target.checked);
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {hasPassword ? (
                  <div className="space-y-1 animate-fadeIn pt-1">
                    <label className="text-[11px] font-bold text-amber-900 block">
                      Nhập mật mã phòng (Ví dụ: 1234, seoul2026):
                    </label>
                    <input
                      type="text"
                      required={hasPassword}
                      placeholder="Nhập mật khẩu phòng..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-amber-300 bg-white text-xs font-bold text-stone-900 focus:outline-hidden focus:border-amber-600"
                    />
                    <span className="text-[10px] text-amber-700 block">
                      💡 Hãy chia sẻ mật mã này cho bạn bè sau khi tạo phòng xong.
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-semibold">
                    <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Phòng mở tự do: Bất kỳ ai có Mã phòng đều có thể vào thi.</span>
                  </div>
                )}
              </div>

              {/* Unlimited Participants Badge */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Số lượng người tham gia:</span>
                </div>
                <span className="font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[11px]">
                  ♾️ Không giới hạn người
                </span>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Lời nhắn / Mô tả phòng (Tùy chọn):
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Ai đạt Top 1 được mời ly trà sữa Gongcha!"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Tạo Phòng & Lấy Mã Ngay</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
