import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { generateDataset } from '@/engine/dataset';
import { preprocess } from '@/engine/preprocessing';
import { lexiconLabel } from '@/engine/labeler';
import { trainNaiveBayes, predictNaiveBayes, evaluateModel } from '@/engine/naiveBayes';
import { computeTfidf } from '@/engine/tfidf';
import type {
  DatasetRecord,
  RawRecord,
  SentimentLabel,
  NaiveBayesModel,
  TrainTestResult,
  PredictionResult,
  TfidfResult,
  PreprocessingSteps,
} from '@/engine/types';

interface EngineState {
  dataset: DatasetRecord[];
  model: NaiveBayesModel;
  evaluation: TrainTestResult;
  distribution: Record<SentimentLabel, number>;
  docFrequencies: Record<string, number>;
  totalDocs: number;
  predict: (text: string) => PredictionResult;
  relabelAll: () => void;
  updateLabel: (id: string, label: SentimentLabel) => void;
  deleteRecord: (id: string) => void;
  addRecords: (records: RawRecord[]) => void;
  getRecord: (id: string) => DatasetRecord | undefined;
}

const EngineContext = createContext<EngineState | undefined>(undefined);

function buildDataset(raw: RawRecord[]): DatasetRecord[] {
  return raw.map((r) => {
    const steps = preprocess(r.komentar);
    const lex = lexiconLabel(steps.stemmedTokens);
    return {
      ...r,
      cleanedText: steps.cleaned,
      tokens: steps.tokens,
      normalizedTokens: steps.normalizedTokens,
      stemmedTokens: steps.stemmedTokens,
      label: lex.label,
      lexiconScore: lex.score,
    };
  });
}

function buildDocFrequencies(records: DatasetRecord[]): Record<string, number> {
  const df: Record<string, number> = {};
  for (const r of records) {
    const seen = new Set(r.stemmedTokens);
    for (const t of seen) {
      df[t] = (df[t] ?? 0) + 1;
    }
  }
  return df;
}

export function EngineProvider({ children }: { children: ReactNode }) {
  const initialRaw = useMemo(() => generateDataset(500), []);
  const [dataset, setDataset] = useState<DatasetRecord[]>(() => buildDataset(initialRaw));

  const docFrequencies = useMemo(() => buildDocFrequencies(dataset), [dataset]);
  const totalDocs = dataset.length;

  const model = useMemo(() => {
    return trainNaiveBayes(
      dataset.map((r) => ({ tokens: r.stemmedTokens, label: r.label }))
    );
  }, [dataset]);

  const evaluation = useMemo(() => {
    return evaluateModel(
      dataset.map((r) => ({ tokens: r.stemmedTokens, label: r.label })),
      0.8
    );
  }, [dataset]);

  const distribution = useMemo(() => {
    const d: Record<SentimentLabel, number> = { positif: 0, negatif: 0, netral: 0 };
    for (const r of dataset) d[r.label]++;
    return d;
  }, [dataset]);

  const predict = (text: string): PredictionResult => {
    const steps: PreprocessingSteps = preprocess(text);
    const tfidf: TfidfResult = computeTfidf(steps.stemmedTokens, {
      totalDocs,
      docFrequencies,
    });
    const nb = predictNaiveBayes(model, steps.stemmedTokens);
    return {
      label: nb.label,
      probabilities: nb.probabilities,
      logProbs: nb.logProbs,
      steps,
      tfidf,
    };
  };

  const relabelAll = () => {
    setDataset((prev) =>
      prev.map((r) => {
        const lex = lexiconLabel(r.stemmedTokens);
        return { ...r, label: lex.label, lexiconScore: lex.score };
      })
    );
  };

  const updateLabel = (id: string, label: SentimentLabel) => {
    setDataset((prev) =>
      prev.map((r) => (r.id === id ? { ...r, label } : r))
    );
  };

  const deleteRecord = (id: string) => {
    setDataset((prev) => prev.filter((r) => r.id !== id));
  };

  const addRecords = (records: RawRecord[]) => {
    const newRecords = buildDataset(records);
    setDataset((prev) => [...prev, ...newRecords]);
  };

  const getRecord = (id: string) => dataset.find((r) => r.id === id);

  return (
    <EngineContext.Provider
      value={{
        dataset,
        model,
        evaluation,
        distribution,
        docFrequencies,
        totalDocs,
        predict,
        relabelAll,
        updateLabel,
        deleteRecord,
        addRecords,
        getRecord,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine(): EngineState {
  const ctx = useContext(EngineContext);
  if (!ctx) throw new Error('useEngine must be used within EngineProvider');
  return ctx;
}
