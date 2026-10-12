import type {
  SentimentLabel,
  NaiveBayesModel,
  TrainTestResult,
  ConfusionMatrix,
} from './types';

const CLASSES: SentimentLabel[] = ['positif', 'negatif', 'netral'];
const ALPHA = 1.0;

export function trainNaiveBayes(
  documents: { tokens: string[]; label: SentimentLabel }[]
): NaiveBayesModel {
  const classDocCounts: Record<SentimentLabel, number> = {
    positif: 0,
    negatif: 0,
    netral: 0,
  };
  const classTokenCounts: Record<SentimentLabel, Record<string, number>> = {
    positif: {},
    negatif: {},
    netral: {},
  };
  const classTotalTokens: Record<SentimentLabel, number> = {
    positif: 0,
    negatif: 0,
    netral: 0,
  };
  const vocabSet = new Set<string>();

  for (const doc of documents) {
    classDocCounts[doc.label]++;
    for (const token of doc.tokens) {
      vocabSet.add(token);
      classTokenCounts[doc.label][token] =
        (classTokenCounts[doc.label][token] ?? 0) + 1;
      classTotalTokens[doc.label]++;
    }
  }

  const totalDocs = documents.length;
  const priors: Record<SentimentLabel, number> = {
    positif: 0,
    negatif: 0,
    netral: 0,
  };
  for (const c of CLASSES) {
    priors[c] = totalDocs > 0 ? classDocCounts[c] / totalDocs : 0;
  }

  const vocabulary = Array.from(vocabSet);
  const vocabSize = vocabulary.length;

  const featureProbs: Record<SentimentLabel, Record<string, number>> = {
    positif: {},
    negatif: {},
    netral: {},
  };
  for (const c of CLASSES) {
    for (const token of vocabulary) {
      const count = classTokenCounts[c][token] ?? 0;
      featureProbs[c][token] =
        (count + ALPHA) / (classTotalTokens[c] + ALPHA * vocabSize);
    }
  }

  return { classes: CLASSES, priors, featureProbs, vocabulary, vocabSize };
}

export function predictNaiveBayes(
  model: NaiveBayesModel,
  tokens: string[]
): { label: SentimentLabel; probabilities: Record<SentimentLabel, number>; logProbs: Record<SentimentLabel, number> } {
  const logProbs: Record<SentimentLabel, number> = {
    positif: 0,
    negatif: 0,
    netral: 0,
  };

  for (const c of CLASSES) {
    let lp = Math.log(model.priors[c] || 1e-10);
    for (const token of tokens) {
      const fp = model.featureProbs[c][token];
      if (fp !== undefined) {
        lp += Math.log(fp);
      } else {
        // Unseen word: Laplace smoothing default
        lp += Math.log(ALPHA / (0 + ALPHA * model.vocabSize));
      }
    }
    logProbs[c] = lp;
  }

  // Softmax to convert log-probs to probabilities
  const maxLog = Math.max(logProbs.positif, logProbs.negatif, logProbs.netral);
  const expVals: Record<SentimentLabel, number> = {
    positif: Math.exp(logProbs.positif - maxLog),
    negatif: Math.exp(logProbs.negatif - maxLog),
    netral: Math.exp(logProbs.netral - maxLog),
  };
  const sumExp = expVals.positif + expVals.negatif + expVals.netral;

  const probabilities: Record<SentimentLabel, number> = {
    positif: expVals.positif / sumExp,
    negatif: expVals.negatif / sumExp,
    netral: expVals.netral / sumExp,
  };

  let bestLabel: SentimentLabel = 'netral';
  let bestProb = -1;
  for (const c of CLASSES) {
    if (probabilities[c] > bestProb) {
      bestProb = probabilities[c];
      bestLabel = c;
    }
  }

  return { label: bestLabel, probabilities, logProbs };
}

function computeConfusion(
  predictions: { actual: SentimentLabel; predicted: SentimentLabel }[],
  cls: SentimentLabel
): ConfusionMatrix {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (const p of predictions) {
    if (p.predicted === cls && p.actual === cls) tp++;
    else if (p.predicted === cls && p.actual !== cls) fp++;
    else if (p.predicted !== cls && p.actual === cls) fn++;
    else tn++;
  }
  const accuracy = (tp + tn) / (tp + fp + fn + tn || 1);
  const precision = tp / (tp + fp || 1);
  const recall = tp / (tp + fn || 1);
  const f1 = (2 * precision * recall) / (precision + recall || 1);
  return { tp, fp, fn, tn, accuracy, precision, recall, f1 };
}

export function trainTestSplit<T>(arr: T[], ratio: number): { train: T[]; test: T[] } {
  const shuffled = [...arr];
  // Simple deterministic shuffle for reproducibility
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * ((i * 9301 + 49297) % 233280) / 233280);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const splitIdx = Math.floor(shuffled.length * ratio);
  return { train: shuffled.slice(0, splitIdx), test: shuffled.slice(splitIdx) };
}

export function evaluateModel(
  documents: { tokens: string[]; label: SentimentLabel }[],
  ratio = 0.8
): TrainTestResult {
  const { train, test } = trainTestSplit(documents, ratio);
  const model = trainNaiveBayes(train);

  const predictions = test.map((doc) => ({
    actual: doc.label,
    predicted: predictNaiveBayes(model, doc.tokens).label,
  }));

  const confusion: Record<SentimentLabel, ConfusionMatrix> = {
    positif: computeConfusion(predictions, 'positif'),
    negatif: computeConfusion(predictions, 'negatif'),
    netral: computeConfusion(predictions, 'netral'),
  };

  // Overall metrics (macro average)
  const overallAccuracy = predictions.filter((p) => p.actual === p.predicted).length / (predictions.length || 1);
  const overallPrecision = (confusion.positif.precision + confusion.negatif.precision + confusion.netral.precision) / 3;
  const overallRecall = (confusion.positif.recall + confusion.negatif.recall + confusion.netral.recall) / 3;
  const overallF1 = (confusion.positif.f1 + confusion.negatif.f1 + confusion.netral.f1) / 3;

  return {
    confusion,
    overallAccuracy,
    overallPrecision,
    overallRecall,
    overallF1,
    trainSize: train.length,
    testSize: test.length,
    predictions,
  };
}
