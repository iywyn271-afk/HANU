import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Palette, 
  ArrowRight, 
  X, 
  User, 
  Target, 
  Clock, 
  Award,
  Heart
} from 'lucide-react';
import { AgeBracket, ThemeId, UserPreferences } from '../types';
import { THEME_CONFIGS, AGE_BRACKET_INFO, getThemeConfig } from '../data/themeData';
import { playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface OnboardingSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences: (prefs: UserPreferences, playerName?: string, playerAvatar?: string) => void;
  currentAgeBracket?: AgeBracket;
  currentThemeId?: ThemeId;
  currentGoal?: string;
  currentTime?: number;
  currentName?: string;
  currentAvatar?: string;
}

const GOAL_OPTIONS = [
  { id: 'hangeul', label: 'Bắt đầu từ số 0 với bảng chữ cái Hangeul', icon: '🌱' },
  { id: 'kpop', label: 'Đu Idol K-Pop, xem K-Drama không cần phụ đề', icon: '🎧' },
  { id: 'travel', label: 'Tự tin du lịch, gọi món & mua sắm tại Hàn Quốc', icon: '✈️' },
  { id: 'topik', label: 'Thi lấy chứng chỉ TOPIK (Cấp 1 đến 6) để du học / xin việc', icon: '📜' },
  { id: 'work', label: 'Giao tiếp làm việc trong công ty Hàn Quốc', icon: '💼' }
];

const TIME_OPTIONS = [
  { minutes: 10, label: '10 phút / ngày', sub: 'Mưa dầm thấm lâu, nhẹ nhàng thư giãn' },
  { minutes: 20, label: '20 phút / ngày', sub: 'Lý tưởng nhất để tiến bộ nhanh mỗi tuần' },
  { minutes: 45, label: '45 phút / ngày', sub: 'Tăng tốc bứt phá mục tiêu TOPIK' }
];

const AVATAR_OPTIONS = ['🌸', '🐰', '🦊', '🐯', '🐼', '👑', '☕', '🚀', '⭐', '🎧'];

