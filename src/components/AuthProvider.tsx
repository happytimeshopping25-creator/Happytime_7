"use client";

// Auto-generated placeholder for missing module
import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.warn("⚠️ Using fallback for AuthProvider");
  return (
    <AuthContext.Provider value={{ user: null, loading: true, isAdmin: false } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
