import { VocabWord } from '../types';

export const VOCAB_CATEGORIES = [
  'Tất cả',
  'Chào hỏi & Giao tiếp',
  'Gia đình & Bản thân',
  'Ẩm thực & Nhà hàng',
  'Mua sắm & Tiền tệ',
  'Thời gian & Thời tiết',
  'Giao thông & Du lịch',
  'Trường học & Công sở',
  'Cảm xúc & Tính từ'
];

export const VOCAB_WORDS: VocabWord[] = [
  // LEVEL 1 (Sơ cấp 1)
  {
    id: 'v1-1',
    korean: '안녕하세요',
    vietnamese: 'Xin chào',
    romanization: 'an-nyeong-ha-se-yo',
    level: 1,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '안녕하세요! 저는 민수예요.',
    exampleVi: 'Xin chào! Tôi là Min-soo.'
  },
  {
    id: 'v1-2',
    korean: '감사합니다',
    vietnamese: 'Cảm ơn',
    romanization: 'gam-sa-ham-ni-da',
    hanja: '感謝합니다',
    level: 1,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '도와주셔서 감사합니다.',
    exampleVi: 'Cảm ơn bạn đã giúp đỡ tôi.'
  },
  {
    id: 'v1-3',
    korean: '죄송합니다',
    vietnamese: 'Xin lỗi',
    romanization: 'joe-song-ham-ni-da',
    hanja: '罪悚합니다',
    level: 1,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '늦어서 죄송합니다.',
    exampleVi: 'Tôi xin lỗi vì đã đến muộn.'
  },
  {
    id: 'v1-4',
    korean: '이름',
    vietnamese: 'Tên',
    romanization: 'i-reum',
    level: 1,
    category: 'Gia đình & Bản thân',
    exampleKr: '이름이 무엇입니까?',
    exampleVi: 'Tên của bạn là gì?'
  },
  {
    id: 'v1-5',
    korean: '친구',
    vietnamese: 'Bạn bè',
    romanization: 'chin-gu',
    hanja: '親舊',
    level: 1,
    category: 'Gia đình & Bản thân',
    exampleKr: '제 친구는 한국 사람이에요.',
    exampleVi: 'Bạn của tôi là người Hàn Quốc.'
  },
  {
    id: 'v1-6',
    korean: '물',
    vietnamese: 'Nước uống',
    romanization: 'mul',
    level: 1,
    category: 'Ẩm thực & Nhà hàng',
    exampleKr: '물 좀 주세요.',
    exampleVi: 'Làm ơn cho tôi xin một ít nước.'
  },
  {
    id: 'v1-7',
    korean: '밥',
    vietnamese: 'Cơm / Bữa ăn',
    romanization: 'bap',
    level: 1,
    category: 'Ẩm thực & Nhà hàng',
    exampleKr: '밥을 맛있게 먹었어요.',
    exampleVi: 'Tôi đã ăn cơm rất ngon miệng.'
  },
  {
    id: 'v1-8',
    korean: '얼마예요?',
    vietnamese: 'Bao nhiêu tiền vậy ạ?',
    romanization: 'eol-ma-ye-yo',
    level: 1,
    category: 'Mua sắm & Tiền tệ',
    exampleKr: '이 사과 얼마예요?',
    exampleVi: 'Quả táo này giá bao nhiêu tiền vậy ạ?'
  },
  {
    id: 'v1-9',
    korean: '오늘',
    vietnamese: 'Hôm nay',
    romanization: 'o-neul',
    level: 1,
    category: 'Thời gian & Thời tiết',
    exampleKr: '오늘 날씨가 정말 좋아요.',
    exampleVi: 'Hôm nay thời tiết thật là đẹp.'
  },
  {
    id: 'v1-10',
    korean: '학교',
    vietnamese: 'Trường học',
    romanization: 'hak-gyo',
    hanja: '學校',
    level: 1,
    category: 'Trường học & Công sở',
    exampleKr: '저는 매일 학교에 가요.',
    exampleVi: 'Tôi đến trường mỗi ngày.'
  },

  // LEVEL 2 (Sơ cấp 2)
  {
    id: 'v2-1',
    korean: '지하철',
    vietnamese: 'Tàu điện ngầm',
    romanization: 'ji-ha-cheol',
    hanja: '地下鐵',
    level: 2,
    category: 'Giao thông & Du lịch',
    exampleKr: '지하철 2호선을 타세요.',
    exampleVi: 'Hãy đi tuyến tàu điện ngầm số 2 nhé.'
  },
  {
    id: 'v2-2',
    korean: '예약하다',
    vietnamese: 'Đặt trước / Đặt chỗ',
    romanization: 'ye-yak-ha-da',
    hanja: '豫約하다',
    level: 2,
    category: 'Giao thông & Du lịch',
    exampleKr: '식당에 자리를 예약했어요.',
    exampleVi: 'Tôi đã đặt bàn ở nhà hàng rồi.'
  },
  {
    id: 'v2-3',
    korean: '행복하다',
    vietnamese: 'Hạnh phúc',
    romanization: 'haeng-bok-ha-da',
    hanja: '幸福하다',
    level: 2,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '가족과 함께 있어서 행복해요.',
    exampleVi: 'Tôi thấy thật hạnh phúc khi ở bên gia đình.'
  },
  {
    id: 'v2-4',
    korean: '취미',
    vietnamese: 'Sở thích',
    romanization: 'chwi-mi',
    hanja: '趣味',
    level: 2,
    category: 'Gia đình & Bản thân',
    exampleKr: '제 취미는 한국 음악 듣기예요.',
    exampleVi: 'Sở thích của tôi là nghe nhạc Hàn Quốc.'
  },
  {
    id: 'v2-5',
    korean: '선물',
    vietnamese: 'Món quà / Quà tặng',
    romanization: 'seon-mul',
    hanja: '膳物',
    level: 2,
    category: 'Mua sắm & Tiền tệ',
    exampleKr: '생일 선물을 샀어요.',
    exampleVi: 'Tôi đã mua một món quà sinh nhật.'
  },

  // LEVEL 3 (Trung cấp 1)
  {
    id: 'v3-1',
    korean: '회의',
    vietnamese: 'Cuộc họp',
    romanization: 'hoe-ui',
    hanja: '會議',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '내일 아침 10시에 회의가 있습니다.',
    exampleVi: 'Sáng mai lúc 10 giờ có cuộc họp.'
  },
  {
    id: 'v3-2',
    korean: '경험',
    vietnamese: 'Kinh nghiệm / Trải nghiệm',
    romanization: 'gyeong-heom',
    hanja: '經驗',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '한국 유학은 좋은 경험이었습니다.',
    exampleVi: 'Du học Hàn Quốc đã là một trải nghiệm tuyệt vời.'
  },
  {
    id: 'v3-3',
    korean: '성격',
    vietnamese: 'Tính cách',
    romanization: 'seong-gyeok',
    hanja: '性格',
    level: 3,
    category: 'Gia đình & Bản thân',
    exampleKr: '그 친구는 성격이 아주 활발해요.',
    exampleVi: 'Người bạn đó tính tình rất hoạt bát năng động.'
  },
  {
    id: 'v3-4',
    korean: '설명하다',
    vietnamese: 'Giải thích',
    romanization: 'seol-myeong-ha-da',
    hanja: '說明하다',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '선생님께서 문법을 쉽게 설명해 주셨어요.',
    exampleVi: 'Thầy giáo đã giải thích ngữ pháp rất dễ hiểu.'
  },

  // LEVEL 4 (Trung cấp 2)
  {
    id: 'v4-1',
    korean: '발전하다',
    vietnamese: 'Phát triển',
    romanization: 'bal-jeon-ha-da',
    hanja: '發展하다',
    level: 4,
    category: 'Trường học & Công sở',
    exampleKr: '한국의 IT 기술은 빠르게 발전하고 있다.',
    exampleVi: 'Công nghệ IT của Hàn Quốc đang phát triển nhanh chóng.'
  },
  {
    id: 'v4-2',
    korean: '환경보호',
    vietnamese: 'Bảo vệ môi trường',
    romanization: 'hwan-gyeong-bo-ho',
    hanja: '環境保護',
    level: 4,
    category: 'Thời gian & Thời tiết',
    exampleKr: '지구 온난화를 막기 위해 환경보호가 중요하다.',
    exampleVi: 'Để ngăn chặn hiện tượng nóng lên toàn cầu, bảo vệ môi trường là rất quan trọng.'
  },
  {
    id: 'v4-3',
    korean: '영향을 미치다',
    vietnamese: 'Gây ảnh hưởng đến',
    romanization: 'yeong-hyang-eul mi-chi-da',
    hanja: '影響을 미치다',
    level: 4,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '부모의 독서 습관은 자녀에게 큰 영향을 미친다.',
    exampleVi: 'Thói quen đọc sách của cha mẹ ảnh hưởng rất lớn đến con cái.'
  },

  // LEVEL 5 (Cao cấp 1)
  {
    id: 'v5-1',
    korean: '경제성장률',
    vietnamese: 'Tỉ lệ tăng trưởng kinh tế',
    romanization: 'gyeong-je-seong-jang-nyul',
    hanja: '經濟成長率',
    level: 5,
    category: 'Trường học & Công sở',
    exampleKr: '올해 경제성장률은 예상치를 웃돌았다.',
    exampleVi: 'Tỉ lệ tăng trưởng kinh tế năm nay đã vượt mức dự báo.'
  },
  {
    id: 'v5-2',
    korean: '인공지능',
    vietnamese: 'Trí tuệ nhân tạo (AI)',
    romanization: 'in-gong-ji-neung',
    hanja: '人工知能',
    level: 5,
    category: 'Trường học & Công sở',
    exampleKr: '인공지능 기술의 발전이 노동 시장에 큰 변화를 가져왔다.',
    exampleVi: 'Sự phát triển của trí tuệ nhân tạo đã mang lại thay đổi lớn cho thị trường lao động.'
  },
  {
    id: 'v5-3',
    korean: '일석이조',
    vietnamese: 'Một mũi tên trúng hai đích (Nhất thạch nhị điểu)',
    romanization: 'il-seok-i-jo',
    hanja: '一石二鳥',
    level: 5,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '운동도 하고 스트레스도 푸니 일석이조다.',
    exampleVi: 'Vừa được tập thể dục lại vừa giải tỏa căng thẳng quả là một mũi tên trúng hai đích.'
  },

  // LEVEL 6 (Cao cấp 2)
  {
    id: 'v6-1',
    korean: '심사숙고하다',
    vietnamese: 'Cân nhắc kỹ lưỡng / Suy đi tính lại',
    romanization: 'sim-sa-suk-go-ha-da',
    hanja: '深思熟考하다',
    level: 6,
    category: 'Trường học & Công sở',
    exampleKr: '중대한 결정을 내리기 전에 심사숙고해야 한다.',
    exampleVi: 'Trước khi đưa ra quyết định trọng đại cần phải suy xét thật kỹ lưỡng.'
  },
  {
    id: 'v6-2',
    korean: '유비무환',
    vietnamese: 'Có chuẩn bị thì không lo hoạn nạn (Hữu bị vô hoạn)',
    romanization: 'yu-bi-mu-hwan',
    hanja: '有備無患',
    level: 6,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '미리 대비책을 세우는 것은 유비무환의 자세이다.',
    exampleVi: 'Lập kế hoạch phòng ngừa trước chính là thái độ "hữu bị vô hoạn".'
  }
];
