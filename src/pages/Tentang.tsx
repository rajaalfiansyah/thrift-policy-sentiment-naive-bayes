import {
  GraduationCap, BookOpen, BrainCircuit, Calculator,
  Database, ShoppingBag, ShieldCheck, FileText,
} from 'lucide-react';

export function Tentang() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Profil Penelitian Skripsi & Peneliti
        </h1>
      </div>

      {/* Biodata Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">ANGGARA NASUTION</h2>
          <p className="mt-1 text-sm text-emerald-50">NIM 2209010172</p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">
          {[
            { icon: BookOpen, label: 'Program Studi', value: 'Sistem Informasi' },
            { icon: ShieldCheck, label: 'Fakultas', value: 'Ilmu Komputer dan Teknologi Informasi (FIKTI)' },
            { icon: GraduationCap, label: 'Perguruan Tinggi', value: 'Universitas Muhammadiyah Sumatera Utara (UMSU) Medan' },
            { icon: FileText, label: 'Tahun', value: '2026' },
          ].map((item) => (
            <div key={item.label} className="bg-white p-5">
              <div className="flex items-center gap-2 text-emerald-600">
                <item.icon className="h-4 w-4" />
                <span className="text-xs font-medium text-slate-500">{item.label}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            Latar Belakang Penelitian
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Kebijakan penyitaan pakaian bekas (Monza) yang diberlakukan oleh pemerintah
            menimbulkan berbagai reaksi dari masyarakat, khususnya para pedagang pakaian
            bekas dan pelaku industri konveksi lokal. Media sosial seperti Instagram dan
            TikTok menjadi platform utama bagi masyarakat untuk mengekspresikan opini
            mereka terkait kebijakan ini. Penelitian ini bertujuan untuk menganalisis
            sentimen publik terhadap kebijakan Monza menggunakan pendekatan machine
            learning, sehingga dapat memberikan gambaran objektif mengenai persepsi
            masyarakat.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <BrainCircuit className="h-5 w-5 text-sky-600" />
            Tujuan Penelitian
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              Mengklasifikasikan opini publik tentang kebijakan Monza menjadi kategori Positif, Negatif, dan Netral.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              Menerapkan pipeline NLP lengkap (Case Folding, Cleaning, Tokenizing, Normalization, Stopword Removal, Stemming Sastrawi).
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              Mengukur performa algoritma Multinomial Naïve Bayes dengan pembobotan TF-IDF menggunakan metrik Accuracy, Precision, Recall, dan F1-Score.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <Calculator className="h-5 w-5 text-amber-600" />
            Metodologi
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Database className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold">Dataset</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                500 komentar mentah dari Instagram & TikTok terkait kebijakan Monza.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-700">
                <BrainCircuit className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-semibold">Model</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Multinomial Naïve Bayes dengan Laplace Smoothing α=1.0 dan split 80:20.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Calculator className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-semibold">Pembobotan</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                TF-IDF dengan Smooth IDF dan L2 Normalization.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="h-4 w-4 text-red-600" />
                <span className="text-sm font-semibold">Evaluasi</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Confusion Matrix: Accuracy, Precision, Recall, F1-Score per kelas.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <FileText className="h-5 w-5 text-emerald-600" />
            Implikasi Penelitian
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Hasil penelitian ini diharapkan dapat memberikan kontribusi bagi evaluasi
            kebijakan publik, khususnya dalam memahami respon masyarakat terhadap
            kebijakan penyitaan pakaian bekas. Dengan mengetahui distribusi sentimen,
            pemerintah dapat mengambil langkah komunikasi dan sosialisasi yang lebih
            tepat sasaran. Selain itu, penelitian ini juga menunjukkan bahwa kombinasi
            NLP dan algoritma machine learning seperti Naïve Bayes efektif untuk
            menganalisis opini publik berbahasa Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
