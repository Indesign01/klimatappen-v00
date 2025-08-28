'use client';
import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';

const AuthContext = createContext<{
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}>({
  auth: { user: null, isLoading: true, error: null },
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });

  const login = async (credentials: LoginCredentials) => {
    // Implementation needed - mock for now
    setAuth(prev => ({ ...prev, isLoading: true, error: null }));

    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email: credentials.email,
//        name: 'Testare',
        name: 'Testare',
        createdAt: new Date()
      };
      setAuth({ user: mockUser, isLoading: false, error: null });
    }, 1000);
  };

  const register = async (data: RegisterData) => {
    // Implementation needed
  };

  const logout = () => {
    setAuth({ user: null, isLoading: false, error: null });
  };

  useEffect(() => {
    // Check for existing session
    setAuth(prev => ({ ...prev, isLoading: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}