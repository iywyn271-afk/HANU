import { DialogueLesson, PronunciationRule } from '../types';

export const PRONUNCIATION_RULES: PronunciationRule[] = [
  {
    id: 'pr-1',
    name: 'Quy tắc Nối âm (연음법칙 - Yeoneum)',
    ruleKorean: '연음 법칙',
    description: 'Khi âm tiết trước kết thúc bằng phụ âm cuối (Patchim) và âm tiết sau bắt đầu bằng nguyên âm (ㅇ câm), phụ âm cuối sẽ được nối sang làm phụ âm đầu của âm tiết sau.',
    formula: 'Patchim + ㅇ (nguyên âm) → Nối phụ âm sang phải',
    examples: [
      { written: '한국어', pronounced: '[한구거 - han-gu-geo]', meaning: 'tiếng Hàn', explanation: 'Patchim ㄱ nối sang âm tiết 어' },
      { written: '음악', pronounced: '[으막 - eu-mak]', meaning: 'âm nhạc', explanation: 'Patchim ㅁ nối sang âm tiết 악' },
      { written: '할아버지', pronounced: '[하라버지 - ha-ra-beo-ji]', meaning: 'ông nội', explanation: 'Patchim ㄹ nối sang âm tiết 아' }
    ]
  },
  {
    id: 'pr-2',
    name: 'Quy tắc Biến âm mũi (비음화 - Bieumhwa)',
    ruleKorean: '비음화',
    description: 'Khi các patchim [ㄱ, ㄷ, ㅂ] gặp các phụ âm mũi [ㄴ, ㅁ] ở phía sau, chúng sẽ biến đổi lần lượt thành các âm mũi tương ứng [ㅇ, ㄴ, ㅁ].',
    formula: 'ㄱ/ㅋ/ㄲ + ㄴ/ㅁ → [ㅇ], ㄷ/ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ + ㄴ/ㅁ → [ㄴ], ㅂ/ㅍ + ㄴ/ㅁ → [ㅁ]',
    examples: [
      { written: '감사합니다', pronounced: '[감사함니다 - gam-sa-ham-ni-da]', meaning: 'cảm ơn', explanation: 'Patchim ㅂ gặp ㄴ biến thành âm mũi [ㅁ]' },
      { written: '국물', pronounced: '[궁물 - gung-mul]', meaning: 'nước canh', explanation: 'Patchim ㄱ gặp ㅁ biến thành âm mũi [ㅇ]' },
      { written: '한국말', pronounced: '[한궁말 - han-gung-mal]', meaning: 'tiếng Hàn', explanation: 'Patchim ㄱ gặp ㅁ đọc thành [ㅇ]' }
    ]
  },
  {
    id: 'pr-3',
    name: 'Quy tắc Căng âm (경음화 - Gyeong-eumhwa)',
    ruleKorean: '경음화',
    description: 'Khi các patchim [ㄱ, ㄷ, ㅂ] gặp các phụ âm thường [ㄱ, ㄷ, ㅂ, ㅅ, ㅈ] đứng sau, các phụ âm sau sẽ biến thành âm căng [ㄲ, ㄸ, ㅃ, ㅆ, ㅉ].',
    formula: '[ㄱ, ㄷ, ㅂ] + [ㄱ, ㄷ, ㅂ, ㅅ, ㅈ] → [ㄲ, ㄸ, ㅃ, ㅆ, ㅉ]',
    examples: [
      { written: '학교', pronounced: '[학외 / 학꾜 - hak-kkyo]', meaning: 'trường học', explanation: 'ㄱ gặp ㄱ biến thành âm căng [ㄲ]' },
      { written: '식당', pronounced: '[식땅 - sik-ttang]', meaning: 'nhà hàng, quán ăn', explanation: 'ㄱ gặp ㄷ biến thành [ㄸ]' },
      { written: '국수', pronounced: '[국쑤 - guk-ssu]', meaning: 'mì, phở', explanation: 'ㄱ gặp ㅅ biến thành [ㅆ]' }
    ]
  },
  {
    id: 'pr-4',
    name: 'Quy tắc Bật hơi (격음화 - Gyeok-eumhwa)',
    ruleKorean: '격음화',
    description: 'Khi phụ âm [ㅎ] đứng trước hoặc sau các âm [ㄱ, ㄷ, ㅂ, ㅈ], chúng kết hợp lại thành âm bật hơi mạnh [ㅋ, ㅌ, ㅍ, ㅊ].',
    formula: 'ㅎ + [ㄱ, ㄷ, ㅂ, ㅈ] hoặc [ㄱ, ㄷ, ㅂ, ㅈ] + ㅎ → [ㅋ, ㅌ, ㅍ, ㅊ]',
    examples: [
      { written: '좋다', pronounced: '[조타 - jo-ta]', meaning: 'tốt, thích', explanation: 'ㅎ gặp ㄷ biến thành âm bật hơi [ㅌ]' },
      { written: '축하해요', pronounced: '[추카해요 - chu-ka-hae-yo]', meaning: 'chúc mừng', explanation: 'ㄱ gặp ㅎ biến thành âm bật hơi [ㅋ]' }
    ]
  }
];

