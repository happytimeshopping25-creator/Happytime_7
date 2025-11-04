import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase.native';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // قائمة الشاشات التي لا تتطلب مصادقة
    const unprotectedRoutes = ['login'];
    const currentRoute = segments[0] as string;

    if (!user && !unprotectedRoutes.includes(currentRoute)) {
      // إذا لم يكن المستخدم مسجلاً دخوله وهو في شاشة محمية، أعد توجيهه لصفحة الدخول
      router.replace('/login');
    } else if (user && unprotectedRoutes.includes(currentRoute)) {
      // إذا كان المستخدم مسجلاً دخوله وهو في صفحة تسجيل الدخول، أعد توجيهه للصفحة الرئيسية (أو صفحة الطلبات)
      router.replace('/orders');
    }
  }, [user, segments, router]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}