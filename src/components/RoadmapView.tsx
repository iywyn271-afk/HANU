import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Lightbulb,
  Clock,
  BookOpen,
  User,
  Edit2,
  Check,
  Volume2,
  Flame,
  Trophy,
  Smile
} from 'lucide-react';
import { AppTab, UserStats } from '../types';
import { LEVELS_DATA } from '../data/levelsData';
import { speakKorean, playClickSound, playCorrectSound } from '../utils/audio';

interface RoadmapViewProps {
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  onNavigate: (tab: AppTab) => void;
  stats: UserStats;
  onUpdatePlayer: (name: string, avatar: string) => void;
  speechRate?: number;
}

const AVATAR_OPTIONS = [
  { emoji: '🌸', label: 'Hoa Đào' },
  { emoji: '🐯', label: 'Bạch Hổ' },
  { emoji: '🇰🇷', label: 'Hàn Quốc' },
  { emoji: '🎓', label: 'Học Giả' },
  { emoji: '🍜', label: 'Mì Cay' },
  { emoji: '🦊', label: 'Hồ Ly' },
  { emoji: '🌟', label: 'Ngôi Sao' },
  { emoji: '🐰', label: 'Thỏ Ngọc' }
];

const PRESET_NAMES = ['Minh Anh', 'Tuấn Kiệt', 'Kim Thảo', 'Hoàng Nam', 'Bảo Trâm', 'Gia Huy'];

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  selectedLevel,
  onSelectLevel,
  onNavigate,
  stats,
  onUpdatePlayer,
  speechRate = 0.9
}) => {
  const currentLevelInfo = LEVELS_DATA.find((l) => l.level === selectedLevel) || LEVELS_DATA[0];

  // Player Name & Avatar State
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>(stats.playerName || 'Minh Anh');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveName = () => {
    playCorrectSound();
    const finalName = inputName.trim() || 'Học viên';
    onUpdatePlayer(finalName, stats.playerAvatar || '🌸');
    setIsEditingName(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSelectAvatar = (emoji: string) => {
    playClickSound();
    onUpdatePlayer(stats.playerName || 'Minh Anh', emoji);
  };

  const handleSpeakGreeting = () => {
    playClickSound();
    speakKorean(`안녕하세요, ${stats.playerName || 'Minh Anh'} 씨!`, speechRate);
  };

  // Rank based on XP
  const getRankTitle = (xp: number) => {
    if (xp < 100) return { title: '🌱 Tân Binh Hangeul', desc: 'Bắt đầu làm quen với bảng chữ cái và phát âm' };
    if (xp < 300) return { title: '🌸 Sơ Cấp Tự Tin (Cấp 1-2)', desc: 'Nắm vững từ vựng đời sống & ngữ pháp cơ bản' };
    if (xp < 600) return { title: '🚀 Trung Cấp Phản Xạ (Cấp 3-4)', desc: 'Giao tiếp tình huống & ngữ pháp nâng cao' };
    return { title: '🏆 Bậc Thầy Tiếng Hàn (Cấp 5-6)', desc: 'Thành thạo chuyên sâu như người bản xứ' };
  };

  const rank = getRankTitle(stats.xp);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* PHẦN ĐẦU TIÊN: TÊN NGƯỜI CHƠI & THẺ HỒ SƠ HỌC VIÊN */}
      <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-7 shadow-xs relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          {/* Section Header Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
              <User className="w-3.5 h-3.5 text-pink-600" />
              <span>PHẦN ĐẦU TIÊN: HỒ SƠ NGƯỜI CHƠI & MỤC TIÊU HỌC VIÊN</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-stone-500 font-medium">Sẵn sàng học tập cùng KOREAN IS EASY</span>
            </div>
          </div>

          {/* Player Identity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Avatar & Pickers */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-4 text-center sm:text-left lg:text-center">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-pink-100 via-rose-50 to-emerald-50 border-2 border-pink-300 flex items-center justify-center text-5xl shadow-inner select-none transition-transform group-hover:scale-105">
                  {stats.playerAvatar || '🌸'}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-pink-200 shadow-xs">
                  <Smile className="w-4 h-4 text-pink-500" />
                </div>
              </div>

              <div className="space-y-1.5 w-full">
                <span className="text-xs text-stone-500 font-semibold block">Chọn biểu tượng đại diện:</span>
                <div className="flex flex-wrap items-center justify-center sm:justify-start lg:justify-center gap-1.5">
                  {AVATAR_OPTIONS.map((item) => (
                    <button
                      key={item.emoji}
                      onClick={() => handleSelectAvatar(item.emoji)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-base border transition-all cursor-pointer ${
                        stats.playerAvatar === item.emoji
                          ? 'bg-pink-100 border-pink-400 scale-110 shadow-xs ring-1 ring-pink-400'
                          : 'bg-stone-50 border-stone-200 hover:border-pink-300 hover:bg-pink-50'
                      }`}
                      title={item.label}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Player Name Greeting & Inline Editor */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
                    Học viên tiếng Hàn
                  </span>
                  <span className="text-xs text-stone-500">{rank.title}</span>
                </div>

                {/* Korean Personalized Greeting */}
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-korean">
                    안녕하세요, <span className="text-pink-600 font-sans">{stats.playerName || 'Minh Anh'}</span> 씨! 👋
                  </h2>
                  <button
                    onClick={handleSpeakGreeting}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    title="Nghe cách đọc lời chào bằng giọng bản xứ Hàn Quốc"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Nghe chào (TTS)</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Chào mừng bạn đến với lộ trình chinh phục tiếng Hàn. Hãy nhập tên hiển thị của bạn để cá nhân hóa bài học và bảng điểm:
                </p>
              </div>

              {/* Editable Name Form */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                      }}
                      placeholder="Nhập tên người chơi của bạn..."
                      maxLength={30}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 focus:outline-hidden focus:border-pink-500 focus:ring-2 focus:ring-pink-200 font-semibold text-stone-900 text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveName}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Check className="w-4 h-4" />
                    <span>Lưu tên người chơi</span>
                  </button>
                </div>

                {/* Preset Suggestions */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-xs text-stone-500 font-medium">Gợi ý tên nhanh:</span>
                  {PRESET_NAMES.map((name) => (
                    <button
                      key={name}
                      onClick={() => {
                        setInputName(name);
                        onUpdatePlayer(name, stats.playerAvatar || '🌸');
                        playClickSound();
                        setSavedSuccess(true);
                        setTimeout(() => setSavedSuccess(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:border-pink-300 hover:bg-pink-50 text-xs text-stone-700 font-medium transition-colors cursor-pointer shadow-2xs"
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {savedSuccess && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-fadeIn">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã cập nhật tên người chơi thành công! Tên bạn sẽ xuất hiện trên bài tập trắc nghiệm và bảng vinh danh.</span>
                  </div>
                )}
              </div>

              {/* Live Player Status Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-pink-50/60 border border-pink-200/80">
                  <span className="text-[11px] text-pink-700 font-semibold block">Điểm tích lũy</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span className="text-base font-extrabold text-stone-900">{stats.xp} XP</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <span className="text-[11px] text-amber-700 font-semibold block">Chuỗi học tập</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-base font-extrabold text-stone-900">{stats.streak} ngày</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <span className="text-[11px] text-emerald-700 font-semibold block">Từ vựng đã thuộc</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="text-base font-extrabold text-stone-900">{stats.learnedWords.length} từ</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200/80">
                  <span className="text-[11px] text-teal-700 font-semibold block">Cấp độ đang học</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Target className="w-4 h-4 text-teal-600" />
                    <span className="text-base font-extrabold text-stone-900">Cấp {selectedLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100/50 via-emerald-100/30 to-transparent rounded-bl-full pointer-events-none" />
      </section>

      {/* Hero Mission Card - Pink & Green Palette */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 via-white to-emerald-50 border border-pink-100 p-6 sm:p-8 shadow-xs">
        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>KOREAN IS EASY • PHƯƠNG PHÁP HỌC TRỰC QUAN</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            Lộ trình học tiếng Hàn từ <span className="text-pink-600">Cấp 1</span> đến <span className="text-emerald-600">Cấp 6</span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-6">
            Thiết kế đặc biệt dành cho người mới bắt đầu (học sinh, sinh viên, người đi làm, người chuẩn bị du học).
            Làm chủ tiếng Hàn từ nền tảng vững chắc đến phản xạ giao tiếp chuẩn bản xứ.
          </p>

          {/* Short & Long Term Goals Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/90 border border-pink-200 shadow-2xs">
              <div className="flex items-center gap-2 text-pink-600 font-bold text-sm mb-1.5">
                <Clock className="w-4 h-4" />
                <span>Mục tiêu ngắn hạn (1 - 2 tuần)</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Thuộc lòng bảng chữ cái Hangeul, nắm vững nguyên tắc ghép âm và phát âm chuẩn xác ngay trong thời gian ngắn nhất.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-emerald-200 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1.5">
                <Target className="w-4 h-4" />
                <span>Mục tiêu dài hạn (Cấp 1 đến 6)</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                Hình thành phản xạ giao tiếp tự nhiên, đọc trôi chảy chuẩn bản xứ và tự tin làm việc, du học hoặc sinh sống tại Hàn Quốc.
              </p>
            </div>
          </div>

          {/* Comprehensive 3-Pillar Method */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60 text-xs sm:text-sm font-medium text-stone-600">
            <span className="font-bold text-stone-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Phương pháp tích hợp toàn diện:
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-pink-100/70 text-pink-800 font-semibold">1. Từ vựng theo chủ đề</span>
            <span className="text-stone-300">•</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 font-semibold">2. Ngữ pháp & Ví dụ</span>
            <span className="text-stone-300">•</span>
            <span className="px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-800 font-semibold">3. Luyện phát âm & Hội thoại</span>
            <span className="text-stone-300">•</span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 font-semibold">4. Bài tập tính điểm tức thì</span>
          </div>
        </div>

        {/* Decorative corner visual */}
        <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-gradient-to-br from-pink-200/40 to-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
      </section>

      {/* Levels 1 to 6 Timeline Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-bold text-stone-900">Khung 6 Cấp độ học tiếng Hàn (TOPIK I & II)</h2>
            <p className="text-sm text-stone-500">Bấm chọn từng cấp độ để xem nội dung và kỹ năng đạt được</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('hangeul')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Vào Bảng chữ cái</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Level Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LEVELS_DATA.map((lvl) => {
            const isSelected = lvl.level === selectedLevel;
            return (
              <button
                key={lvl.level}
                onClick={() => onSelectLevel(lvl.level)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-400 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-pink-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    Cấp {lvl.level}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>
                <div className="text-sm font-bold text-stone-800 line-clamp-1">
                  {lvl.badge}
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  {lvl.vocabTarget} từ • {lvl.grammarTarget} ngữ pháp
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Level Deep Dive Card */}
      <section className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-100 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800 text-xs font-bold">
                Cấp {currentLevelInfo.level}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              {currentLevelInfo.name}
            </h3>
            <p className="text-sm font-medium text-pink-600 mt-0.5">
              {currentLevelInfo.subTitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => onNavigate('vocabulary')}
              className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs sm:text-sm font-semibold border border-pink-200 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Học Từ vựng Cấp {currentLevelInfo.level}</span>
            </button>
            <button
              onClick={() => onNavigate('practice')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Làm bài tập tính điểm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target Audience & Goals */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Đối tượng phù hợp
              </h4>
              <p className="text-sm text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                {currentLevelInfo.targetAudience}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Mục tiêu khối lượng kiến thức
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-pink-50/70 border border-pink-100 text-center">
                  <span className="block text-lg font-extrabold text-pink-600">~{currentLevelInfo.vocabTarget}</span>
                  <span className="text-[11px] text-stone-600 font-medium">Từ vựng cốt lõi</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                  <span className="block text-lg font-extrabold text-emerald-600">~{currentLevelInfo.grammarTarget}</span>
                  <span className="text-[11px] text-stone-600 font-medium">Cấu trúc ngữ pháp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Topics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Các chủ đề trọng tâm
            </h4>
            <ul className="space-y-2">
              {currentLevelInfo.keyTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                  <div className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Gained */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Kỹ năng sau khi hoàn thành
            </h4>
            <ul className="space-y-2.5">
              {currentLevelInfo.skillsGained.map((skill, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Launchpad Action Bar for Beginners */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Chưa biết mặt chữ tiếng Hàn?</h3>
          <p className="text-sm text-pink-100">
            Khởi động ngay với Bảng chữ cái Hangeul tương tác, nghe âm thanh chuẩn và thử ghép chữ trong 5 phút!
          </p>
        </div>
        <button
          onClick={() => onNavigate('hangeul')}
          className="px-6 py-3 rounded-xl bg-white text-pink-600 font-extrabold text-sm hover:bg-pink-50 shadow-md transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
        >
          Học Bảng Chữ Cái Ngay
        </button>
      </section>
    </div>
  );
};
