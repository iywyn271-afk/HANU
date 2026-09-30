/**
 * Standard Revised Romanization of Korean helper for automatic Romanization suggestions
 */

const CHOSEONG = [
  'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'
];

const JUNGSEONG = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'
];

const JONGSEONG = [
  '', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'p', 't', 't', 'p', 'h', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 'h'
];

export function romanizeKorean(text: string): string {
  if (!text) return '';

  const syllables: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    // Check if within Hangul syllables range AC00-D7A3
    if (code >= 0xac00 && code <= 0xd7a3) {
      const syllableIndex = code - 0xac00;
      const choIndex = Math.floor(syllableIndex / (21 * 28));
      const jungIndex = Math.floor((syllableIndex % (21 * 28)) / 28);
      const jongIndex = syllableIndex % 28;

      let cho = CHOSEONG[choIndex] || '';
      // If at start of word or after vowel and is 'r', sound might be 'r' or 'l'
      const jung = JUNGSEONG[jungIndex] || '';
      const jong = JONGSEONG[jongIndex] || '';

      // Standardize cho 'r' vs 'l' or 'g' vs 'k'
      if (choIndex === 5) {
        // ㄹ
        cho = 'r';
      }

      syllables.push(cho + jung + jong);
    } else if (text[i] === ' ') {
      syllables.push(' ');
    } else {
      syllables.push(text[i]);
    }
  }

  // Join syllables with hyphen for multi-syllable Korean words (standard study format e.g., an-nyeong-ha-se-yo)
  const result: string[] = [];
  let currentWord: string[] = [];

  for (const s of syllables) {
    if (s === ' ') {
      if (currentWord.length > 0) {
        result.push(currentWord.join('-'));
        currentWord = [];
      }
      result.push(' ');
    } else {
      currentWord.push(s);
    }
  }

  if (currentWord.length > 0) {
    result.push(currentWord.join('-'));
  }

  return result.join('').replace(/\s+/g, ' ').trim();
}
