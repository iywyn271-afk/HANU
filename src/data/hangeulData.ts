import { HangeulCharacter } from '../types';

export const BASIC_VOWELS: HangeulCharacter[] = [
  { char: 'ㅏ', name: 'A', romanization: 'a', vietnameseSound: 'a (như trong "ba")', type: 'basic-vowel', exampleWord: { kr: '아이', vi: 'em bé', rom: 'a-i' }, pronunciationTip: 'Mở miệng rộng tự nhiên, phát âm rõ âm "a".' },
  { char: 'ㅑ', name: 'YA', romanization: 'ya', vietnameseSound: 'ya (như "da" miền Nam)', type: 'basic-vowel', exampleWord: { kr: '야구', vi: 'bóng chày', rom: 'ya-gu' }, pronunciationTip: 'Lướt nhanh từ "i" sang "a".' },
  { char: 'ㅓ', name: 'EO', romanization: 'eo', vietnameseSound: 'ơ / o (khẩu hình tròn hơn "ơ")', type: 'basic-vowel', exampleWord: { kr: '어머니', vi: 'mẹ', rom: 'eo-meo-ni' }, pronunciationTip: 'Mở miệng vừa phải, lưỡi hạ thấp.' },
  { char: 'ㅕ', name: 'YEO', romanization: 'yeo', vietnameseSound: 'yơ (lướt i sang ơ)', type: 'basic-vowel', exampleWord: { kr: '여름', vi: 'mùa hè', rom: 'yeo-reum' }, pronunciationTip: 'Bắt đầu từ âm "i" chuyển nhanh sang "ơ".' },
  { char: 'ㅗ', name: 'O', romanization: 'o', vietnameseSound: 'ô (chu môi tròn)', type: 'basic-vowel', exampleWord: { kr: '오이', vi: 'dưa chuột', rom: 'o-i' }, pronunciationTip: 'Chu môi tròn hẳn về phía trước.' },
  { char: 'ㅛ', name: 'YO', romanization: 'yo', vietnameseSound: 'y-ô', type: 'basic-vowel', exampleWord: { kr: '요리', vi: 'nấu ăn', rom: 'yo-ri' }, pronunciationTip: 'Âm lướt từ "i" sang "ô" chu môi.' },
  { char: 'ㅜ', name: 'U', romanization: 'u', vietnameseSound: 'u (chu môi)', type: 'basic-vowel', exampleWord: { kr: '우유', vi: 'sữa', rom: 'u-yu' }, pronunciationTip: 'Chu môi nhỏ, phát âm âm "u" sâu.' },
  { char: 'ㅠ', name: 'YU', romanization: 'yu', vietnameseSound: 'y-u', type: 'basic-vowel', exampleWord: { kr: '유리', vi: 'thủy tinh / kính', rom: 'yu-ri' }, pronunciationTip: 'Lướt nhanh từ "i" sang "u".' },
  { char: 'ㅡ', name: 'EU', romanization: 'eu', vietnameseSound: 'ư (kéo mép môi sang hai bên)', type: 'basic-vowel', exampleWord: { kr: '으뜸', vi: 'hàng đầu, số một', rom: 'eu-tteum' }, pronunciationTip: 'Không chu môi, dẹt môi sang hai bên.' },
  { char: 'ㅣ', name: 'I', romanization: 'i', vietnameseSound: 'i', type: 'basic-vowel', exampleWord: { kr: '이름', vi: 'tên', rom: 'i-reum' }, pronunciationTip: 'Mỉm cười nhẹ khi phát âm âm "i".' }
];

