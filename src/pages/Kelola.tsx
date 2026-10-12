import { useState } from 'react';
import {
  Search, Upload, RefreshCw, Printer, Database, Tag,
  Trash2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useEngine } from '@/context/EngineContext';
import { useAuth } from '@/context/AuthContext';
import { SentimentBadge } from '@/components/SentimentBadge';
import { UploadModal } from '@/components/UploadModal';
import type { SentimentLabel, RawRecord } from '@/engine/types';

const PAGE_SIZE = 50;

export function Kelola() {
  const { dataset, distribution, relabelAll, updateLabel, deleteRecord, addRecords } = useEngine();
  const { username } = useAuth();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = dataset.filter(
    (r) =>
      r.komentar.toLowerCase().includes(search.toLowerCase()) ||
      r.username.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleImport = (records: RawRecord[]) => {
    addRecords(records);
    setToast(`Berhasil mengimpor dan melabeli ${records.length} data mentah!`);
    setTimeout(() => setToast(null), 5000);
  };

  const handlePrint = () => {
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    win.document.write(`
      <html><head><title>Rekap Dataset - SENTIMEN MONZA UMSU</title>
      <style>*{font-family:Arial,sans-serif;font-size:11px} table{width:100%;border-collapse:collapse} th,td{border:1px solid #999;padding:4px} th{background:#e2e8f0} h1{text-align:center;font-size:16px}</style>
      </head><body>
      <h1>Rekap Dataset Sentimen Monza UMSU</h1>
      <p>Total: ${dataset.length} | Positif: ${distribution.positif} | Negatif: ${distribution.negatif} | Netral: ${distribution.netral}</p>
      <table><tr><th>No</th><th>ID</th><th>Platform</th><th>Username</th><th>Komentar</th><th>Label</th></tr>
      ${dataset.map((r, i) => `<tr><td>${i + 1}</td><td>${r.id}</td><td>${r.platform}</td><td>${r.username}</td><td>${r.komentar.slice(0, 60)}</td><td>${r.label}</td></tr>`).join('')}
      </table></body></html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Repositori & Pengolahan Dataset Mentah
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          dataset_komentar_monza_500_mentah.csv | Login sebagai: {username}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Database className="h-4 w-4" />
            <span className="text-xs font-medium">Total Raw Data</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-slate-800">{dataset.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="flex items-center gap-2 text-emerald-600">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-medium">Positif</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{distribution.positif}</p>
        </div>
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-600">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-medium">Negatif</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-red-700">{distribution.negatif}</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex items-center gap-2 text-amber-600">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-medium">Netral</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-700">{distribution.netral}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Cari komentar, username, atau ID..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <Upload className="h-4 w-4" /> Import CSV/Excel
        </button>
        <button
          onClick={relabelAll}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          <RefreshCw className="h-4 w-4" /> Auto-Labeling
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Printer className="h-4 w-4" /> Cetak Rekap
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold text-slate-500">
                <th className="px-3 py-3">No</th>
                <th className="px-3 py-3">ID Komentar</th>
                <th className="px-3 py-3">Platform</th>
                <th className="px-3 py-3">Username</th>
                <th className="px-3 py-3">Tanggal</th>
                <th className="px-3 py-3">Isi Komentar (Raw)</th>
                <th className="px-3 py-3">Cleaned Text</th>
                <th className="px-3 py-3">Label</th>
                <th className="px-3 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((r, i) => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-3 py-2 text-slate-400">{page * PAGE_SIZE + i + 1}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-600">{r.id}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      r.platform === 'Instagram' ? 'bg-pink-100 text-pink-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {r.platform}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-600">{r.username}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{r.tanggal}</td>
                  <td className="max-w-[200px] px-3 py-2 text-slate-700">
                    <p className="truncate" title={r.komentar}>{r.komentar}</p>
                  </td>
                  <td className="max-w-[150px] px-3 py-2 text-slate-500">
                    <p className="truncate" title={r.cleanedText}>{r.cleanedText}</p>
                  </td>
                  <td className="px-3 py-2">
                    {editId === r.id ? (
                      <select
                        value={r.label}
                        onChange={(e) => {
                          updateLabel(r.id, e.target.value as SentimentLabel);
                          setEditId(null);
                        }}
                        className="rounded border border-slate-200 px-2 py-1 text-xs"
                      >
                        <option value="positif">Positif</option>
                        <option value="negatif">Negatif</option>
                        <option value="netral">Netral</option>
                      </select>
                    ) : (
                      <SentimentBadge label={r.label} size="sm" />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditId(r.id)}
                        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-sky-600"
                        title="Edit Label"
                      >
                        <Tag className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteRecord(r.id)}
                        className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        title="Hapus"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-500">
            Menampilkan {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filtered.length)} dari {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-slate-600">
              Hal {page + 1} / {totalPages || 1}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-medium text-white shadow-xl shadow-emerald-200">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {toast}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}
