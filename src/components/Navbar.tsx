import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Volume2, 
  FileText, 
  HelpCircle, 
  Award, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  VolumeX,
  Languages,
  Crown,
  Plus,
  Palette,
  Gamepad2
} from 'lucide-react';
import { AppTab, UserStats, ThemeId } from '../types';
import { getThemeConfig } from '../data/themeData';

interface NavbarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  stats: UserStats;
  speechRate: number;
  onToggleSpeechRate: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  isOwnerMode?: boolean;
  onOpenOwnerAuth?: () => void;
  onOpenAddVocab?: () => void;
  onOpenAddQuiz?: () => void;
  customWordsCount?: number;
  customQuizzesCount?: number;
  customGrammarCount?: number;
  themeId?: ThemeId;
  onOpenThemeModal?: () => void;
  onOpenSurveyModal?: () => void;
  onOpenAddGrammar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  stats,
  speechRate,
  onToggleSpeechRate,
  soundEnabled,
  onToggleSound,
  selectedLevel,
  onSelectLevel,
  isOwnerMode = false,
  onOpenOwnerAuth,
  onOpenAddVocab,
  onOpenAddQuiz,
  onOpenAddGrammar,
  customWordsCount = 0,
  customQuizzesCount = 0,
  customGrammarCount = 0,
  themeId = 'cherry',
  onOpenThemeModal,
  onOpenSurveyModal
}) => {
  const themeConfig = getThemeConfig(themeId);

  const navTabs: { id: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Lộ trình 6 Cấp', icon: <Compass className="w-4 h-4" /> },
    { id: 'hangeul', label: 'Bảng chữ cái', icon: <Languages className="w-4 h-4" />, badge: 'Mới' },
    { id: 'vocabulary', label: 'Từ vựng', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'grammar', label: 'Ngữ pháp', icon: <FileText className="w-4 h-4" /> },
    { id: 'pronunciation', label: 'Phát âm & Hội thoại', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'practice', label: 'Bài tập', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'games', label: 'Trò chơi & Đấu trường', icon: <Gamepad2 className="w-4 h-4 text-amber-500 animate-bounce" />, badge: '🔥 ĐUA TOP' },
    { id: 'stats', label: 'Thành tích', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-xs transition-colors duration-300"
      style={{ borderColor: `${themeConfig.accentColor}25` }}
    >
      {/* Top Banner & Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 border-b border-stone-100 gap-2 flex-wrap">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('roadmap')}>
            <div 
              className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm ring-2 transition-all duration-300 group-hover:scale-105 shrink-0 bg-pink-100/50"
              style={{
                borderColor: `${themeConfig.accentColor}40`,
                boxShadow: `0 2px 10px ${themeConfig.accentColor}25`
              }}
            >
              <img 
                src="/logo.jpg" 
                alt="HANU 하누 Logo" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-stone-900 flex items-center gap-1.5">
                  HANU 
                  <span 
                    className="text-xs font-bold font-korean px-1.5 py-0.5 rounded-md border"
                    style={{
                      color: themeConfig.accentColor,
                      backgroundColor: `${themeConfig.accentColor}12`,
                      borderColor: `${themeConfig.accentColor}30`
                    }}
                  >
                    하누
                  </span>
                </span>
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Dễ tiếp cận
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Học tiếng Hàn trực quan toàn diện • Cấp độ 1 - 6
              </p>
            </div>
          </div>


          {/* User Live Stats Counter & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {/* Player Profile Quick Pill */}
            <button
              onClick={() => onOpenSurveyModal ? onOpenSurveyModal() : onTabChange('roadmap')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200/70 border border-stone-200 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
              title="Đổi thông tin cá nhân & độ tuổi"
            >
              <span className="text-sm">{stats.playerAvatar || '🌸'}</span>
              <span className="font-bold text-stone-900 group-hover:text-pink-600 max-w-[90px] truncate">
                {stats.playerName || 'Người học'}
              </span>
              <span className="text-[10px] text-stone-500 bg-white px-1 py-0.2 rounded font-normal border border-stone-200">
                Sửa
              </span>
            </button>

            {/* Level Quick Selector */}
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg p-1 text-xs">
              <span className="text-stone-500 font-medium px-1.5">Cấp:</span>
              <select
                value={selectedLevel}
                onChange={(e) => onSelectLevel(Number(e.target.value))}
                className="bg-transparent font-bold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Cấp {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{stats.streak} ngày</span>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>

            {/* Palette / Theme Chooser Button */}
            {onOpenThemeModal && (
              <button
                onClick={onOpenThemeModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
                title={`Đổi màu giao diện (Hiện tại: ${themeConfig.name}) - Bấm để chọn màu khác`}
              >
                <Palette className="w-3.5 h-3.5 text-stone-600 group-hover:text-stone-900" />
                <span 
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20"
                  style={{ backgroundColor: themeConfig.accentColor }} 
                />
                <span className="hidden sm:inline text-[11px]">{themeConfig.name}</span>
              </button>
            )}

            {/* PROMINENT TOP ACTION: TRÒ CHƠI / QUIZ CÙNG DÙNG */}
            <button
              onClick={() => onTabChange('games')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer shrink-0 border-2 ${
                currentTab === 'games'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white border-white ring-2 ring-amber-300'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-white/60 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
              title="Vào trung tâm Trò chơi & Đấu trường Quiz cùng dùng (HANU-TOPIK, KPOP-VIBE...)"
            >
              <Gamepad2 className="w-4 h-4 text-white animate-pulse" />
              <span>🎮 TRÒ CHƠI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white text-orange-600 font-extrabold uppercase shadow-2xs">
                HOT
              </span>
            </button>

            {/* Quick Action: Thêm Từ Vựng */}
            {onOpenAddVocab && (
              <button
                onClick={onOpenAddVocab}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
                }}
                title="Thêm từ vựng tiếng Hàn mới"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thêm Từ Vựng</span>
                <span className="sm:hidden">Từ vựng</span>
              </button>
            )}

            {/* Quick Action: Thêm Quiz */}
            {onOpenAddQuiz && (
              <button
                onClick={onOpenAddQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                title="Tạo câu hỏi trắc nghiệm / Quiz mới"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thêm Quiz</span>
                <span className="sm:hidden">Quiz</span>
              </button>
            )}

            {/* Quick Action: Thêm Ngữ Pháp */}
            {onOpenAddGrammar && (
              <button
                onClick={onOpenAddGrammar}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                title="Thêm cấu trúc ngữ pháp tiếng Hàn mới"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thêm Ngữ Pháp</span>
                <span className="sm:hidden">Ngữ pháp</span>
              </button>
            )}

            {/* Owner Mode Status / Trigger */}
            {onOpenOwnerAuth && (
              isOwnerMode ? (
                <button
                  onClick={onOpenOwnerAuth}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-pink-500/15 to-rose-500/15 border border-amber-300 text-amber-900 text-xs font-bold transition-all cursor-pointer hover:bg-amber-100 shadow-2xs"
                  title="Chế độ Người sở hữu đang BẬT - Bấm để quản lý"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span className="hidden sm:inline">Chủ sở hữu</span>
                  {customWordsCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                      {customWordsCount}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={onOpenOwnerAuth}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 text-stone-600 hover:text-amber-800 text-xs font-semibold transition-colors cursor-pointer"
                  title="Quyền Người sở hữu (iywyn271@gmail.com)"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden sm:inline text-[11px]">Chủ sở hữu</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none text-sm font-medium">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
                style={isActive ? {
                  background: `linear-gradient(90deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientTo})`
                } : undefined}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive 
                      ? 'bg-white/25 text-white' 
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Top Quick Game Rooms Ribbon */}
        <div className="border-t border-stone-100 py-1.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none text-[11px]">
          <div className="flex items-center gap-1.5 text-stone-500 font-bold shrink-0">
            <span className="p-0.5 rounded-md bg-amber-100 text-amber-800">
              <Gamepad2 className="w-3 h-3" />
            </span>
            <span className="text-stone-700">Phòng thi chung:</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onTabChange('games')}
              className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Tạo phòng thi đấu trò chơi mới (có mật mã & không giới hạn người)"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Tạo Phòng</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-stone-50 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 hover:text-pink-700 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Vào phòng Đại Chiến TOPIK I Sơ Cấp (Mã: HANU-TOPIK)"
            >
              <span>🏆 TOPIK I</span>
              <span className="text-[10px] text-pink-600 font-mono font-normal">HANU-TOPIK</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-stone-50 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 hover:text-pink-700 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Vào phòng Đu Idol K-Pop & K-Drama Vibe (Mã: KPOP-VIBE)"
            >
              <span>🎧 K-Pop</span>
              <span className="text-[10px] text-pink-600 font-mono font-normal">KPOP-VIBE</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-stone-50 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 hover:text-pink-700 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Vào phòng Cẩm Nang Sinh Tồn Du Lịch (Mã: TRAVEL-KR)"
            >
              <span>✈️ Du Lịch</span>
              <span className="text-[10px] text-pink-600 font-mono font-normal">TRAVEL-KR</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-stone-50 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 hover:text-pink-700 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Vào phòng Tiếng Hàn Công Sở (Mã: BIZ-KOREA)"
            >
              <span>💼 Công Sở</span>
              <span className="text-[10px] text-pink-600 font-mono font-normal">BIZ-KOREA</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-stone-50 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 hover:text-pink-700 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Vào phòng Đấu Trí Thành Ngữ Bốn Chữ (Mã: HANJA-PRO)"
            >
              <span>👑 Thành Ngữ</span>
              <span className="text-[10px] text-pink-600 font-mono font-normal">HANJA-PRO</span>
            </button>
            <button
              onClick={() => onTabChange('games')}
              className="px-2 py-0.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
              title="Chơi Mini-game Lật thẻ trí nhớ Hàn - Việt"
            >
              <span>🎴 Lật Thẻ Nhớ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