export const COMPOUND_VOWELS: HangeulCharacter[] = [
  { char: 'ㅐ', name: 'AE', romanization: 'ae', vietnameseSound: 'e / ae', type: 'compound-vowel', exampleWord: { kr: '새', vi: 'con chim', rom: 'sae' } },
  { char: 'ㅒ', name: 'YAE', romanization: 'yae', vietnameseSound: 'ye', type: 'compound-vowel', exampleWord: { kr: '얘기', vi: 'câu chuyện', rom: 'yae-gi' } },
  { char: 'ㅔ', name: 'E', romanization: 'e', vietnameseSound: 'ê / e', type: 'compound-vowel', exampleWord: { kr: '게', vi: 'con cua', rom: 'ge' } },
  { char: 'ㅖ', name: 'YE', romanization: 'ye', vietnameseSound: 'yê', type: 'compound-vowel', exampleWord: { kr: '시계', vi: 'đồng hồ', rom: 'si-gye' } },
  { char: 'ㅘ', name: 'WA', romanization: 'wa', vietnameseSound: 'oa (ㅗ + ㅏ)', type: 'compound-vowel', exampleWord: { kr: '과자', vi: 'bánh kẹo', rom: 'gwa-ja' } },
  { char: 'ㅙ', name: 'WAE', romanization: 'wae', vietnameseSound: 'oe / oe (ㅗ + ㅐ)', type: 'compound-vowel', exampleWord: { kr: '왜', vi: 'tại sao', rom: 'wae' } },
  { char: 'ㅚ', name: 'OE', romanization: 'oe', vietnameseSound: 'uê (ㅗ + ㅣ)', type: 'compound-vowel', exampleWord: { kr: '회사', vi: 'công ty', rom: 'hoe-sa' } },
  { char: 'ㅝ', name: 'WEO', romanization: 'weo', vietnameseSound: 'uơ (ㅜ + ㅓ)', type: 'compound-vowel', exampleWord: { kr: '원', vi: 'đồng Won Hàn Quốc', rom: 'won' } },
  { char: 'ㅞ', name: 'WE', romanization: 'we', vietnameseSound: 'uê (ㅜ + ㅔ)', type: 'compound-vowel', exampleWord: { kr: '웨이터', vi: 'bồi bàn', rom: 'we-i-teo' } },
  { char: 'ㅟ', name: 'WI', romanization: 'wi', vietnameseSound: 'uy / wi (ㅜ + ㅣ)', type: 'compound-vowel', exampleWord: { kr: '귀', vi: 'tai', rom: 'gwi' } },
  { char: 'ㅢ', name: 'UI', romanization: 'ui', vietnameseSound: 'ưi (ㅡ + ㅣ)', type: 'compound-vowel', exampleWord: { kr: '의사', vi: 'bác sĩ', rom: 'ui-sa' } }
];

export const BASIC_CONSONANTS: HangeulCharacter[] = [
  { char: 'ㄱ', name: 'Giyeok (기역)', romanization: 'g / k', vietnameseSound: 'k (đầu từ) hoặc g (giữa từ)', type: 'basic-consonant', exampleWord: { kr: '가방', vi: 'cặp sách, túi xách', rom: 'ga-bang' } },
  { char: 'ㄴ', name: 'Nieun (니은)', romanization: 'n', vietnameseSound: 'n', type: 'basic-consonant', exampleWord: { kr: '나무', vi: 'cây cối', rom: 'na-mu' } },
  { char: 'ㄷ', name: 'Digeut (디귿)', romanization: 'd / t', vietnameseSound: 't (đầu từ) hoặc đ (giữa từ)', type: 'basic-consonant', exampleWord: { kr: '다리', vi: 'chân / cây cầu', rom: 'da-ri' } },
  { char: 'ㄹ', name: 'Rieul (리을)', romanization: 'r / l', vietnameseSound: 'r (đầu từ) hoặc l (cuối âm)', type: 'basic-consonant', exampleWord: { kr: '라디오', vi: 'đài radio', rom: 'ra-di-o' } },
  { char: 'ㅁ', name: 'Mieum (미음)', romanization: 'm', vietnameseSound: 'm', type: 'basic-consonant', exampleWord: { kr: '모자', vi: 'mũ, nón', rom: 'mo-ja' } },
  { char: 'ㅂ', name: 'Bieup (비읍)', romanization: 'b / p', vietnameseSound: 'p nhẹ (đầu từ) hoặc b (giữa từ)', type: 'basic-consonant', exampleWord: { kr: '바지', vi: 'quần', rom: 'ba-ji' } },
  { char: 'ㅅ', name: 'Siot (시옷)', romanization: 's', vietnameseSound: 's (x nhẹ)', type: 'basic-consonant', exampleWord: { kr: '사과', vi: 'quả táo / xin lỗi', rom: 'sa-gwa' } },
  { char: 'ㅇ', name: 'Ieung (이응)', romanization: 'ng (câm khi đứng đầu)', type: 'basic-consonant', vietnameseSound: 'câm khi đứng đầu, "ng" khi làm patchim', exampleWord: { kr: '안녕', vi: 'xin chào', rom: 'an-nyeong' } },
  { char: 'ㅈ', name: 'Jieut (지읒)', romanization: 'j / ch', vietnameseSound: 'ch / gi (nhẹ)', type: 'basic-consonant', exampleWord: { kr: '지도', vi: 'bản đồ', rom: 'ji-do' } },
  { char: 'ㅊ', name: 'Chieut (치읓)', romanization: 'ch (bật hơi)', vietnameseSound: 'ch (bật hơi mạnh)', type: 'basic-consonant', exampleWord: { kr: '친구', vi: 'bạn bè', rom: 'chin-gu' } },
  { char: 'ㅋ', name: 'Kieuk (키읔)', romanization: 'k (bật hơi)', vietnameseSound: 'kh / k bật hơi mạnh', type: 'basic-consonant', exampleWord: { kr: '커피', vi: 'cà phê', rom: 'keo-pi' } },
  { char: 'ㅌ', name: 'Tieut (티읕)', romanization: 't (bật hơi)', vietnameseSound: 'th / t bật hơi mạnh', type: 'basic-consonant', exampleWord: { kr: '토마토', vi: 'cà chua', rom: 'to-ma-to' } },
  { char: 'ㅍ', name: 'Pieup (피읖)', romanization: 'p (bật hơi)', vietnameseSound: 'ph / p bật hơi mạnh', type: 'basic-consonant', exampleWord: { kr: '피자', vi: 'bánh pizza', rom: 'pi-ja' } },
  { char: 'ㅎ', name: 'Hieut (히읗)', romanization: 'h', vietnameseSound: 'h', type: 'basic-consonant', exampleWord: { kr: '하늘', vi: 'bầu trời', rom: 'ha-neul' } }
];

