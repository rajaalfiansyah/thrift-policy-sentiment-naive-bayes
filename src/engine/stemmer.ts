// Lightweight Indonesian stemmer approximating Sastrawi behavior.
// Strips common prefixes and suffixes iteratively.

const PREFIXES = ['me', 'ber', 'di', 'ke', 'pe', 'se', 'te', 'be', 'mem', 'men', 'peng', 'peny', 'per'];
const SUFFIXES = ['kan', 'an', 'i', 'lah', 'kah', 'nya', 'tah', 'pun'];

function removeSuffix(word: string): string {
  for (const suf of SUFFIXES) {
    if (word.length > suf.length + 3 && word.endsWith(suf)) {
      return word.slice(0, -suf.length);
    }
  }
  return word;
}

function removePrefix(word: string): string {
  for (const pre of PREFIXES) {
    if (word.length > pre.length + 3 && word.startsWith(pre)) {
      const stem = word.slice(pre.length);
      if (stem.length >= 3) return stem;
    }
  }
  return word;
}

export function stemWord(word: string): string {
  let w = word;
  // Remove suffix first, then prefix, then suffix again (two-pass)
  w = removeSuffix(w);
  w = removePrefix(w);
  w = removeSuffix(w);
  return w;
}

export function stemTokens(tokens: string[]): string[] {
  return tokens.map(stemWord);
}
