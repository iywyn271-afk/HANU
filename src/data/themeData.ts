import { ThemeConfig, ThemeId, AgeBracket } from '../types';

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  cherry: {
    id: 'cherry',
    name: 'Hồng',
    subTitle: 'Tone màu hồng dịu dàng & tươi trẻ',
    emoji: '🌸',
    recommendedFor: 'Phù hợp: Sinh viên & Giới trẻ yêu thích vẻ đẹp ngọt ngào',
    ageMatch: ['young-adult', 'teens', 'kids'],
    accentColor: '#ec4899',
    gradientFrom: '#ec4899',
    gradientTo: '#f43f5e',
    gradientClass: 'from-pink-500 to-rose-500',
    bgLight: '#FAFDF9',
    borderClass: 'border-pink-200',
    badgeBgClass: 'bg-pink-100',
    badgeTextClass: 'text-pink-700',
    primaryBtnClass: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    hoverBtnClass: 'hover:from-pink-600 hover:to-rose-600',
    ringClass: 'ring-pink-300'
  },
  mint: {
    id: 'mint',
    name: 'Xanh Lá',
    subTitle: 'Tone màu xanh lá thư thái & dịu mắt',
    emoji: '🌿',
    recommendedFor: 'Phù hợp: Người đi làm, nhân viên văn phòng, học ban đêm',
    ageMatch: ['adult', 'senior'],
    accentColor: '#10b981',
    gradientFrom: '#10b981',
    gradientTo: '#0d9488',
    gradientClass: 'from-emerald-500 to-teal-600',
    bgLight: '#F5FCF8',
    borderClass: 'border-emerald-200',
    badgeBgClass: 'bg-emerald-100',
    badgeTextClass: 'text-emerald-800',
    primaryBtnClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
    hoverBtnClass: 'hover:from-emerald-700 hover:to-teal-700',
    ringClass: 'ring-emerald-300'
  },
  ocean: {
    id: 'ocean',
    name: 'Xanh Dương',
    subTitle: 'Tone màu xanh dương đại dương tươi mới & hiện đại',
    emoji: '🌊',
    recommendedFor: 'Phù hợp: Học sinh & Sinh viên năng động, tạo cảm hứng tươi mới',
    ageMatch: ['young-adult', 'teens'],
    accentColor: '#0ea5e9',
    gradientFrom: '#0ea5e9',
    gradientTo: '#2563eb',
    gradientClass: 'from-sky-500 to-blue-600',
    bgLight: '#F4FAFE',
    borderClass: 'border-sky-200',
    badgeBgClass: 'bg-sky-100',
    badgeTextClass: 'text-sky-800',
    primaryBtnClass: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white',
    hoverBtnClass: 'hover:from-sky-600 hover:to-blue-700',
    ringClass: 'ring-sky-300'
  },
  gold: {
    id: 'gold',
    name: 'Vàng',
    subTitle: 'Tone màu vàng kim ấm áp, chữ rõ nét dễ đọc',
    emoji: '👑',
    recommendedFor: 'Phù hợp: Người trưởng thành & trung niên, chữ nổi bật, dễ đọc',
    ageMatch: ['senior', 'adult'],
    accentColor: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    gradientClass: 'from-amber-500 to-amber-600',
    bgLight: '#FEFDF8',
    borderClass: 'border-amber-200',
    badgeBgClass: 'bg-amber-100',
    badgeTextClass: 'text-amber-800',
    primaryBtnClass: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white',
    hoverBtnClass: 'hover:from-amber-600 hover:to-amber-700',
    ringClass: 'ring-amber-300'
  },
  lavender: {
    id: 'lavender',
    name: 'Tím',
    subTitle: 'Tone màu tím thời thượng & trẻ trung',
    emoji: '🍇',
    recommendedFor: 'Phù hợp: Gen Z & Fan K-Pop, thần tượng âm nhạc Hàn Quốc',
    ageMatch: ['teens', 'young-adult'],
    accentColor: '#8b5cf6',
    gradientFrom: '#8b5cf6',
    gradientTo: '#d946ef',
    gradientClass: 'from-violet-500 to-fuchsia-500',
    bgLight: '#FBF8FE',
    borderClass: 'border-violet-200',
    badgeBgClass: 'bg-violet-100',
    badgeTextClass: 'text-violet-800',
    primaryBtnClass: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white',
    hoverBtnClass: 'hover:from-violet-600 hover:to-fuchsia-600',
    ringClass: 'ring-violet-300'
  },
  sunset: {
    id: 'sunset',
    name: 'Cam',
    subTitle: 'Tone màu cam tươi sáng & tràn đầy năng lượng',
    emoji: '🍊',
    recommendedFor: 'Phù hợp: Thiếu nhi & Trẻ em, khơi gợi hào hứng học tập',
    ageMatch: ['kids'],
    accentColor: '#f97316',
    gradientFrom: '#f97316',
    gradientTo: '#ef4444',
    gradientClass: 'from-orange-500 to-rose-500',
    bgLight: '#FFFBF7',
    borderClass: 'border-orange-200',
    badgeBgClass: 'bg-orange-100',
    badgeTextClass: 'text-orange-800',
    primaryBtnClass: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
    hoverBtnClass: 'hover:from-orange-600 hover:to-rose-600',
    ringClass: 'ring-orange-300'
  },
  midnight: {
    id: 'midnight',
    name: 'Xám Đen',
    subTitle: 'Tone màu xám đen tối giản & thanh lịch',
    emoji: '🌙',
    recommendedFor: 'Phù hợp: Người yêu thích phong cách tối giản, bảo vệ mắt tối đa',
    ageMatch: ['adult', 'senior'],
    accentColor: '#475569',
    gradientFrom: '#475569',
    gradientTo: '#1e293b',
    gradientClass: 'from-slate-600 to-slate-800',
    bgLight: '#F8FAFC',
    borderClass: 'border-slate-300',
    badgeBgClass: 'bg-slate-200',
    badgeTextClass: 'text-slate-800',
    primaryBtnClass: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white',
    hoverBtnClass: 'hover:from-slate-800 hover:to-black',
    ringClass: 'ring-slate-400'
  }
};

