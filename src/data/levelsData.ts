import { LevelInfo } from '../types';

export const LEVELS_DATA: LevelInfo[] = [
  {
    level: 1,
    name: 'Cấp độ 1 (Sơ cấp 1 - TOPIK I)',
    subTitle: 'Nhập môn Hangeul & Giao tiếp cơ bản hàng ngày',
    badge: 'Mầm Xanh (초급 1)',
    targetAudience: 'Người mới bắt đầu hoàn toàn, chưa từng học tiếng Hàn hoặc mới biết mặt chữ',
    vocabTarget: 800,
    grammarTarget: 50,
    description: 'Nắm vững bảng chữ cái Hangeul, cách ghép vần, chào hỏi, tự giới thiệu bản thân, mua sắm cơ bản, gọi món ăn và hỏi giờ giấc.',
    keyTopics: [
      'Bảng chữ cái Hangeul & Nguyên tắc ghép âm',
      'Chào hỏi, Giới thiệu tên tuổi, Quốc tịch, Nghề nghiệp',
      'Đại từ chỉ định (이/그/저), Số đếm Hàn - Thuần Hàn',
      'Hỏi giá, Mua hàng, Địa điểm và Phương hướng',
      'Thời gian, Ngày tháng, Thời tiết thường nhật'
    ],
    skillsGained: [
      'Đọc và viết bảng chữ cái Hangeul lưu loát',
      'Tự giới thiệu bản thân bằng 5-8 câu tự tin',
      'Giao tiếp cơ bản khi đi du lịch hoặc mua sắm tại Hàn Quốc',
      'Hiểu và phản xạ các câu chào hỏi lịch sự'
    ]
  },
  {
    level: 2,
    name: 'Cấp độ 2 (Sơ cấp 2 - TOPIK I)',
    subTitle: 'Đời sống sinh hoạt & Phản xạ tự nhiên',
    badge: 'Búp Sen (초급 2)',
    targetAudience: 'Học sinh, sinh viên, người chuẩn bị du học hoặc xuất khẩu lao động bước đầu',
    vocabTarget: 1500,
    grammarTarget: 90,
    description: 'Nói về sở thích, kế hoạch cuối tuần, kinh nghiệm quá khứ, gọi điện thoại, hẹn gặp, đặt phòng, sử dụng giao thông công cộng.',
    keyTopics: [
      'Thì quá khứ, tương lai và dự định (~(으)ㄹ 거예요)',
      'Hẹn hò, Mời mọc và Từ chối lịch sự (~(으)ㄹ까요?)',
      'Giao thông công cộng (xe buýt, tàu điện ngầm ngầm Seoul)',
      'Tại ngân hàng, bưu điện, phòng khám y tế',
      'Bày tỏ cảm xúc, lý do và nguyên nhân (~(으)니까, ~아/어서)'
    ],
    skillsGained: [
      'Dễ dàng sinh hoạt độc lập khi sang Hàn Quốc',
      'Kể lại một chuyến đi hoặc sự việc trong quá khứ trôi chảy',
      'Đặt vé, gọi đồ ăn online và hỏi thăm bạn bè bản xứ',
      'Đủ điều kiện đạt chứng chỉ TOPIK Level 2'
    ]
  },
  {
    level: 3,
    name: 'Cấp độ 3 (Trung cấp 1 - TOPIK II)',
    subTitle: 'Giao tiếp công việc & Văn hóa Hàn Quốc',
    badge: 'Hoa Đào (중급 1)',
    targetAudience: 'Người đi làm tại công ty Hàn Quốc, du học sinh hệ tiếng lên chuyên ngành',
    vocabTarget: 3000,
    grammarTarget: 140,
    description: 'Bắt đầu dùng thể gián tiếp, kính ngữ nâng cao, giải thích sự việc chi tiết, trao đổi công việc hành chính cơ bản và tìm hiểu văn hóa sâu sắc.',
    keyTopics: [
      'Dẫn lời gián tiếp (Danto/Nyueto: ~다고 하다, ~냐고 하다)',
      'Kính ngữ đặc biệt và cách xưng hô chuẩn mực công sở',
      'Mô tả ngoại hình, tính cách và cảm xúc tinh tế',
      'Phong tục lễ tết Hàn Quốc (Chuseok, Seollal)',
      'Viết đoạn văn ngắn 150-300 từ mạch lạc'
    ],
    skillsGained: [
      'Đọc hiểu các thông báo, tin tức đời sống thường nhật',
      'Phỏng vấn xin việc bằng tiếng Hàn ở mức căn bản',
      'Xem phim và video Hàn Quốc nắm được 60-70% ý chính không cần phụ đề',
      'Đủ điều kiện xét tuyển học bổng du học đại học Hàn Quốc'
    ]
  },
  {
    level: 4,
    name: 'Cấp độ 4 (Trung cấp 2 - TOPIK II)',
    subTitle: 'Thảo luận xã hội & Chuyên ngành căn bản',
    badge: 'Trúc Xanh (중급 2)',
    targetAudience: 'Sinh viên theo học đại học tại Hàn, nhân viên văn phòng làm việc trực tiếp với sếp Hàn',
    vocabTarget: 4500,
    grammarTarget: 190,
    description: 'Đọc hiểu báo chí, bàn luận về các vấn đề xã hội, môi trường, kinh tế vi mô, viết bài luận thể hiện quan điểm cá nhân.',
    keyTopics: [
      'Ngữ pháp so sánh và đối chiếu nâng cao',
      'Các hiện tượng xã hội (việc làm, giáo dục, công nghệ)',
      'Kỹ năng viết luận TOPIK câu 53 và 54',
      'Thành ngữ (Sokdam) và từ Hán - Hàn (Hanja) thông dụng',
      'Đàm phán công việc và viết email chuyên nghiệp'
    ],
    skillsGained: [
      'Giao tiếp trôi chảy tự nhiên với người bản xứ trong mọi tình huống',
      'Hiểu sâu sắc văn hóa ứng xử và tâm lý người Hàn',
      'Đạt chuẩn đầu ra tốt nghiệp nhiều trường đại học hàng đầu tại Hàn'
    ]
  },
  {
    level: 5,
    name: 'Cấp độ 5 (Cao cấp 1 - TOPIK II)',
    subTitle: 'Nghiên cứu học thuật & Thương mại chuyên sâu',
    badge: 'Mai Vàng (고급 1)',
    targetAudience: 'Phiên dịch viên, du học sinh thạc sĩ/tiến sĩ, chuyên viên đối ngoại',
    vocabTarget: 6500,
    grammarTarget: 240,
    description: 'Hiểu các bài phát biểu, hội thảo chuyên môn, báo chí thời sự phức tạp, phân tích các tài liệu học thuật và chính sách.',
    keyTopics: [
      'Kinh tế, Chính trị, Khoa học công nghệ và Triết học',
      'Hán tự nâng cao (Tứ tự thành ngữ 사자성어)',
      'Kỹ năng thuyết trình học thuật chuyên nghiệp',
      'Phân tích biểu đồ và số liệu thống kê vĩ mô'
    ],
    skillsGained: [
      'Khả năng biên dịch và dịch nói trong các cuộc họp thương mại',
      'Đọc hiểu tài liệu chuyên ngành nhanh chóng',
      'Phản xạ tranh luận sắc bén về các chủ đề chuyên sâu'
    ]
  },
  {
    level: 6,
    name: 'Cấp độ 6 (Cao cấp 2 - TOPIK II)',
    subTitle: 'Bản ngữ xuất sắc & Nghệ thuật ngôn từ',
    badge: 'Vương Miện Ngọc (고급 2)',
    targetAudience: 'Biên phiên dịch viên cấp cao, giảng viên tiếng Hàn, chuyên gia ngôn ngữ',
    vocabTarget: 8000,
    grammarTarget: 300,
    description: 'Cấp độ cao nhất của người học tiếng Hàn. Sử dụng tiếng Hàn tinh tế, sắc thái chuẩn như người bản xứ trong cả văn nói, văn viết học thuật và văn học nghệ thuật.',
    keyTopics: [
      'Văn học cổ điển và hiện đại Hàn Quốc',
      'Thuật ngữ luật pháp, ngoại giao quốc tế và tài chính cao cấp',
      'Nghệ thuật đàm phán cấp cao và hùng biện',
      'Cảm thụ sắc thái vi tế của ngôn từ Hàn Quốc'
    ],
    skillsGained: [
      'Sử dụng tiếng Hàn tương đương người bản xứ có trình độ đại học',
      'Biên dịch các tác phẩm văn học hoặc tài liệu pháp lý',
      'Đạt chứng chỉ TOPIK II Cấp độ 6 tuyệt đối'
    ]
  }
];