export const OnboardingSurveyModal: React.FC<OnboardingSurveyModalProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
  currentAgeBracket = 'young-adult',
  currentThemeId = 'cherry',
  currentGoal = 'hangeul',
  currentTime = 20,
  currentName = 'Minh Anh',
  currentAvatar = '🌸'
}) => {
  const [step, setStep] = useState<number>(1);
  const [ageBracket, setAgeBracket] = useState<AgeBracket>(currentAgeBracket);
  const [themeId, setThemeId] = useState<ThemeId>(currentThemeId);
  const [learningGoal, setLearningGoal] = useState<string>(currentGoal);
  const [dailyTimeMinutes, setDailyTimeMinutes] = useState<number>(currentTime);
  const [playerName, setPlayerName] = useState<string>(currentName);
  const [playerAvatar, setPlayerAvatar] = useState<string>(currentAvatar);

  if (!isOpen) return null;

  // Handle Age selection with smart automatic color recommendation
  const handleSelectAge = (age: AgeBracket) => {
    playClickSound();
    setAgeBracket(age);
    const recommended = AGE_BRACKET_INFO[age]?.recommendedTheme || 'cherry';
    setThemeId(recommended);
  };

  const handleSelectTheme = (tid: ThemeId) => {
    playClickSound();
    setThemeId(tid);
  };

  const handleFinish = () => {
    playCorrectSound();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    onSavePreferences(
      {
        hasCompletedOnboarding: true,
        ageBracket,
        learningGoal,
        dailyTimeMinutes,
        themeId
      },
      playerName.trim() || 'Học viên',
      playerAvatar
    );
    onClose();
  };

  const currentThemeConfig = getThemeConfig(themeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-5 sm:p-6 text-white relative transition-colors duration-300"
          style={{
            background: `linear-gradient(135deg, ${currentThemeConfig.gradientFrom}, ${currentThemeConfig.gradientTo})`
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 mb-2">
            <img 
              src="/logo.jpg" 
              alt="HANU 하누" 
              className="w-12 h-12 rounded-2xl border-2 border-white/50 shadow-md object-cover shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-lg bg-white/20 text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  Khảo Sát Cá Nhân Hóa & Màu Sắc
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Chào mừng bạn đến với HANU 하누!
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/90 mt-1">
            Chọn độ tuổi và mục tiêu để HANU tối ưu lộ trình và giao diện màu phù hợp nhất với bạn.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => {
                  playClickSound();
                  setStep(s);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  step === s ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
            <span className="text-[11px] text-white/80 font-medium ml-2">
              Bước {step} / 3: {step === 1 ? 'Chọn độ tuổi' : step === 2 ? 'Mục tiêu & Tên' : 'Tùy chọn màu sắc'}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: CHỌN ĐỘ TUỔI */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <span>1. Bạn thuộc nhóm độ tuổi nào?</span>
                  <span className="text-xs text-stone-500 font-normal">(Hệ thống sẽ tự gợi ý bảng màu tối ưu)</span>
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Mỗi lứa tuổi sẽ có thị hiếu thị giác khác nhau: từ tươi vui kẹo ngọt cho bé đến thanh lịch dịu mắt cho người đi làm.
                </p>
              </div>

              <div className="space-y-2.5">
                {(Object.keys(AGE_BRACKET_INFO) as AgeBracket[]).map((key) => {
                  const info = AGE_BRACKET_INFO[key];
                  const isSelected = ageBracket === key;
                  const suggestedTheme = getThemeConfig(info.recommendedTheme);

                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectAge(key)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/50 shadow-xs ring-2 ring-pink-200'
                          : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-stone-100">
                          {info.emoji}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-stone-900">
                            {info.label}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {info.sub}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 shadow-2xs">
                          <span>Gợi ý:</span>
                          <span>{suggestedTheme.emoji}</span>
                          <span>{suggestedTheme.name}</span>
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-pink-600 bg-pink-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Age Note Recommendation Box */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
                <span className="text-base shrink-0">💡</span>
                <div>
                  <strong className="text-stone-900">Đã tự động chọn màu: </strong>
                  <span>{currentThemeConfig.emoji} {currentThemeConfig.name} - {AGE_BRACKET_INFO[ageBracket]?.description}</span>
                  <div className="text-[11px] text-stone-500 mt-1">
                    *(Bạn vẫn có thể tự do bấm chọn bất kỳ màu nào khác ở Bước 3!)*
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MỤC TIÊU & TÊN NGƯỜI CHƠI */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Name & Avatar */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <label className="text-xs font-bold text-stone-700 block">
                  Tên hiển thị & Nhân vật đại diện của bạn:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-200 overflow-x-auto max-w-[190px] scrollbar-none">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setPlayerAvatar(av);
                        }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-transform cursor-pointer ${
                          playerAvatar === av ? 'bg-pink-100 ring-2 ring-pink-400 scale-110' : 'hover:bg-stone-100'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Nhập tên của bạn (ví dụ: Minh Anh)..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm font-bold text-stone-900 focus:outline-hidden focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  Mục tiêu học tiếng Hàn chính của bạn:
                </label>
                <div className="space-y-2">
                  {GOAL_OPTIONS.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        playClickSound();
                        setLearningGoal(g.id);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        learningGoal === g.id
                          ? 'border-pink-500 bg-pink-50/50 ring-1 ring-pink-300 font-bold text-stone-900'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-base">{g.icon}</span>
                        <span>{g.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        learningGoal === g.id ? 'border-pink-600 bg-pink-600 text-white' : 'border-stone-300 bg-white'
                      }`}>
                        {learningGoal === g.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Target Time */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 block">
                  Thời lượng học dự kiến mỗi ngày:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {TIME_OPTIONS.map((t) => (
                    <div
                      key={t.minutes}
                      onClick={() => {
                        playClickSound();
                        setDailyTimeMinutes(t.minutes);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        dailyTimeMinutes === t.minutes
                          ? 'border-pink-500 bg-pink-50/50 ring-1 ring-pink-300'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-extrabold text-stone-900">{t.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{t.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TÙY CHỌN BẢNG MÀU GIAO DIỆN (ĐƯỢC CHỌN MÀU) */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-pink-600" />
                  <span>3. Tự do chọn bảng màu bạn yêu thích</span>
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Bấm vào màu bất kỳ để thử ngay giao diện. Bạn có thể đổi màu bất cứ lúc nào qua biểu tượng 🎨 trên thanh điều hướng.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(THEME_CONFIGS) as ThemeId[]).map((tid) => {
                  const cfg = THEME_CONFIGS[tid];
                  const isSelected = themeId === tid;

                  return (
                    <div
                      key={tid}
                      onClick={() => handleSelectTheme(tid)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-stone-900 shadow-md ring-2 ring-stone-400 bg-white'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-full bg-stone-900 text-white flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" /> Đang chọn
                        </span>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xl">{cfg.emoji}</span>
                          <span className="text-xs font-extrabold text-stone-900">{cfg.name}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1">
                          {cfg.subTitle}
                        </p>
                      </div>

                      {/* Color Palette Gradient Preview Bar */}
                      <div className="mt-3 flex items-center gap-1.5">
                        <div 
                          className="h-3.5 flex-1 rounded-full shadow-2xs border border-black/10"
                          style={{
                            background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`
                          }}
                        />
                        <span 
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/10" 
                          style={{ backgroundColor: cfg.accentColor }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="text-xs font-bold text-stone-700 block">
                  Mô phỏng thử nút bấm & huy hiệu với màu đã chọn:
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div 
                    className="px-3.5 py-1.5 rounded-xl text-white font-bold text-xs shadow-xs"
                    style={{
                      background: `linear-gradient(90deg, ${currentThemeConfig.gradientFrom}, ${currentThemeConfig.gradientTo})`
                    }}
                  >
                    Nút bấm chính
                  </div>
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-bold border"
                    style={{
                      backgroundColor: `${currentThemeConfig.accentColor}15`,
                      borderColor: `${currentThemeConfig.accentColor}40`,
                      color: currentThemeConfig.accentColor
                    }}
                  >
                    Huy hiệu {currentThemeConfig.emoji} {currentThemeConfig.name}
                  </div>
                  <div className="text-xs text-stone-600 font-medium">
                    {currentThemeConfig.recommendedFor}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/60 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setStep((s) => s - 1);
              }}
              className="px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
            >
              ← Quay lại
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-400 hover:text-stone-600 font-semibold cursor-pointer"
            >
              Bỏ qua bước này
            </button>
          )}

          <div className="flex items-center gap-2">
            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setStep((s) => s + 1);
                }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, ${currentThemeConfig.gradientFrom}, ${currentThemeConfig.gradientTo})`
                }}
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: `linear-gradient(90deg, ${currentThemeConfig.gradientFrom}, ${currentThemeConfig.gradientTo})`
                }}
              >
                <Check className="w-4 h-4" />
                <span>Hoàn tất & Bắt đầu học ngay!</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
