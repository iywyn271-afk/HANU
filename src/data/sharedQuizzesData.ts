import { SharedQuizSet } from '../types';

export const SHARED_QUIZ_SETS: SharedQuizSet[] = [
  {
    id: 'sq-topik-1',
    code: 'HANU-TOPIK',
    title: 'Đại Chiến TOPIK I Sơ Cấp (Cấp 1 - 2)',
    subTitle: 'Đề thi chuẩn hóa kiểm tra năng lực ngữ pháp, từ vựng và phản xạ giao tiếp cơ bản',
    category: 'Luyện thi chứng chỉ',
    difficulty: 'Trung bình',
    icon: '🏆',
    questionsCount: 8,
    participantsCount: 1428,
    author: 'HANU Academic Board',
    defaultLeaderboard: [
      { id: 'lb-1', playerName: 'Phương Linh', playerAvatar: '🐰', score: 8, totalQuestions: 8, timeSpentSeconds: 42, completedAt: '5 phút trước', badge: '🥇 Top 1 Tốc Độ' },
      { id: 'lb-2', playerName: 'Minh Trí', playerAvatar: '🐯', score: 8, totalQuestions: 8, timeSpentSeconds: 58, completedAt: '12 phút trước', badge: '🥈 Xuất Sắc' },
      { id: 'lb-3', playerName: 'Hải Yến', playerAvatar: '🌸', score: 7, totalQuestions: 8, timeSpentSeconds: 64, completedAt: '25 phút trước', badge: '🥉 Thủ Khoa' },
      { id: 'lb-4', playerName: 'Quốc Bảo', playerAvatar: '🚀', score: 7, totalQuestions: 8, timeSpentSeconds: 71, completedAt: '1 giờ trước' },
      { id: 'lb-5', playerName: 'Thu Thảo', playerAvatar: '🦊', score: 6, totalQuestions: 8, timeSpentSeconds: 83, completedAt: '2 giờ trước' }
    ],
    questions: [
      {
        id: 'sq-t1-1',
        type: 'multiple-choice',
        level: 1,
        category: 'Chào hỏi & Xã giao',
        question: 'Khi ai đó chào bạn "안녕히 가세요!" (Đi về bình an nhé!), bạn nên đáp lại câu nào?',
        options: ['안녕히 계세요!', '어서 오세요!', '죄송합니다!', '감사합니다!'],
        correctAnswer: '안녕히 계세요!',
        explanation: 'Người ở lại chào người đi: "안녕히 가세요". Người ra về chào người ở lại: "안녕히 계세요" (Ở lại bình an nhé).',
        hint: 'Người đi chào người ở lại bằng "안녕히 계세요".'
      },
      {
        id: 'sq-t1-2',
        type: 'fill-blank',
        level: 1,
        category: 'Trợ từ chủ ngữ',
        question: 'Điền trợ từ thích hợp vào chỗ trống:',
        koreanContext: '제 친구___ 베트남 사람이에요.',
        options: ['는', '를', '에', '에게'],
        correctAnswer: '는',
        explanation: '"친구" kết thúc bằng nguyên âm "구", dùng trợ từ chủ đề/chủ ngữ "는".',
        hint: 'Danh từ không có patchim đi với "는".'
      },
      {
        id: 'sq-t1-3',
        type: 'multiple-choice',
        level: 2,
        category: 'Thì tương lai / Dự định',
        question: 'Chọn câu diễn đạt đúng dự định: "Cuối tuần này tôi sẽ đi xem phim cùng bạn."',
        options: [
          '이번 주말에 친구와 영화를 볼 거예요.',
          '이번 주말에 친구와 영화를 봤어요.',
          '이번 주말에 친구와 영화를 봐요.',
          '이번 주말에 친구와 영화를 보지 않아요.'
        ],
        correctAnswer: '이번 주말에 친구와 영화를 볼 거예요.',
        explanation: 'Cấu trúc biểu thị dự định trong tương lai là ~(으)ㄹ 거예요. 보다 + ㄹ 거예요 = 볼 거예요.',
        hint: 'Tìm cấu trúc kết thúc bằng đuôi "~(으)ㄹ 거예요".'
      },
      {
        id: 'sq-t1-4',
        type: 'multiple-choice',
        level: 2,
        category: 'Nguyên nhân & Lý do',
        question: 'Nối hai vế câu: "Vì trời mưa nên tôi đã ở nhà" trong tiếng Hàn là:',
        options: [
          '비가 와서 집에 있었어요.',
          '비가 오지만 집에 있었어요.',
          '비가 오고 집에 있었어요.',
          '비가 오면 집에 있었어요.'
        ],
        correctAnswer: '비가 와서 집에 있었어요.',
        explanation: 'Cấu trúc nguyên nhân - kết quả quen thuộc trong TOPIK I là ~아/어서 (오다 + 아서 = 와서).',
        hint: '~아/어서 biểu thị nguyên nhân - kết quả.'
      },
      {
        id: 'sq-t1-5',
        type: 'flashcard-vi',
        level: 2,
        category: 'Phương tiện giao thông',
        question: 'Xem thẻ từ tiếng Hàn và chọn nghĩa đúng:',
        koreanWord: '지하철',
        romanization: 'ji-ha-cheol',
        options: ['Tàu điện ngầm', 'Xe buýt liên tỉnh', 'Sân bay quốc tế', 'Trạm dừng xe'],
        correctAnswer: 'Tàu điện ngầm',
        explanation: '"지하철" (Gốc Hán: Địa Hạ Thiết) là tàu điện ngầm chạy dưới lòng đất.',
        hint: 'Phương tiện giao thông công cộng dưới lòng đất của Seoul.'
      },
      {
        id: 'sq-t1-6',
        type: 'fill-blank',
        level: 2,
        category: 'Ngữ pháp đề nghị',
        question: 'Điền cấu trúc rủ rê cùng làm gì vào chỗ trống:',
        koreanContext: '우리 같이 점심 먹___? (Chúng mình cùng ăn trưa nhé?)',
        options: ['을까요', '을게요', '은데요', '으니까'],
        correctAnswer: '을까요',
        explanation: 'Cấu trúc rủ rê hoặc hỏi ý kiến đối phương một cách lịch sự là ~(으)ㄹ까요? (먹다 + 을까요 = 먹을까요?).',
        hint: 'Đuôi câu rủ rê: ~(으)ㄹ까요?'
      },
      {
        id: 'sq-t1-7',
        type: 'multiple-choice',
        level: 2,
        category: 'Số đếm thuần Hàn',
        question: 'Khi đếm 3 người trong tiếng Hàn, ta nói thế nào cho chuẩn xác?',
        options: ['세 명', '삼 명', '셋 개', '삼 개'],
        correctAnswer: '세 명',
        explanation: 'Đếm người dùng số thuần Hàn kết hợp danh từ đơn vị "명": 하나 -> 한, 둘 -> 두, 셋 -> 세 명.',
        hint: 'Số thuần Hàn 3 kết hợp với danh từ chỉ người "명".'
      },
      {
        id: 'sq-t1-8',
        type: 'multiple-choice',
        level: 2,
        category: 'Ngữ pháp khả năng',
        question: 'Câu nào biểu thị "Tôi không thể ăn được đồ ăn cay"?',
        options: [
          '저는 매운 음식을 못 먹어요.',
          '저는 매운 음식을 잘 먹어요.',
          '저는 매운 음식을 먹고 싶어요.',
          '저는 매운 음식을 먹을 거예요.'
        ],
        correctAnswer: '저는 매운 음식을 못 먹어요.',
        explanation: 'Phó từ phủ định năng lực "못" đứng trước động từ thể hiện việc không thể làm được.',
        hint: 'Từ phủ định khả năng: "못 + động từ".'
      }
    ]
  },
  {
    id: 'sq-kpop-2',
    code: 'KPOP-VIBE',
    title: 'Đu Idol K-Pop & K-Drama Vibe',
    subTitle: 'Thử thách từ lóng, cụm từ fandom, lời thoại kinh điển trong phim truyền hình và bài hát Hàn Quốc',
    category: 'Văn hóa & Âm nhạc',
    difficulty: 'Dễ',
    icon: '🎧',
    questionsCount: 8,
    participantsCount: 2315,
    author: 'Gen Z K-Club',
    defaultLeaderboard: [
      { id: 'lb-k1', playerName: 'Khánh Vy (Blink)', playerAvatar: '🎧', score: 8, totalQuestions: 8, timeSpentSeconds: 38, completedAt: '3 phút trước', badge: '🥇 Fandom Queen' },
      { id: 'lb-k2', playerName: 'Bảo Anh (Army)', playerAvatar: '⭐', score: 8, totalQuestions: 8, timeSpentSeconds: 45, completedAt: '18 phút trước', badge: '🥈 Siêu Tốc' },
      { id: 'lb-k3', playerName: 'Tuấn Kiệt', playerAvatar: '🐯', score: 7, totalQuestions: 8, timeSpentSeconds: 52, completedAt: '40 phút trước', badge: '🥉 Fan Cứng' },
      { id: 'lb-k4', playerName: 'Mai Chi', playerAvatar: '🌸', score: 7, totalQuestions: 8, timeSpentSeconds: 63, completedAt: '1 giờ trước' },
      { id: 'lb-k5', playerName: 'Đăng Khoa', playerAvatar: '🚀', score: 6, totalQuestions: 8, timeSpentSeconds: 69, completedAt: '3 giờ trước' }
    ],
    questions: [
      {
        id: 'sq-k-1',
        type: 'multiple-choice',
        level: 1,
        category: 'Từ lóng Fandom',
        question: 'Trong giới K-Pop, từ "최애" (choe-ae) có nghĩa là gì?',
        options: ['Thành viên bạn yêu thích nhất trong nhóm', 'Bài hát mới nhất', 'Vé xem concert', 'Album có chữ ký'],
        correctAnswer: 'Thành viên bạn yêu thích nhất trong nhóm',
        explanation: '"최애" (Tối Ái) là thuật ngữ chỉ "bias" - thành viên mà bạn yêu mến nhất trong idol group.',
        hint: 'Người bạn yêu thích số 1 (Bias).'
      },
      {
        id: 'sq-k-2',
        type: 'multiple-choice',
        level: 1,
        category: 'Thuật ngữ Fandom',
        question: 'Từ "컴백" (keom-baek) của các nghệ sĩ K-Pop bắt nguồn từ tiếng Anh nào?',
        options: ['Comeback (Tái xuất / Trở lại với album mới)', 'Combat (Chiến đấu)', 'Combine (Kết hợp)', 'Complex (Phức tạp)'],
        correctAnswer: 'Comeback (Tái xuất / Trở lại với album mới)',
        explanation: '"컴백" phiên âm từ chữ Comeback, chỉ đợt tái xuất phát hành sản phẩm âm nhạc mới của idol.',
        hint: 'Hành động ra mắt MV và album mới sau thời gian vắng bóng.'
      },
      {
        id: 'sq-k-3',
        type: 'multiple-choice',
        level: 1,
        category: 'Lời thoại K-Drama',
        question: 'Cụm từ ngọt ngào "보고 싶어요" (bo-go si-peo-yo) trong các bản tình ca K-Pop nghĩa là:',
        options: ['Anh nhớ em / Tôi muốn gặp bạn', 'Em yêu anh', 'Chúc em ngủ ngon', 'Hẹn gặp lại ngày mai'],
        correctAnswer: 'Anh nhớ em / Tôi muốn gặp bạn',
        explanation: 'Cấu trúc ~고 싶다 biểu thị mong muốn: 보다 (gặp, nhìn) + 고 싶어요 = Tôi muốn gặp bạn / Tôi nhớ bạn.',
        hint: 'Mong muốn được nhìn thấy, được gặp người mình thương.'
      },
      {
        id: 'sq-k-4',
        type: 'multiple-choice',
        level: 2,
        category: 'Lời thoại K-Drama',
        question: 'Khi nhân vật phim tỏ tình dứt khoát "나 너 좋아해!" nghĩa tiếng Việt là gì?',
        options: ['Tôi thích bạn!', 'Tôi ghét bạn!', 'Tôi nhớ bạn!', 'Tôi cảm ơn bạn!'],
        correctAnswer: 'Tôi thích bạn!',
        explanation: '"나" (tôi), "너" (bạn/cậu/em), "좋아해" (thích) - câu tỏ tình quen thuộc trong phim học đường.',
        hint: 'Lời thú nhận tình cảm ấm áp.'
      },
      {
        id: 'sq-k-5',
        type: 'multiple-choice',
        level: 2,
        category: 'Văn hóa cổ vũ',
        question: 'Đèn phát sáng chuyên dùng để cổ vũ trong concert K-Pop được gọi là gì?',
        options: ['응원봉 (Lightstick)', '스마트폰 (Điện thoại)', '손전등 (Đèn pin)', '마이크 (Micro)'],
        correctAnswer: '응원봉 (Lightstick)',
        explanation: '"응원봉" (Ứng Viện Bổng) là gậy cổ vũ phát quang (lightstick) mang biểu tượng riêng của từng nhóm nhạc.',
        hint: 'Cây gậy phát sáng mang màu sắc đặc trưng của fandom.'
      },
      {
        id: 'sq-k-6',
        type: 'multiple-choice',
        level: 2,
        category: 'Từ lóng Gen Z',
        question: 'Từ "대박" (dae-bak) mà người Hàn và idol hay thốt lên có nghĩa là:',
        options: ['Đỉnh chóp / Tuyệt vời / Không thể tin được!', 'Buồn quá đi mất!', 'Tạm biệt nhé!', 'Ngon miệng quá!'],
        correctAnswer: 'Đỉnh chóp / Tuyệt vời / Không thể tin được!',
        explanation: '"대박" là câu cảm thán siêu phổ biến diễn tả sự ngạc nhiên, khen ngợi điều gì đó cực kỳ đỉnh cao.',
        hint: 'Câu cảm thán thốt lên khi thấy điều gì quá xuất sắc.'
      },
      {
        id: 'sq-k-7',
        type: 'multiple-choice',
        level: 2,
        category: 'Văn hóa Hàn Quốc',
        question: 'Thành viên nhỏ tuổi nhất trong nhóm nhạc hoặc trong gia đình được gọi là gì?',
        options: ['막내 (mak-nae)', '리더 (leader)', '형 (hyeong)', '언니 (eon-ni)'],
        correctAnswer: '막내 (mak-nae)',
        explanation: '"막내" là em út nhỏ tuổi nhất, thường được các anh chị cưng chiều (như Jungkook BTS hay Lisa BLACKPINK).',
        hint: 'Em út của nhóm.'
      },
      {
        id: 'sq-k-8',
        type: 'multiple-choice',
        level: 2,
        category: 'Lời chúc thần tượng',
        question: 'Lời cổ vũ "꽃길만 걷자" mà fan hay gửi tặng thần tượng mang ý nghĩa gì?',
        options: [
          'Hãy chỉ bước đi trên con đường trải đầy hoa nhé (Chúc luôn may mắn và thành công)',
          'Hãy cùng nhau đi leo núi ngắm hoa',
          'Đừng đi ra ngoài đường khi trời nắng',
          'Hãy tập thể dục mỗi ngày'
        ],
        correctAnswer: 'Hãy chỉ bước đi trên con đường trải đầy hoa nhé (Chúc luôn may mắn và thành công)',
        explanation: '"꽃길만 걷자" (Chỉ bước trên con đường hoa) là lời chúc tràn đầy tình cảm gửi gắm tương lai tươi sáng rạng rỡ.',
        hint: 'Con đường hoa biểu tượng cho vinh quang và hạnh phúc.'
      }
    ]
  },
  {
    id: 'sq-travel-3',
    code: 'TRAVEL-KR',
    title: 'Cẩm Nang Sinh Tồn Du Lịch Hàn Quốc',
    subTitle: 'Bộ câu hỏi tình huống thực chiến: Gọi món thịt nướng, bắt tàu điện Seoul, đổi tiền và hỏi đường Hongdae',
    category: 'Giao tiếp du lịch',
    difficulty: 'Dễ',
    icon: '✈️',
    questionsCount: 8,
    participantsCount: 1890,
    author: 'Seoul Travelers Guide',
    defaultLeaderboard: [
      { id: 'lb-t1', playerName: 'Đức Huy', playerAvatar: '🚀', score: 8, totalQuestions: 8, timeSpentSeconds: 49, completedAt: '10 phút trước', badge: '🥇 Phượt Thủ Seoul' },
      { id: 'lb-t2', playerName: 'Thanh Hà', playerAvatar: '🌸', score: 8, totalQuestions: 8, timeSpentSeconds: 61, completedAt: '22 phút trước', badge: '🥈 Sành Sỏi' },
      { id: 'lb-t3', playerName: 'Gia Bảo', playerAvatar: '🐰', score: 7, totalQuestions: 8, timeSpentSeconds: 58, completedAt: '1 giờ trước', badge: '🥉 Tự Tin' },
      { id: 'lb-t4', playerName: 'Ngọc Lan', playerAvatar: '🐼', score: 6, totalQuestions: 8, timeSpentSeconds: 74, completedAt: '2 giờ trước' }
    ],
    questions: [
      {
        id: 'sq-tr-1',
        type: 'multiple-choice',
        level: 1,
        category: 'Nhà hàng ẩm thực',
        question: 'Khi vào quán ăn và muốn xin thêm nước uống, câu chuẩn tự nhiên nhất là:',
        options: ['여기 물 좀 주세요.', '여기 밥 없어요.', '얼마예요?', '안녕히 계세요.'],
        correctAnswer: '여기 물 좀 주세요.',
        explanation: '"여기 물 좀 주세요" (Làm ơn cho tôi xin một ít nước ở đây ạ) là câu gọi phục vụ chuẩn xác nhất.',
        hint: 'Ở đây + nước + làm ơn cho.'
      },
      {
        id: 'sq-tr-2',
        type: 'multiple-choice',
        level: 1,
        category: 'Mua sắm & Giá cả',
        question: 'Khi vào cửa hàng ở Myeongdong và muốn hỏi giá món đồ, bạn nói:',
        options: ['이거 얼마예요?', '어디에 가요?', '누구예요?', '몇 시예요?'],
        correctAnswer: '이거 얼마예요?',
        explanation: '"이거 얼마예요?" (Cái này bao nhiêu tiền vậy ạ?) là câu hỏi giá kinh điển khi mua sắm.',
        hint: '이거 (cái này) + 얼마예요 (bao nhiêu tiền).'
      },
      {
        id: 'sq-tr-3',
        type: 'multiple-choice',
        level: 2,
        category: 'Hỏi đường',
        question: 'Khi bị lạc và muốn hỏi "Nhà vệ sinh ở đâu ạ?", câu tiếng Hàn đúng là:',
        options: ['화장실이 어디예요?', '식당이 어디예요?', '지하철역이 어디예요?', '출구가 어디예요?'],
        correctAnswer: '화장실이 어디예요?',
        explanation: '"화장실" (Hóa Trang Thất) là nhà vệ sinh. 어디예요? = ở đâu vậy ạ?',
        hint: 'Hóa trang thất (nhà vệ sinh).'
      },
      {
        id: 'sq-tr-4',
        type: 'multiple-choice',
        level: 2,
        category: 'Thanh toán',
        question: 'Khi thanh toán và muốn hỏi "Có trả bằng thẻ tín dụng được không ạ?", câu nói là:',
        options: ['카드 돼요?', '현금만 있어요?', '영수증 버려주세요.', '깎아 주세요.'],
        correctAnswer: '카드 돼요?',
        explanation: '"카드 돼요?" (Có quẹt thẻ được không?) ngắn gọn, chuẩn người bản xứ.',
        hint: 'Card (thẻ) + dwae-yo (được không)?'
      },
      {
        id: 'sq-tr-5',
        type: 'multiple-choice',
        level: 2,
        category: 'Gọi món',
        question: 'Vào quán thịt nướng và muốn gọi "2 suất thịt ba chỉ nướng 삼겹살", bạn nói:',
        options: ['삼겹살 2인분 주세요.', '삼겹살 2개 사세요.', '삼겹살 먹지 마세요.', '삼겹살 비싸요.'],
        correctAnswer: '삼겹살 2인분 주세요.',
        explanation: 'Khi gọi đồ ăn theo suất ở quán Hàn, dùng đơn vị "인분" (nhân phần / suất người ăn). 2인분 = 2 suất.',
        hint: 'Đơn vị suất ăn: "인분".'
      },
      {
        id: 'sq-tr-6',
        type: 'multiple-choice',
        level: 2,
        category: 'Tàu điện ngầm',
        question: 'Thẻ giao thông đa năng quẹt tàu điện, xe buýt và mua đồ tại cửa hàng tiện lợi ở Hàn tên là gì?',
        options: ['T-Money', 'Visa Pay', 'Seoul Pass', 'Metro Ticket'],
        correctAnswer: 'T-Money',
        explanation: 'Thẻ T-Money là chiếc thẻ giao thông quyền lực không thể thiếu của mọi du khách khi đến Hàn Quốc.',
        hint: 'Chiếc thẻ giao thông quốc dân chữ T.'
      },
      {
        id: 'sq-tr-7',
        type: 'multiple-choice',
        level: 2,
        category: 'Mua sắm trả giá',
        question: 'Khi muốn xin chủ quán bớt giá một chút ở chợ truyền thống, bạn nói khéo câu nào?',
        options: ['조금만 깎아 주세요~', '너무 싸요.', '돈 없어요.', '더 주세요.'],
        correctAnswer: '조금만 깎아 주세요~',
        explanation: '"조금만 깎아 주세요" (Bớt cho cháu một xíu xiu thôi ạ~) nói với nụ cười thân thiện sẽ rất dễ thương.',
        hint: 'Động từ "깎다" là gọt/bớt giá.'
      },
      {
        id: 'sq-tr-8',
        type: 'multiple-choice',
        level: 2,
        category: 'Đi Taxi',
        question: 'Lên xe taxi và muốn nói "Làm ơn chở tôi đến khách sạn Lotte", bạn nói:',
        options: ['롯데호텔로 가 주세요.', '롯데호텔에서 내렸어요.', '롯데호텔이 멀어요.', '롯데호텔이 좋아요.'],
        correctAnswer: '롯데호텔로 가 주세요.',
        explanation: 'Cấu trúc địa điểm + ~(으)로 가 주세요 (Làm ơn đi về hướng/đến địa điểm này).',
        hint: 'Địa điểm + 로 가 주세요.'
      }
    ]
  },
  {
    id: 'sq-biz-4',
    code: 'BIZ-KOREA',
    title: 'Phỏng Vấn & Tiếng Hàn Công Sở (Cấp 3 - 4)',
    subTitle: 'Đề thi tình huống công việc: Viết email, trao đổi với sếp Hàn, kính ngữ công vụ và văn hóa doanh nghiệp',
    category: 'Công sở & Doanh nghiệp',
    difficulty: 'Khó',
    icon: '💼',
    questionsCount: 8,
    participantsCount: 960,
    author: 'K-Business Association',
    defaultLeaderboard: [
      { id: 'lb-b1', playerName: 'Thùy Dương (Leader)', playerAvatar: '👑', score: 8, totalQuestions: 8, timeSpentSeconds: 65, completedAt: '15 phút trước', badge: '🥇 K-Professional' },
      { id: 'lb-b2', playerName: 'Việt Hoàng', playerAvatar: '☕', score: 7, totalQuestions: 8, timeSpentSeconds: 78, completedAt: '1 giờ trước', badge: '🥈 Công Sở Pro' },
      { id: 'lb-b3', playerName: 'Thảo My', playerAvatar: '🌸', score: 7, totalQuestions: 8, timeSpentSeconds: 84, completedAt: '2 giờ trước', badge: '🥉 Bền Bỉ' }
    ],
    questions: [
      {
        id: 'sq-b-1',
        type: 'multiple-choice',
        level: 3,
        category: 'Kính ngữ công vụ',
        question: 'Khi nhận tài liệu từ Giám đốc (사장님), câu cảm ơn chuẩn kính ngữ cao cấp là:',
        options: ['감사히 잘 받겠습니다.', '고마워요.', '잘 받았어.', '알겠습니다.'],
        correctAnswer: '감사히 잘 받겠습니다.',
        explanation: '"감사히 잘 받겠습니다" (Tôi xin phép trân trọng đón nhận ạ) thể hiện sự lễ phép và tác phong chuyên nghiệp.',
        hint: 'Kính ngữ khi nhận đồ từ cấp trên.'
      },
      {
        id: 'sq-b-2',
        type: 'multiple-choice',
        level: 3,
        category: 'Giao tiếp điện thoại',
        question: 'Khi nhấc máy nghe điện thoại công ty ở Hàn Quốc, câu mở đầu chuẩn mực là:',
        options: ['여보세요, [Tên công ty]의 [Tên bạn]입니다.', '누구세요?', '왜 전화했어요?', '말하세요.'],
        correctAnswer: '여보세요, [Tên công ty]의 [Tên bạn]입니다.',
        explanation: 'Quy tắc công sở Hàn: Alo, tôi là [Tên bạn] thuộc bộ phận/công ty [Tên công ty] xin nghe ạ.',
        hint: 'Xưng danh công ty và tên của bản thân.'
      },
      {
        id: 'sq-b-3',
        type: 'multiple-choice',
        level: 3,
        category: 'Ngữ pháp gián tiếp',
        question: 'Dẫn lại lời của Trưởng phòng: "Trưởng phòng bảo ngày mai họp lúc 9 giờ sáng."',
        options: [
          '부장님께서 내일 아침 9시에 회의를 한다고 하셨습니다.',
          '부장님께서 내일 아침 9시에 회의를 했어요.',
          '부장님께서 내일 아침 9시에 회의를 하자고 했어.',
          '부장님께서 내일 아침 9시에 회의를 하냐고 물었어요.'
        ],
        correctAnswer: '부장님께서 내일 아침 9시에 회의를 한다고 하셨습니다.',
        explanation: 'Kính ngữ chủ ngữ "께서", đuôi trần thuật gián tiếp ~ㄴ다고 하다 kết hợp kính ngữ quá khứ "하셨습니다".',
        hint: '께서 + ~ㄴ다고 하셨습니다.'
      },
      {
        id: 'sq-b-4',
        type: 'flashcard-vi',
        level: 3,
        category: 'Từ vựng công sở',
        question: 'Xem thẻ từ tiếng Hàn công sở và chọn nghĩa đúng:',
        koreanWord: '면접',
        romanization: 'myeon-jeop',
        options: ['Phỏng vấn tuyển dụng', 'Hợp đồng lao động', 'Thử việc', 'Khen thưởng nhân viên'],
        correctAnswer: 'Phỏng vấn tuyển dụng',
        explanation: '"면접" (Gốc Hán: Diện Tiếp) là buổi phỏng vấn trực tiếp giữa nhà tuyển dụng và ứng viên.',
        hint: 'Gốc Hán: Diện tiếp.'
      },
      {
        id: 'sq-b-5',
        type: 'multiple-choice',
        level: 4,
        category: 'Viết Email công vụ',
        question: 'Cụm từ trang trọng thường dùng ở cuối email công việc Hàn Quốc là:',
        options: ['환절기에 감기 조심하시고, 좋은 하루 보내시기 바랍니다.', '다음에 또 봐요.', '잘 지내.', '안녕!'],
        correctAnswer: '환절기에 감기 조심하시고, 좋은 하루 보내시기 바랍니다.',
        explanation: 'Email công sở Hàn Quốc thường kết thúc bằng lời chúc sức khỏe theo mùa và lời chúc ngày làm việc thuận lợi.',
        hint: 'Lời chúc sức khỏe và ngày làm việc tốt lành.'
      },
      {
        id: 'sq-b-6',
        type: 'multiple-choice',
        level: 4,
        category: 'Văn hóa công sở',
        question: 'Bữa tiệc liên hoan ăn uống gắn kết đồng nghiệp sau giờ làm việc ở công ty Hàn gọi là gì?',
        options: ['회식 (hoe-sik)', '야근 (ya-geun)', '출근 (chul-geun)', '퇴근 (toe-geun)'],
        correctAnswer: '회식 (hoe-sik)',
        explanation: '"회식" (Hội Thực) là văn hóa tiệc liên hoan ăn uống sau giờ làm quen thuộc của công sở Hàn.',
        hint: 'Hội thực (tiệc ăn uống công ty).'
      },
      {
        id: 'sq-b-7',
        type: 'multiple-choice',
        level: 4,
        category: 'Họp hành & Báo cáo',
        question: 'Khi muốn xin phép ngắt lời để phát biểu trong cuộc họp, câu lịch sự là:',
        options: ['제가 한 말씀 드려도 되겠습니까?', '조용히 하세요.', '내 말 들으세요.', '그만하세요.'],
        correctAnswer: '제가 한 말씀 드려도 되겠습니까?',
        explanation: '"제가 한 말씀 드려도 되겠습니까?" (Tôi xin phép được đóng góp một lời ý kiến có được không ạ?) cực kỳ chuẩn mực.',
        hint: 'Tôi xin phép nói một lời có được không?'
      },
      {
        id: 'sq-b-8',
        type: 'multiple-choice',
        level: 4,
        category: 'Ngữ pháp dự đoán',
        question: 'Báo cáo với sếp về dự án: "Dự kiến dự án sẽ hoàn thành vào cuối tháng này."',
        options: [
          '이번 달 말에 프로젝트가 완료될 것으로 보입니다.',
          '이번 달 말에 프로젝트가 완료되었어요.',
          '이번 달 말에 프로젝트가 완료되어서 좋아요.',
          '이번 달 말에 프로젝트를 완료하지 마세요.'
        ],
        correctAnswer: '이번 달 말에 프로젝트가 완료될 것으로 보입니다.',
        explanation: 'Cấu trúc ~(으)ㄹ 것으로 보이다 / 예상되다 biểu thị nhận định hoặc dự kiến trang trọng trong báo cáo.',
        hint: '~(으)ㄹ 것으로 보이다.'
      }
    ]
  },
  {
    id: 'sq-hanja-5',
    code: 'HANJA-PRO',
    title: 'Đấu Trí Thành Ngữ Bốn Chữ 사자성어 (Cấp 5 - 6)',
    subTitle: 'Đấu trường tinh hoa trí tuệ: Thử thách vốn thành ngữ Hán - Hàn cổ điển trong nghị luận xã hội và TOPIK II cao cấp',
    category: 'Thành ngữ & Triết lý',
    difficulty: 'Thử thách',
    icon: '👑',
    questionsCount: 8,
    participantsCount: 780,
    author: 'TOPIK Master League',
    defaultLeaderboard: [
      { id: 'lb-h1', playerName: 'Tiến Đạt (TOPIK 6)', playerAvatar: '👑', score: 8, totalQuestions: 8, timeSpentSeconds: 55, completedAt: '30 phút trước', badge: '🥇 Trạng Nguyên' },
      { id: 'lb-h2', playerName: 'Hoàng Yến', playerAvatar: '🌸', score: 7, totalQuestions: 8, timeSpentSeconds: 67, completedAt: '1 giờ trước', badge: '🥈 Bảng Nhãn' },
      { id: 'lb-h3', playerName: 'Minh Quang', playerAvatar: '🐯', score: 6, totalQuestions: 8, timeSpentSeconds: 82, completedAt: '3 giờ trước', badge: '🥉 Thám Hoa' }
    ],
    questions: [
      {
        id: 'sq-h-1',
        type: 'multiple-choice',
        level: 5,
        category: 'Thành ngữ 4 chữ',
        question: 'Thành ngữ "일석이조" (Nhất Thạch Nhị Điểu) tương đương với thành ngữ tiếng Việt nào?',
        options: [
          'Một mũi tên trúng hai đích (Một công đôi việc)',
          'Khổ trước sướng sau',
          'Trăm nghe không bằng một thấy',
          'Đầu voi đuôi chuột'
        ],
        correctAnswer: 'Một mũi tên trúng hai đích (Một công đôi việc)',
        explanation: '"일석이조" (Một hòn đá ném trúng hai con chim) biểu thị làm một việc mà đạt được hai lợi ích to lớn.',
        hint: 'Nhất thạch (1 hòn đá) - nhị điểu (2 con chim).'
      },
      {
        id: 'sq-h-2',
        type: 'multiple-choice',
        level: 5,
        category: 'Thành ngữ 4 chữ',
        question: 'Khi muốn nói về việc "Trong cái rủi có cái may, biến nguy cơ thành cơ hội", người Hàn dùng thành ngữ:',
        options: ['전화위복 (Chuyển Họa Vi Phúc)', '동문서답 (Đông Vấn Tây Đáp)', '작심삼일 (Tác Tâm Tam Nhật)', '군계일학 (Quần Kê Nhất Hạc)'],
        correctAnswer: '전화위복 (Chuyển Họa Vi Phúc)',
        explanation: '"전화위복" (Chuyển Họa Vi Phúc): Biến tai họa trở thành phúc lành và may mắn.',
        hint: 'Chuyển họa thành phúc.'
      },
      {
        id: 'sq-h-3',
        type: 'multiple-choice',
        level: 5,
        category: 'Thành ngữ 4 chữ',
        question: 'Thành ngữ "동문서답" (Đông Vấn Tây Đáp) chỉ hành vi nào?',
        options: ['Hỏi một đằng trả lời một nẻo (Lạc đề)', 'Nói lời cay độc', 'Im lặng không nói', 'Khen ngợi nịnh hót'],
        correctAnswer: 'Hỏi một đằng trả lời một nẻo (Lạc đề)',
        explanation: '"동문서답" (Hỏi phía đông lại đáp phía tây) chỉ việc trả lời không đúng vào trọng tâm câu hỏi của người khác.',
        hint: 'Hỏi đông đáp tây.'
      },
      {
        id: 'sq-h-4',
        type: 'multiple-choice',
        level: 6,
        category: 'Thành ngữ triết lý',
        question: 'Thành ngữ "유비무환" (Hữu Bị Vô Hoạn) mang hàm ý khuyên răn điều gì?',
        options: [
          'Có chuẩn bị kỹ càng từ trước thì không phải lo sợ tai họa bất ngờ',
          'Làm việc chăm chỉ thì sẽ giàu có',
          'Không nên tin lời người lạ',
          'Hãy biết nhường nhịn người khác'
        ],
        correctAnswer: 'Có chuẩn bị kỹ càng từ trước thì không phải lo sợ tai họa bất ngờ',
        explanation: '"유비무환" (Có chuẩn bị thì không có hoạn nạn): Lập kế hoạch phòng ngừa rủi ro chu đáo.',
        hint: 'Hữu bị (có chuẩn bị) - vô hoạn (không lo hoạn nạn).'
      },
      {
        id: 'sq-h-5',
        type: 'multiple-choice',
        level: 6,
        category: 'Thành ngữ triết lý',
        question: 'Thành ngữ nào diễn tả người xuất chúng, nổi trội vượt bậc giữa đám đông tầm thường?',
        options: ['군계일학 (Quần Kê Nhất Hạc)', '자승자박 (Tự Thừng Tự Phược)', '역지사지 (Dịch Địa Tư Chi)', '온고지신 (Ôn Cố Tri Tân)'],
        correctAnswer: '군계일학 (Quần Kê Nhất Hạc)',
        explanation: '"군계일학" (Một con hạc trắng kiêu hãnh giữa bầy gà tầm thường): Chỉ nhân tài kiệt xuất nổi bật.',
        hint: 'Hạc trắng giữa bầy gà.'
      },
      {
        id: 'sq-h-6',
        type: 'multiple-choice',
        level: 6,
        category: 'Thành ngữ triết lý',
        question: 'Khi khuyên bảo ai đó "Đừng quyết tâm nửa vời, cả thèm chóng chán", ta dùng thành ngữ:',
        options: ['작심삼일 (Tác Tâm Tam Nhật)', '백문이 불여일견', '과유불급', '결자해지'],
        correctAnswer: '작심삼일 (Tác Tâm Tam Nhật)',
        explanation: '"작심삼일" (Quyết tâm chỉ giữ được trong 3 ngày): Chỉ thói quen mau nản chí, đầu voi đuôi chuột.',
        hint: 'Quyết tâm 3 ngày.'
      },
      {
        id: 'sq-h-7',
        type: 'multiple-choice',
        level: 6,
        category: 'Thành ngữ triết lý',
        question: 'Đạo lý "Người buộc chuông phải là người cởi chuông - Ai gây ra rắc rối phải tự giải quyết" là:',
        options: ['결자해지 (Kết Giả Giải Chi)', '상부상조 (Tương Phù Tương Trợ)', '환골탈태 (Hoán Cốt Đoạt Thai)', '대기만성 (Đại Khí Vãn Thành)'],
        correctAnswer: '결자해지 (Kết Giả Giải Chi)',
        explanation: '"결자해지" (Người thắt nút dây phải là người tháo nút): Người gây ra chuyện phải chịu trách nhiệm giải quyết.',
        hint: 'Kết giả (người buộc) - giải chi (cởi nó).'
      },
      {
        id: 'sq-h-8',
        type: 'multiple-choice',
        level: 6,
        category: 'Thành ngữ triết lý',
        question: 'Triết lý Khổng Tử "Học hỏi và kế thừa từ những bài học quá khứ để sáng tạo ra cái mới" là thành ngữ nào?',
        options: ['온고지신 (Ôn Cố Tri Tân)', '과유불급 (Thái Quá Bất Cập)', '기우 (Kỷ Ưu)', '주경야독 (Trú Canh Dạ Độc)'],
        correctAnswer: '온고지신 (Ôn Cố Tri Tân)',
        explanation: '"온고지신" (Ôn Cố Tri Tân): Ôn lại chuyện cũ để thấu hiểu và phát triển tri thức mới của thời đại.',
        hint: 'Ôn cố (ôn cái cũ) - tri tân (hiểu cái mới).'
      }
    ]
  }
];

export function getSharedQuizByCode(code: string): SharedQuizSet | undefined {
  const clean = code.trim().toUpperCase();
  return SHARED_QUIZ_SETS.find(s => s.code.toUpperCase() === clean || s.id.toUpperCase() === clean);
}
