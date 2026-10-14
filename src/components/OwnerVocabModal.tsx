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
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';
import { VocabWord } from '../types';
import { VOCAB_CATEGORIES } from '../data/vocabData';
import { romanizeKorean } from '../utils/romanization';
import { speakKorean, playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface OwnerVocabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveWord: (word: VocabWord) => void;
  onDeleteWord: (wordId: string) => void;
  editingWord?: VocabWord | null;
  customWords: VocabWord[];
  onImportWords: (words: VocabWord[]) => void;
  ownerEmail: string;
  speechRate: number;
}

export const OwnerVocabModal: React.FC<OwnerVocabModalProps> = ({
  isOpen,
  onClose,
  onSaveWord,
  onDeleteWord,
  editingWord,
  customWords,
  onImportWords,
  ownerEmail,
  speechRate
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  // Form states
  const [korean, setKorean] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [romanization, setRomanization] = useState('');
  const [hanja, setHanja] = useState('');
  const [level, setLevel] = useState<number>(1);
  const [category, setCategory] = useState<string>('Chào hỏi & Giao tiếp');
  const [isCustomCategory, setIsCustomCategory] = useState<boolean>(false);
  const [customCategoryInput, setCustomCategoryInput] = useState<string>('');
  const [exampleKr, setExampleKr] = useState<string>('');
  const [exampleVi, setExampleVi] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Search in custom words list
  const [listSearch, setListSearch] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (editingWord) {
      setKorean(editingWord.korean);
      setVietnamese(editingWord.vietnamese);
      setRomanization(editingWord.romanization);
      setHanja(editingWord.hanja || '');
      setLevel(editingWord.level);
      
      if (VOCAB_CATEGORIES.includes(editingWord.category)) {
        setCategory(editingWord.category);
        setIsCustomCategory(false);
        setCustomCategoryInput('');
      } else {
        setCategory('other');
        setIsCustomCategory(true);
        setCustomCategoryInput(editingWord.category);
      }

      setExampleKr(editingWord.exampleKr);
      setExampleVi(editingWord.exampleVi);
      setActiveTab('form');
    } else {
      resetForm();
    }
  }, [editingWord, isOpen]);

  const resetForm = () => {
    setKorean('');
    setVietnamese('');
    setRomanization('');
    setHanja('');
    setLevel(1);
    setCategory('Chào hỏi & Giao tiếp');
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setExampleKr('');
    setExampleVi('');
    setFormError('');
  };

  // Handle Korean change with auto-romanization
  const handleKoreanChange = (val: string) => {
    setKorean(val);
    setFormError('');
    // If romanization is empty or was auto-generated, update it
    if (!editingWord || !romanization) {
      const generated = romanizeKorean(val);
      if (generated) {
        setRomanization(generated);
      }
    }
  };

  const handleAutoRomanize = () => {
    playClickSound();
    if (!korean.trim()) return;
    const generated = romanizeKorean(korean.trim());
    setRomanization(generated);
  };

  const handleTestPronounce = (textToSpeak: string) => {
    playClickSound();
    if (!textToSpeak.trim()) return;
    speakKorean(textToSpeak.trim(), speechRate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!korean.trim()) {
      setFormError('Vui lòng nhập từ tiếng Hàn!');
      return;
    }
    if (!vietnamese.trim()) {
      setFormError('Vui lòng nhập nghĩa tiếng Việt!');
      return;
    }

    const finalCategory = isCustomCategory ? (customCategoryInput.trim() || 'Chủ đề khác') : category;
    const finalRom = romanization.trim() || romanizeKorean(korean.trim()) || korean.trim();
    const finalExKr = exampleKr.trim() || `${korean.trim()}를/을 사용해요.`;
    const finalExVi = exampleVi.trim() || `Ví dụ với từ "${vietnamese.trim()}".`;

    const newWord: VocabWord = {
      id: editingWord ? editingWord.id : `owner-vocab-${Date.now()}`,
      korean: korean.trim(),
      vietnamese: vietnamese.trim(),
      romanization: finalRom,
      hanja: hanja.trim() || undefined,
      level,
      category: finalCategory,
      exampleKr: finalExKr,
      exampleVi: finalExVi,
      isCustom: true,
      createdBy: ownerEmail,
      createdAt: editingWord?.createdAt || new Date().toISOString()
    };

    onSaveWord(newWord);
    playCorrectSound();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });

    setSuccessMessage(editingWord ? 'Đã cập nhật từ vựng thành công!' : 'Đã thêm từ vựng mới vào kho lưu trữ!');
    setTimeout(() => {
      setSuccessMessage('');
      if (!editingWord) {
        resetForm();
      } else {
        onClose();
      }
    }, 1200);
  };

  // Export custom words to JSON
  const handleExportJSON = () => {
    playClickSound();
    if (customWords.length === 0) {
      alert('Bạn chưa thêm từ vựng nào để xuất!');
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customWords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `korean_vocab_owner_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import custom words from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const validWords = parsed.filter(w => w.korean && w.vietnamese).map(w => ({
            ...w,
            id: w.id || `owner-vocab-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            isCustom: true,
            createdBy: w.createdBy || ownerEmail,
            createdAt: w.createdAt || new Date().toISOString()
          }));

          if (validWords.length > 0) {
            onImportWords(validWords);
            playCorrectSound();
            confetti({ particleCount: 50, spread: 70 });
            alert(`Đã nhập thành công ${validWords.length} từ vựng mới!`);
          } else {
            alert('File JSON không chứa từ vựng hợp lệ.');
          }
        } else {
          alert('Định dạng file không đúng: phải là danh sách mảng JSON.');
        }
      } catch (err) {
        alert('Lỗi đọc file JSON: ' + (err instanceof Error ? err.message : 'Dữ liệu không hợp lệ'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isOpen) return null;

  const filteredCustomList = customWords.filter(w => {
    const q = listSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      w.korean.toLowerCase().includes(q) ||
      w.vietnamese.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full my-auto overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Owner Crown Branding */}
        <div className="bg-gradient-to-r from-amber-500 via-pink-500 to-rose-500 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-white/20 shadow-xs flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-200 fill-amber-200" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Khu Vực Người Sở Hữu
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            {editingWord ? '✏️ Chỉnh Sửa Từ Vựng' : '➕ Thêm Từ Vựng Tiếng Hàn Mới'}
          </h3>
          <p className="text-xs text-white/90 mt-1 flex items-center gap-1.5">
            <span>Tài khoản người sở hữu:</span>
            <strong className="underline underline-offset-2">{ownerEmail}</strong>
          </p>
        </div>

        {/* Tab switchers: Form vs Custom words list */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 pt-3 pb-2 bg-stone-50/70">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('form');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingWord ? 'Chỉnh sửa từ' : 'Nhập từ mới'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Từ bạn đã thêm ({customWords.length})</span>
            </button>
          </div>

          {/* Quick Import/Export actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportJSON}
              disabled={customWords.length === 0}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Xuất file sao lưu JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất</span>
            </button>

            <label
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Nhập file JSON đã có"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nhập</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Tab 1: Form add/edit */}
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Row 1: Korean & Vietnamese */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Korean Word */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                  <span>Từ tiếng Hàn (Hangeul) <span className="text-rose-500">*</span></span>
                  {korean && (
                    <button
                      type="button"
                      onClick={() => handleTestPronounce(korean)}
                      className="text-pink-600 hover:text-pink-700 text-[11px] inline-flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" /> Nghe thử
                    </button>
                  )}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 학교, 행복하다, 친구"
                  value={korean}
                  onChange={(e) => handleKoreanChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden font-korean font-bold text-lg text-stone-900 transition-all"
                />
              </div>

              {/* Vietnamese Meaning */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Nghĩa tiếng Việt <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Trường học, Hạnh phúc, Bạn bè"
                  value={vietnamese}
                  onChange={(e) => {
                    setVietnamese(e.target.value);
                    setFormError('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden font-semibold text-stone-900 transition-all text-sm"
                />
              </div>
            </div>

            {/* Row 2: Romanization & Hanja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Romanization with auto generator */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700">
                    Phiên âm Romanization
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoRomanize}
                    className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 inline-flex items-center gap-1 cursor-pointer"
                    title="Tự động phiên âm chuẩn từ tiếng Hàn"
                  >
                    <Sparkles className="w-3 h-3" /> Tự sinh phiên âm
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Ví dụ: hak-gyo, haeng-bok-ha-da"
                  value={romanization}
                  onChange={(e) => setRomanization(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden font-mono text-xs text-stone-700 transition-all"
                />
              </div>

              {/* Hanja (optional) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Chữ Hán Hanja <span className="text-stone-400 font-normal">(tùy chọn)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 學校, 幸福하다"
                  value={hanja}
                  onChange={(e) => setHanja(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden text-xs text-stone-700 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Level & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Level */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Cấp độ tiếng Hàn
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden text-xs font-bold text-stone-800 transition-all cursor-pointer"
                >
                  <option value={1}>Cấp 1</option>
                  <option value={2}>Cấp 2</option>
                  <option value={3}>Cấp 3</option>
                  <option value={4}>Cấp 4</option>
                  <option value={5}>Cấp 5</option>
                  <option value={6}>Cấp 6</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Chủ đề từ vựng
                </label>
                {!isCustomCategory ? (
                  <div className="flex gap-2">
                    <select
                      value={category}
                      onChange={(e) => {
                        if (e.target.value === '__new__') {
                          setIsCustomCategory(true);
                        } else {
                          setCategory(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden text-xs font-semibold text-stone-800 transition-all cursor-pointer"
                    >
                      {VOCAB_CATEGORIES.filter(c => c !== 'Tất cả').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__new__">+ Nhập chủ đề mới tự do...</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Nhập tên chủ đề mới..."
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(false)}
                      className="px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-800 bg-stone-100 rounded-xl"
                    >
                      Chọn có sẵn
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: Example Sentence Korean & Vietnamese */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800">
                  Ví dụ minh họa thực tế
                </span>
                <span className="text-[11px] text-stone-400">
                  (Khuyến khích điền để người học dễ nhớ ngữ cảnh)
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-stone-600">
                    Câu ví dụ tiếng Hàn:
                  </label>
                  {exampleKr && (
                    <button
                      type="button"
                      onClick={() => handleTestPronounce(exampleKr)}
                      className="text-pink-600 hover:text-pink-700 text-[10px] inline-flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" /> Nghe ví dụ
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Ví dụ: 저는 내일 학교에 갑니다."
                  value={exampleKr}
                  onChange={(e) => setExampleKr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden font-korean text-xs text-stone-900 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-stone-600">
                  Dịch nghĩa câu ví dụ tiếng Việt:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ngày mai tôi đi đến trường."
                  value={exampleVi}
                  onChange={(e) => setExampleVi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-pink-500 focus:outline-hidden text-xs text-stone-700 transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{editingWord ? 'Lưu cập nhật' : 'Thêm từ vựng ngay'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Manage list of custom words added by owner */}
        {activeTab === 'list' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm trong danh sách từ bạn đã tạo..."
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:outline-hidden focus:border-pink-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  resetForm();
                  setActiveTab('form');
                }}
                className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm từ mới</span>
              </button>
            </div>

            {filteredCustomList.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl p-6">
                <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-600 font-semibold">
                  {customWords.length === 0 
                    ? 'Bạn chưa thêm từ vựng nào. Hãy bấm "Nhập từ mới" để bắt đầu thêm từ cho học viên!' 
                    : 'Không tìm thấy từ vựng nào khớp với từ khóa tìm kiếm.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {filteredCustomList.map((w) => (
                  <div
                    key={w.id}
                    className="p-3 rounded-2xl border border-stone-200 hover:border-pink-300 bg-stone-50/50 hover:bg-white transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-korean font-bold text-lg text-stone-900">
                          {w.korean}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          [{w.romanization}]
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-pink-100 text-pink-700">
                          Cấp {w.level}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-stone-100 text-stone-600">
                          {w.category}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 mt-0.5 truncate">
                        {w.vietnamese}
                      </div>
                      {w.exampleKr && (
                        <div className="text-[11px] text-stone-500 font-korean mt-0.5 truncate">
                          {w.exampleKr}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleTestPronounce(w.korean)}
                        className="p-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          // trigger edit
                          setKorean(w.korean);
                          setVietnamese(w.vietnamese);
                          setRomanization(w.romanization);
                          setHanja(w.hanja || '');
                          setLevel(w.level);
                          setCategory(w.category);
                          setExampleKr(w.exampleKr);
                          setExampleVi(w.exampleVi);
                          setActiveTab('form');
                        }}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        title="Sửa từ này"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          if (window.confirm(`Bạn có chắc chắn muốn xóa từ "${w.korean}" (${w.vietnamese}) không?`)) {
                            onDeleteWord(w.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                        title="Xóa từ này"
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
  );
};
