import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  Layers, 
  HelpCircle,
  Play,
  RotateCcw,
  Check
} from 'lucide-react';
import { 
  BASIC_VOWELS, 
  COMPOUND_VOWELS, 
  BASIC_CONSONANTS, 
  DOUBLE_CONSONANTS, 
  PATCHIM_GROUPS,
  INITIAL_CONSONANTS,
  VOWEL_LIST,
  FINAL_CONSONANTS,
  composeHangul
} from '../data/hangeulData';
import { speakKorean, playClickSound } from '../utils/audio';

type HangeulCategory = 'vowel' | 'compound-vowel' | 'consonant' | 'double-consonant' | 'patchim' | 'builder';

interface HangeulViewProps {
  speechRate: number;
}

export const HangeulView: React.FC<HangeulViewProps> = ({ speechRate }) => {
  const [activeTab, setActiveTab] = useState<HangeulCategory>('vowel');
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // Interactive Syllable Builder State
  const [selectedInitial, setSelectedInitial] = useState<number>(0); // 0 = ㄱ
  const [selectedVowel, setSelectedVowel] = useState<number>(0); // 0 = ㅏ
  const [selectedFinal, setSelectedFinal] = useState<number>(0); // 0 = none

  const handlePlayAudio = (text: string) => {
    playClickSound();
    setPlayingChar(text);
    speakKorean(text, speechRate).then(() => {
      setPlayingChar(null);
    });
  };

  const assembledChar = composeHangul(selectedInitial, selectedVowel, selectedFinal);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-emerald-50 border border-pink-100 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KHỞI ĐẦU DÀNH CHO NGƯỜI MỚI BẮT ĐẦU</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">
            Bảng Chữ Cái Hangeul & Luyện Phát Âm Chuẩn
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Bấm vào từng chữ cái để nghe phát âm chuẩn giọng Seoul bản ngữ. Học theo nguyên lý khoa học của Vua Sejong.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('builder')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Thử máy ghép chữ Hangeul</span>
          </button>
        </div>
      </div>

      {/* Category Pills Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'vowel', label: '10 Nguyên âm cơ bản', count: '10' },
          { id: 'compound-vowel', label: '11 Nguyên âm mở rộng', count: '11' },
          { id: 'consonant', label: '14 Phụ âm cơ bản', count: '14' },
          { id: 'double-consonant', label: '5 Phụ âm đôi (Căng)', count: '5' },
          { id: 'patchim', label: '7 Nhóm Patchim (Âm cuối)', count: '7' },
          { id: 'builder', label: '🧩 Máy ghép vần tương tác', count: 'Ghép chữ' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as HangeulCategory);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-pink-300 hover:bg-pink-50/50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Basic Vowels */}
      {activeTab === 'vowel' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 text-xs text-pink-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-pink-600" />
            <span>
              Mẹo: Các nguyên âm thẳng đứng (ㅏ, ㅑ, ㅓ, ㅕ, ㅣ) viết ở bên phải phụ âm; các nguyên âm nằm ngang (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ) viết ở bên dưới phụ âm.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {BASIC_VOWELS.map((item) => (
              <div
                key={item.char}
                onClick={() => handlePlayAudio(item.char)}
                className="group relative bg-white rounded-2xl border border-stone-200 p-4 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-pink-50 group-hover:bg-pink-100 flex items-center justify-center font-korean text-3xl font-extrabold text-pink-600 transition-colors mb-2">
                  {item.char}
                </div>
                <div className="font-bold text-stone-800 text-sm">
                  {item.name} [{item.romanization}]
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-0.5">
                  Âm: {item.vietnameseSound}
                </div>

                {item.exampleWord && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 w-full flex items-center justify-between text-xs text-stone-600">
                    <span className="font-korean font-bold text-stone-800">{item.exampleWord.kr}</span>
                    <span className="text-stone-500">({item.exampleWord.vi})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(item.exampleWord!.kr);
                      }}
                      className="p-1 rounded-md text-stone-400 hover:text-pink-600 hover:bg-pink-50"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="absolute top-2 right-2 text-stone-300 group-hover:text-pink-500 transition-colors">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Compound Vowels */}
      {activeTab === 'compound-vowel' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              Nguyên âm ghép được tạo thành từ sự kết hợp của 2 nguyên âm cơ bản (ví dụ: ㅗ + ㅏ = ㅘ [wa], ㅜ + ㅣ = ㅟ [wi]).
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMPOUND_VOWELS.map((item) => (
              <div
                key={item.char}
                onClick={() => handlePlayAudio(item.char)}
                className="group relative bg-white rounded-2xl border border-stone-200 p-4 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center font-korean text-3xl font-extrabold text-emerald-700 transition-colors mb-2">
                  {item.char}
                </div>
                <div className="font-bold text-stone-800 text-sm">
                  {item.name} [{item.romanization}]
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-0.5">
                  Âm: {item.vietnameseSound}
                </div>

                {item.exampleWord && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 w-full flex items-center justify-between text-xs text-stone-600">
                    <span className="font-korean font-bold text-stone-800">{item.exampleWord.kr}</span>
                    <span className="text-stone-500">({item.exampleWord.vi})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(item.exampleWord!.kr);
                      }}
                      className="p-1 rounded-md text-stone-400 hover:text-emerald-600 hover:bg-emerald-50"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="absolute top-2 right-2 text-stone-300 group-hover:text-emerald-500 transition-colors">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Basic Consonants */}
      {activeTab === 'consonant' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 text-xs text-pink-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-pink-600" />
            <span>
              Phụ âm tiếng Hàn được thiết kế mô phỏng khẩu hình của các cơ quan phát âm (môi, lưỡi, vòm họng).
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {BASIC_CONSONANTS.map((item) => (
              <div
                key={item.char}
                onClick={() => handlePlayAudio(item.char + 'ㅏ')}
                className="group relative bg-white rounded-2xl border border-stone-200 p-4 hover:border-pink-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-pink-50 group-hover:bg-pink-100 flex items-center justify-center font-korean text-3xl font-extrabold text-pink-600 transition-colors mb-2">
                  {item.char}
                </div>
                <div className="font-bold text-stone-800 text-sm">
                  {item.name}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">
                  Phiên âm: [{item.romanization}]
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  {item.vietnameseSound}
                </div>

                {item.exampleWord && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 w-full flex items-center justify-between text-xs text-stone-600">
                    <span className="font-korean font-bold text-stone-800">{item.exampleWord.kr}</span>
                    <span className="text-stone-500">({item.exampleWord.vi})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(item.exampleWord!.kr);
                      }}
                      className="p-1 rounded-md text-stone-400 hover:text-pink-600 hover:bg-pink-50"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Double Consonants */}
      {activeTab === 'double-consonant' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              Phụ âm đôi (căng âm): Cần gồng cơ cổ họng và nén hơi lại trước khi bật ra âm thanh mạnh, dứt khoát.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {DOUBLE_CONSONANTS.map((item) => (
              <div
                key={item.char}
                onClick={() => handlePlayAudio(item.char + 'ㅏ')}
                className="group relative bg-white rounded-2xl border border-stone-200 p-4 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center font-korean text-3xl font-extrabold text-amber-700 transition-colors mb-2">
                  {item.char}
                </div>
                <div className="font-bold text-stone-800 text-sm">
                  {item.name} [{item.romanization}]
                </div>
                <div className="text-xs text-amber-700 font-medium mt-0.5">
                  {item.vietnameseSound}
                </div>

                {item.exampleWord && (
                  <div className="mt-3 pt-2.5 border-t border-stone-100 w-full flex items-center justify-between text-xs text-stone-600">
                    <span className="font-korean font-bold text-stone-800">{item.exampleWord.kr}</span>
                    <span className="text-stone-500">({item.exampleWord.vi})</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(item.exampleWord!.kr);
                      }}
                      className="p-1 rounded-md text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Patchim Groups */}
      {activeTab === 'patchim' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-pink-50/70 border border-pink-100 text-xs text-pink-900 leading-relaxed">
            <span className="font-bold">Quy tắc vàng 7 nhóm phát âm Patchim: </span>
            Dù có tới 27 phụ âm đơn và kép có thể đứng ở vị trí phụ âm cuối (dưới chân chữ), trong phát âm thực tế chúng chỉ quy về đúng <strong>7 âm chuẩn</strong> duy nhất: <strong>[ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ]</strong>.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATCHIM_GROUPS.map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-korean text-xl font-black">
                      {group.standardSound}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">
                        Đại diện: {group.representedBy.join(', ')}
                      </div>
                      <div className="text-xs text-emerald-700 font-medium">
                        {group.vietnameseEquivalent}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic">
                  {group.ruleTip}
                </p>

                <div className="space-y-1.5 pt-1">
                  {group.examples.map((ex, i) => (
                    <div
                      key={i}
                      onClick={() => handlePlayAudio(ex.kr)}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-pink-50/70 transition-colors cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-korean font-bold text-base text-stone-900">{ex.kr}</span>
                        <span className="text-stone-500">[{ex.rom}]</span>
                        <span className="text-stone-700 font-medium">• {ex.vi}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-400 group-hover:text-pink-600">
                        <span className="text-[11px] text-emerald-700 font-mono">{ex.note}</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Interactive Syllable Builder Matrix */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-stone-900">
                🧩 Máy Thử Nghiệm Ghép Chữ Hangeul Trực Quan
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Chọn Phụ âm đầu + Nguyên âm + Patchim để xem ký tự Hangeul hoàn chỉnh và bấm nghe phát âm ngay tức thì!
              </p>
            </div>

            {/* Assembled Character Live Preview Box */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-pink-50 to-emerald-50 border border-pink-200 text-center relative overflow-hidden">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Ký tự hoàn chỉnh
              </div>

              <div className="w-28 h-28 rounded-3xl bg-white shadow-md border-2 border-pink-400 flex items-center justify-center font-korean text-6xl font-black text-stone-900 mb-4 animate-bounce">
                {assembledChar || '가'}
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-4">
                <span>{INITIAL_CONSONANTS[selectedInitial]} (Phụ âm)</span>
                <span>+</span>
                <span>{VOWEL_LIST[selectedVowel]} (Nguyên âm)</span>
                {selectedFinal > 0 && (
                  <>
                    <span>+</span>
                    <span>{FINAL_CONSONANTS[selectedFinal]} (Patchim)</span>
                  </>
                )}
                <span>=</span>
                <span className="font-bold text-pink-600 font-korean text-lg">{assembledChar}</span>
              </div>

              <button
                onClick={() => handlePlayAudio(assembledChar)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát âm ký tự này</span>
              </button>
            </div>

            {/* 3 Steps Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
              {/* Step 1: Initial Consonant */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                    1. Phụ âm đầu (초성)
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Chọn: {INITIAL_CONSONANTS[selectedInitial]}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto p-1 bg-stone-50 rounded-xl border border-stone-200">
                  {INITIAL_CONSONANTS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playClickSound();
                        setSelectedInitial(i);
                      }}
                      className={`p-2 rounded-lg font-korean text-base font-bold transition-all ${
                        selectedInitial === i
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'bg-white hover:bg-pink-100 text-stone-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Medial Vowel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    2. Nguyên âm giữa (중성)
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    Chọn: {VOWEL_LIST[selectedVowel]}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto p-1 bg-stone-50 rounded-xl border border-stone-200">
                  {VOWEL_LIST.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playClickSound();
                        setSelectedVowel(i);
                      }}
                      className={`p-2 rounded-lg font-korean text-base font-bold transition-all ${
                        selectedVowel === i
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white hover:bg-emerald-100 text-stone-800'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Final Patchim */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                    3. Phụ âm cuối Patchim (종성)
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {selectedFinal === 0 ? 'Không có' : FINAL_CONSONANTS[selectedFinal]}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto p-1 bg-stone-50 rounded-xl border border-stone-200">
                  {FINAL_CONSONANTS.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playClickSound();
                        setSelectedFinal(i);
                      }}
                      className={`p-2 rounded-lg font-korean text-sm font-bold transition-all ${
                        selectedFinal === i
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'bg-white hover:bg-teal-100 text-stone-800'
                      }`}
                    >
                      {f === '' ? 'Ø' : f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
