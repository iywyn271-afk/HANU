import React, { useState, useEffect } from 'react';
import { 
  X, 
  Crown, 
  HelpCircle, 
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
  ArrowRight,
  ListOrdered,
  Shuffle
} from 'lucide-react';
import { QuizQuestion, QuizType } from '../types';
import { speakKorean, playClickSound, playCorrectSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface OwnerQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveQuiz: (quiz: QuizQuestion) => void;
  onDeleteQuiz: (quizId: string) => void;
  editingQuiz?: QuizQuestion | null;
  customQuizzes: QuizQuestion[];
  onImportQuizzes: (quizzes: QuizQuestion[]) => void;
  ownerEmail: string;
  speechRate: number;
}

export const OwnerQuizModal: React.FC<OwnerQuizModalProps> = ({
  isOpen,
  onClose,
  onSaveQuiz,
  onDeleteQuiz,
  editingQuiz,
  customQuizzes,
  onImportQuizzes,
  ownerEmail,
  speechRate
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  // Form states
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');
  const [level, setLevel] = useState<number>(1);
  const [category, setCategory] = useState<string>('Từ vựng & Ngữ pháp');
  const [question, setQuestion] = useState<string>('');
  const [koreanContext, setKoreanContext] = useState<string>('');
  const [koreanWord, setKoreanWord] = useState<string>('');
  const [romanization, setRomanization] = useState<string>('');
  
  // Options for multiple-choice, fill-blank, flashcard-vi
  const [optionA, setOptionA] = useState<string>('');
  const [optionB, setOptionB] = useState<string>('');
  const [optionC, setOptionC] = useState<string>('');
  const [optionD, setOptionD] = useState<string>('');
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);

  // Match pairs state
  const [pairsText, setPairsText] = useState<string>(
    '사과 = Quả táo\n물 = Nước uống\n학교 = Trường học\n친구 = Bạn bè'
  );

  // Word order state
  const [wordOrderAnswer, setWordOrderAnswer] = useState<string>('저는 밥을 맛있게 먹어요.');

  // Common fields
  const [explanation, setExplanation] = useState<string>('');
  const [hint, setHint] = useState<string>('');
  const [exampleKr, setExampleKr] = useState<string>('');
  const [exampleVi, setExampleVi] = useState<string>('');

  const [formError, setFormError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [listSearch, setListSearch] = useState<string>('');

  // Populate if editing
  useEffect(() => {
    if (editingQuiz) {
      setQuizType(editingQuiz.type);
      setLevel(editingQuiz.level);
      setCategory(editingQuiz.category);
      setQuestion(editingQuiz.question);
      setKoreanContext(editingQuiz.koreanContext || '');
      setKoreanWord(editingQuiz.koreanWord || '');
      setRomanization(editingQuiz.romanization || '');

      if (editingQuiz.options && editingQuiz.options.length >= 2) {
        setOptionA(editingQuiz.options[0] || '');
        setOptionB(editingQuiz.options[1] || '');
        setOptionC(editingQuiz.options[2] || '');
        setOptionD(editingQuiz.options[3] || '');
        const correctStr = String(editingQuiz.correctAnswer);
        const idx = editingQuiz.options.indexOf(correctStr);
        setCorrectOptionIndex(idx >= 0 ? idx : 0);
      }

      if (editingQuiz.pairs) {
        setPairsText(editingQuiz.pairs.map(p => `${p.korean} = ${p.vietnamese}`).join('\n'));
      }

      if (editingQuiz.wordBlocks) {
        setWordOrderAnswer(
          Array.isArray(editingQuiz.correctAnswer)
            ? editingQuiz.correctAnswer.join(' ')
            : String(editingQuiz.correctAnswer)
        );
      }

      setExplanation(editingQuiz.explanation);
      setHint(editingQuiz.hint || '');
      setExampleKr(editingQuiz.exampleKr || '');
      setExampleVi(editingQuiz.exampleVi || '');
      setActiveTab('form');
    } else {
      resetForm();
    }
  }, [editingQuiz, isOpen]);

  const resetForm = () => {
    setQuizType('multiple-choice');
    setLevel(1);
    setCategory('Từ vựng & Ngữ pháp');
    setQuestion('');
    setKoreanContext('');
    setKoreanWord('');
    setRomanization('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOptionIndex(0);
    setPairsText('사과 = Quả táo\n물 = Nước uống\n학교 = Trường học\n친구 = Bạn bè');
    setWordOrderAnswer('저는 밥을 맛있게 먹어요.');
    setExplanation('');
    setHint('');
    setExampleKr('');
    setExampleVi('');
    setFormError('');
  };

  const handleTestPronounce = (text: string) => {
    playClickSound();
    if (!text.trim()) return;
    speakKorean(text.trim(), speechRate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!question.trim()) {
      setFormError('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    let finalOptions: string[] | undefined = undefined;
    let finalCorrectAnswer: string | string[] = '';
    let finalPairs: { korean: string; vietnamese: string }[] | undefined = undefined;
    let finalWordBlocks: string[] | undefined = undefined;

    if (quizType === 'multiple-choice' || quizType === 'fill-blank' || quizType === 'flashcard-vi') {
      const opts = [optionA.trim(), optionB.trim(), optionC.trim(), optionD.trim()].filter(Boolean);
      if (opts.length < 2) {
        setFormError('Vui lòng nhập ít nhất 2 phương án trả lời!');
        return;
      }
      finalOptions = opts;
      finalCorrectAnswer = opts[correctOptionIndex] || opts[0];
    } else if (quizType === 'match-pairs') {
      const lines = pairsText.split('\n').map(l => l.trim()).filter(Boolean);
      const parsedPairs = lines.map(line => {
        const parts = line.split(/[=-]/).map(p => p.trim());
        return { korean: parts[0] || '', vietnamese: parts[1] || '' };
      }).filter(p => p.korean && p.vietnamese);

      if (parsedPairs.length < 2) {
        setFormError('Vui lòng nhập ít nhất 2 cặp từ (dạng: từ Hàn = nghĩa Việt)!');
        return;
      }
      finalPairs = parsedPairs;
      finalCorrectAnswer = 'matched';
    } else if (quizType === 'word-order') {
      const tokens = wordOrderAnswer.trim().split(/\s+/).filter(Boolean);
      if (tokens.length < 2) {
        setFormError('Vui lòng nhập câu có ít nhất 2 từ để học viên sắp xếp trật tự!');
        return;
      }
      finalCorrectAnswer = tokens;
      finalWordBlocks = [...tokens].sort(() => 0.5 - Math.random());
    }

    const newQuiz: QuizQuestion = {
      id: editingQuiz ? editingQuiz.id : `owner-quiz-${Date.now()}`,
      type: quizType,
      level,
      category: category.trim() || 'Bài tập tổng hợp',
      question: question.trim(),
      koreanContext: koreanContext.trim() || undefined,
      koreanWord: koreanWord.trim() || undefined,
      romanization: romanization.trim() || undefined,
      options: finalOptions,
      correctAnswer: finalCorrectAnswer,
      explanation: explanation.trim() || 'Hãy ghi nhớ cấu trúc và từ vựng này để áp dụng vào thực tế.',
      hint: hint.trim() || undefined,
      pairs: finalPairs,
      wordBlocks: finalWordBlocks,
      exampleKr: exampleKr.trim() || undefined,
      exampleVi: exampleVi.trim() || undefined,
      isCustom: true,
      createdBy: ownerEmail,
      createdAt: editingQuiz?.createdAt || new Date().toISOString()
    };

    onSaveQuiz(newQuiz);
    playCorrectSound();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });

    setSuccessMessage(editingQuiz ? 'Đã cập nhật câu hỏi quiz thành công!' : 'Đã thêm câu hỏi quiz mới vào ngân hàng đề!');
    setTimeout(() => {
      setSuccessMessage('');
      if (!editingQuiz) {
        resetForm();
      } else {
        onClose();
      }
    }, 1200);
  };

  const handleExportJSON = () => {
    playClickSound();
    if (customQuizzes.length === 0) {
      alert('Bạn chưa tạo câu hỏi quiz nào để xuất!');
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customQuizzes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `hanu_quizzes_owner_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(q => q.question && q.type).map(q => ({
            ...q,
            id: q.id || `owner-quiz-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            isCustom: true,
            createdBy: q.createdBy || ownerEmail,
            createdAt: q.createdAt || new Date().toISOString()
          }));

          if (valid.length > 0) {
            onImportQuizzes(valid);
            playCorrectSound();
            confetti({ particleCount: 50, spread: 70 });
            alert(`Đã nhập thành công ${valid.length} câu hỏi quiz mới!`);
          } else {
            alert('File JSON không chứa câu hỏi quiz hợp lệ.');
          }
        } else {
          alert('Định dạng file không đúng: phải là danh sách mảng JSON câu hỏi.');
        }
      } catch (err) {
        alert('Lỗi đọc file JSON: ' + (err instanceof Error ? err.message : 'Dữ liệu không hợp lệ'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isOpen) return null;

  const filteredList = customQuizzes.filter(q => {
    const s = listSearch.toLowerCase().trim();
    if (!s) return true;
    return (
      q.question.toLowerCase().includes(s) ||
      q.category.toLowerCase().includes(s) ||
      (q.koreanWord && q.koreanWord.toLowerCase().includes(s))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-white/20 shadow-xs flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-emerald-200" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Thêm & Quản Lý Quiz
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            {editingQuiz ? '✏️ Chỉnh Sửa Câu Hỏi Quiz' : '➕ Tạo Câu Hỏi Bài Tập / Quiz Mới'}
          </h3>
          <p className="text-xs text-white/90 mt-1">
            Hỗ trợ 5 định dạng bài tập: Trắc nghiệm, Điền từ, Flashcard, Nối cặp từ & Ghép câu hoàn chỉnh.
          </p>
        </div>

        {/* Tab switchers: Form vs Custom Quizzes list */}
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
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingQuiz ? 'Sửa câu hỏi' : 'Tạo câu hỏi mới'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setActiveTab('list');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Quiz bạn đã tạo ({customQuizzes.length})</span>
            </button>
          </div>

          {/* Export/Import actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExportJSON}
              disabled={customQuizzes.length === 0}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Xuất file câu hỏi JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất</span>
            </button>

            <label
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Nhập câu hỏi từ file JSON"
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

            {/* Row 1: Quiz Type & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Dạng bài tập <span className="text-rose-500">*</span>
                </label>
                <select
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value as QuizType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs font-bold text-stone-800 transition-all cursor-pointer"
                >
                  <option value="multiple-choice">🎯 Trắc nghiệm 4 đáp án (Multiple Choice)</option>
                  <option value="fill-blank">✍️ Điền từ vào chỗ trống (Fill in the blank)</option>
                  <option value="flashcard-vi">🎴 Thẻ Flashcard (Nhìn từ Hàn chọn nghĩa Việt)</option>
                  <option value="match-pairs">🔗 Nối cặp từ tương ứng (Match Pairs)</option>
                  <option value="word-order">🧩 Sắp xếp trật tự từ thành câu (Word Order)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Cấp độ áp dụng
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs font-bold text-stone-800 transition-all cursor-pointer"
                >
                  <option value={1}>Cấp 1 - Sơ cấp 1</option>
                  <option value={2}>Cấp 2 - Sơ cấp 2</option>
                  <option value={3}>Cấp 3 - Trung cấp 1</option>
                  <option value={4}>Cấp 4 - Trung cấp 2</option>
                  <option value={5}>Cấp 5 - Cao cấp 1</option>
                  <option value={6}>Cấp 6 - Cao cấp 2</option>
                </select>
              </div>
            </div>

            {/* Row 2: Question & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Câu hỏi / Yêu cầu đề bài <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Từ '물' trong tiếng Hàn có nghĩa là gì?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-medium text-xs sm:text-sm text-stone-900 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  Chủ đề bài tập
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Từ vựng cơ bản, Ngữ pháp..."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs text-stone-800 transition-all"
                />
              </div>
            </div>

            {/* Dynamic Section: Multiple-choice & Fill-blank */}
            {(quizType === 'multiple-choice' || quizType === 'fill-blank') && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                {quizType === 'fill-blank' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                      <span>Câu ngữ cảnh có chỗ trống:</span>
                      {koreanContext && (
                        <button
                          type="button"
                          onClick={() => handleTestPronounce(koreanContext.replace('___', ''))}
                          className="text-emerald-600 hover:text-emerald-700 text-[11px] inline-flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" /> Nghe thử
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 저는 사과___ 먹어요. (Tôi ăn táo)"
                      value={koreanContext}
                      onChange={(e) => setKoreanContext(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-korean text-xs sm:text-sm text-stone-900 transition-all"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-700 block">
                    4 Phương án trả lời (Tích chọn tròn ô là ĐÁP ÁN ĐÚNG):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {[
                      { val: optionA, set: setOptionA, label: 'A' },
                      { val: optionB, set: setOptionB, label: 'B' },
                      { val: optionC, set: setOptionC, label: 'C' },
                      { val: optionD, set: setOptionD, label: 'D' },
                    ].map((opt, idx) => (
                      <div
                        key={opt.label}
                        onClick={() => setCorrectOptionIndex(idx)}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                          correctOptionIndex === idx
                            ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-300'
                            : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          correctOptionIndex === idx ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {opt.label}
                        </span>
                        <input
                          type="text"
                          required
                          placeholder={`Lựa chọn ${opt.label}...`}
                          value={opt.val}
                          onChange={(e) => opt.set(e.target.value)}
                          className="w-full bg-transparent focus:outline-hidden text-xs font-semibold text-stone-900"
                        />
                        {correctOptionIndex === idx && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Section: Flashcard-VI */}
            {quizType === 'flashcard-vi' && (
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
                      <span>Từ tiếng Hàn hiển thị trên thẻ: <span className="text-rose-500">*</span></span>
                      {koreanWord && (
                        <button
                          type="button"
                          onClick={() => handleTestPronounce(koreanWord)}
                          className="text-emerald-600 hover:text-emerald-700 text-[11px] inline-flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" /> Nghe thử
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 행복하다, 친구, 학교..."
                      value={koreanWord}
                      onChange={(e) => setKoreanWord(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-korean font-bold text-base text-stone-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">
                      Phiên âm Romanization:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: haeng-bok-ha-da, chin-gu..."
                      value={romanization}
                      onChange={(e) => setRomanization(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-mono text-xs text-stone-800 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-700 block">
                    4 Lựa chọn nghĩa tiếng Việt (Tích chọn ô là ĐÁP ÁN ĐÚNG):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {[
                      { val: optionA, set: setOptionA, label: 'A' },
                      { val: optionB, set: setOptionB, label: 'B' },
                      { val: optionC, set: setOptionC, label: 'C' },
                      { val: optionD, set: setOptionD, label: 'D' },
                    ].map((opt, idx) => (
                      <div
                        key={opt.label}
                        onClick={() => setCorrectOptionIndex(idx)}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                          correctOptionIndex === idx
                            ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-300'
                            : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          correctOptionIndex === idx ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {opt.label}
                        </span>
                        <input
                          type="text"
                          required
                          placeholder={`Nghĩa ${opt.label}...`}
                          value={opt.val}
                          onChange={(e) => opt.set(e.target.value)}
                          className="w-full bg-transparent focus:outline-hidden text-xs font-semibold text-stone-900"
                        />
                        {correctOptionIndex === idx && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Section: Match Pairs */}
            {quizType === 'match-pairs' && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-700 block">
                  Nhập các cặp từ (mỗi dòng một cặp dạng: <span className="font-mono text-emerald-700">từ Hàn = nghĩa Việt</span>):
                </label>
                <textarea
                  rows={4}
                  value={pairsText}
                  onChange={(e) => setPairsText(e.target.value)}
                  placeholder="지하철 = Tàu điện ngầm&#10;병원 = Bệnh viện&#10;도서관 = Thư viện&#10;약국 = Hiệu thuốc"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-mono text-xs text-stone-800 transition-all leading-relaxed"
                />
                <p className="text-[11px] text-stone-400">
                  Hệ thống sẽ tự động xáo trộn ngẫu nhiên vị trí các cặp để học viên luyện nối từ.
                </p>
              </div>
            )}

            {/* Dynamic Section: Word Order */}
            {quizType === 'word-order' && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-bold text-stone-700 block">
                  Câu hoàn chỉnh chuẩn theo trật tự (các từ cách nhau bằng dấu cách):
                </label>
                <input
                  type="text"
                  value={wordOrderAnswer}
                  onChange={(e) => setWordOrderAnswer(e.target.value)}
                  placeholder="Ví dụ: 저는 아침에 밥을 먹어요."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden font-korean font-bold text-sm text-stone-900 transition-all"
                />
                <p className="text-[11px] text-stone-400">
                  Các từ sẽ được xáo trộn thành các khối bấm để người học ghép lại theo đúng thứ tự câu.
                </p>
              </div>
            )}

            {/* Common: Explanation & Hint */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Lời giải thích chi tiết:
                  </label>
                  <input
                    type="text"
                    placeholder="Giải thích vì sao đáp án đúng..."
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs text-stone-800 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Gợi ý / Mẹo làm bài (Hint):
                  </label>
                  <input
                    type="text"
                    placeholder="Gợi ý mẹo nhớ cho học viên..."
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-xs text-stone-800 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
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
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{editingQuiz ? 'Lưu cập nhật câu hỏi' : 'Lưu câu hỏi mới'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Manage list of custom quizzes */}
        {activeTab === 'list' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm câu hỏi quiz bạn đã tạo..."
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:bg-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  resetForm();
                  setActiveTab('form');
                }}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tạo câu hỏi mới</span>
              </button>
            </div>

            {filteredList.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-stone-200 rounded-2xl p-6">
                <HelpCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-600 font-semibold">
                  {customQuizzes.length === 0
                    ? 'Bạn chưa tạo câu hỏi quiz nào. Hãy bấm "Tạo câu hỏi mới" để thêm câu hỏi vào ngân hàng đề thi!'
                    : 'Không tìm thấy câu hỏi quiz nào khớp với từ khóa tìm kiếm.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredList.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-stone-50/50 hover:bg-white transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {q.type === 'multiple-choice' ? '🎯 Trắc nghiệm' :
                           q.type === 'fill-blank' ? '✍️ Điền từ' :
                           q.type === 'flashcard-vi' ? '🎴 Flashcard' :
                           q.type === 'match-pairs' ? '🔗 Nối từ' : '🧩 Ghép câu'}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                          Cấp {q.level}
                        </span>
                        <span className="text-[10px] font-medium text-stone-500">
                          {q.category}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-stone-900 mt-1 truncate">
                        {q.question}
                      </div>

                      {q.koreanWord && (
                        <div className="text-xs font-korean font-semibold text-pink-600 mt-0.5">
                          {q.koreanWord} {q.romanization && `[${q.romanization}]`}
                        </div>
                      )}

                      <div className="text-[11px] text-emerald-700 mt-0.5 truncate">
                        Đáp án đúng: <strong>{Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : String(q.correctAnswer)}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setQuizType(q.type);
                          setLevel(q.level);
                          setCategory(q.category);
                          setQuestion(q.question);
                          setKoreanContext(q.koreanContext || '');
                          setKoreanWord(q.koreanWord || '');
                          setRomanization(q.romanization || '');
                          if (q.options) {
                            setOptionA(q.options[0] || '');
                            setOptionB(q.options[1] || '');
                            setOptionC(q.options[2] || '');
                            setOptionD(q.options[3] || '');
                            const idx = q.options.indexOf(String(q.correctAnswer));
                            setCorrectOptionIndex(idx >= 0 ? idx : 0);
                          }
                          setExplanation(q.explanation);
                          setHint(q.hint || '');
                          setActiveTab('form');
                        }}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        title="Sửa câu hỏi này"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          if (window.confirm(`Bạn có chắc muốn xóa câu hỏi "${q.question}" không?`)) {
                            onDeleteQuiz(q.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                        title="Xóa câu hỏi này"
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