export const DIALOGUE_LESSONS: DialogueLesson[] = [
  {
    id: 'd-1',
    level: 1,
    topic: 'Lần đầu gặp gỡ & Giới thiệu',
    title: '처음 뵙겠습니다 (Rất vui được gặp bạn)',
    context: 'Hai người bạn mới quen gặp nhau tại lớp học tiếng Hàn ở Seoul.',
    lines: [
      {
        speaker: 'Min-ji',
        avatar: '👧',
        kr: '안녕하세요! 저는 김민지예요.',
        vi: 'Xin chào! Tôi là Kim Min-ji.',
        romanization: 'An-nyeong-ha-se-yo! Jeo-neun Kim Min-ji-ye-yo.'
      },
      {
        speaker: 'Nam',
        avatar: '👦',
        kr: '안녕하세요, 민지 씨. 저는 베트남에서 온 남이에요.',
        vi: 'Chào Min-ji. Tôi là Nam đến từ Việt Nam.',
        romanization: 'An-nyeong-ha-se-yo, Min-ji ssi. Jeo-neun Be-teu-nam-e-seo on Nam-i-e-yo.'
      },
      {
        speaker: 'Min-ji',
        avatar: '👧',
        kr: '만나서 정말 반가워요, 남 씨! 학생이에요?',
        vi: 'Rất vui được gặp Nam! Bạn là học sinh/sinh viên à?',
        romanization: 'Man-na-seo jeong-mal ban-ga-wo-yo, Nam ssi! Hak-saeng-i-e-yo?'
      },
      {
        speaker: 'Nam',
        avatar: '👦',
        kr: '네, 저는 대학교에서 한국어를 공부해요.',
        vi: 'Vâng, tôi đang học tiếng Hàn ở trường đại học.',
        romanization: 'Ne, jeo-neun dae-hak-gyo-e-seo han-guk-eo-reul gong-bu-hae-yo.'
      }
    ],
    vocabularyHighlight: [
      { kr: '처음 뵙겠습니다', vi: 'Lần đầu gặp gỡ' },
      { kr: '만나서 반가워요', vi: 'Rất vui được gặp bạn' },
      { kr: '대학교', vi: 'Trường đại học' }
    ]
  },
  {
    id: 'd-2',
    level: 1,
    topic: 'Tại Quán Cà Phê Seoul',
    title: '카페에서 주문하기 (Gọi đồ uống tại quán cà phê)',
    context: 'Khách hàng bước vào quán cà phê để gọi trà chanh và bánh ngọt.',
    lines: [
      {
        speaker: 'Nhân viên',
        avatar: '☕',
        kr: '어서 오세요! 무엇을 드릴까요?',
        vi: 'Xin kính chào quý khách! Tôi có thể giúp gì cho bạn?',
        romanization: 'Eo-seo o-se-yo! Mu-eot-eul deu-ril-kka-yo?'
      },
      {
        speaker: 'Khách',
        avatar: '👩',
        kr: '아이스 아메리카노 한 잔하고 치즈케이크 하나 주세요.',
        vi: 'Cho tôi một ly Americano đá và một chiếc bánh phô mai nhé.',
        romanization: 'A-i-seu A-me-ri-ka-no han jan-ha-go chi-jeu-ke-i-keu ha-na ju-se-yo.'
      },
      {
        speaker: 'Nhân viên',
        avatar: '☕',
        kr: '드시고 가세요, 아니면 포장해 드릴까요?',
        vi: 'Quý khách dùng tại đây hay mang về ạ?',
        romanization: 'Deu-si-go ga-se-yo, a-ni-myeon po-jang-hae deu-ril-kka-yo?'
      },
      {
        speaker: 'Khách',
        avatar: '👩',
        kr: '여기서 먹고 갈게요. 얼마예요?',
        vi: 'Tôi dùng tại đây ạ. Hết bao nhiêu tiền vậy?',
        romanization: 'Yeo-gi-seo meok-go gal-ge-yo. Eol-ma-ye-yo?'
      },
      {
        speaker: 'Nhân viên',
        avatar: '☕',
        kr: '모두 8,500원입니다. 카드 결제 도와드릴게요.',
        vi: 'Tất cả là 8.500 Won ạ. Tôi thanh toán thẻ cho bạn nhé.',
        romanization: 'Mo-du pal-cheon-o-baek-won-im-ni-da. Ka-deu gyeol-je do-wa-deu-ril-ge-yo.'
      }
    ],
    vocabularyHighlight: [
      { kr: '어서 오세요', vi: 'Xin kính chào quý khách' },
      { kr: '포장하다', vi: 'Đóng gói mang về (takeout)' },
      { kr: '카드 결제', vi: 'Thanh toán bằng thẻ' }
    ]
  },
  {
    id: 'd-3',
    level: 2,
    topic: 'Hỏi Đường & Phương Tiện',
    title: '길 묻기 (Hỏi đường đến ga Gangnam)',
    context: 'Một du khách hỏi người đi đường cách đi đến ga tàu điện ngầm.',
    lines: [
      {
        speaker: 'Du khách',
        avatar: '🗺️',
        kr: '저기요, 실례지만 강남역이 어디에 있어요?',
        vi: 'Xin lỗi làm phiền một chút, ga Gangnam ở đâu vậy ạ?',
        romanization: 'Jeo-gi-yo, sil-lye-ji-man Gang-nam-yeok-i eo-di-e iss-eo-yo?'
      },
      {
        speaker: 'Người qua đường',
        avatar: '🚶',
        kr: '이 길로 똑바로 5분쯤 걸어가시면 오른쪽에 있어요.',
        vi: 'Bạn cứ đi thẳng con đường này khoảng 5 phút thì nó ở bên tay phải.',
        romanization: 'I gil-lo ttok-ba-ro o-bun-jjeum geol-eo-ga-si-myeon o-reun-jjok-e iss-eo-yo.'
      },
      {
        speaker: 'Du khách',
        avatar: '🗺️',
        kr: '아, 걸어서 갈 수 있군요! 정말 감사합니다.',
        vi: 'À, hóa ra có thể đi bộ được! Tôi cảm ơn bạn rất nhiều.',
        romanization: 'A, geol-eo-seo gal su iss-gun-yo! Jeong-mal gam-sa-ham-ni-da.'
      },
      {
        speaker: 'Người qua đường',
        avatar: '🚶',
        kr: '아니에요. 조심히 가세요!',
        vi: 'Không có chi. Đi cẩn thận nhé!',
        romanization: 'A-ni-e-yo. Jo-sim-hi ga-se-yo!'
      }
    ],
    vocabularyHighlight: [
      { kr: '실례지만', vi: 'Xin thất lễ / Xin lỗi làm phiền nhưng...' },
      { kr: '똑바로', vi: 'Đi thẳng' },
      { kr: '오른쪽 / 왼쪽', vi: 'Bên phải / Bên trái' }
    ]
  }
];
