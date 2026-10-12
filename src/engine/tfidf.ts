import type { TfidfResult } from './types';

export interface IdfParams {
  totalDocs: number;
  docFrequencies: Record<string, number>;
}

export function computeTf(tokens: string[]): Record<string, number> {
  const tf: Record<string, number> = {};
  for (const t of tokens) {
    tf[t] = (tf[t] ?? 0) + 1;
  }
  return tf;
}

export function computeIdf(
  terms: string[],
  params: IdfParams
): Record<string, number> {
  const idf: Record<string, number> = {};
  const N = params.totalDocs;
  for (const term of terms) {
    const df = params.docFrequencies[term] ?? 0;
    idf[term] = Math.log((1 + N) / (1 + df)) + 1;
  }
  return idf;
}

export function computeTfidf(
  tokens: string[],
  idfParams: IdfParams
): TfidfResult {
  const tf = computeTf(tokens);
  const terms = Object.keys(tf);
  const idf = computeIdf(terms, idfParams);

  const tfidf: Record<string, number> = {};
  for (const term of terms) {
    tfidf[term] = tf[term] * idf[term];
  }

  // L2 normalization
  let norm = 0;
  for (const term of terms) {
    norm += tfidf[term] * tfidf[term];
  }
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (const term of terms) {
      tfidf[term] = tfidf[term] / norm;
    }
  }

  const topTerms = terms
    .map((term) => ({ term, weight: tfidf[term] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 10);

  return { terms, tf, idf, tfidf, topTerms };
}
