'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'

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

    return (
        <form onSubmit={handleSignin}>
            <h2>Sign In</h2>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <button type="submit">Sign In</button>
            {error && <p>{error.message}</p>}
        </form>
    )
}