'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// This is a placeholder for a real admin check. 
// In a real app, you would fetch user claims or check a database.
async function isAdmin(uid: string): Promise<boolean> {
  console.log('Checking admin status for UID:', uid);
  // For now, let's assume the first user is the admin for demonstration.
  // Replace this with your actual admin logic.
  return uid === 'REPLACE_WITH_YOUR_ADMIN_UID'; 
}

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) {
      return; // Wait until user auth state is loaded
    }

    if (!user) {
      router.replace('/login'); // Redirect to login if not authenticated
      return;
    }

    isAdmin(user.uid).then(status => {
      setIsAdminUser(status);
      if (!status) {
        router.replace('/'); // Redirect to home if not an admin
      }
    });

  }, [user, loading, router]);

  // Render a loading state while checking for admin status
  if (loading || isAdminUser === null) {
    return <div>Loading...</div>; 
  }

  // If the user is an admin, render the children
  if (isAdminUser) {
    return <>{children}</>;
  }

  // Otherwise, render nothing (or a fallback UI)
  return null;
}
