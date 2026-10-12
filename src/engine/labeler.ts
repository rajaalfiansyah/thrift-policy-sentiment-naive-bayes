import { POSITIVE_LEXICON, NEGATIVE_LEXICON, NEUTRAL_LEXICON } from './lexicon';
import type { SentimentLabel } from './types';

const positiveSet = new Set(POSITIVE_LEXICON);
const negativeSet = new Set(NEGATIVE_LEXICON);
const neutralSet = new Set(NEUTRAL_LEXICON);

export interface LexiconResult {
  label: SentimentLabel;
  score: number;
  positiveHits: string[];
  negativeHits: string[];
  neutralHits: string[];
}

export function lexiconLabel(tokens: string[]): LexiconResult {
  let pos = 0;
  let neg = 0;
  let neu = 0;
  const positiveHits: string[] = [];
  const negativeHits: string[] = [];
  const neutralHits: string[] = [];

  for (const t of tokens) {
    if (positiveSet.has(t)) {
      pos++;
      positiveHits.push(t);
    }
    if (negativeSet.has(t)) {
      neg++;
      negativeHits.push(t);
    }
    if (neutralSet.has(t)) {
      neu++;
      neutralHits.push(t);
    }
  }

  let label: SentimentLabel;
  let score: number;

  if (pos > neg && pos >= neu) {
    label = 'positif';
    score = pos - neg;
  } else if (neg > pos) {
    label = 'negatif';
    score = neg - pos;
  } else if (neu > 0 && pos === 0 && neg === 0) {
    label = 'netral';
    score = neu;
  } else if (pos === 0 && neg === 0 && neu === 0) {
    label = 'netral';
    score = 0;
  } else {
    label = 'netral';
    score = neu;
  }

  return { label, score, positiveHits, negativeHits, neutralHits };
}
