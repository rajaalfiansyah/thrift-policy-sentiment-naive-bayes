import { STOPWORDS_SASTRAWI } from './stopwords';
import { SLANG_DICT } from './slang';
import { stemTokens } from './stemmer';
import type { PreprocessingSteps } from './types';

const stopwordSet = new Set(STOPWORDS_SASTRAWI);

export function caseFold(text: string): string {
  return text.toLowerCase();
}

export function cleanText(text: string): string {
  let t = text;
  // Remove URLs
  t = t.replace(/https?:\/\/\S+/g, '');
  // Remove mentions @username
  t = t.replace(/@\w+/g, '');
  // Remove hashtags #tag
  t = t.replace(/#\w+/g, '');
  // Remove numbers
  t = t.replace(/\d+/g, '');
  // Remove symbols and punctuation (keep letters and spaces)
  t = t.replace(/[^a-zA-Z\s]/g, ' ');
  // Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

export function tokenize(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

export function normalizeSlang(tokens: string[]): string[] {
  return tokens.map((t) => SLANG_DICT[t] ?? t);
}

export function removeStopwords(tokens: string[]): string[] {
  return tokens.filter((t) => !stopwordSet.has(t));
}

export function preprocess(rawText: string): PreprocessingSteps {
  const original = rawText;
  const caseFolded = caseFold(original);
  const cleaned = cleanText(caseFolded);
  const tokens = tokenize(cleaned);
  const normalizedTokens = normalizeSlang(tokens);
  const noStopwords = removeStopwords(normalizedTokens);
  const stemmedTokens = stemTokens(noStopwords);
  const finalText = stemmedTokens.join(' ');

  return {
    original,
    caseFolded,
    cleaned,
    tokens,
    normalizedTokens,
    noStopwords,
    stemmedTokens,
    finalText,
  };
}

export function preprocessToTokens(rawText: string): string[] {
  return preprocess(rawText).stemmedTokens;
}
