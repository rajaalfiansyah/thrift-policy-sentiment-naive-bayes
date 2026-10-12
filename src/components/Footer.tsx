import { BrainCircuit, GraduationCap, BookOpen, Calculator, Database, Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-bold text-slate-800">
                <span className="text-emerald-600">Analisis Sentimen</span> Monza UMSU
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Sistem Analisis Sentimen Publik Terhadap Kebijakan Penyitaan Pakaian Bekas/Monza Berbasis NLP & Naïve Bayes
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Informasi Singkat</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><Layers className="h-4 w-4 text-sky-500" /> Multinomial Naïve Bayes</li>
              <li className="flex items-center gap-2"><Calculator className="h-4 w-4 text-sky-500" /> Pembobotan TF-IDF</li>
              <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-sky-500" /> Stemming Sastrawi</li>
              <li className="flex items-center gap-2"><Database className="h-4 w-4 text-sky-500" /> Dataset 500 Raw CSV Instagram & TikTok</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Peneliti</h4>
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-700">ANGGARA NASUTION</p>
                <p>NIM 2209010172</p>
                <p>Sistem Informasi FIKTI UMSU Medan</p>
                <p>2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-xs text-slate-400">
            Copyright 2026 - Skripsi Sistem Informasi UMSU
          </p>
        </div>
      </div>
    </footer>
  );
}
