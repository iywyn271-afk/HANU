import React from 'react';
import { 
  X, 
  Palette, 
  Check, 
  Sparkles, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { ThemeId, AgeBracket } from '../types';
import { THEME_CONFIGS, AGE_BRACKET_INFO, getThemeConfig } from '../data/themeData';
import { playClickSound, playCorrectSound } from '../utils/audio';

interface ThemePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  currentAgeBracket?: AgeBracket;
  onOpenSurvey: () => void;
}

export const ThemePaletteModal: React.FC<ThemePaletteModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
  currentAgeBracket = 'young-adult',
  onOpenSurvey
}) => {
  if (!isOpen) return null;

  const currentConfig = getThemeConfig(currentThemeId);
  const ageInfo = AGE_BRACKET_INFO[currentAgeBracket];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full my-auto overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-5 text-white relative transition-colors duration-300"
          style={{
            background: `linear-gradient(135deg, ${currentConfig.gradientFrom}, ${currentConfig.gradientTo})`
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-white/20 text-white">
              <Palette className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Bảng Màu Giao Diện HANU
            </span>
          </div>

          <h3 className="text-xl font-black">
            Chọn Màu Sắc Giao Diện Yêu Thích
          </h3>
          <p className="text-xs text-white/90 mt-0.5">
            Tự do chọn bảng màu phù hợp với phong cách và sở thích cá nhân của bạn bất cứ lúc nào.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Current Age & Recommendation pill */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-xl">{ageInfo?.emoji || '🌸'}</span>
              <div>
                <span className="font-bold text-stone-900">Độ tuổi đã chọn: {ageInfo?.label || '18 - 25 tuổi'}</span>
                <p className="text-[11px] text-stone-500">{ageInfo?.sub}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
                onOpenSurvey();
              }}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Làm lại khảo sát độ tuổi</span>
            </button>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(THEME_CONFIGS) as ThemeId[]).map((tid) => {
              const cfg = THEME_CONFIGS[tid];
              const isSelected = currentThemeId === tid;
              const isAgeMatch = Boolean(currentAgeBracket && cfg.ageMatch.includes(currentAgeBracket as AgeBracket));

              return (
                <div
                  key={tid}
                  onClick={() => {
                    playClickSound();
                    onSelectTheme(tid);
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-stone-900 bg-stone-50/70 shadow-md ring-2 ring-stone-400'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cfg.emoji}</span>
                      <div>
                        <div className="text-xs font-black text-stone-900 flex items-center gap-1">
                          <span>{cfg.name}</span>
                          {isAgeMatch && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                              Khuyên dùng
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {cfg.subTitle}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Gradient strip preview */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <div 
                      className="h-3 flex-1 rounded-full border border-black/10"
                      style={{
                        background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`
                      }}
                    />
                    <span 
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: cfg.accentColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/60 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            style={{
              background: `linear-gradient(90deg, ${currentConfig.gradientFrom}, ${currentConfig.gradientTo})`
            }}
          >
            Đóng & Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};
