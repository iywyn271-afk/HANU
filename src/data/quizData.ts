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
  {
    id: 'q-mc-6',
    type: 'multiple-choice',
    level: 3,
    category: 'Ngữ pháp gián tiếp',
    question: 'Chọn đuôi câu tường thuật gián tiếp dạng trần thuật hiện tại: "민수 씨가 한국에 ___고 했어요."',
    options: ['간', '간다', '가자', '가라'],
    correctAnswer: '간다',
    explanation: 'Với động từ không có patchim ở thì hiện tại, đuôi trần thuật gián tiếp là ~ㄴ다고 하다 (가다 -> 간다고 하다).',
    hint: '가다 kết hợp với đuôi ~ㄴ다고 하다.'
  },
  {
    id: 'q-mc-7',
    type: 'multiple-choice',
    level: 4,
    category: 'Ngữ pháp trung cấp',
    question: 'Điền liên từ biểu thị sự nhượng bộ: "비가 오___ 불구하고 행사를 계속 진행했다."',
    options: ['는 탓에', '에도', '는데도', '는 바람에'],
    correctAnswer: '에도',
    explanation: 'Cấu trúc ~(으)m에도 불구하고 biểu thị sự nhượng bộ "mặc dù... nhưng...".',
    hint: 'Cụm từ cố định: ~에도 불구하고.'
  },
  {
    id: 'q-mc-8',
    type: 'multiple-choice',
    level: 5,
    category: 'Thành ngữ 4 chữ',
    question: 'Thành ngữ nào diễn tả ý nghĩa "Khổ trước sướng sau, sau bao gian nan thì hạnh phúc sẽ đến"?',
    options: ['동문서답', '고진감래', '작심삼일', '일석이조'],
    correctAnswer: '고진감래',
    explanation: '"고진감래" (Khổ Tận Cam Lai) nghĩa là hết đắng cay thì vị ngọt ngào sẽ đến.',
    hint: 'Khổ tận - cam lai.'
  },
  {
    id: 'q-mc-9',
    type: 'multiple-choice',
    level: 6,
    category: 'Thành ngữ triết lý',
    question: 'Khi muốn khuyên ai đó "Hãy biết đặt mình vào vị trí của người khác để suy nghĩ", ta dùng thành ngữ nào?',
    options: ['역지사지', '유비무환', '군계일학', '자승자박'],
    correctAnswer: '역지사지',
    explanation: '"역지사지" (Dịch Địa Tư Chi) nghĩa là đổi vị trí để suy xét thấu đáo cho đối phương.',
    hint: 'Dịch địa (đổi chỗ) - tư chi (nghĩ về điều đó).'
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
  {
    id: 'q-mp-3',
    type: 'match-pairs',
    level: 3,
    category: 'Công sở & Hoạt động',
    question: 'Nối từ tiếng Hàn trung cấp với nghĩa tiếng Việt:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '면접', vietnamese: 'Phỏng vấn' },
      { korean: '합격하다', vietnamese: 'Trúng tuyển' },
      { korean: '상담', vietnamese: 'Tư vấn' },
      { korean: '축제', vietnamese: 'Lễ hội' }
    ],
    explanation: '면접: phỏng vấn, 합격하다: đỗ đạt/trúng tuyển, 상담: tư vấn, 축제: lễ hội.'
  },
  {
    id: 'q-mp-4',
    type: 'match-pairs',
    level: 4,
    category: 'Xã hội & Đời sống',
    question: 'Nối từ vựng xã hội tiếng Hàn với nghĩa tiếng Việt:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '환경보호', vietnamese: 'Bảo vệ môi trường' },
      { korean: '소비자', vietnamese: 'Người tiêu dùng' },
      { korean: '고령화', vietnamese: 'Già hóa dân số' },
      { korean: '대중교통', vietnamese: 'Giao thông công cộng' }
    ],
    explanation: '환경보호: bảo vệ môi trường, 소비자: người tiêu dùng, 고령화: già hóa dân số, 대중교통: giao thông công cộng.'
  },
  {
    id: 'q-mp-5',
    type: 'match-pairs',
    level: 5,
    category: 'Thành ngữ bốn chữ',
    question: 'Nối thành ngữ Hán - Hàn bốn chữ với nghĩa tương ứng:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '일석이조', vietnamese: 'Nhất cử lưỡng tiện' },
      { korean: '고진감래', vietnamese: 'Khổ tận cam lai' },
      { korean: '전화위복', vietnamese: 'Chuyển họa thành phúc' },
      { korean: '동문서답', vietnamese: 'Hỏi đông đáp tây' }
    ],
    explanation: '일석이조: một hòn đá trúng 2 con chim, 고진감래: hết khổ đến sướng, 전화위복: trong rủi có may, 동문서답: trả lời lạc đề.'
  },
  {
    id: 'q-mp-6',
    type: 'match-pairs',
    level: 6,
    category: 'Thành ngữ cao cấp',
    question: 'Nối các thành ngữ triết lý sâu sắc:',
    correctAnswer: 'matched',
    pairs: [
      { korean: '역지사지', vietnamese: 'Đổi chỗ suy nghĩ' },
      { korean: '유비무환', vietnamese: 'Có phòng ngừa thì không lo' },
      { korean: '작심삼일', vietnamese: 'Cả thèm chóng chán' },
      { korean: '군계일학', vietnamese: 'Hạc giữa đàn gà' }
    ],
    explanation: '역지사지: đặt mình vào vị trí người khác, 유비무환: hữu bị vô hoạn, 작심삼일: quyết tâm 3 ngày, 군계일학: xuất chúng giữa đám đông.'
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
  },
  // LEVEL 3 Flashcards
  {
    id: 'q-fc-8',
    type: 'flashcard-vi',
    level: 3,
    category: 'Trường học & Công sở',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '면접',
    romanization: 'myeon-jeop',
    options: ['Phỏng vấn xin việc', 'Họp công ty', 'Thực tập sinh', 'Báo cáo tài chính'],
    correctAnswer: 'Phỏng vấn xin việc',
    explanation: '"면접" (Gốc Hán: Diện Tiếp) là buổi phỏng vấn trực tiếp giữa nhà tuyển dụng và ứng viên.',
    hint: 'Buổi gặp mặt hỏi đáp để ứng tuyển công việc mới.',
    exampleKr: '내일 대기업 면접을 보러 가요.',
    exampleVi: 'Ngày mai tôi đi phỏng vấn xin việc ở tập đoàn lớn.'
  },
  {
    id: 'q-fc-9',
    type: 'flashcard-vi',
    level: 3,
    category: 'Xã hội & Đời sống',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '축제',
    romanization: 'chuk-je',
    options: ['Lễ hội', 'Hội nghị', 'Triển lãm', 'Kỳ nghỉ'],
    correctAnswer: 'Lễ hội',
    explanation: '"축제" (Gốc Hán: Chúc Tế) nghĩa là ngày hội, festival tưng bừng kỷ niệm một sự kiện.',
    hint: 'Sự kiện vui vẻ đông người như lễ hội hoa anh đào, lễ hội pháo hoa.',
    exampleKr: '봄에는 여의도 벚꽃 축제가 열립니다.',
    exampleVi: 'Vào mùa xuân lễ hội hoa anh đào Yeouido được tổ chức náo nhiệt.'
  },
  // LEVEL 4 Flashcards
  {
    id: 'q-fc-10',
    type: 'flashcard-vi',
    level: 4,
    category: 'Xã hội & Đời sống',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '환경보호',
    romanization: 'hwan-gyeong-bo-ho',
    options: ['Bảo vệ môi trường', 'Phát triển kinh tế', 'Khí hậu biến đổi', 'Tiết kiệm năng lượng'],
    correctAnswer: 'Bảo vệ môi trường',
    explanation: '"환경보호" (Gốc Hán: Hoàn Cảnh Bảo Hộ) là hành động gìn giữ và bảo vệ môi trường sinh thái.',
    hint: 'Hành động chống biến đổi khí hậu và phân loại rác thải.',
    exampleKr: '지구 온난화를 막기 위해 환경보호가 중요하다.',
    exampleVi: 'Để ngăn chặn nóng lên toàn cầu, bảo vệ môi trường là rất quan trọng.'
  },
  {
    id: 'q-fc-11',
    type: 'flashcard-vi',
    level: 4,
    category: 'Gia đình & Bản thân',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '대인관계',
    romanization: 'dae-in-gwan-gye',
    options: ['Quan hệ đối nhân xử thế', 'Quan hệ gia đình', 'Đồng nghiệp cùng phòng', 'Kỹ năng thuyết trình'],
    correctAnswer: 'Quan hệ đối nhân xử thế',
    explanation: '"대인관계" (Gốc Hán: Đối Nhân Quan Hệ) chỉ mối quan hệ giữa người với người trong xã hội.',
    hint: 'Mối quan hệ giao tiếp, ứng xử hài hòa với mọi người xung quanh.',
    exampleKr: '직장 생활에서는 원만한 대인관계가 필수적이다.',
    exampleVi: 'Trong cuộc sống công sở, mối quan hệ đối nhân xử thế hòa nhã là điều tất yếu.'
  },
  // LEVEL 5 Flashcards
  {
    id: 'q-fc-12',
    type: 'flashcard-vi',
    level: 5,
    category: 'Thành ngữ & Triết lý',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '고진감래',
    romanization: 'go-jin-gam-rae',
    options: ['Khổ tận cam lai (Hết khổ đến sướng)', 'Một mũi tên trúng hai đích', 'Trăm nghe không bằng một thấy', 'Hỏi một đằng trả lời một nẻo'],
    correctAnswer: 'Khổ tận cam lai (Hết khổ đến sướng)',
    explanation: '"고진감래" (Khổ Tận Cam Lai): Sau những tháng ngày cay đắng gian nan thì điều ngọt ngào tốt đẹp sẽ tới.',
    hint: 'Thành ngữ bốn chữ nói về quả ngọt sau chuỗi ngày vất vả nỗ lực.',
    exampleKr: '긴 고생 끝에 드디어 결실을 맺으니 고진감래다.',
    exampleVi: 'Sau bao gian khó cuối cùng đã gặt hái thành công, quả là khổ tận cam lai.'
  },
  {
    id: 'q-fc-13',
    type: 'flashcard-vi',
    level: 5,
    category: 'Thành ngữ & Triết lý',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '일석이조',
    romanization: 'il-seok-i-jo',
    options: ['Một mũi tên trúng hai đích', 'Khổ trước sướng sau', 'Quyết tâm ba ngày', 'Tương thân tương ái'],
    correctAnswer: 'Một mũi tên trúng hai đích',
    explanation: '"일석이조" (Nhất Thạch Nhị Điểu): Ném một hòn đá trúng hai con chim, làm một việc được hai lợi ích.',
    hint: 'Làm một việc đạt được hai mục đích tốt đẹp cùng lúc.',
    exampleKr: '운동도 하고 스트레스도 푸니 일석이조다.',
    exampleVi: 'Vừa rèn luyện thân thể lại vừa giải tỏa stress đúng là một công đôi việc.'
  },
  // LEVEL 6 Flashcards
  {
    id: 'q-fc-14',
    type: 'flashcard-vi',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '역지사지',
    romanization: 'yeok-ji-sa-ji',
    options: ['Đặt mình vào vị trí người khác để thấu hiểu', 'Có chuẩn bị thì không lo hoạn nạn', 'Thay da đổi thịt hoàn toàn', 'Trăm nghe không bằng một thấy'],
    correctAnswer: 'Đặt mình vào vị trí người khác để thấu hiểu',
    explanation: '"역지사지" (Dịch Địa Tư Chi): Đổi vị trí của mình sang đối phương để suy nghĩ và thấu hiểu lý do của họ.',
    hint: 'Đặt mình vào hoàn cảnh của người khác khi giải quyết mâu thuẫn.',
    exampleKr: '상대방의 입장에서 역지사지해보면 갈등을 쉽게 풀 수 있다.',
    exampleVi: 'Nếu biết đặt mình vào góc nhìn của đối phương để suy nghĩ, bất đồng sẽ được hóa giải dễ dàng.'
  },
  {
    id: 'q-fc-15',
    type: 'flashcard-vi',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    question: 'Xem thẻ từ tiếng Hàn và trả lời nghĩa tiếng Việt tương ứng:',
    koreanWord: '유비무환',
    romanization: 'yu-bi-mu-hwan',
    options: ['Có chuẩn bị trước thì không lo hoạn nạn', 'Ngọc lớn thành muộn', 'Nói một đằng làm một nẻo', 'Hạc giữa bầy gà'],
    correctAnswer: 'Có chuẩn bị trước thì không lo hoạn nạn',
    explanation: '"유비무환" (Hữu Bị Vô Hoạn): Chuẩn bị kỹ càng mọi phương án từ trước thì không bao giờ phải lo sợ tai họa bất ngờ.',
    hint: 'Lập kế hoạch phòng ngừa rủi ro chu đáo.',
    exampleKr: '미리 대비책을 세우는 것은 유비무환의 자세이다.',
    exampleVi: 'Lập kế hoạch phòng ngừa trước chính là thái độ hữu bị vô hoạn.'
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
