import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { EngineProvider } from '@/context/EngineContext';
import { Layout, ProtectedLayout } from '@/components/Layout';
import { Beranda } from '@/pages/Beranda';
import { Simulasi } from '@/pages/Simulasi';
import { Kelola } from '@/pages/Kelola';
import { Alur } from '@/pages/Alur';
import { Tentang } from '@/pages/Tentang';

export default function App() {
  return (
    <AuthProvider>
      <EngineProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Beranda />} />
              <Route path="/simulasi" element={<Simulasi />} />
              <Route path="/alur" element={<Alur />} />
              <Route path="/tentang" element={<Tentang />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/kelola" element={<Kelola />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EngineProvider>
    </AuthProvider>
  );
}
