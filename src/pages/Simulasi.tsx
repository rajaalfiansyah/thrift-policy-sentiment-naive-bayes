import { useState } from 'react';
import {
  Search, Loader2, CheckCircle, FileText, AlignLeft,
  Tag, Calculator, BrainCircuit, ChevronDown,
} from 'lucide-react';
import { useEngine } from '@/context/EngineContext';
import { SentimentBadge } from '@/components/SentimentBadge';
import { PrintSlip } from '@/components/PrintSlip';
import type { PredictionResult, SentimentLabel } from '@/engine/types';

const LOADING_STEPS = [
  'Case folding & Cleaning...',
  'Normalizing Slang Words...',
  'Removing Stopwords & Stemming Sastrawi...',
  'Calculating TF-IDF Weights...',
  'Naïve Bayes Classification...',
];

const PROB_COLORS: Record<SentimentLabel, string> = {
  positif: 'bg-emerald-500',
  negatif: 'bg-red-500',
  netral: 'bg-amber-500',
};

const PROB_LABELS: Record<SentimentLabel, string> = {
  positif: 'Positif',
  negatif: 'Negatif',
  netral: 'Netral',
};

export function Simulasi() {
  const { predict } = useEngine();
  const [testerName, setTesterName] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'cleaned' | 'tokens' | 'normalized' | 'stemmed' | 'tfidf'>('cleaned');
  const [showSteps, setShowSteps] = useState(true);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(stepInterval);
      const res = predict(inputText);
      setResult(res);
      setLoading(false);
    }, 2200);
  };

  const tabs = [
    { key: 'cleaned' as const, label: 'Cleaned Text', icon: FileText },
    { key: 'tokens' as const, label: 'Tokens Array', icon: AlignLeft },
    { key: 'normalized' as const, label: 'Normalized Tokens', icon: Tag },
    { key: 'stemmed' as const, label: 'Stemmed Result', icon: BrainCircuit },
    { key: 'tfidf' as const, label: 'Top TF-IDF Terms', icon: Calculator },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Mesin Pengujian & Prediksi Sentimen Real-Time
        </h1>
        <p className="mt-1 text-sm text-slate-500">(Multinomial Naïve Bayes)</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
          Masukkan komentar opini terkait penyitaan pakaian bekas (Monza) untuk
          memprediksi kategori sentimen secara instan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left - Form */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Input Komentar</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Nama Penguji
              </label>
              <input
                type="text"
                value={testerName}
                onChange={(e) => setTesterName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Kalimat Opini / Komentar
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                placeholder="Ketik teks komentar... contoh: Saya setuju pemerintah menindak pakaian bekas ilegal demi memajukan industri konveksi lokal!"
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Analisis Sentimen Sekarang
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right - Output */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">Hasil Prediksi</h2>

          {!result && !loading && (
            <div className="flex h-64 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50/30 text-center">
              <BrainCircuit className="mb-3 h-12 w-12 text-slate-300" />
              <p className="text-sm font-medium text-slate-400">
                Sistem siap memproses kalimat komentar...
              </p>
            </div>
          )}

          {loading && (
            <div className="flex h-64 flex-col items-center justify-center">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-emerald-500" />
              <div className="w-full max-w-xs space-y-2">
                {LOADING_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-sm transition ${
                      i <= loadingStep ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    {i < loadingStep ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : i === loadingStep ? (
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-slate-200" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-[fadeIn_0.4s_ease-out]">
              {/* Sentiment Badge Card */}
              <div
                className={`rounded-xl border-2 p-5 text-center ${
                  result.label === 'positif'
                    ? 'border-emerald-200 bg-emerald-50'
                    : result.label === 'negatif'
                    ? 'border-red-200 bg-red-50'
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <p className="mb-2 text-sm font-medium text-slate-500">Hasil Klasifikasi Sentimen</p>
                <SentimentBadge label={result.label} size="lg" />
                <div className="mt-4 space-y-2">
                  {(['positif', 'negatif', 'netral'] as SentimentLabel[]).map((c) => (
                    <div key={c}>
                      <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
                        <span>{PROB_LABELS[c]}</span>
                        <span>{(result.probabilities[c] * 100).toFixed(2)}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${PROB_COLORS[c]} transition-all duration-700`}
                          style={{ width: `${result.probabilities[c] * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-step viewer */}
              <div>
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  <span>Detail Proses Preprocessing & TF-IDF</span>
                  <ChevronDown className={`h-4 w-4 transition ${showSteps ? 'rotate-180' : ''}`} />
                </button>
                {showSteps && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1 border-b border-slate-100">
                      {tabs.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-medium transition ${
                            activeTab === tab.key
                              ? 'border-emerald-500 text-emerald-600'
                              : 'border-transparent text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          <tab.icon className="h-3.5 w-3.5" />
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-slate-50 p-4 text-sm">
                      {activeTab === 'cleaned' && (
                        <p className="text-slate-700">{result.steps.cleaned || '(kosong)'}</p>
                      )}
                      {activeTab === 'tokens' && (
                        <div className="flex flex-wrap gap-1.5">
                          {result.steps.tokens.map((t, i) => (
                            <span key={i} className="rounded bg-sky-100 px-2 py-0.5 text-xs text-sky-700">{t}</span>
                          ))}
                        </div>
                      )}
                      {activeTab === 'normalized' && (
                        <div className="flex flex-wrap gap-1.5">
                          {result.steps.normalizedTokens.map((t, i) => (
                            <span key={i} className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-700">{t}</span>
                          ))}
                        </div>
                      )}
                      {activeTab === 'stemmed' && (
                        <div className="flex flex-wrap gap-1.5">
                          {result.steps.stemmedTokens.map((t, i) => (
                            <span key={i} className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">{t}</span>
                          ))}
                        </div>
                      )}
                      {activeTab === 'tfidf' && (
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 text-left text-slate-500">
                              <th className="py-1">Term</th>
                              <th className="py-1">TF</th>
                              <th className="py-1">IDF</th>
                              <th className="py-1">TF-IDF</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.tfidf.topTerms.map((t) => (
                              <tr key={t.term} className="border-b border-slate-100">
                                <td className="py-1 font-medium text-slate-700">{t.term}</td>
                                <td className="py-1 text-slate-500">{result.tfidf.tf[t.term]}</td>
                                <td className="py-1 text-slate-500">{result.tfidf.idf[t.term].toFixed(4)}</td>
                                <td className="py-1 font-semibold text-emerald-600">{t.weight.toFixed(4)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Print button */}
              <PrintSlip result={result} testerName={testerName} inputText={inputText} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
