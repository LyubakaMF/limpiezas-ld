import React, { createContext, useState, useContext, useEffect } from 'react';
import { base44, savedAuthToken } from '@/api/base44Client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // No token = anonymous visitor, skip auth entirely
    if (!savedAuthToken) return;

    // Defer auth check until after first paint — keeps /User/me out of LCP critical path
    const runAuth = () => {
      // Restore token into SDK lazily (saves back to localStorage)
      base44.auth.setToken(savedAuthToken, true);
      checkUserAuth();
    };

    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(runAuth, { timeout: 6000 });
    } else {
      setTimeout(runAuth, 5000);
    }
  }, []);

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    } catch {
      // Stale/invalid token — clear it
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('base44_access_token');
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};