export const DOUBLE_CONSONANTS: HangeulCharacter[] = [
  { char: 'ㄲ', name: 'Ssang-giyeok', romanization: 'kk', vietnameseSound: 'c/k căng chặt', type: 'double-consonant', exampleWord: { kr: '꼬리', vi: 'cái đuôi', rom: 'kko-ri' } },
  { char: 'ㄸ', name: 'Ssang-digeut', romanization: 'tt', vietnameseSound: 't căng chặt', type: 'double-consonant', exampleWord: { kr: '딸기', vi: 'dâu tây', rom: 'ttal-gi' } },
  { char: 'ㅃ', name: 'Ssang-bieup', romanization: 'pp', vietnameseSound: 'p căng chặt', type: 'double-consonant', exampleWord: { kr: '빵', vi: 'bánh mì', rom: 'ppang' } },
  { char: 'ㅆ', name: 'Ssang-siot', romanization: 'ss', vietnameseSound: 's/x xì hơi căng', type: 'double-consonant', exampleWord: { kr: '쓰다', vi: 'viết / đắng', rom: 'sseu-da' } },
  { char: 'ㅉ', name: 'Ssang-jieut', romanization: 'jj', vietnameseSound: 'ch căng giọng', type: 'double-consonant', exampleWord: { kr: '짜다', vi: 'mặn', rom: 'jja-da' } }
];

export interface PatchimGroup {
  standardSound: string;
  representedBy: string[];
  vietnameseEquivalent: string;
  ruleTip: string;
  examples: { kr: string; rom: string; vi: string; note: string }[];
}

