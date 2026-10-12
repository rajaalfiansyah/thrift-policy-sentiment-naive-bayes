import { useState, useRef, useCallback } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  X, FileSpreadsheet, Download, Upload, AlertCircle, CheckCircle2,
  Loader2, FileUp,
} from 'lucide-react';
import type { RawRecord } from '@/engine/types';

const REQUIRED_HEADERS: Record<string, string> = {
  id_komentar: 'id',
  platform: 'platform',
  username: 'username',
  created_at: 'tanggal',
  komentar_mentah: 'komentar',
};

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\s+/g, '_');
}

function mapRow(row: Record<string, unknown>, index: number): RawRecord | null {
  const normalized: Record<string, unknown> = {};
  for (const key of Object.keys(row)) {
    normalized[normalizeHeader(key)] = row[key];
  }

  const rawKomentar = normalized['komentar_mentah'] ?? normalized['komentar'];
  const komentar = (rawKomentar as string)?.toString().trim();
  if (!komentar) return null;

  const rawId = normalized['id_komentar'] ?? normalized['id'];
  const id = (rawId as string)?.toString().trim() || `IMP-${Date.now()}-${index}`;

  const rawPlatform = normalized['platform'];
  const platformStr = (rawPlatform as string)?.toString().trim();
  const platform: 'Instagram' | 'TikTok' =
    platformStr && /tiktok|tt/i.test(platformStr) ? 'TikTok' : 'Instagram';

  const rawUsername = normalized['username'];
  const username = (rawUsername as string)?.toString().trim() || 'imported_user';

  const rawDate = normalized['created_at'] ?? normalized['tanggal'];
  let tanggal = (rawDate as string)?.toString().trim();
  if (!tanggal) {
    tanggal = new Date().toISOString().slice(0, 10);
  } else {
    const parsed = new Date(tanggal);
    if (!isNaN(parsed.getTime())) {
      tanggal = parsed.toISOString().slice(0, 10);
    }
  }

  return { id, platform, username, tanggal, komentar };
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (records: RawRecord[]) => void;
}

export function UploadModal({ open, onClose, onImport }: UploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [importedCount, setImportedCount] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const processRows = useCallback(
    (rows: Record<string, unknown>[]) => {
      const records: RawRecord[] = [];
      for (let i = 0; i < rows.length; i++) {
        const rec = mapRow(rows[i], i);
        if (rec) records.push(rec);
      }

      if (records.length === 0) {
        setStatus('error');
        setMessage('Tidak ada data valid. Pastikan kolom "komentar_mentah" ada di file.');
        return;
      }

      onImport(records);
      setImportedCount(records.length);
      setStatus('success');
      setMessage(`Berhasil mengimpor dan melabeli ${records.length} data mentah!`);
    },
    [onImport]
  );

  const parseCsv = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        processRows(results.data as Record<string, unknown>[]);
      },
      error: () => {
        setStatus('error');
        setMessage('Gagal membaca file CSV. Pastikan format file benar.');
      },
    });
  };

  const parseXlsx = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
        processRows(json);
      } catch {
        setStatus('error');
        setMessage('Gagal membaca file Excel. Pastikan format file benar.');
      }
    };
    reader.onerror = () => {
      setStatus('error');
      setMessage('Gagal membaca file.');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFile = (file: File) => {
    setStatus('parsing');
    setMessage('');
    const name = file.name.toLowerCase();
    if (name.endsWith('.csv')) {
      parseCsv(file);
    } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
      parseXlsx(file);
    } else {
      setStatus('error');
      setMessage('Format file tidak didukung. Gunakan .csv atau .xlsx');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const downloadTemplate = () => {
    const headers = ['id_komentar', 'platform', 'username', 'created_at', 'komentar_mentah'];
    const sampleRow = ['KMN-0001', 'Instagram', 'user_demo', '2026-01-01', 'Contoh komentar tentang monza'];
    const csv = [headers.join(','), sampleRow.map((c) => `"${c}"`).join(',')].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_dataset_monza_mentah.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setStatus('idle');
    setMessage('');
    setImportedCount(0);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md animate-[slideUp_0.3s_ease-out] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">Import Dataset Mentah</h2>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
              dragOver
                ? 'border-emerald-400 bg-emerald-50/50'
                : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30'
            }`}
          >
            {status === 'parsing' ? (
              <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-emerald-500" />
            ) : status === 'success' ? (
              <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-500" />
            ) : status === 'error' ? (
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-400" />
            ) : (
              <FileSpreadsheet className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            )}

            <p className="text-sm font-medium text-slate-600">
              {status === 'parsing'
                ? 'Memproses file...'
                : status === 'success'
                ? 'Import berhasil!'
                : 'Tarik & lepas file di sini, atau klik untuk memilih'}
            </p>
            <p className="text-xs text-slate-400">Mendukung .csv dan .xlsx</p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = '';
              }}
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Required Columns Info */}
          <div className="mt-4 rounded-lg bg-slate-50 px-4 py-3">
            <p className="mb-1.5 text-xs font-semibold text-slate-500">Kolom yang Dibutuhkan:</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(REQUIRED_HEADERS).map((h) => (
                <code key={h} className="rounded bg-slate-200 px-1.5 py-0.5 text-xs text-slate-600">
                  {h}
                </code>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            {status === 'success' && (
              <button
                onClick={handleClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Selesai ({importedCount} data diimpor)
              </button>
            )}
            <button
              onClick={downloadTemplate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Unduh Format Template CSV Mentah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
