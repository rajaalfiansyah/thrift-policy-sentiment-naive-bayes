import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = 'sentimen_monza_auth';
const VALID_USERNAME = 'admin_fikti';
const VALID_PASSWORD = 'umsu2026';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === VALID_USERNAME) {
      setIsAuthenticated(true);
      setUsername(VALID_USERNAME);
    }
  }, []);

  const login = (u: string, p: string): boolean => {
    if (u === VALID_USERNAME && p === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setUsername(u);
      localStorage.setItem(STORAGE_KEY, u);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