export const PATCHIM_GROUPS: PatchimGroup[] = [
  {
    standardSound: '[ㄱ]',
    representedBy: ['ㄱ', 'ㅋ', 'ㄲ', 'ㄳ', 'ㄺ'],
    vietnameseEquivalent: 'Âm "c / k" (ngậm miệng chặn hơi lại)',
    ruleTip: 'Khi làm phụ âm cuối, các chữ này đều phát âm về âm ngắt [ㄱ].',
    examples: [
      { kr: '책', rom: 'chaek', vi: 'quyển sách', note: 'patchim ㄱ phát âm [k]' },
      { kr: '부엌', rom: 'bu-eok', vi: 'nhà bếp', note: 'patchim ㅋ phát âm [k]' },
      { kr: '밖', rom: 'bak', vi: 'bên ngoài', note: 'patchim ㄲ phát âm [k]' }
    ]
  },
  {
    standardSound: '[ㄴ]',
    representedBy: ['ㄴ', 'ㄵ', 'ㄶ'],
    vietnameseEquivalent: 'Âm "n" (đầu lưỡi chạm vòm họng)',
    ruleTip: 'Giữ luồng hơi nhẹ qua mũi như âm "n" tiếng Việt.',
    examples: [
      { kr: '눈', rom: 'nun', vi: 'mắt / tuyết', note: 'patchim ㄴ phát âm [n]' },
      { kr: '문', rom: 'mun', vi: 'cửa', note: 'patchim ㄴ phát âm [n]' }
    ]
  },
  {
    standardSound: '[ㄷ]',
    representedBy: ['ㄷ', 'ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅎ'],
    vietnameseEquivalent: 'Âm "t" (ngắt hơi tức thì)',
    ruleTip: 'Nhóm có nhiều đại diện nhất! Bất kể ㅅ, ㅆ hay ㅈ ở cuối đều ngắt thành [t].',
    examples: [
      { kr: '옷', rom: 'ot', vi: 'quần áo', note: 'ㅅ làm patchim đọc thành [t]' },
      { kr: '꽃', rom: 'kkot', vi: 'bông hoa', note: 'ㅊ làm patchim đọc thành [t]' },
      { kr: '낮', rom: 'nat', vi: 'ban ngày', note: 'ㅈ làm patchim đọc thành [t]' }
    ]
  },
  {
    standardSound: '[ㄹ]',
    representedBy: ['ㄹ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㅀ'],
    vietnameseEquivalent: 'Âm "l" (uốn cong đầu lưỡi chạm lợi trên)',
    ruleTip: 'Uốn lưỡi nhẹ, không để rung lưỡi.',
    examples: [
      { kr: '달', rom: 'dal', vi: 'mặt trăng / tháng', note: 'patchim ㄹ đọc uốn lưỡi [l]' },
      { kr: '물', rom: 'mul', vi: 'nước', note: 'patchim ㄹ đọc [l]' }
    ]
  },
  {
    standardSound: '[ㅁ]',
    representedBy: ['ㅁ', 'ㄻ'],
    vietnameseEquivalent: 'Âm "m" (ngậm hai môi)',
    ruleTip: 'Khép chặt hai môi lại để luồng khí qua mũi.',
    examples: [
      { kr: '밤', rom: 'bam', vi: 'ban đêm / hạt dẻ', note: 'patchim ㅁ đọc [m]' },
      { kr: '엄마', rom: 'eom-ma', vi: 'mẹ', note: 'patchim ㅁ đọc [m]' }
    ]
  },
  {
    standardSound: '[ㅂ]',
    representedBy: ['ㅂ', 'ㅍ', 'ㅄ', 'ㄿ'],
    vietnameseEquivalent: 'Âm "p" (ngậm môi chặn hơi)',
    ruleTip: 'Khép môi ngắt hơi, giống như âm "p" cuối trong tiếng Việt ("đẹp").',
    examples: [
      { kr: '밥', rom: 'bap', vi: 'cơm', note: 'patchim ㅂ đọc ngắt môi [p]' },
      { kr: '숲', rom: 'sup', vi: 'rừng cây', note: 'patchim ㅍ đọc thành [p]' }
    ]
  },
  {
    standardSound: '[ㅇ]',
    representedBy: ['ㅇ'],
    vietnameseEquivalent: 'Âm "ng" (phát âm qua mũi)',
    ruleTip: 'Khi đứng đầu âm tiết ㅇ là âm câm, nhưng khi làm patchim thì đọc là [ng].',
    examples: [
      { kr: '강', rom: 'gang', vi: 'con sông', note: 'patchim ㅇ đọc thành [ng]' },
      { kr: '사랑', rom: 'sa-rang', vi: 'tình yêu', note: 'patchim ㅇ đọc thành [ng]' }
    ]
  }
];

// Utility to assemble Unicode Hangeul syllable:
// Syllable = 0xAC00 + (initialIndex * 21 + vowelIndex) * 28 + finalIndex
export const INITIAL_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const VOWEL_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
export const FINAL_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

export function composeHangul(initialIdx: number, vowelIdx: number, finalIdx: number = 0): string {
  if (initialIdx < 0 || vowelIdx < 0) return '';
  const code = 0xAC00 + (initialIdx * 21 + vowelIdx) * 28 + finalIdx;
  return String.fromCharCode(code);
}
