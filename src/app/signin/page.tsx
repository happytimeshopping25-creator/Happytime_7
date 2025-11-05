
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, google } from '../../lib/firebase'
import { signInWithPopup } from "firebase/auth";

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const success = await signInWithEmailAndPassword(email, password)
        if (success) {
            router.push('/')
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, google);
            router.push('/');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-zinc-800">
                <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">Sign In</h2>
                <form onSubmit={handleSignin} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-2 mt-2 text-zinc-900 bg-zinc-100 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 mt-2 text-zinc-900 bg-zinc-100 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white dark:border-zinc-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    {error && <p className="text-sm text-red-500">{error.message}</p>}
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-300 dark:border-zinc-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">Or continue with</span>
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    )
}
