import { useRef } from 'react';
import { Printer } from 'lucide-react';
import type { PredictionResult } from '@/engine/types';

interface PrintSlipProps {
  result: PredictionResult;
  testerName: string;
  inputText: string;
}

export function PrintSlip({ result, testerName, inputText }: PrintSlipProps) {
  const slipRef = useRef<HTMLDivElement>(null);

  const labelColors: Record<string, string> = {
    positif: '#10b981',
    negatif: '#ef4444',
    netral: '#f59e0b',
  };
  const labelNames: Record<string, string> = {
    positif: 'POSITIF',
    negatif: 'NEGATIF',
    netral: 'NETRAL',
  };

  const handlePrint = () => {
    const content = slipRef.current;
    if (!content) return;
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>Surat Hasil Pengujian Sentimen - UMSU</title>
          <style>
            * { font-family: 'Times New Roman', serif; margin: 0; padding: 0; box-sizing: border-box; }
            body { padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 3px double #0f766e; padding-bottom: 16px; margin-bottom: 24px; }
            .header h1 { font-size: 18px; font-weight: bold; }
            .header h2 { font-size: 16px; font-weight: bold; }
            .header h3 { font-size: 14px; }
            .title { text-align: center; font-size: 16px; font-weight: bold; text-decoration: underline; margin: 20px 0; }
            .info { margin: 16px 0; }
            .info p { margin: 4px 0; font-size: 13px; }
            .section { margin: 16px 0; }
            .section h4 { font-size: 14px; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
            .section p { font-size: 13px; margin: 4px 0; }
            .badge { display: inline-block; padding: 6px 16px; border-radius: 6px; font-weight: bold; font-size: 16px; color: white; }
            .probs { margin: 12px 0; }
            .probs p { font-size: 13px; margin: 4px 0; }
            .footer { margin-top: 40px; text-align: right; }
            .footer p { font-size: 13px; margin: 4px 0; }
            .qr { margin-top: 20px; text-align: center; }
            .qr-box { display: inline-block; padding: 12px; border: 2px solid #0f766e; font-size: 10px; }
            table { width: 100%; border-collapse: collapse; margin: 8px 0; }
            td, th { border: 1px solid #cbd5e1; padding: 6px; font-size: 12px; text-align: left; }
            th { background: #f1f5f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>UNIVERSITAS MUHAMMADIYAH SUMATERA UTARA</h1>
            <h2>FAKULTAS ILMU KOMPUTER DAN TEKNOLOGI INFORMASI</h2>
            <h3>Jl. Muchtar Rya No. 3, Medan, Sumatera Utara</h3>
          </div>
          <div class="title">SURAT HASIL PENGUJIAN SENTIMEN</div>
          <div class="info">
            <p><strong>Nama Penguji:</strong> ${testerName || '-'}</p>
            <p><strong>Nama Peneliti:</strong> ANGGARA NASUTION</p>
            <p><strong>NIM:</strong> 2209010172</p>
            <p><strong>Program Studi:</strong> Sistem Informasi</p>
            <p><strong>Tanggal Pengujian:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
          </div>
          <div class="section">
            <h4>A. Teks Input Komentar</h4>
            <p>${inputText}</p>
          </div>
          <div class="section">
            <h4>B. Hasil Preprocessing</h4>
            <table>
              <tr><th>Tahap</th><th>Hasil</th></tr>
              <tr><td>Case Folding & Cleaning</td><td>${result.steps.cleaned}</td></tr>
              <tr><td>Tokenizing</td><td>${result.steps.tokens.join(', ')}</td></tr>
              <tr><td>Normalisasi Slang</td><td>${result.steps.normalizedTokens.join(', ')}</td></tr>
              <tr><td>Stemming Sastrawi</td><td>${result.steps.stemmedTokens.join(', ')}</td></tr>
            </table>
          </div>
          <div class="section">
            <h4>C. Hasil Klasifikasi Naïve Bayes</h4>
            <p>Sentimen: <span class="badge" style="background:${labelColors[result.label]}">${labelNames[result.label]}</span></p>
            <div class="probs">
              <p>Positif: ${(result.probabilities.positif * 100).toFixed(2)}%</p>
              <p>Negatif: ${(result.probabilities.negatif * 100).toFixed(2)}%</p>
              <p>Netral: ${(result.probabilities.netral * 100).toFixed(2)}%</p>
            </div>
          </div>
          <div class="footer">
            <p>Medan, ${new Date().toLocaleDateString('id-ID')}</p>
            <p>Peneliti,</p>
            <br/><br/><br/>
            <p><strong>ANGGARA NASUTION</strong></p>
            <p>NIM 2209010172</p>
          </div>
          <div class="qr">
            <div class="qr-box">
              KODE VERIFIKASI<br/>
              SENTIMEN-MONZA-UMSU-<br/>
              ${Date.now().toString(36).toUpperCase()}
            </div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
    >
      <Printer className="h-4 w-4" />
      Cetak Laporan Validation Slip (PDF / Print)
    </button>
  );
}
