import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44, hasToken } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!hasToken) {
      setIsLoadingAuth(false);
      return;
    }

    base44.auth.me()
      .then(u => setUser(u))
      .catch(err => {
        if (err?.type === 'user_not_registered') {
          setAuthError({ type: 'user_not_registered' });
        }
      })
      .finally(() => setIsLoadingAuth(false));
  }, []);

  const logout = () => {
    setUser(null);
    base44.auth.logout(window.location.href);
  };

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      appPublicSettings: null,
      logout,
      navigateToLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};