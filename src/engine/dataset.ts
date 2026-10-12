import type { RawRecord } from './types';

const POSITIVE_COMMENTS = [
  'Saya setuju pemerintah menindak pakaian bekas ilegal demi memajukan industri konveksi lokal!',
  'Kebijakan monza ini sangat baik untuk melindungi industri dalam negeri',
  'Akhirnya pemerintah tegas menindak pakaian bekas, ini langkah yang tepat',
  'Dukung kebijakan penyitaan pakaian bekas, bagus untuk ekonomi lokal',
  'Setuju banget sama kebijakan ini, industri konveksi harus dilindungi',
  'Pemerintah sudah bertindak bijak dengan menindak pakaian bekas',
  'Ini kebijakan yang sangat bermanfaat untuk produksi dalam negeri',
  'Apresiasi buat pemerintah yang berani menindak pakaian bekas ilegal',
  'Bagus kebijakannya, melindungi industri lokal harus didukung',
  'Saya pro kebijakan monza, ini untuk kesejahteraan industri konveksi',
  'Kebijakan tepat, pakaian bekas harus disita demi industri lokal',
  'Mendukung penuh kebijakan penyitaan pakaian bekas oleh pemerintah',
  'Pintar pemerintah menindak pakaian bekas, melindungi konveksi lokal',
  'Hebat pemerintah berani menindak pakaian bekas, ini solusi yang tepat',
  'Kebijakan monza sangat membantu industri konveksi berkembang',
  'Tindakan pemerintah menindak pakaian bekas sangat efektif',
  'Setuju pakaian bekas disita, ini melindungi standar kualitas industri',
  'Kebijakan yang patut diapresiasi, melindungi industri dalam negeri',
  'Saya bangga pemerintah tegas menindak pakaian bekas ilegal',
  'Langkah yang berani dan tepat, dukung kebijakan monza sepenuhnya',
  'Kebijakan penyitaan pakaian bekas sangat menguntungkan industri lokal',
  'Akhirnya ada kebijakan yang melindungi konveksi dalam negeri, setuju!',
  'Pemerintah berani menindak pakaian bekas, ini bagus untuk ekonomi',
  'Dukung kebijakan monza, melindungi industri lokal itu wajib',
  'Setuju kebijakan ini, pakaian bekas merusak industri konveksi lokal',
  'Bijak pemerintah menindak pakaian bekas, ini untuk kemajuan industri',
  'Kebijakan monza sangat layak diapresiasi, melindungi produksi lokal',
  'Saya mendukung penyitaan pakaian bekas, ini langkah maju',
  'Tepat sekali pemerintah menindak pakaian bekas, industri lokal aman',
  'Kebijakan monza membantu industri konveksi bersaing, sangat bagus',
];

const NEGATIVE_COMMENTS = [
  'Tidak setuju pemerintah menyita pakaian bekas, kasihan pedagangnya',
  'Kebijakan monza sangat merugikan pedagang kecil, kasihan banget',
  'Saya menolak kebijakan penyitaan pakaian bekas, tidak adil untuk rakyat',
  'Pakaian bekas kan dicari rakyat kecil, kenapa harus disita? Kecewa',
  'Pemerintah zalim menyita pakaian bekas, pedagang kecil bangkrut',
  'Kebijakan monza menindas rakyat kecil, kasihan para pedagang',
  'Saya kecewa dengan kebijakan penyitaan pakaian bekas, merugikan rakyat',
  'Tidak bijak pemerintah menindak pakaian bekas, rakyat susah',
  'Penyitaan pakaian bekas menindas rakyat kecil, saya tidak setuju',
  'Kebijakan monza zalim, pedagang kecil terpuruk dan bangkrut',
  'Saya protes kebijakan penyitaan pakaian bekas, tidak manusiawi',
  'Kasihan pedagang pakaian bekas, kebijakan monza sangat kejam',
  'Pemerintah zalim menyita pakaian bekas, rakyat kecil yang susah',
  'Kebijakan monza merugikan rakyat, saya menolak tindakan ini',
  'Tidak adil pemerintah menindak pakaian bekas, pedagang kecil korban',
  'Saya kecewa pemerintah menyita pakaian bekas, ini zalim sekali',
  'Kebijakan penyitaan pakaian bekas menindas rakyat, sangat buruk',
  'Pakaian bekas bantuan rakyat kecil, kenapa disita? Kecewa banget',
  'Pemerintah zalim menindak pakaian bekas, rakyat makin susah',
  'Kebijakan monza zalim dan zalim, kasihan pedagang kecil',
  'Saya menolak keras kebijakan penyitaan pakaian bekas, tidak adil',
  'Kebijakan monza menyusahkan rakyat, pemerintah zalim sekali',
  'Penyitaan pakaian bekas merugikan pedagang, saya tidak setuju',
  'Kasihan rakyat kecil, kebijakan monza menindas para pedagang',
  'Tidak setuju monza, pakaian bekas bantuan rakyat kecil kok disita',
  'Kebijakan zalim, pedagang pakaian bekas dirugikan dan bangkrut',
  'Saya kecewa pemerintah menindak pakaian bekas, tidak bijak sekali',
  'Penyitaan pakaian bekas zalim, rakyat kecil menderita',
  'Pemerintah zalim menyita pakaian bekas, kecewa dengan kebijakan ini',
  'Kebijakan monza buruk, merugikan pedagang kecil dan rakyat',
];

