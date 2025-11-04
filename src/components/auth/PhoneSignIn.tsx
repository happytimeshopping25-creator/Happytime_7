'use client';

import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../lib/firebaseClient'; // Directly import 'auth'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PhoneSignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number.');
      return;
    }
    setError(null);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setIsCodeSent(true);
    } catch (error: any) {      
      setError(error.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code.');
      return;
    }
    setError(null);
    try {
      await confirmationResult.confirm(verificationCode);
      // User signed in successfully.
    } catch (error: any) {      
      setError(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>
      {!isCodeSent ? (
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            type="tel"
            placeholder="+968 12345678"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Button onClick={handleSendCode} className="w-full">Send Code</Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="verification-code">Verification Code</Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="Enter the 6-digit code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          <Button onClick={handleVerifyCode} className="w-full">Verify Code</Button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}
