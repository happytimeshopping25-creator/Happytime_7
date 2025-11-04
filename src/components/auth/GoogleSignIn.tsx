'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../lib/firebaseClient';
import { Button } from '@/components/ui/button';
const provider = new GoogleAuthProvider();

export default function GoogleSignIn() {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleSignIn} className="w-full">Sign in with Google</Button>
  );
}