const NEUTRAL_COMMENTS = [
  'Bagaimana kebijakan monza ini akan dijalankan oleh pemerintah?',
  'Apa itu kebijakan penyitaan pakaian bekas? Mohon penjelasannya',
  'Kapan kebijakan monza mulai diberlakukan? Ada informasinya?',
  'Menurut saya kebijakan ini perlu kajian lebih lanjut, apa dampaknya?',
  'Saya mau tanya, kenapa pakaian bekas harus disita oleh pemerintah?',
  'Informasi tentang kebijakan monza masih sedikit, bisa dijelaskan?',
  'Apa dampak kebijakan penyitaan pakaian bekas bagi industri lokal?',
  'Bagaimana pemerintah menindak pakaian bekas? Mohon infonya',
  'Kebijakan monza ini seperti apa? Saya butuh penjelasan',
  'Siapa yang terdampak kebijakan penyitaan pakaian bekas ini?',
  'Mungkin kebijakan ini bagus, tapi bagaimana implementasinya?',
  'Saya kira kebijakan monza perlu disosialisasikan lebih lanjut',
  'Apa beda pakaian bekas ilegal dan legal? Mohon dijelaskan',
  'Berita tentang monza ini bagaimana ya? Saya baru tahu',
  'Pendapat saya, kebijakan ini perlu evaluasi berkala, bagaimana?',
  'Bagaimana mekanisme penyitaan pakaian bekas oleh pemerintah?',
  'Saya tertarik tahu lebih banyak tentang kebijakan monza',
  'Apa sumber data kebijakan penyitaan pakaian bekas ini?',
  'Kapan kebijakan monza diberlakukan? Ada sumber resminya?',
  'Bagaimana tanggapan pedagang terhadap kebijakan monza?',
  'Mungkin perlu ada sosialisasi kebijakan monza, bagaimana menurut?',
  'Saya mau informasi tentang kebijakan penyitaan pakaian bekas',
  'Apa fakta tentang kebijakan monza? Saya butuh data',
  'Sebenarnya kebijakan monza itu aturan apa? Mohon jelaskan',
  'Bagaimana kebijakan monza berdampak pada masyarakat umum?',
];

const USERNAMES_IG = [
  'andi_dev', 'siti_rahma', 'budi.tm', 'raffi_88', 'dewi.lestari',
  'fajar_id', 'rina.s', 'gilang_p', 'maya.april', 'dimas.r',
  'citra_m', 'bayu.k', 'putri.a', 'rendy.tm', 'salsabila_id',
  'arif.h', 'lina.s', 'eko.pras', 'tari.d', 'yoga_99',
  'nisa.fitri', 'rahmat.id', 'wati.s', 'agus.tm', 'intan_p',
  'feri.a', 'meli.s', 'doni.k', 'ayu.r', 'vino.tm',
];

const USERNAMES_TT = [
  'kang_pakaian', 'jaya_bekas', 'toko_murah', 'rakyat_kecil', 'pedagang_id',
  'warga_medan', 'komentar_rakyat', 'netizen_2026', 'tiktok_id', 'viral_monza',
  'sahabat_bekas', 'grosir_pakaian', 'lapak_murah', 'dagang_kecil', 'warga_umum',
  'masyarakat_id', 'opini_rakyat', 'suara_pedagang', 'info_monza', 'kabar_terkini',
  'warga_jujur', 'komentar_bebas', 'rakyat_biasa', 'suara_merdeka', 'netizen_jujur',
  'warga_pantau', 'opini_bebas', 'dagang_jujur', 'lapak_rakyat', 'info_viral',
];

function randomDate(): string {
  const start = new Date('2025-06-01').getTime();
  const end = new Date('2026-08-31').getTime();
  const ts = start + Math.random() * (end - start);
  return new Date(ts).toISOString().slice(0, 10);
}

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

export function generateDataset(count = 500): RawRecord[] {
  const records: RawRecord[] = [];
  for (let i = 0; i < count; i++) {
    // Distribution: ~35% positif, ~40% negatif, ~25% netral
    let comment: string;
    const mod = i % 100;
    if (mod < 35) {
      comment = pick(POSITIVE_COMMENTS, i);
    } else if (mod < 75) {
      comment = pick(NEGATIVE_COMMENTS, i);
    } else {
      comment = pick(NEUTRAL_COMMENTS, i);
    }

    // Add some noise (mentions, hashtags, URLs) to some records
    if (i % 7 === 0) comment = `@pemerintah ${comment}`;
    if (i % 11 === 0) comment = `${comment} #monza #kebijakan`;
    if (i % 13 === 0) comment = `${comment} https://example.com/berita`;
    if (i % 17 === 0) comment = `${comment}!!! 😡`;
    if (i % 19 === 0) comment = `gk setuju ${comment.toLowerCase()}`;

    const platform: 'Instagram' | 'TikTok' = i % 2 === 0 ? 'Instagram' : 'TikTok';
    const username =
      platform === 'Instagram'
        ? pick(USERNAMES_IG, i)
        : pick(USERNAMES_TT, i);

    records.push({
      id: `KMN-${String(i + 1).padStart(4, '0')}`,
      platform,
      username,
      tanggal: randomDate(),
      komentar: comment,
    });
  }
  return records;
}