export const AGE_BRACKET_INFO: Record<AgeBracket, {
  label: string;
  sub: string;
  emoji: string;
  recommendedTheme: ThemeId;
  description: string;
}> = {
  kids: {
    label: 'Dưới 12 tuổi (Thiếu nhi)',
    sub: 'Hình ảnh sinh động, kẹo ngọt vui vẻ',
    emoji: '🧒',
    recommendedTheme: 'sunset',
    description: 'Tone màu Cam tươi sáng giúp bé hào hứng và thích thú mỗi ngày.'
  },
  teens: {
    label: '12 - 18 tuổi (Học sinh / Gen Z)',
    sub: 'Năng động, trẻ trung & thời thượng',
    emoji: '🎒',
    recommendedTheme: 'lavender',
    description: 'Tone màu Tím hiện đại, phong cách và giàu năng lượng.'
  },
  'young-adult': {
    label: '18 - 25 tuổi (Sinh viên / Giới trẻ)',
    sub: 'Tươi mới, ngọt ngào & thanh lịch',
    emoji: '🎓',
    recommendedTheme: 'cherry',
    description: 'Tone màu Hồng trẻ trung, dịu dàng và tràn đầy cảm hứng học tập.'
  },
  adult: {
    label: '25 - 45 tuổi (Người đi làm)',
    sub: 'Trang nhã, thư thái dịu mắt & tập trung',
    emoji: '💼',
    recommendedTheme: 'mint',
    description: 'Tone màu Xanh Lá dịu mắt, giảm căng thẳng khi học tập.'
  },
  senior: {
    label: 'Trên 45 tuổi (Trung niên & Trưởng thành)',
    sub: 'Tương phản cao, chữ to rõ & dễ đọc',
    emoji: '🍵',
    recommendedTheme: 'gold',
    description: 'Tone màu Vàng rõ nét, độ tương phản sắc bén, rất dễ đọc.'
  }
};

export function getThemeConfig(id?: string | null): ThemeConfig {
  if (!id) return THEME_CONFIGS.cherry;
  return THEME_CONFIGS[id as ThemeId] || THEME_CONFIGS.cherry;
}
