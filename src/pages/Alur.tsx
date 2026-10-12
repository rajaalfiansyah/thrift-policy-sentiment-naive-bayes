import { useState } from 'react';
import {
  AlignLeft, Tag, Calculator, BrainCircuit, CheckCircle,
  FileText, BookOpen, Database,
} from 'lucide-react';
import { useEngine } from '@/context/EngineContext';
import { POSITIVE_LEXICON, NEGATIVE_LEXICON } from '@/engine/lexicon';

const TABS = [
  { key: 'preprocessing', label: 'Preprocessing', icon: AlignLeft },
  { key: 'lexicon', label: 'Lexicon Dictionary', icon: Tag },
  { key: 'tfidf', label: 'Formula TF-IDF', icon: Calculator },
  { key: 'naivebayes', label: 'Algoritma Naïve Bayes', icon: BrainCircuit },
  { key: 'confusion', label: 'Confusion Matrix', icon: CheckCircle },
];

const PREPROCESSING_STEPS = [
  {
    name: 'Case Folding',
    desc: 'Mengubah seluruh teks menjadi huruf kecil (lowercase) untuk keseragaman.',
    example: '"Saya SETUJU Pakaian Bekas" → "saya setuju pakaian bekas"',
  },
  {
    name: 'Cleaning',
    desc: 'Menghapus URL, mention (@username), hashtag (#tag), angka, simbol, dan tanda baca.',
    example: '"@user kebijakan monza #protes https://x.com" → "kebijakan monza"',
  },
  {
    name: 'Tokenizing',
    desc: 'Memecah teks menjadi array kata-kata (token) terpisah.',
    example: '"saya setuju monza" → ["saya", "setuju", "monza"]',
  },
  {
    name: 'Normalization',
    desc: 'Mengubah kata slang/gaul menjadi kata baku menggunakan kamus slang (gk→tidak, bgt→banget).',
    example: '["gk", "setuju", "bgt"] → ["tidak", "setuju", "banget"]',
  },
  {
    name: 'Stopword Removal',
    desc: 'Menghapus kata-kata tidak bermakna (stopword) bahasa Indonesia menggunakan daftar Sastrawi.',
    example: '["yang", "setuju", "kebijakan"] → ["setuju", "kebijakan"]',
  },
  {
    name: 'Stemming Sastrawi',
    desc: 'Mengubah kata ke bentuk dasarnya dengan menghapus imbuhan (prefiks & sufiks).',
    example: '["menindak", "pakaian"] → ["indak", "paka"]',
  },
];

