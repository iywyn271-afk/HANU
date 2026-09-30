import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  Volume2, 
  Sparkles, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  Plus, 
  Check, 
  AlertCircle,
  FileText,
  BookOpen,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { GrammarLesson } from '../types';
import { speakKorean, playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface OwnerGrammarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGrammar: (lesson: GrammarLesson) => void;
  onDeleteGrammar: (id: string) => void;
  editingGrammar?: GrammarLesson | null;
  customGrammar: GrammarLesson[];
  onImportGrammar: (lessons: GrammarLesson[]) => void;
  ownerEmail: string;
  speechRate: number;
}

export const OwnerGrammarModal: React.FC<OwnerGrammarModalProps> = ({
  isOpen,
  onClose,
  onSaveGrammar,
  onDeleteGrammar,
  editingGrammar,
  customGrammar,
  onImportGrammar,
  ownerEmail,
  speechRate
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  // Form states
  const [level, setLevel] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [pattern, setPattern] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [hasPatchim, setHasPatchim] = useState<string>('');
  const [noPatchim, setNoPatchim] = useState<string>('');
  const [irregular, setIrregular] = useState<string>('');
  const [tip, setTip] = useState<string>('');
  
  const [examples, setExamples] = useState<{ kr: string; vi: string }[]>([
    { kr: '', vi: '' },
    { kr: '', vi: '' }
  ]);

  const [formError, setFormError] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Sync when editing an existing grammar item
  useEffect(() => {
    if (editingGrammar) {
      setLevel(editingGrammar.level || 1);
      setTitle(editingGrammar.title || '');
      setPattern(editingGrammar.pattern || '');
      setSummary(editingGrammar.summary || '');
      setExplanation(editingGrammar.explanation || '');
      setHasPatchim(editingGrammar.formula?.hasPatchim || '');
      setNoPatchim(editingGrammar.formula?.noPatchim || '');
      setIrregular(editingGrammar.formula?.irregular || '');
      setTip(editingGrammar.tip || '');
      setExamples(
        editingGrammar.examples && editingGrammar.examples.length > 0
          ? editingGrammar.examples
          : [{ kr: '', vi: '' }]
      );
      setActiveTab('form');
    } else {
      resetForm();
    }
  }, [editingGrammar, isOpen]);

  const resetForm = () => {
    setLevel(1);
    setTitle('');
    setPattern('');
    setSummary('');
    setExplanation('');
    setHasPatchim('');
    setNoPatchim('');
    setIrregular('');
    setTip('');
    setExamples([
      { kr: '', vi: '' },
      { kr: '', vi: '' }
    ]);
    setFormError('');
  };

  if (!isOpen) return null;

  // Add / remove example row
  const handleAddExample = () => {
    playClickSound();
    setExamples([...examples, { kr: '', vi: '' }]);
  };

  const handleRemoveExample = (index: number) => {
    playClickSound();
    if (examples.length <= 1) return;
    setExamples(examples.filter((_, i) => i !== index));
  };

  const handleExampleChange = (index: number, field: 'kr' | 'vi', value: string) => {
    const updated = [...examples];
    updated[index][field] = value;
    setExamples(updated);
  };

  // Submit grammar form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Vui lòng nhập tiêu đề ngữ pháp!');
      return;
    }
    if (!pattern.trim()) {
      setFormError('Vui lòng nhập công thức ngữ pháp ngắn gọn!');
      return;
    }
    if (!summary.trim()) {
      setFormError('Vui lòng nhập ý nghĩa tóm tắt tiếng Việt!');
      return;
    }

    const validExamples = examples.filter((ex) => ex.kr.trim() && ex.vi.trim());

    const newGrammarLesson: GrammarLesson = {
      id: editingGrammar?.id || `custom-grammar-${Date.now()}`,
      level,
      title: title.trim(),
      pattern: pattern.trim(),
      summary: summary.trim(),
      explanation: explanation.trim() || summary.trim(),
      formula: {
        hasPatchim: hasPatchim.trim() || 'Có patchim: ' + pattern.trim(),
        noPatchim: noPatchim.trim() || 'Không có patchim: ' + pattern.trim(),
        irregular: irregular.trim() || undefined
      },
      examples: validExamples.length > 0 ? validExamples : [
        {
          kr: title.trim(),
          vi: summary.trim()
        }
      ],
      tip: tip.trim() || undefined,
      isCustom: true,
      createdBy: ownerEmail,
      createdAt: editingGrammar?.createdAt || new Date().toISOString()
    };

    onSaveGrammar(newGrammarLesson);
    playCorrectSound();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);

    if (!editingGrammar) {
      resetForm();
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    playClickSound();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customGrammar, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hanu-custom-grammar-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportGrammar(parsed);
          playCorrectSound();
          alert(`Đã nhập thành công ${parsed.length} bài ngữ pháp!`);
        } else {
          alert('Định dạng file JSON không hợp lệ!');
        }
      } catch {
        alert('Không thể đọc file JSON này!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSpeak = (text: string) => {
    playClickSound();
    speakKorean(text, speechRate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-white/20 text-white">
              <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Quyền Chủ Sở Hữu • {ownerEmail}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            {editingGrammar ? 'Chỉnh Sửa Ngữ Pháp Tiếng Hàn' : 'Thêm Bài Học Ngữ Pháp Mới'}
          </h3>
          <p className="text-xs text-white/90 mt-0.5">
            Soạn thảo cấu trúc ngữ pháp, công thức chia động từ có/không patchim và các câu ví dụ sinh động.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('form');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingGrammar ? 'Chỉnh sửa' : 'Soạn ngữ pháp mới'}</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ngữ pháp đã thêm ({customGrammar.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {showSuccessToast && (
            <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Lưu bài học ngữ pháp thành công! Học viên có thể xem và thực hành ngay.</span>
            </div>
          )}

          {formError && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* TAB 1: FORM SOẠN THẢO */}
          {activeTab === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Level */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Cấp độ (TOPIK):
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 font-bold text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((l) => (
                      <option key={l} value={l}>
                        Cấp độ {l} {l === 1 ? '(Sơ cấp 1)' : l === 2 ? '(Sơ cấp 2)' : l <= 4 ? '(Trung cấp)' : '(Cao cấp)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pattern */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Cấu trúc viết tắt: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: ~(으)ㄹ 때, ~기 전에"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-bold font-korean focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Tiêu đề bài ngữ pháp: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ví dụ: V/A + ~(으)ㄹ 때"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-bold font-korean focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Ý nghĩa tiếng Việt tóm gọn: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="ví dụ: Khi / Vào lúc thực hiện hành động hoặc trạng thái xảy ra"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-bold focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Explanation */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Giải thích chi tiết & ngữ cảnh sử dụng:
                </label>
                <textarea
                  rows={3}
                  placeholder="Giải thích cách dùng, khi nào dùng trong đời sống, đối tượng giao tiếp..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Formula Section */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Quy tắc chia công thức (Có / Không có patchim):</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Khi có Patchim (Phụ âm dưới):
                    </label>
                    <input
                      type="text"
                      placeholder="ví dụ: Động từ + 을 때 (먹다 -> 먹을 때)"
                      value={hasPatchim}
                      onChange={(e) => setHasPatchim(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      Khi không có Patchim (hoặc patchim ㄹ):
                    </label>
                    <input
                      type="text"
                      placeholder="ví dụ: Động từ + ㄹ 때 (가다 -> 갈 때, 살다 -> 살 때)"
                      value={noPatchim}
                      onChange={(e) => setNoPatchim(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    Bất quy tắc / Trường hợp đặc biệt (nếu có):
                  </label>
                  <input
                    type="text"
                    placeholder="ví dụ: Bất quy tắc 'ㄷ': 듣다 -> 들을 때; 'ㅂ': 돕다 -> 도울 때"
                    value={irregular}
                    onChange={(e) => setIrregular(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Examples Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-pink-600" />
                    <span>Các câu ví dụ thực tế minh họa:</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAddExample}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm ví dụ</span>
                  </button>
                </div>

                {examples.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold">
                      <span>Ví dụ #{idx + 1}</span>
                      {examples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExample(idx)}
                          className="text-rose-500 hover:text-rose-700 font-medium cursor-pointer"
                        >
                          Xóa dòng này
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Câu tiếng Hàn (ví dụ: 한국에 갈 때 비행기를 타요)..."
                          value={ex.kr}
                          onChange={(e) => handleExampleChange(idx, 'kr', e.target.value)}
                          className="w-full pl-3 pr-8 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-korean font-bold focus:outline-hidden focus:border-emerald-500"
                        />
                        {ex.kr && (
                          <button
                            type="button"
                            onClick={() => handleSpeak(ex.kr)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-600 cursor-pointer"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Nghĩa tiếng Việt (ví dụ: Khi đi Hàn Quốc tôi đi máy bay)..."
                        value={ex.vi}
                        onChange={(e) => handleExampleChange(idx, 'vi', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip / Note */}
              <div>
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mẹo ghi nhớ / Lưu ý phân biệt:</span>
                </label>
                <input
                  type="text"
                  placeholder="ví dụ: Không dùng với các thói quen hàng ngày mang tính hiển nhiên..."
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                {editingGrammar && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Hủy sửa
                  </button>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 transform hover:-translate-y-0.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingGrammar ? 'Cập Nhật Ngữ Pháp' : 'Lưu & Xuất Bản Ngữ Pháp'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: DANH SÁCH NGỮ PHÁP ĐÃ THÊM */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <div>
                  <span className="font-bold text-stone-800">
                    Tổng cộng: {customGrammar.length} bài học ngữ pháp do bạn tạo
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Dữ liệu được lưu trữ trực tiếp và tự động hiển thị trong tab Ngữ pháp cho tất cả học viên.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất JSON</span>
                  </button>

                  <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Nhập JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {customGrammar.length === 0 ? (
                <div className="text-center py-10 space-y-2 border-2 border-dashed border-stone-200 rounded-3xl p-6">
                  <span className="text-4xl block">📝</span>
                  <h4 className="font-extrabold text-stone-800 text-sm">Chưa có bài học ngữ pháp nào được thêm</h4>
                  <p className="text-xs text-stone-500">
                    Bấm sang tab "Soạn ngữ pháp mới" để tạo bài học ngữ pháp đầu tiên của bạn!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    + Tạo ngữ pháp ngay
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {customGrammar.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-white hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Cấp {item.level}
                          </span>
                          <span className="font-korean font-black text-sm text-stone-900">
                            {item.title}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-md border border-emerald-200">
                            {item.pattern}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-medium">
                          {item.summary}
                        </p>
                        <div className="text-[11px] text-stone-400">
                          {item.examples.length} câu ví dụ • Tạo lúc: {new Date(item.createdAt || '').toLocaleDateString('vi-VN')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            // Load to edit
                            setLevel(item.level);
                            setTitle(item.title);
                            setPattern(item.pattern);
                            setSummary(item.summary);
                            setExplanation(item.explanation);
                            setHasPatchim(item.formula?.hasPatchim || '');
                            setNoPatchim(item.formula?.noPatchim || '');
                            setIrregular(item.formula?.irregular || '');
                            setTip(item.tip || '');
                            setExamples(item.examples || [{ kr: '', vi: '' }]);
                            setActiveTab('form');
                          }}
                          className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
                          title="Chỉnh sửa ngữ pháp này"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            if (window.confirm(`Bạn có chắc chắn muốn xóa bài ngữ pháp "${item.title}"?`)) {
                              onDeleteGrammar(item.id);
                            }
                          }}
                          className="p-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                          title="Xóa ngữ pháp này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
