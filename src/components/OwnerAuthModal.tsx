import React, { useState } from 'react';
import { Crown, X, Check, ShieldCheck, Sparkles, User, LogOut } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwnerMode: boolean;
  onSetOwnerMode: (active: boolean) => void;
  ownerEmail: string;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  isOwnerMode,
  onSetOwnerMode,
  ownerEmail
}) => {
  const [inputEmail, setInputEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickActivate = () => {
    playCorrectSound();
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });
    onSetOwnerMode(true);
    onClose();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    const clean = inputEmail.trim().toLowerCase();
    if (
      clean === ownerEmail.toLowerCase() ||
      clean === 'admin' ||
      clean.includes('iywyn271') ||
      clean === '2026'
    ) {
      playCorrectSound();
      confetti({ particleCount: 45, spread: 70 });
      onSetOwnerMode(true);
      onClose();
    } else {
      setErrorMsg(`Email hoặc mã xác nhận không chính xác. Email chủ sở hữu là: ${ownerEmail}`);
    }
  };

  const handleDeactivate = () => {
    playClickSound();
    onSetOwnerMode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3 shadow-inner">
            <Crown className="w-6 h-6 text-amber-200 fill-amber-200" />
          </div>

          <h3 className="text-xl font-black">
            {isOwnerMode ? 'Chế Độ Người Sở Hữu Đang Bật' : 'Xác Nhận Quyền Người Sở Hữu'}
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Quyền thêm, sửa và quản lý từ vựng, ngữ pháp và đề thi quiz tiếng Hàn vào ứng dụng.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isOwnerMode ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bạn đang đăng nhập với tư cách Người Sở Hữu</span>
                </div>
                <p className="text-stone-600">
                  Email sở hữu: <strong className="text-stone-900">{ownerEmail}</strong>
                </p>
                <p className="text-stone-500 text-[11px]">
                  Bạn có toàn quyền thêm từ vựng, bài học ngữ pháp, câu hỏi quiz mới, chỉnh sửa, xóa và tải file sao lưu JSON bất cứ lúc nào.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Tiếp tục quản lý từ vựng
                </button>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  className="py-2.5 px-4 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Chuyển về góc nhìn người học thông thường"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Thoát</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span>Dành riêng cho chủ sở hữu ({ownerEmail})</span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  Người sở hữu có thể thêm các từ vựng mới vào kho từ vựng và tự động đưa vào các bài tập Flashcard.
                </p>
              </div>

              {/* Quick 1-click verify */}
              <button
                type="button"
                onClick={handleQuickActivate}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Crown className="w-4 h-4 text-amber-200 fill-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Tôi là {ownerEmail} (Kích hoạt ngay)</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-stone-200"></div>
                <span className="shrink-0 mx-2 text-[10px] text-stone-400 uppercase font-bold">hoặc nhập xác thực</span>
                <div className="flex-grow border-t border-stone-200"></div>
              </div>

              <form onSubmit={handleVerify} className="space-y-3">
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {errorMsg}
                  </p>
                )}

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Nhập email chủ sở hữu hoặc mã PIN:
                  </label>
                  <input
                    type="text"
                    placeholder={ownerEmail}
                    value={inputEmail}
                    onChange={(e) => {
                      setInputEmail(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:border-pink-500 bg-stone-50 focus:bg-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-stone-600 font-bold text-xs hover:bg-stone-100 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
