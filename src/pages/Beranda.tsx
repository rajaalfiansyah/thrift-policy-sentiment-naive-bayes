import { Link } from 'react-router-dom';
import {
  Search, FileText, Database, Calculator, BookOpen, GraduationCap,
  ShieldCheck, AlignLeft, Upload, Printer, Download, FileSpreadsheet,
  RefreshCw, BarChart2, PieChart as PieChartIcon, Layers, BrainCircuit, ShoppingBag,
  Tag, CheckCircle, ArrowRight, Sparkles,
} from 'lucide-react';
import { useEngine } from '@/context/EngineContext';
import { StatCard } from '@/components/StatCard';
import { PieChart, BarChart } from '@/components/Charts';

const BADGES = [
  'Dataset 500 Raw Data',
  'Multinomial Naïve Bayes',
  'Lexicon Auto-Labeling',
  'Sastrawi Stemmer',
  'Split 80:20',
];

const WORKFLOW = [
  { icon: FileText, title: 'Raw CSV Input', desc: '500 komentar mentah dari Instagram & TikTok', color: 'text-sky-600 bg-sky-50' },
  { icon: AlignLeft, title: 'Preprocessing', desc: 'Cleaning, Case Folding, Tokenizing, Normalisasi, Stopword, Stemming', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Tag, title: 'Lexicon Auto Labeling', desc: 'Pelabelan otomatis berdasarkan kamus sentimen', color: 'text-amber-600 bg-amber-50' },
  { icon: Calculator, title: 'TF-IDF Matrix', desc: 'Pembobotan TF-IDF dengan L2 Normalization', color: 'text-blue-600 bg-blue-50' },
  { icon: BrainCircuit, title: 'Training Naïve Bayes', desc: 'Multinomial Naïve Bayes dengan Laplace Smoothing α=1.0', color: 'text-emerald-600 bg-emerald-50' },
  { icon: CheckCircle, title: 'Confusion Matrix', desc: 'Evaluasi Accuracy, Precision, Recall, F1-Score', color: 'text-red-600 bg-red-50' },
];

export function Beranda() {
  const { distribution, evaluation } = useEngine();

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-200 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sky-200 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              Skripsi Sistem Informasi FIKTI UMSU 2026
            </div>
            <h1 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
              Sistem Analisis Sentimen Kebijakan{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Penyitaan Pakaian Bekas (Monza)
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Klasifikasi opini publik dari Instagram dan TikTok menggunakan{' '}
              <strong className="text-emerald-600">Multinomial Naïve Bayes</strong> dan{' '}
              <strong className="text-sky-600">Natural Language Processing (NLP)</strong> dengan
              pembobotan TF-IDF dan Stemming Sastrawi.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {BADGES.map((b) => (
                <span key={b} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/simulasi"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]"
              >
                <Search className="h-4 w-4" />
                Uji Sentimen Teks Sekarang
              </Link>
              <Link
                to="/alur"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 active:scale-[0.98]"
              >
                <BarChart2 className="h-4 w-4" />
                Lihat Alur Naïve Bayes & Metrik
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={<Database className="h-5 w-5" />} value={500} label="Raw Data" sublabel="Dataset Komentar Monza" color="emerald" />
          <StatCard icon={<Layers className="h-5 w-5" />} value="80:20" label="Rasio Data" sublabel="Data Latih & Data Uji" color="sky" />
          <StatCard icon={<AlignLeft className="h-5 w-5" />} value={6} label="Tahap Preprocessing" sublabel="Cleaning s/d Stemming" color="amber" />
          <StatCard icon={<Tag className="h-5 w-5" />} value={3} label="Kelas Sentimen" sublabel="Positif, Negatif, Netral" color="red" />
        </div>
      </section>

      {/* Sentiment Distribution */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Distribusi Sentimen Dataset</h3>
            </div>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
              <PieChart data={distribution} size={200} />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-700">Positif (Dukungan)</span>
                  <span className="text-slate-500">{distribution.positif}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="font-medium text-slate-700">Negatif (Penolakan)</span>
                  <span className="text-slate-500">{distribution.negatif}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="font-medium text-slate-700">Netral (Informasi)</span>
                  <span className="text-slate-500">{distribution.netral}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-sky-600" />
              <h3 className="text-lg font-bold text-slate-800">Hasil Evaluasi Model (80:20)</h3>
            </div>
            <BarChart data={distribution} />
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs text-slate-500">Accuracy</p>
                <p className="text-xl font-bold text-emerald-600">{(evaluation.overallAccuracy * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">F1-Score</p>
                <p className="text-xl font-bold text-sky-600">{(evaluation.overallF1 * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Precision</p>
                <p className="text-xl font-bold text-amber-600">{(evaluation.overallPrecision * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Recall</p>
                <p className="text-xl font-bold text-red-600">{(evaluation.overallRecall * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Roadmap */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Alur NLP & Naïve Bayes</h2>
          <p className="mt-2 text-sm text-slate-500">6 tahap pipeline analisis sentimen dari raw data hingga evaluasi</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW.map((step, i) => (
            <div key={i} className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.color}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-slate-200">0{i + 1}</span>
              </div>
              <h3 className="text-base font-bold text-slate-800">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{step.desc}</p>
              {i < WORKFLOW.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
