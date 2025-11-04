'use client'

import React from 'react';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const AuthStatus: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex space-x-6 items-center">
      {user ? (
        <>
          <span className="text-zinc-600 dark:text-zinc-400">{user.email}</span>
          <button 
            onClick={handleSignOut} 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/signin" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
            Sign In
          </Link>
          <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
