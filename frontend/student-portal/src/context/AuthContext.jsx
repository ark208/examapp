import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/index.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check active session on load via /me
  useEffect(() => {
    let mounted = true;
    const verifySession = async () => {
      try {
        const currentUser = await api.me();
        if (mounted && currentUser) {
          setUser(currentUser);
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    verifySession();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ rollNo, password }) => {
    setIsLoading(true);
    try {
      const loggedInUser = await api.login({ rollNo, password });
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
