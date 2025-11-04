'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../lib/firebase'

export default function Authentication() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
    const [createUserWithEmailAndPassword, newUser, newLoading, newError] = useCreateUserWithEmailAndPassword(auth)

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLogin) {
            await signInWithEmailAndPassword(email, password)
            if(user) router.push('/')
        } else {
            await createUserWithEmailAndPassword(email, password)
            if(newUser) router.push('/login')
        }
    }

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={handleAuth}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    required
                />
                <button type="submit">{loading || newLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {(error || newError) && <p>{error?.message || newError?.message}</p>}
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Sign up' : 'Have an account? Login'}
            </button>
        </div>
    )
}