export function Alur() {
  const { evaluation } = useEngine();
  const [activeTab, setActiveTab] = useState('preprocessing');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Landasan Teori, Formula Matematika & Metrik Evaluasi
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Penjelasan lengkap pipeline NLP, TF-IDF, dan algoritma Multinomial Naïve Bayes
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-100">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        {activeTab === 'preprocessing' && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <AlignLeft className="h-5 w-5 text-emerald-600" />
              Pipeline Preprocessing (6 Tahap)
            </h2>
            <div className="space-y-3">
              {PREPROCESSING_STEPS.map((step, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-800">{step.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
                      <p className="mt-2 rounded-lg bg-white px-3 py-2 font-mono text-xs text-sky-700 border border-sky-100">
                        {step.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lexicon' && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Tag className="h-5 w-5 text-emerald-600" />
              Lexicon Dictionary Rules
            </h2>
            <p className="text-sm text-slate-600">
              Kamus kata positif dan negatif khusus kebijakan Monza yang digunakan
              untuk auto-labeling sentimen.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <h3 className="mb-2 text-sm font-bold text-emerald-700">Kata Positif (Dukungan)</h3>
                <div className="flex flex-wrap gap-1.5">
                  {POSITIVE_LEXICON.filter((v, i, a) => a.indexOf(v) === i).slice(0, 40).map((w) => (
                    <span key={w} className="rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">{w}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                <h3 className="mb-2 text-sm font-bold text-red-700">Kata Negatif (Penolakan)</h3>
                <div className="flex flex-wrap gap-1.5">
                  {NEGATIVE_LEXICON.filter((v, i, a) => a.indexOf(v) === i).slice(0, 40).map((w) => (
                    <span key={w} className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">{w}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tfidf' && (
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <Calculator className="h-5 w-5 text-sky-600" />
              Formula TF-IDF
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">Term Frequency (TF)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Jumlah kemunculan term <em>t</em> dalam dokumen <em>d</em>.
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-base text-sky-700">
                  TF(t, d) = f(t, d)
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">Inverse Document Frequency (Smooth IDF)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Mengukur seberapa jarang term muncul di seluruh dokumen. N = total dokumen, df(t) = jumlah dokumen mengandung term t.
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-base text-sky-700">
                  IDF(t) = ln((1 + N) / (1 + df(t))) + 1
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">TF-IDF Weight</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Hasil perkalian TF dan IDF, kemudian dinormalisasi menggunakan L2 Norm.
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-base text-sky-700">
                  TF-IDF(t, d) = TF(t, d) × IDF(t)
                </p>
                <p className="mt-2 rounded-lg bg-white px-4 py-3 text-center font-mono text-sm text-emerald-700">
                  L2 Norm: w'(t) = w(t) / √(Σ w(t)²)
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'naivebayes' && (
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <BrainCircuit className="h-5 w-5 text-emerald-600" />
              Algoritma Multinomial Naïve Bayes
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">Bayes Theorem</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Probabilitas posterior kelas C<sub>k</sub> given fitur X:
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-sm text-emerald-700">
                  P(C<sub>k</sub> | X) = [P(C<sub>k</sub>) × ∏ P(x<sub>i</sub> | C<sub>k</sub>)] / P(X)
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">Laplace Smoothing (α = 1.0)</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Mencegah probabilitas nol untuk term yang belum terlihat:
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-sm text-emerald-700">
                  P(x<sub>i</sub> | C<sub>k</sub>) = (N<sub>Ck,xi</sub> + 1) / (N<sub>Ck</sub> + |V|)
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  N<sub>Ck,xi</sub> = jumlah term x<sub>i</sub> di kelas C<sub>k</sub>, |V| = ukuran vocabulary
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800">Log-Likelihood Calculation</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Untuk menghindari underflow, digunakan logaritma:
                </p>
                <p className="mt-3 rounded-lg bg-white px-4 py-3 text-center font-mono text-sm text-emerald-700">
                  log P(C<sub>k</sub> | X) = log P(C<sub>k</sub>) + Σ log P(x<sub>i</sub> | C<sub>k</sub>)
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Kemudian dikonversi ke probabilitas dengan fungsi Softmax.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'confusion' && (
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Confusion Matrix & Metrik Evaluasi
            </h2>
            <p className="text-sm text-slate-600">
              Hasil evaluasi model dengan rasio Train:Test = 80:20
              (Train: {evaluation.trainSize} | Test: {evaluation.testSize})
            </p>

            {/* Overall Metrics */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: 'Accuracy', value: evaluation.overallAccuracy, color: 'emerald', formula: '(TP + TN) / (TP + FP + FN + TN)' },
                { label: 'Precision', value: evaluation.overallPrecision, color: 'sky', formula: 'TP / (TP + FP)' },
                { label: 'Recall', value: evaluation.overallRecall, color: 'amber', formula: 'TP / (TP + FN)' },
                { label: 'F1-Score', value: evaluation.overallF1, color: 'red', formula: '2 × (P × R) / (P + R)' },
              ].map((m) => (
                <div key={m.label} className={`rounded-xl border p-4 ${
                  m.color === 'emerald' ? 'border-emerald-100 bg-emerald-50' :
                  m.color === 'sky' ? 'border-sky-100 bg-sky-50' :
                  m.color === 'amber' ? 'border-amber-100 bg-amber-50' :
                  'border-red-100 bg-red-50'
                }`}>
                  <p className="text-xs font-medium text-slate-500">{m.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${
                    m.color === 'emerald' ? 'text-emerald-700' :
                    m.color === 'sky' ? 'text-sky-700' :
                    m.color === 'amber' ? 'text-amber-700' :
                    'text-red-700'
                  }`}>{(m.value * 100).toFixed(1)}%</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-400">{m.formula}</p>
                </div>
              ))}
            </div>

            {/* Per-class Confusion */}
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
                    <th className="px-4 py-3">Kelas</th>
                    <th className="px-4 py-3">TP</th>
                    <th className="px-4 py-3">FP</th>
                    <th className="px-4 py-3">FN</th>
                    <th className="px-4 py-3">TN</th>
                    <th className="px-4 py-3">Accuracy</th>
                    <th className="px-4 py-3">Precision</th>
                    <th className="px-4 py-3">Recall</th>
                    <th className="px-4 py-3">F1</th>
                  </tr>
                </thead>
                <tbody>
                  {(['positif', 'negatif', 'netral'] as const).map((c) => {
                    const cm = evaluation.confusion[c];
                    return (
                      <tr key={c} className="border-t border-slate-100">
                        <td className="px-4 py-2 capitalize font-medium text-slate-700">{c}</td>
                        <td className="px-4 py-2 text-emerald-600 font-mono">{cm.tp}</td>
                        <td className="px-4 py-2 text-red-600 font-mono">{cm.fp}</td>
                        <td className="px-4 py-2 text-amber-600 font-mono">{cm.fn}</td>
                        <td className="px-4 py-2 text-slate-600 font-mono">{cm.tn}</td>
                        <td className="px-4 py-2 font-mono">{(cm.accuracy * 100).toFixed(1)}%</td>
                        <td className="px-4 py-2 font-mono">{(cm.precision * 100).toFixed(1)}%</td>
                        <td className="px-4 py-2 font-mono">{(cm.recall * 100).toFixed(1)}%</td>
                        <td className="px-4 py-2 font-mono">{(cm.f1 * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
