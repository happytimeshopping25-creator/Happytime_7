'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const success = await createUserWithEmailAndPassword(email, password)
        if (success) {
            router.push('/login')
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>
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
            <button type="submit">Sign Up</button>
            {error && <p>{error.message}</p>}
        </form>
    )
}