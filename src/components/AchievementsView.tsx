import React from 'react';
import { 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Trophy, 
  TrendingUp, 
  Users,
  Target
} from 'lucide-react';
import { UserStats, AchievementBadge } from '../types';
import { INITIAL_ACHIEVEMENTS, MOCK_LEADERBOARD } from '../data/quizData';

interface AchievementsViewProps {
  stats: UserStats;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ stats }) => {
  // Update badges with live user progress
  const badges: AchievementBadge[] = INITIAL_ACHIEVEMENTS.map((b) => {
    if (b.id === 'ach-2') {
      const p = stats.learnedWords.length;
      return {
        ...b,
        progress: p,
        unlocked: p >= b.maxProgress
      };
    }
    if (b.id === 'ach-4') {
      const p = stats.xp;
      return {
        ...b,
        progress: p,
        unlocked: p >= b.maxProgress
      };
    }
    return b;
  });

  // Calculate dynamic leaderboard with current user
  const updatedLeaderboard = MOCK_LEADERBOARD.map((item) => {
    if (item.isCurrentUser) {
      return {
        ...item,
        name: `${stats.playerName || 'Bạn'} (Bạn)`,
        avatar: stats.playerAvatar || '🌸',
        xp: stats.xp,
        streak: stats.streak
      };
    }
    return item;
  }).sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-emerald-50 border border-pink-100 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
            <Trophy className="w-3.5 h-3.5 text-pink-600" />
            <span>KẾT QUẢ HỌC TẬP & BẢNG VINH DANH</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">
            Thành Tích & Bảng Xếp Hạng Người Học
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Theo dõi tiến trình tích lũy điểm số, số từ vựng đã ghi nhớ và thi đua cùng cộng đồng học viên tiếng Hàn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-stone-400 font-bold uppercase block">Cấp bậc hiện tại</span>
            <span className="text-sm font-extrabold text-pink-600">
              {stats.xp < 100 ? '🌱 Mầm Xanh Hangeul' : stats.xp < 300 ? '🌸 Hoa Đào Sơ Cấp' : '🏆 Siêu Sao Tiếng Hàn'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP Score */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Tổng Điểm XP</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          <div className="text-3xl font-black text-pink-600">
            {stats.xp}
          </div>
          <div className="text-[11px] text-stone-500">
            Tích lũy từ từ vựng & trắc nghiệm
          </div>
        </div>

        {/* Learned Words Counter */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Số Từ Đã Thuộc</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {stats.learnedWords.length}
          </div>
          <div className="text-[11px] text-stone-500">
            Từ vựng đã ghi nhớ sâu sắc
          </div>
        </div>

        {/* Streak Flame */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Chuỗi Ngày Học</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">
            {stats.streak} ngày
          </div>
          <div className="text-[11px] text-stone-500">
            Giữ vững thói quen mỗi ngày
          </div>
        </div>

        {/* Total Quizzes / Accuracy */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Bài Tập Đã Làm</span>
            <Target className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-black text-teal-600">
            {stats.totalQuizzesTaken}
          </div>
          <div className="text-[11px] text-stone-500">
            {stats.correctAnswersCount} câu trả lời chính xác
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Badges & Achievements */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-600" />
              <span>Huy Hiệu Thành Tích Đạt Được</span>
            </h3>
            <span className="text-xs font-bold text-stone-400">
              {badges.filter((b) => b.unlocked).length} / {badges.length} mở khóa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  badge.unlocked
                    ? 'border-emerald-300 bg-white shadow-2xs'
                    : 'border-stone-200 bg-stone-50/70 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    badge.unlocked ? 'bg-pink-100 shadow-inner' : 'bg-stone-200 grayscale'
                  }`}>
                    {badge.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-sm truncate">
                        {badge.title}
                      </h4>
                      {badge.unlocked ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Đã mở khóa
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-400">
                          Chưa đạt
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {badge.description}
                    </p>

                    {/* Progress */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                        <span>Tiến độ</span>
                        <span>{Math.min(badge.progress, badge.maxProgress)} / {badge.maxProgress}</span>
                      </div>
                      <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            badge.unlocked ? 'bg-emerald-500' : 'bg-pink-400'
                          }`}
                          style={{
                            width: `${Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100))}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Leaderboard */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Bảng Xếp Hạng Tuần</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Trực tiếp
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs divide-y divide-stone-100">
            {updatedLeaderboard.map((user) => {
              const isFirst = user.rank === 1;
              const isSecond = user.rank === 2;
              const isThird = user.rank === 3;

              return (
                <div
                  key={user.rank}
                  className={`py-3 flex items-center justify-between gap-3 ${
                    user.isCurrentUser ? 'bg-pink-50/80 -mx-2 px-2 rounded-xl border border-pink-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-black text-sm ${
                      isFirst ? 'text-amber-500' : isSecond ? 'text-stone-400' : isThird ? 'text-amber-700' : 'text-stone-400'
                    }`}>
                      {isFirst ? '🥇' : isSecond ? '🥈' : isThird ? '🥉' : `#${user.rank}`}
                    </span>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">
                          {user.name}
                        </span>
                        {user.isCurrentUser && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-pink-500 text-white">
                            Bạn
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {user.level} • Chuỗi {user.streak} ngày
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-sm text-emerald-700">
                      {user.xp} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
