import React, { useState } from 'react';
import { 
  FileText, 
  Volume2, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  Search,
  BookOpen
} from 'lucide-react';
import { GRAMMAR_LESSONS } from '../data/grammarData';
import { speakKorean, playClickSound } from '../utils/audio';

interface GrammarViewProps {
  selectedLevel: number;
  onSelectLevel: (lvl: number) => void;
  speechRate: number;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  selectedLevel,
  onSelectLevel,
  speechRate
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('g1-1');

  const filteredGrammar = GRAMMAR_LESSONS.filter((item) => {
    const matchLevel = selectedLevel === 0 || item.level === selectedLevel;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.pattern.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q);
    return matchLevel && matchSearch;
  });

  const handleSpeak = (text: string) => {
    playClickSound();
    speakKorean(text, speechRate);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-emerald-50 border border-pink-100 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NGỮ PHÁP TRỌNG TÂM • GIẢI THÍCH NGẮN GỌN</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900">
            Học Ngữ Pháp Tiếng Hàn Theo Cấp Độ
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Nắm chắc quy tắc chia đuôi câu, phân biệt trợ từ có/không có patchim và ứng dụng ngay vào đàm thoại.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 shadow-2xs">
            {filteredGrammar.length} cấu trúc ngữ pháp
          </span>
        </div>
      </div>

      {/* Level Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
        {/* Level pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 mr-1">Cấp độ:</span>
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playClickSound();
                onSelectLevel(lvl);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:border-pink-300'
              }`}
            >
              Cấp {lvl}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm ngữ pháp..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:border-pink-500 transition-colors"
          />
        </div>
      </div>

      {/* Grammar Cards List */}
      <div className="space-y-4">
        {filteredGrammar.map((lesson) => {
          const isExpanded = expandedId === lesson.id;
          return (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-pink-300 transition-all"
            >
              {/* Card Header */}
              <div
                onClick={() => {
                  playClickSound();
                  setExpandedId(isExpanded ? null : lesson.id);
                }}
                className="p-5 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-stone-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 font-bold text-xs">
                      Cấp {lesson.level}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {lesson.pattern}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500">
                    {lesson.summary}
                  </p>
                </div>

                <button className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-xl shrink-0">
                  {isExpanded ? 'Thu gọn ▲' : 'Xem chi tiết ▼'}
                </button>
              </div>

              {/* Card Collapsible Body */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-100 space-y-4 text-xs sm:text-sm animate-fadeIn">
                  {/* Explanation */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-stone-700 leading-relaxed">
                    <span className="font-bold text-stone-900 block mb-1">Cách dùng & Ý nghĩa:</span>
                    {lesson.explanation}
                  </div>

                  {/* Formula / Patchim Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-pink-50/60 border border-pink-200 space-y-1">
                      <div className="font-bold text-pink-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Trường hợp CÓ Patchim</span>
                      </div>
                      <p className="text-stone-800 font-medium">
                        {lesson.formula.hasPatchim}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Trường hợp KHÔNG Patchim</span>
                      </div>
                      <p className="text-stone-800 font-medium">
                        {lesson.formula.noPatchim}
                      </p>
                    </div>
                  </div>

                  {lesson.formula.irregular && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                      <strong>Lưu ý bất quy tắc: </strong> {lesson.formula.irregular}
                    </div>
                  )}

                  {/* Practical Examples */}
                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-stone-800 text-xs uppercase tracking-wider block">
                      Ví dụ đối thoại thực tế:
                    </span>
                    <div className="space-y-2">
                      {lesson.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 hover:bg-pink-50/50 transition-colors"
                        >
                          <div>
                            <div className="font-korean font-bold text-stone-900 text-sm sm:text-base">
                              {ex.kr}
                            </div>
                            <div className="text-xs text-stone-600 mt-0.5">
                              {ex.vi}
                            </div>
                          </div>

                          <button
                            onClick={() => handleSpeak(ex.kr)}
                            title="Nghe câu mẫu"
                            className="p-2 rounded-xl bg-white border border-stone-200 text-pink-600 hover:bg-pink-100 shadow-2xs transition-colors shrink-0 cursor-pointer"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tip */}
                  {lesson.tip && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-emerald-50 border border-pink-200 text-xs text-stone-700">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900">Mẹo ghi nhớ: </span>
                        {lesson.tip}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredGrammar.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-stone-600 font-medium">Không tìm thấy bài học ngữ pháp phù hợp.</p>
        </div>
      )}
    </div>
  );
};
