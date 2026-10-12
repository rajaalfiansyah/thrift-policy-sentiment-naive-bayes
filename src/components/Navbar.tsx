import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ShieldCheck, BrainCircuit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginModal } from './LoginModal';

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/simulasi', label: 'Simulasi Prediksi' },
  { to: '/kelola', label: 'Kelola Dataset', protected: true },
  { to: '/alur', label: 'Alur NLP & Naïve Bayes' },
  { to: '/tentang', label: 'Tentang Penelitian' },
];

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-bold leading-tight text-slate-800 sm:text-base">
              <span className="text-emerald-600">Analisis Sentimen</span>
              <span className="block text-xs font-medium text-slate-500">Monza UMSU</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.protected && !isAuthenticated) {
                return (
                  <button
                    key={link.to}
                    onClick={() => setLoginOpen(true)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {link.label}
                  </button>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {link.protected && <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />}
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAuthAction}
              className={`hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex ${
                isAuthenticated
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isAuthenticated ? <LogOut className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              {isAuthenticated ? 'Keluar' : 'Login Admin'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                if (link.protected && !isAuthenticated) {
                  return (
                    <button
                      key={link.to}
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      {link.label}
                    </button>
                  );
                }
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm font-medium ${
                        isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.protected && <ShieldCheck className="mr-1.5 inline h-4 w-4" />}
                    {link.label}
                  </NavLink>
                );
              })}
              <button
                onClick={() => {
                  handleAuthAction();
                  setMobileOpen(false);
                }}
                className={`mt-2 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isAuthenticated ? 'bg-red-50 text-red-600' : 'bg-emerald-600 text-white'
                }`}
              >
                {isAuthenticated ? <LogOut className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                {isAuthenticated ? 'Keluar' : 'Login Admin'}
              </button>
            </nav>
          </div>
        )}
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
