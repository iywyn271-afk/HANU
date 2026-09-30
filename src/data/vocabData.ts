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
  'Cảm xúc & Tính từ',
  'Xã hội & Đời sống',
  'Thành ngữ & Triết lý'
];

export const VOCAB_WORDS: VocabWord[] = [
  // ==========================================
  // LEVEL 1 (Sơ cấp 1 - TOPIK I)
  // ==========================================
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

  // ==========================================
  // LEVEL 2 (Sơ cấp 2 - TOPIK I)
  // ==========================================
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
  {
    id: 'v2-6',
    korean: '병원',
    vietnamese: 'Bệnh viện',
    romanization: 'byeong-won',
    hanja: '病院',
    level: 2,
    category: 'Xã hội & Đời sống',
    exampleKr: '감기에 걸려서 병원에 다녀왔어요.',
    exampleVi: 'Tôi bị cảm lạnh nên đã đi bệnh viện khám.'
  },
  {
    id: 'v2-7',
    korean: '약국',
    vietnamese: 'Hiệu thuốc',
    romanization: 'yak-guk',
    hanja: '藥局',
    level: 2,
    category: 'Xã hội & Đời sống',
    exampleKr: '약국에서 두통약을 샀습니다.',
    exampleVi: 'Tôi đã mua thuốc đau đầu ở hiệu thuốc.'
  },
  {
    id: 'v2-8',
    korean: '도서관',
    vietnamese: 'Thư viện',
    romanization: 'do-seo-gwan',
    hanja: '圖書館',
    level: 2,
    category: 'Trường học & Công sở',
    exampleKr: '주말에 도서관에서 책을 빌렸어요.',
    exampleVi: 'Cuối tuần tôi đã mượn sách ở thư viện.'
  },
  {
    id: 'v2-9',
    korean: '우체국',
    vietnamese: 'Bưu điện',
    romanization: 'u-che-guk',
    hanja: '郵遞局',
    level: 2,
    category: 'Xã hội & Đời sống',
    exampleKr: '고향에 소포를 보내려고 우체국에 갔어요.',
    exampleVi: 'Tôi đã đến bưu điện để gửi bưu phẩm về quê.'
  },
  {
    id: 'v2-10',
    korean: '공항',
    vietnamese: 'Sân bay',
    romanization: 'gong-hang',
    hanja: '空港',
    level: 2,
    category: 'Giao thông & Du lịch',
    exampleKr: '인천국제공항에 도착했습니다.',
    exampleVi: 'Tôi đã hạ cánh đến sân bay quốc tế Incheon.'
  },
  {
    id: 'v2-11',
    korean: '날씨',
    vietnamese: 'Thời tiết',
    romanization: 'nal-ssi',
    level: 2,
    category: 'Thời gian & Thời tiết',
    exampleKr: '내일 비가 올 것 같아요.',
    exampleVi: 'Dự báo thời tiết ngày mai có vẻ sẽ có mưa.'
  },
  {
    id: 'v2-12',
    korean: '계절',
    vietnamese: 'Mùa trong năm',
    romanization: 'gye-jeol',
    hanja: '季節',
    level: 2,
    category: 'Thời gian & Thời tiết',
    exampleKr: '한국은 사계절이 뚜렷해요.',
    exampleVi: 'Hàn Quốc có bốn mùa phân chia rất rõ rệt.'
  },
  {
    id: 'v2-13',
    korean: '환전하다',
    vietnamese: 'Đổi tiền ngoại tệ',
    romanization: 'hwan-jeon-ha-da',
    hanja: '換錢하다',
    level: 2,
    category: 'Mua sắm & Tiền tệ',
    exampleKr: '은행에서 베트남 동을 한국 원으로 환전했어요.',
    exampleVi: 'Tôi đã đổi tiền Việt Nam Đồng sang Won Hàn Quốc tại ngân hàng.'
  },
  {
    id: 'v2-14',
    korean: '주문하다',
    vietnamese: 'Gọi món / Đặt hàng',
    romanization: 'ju-mun-ha-da',
    hanja: '注文하다',
    level: 2,
    category: 'Ẩm thực & Nhà hàng',
    exampleKr: '여기 김치찌개 2인분 주문할게요.',
    exampleVi: 'Cho tôi gọi 2 suất canh kim chi ở đây nhé.'
  },
  {
    id: 'v2-15',
    korean: '소개하다',
    vietnamese: 'Giới thiệu',
    romanization: 'so-gae-ha-da',
    hanja: '紹介하다',
    level: 2,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '새로 온 직원을 소개해 드리겠습니다.',
    exampleVi: 'Tôi xin phép được giới thiệu nhân viên mới đến.'
  },

  // ==========================================
  // LEVEL 3 (Trung cấp 1 - TOPIK II)
  // ==========================================
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
  {
    id: 'v3-5',
    korean: '면접',
    vietnamese: 'Phỏng vấn xin việc',
    romanization: 'myeon-jeop',
    hanja: '面接',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '내일 대기업 면접을 보러 가요.',
    exampleVi: 'Ngày mai tôi đi tham gia buổi phỏng vấn của một tập đoàn lớn.'
  },
  {
    id: 'v3-6',
    korean: '합격하다',
    vietnamese: 'Đỗ đạt / Trúng tuyển',
    romanization: 'hap-gyeok-ha-da',
    hanja: '合格하다',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '열심히 공부해서 TOPIK 4급에 합격했어요.',
    exampleVi: 'Nhờ chăm chỉ ôn luyện tôi đã thi đỗ TOPIK cấp 4.'
  },
  {
    id: 'v3-7',
    korean: '신청하다',
    vietnamese: 'Đăng ký / Nộp đơn',
    romanization: 'sin-cheong-ha-da',
    hanja: '申請하다',
    level: 3,
    category: 'Xã hội & Đời sống',
    exampleKr: '한국어 말하기 대회에 참가 신청을 했어요.',
    exampleVi: 'Tôi đã nộp đơn đăng ký tham gia cuộc thi nói tiếng Hàn.'
  },
  {
    id: 'v3-8',
    korean: '상담',
    vietnamese: 'Tư vấn / Thảo luận',
    romanization: 'sang-dam',
    hanja: '相談',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '진로 문제로 교수님과 상담을 받았습니다.',
    exampleVi: 'Tôi đã nhận buổi tư vấn từ giáo sư về vấn đề định hướng nghề nghiệp.'
  },
  {
    id: 'v3-9',
    korean: '스트레스',
    vietnamese: 'Căng thẳng / Stress',
    romanization: 'seu-teu-re-seu',
    level: 3,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '운동을 하면서 스트레스를 풀어요.',
    exampleVi: 'Tôi giải tỏa căng thẳng bằng cách tập thể dục thể thao.'
  },
  {
    id: 'v3-10',
    korean: '해결하다',
    vietnamese: 'Giải quyết vấn đề',
    romanization: 'hae-gyeol-ha-da',
    hanja: '解決하다',
    level: 3,
    category: 'Trường học & Công sở',
    exampleKr: '동료들과 상의해서 문제를 잘 해결했어요.',
    exampleVi: 'Tôi đã cùng các đồng nghiệp bàn bạc và giải quyết tốt vấn đề.'
  },
  {
    id: 'v3-11',
    korean: '습관',
    vietnamese: 'Thói quen',
    romanization: 'seup-gwan',
    hanja: '習慣',
    level: 3,
    category: 'Gia đình & Bản thân',
    exampleKr: '매일 아침 일찍 일어나는 습관을 들였어요.',
    exampleVi: 'Tôi đã rèn luyện được thói quen dậy sớm mỗi buổi sáng.'
  },
  {
    id: 'v3-12',
    korean: '건강검진',
    vietnamese: 'Khám sức khỏe tổng quát',
    romanization: 'geon-gang-geom-jin',
    hanja: '健康檢診',
    level: 3,
    category: 'Xã hội & Đời sống',
    exampleKr: '1년에 한 번씩 정기 건강검진을 받습니다.',
    exampleVi: 'Mỗi năm một lần tôi đều đi khám sức khỏe tổng quát định kỳ.'
  },
  {
    id: 'v3-13',
    korean: '축제',
    vietnamese: 'Lễ hội / Festival',
    romanization: 'chuk-je',
    hanja: '祝祭',
    level: 3,
    category: 'Giao thông & Du lịch',
    exampleKr: '봄에는 여의도 벚꽃 축제가 열립니다.',
    exampleVi: 'Vào mùa xuân lễ hội hoa anh đào Yeouido được tổ chức náo nhiệt.'
  },
  {
    id: 'v3-14',
    korean: '전통문화',
    vietnamese: 'Văn hóa truyền thống',
    romanization: 'jeon-tong-mun-hwa',
    hanja: '傳統文化',
    level: 3,
    category: 'Xã hội & Đời sống',
    exampleKr: '외국인 친구들에게 한국의 전통문화를 알리고 싶어요.',
    exampleVi: 'Tôi muốn quảng bá văn hóa truyền thống Hàn Quốc đến các bạn bè quốc tế.'
  },
  {
    id: 'v3-15',
    korean: '적응하다',
    vietnamese: 'Thích nghi / Hòa nhập',
    romanization: 'jeok-eung-ha-da',
    hanja: '適應하다',
    level: 3,
    category: 'Gia đình & Bản thân',
    exampleKr: '처음에는 낯설었지만 이제 한국 생활에 잘 적응했어요.',
    exampleVi: 'Lúc đầu còn bỡ ngỡ nhưng giờ tôi đã thích nghi rất tốt với cuộc sống ở Hàn Quốc.'
  },

  // ==========================================
  // LEVEL 4 (Trung cấp 2 - TOPIK II)
  // ==========================================
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
    category: 'Xã hội & Đời sống',
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
  {
    id: 'v4-4',
    korean: '대인관계',
    vietnamese: 'Mối quan hệ đối nhân xử thế',
    romanization: 'dae-in-gwan-gye',
    hanja: '對人關係',
    level: 4,
    category: 'Gia đình & Bản thân',
    exampleKr: '직장 생활에서는 원만한 대인관계가 필수적이다.',
    exampleVi: 'Trong cuộc sống công sở, mối quan hệ đối nhân xử thế hòa nhã là điều tất yếu.'
  },
  {
    id: 'v4-5',
    korean: '설문조사',
    vietnamese: 'Khảo sát / Thăm dò ý kiến',
    romanization: 'seol-mun-jo-sa',
    hanja: '設問調査',
    level: 4,
    category: 'Trường học & Công sở',
    exampleKr: '소비자 1,000명을 대상으로 설문조사를 실시했다.',
    exampleVi: 'Chúng tôi đã tiến hành khảo sát ý kiến trên 1.000 người tiêu dùng.'
  },
  {
    id: 'v4-6',
    korean: '고령화',
    vietnamese: 'Già hóa dân số',
    romanization: 'go-ryeong-hwa',
    hanja: '高齡化',
    level: 4,
    category: 'Xã hội & Đời sống',
    exampleKr: '고령화 사회에 접어들면서 노인 복지 대책이 시급하다.',
    exampleVi: 'Khi bước vào xã hội già hóa, các chính sách phúc lợi cho người cao tuổi là rất cấp bách.'
  },
  {
    id: 'v4-7',
    korean: '소비자',
    vietnamese: 'Người tiêu dùng',
    romanization: 'so-bi-ja',
    hanja: '消費者',
    level: 4,
    category: 'Mua sắm & Tiền tệ',
    exampleKr: '소비자의 다양한 요구를 충족시키는 제품이 인기다.',
    exampleVi: 'Sản phẩm đáp ứng được nhu cầu đa dạng của người tiêu dùng rất được ưa chuộng.'
  },
  {
    id: 'v4-8',
    korean: '취업률',
    vietnamese: 'Tỷ lệ có việc làm',
    romanization: 'chwi-eop-ryul',
    hanja: '就業率',
    level: 4,
    category: 'Trường học & Công sở',
    exampleKr: '경기 침체로 인해 대졸자들의 취업률이 감소했다.',
    exampleVi: 'Do suy thoái kinh tế, tỷ lệ có việc làm của cử nhân đại học đã sụt giảm.'
  },
  {
    id: 'v4-9',
    korean: '기후변화',
    vietnamese: 'Biến đổi khí hậu',
    romanization: 'gi-hu-byeon-hwa',
    hanja: '氣候變化',
    level: 4,
    category: 'Thời gian & Thời tiết',
    exampleKr: '기후변화로 인해 이상기후 현상이 빈번해졌다.',
    exampleVi: 'Do biến đổi khí hậu, các hiện tượng thời tiết bất thường xuất hiện thường xuyên hơn.'
  },
  {
    id: 'v4-10',
    korean: '극복하다',
    vietnamese: 'Khắc phục / Vượt qua',
    romanization: 'geuk-bok-ha-da',
    hanja: '克服하다',
    level: 4,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '어려운 위기를 끈기와 노력으로 극복해 냈다.',
    exampleVi: 'Họ đã vượt qua cuộc khủng hoảng cam go bằng sự kiên trì và nỗ lực bền bỉ.'
  },
  {
    id: 'v4-11',
    korean: '재활용',
    vietnamese: 'Tái chế rác thải',
    romanization: 'jae-hwal-yong',
    hanja: '再活用',
    level: 4,
    category: 'Xã hội & Đời sống',
    exampleKr: '쓰레기 분리수거와 재활용에 적극 동참해야 합니다.',
    exampleVi: 'Chúng ta cần tích cực tham gia phân loại rác và tái chế.'
  },
  {
    id: 'v4-12',
    korean: '대중교통',
    vietnamese: 'Giao thông công cộng',
    romanization: 'dae-jung-gyo-tong',
    hanja: '大衆交通',
    level: 4,
    category: 'Giao thông & Du lịch',
    exampleKr: '대중교통을 이용하면 탄소 배출을 줄일 수 있습니다.',
    exampleVi: 'Sử dụng phương tiện giao thông công cộng giúp giảm lượng khí thải carbon.'
  },
  {
    id: 'v4-13',
    korean: '창의력',
    vietnamese: 'Sức sáng tạo / Óc sáng tạo',
    romanization: 'chang-ui-ryeok',
    hanja: '創意力',
    level: 4,
    category: 'Trường học & Công sở',
    exampleKr: '미래 사회에서는 문제 해결을 위한 창의력이 필수적이다.',
    exampleVi: 'Trong xã hội tương lai, óc sáng tạo để giải quyết vấn đề là phẩm chất tất yếu.'
  },
  {
    id: 'v4-14',
    korean: '소통하다',
    vietnamese: 'Giao tiếp cởi mở / Thấu hiểu',
    romanization: 'so-tong-ha-da',
    hanja: '疏通하다',
    level: 4,
    category: 'Chào hỏi & Giao tiếp',
    exampleKr: '세대 간의 갈등을 줄이기 위해 서로 소통해야 한다.',
    exampleVi: 'Để giảm bớt mâu thuẫn giữa các thế hệ, cần phải lắng nghe và thấu hiểu lẫn nhau.'
  },
  {
    id: 'v4-15',
    korean: '봉사활동',
    vietnamese: 'Hoạt động tình nguyện',
    romanization: 'bong-sa-hwal-dong',
    hanja: '奉仕活動',
    level: 4,
    category: 'Xã hội & Đời sống',
    exampleKr: '방학 동안 보육원에서 정기 봉사활동을 진행했다.',
    exampleVi: 'Trong kỳ nghỉ, tôi đã tham gia hoạt động tình nguyện định kỳ tại trại trẻ mồ côi.'
  },

  // ==========================================
  // LEVEL 5 (Cao cấp 1 - TOPIK II)
  // ==========================================
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
    category: 'Thành ngữ & Triết lý',
    exampleKr: '운동도 하고 스트레스도 푸니 일석이조다.',
    exampleVi: 'Vừa được tập thể dục lại vừa giải tỏa căng thẳng quả là một mũi tên trúng hai đích.'
  },
  {
    id: 'v5-4',
    korean: '저출산',
    vietnamese: 'Tỷ lệ sinh thấp',
    romanization: 'jeo-chul-san',
    hanja: '低出産',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '저출산 문제는 국가 경쟁력에 심각한 위협이 된다.',
    exampleVi: 'Vấn đề tỷ lệ sinh thấp trở thành mối đe dọa nghiêm trọng tới năng lực cạnh tranh quốc gia.'
  },
  {
    id: 'v5-5',
    korean: '양극화',
    vietnamese: 'Phân hóa giàu nghèo cực đoan',
    romanization: 'yang-geuk-hwa',
    hanja: '兩極化',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '소득 양극화 현상을 완화하기 위한 복지 정책이 요구된다.',
    exampleVi: 'Cần có các chính sách an sinh xã hội để xoa dịu hiện tượng phân hóa thu nhập cực đoan.'
  },
  {
    id: 'v5-6',
    korean: '지속가능성',
    vietnamese: 'Tính bền vững',
    romanization: 'ji-sok-ga-neung-seong',
    hanja: '持續可能性',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '기업들은 친환경 경영을 통해 지속가능성을 추구하고 있다.',
    exampleVi: 'Các doanh nghiệp đang theo đuổi tính bền vững thông qua quản trị thân thiện với môi trường.'
  },
  {
    id: 'v5-7',
    korean: '다문화사회',
    vietnamese: 'Xã hội đa văn hóa',
    romanization: 'da-mun-hwa-sa-hoe',
    hanja: '多文化社會',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '한국은 외국인 유입이 늘며 다문화사회로 빠르게 진입하고 있다.',
    exampleVi: 'Hàn Quốc đang nhanh chóng bước vào xã hội đa văn hóa với lượng người nước ngoài gia tăng.'
  },
  {
    id: 'v5-8',
    korean: '동문서답',
    vietnamese: 'Hỏi một đằng trả lời một nẻo (Đông vấn tây đáp)',
    romanization: 'dong-mun-seo-dap',
    hanja: '東問西答',
    level: 5,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '질문의 요지를 파악하지 못하고 동문서답을 했다.',
    exampleVi: 'Do không nắm được trọng tâm câu hỏi nên đã trả lời tréo ngoe "ông nói gà bà nói vịt".'
  },
  {
    id: 'v5-9',
    korean: '고진감래',
    vietnamese: 'Khổ tận cam lai (Hết cơn bĩ cực đến hồi thái lai)',
    romanization: 'go-jin-gam-rae',
    hanja: '苦盡甘來',
    level: 5,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '고진감래라는 말처럼 긴 고생 끝에 드디어 결실을 맺었다.',
    exampleVi: 'Đúng như câu "khổ tận cam lai", sau bao năm gian nan vất vả cuối cùng đã gặt hái quả ngọt.'
  },
  {
    id: 'v5-10',
    korean: '전화위복',
    vietnamese: 'Chuyển họa thành phúc (Trong cái rủi có cái may)',
    romanization: 'jeon-hwa-wi-bok',
    hanja: '轉禍爲福',
    level: 5,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '이번 실패를 전화위복의 기회로 삼아 다시 도전하겠다.',
    exampleVi: 'Tôi sẽ lấy thất bại lần này làm cơ hội "chuyển họa vi phúc" để tiếp tục dấn bước.'
  },
  {
    id: 'v5-11',
    korean: '정보격차',
    vietnamese: 'Khoảng cách số / Bất bình đẳng thông tin',
    romanization: 'jeong-bo-gyeok-cha',
    hanja: '情報格差',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '디지털 기술 발달로 노년층의 정보격차가 심화되고 있다.',
    exampleVi: 'Sự phát triển công nghệ số đang làm trầm trọng thêm khoảng cách số ở người cao tuổi.'
  },
  {
    id: 'v5-12',
    korean: '규제완화',
    vietnamese: 'Nới lỏng quy chế / Rào cản pháp lý',
    romanization: 'gyu-je-wan-hwa',
    hanja: '規制緩和',
    level: 5,
    category: 'Trường học & Công sở',
    exampleKr: '신산업 육성을 위해 과감한 규제완화가 필요하다.',
    exampleVi: 'Cần có sự nới lỏng quy chế mạnh mẽ để bồi dưỡng các ngành công nghiệp mũi nhọn mới.'
  },
  {
    id: 'v5-13',
    korean: '선입견',
    vietnamese: 'Định kiến / Thành kiến ban đầu',
    romanization: 'seon-ip-gyeon',
    hanja: '先入見',
    level: 5,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '어떤 사람을 대할 때 선입견을 버리고 열린 마음을 가져야 한다.',
    exampleVi: 'Khi tiếp xúc với một ai đó, cần gạt bỏ định kiến và mở rộng lòng mình.'
  },
  {
    id: 'v5-14',
    korean: '시행착오',
    vietnamese: 'Phương pháp thử và sai / Bài học từ sai lầm',
    romanization: 'si-haeng-chak-o',
    hanja: '施行錯誤',
    level: 5,
    category: 'Trường học & Công sở',
    exampleKr: '수많은 시행착오를 거친 끝에 신제품 개발에 성공했다.',
    exampleVi: 'Trải qua vô số lần thử nghiệm và sửa sai, chúng tôi đã phát triển thành công sản phẩm mới.'
  },
  {
    id: 'v5-15',
    korean: '부익부 빈익빈',
    vietnamese: 'Người giàu càng giàu, người nghèo càng nghèo',
    romanization: 'bu-ik-bu bin-ik-bin',
    hanja: '富益富 貧益貧',
    level: 5,
    category: 'Xã hội & Đời sống',
    exampleKr: '자본주의 시장에서 부익부 빈익빈 현상이 가속화되고 있다.',
    exampleVi: 'Trong nền kinh tế thị trường tư bản, quy luật giàu nghèo phân cực diễn ra ngày càng nhanh.'
  },

  // ==========================================
  // LEVEL 6 (Cao cấp 2 - TOPIK II)
  // ==========================================
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
    category: 'Thành ngữ & Triết lý',
    exampleKr: '미리 대비책을 세우는 것은 유비무환의 자세이다.',
    exampleVi: 'Lập kế hoạch phòng ngừa trước chính là thái độ "hữu bị vô hoạn".'
  },
  {
    id: 'v6-3',
    korean: '백문이 불여일견',
    vietnamese: 'Trăm nghe không bằng một thấy (Bách văn bất như nhất kiến)',
    romanization: 'baek-mun-i bul-yeo-il-gyeon',
    hanja: '百聞不如一見',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '백문이 불여일견이니 직접 가서 확인해 봅시다.',
    exampleVi: 'Trăm nghe không bằng một thấy, chúng ta hãy trực tiếp đến tận nơi kiểm tra.'
  },
  {
    id: 'v6-4',
    korean: '작심삼일',
    vietnamese: 'Quyết tâm ba ngày / Cả thèm chóng chán (Tác tâm tam nhật)',
    romanization: 'jak-sim-sam-il',
    hanja: '作心三日',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '새해 목표가 작심삼일로 끝나지 않도록 꾸준히 실천하자.',
    exampleVi: 'Hãy kiên trì thực hiện để mục tiêu năm mới không bị "đầu voi đuôi chuột" bỏ dở giữa chừng.'
  },
  {
    id: 'v6-5',
    korean: '온고지신',
    vietnamese: 'Ôn cố tri tân (Học cái cũ để thấu hiểu cái mới)',
    romanization: 'on-go-ji-sin',
    hanja: '溫故知新',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '선조들의 지혜를 온고지신하여 현대 사회의 문제를 푼다.',
    exampleVi: 'Vận dụng tinh thần "ôn cố tri tân" từ trí tuệ tiền nhân để giải quyết các vấn nạn xã hội hiện đại.'
  },
  {
    id: 'v6-6',
    korean: '군계일학',
    vietnamese: 'Hạc giữa bầy gà (Xuất chúng nổi trội giữa đám đông)',
    romanization: 'gun-gye-il-hak',
    hanja: '群鷄一鶴',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '그의 탁월한 발표 실력은 지원자들 중 군계일학이었다.',
    exampleVi: 'Kỹ năng thuyết trình xuất chúng của anh ấy nổi bật như "hạc giữa bầy gà" trong số các ứng viên.'
  },
  {
    id: 'v6-7',
    korean: '상부상조',
    vietnamese: 'Tương thân tương ái / Giúp đỡ đùm bọc lẫn nhau',
    romanization: 'sang-bu-sang-jo',
    hanja: '相扶相助',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '어려운 이웃을 돕는 것은 우리 민족의 상부상조 전통이다.',
    exampleVi: 'Giúp đỡ những hoàn cảnh khó khăn là truyền thống tương trợ đùm bọc quý báu của dân tộc.'
  },
  {
    id: 'v6-8',
    korean: '기우',
    vietnamese: 'Lo bò trắng răng / Nỗi lo lắng hão huyền vô căn cứ',
    romanization: 'gi-u',
    hanja: '杞憂',
    level: 6,
    category: 'Cảm xúc & Tính từ',
    exampleKr: '그 일에 대해 너무 걱정하는 것은 쓸데없는 기우에 불과하다.',
    exampleVi: 'Quá lo nghĩ về chuyện đó chẳng qua chỉ là nỗi lo lắng viển vông vô cớ.'
  },
  {
    id: 'v6-9',
    korean: '환골탈태',
    vietnamese: 'Thay da đổi thịt / Lột xác ngoạn mục (Hoán cốt đoạt thai)',
    romanization: 'hwan-gol-tal-tae',
    hanja: '換骨奪胎',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '낙후되었던 구도심이 문화 예술 거리로 환골탈태했다.',
    exampleVi: 'Khu phố cổ từng lạc hậu đã hoàn toàn "thay da đổi thịt" thành một con đường văn hóa nghệ thuật sầm uất.'
  },
  {
    id: 'v6-10',
    korean: '자승자박',
    vietnamese: 'Gậy ông đập lưng ông / Tự trói buộc mình (Tự thừng tự phược)',
    romanization: 'ja-seung-ja-bak',
    hanja: '自繩自縛',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '거짓말을 덮으려다 결국 자승자박의 꼴이 되었다.',
    exampleVi: 'Cố tình che đậy sự thật bằng lời nói dối cuối cùng dẫn đến cảnh tự mình giăng bẫy bắt chính mình.'
  },
  {
    id: 'v6-11',
    korean: '역지사지',
    vietnamese: 'Đặt mình vào hoàn cảnh của người khác (Dịch địa tư chi)',
    romanization: 'yeok-ji-sa-ji',
    hanja: '易地思之',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '상대방의 입장에서 역지사지해보면 갈등을 쉽게 풀 수 있다.',
    exampleVi: 'Nếu biết đặt mình vào góc nhìn của đối phương để suy nghĩ, bất đồng sẽ được hóa giải dễ dàng.'
  },
  {
    id: 'v6-12',
    korean: '과유불급',
    vietnamese: 'Thái quá bất cập (Quá nhiều cũng dở như quá ít)',
    romanization: 'gwa-yu-bul-geup',
    hanja: '過猶不及',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '아무리 좋은 보약이라도 과유불급이니 적당히 복용해야 한다.',
    exampleVi: 'Dù là thuốc bổ tốt đến đâu thì "thái quá bất cập", chỉ nên dùng với liều lượng vừa đủ.'
  },
  {
    id: 'v6-13',
    korean: '결자해지',
    vietnamese: 'Người buộc chuông phải là người cởi chuông (Kết giả giải chi)',
    romanization: 'gyeol-ja-hae-ji',
    hanja: '結者解之',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '문제를 일으킨 당사자가 결자해지의 자세로 책임져야 한다.',
    exampleVi: 'Kẻ đã gây ra rắc rối phải có trách nhiệm tự đứng ra giải quyết theo đúng đạo lý "kết giả giải chi".'
  },
  {
    id: 'v6-14',
    korean: '주경야독',
    vietnamese: 'Ngày cày ruộng đêm đọc sách - Tinh thần vượt khó hiếu học',
    romanization: 'ju-gyeong-ya-dok',
    hanja: '晝耕夜讀',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '그는 낮에는 일하고 밤에는 주경야독하여 사법시험에 수석 합격했다.',
    exampleVi: 'Ban ngày anh ấy đi làm kiếm sống, đêm về miệt mài "ngày cày đêm đọc" và đã đỗ thủ khoa kỳ thi tư pháp.'
  },
  {
    id: 'v6-15',
    korean: '대기만성',
    vietnamese: 'Ngọc lớn thành muộn (Đại khí vãn thành - Tài năng lớn cần tôi luyện lâu dài)',
    romanization: 'dae-gi-man-seong',
    hanja: '大器晩成',
    level: 6,
    category: 'Thành ngữ & Triết lý',
    exampleKr: '지금 늦었다고 실망하지 마라. 대기만성형 인재일 수도 있다.',
    exampleVi: 'Đừng nản lòng khi cảm thấy khởi đầu muộn hơn người khác; những bậc đại tài thường cần thời gian dài để chín muồi.'
  }
];
