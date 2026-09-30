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
  Crown
} from 'lucide-react';
import { AppTab, UserStats } from '../types';

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
  customWordsCount?: number;
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
  customWordsCount = 0
}) => {
  const navTabs: { id: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'roadmap', label: 'Lộ trình 6 Cấp', icon: <Compass className="w-4 h-4" /> },
    { id: 'hangeul', label: 'Bảng chữ cái', icon: <Languages className="w-4 h-4" />, badge: 'Mới' },
    { id: 'vocabulary', label: 'Từ vựng', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'grammar', label: 'Ngữ pháp', icon: <FileText className="w-4 h-4" /> },
    { id: 'pronunciation', label: 'Phát âm & Hội thoại', icon: <Volume2 className="w-4 h-4" /> },
    { id: 'practice', label: 'Bài tập & Điểm số', icon: <HelpCircle className="w-4 h-4" />, badge: 'Tính điểm' },
    { id: 'stats', label: 'Thành tích', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      {/* Top Banner & Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 border-b border-stone-100 gap-2 flex-wrap">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('roadmap')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xl shadow-xs ring-2 ring-pink-100">
              <span className="font-korean">한</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-stone-900 flex items-center gap-1">
                  HANU <span className="text-xs font-bold text-pink-600 font-korean bg-pink-50 px-1.5 py-0.5 rounded-md border border-pink-200">한국어</span>
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

          {/* User Live Stats Counter */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Player Profile Quick Pill */}
            <button
              onClick={() => onTabChange('roadmap')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-pink-50 border border-stone-200 hover:border-pink-300 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs group"
              title="Xem và chỉnh sửa tên người chơi"
            >
              <span className="text-sm">{stats.playerAvatar || '🌸'}</span>
              <span className="font-bold text-stone-900 group-hover:text-pink-600 max-w-[90px] truncate">
                {stats.playerName || 'Người học'}
              </span>
              <span className="text-[10px] text-pink-600 bg-pink-100/80 px-1 py-0.2 rounded font-normal">
                Sửa
              </span>
            </button>

            {/* Level Quick Selector */}
            <div className="flex items-center bg-stone-50 border border-stone-200 rounded-lg p-1 text-xs">
              <span className="text-stone-500 font-medium px-1.5">Cấp độ:</span>
              <select
                value={selectedLevel}
                onChange={(e) => onSelectLevel(Number(e.target.value))}
                className="bg-transparent font-bold text-stone-800 focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Cấp {lvl} {lvl === 1 ? '(Sơ cấp 1)' : lvl === 2 ? '(Sơ cấp 2)' : lvl <= 4 ? '(Trung cấp)' : '(Cao cấp)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Score / XP Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 font-bold text-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>{stats.xp} XP</span>
            </div>

            {/* Learned Words Counter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-xs shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{stats.learnedWords.length} từ đã học</span>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{stats.streak} ngày</span>
            </div>

            {/* Voice Speed Toggle */}
            <button
              onClick={onToggleSpeechRate}
              title="Đổi tốc độ phát âm (Bình thường / Chậm)"
              className={`px-2 py-1 rounded-lg text-xs font-medium border transition-colors ${
                speechRate < 0.9 
                  ? 'bg-pink-100 text-pink-800 border-pink-300' 
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              Phát âm: {speechRate < 0.9 ? '🐢 Chậm (0.75x)' : '🐰 Chuẩn (1.0x)'}
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>

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

        {/* Tab Navigation Navigation Menu */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none text-sm font-medium">
          {navTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-pink-50/70'
                }`}
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
      </div>
    </header>
  );
};
