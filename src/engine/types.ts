export type SentimentLabel = 'positif' | 'negatif' | 'netral';

export interface RawRecord {
  id: string;
  platform: 'Instagram' | 'TikTok';
  username: string;
  tanggal: string;
  komentar: string;
}

export interface DatasetRecord extends RawRecord {
  cleanedText: string;
  tokens: string[];
  normalizedTokens: string[];
  stemmedTokens: string[];
  label: SentimentLabel;
  lexiconScore: number;
}

export interface PreprocessingSteps {
  original: string;
  caseFolded: string;
  cleaned: string;
  tokens: string[];
  normalizedTokens: string[];
  noStopwords: string[];
  stemmedTokens: string[];
  finalText: string;
}

export interface TfidfResult {
  terms: string[];
  tf: Record<string, number>;
  idf: Record<string, number>;
  tfidf: Record<string, number>;
  topTerms: { term: string; weight: number }[];
}

export interface PredictionResult {
  label: SentimentLabel;
  probabilities: Record<SentimentLabel, number>;
  logProbs: Record<SentimentLabel, number>;
  steps: PreprocessingSteps;
  tfidf: TfidfResult;
}

export interface ConfusionMatrix {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface TrainTestResult {
  confusion: Record<SentimentLabel, ConfusionMatrix>;
  overallAccuracy: number;
  overallPrecision: number;
  overallRecall: number;
  overallF1: number;
  trainSize: number;
  testSize: number;
  predictions: { actual: SentimentLabel; predicted: SentimentLabel }[];
}

export interface NaiveBayesModel {
  classes: SentimentLabel[];
  priors: Record<SentimentLabel, number>;
  featureProbs: Record<SentimentLabel, Record<string, number>>;
  vocabulary: string[];
  vocabSize: number;
}
