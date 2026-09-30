import { GrammarLesson } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  // LEVEL 1
  {
    id: 'g1-1',
    level: 1,
    title: 'Trợ từ chủ ngữ 은 / 는',
    pattern: 'Danh từ + 은/는',
    summary: 'Dùng sau danh từ để biểu thị chủ ngữ hoặc chủ đề của câu, nhấn mạnh hoặc đối chiếu.',
    explanation: 'Dùng "은" khi danh từ có patchim (phụ âm cuối), dùng "는" khi danh từ không có patchim. Đây là trợ từ cơ bản nhất để bắt đầu câu giới thiệu bản thân.',
    formula: {
      hasPatchim: 'Danh từ có patchim + 은 (VD: 선생님 + 은 → 선생님은)',
      noPatchim: 'Danh từ không có patchim + 는 (VD: 저 + 는 → 저는)'
    },
    examples: [
      { kr: '저는 베트남 사람입니다.', vi: 'Tôi là người Việt Nam.' },
      { kr: '이 책은 아주 재미있어요.', vi: 'Cuốn sách này rất hay.' },
      { kr: '동생은 학생이에요.', vi: 'Em tôi là học sinh.' }
    ],
    tip: 'Khi muốn giới thiệu hoặc nói về một chủ đề mới, hãy luôn nhớ gắn 은/는 vào danh từ nhé!'
  },
  {
    id: 'g1-2',
    level: 1,
    title: 'Đuôi câu danh từ 이에요 / 예요',
    pattern: 'Danh từ + 이에요/예요',
    summary: 'Là / Đuôi câu thân mật lịch sự dùng để định nghĩa danh từ (tương đương "là" trong tiếng Việt).',
    explanation: 'Trong giao tiếp hàng ngày, người Hàn sử dụng 이에요/예요 rất nhiều thay cho 입니다 trong tình huống thân thiện mà vẫn giữ phép lịch sự.',
    formula: {
      hasPatchim: 'Danh từ có patchim + 이에요 (VD: 학생 + 이에요 → 학생이에요)',
      noPatchim: 'Danh từ không patchim + 예요 (VD: 의사 + 예요 → 의사예요)'
    },
    examples: [
      { kr: '저는 학생이에요.', vi: 'Tôi là học sinh.' },
      { kr: '이것은 사과예요.', vi: 'Cái này là quả táo.' },
      { kr: '여기는 우리 집이에요.', vi: 'Đây là nhà của chúng tôi.' }
    ],
    tip: 'Nếu câu hỏi, bạn chỉ cần lên giọng ở cuối câu: "학생이에요?" (Bạn là học sinh phải không?).'
  },
  {
    id: 'g1-3',
    level: 1,
    title: 'Đuôi câu hiện tại thân mật 아요 / 어요 / 해요',
    pattern: 'Động từ/Tính từ + 아요/어요/해요',
    summary: 'Đuôi câu thì hiện tại chuẩn giao tiếp thân mật lịch sự.',
    explanation: 'Chia theo nguyên âm của gốc từ: nếu nguyên âm cuối là ㅏ hoặc ㅗ thì cộng 아요; các nguyên âm còn lại cộng 어요; động từ kết thúc bằng 하다 luôn biến thành 해요.',
    formula: {
      hasPatchim: 'Gốc có ㅏ, ㅗ: + 아요 (VD: 살다 → 살아요, 보다 → 봐요)',
      noPatchim: 'Gốc nguyên âm khác: + 어요 (VD: 먹다 → 먹어요, 마시다 → 마셔요)',
      irregular: ' 하다 → 해요 (VD: 공부하다 → 공부해요, 운동하다 → 운동해요)'
    },
    examples: [
      { kr: '지금 한국어를 공부해요.', vi: 'Bây giờ tôi đang học tiếng Hàn.' },
      { kr: '사과를 먹어요.', vi: 'Tôi ăn táo.' },
      { kr: '영화가 아주 좋아요.', vi: 'Bộ phim rất hay.' }
    ],
    tip: 'Quy tắc "Dương gặp Dương, Âm gặp Âm": ㅏ/ㅗ tươi sáng đi với 아요, còn lại đi với 어요!'
  },
  {
    id: 'g1-4',
    level: 1,
    title: 'Trợ từ tân ngữ 을 / 를',
    pattern: 'Danh từ + 을/를 + Động từ',
    summary: 'Gắn sau danh từ để chỉ đối tượng chịu tác động trực tiếp của hành động.',
    explanation: 'Giúp phân định rõ ràng ai làm gì và làm lên vật gì trong câu tiếng Hàn.',
    formula: {
      hasPatchim: 'Có patchim + 을 (VD: 밥 + 을 → 밥을 먹다: ăn cơm)',
      noPatchim: 'Không patchim + 를 (VD: 커피 + 를 → 커피를 마시다: uống cà phê)'
    },
    examples: [
      { kr: '저는 책을 읽어요.', vi: 'Tôi đọc sách.' },
      { kr: '친구가 노래를 불러요.', vi: 'Bạn tôi hát một bài hát.' }
    ]
  },

  // LEVEL 2
  {
    id: 'g2-1',
    level: 2,
    title: 'Thì quá khứ 았 / 었 / 했어요',
    pattern: 'Động/Tính từ + 았/었/했어요',
    summary: 'Diễn tả hành động hoặc trạng thái đã xảy ra trong quá khứ (Đã...)',
    explanation: 'Tương tự như chia hiện tại 아/어/해요 nhưng thêm ㅆ ở bên dưới để tạo nên thì quá khứ.',
    formula: {
      hasPatchim: 'Nguyên âm ㅏ, ㅗ: + 았어요 (VD: 가다 → 갔어요, 보다 → 봤어요)',
      noPatchim: 'Các nguyên âm khác: + 었어요 (VD: 먹다 → 먹었어요, 마시다 → 마셨어요)',
      irregular: '하다 → 했어요 (VD: 일하다 → 일했어요)'
    },
    examples: [
      { kr: '어제 친구를 만났어요.', vi: 'Hôm qua tôi đã gặp bạn bè.' },
      { kr: '한국 음식을 먹었어요.', vi: 'Tôi đã ăn món ăn Hàn Quốc.' }
    ],
    tip: 'Nhớ các trạng từ chỉ thời gian quá khứ đi kèm như: 어제 (hôm qua), 지난주 (tuần trước), 작년 (năm ngoái).'
  },
  {
    id: 'g2-2',
    level: 2,
    title: 'Thì tương lai & Dự định ~(으)ㄹ 거예요',
    pattern: 'Động từ + (으)ㄹ 거예요',
    summary: 'Sẽ / Dự định làm gì đó trong tương lai.',
    explanation: 'Dùng để diễn tả kế hoạch hoặc dự đoán về một việc sắp xảy ra.',
    formula: {
      hasPatchim: 'Động từ có patchim + 을 거예요 (VD: 먹다 → 먹을 거예요)',
      noPatchim: 'Động từ không patchim + ㄹ 거예요 (VD: 가다 → 갈 거예요)'
    },
    examples: [
      { kr: '내일 서울에 갈 거예요.', vi: 'Ngày mai tôi sẽ đi Seoul.' },
      { kr: '주말에 푹 쉴 거예요.', vi: 'Cuối tuần tôi sẽ nghỉ ngơi thoải mái.' }
    ]
  },
  {
    id: 'g2-3',
    level: 2,
    title: 'Khả năng & Không thể ~(으)ㄹ 수 있다/없다',
    pattern: 'Động từ + (으)ㄹ 수 있다 / 없다',
    summary: 'Có thể / Không thể làm một việc gì đó.',
    explanation: 'Biểu thị năng lực hoặc hoàn cảnh cho phép hay không cho phép thực hiện hành động.',
    formula: {
      hasPatchim: 'Có patchim + 을 수 있다/없다 (VD: 읽다 → 읽을 수 있어요)',
      noPatchim: 'Không patchim + ㄹ 수 있다/없다 (VD: 수영하다 → 수영할 수 있어요)'
    },
    examples: [
      { kr: '저는 한국어를 말할 수 있어요.', vi: 'Tôi có thể nói tiếng Hàn.' },
      { kr: '매운 음식을 먹을 수 없어요.', vi: 'Tôi không thể ăn thức ăn cay.' }
    ]
  },

  // LEVEL 3
  {
    id: 'g3-1',
    level: 3,
    title: 'Dẫn lời gián tiếp câu trần thuật ~다고 하다',
    pattern: 'Động/Tính từ + ~다고 하다',
    summary: 'Nói rằng / Nghe nói rằng... (Trích dẫn gián tiếp)',
    explanation: 'Cấu trúc bắt buộc trong trung cấp để thuật lại lời người khác hoặc thông tin nghe được.',
    formula: {
      hasPatchim: 'Động từ hiện tại: có patchim + ㄴ다고 하다 / không patchim + 는다고 하다',
      noPatchim: 'Tính từ: + 다고 하다 (VD: 바쁘다고 해요)'
    },
    examples: [
      { kr: '민수 씨가 내일 바쁘다고 해요.', vi: 'Min-soo nói rằng ngày mai anh ấy bận.' },
      { kr: '비가 온다고 들었어요.', vi: 'Tôi nghe nói trời sắp mưa.' }
    ]
  },

  // LEVEL 4
  {
    id: 'g4-1',
    level: 4,
    title: 'Ngữ pháp nhượng bộ ~에도 불구하고',
    pattern: 'Danh từ + 에도 불구하고 / Động từ + (으)ם에도 불구하고',
    summary: 'Mặc dù / Bất chấp... nhưng vẫn...',
    explanation: 'Thể hiện một kết quả xảy ra trái ngược với trở ngại hoặc điều kiện đã nêu ra trước đó.',
    formula: {
      hasPatchim: 'Danh từ + 에도 불구하고 (VD: 비에도 불구하고)',
      noPatchim: 'Động/Tính từ + ~(으)ㅁ에도 불구하고 (VD: 어려움에도 불구하고)'
    },
    examples: [
      { kr: '악천후에도 불구하고 비행기가 정시에 출발했다.', vi: 'Bất chấp thời tiết xấu, máy bay vẫn cất cánh đúng giờ.' },
      { kr: '바쁜 일정에도 불구하고 회의에 참석해 주셨습니다.', vi: 'Mặc dù lịch trình bận rộn, quý vị vẫn đến tham dự cuộc họp.' }
    ]
  },

  // LEVEL 5
  {
    id: 'g5-1',
    level: 5,
    title: 'Ngữ pháp điều kiện giả định ~지 않고서는',
    pattern: 'Động từ + ~지 않고서는',
    summary: 'Nếu không... thì không thể...',
    explanation: 'Nhấn mạnh điều kiện tiên quyết mang tính tuyệt đối trong các bài nghị luận và văn bản học thuật.',
    formula: {
      hasPatchim: 'Động từ + 지 않고서는 (VD: 노력하지 않고서는)',
      noPatchim: 'Động từ + 지 않고서는 (VD: 가지 않고서는)'
    },
    examples: [
      { kr: '직접 경험해보지 않고서는 그 고통을 이해할 수 없다.', vi: 'Nếu không tự mình trải nghiệm thì không thể thấu hiểu được nỗi đau đó.' }
    ]
  },

  // LEVEL 6
  {
    id: 'g6-1',
    level: 6,
    title: 'Cấu trúc cổ điển/trang trọng ~ㄹ/을진대',
    pattern: 'Động/Tính từ + ~ㄹ/을진대',
    summary: 'Xét thấy rằng... thì huống chi... (Văn phong bác học)',
    explanation: 'Dùng trong các bài bình luận sâu sắc, văn học hoặc diễn văn cấp cao.',
    formula: {
      hasPatchim: 'Có patchim + 을진대',
      noPatchim: 'Không patchim + ㄹ진대'
    },
    examples: [
      { kr: '스승의 가르침이 이러할진대 어찌 제자가 따르지 않겠는가.', vi: 'Lời dạy của bậc ân sư đã như thế, lẽ nào người học trò lại không noi theo.' }
    ]
  }
];
