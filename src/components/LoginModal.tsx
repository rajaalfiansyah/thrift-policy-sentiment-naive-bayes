import { useState } from 'react';
import { X, ShieldCheck, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      setError('');
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Username atau password salah. Coba lagi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md animate-[slideUp_0.3s_ease-out] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Login Admin</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="admin_fikti"
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Masuk
          </button>
          <p className="text-center text-xs text-slate-400">
            Kredensial Demo: admin_fikti / umsu2026
          </p>
        </form>
      </div>
    </div>
  );
}
