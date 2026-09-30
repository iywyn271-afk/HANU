import { QuizQuestion, AchievementBadge } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. TRẮC NGHIỆM (Multiple Choice)
  {
    id: 'q-mc-1',
    type: 'multiple-choice',
    level: 1,
    category: 'Từ vựng cơ bản',
    question: 'Từ "물" trong tiếng Hàn có nghĩa là gì?',
    options: ['Cơm', 'Nước uống', 'Quả táo', 'Bánh mì'],
    correctAnswer: 'Nước uống',
    explanation: '"물" (mul) có nghĩa là nước uống. Ví dụ: 물 좀 주세요 (Làm ơn cho tôi xin chút nước).',
    hint: 'Chất lỏng không màu không mùi cần thiết cho sự sống mỗi ngày.'
  },
  {
    id: 'q-mc-2',
    type: 'multiple-choice',
    level: 1,
    category: 'Ngữ pháp sơ cấp',
    question: 'Chọn trợ từ chủ ngữ thích hợp điền vào câu: "저___ 베트남 사람이에요."',
    options: ['는', '은', '을', '를'],
    correctAnswer: '는',
    explanation: 'Vì "저" (tôi) không có patchim (phụ âm cuối), nên ta dùng trợ từ chủ ngữ "는" (저는 = tôi là).',
    hint: 'Danh từ "저" kết thúc bằng nguyên âm, không có patchim.'
  },
  {
    id: 'q-mc-3',
    type: 'multiple-choice',
    level: 1,
    category: 'Giao tiếp hàng ngày',
    question: 'Khi nhận được sự giúp đỡ của ai đó, bạn nói câu nào để cảm ơn?',
    options: ['죄송합니다', '감사합니다', '안녕하세요', '안녕히 계세요'],
    correctAnswer: '감사합니다',
    explanation: '"감사합니다" (gam-sa-ham-ni-da) nghĩa là Cảm ơn. "죄송합니다" là Xin lỗi, "안녕하세요" là Xin chào.',
    hint: 'Xuất phát từ gốc chữ Hán "Cảm tạ" (感謝).'
  },
  {
    id: 'q-mc-4',
    type: 'multiple-choice',
    level: 2,
    category: 'Ngữ pháp thì quá khứ',
    question: 'Dạng quá khứ của động từ "가다" (đi) là gì?',
    options: ['가요', '갈 거예요', '갔어요', '가고 있어요'],
    correctAnswer: '갔어요',
    explanation: 'Gốc từ "가-" có nguyên âm "ㅏ" nên kết hợp với "-았어요" tạo thành "갔어요" (đã đi).',
    hint: 'Nguyên âm "ㅏ" đi với đuôi thì quá khứ "-았어요".'
  },
  {
    id: 'q-mc-5',
    type: 'multiple-choice',
    level: 2,
    category: 'Ngữ pháp khả năng',
    question: 'Câu "Tôi có thể nói tiếng Hàn" trong tiếng Hàn là:',
    options: [
      '저는 한국어를 말해요.',
      '저는 한국어를 말할 수 있어요.',
      '저는 한국어를 말하지 않아요.',
      '저는 한국어를 말했어요.'
    ],
    correctAnswer: '저는 한국어를 말할 수 있어요.',
    explanation: 'Cấu trúc biểu thị khả năng làm gì là ~(으)ㄹ 수 있다. 말하다 + ㄹ 수 있어요 = 말할 수 있어요.',
    hint: 'Tìm cấu trúc kết thúc bằng "~(으)ㄹ 수 있어요".'
  },

  // 2. ĐIỀN TỪ (Fill in the blank)
  {
    id: 'q-fb-1',
    type: 'fill-blank',
    level: 1,
    category: 'Ngữ pháp tân ngữ',
    question: 'Điền trợ từ tân ngữ thích hợp vào chỗ trống:',
    koreanContext: '저는 사과___ 먹어요. (Tôi ăn táo.)',
    options: ['를', '을', '는', '에'],
    correctAnswer: '를',
    explanation: '"사과" (táo) là danh từ kết thúc bằng nguyên âm không có patchim, nên đi với trợ từ tân ngữ "를".',
    hint: '사과 kết thúc bằng chữ "과" (không có patchim ở chân chữ).'
  },
  {
    id: 'q-fb-2',
    type: 'fill-blank',
    level: 1,
    category: 'Đuôi câu danh từ',
    question: 'Điền đuôi câu thích hợp vào chỗ trống:',
    koreanContext: '민수 씨는 학생___? (Min-soo là học sinh phải không?)',
    options: ['이에요', '예요', '했어요', '갈게요'],
    correctAnswer: '이에요',
    explanation: '"학생" (học sinh) có patchim "ㅇ" nên kết hợp với đuôi câu "이에요".',
    hint: 'Danh từ có patchim ở cuối đi với "이에요".'
  },
  {
    id: 'q-fb-3',
    type: 'fill-blank',
    level: 2,
    category: 'Hỏi giá tiền',
    question: 'Điền từ còn thiếu khi hỏi giá món đồ:',
    koreanContext: '이 가방 ___예요? (Chiếc túi xách này bao nhiêu tiền vậy?)',
    options: ['얼마', '누구', '어디', '무슨'],
    correctAnswer: '얼마',
    explanation: '"얼마" dùng để hỏi về số lượng hoặc giá tiền (얼마예요? = Bao nhiêu tiền vậy?).',
    hint: 'Từ để hỏi giá tiền trong tiếng Hàn bắt đầu bằng âm "eol-".'
  },

  // 3. GHÉP TỪ (Match Pairs)
  {
    id: 'q-mp-1',
    type: 'match-pairs',
    level: 1,
    category: 'Từ vựng đối thoại cơ bản',
    question: 'Nối các cặp từ tiếng Hàn với nghĩa tiếng Việt tương ứng:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '친구', vietnamese: 'Bạn bè' },
      { korean: '학교', vietnamese: 'Trường học' },
      { korean: '선생님', vietnamese: 'Giáo viên' },
      { korean: '가족', vietnamese: 'Gia đình' }
    ],
    explanation: '친구: bạn bè, 학교: trường học, 선생님: thầy cô giáo, 가족: gia đình.'
  },
  {
    id: 'q-mp-2',
    type: 'match-pairs',
    level: 2,
    category: 'Địa điểm & Đồ dùng',
    question: 'Nối từ tiếng Hàn với nghĩa tiếng Việt chuẩn xác:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '지하철', vietnamese: 'Tàu điện ngầm' },
      { korean: '식당', vietnamese: 'Nhà hàng' },
      { korean: '도서관', vietnamese: 'Thư viện' },
      { korean: '병원', vietnamese: 'Bệnh viện' }
    ],
    explanation: '지하철: tàu điện ngầm, 식당: nhà hàng ăn uống, 도서관: thư viện, 병원: bệnh viện.'
  },

  // 4. GHÉP CÂU HOÀN CHỈNH (Word Order)
  {
    id: 'q-wo-1',
    type: 'word-order',
    level: 1,
    category: 'Cấu trúc câu tiếng Hàn',
    question: 'Sắp xếp các từ theo trật tự câu đúng: "Tôi ăn cơm vào buổi sáng"',
    correctAnswer: ['저는', '아침에', '밥을', '먹어요.'],
    wordBlocks: ['먹어요.', '저는', '밥을', '아침에'],
    explanation: 'Cấu trúc câu tiếng Hàn: Chủ ngữ (저는) + Thời gian (아침에) + Tân ngữ (밥을) + Động từ (먹어요).'
  },
  {
    id: 'q-wo-2',
    type: 'word-order',
    level: 1,
    category: 'Giao tiếp giới thiệu',
    question: 'Sắp xếp các từ thành câu hoàn chỉnh: "Rất vui được gặp bạn!"',
    correctAnswer: ['만나서', '정말', '반가워요!'],
    wordBlocks: ['반가워요!', '만나서', '정말'],
    explanation: '만나서 (gặp gỡ) + 정말 (thật sự) + 반가워요 (vui mừng)! = Rất vui được gặp bạn!'
  },

  // 5. THẺ FLASHCARD (Korean ➔ Vietnamese Answer)
  {
    id: 'q-fc-1',
    type: 'flashcard-vi',
    level: 1,
    category: 'Giao tiếp cơ bản',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '안녕하세요',
    romanization: 'an-nyeong-ha-se-yo',
    options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
    explanation: '"안녕하세요" là lời chào chuẩn mực, lịch sự thông dụng nhất trong tiếng Hàn.',
    hint: 'Câu chào cửa miệng khi gặp mặt mọi người vào bất kỳ thời điểm nào.',
    exampleKr: '안녕하세요! 저는 베트남 사람이에요.',
    exampleVi: 'Xin chào! Tôi là người Việt Nam.'
  },
  {
    id: 'q-fc-2',
    type: 'flashcard-vi',
    level: 1,
    category: 'Giao tiếp cơ bản',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '감사합니다',
    romanization: 'gam-sa-ham-ni-da',
    options: ['Cảm ơn', 'Xin chào', 'Không sao đâu', 'Hẹn gặp lại'],
    correctAnswer: 'Cảm ơn',
    explanation: '"감사합니다" (Gốc Hán: Cảm Tạ) là lời cảm ơn trang trọng và chân thành.',
    hint: 'Dùng khi muốn bày tỏ lòng biết ơn đối với người khác.',
    exampleKr: '도와주셔서 정말 감사합니다.',
    exampleVi: 'Thật sự cảm ơn bạn đã giúp đỡ tôi.'
  },
  {
    id: 'q-fc-3',
    type: 'flashcard-vi',
    level: 1,
    category: 'Nghề nghiệp & Danh xưng',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '선생님',
    romanization: 'seon-saeng-nim',
    options: ['Thầy cô giáo', 'Học sinh', 'Bác sĩ', 'Bạn bè'],
    correctAnswer: 'Thầy cô giáo',
    explanation: '"선생님" là từ kính cẩn dùng để gọi giáo viên, thầy cô hoặc người đi trước đáng kính.',
    hint: 'Gốc Hán "Tiên Sinh" kết hợp đuôi kính ngữ "-nim".',
    exampleKr: '선생님, 질문이 하나 있습니다.',
    exampleVi: 'Thưa thầy/cô, em có một câu hỏi ạ.'
  },
  {
    id: 'q-fc-4',
    type: 'flashcard-vi',
    level: 1,
    category: 'Đời sống & Gia đình',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '친구',
    romanization: 'chin-gu',
    options: ['Bạn bè', 'Gia đình', 'Đồng nghiệp', 'Người yêu'],
    correctAnswer: 'Bạn bè',
    explanation: '"친구" (Gốc Hán: Thân Cựu) có nghĩa là bạn bè, người trạc tuổi thân thiết.',
    hint: 'Người cùng học, cùng chơi, đồng trang lứa với bạn.',
    exampleKr: '주말에 친구를 만났어요.',
    exampleVi: 'Cuối tuần tôi đã đi gặp bạn bè.'
  },
  {
    id: 'q-fc-5',
    type: 'flashcard-vi',
    level: 2,
    category: 'Địa điểm & Nơi chốn',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '도서관',
    romanization: 'do-seo-gwan',
    options: ['Thư viện', 'Bệnh viện', 'Bảo tàng', 'Nhà hát'],
    correctAnswer: 'Thư viện',
    explanation: '"도서관" (Gốc Hán: Đồ Thư Quán) nghĩa là thư viện nơi đọc và mượn sách.',
    hint: 'Nơi yên tĩnh chứa rất nhiều sách để bạn học tập và nghiên cứu.',
    exampleKr: '저는 도서관에서 한국어를 공부해요.',
    exampleVi: 'Tôi học tiếng Hàn ở thư viện.'
  },
  {
    id: 'q-fc-6',
    type: 'flashcard-vi',
    level: 2,
    category: 'Cảm xúc & Tâm trạng',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '행복하다',
    romanization: 'haeng-bok-ha-da',
    options: ['Hạnh phúc', 'Buồn rầu', 'Lo lắng', 'Tức giận'],
    correctAnswer: 'Hạnh phúc',
    explanation: '"행복하다" (Gốc Hán: Hạnh Phúc) diễn tả trạng thái tràn đầy niềm vui và may mắn.',
    hint: 'Cảm giác mãn nguyện, vui vẻ viên mãn trong lòng.',
    exampleKr: '가족과 함께 있어서 정말 행복해요.',
    exampleVi: 'Được ở cùng gia đình tôi cảm thấy thật hạnh phúc.'
  },
  {
    id: 'q-fc-7',
    type: 'flashcard-vi',
    level: 2,
    category: 'Đời sống & Y tế',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '병원',
    romanization: 'byeong-won',
    options: ['Bệnh viện', 'Hiệu thuốc', 'Ngân hàng', 'Sân bay'],
    correctAnswer: 'Bệnh viện',
    explanation: '"병원" (Gốc Hán: Bệnh Viện) là nơi khám chữa bệnh và chăm sóc sức khỏe.',
    hint: 'Nơi có bác sĩ và y tá khám chữa bệnh khi bạn bị ốm.',
    exampleKr: '감기에 걸려서 병원에 다녀왔어요.',
    exampleVi: 'Tôi bị cảm lạnh nên đã đi bệnh viện về.'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-1',
    title: 'Khởi đầu Hangeul',
    description: 'Khám phá bảng chữ cái tiếng Hàn và cách ghép vần',
    icon: '🌱',
    unlocked: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'ach-2',
    title: 'Chiến thần Từ vựng',
    description: 'Học và đánh dấu nhớ ít nhất 5 từ vựng mới',
    icon: '📚',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach-3',
    title: 'Bậc thầy Ngữ pháp',
    description: 'Xem chi tiết 3 bài học ngữ pháp kèm ví dụ',
    icon: '🎓',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'ach-4',
    title: 'Thử thách Trắc nghiệm',
    description: 'Hoàn thành bài tập trắc nghiệm đạt trên 80 điểm',
    icon: '🏆',
    unlocked: false,
    progress: 0,
    maxProgress: 80
  },
  {
    id: 'ach-5',
    title: 'Luyện nghe & Phát âm',
    description: 'Nghe phát âm chuẩn ít nhất 10 lần trong ứng dụng',
    icon: '🎧',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Minh Anh (민아)', level: 'Cấp độ 3', xp: 1250, streak: 14, avatarBg: 'bg-pink-100 text-pink-700' },
  { rank: 2, name: 'Tuấn Kiệt (기열)', level: 'Cấp độ 2', xp: 980, streak: 9, avatarBg: 'bg-emerald-100 text-emerald-700' },
  { rank: 3, name: 'Hải Yến (해연)', level: 'Cấp độ 2', xp: 840, streak: 7, avatarBg: 'bg-amber-100 text-amber-700' },
  { rank: 4, name: 'Đức Huy (덕희)', level: 'Cấp độ 1', xp: 620, streak: 5, avatarBg: 'bg-sky-100 text-sky-700' },
  { rank: 5, name: 'Bạn (Người học mới)', level: 'Cấp độ 1', xp: 0, streak: 1, avatarBg: 'bg-rose-100 text-rose-700', isCurrentUser: true }
];
