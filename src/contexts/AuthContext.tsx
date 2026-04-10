import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, isFirebaseReady } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export type View =
  | 'landing'
  | 'dashboard'
  | 'testimonials'
  | 'location'
  | 'process'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'agreement';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  currentView: View;
  setCurrentView: (view: View) => void;
  mockLogin: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<View>('landing');

  useEffect(() => {
    if (!isFirebaseReady) {
      console.warn('Firebase is not ready. Defaulting to logged-out state. Mocks enabled.');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      setIsAdmin(!!currentUser && !!adminEmail && currentUser.email === adminEmail);

      if (!currentUser && currentView === 'dashboard') {
        setCurrentView('landing');
      }
    });

    return () => unsubscribe();
  }, [currentView]);

  // Mock implementation for auth (when firebase is not ready)
  const mockLogin = (email: string) => {
    if (!isFirebaseReady) {
      setUser({ email, uid: 'mock-uid-123' } as User);
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';
      setIsAdmin(email === adminEmail);
      setCurrentView('dashboard');
    }
  };

  const logout = () => {
    if (!isFirebaseReady) {
       setUser(null);
       setIsAdmin(false);
       if (currentView === 'dashboard') {
         setCurrentView('landing');
       }
    } else {
        auth.signOut();
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, currentView, setCurrentView, mockLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
