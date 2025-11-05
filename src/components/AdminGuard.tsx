"use client"

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'

import { useAuth } from '@/components/AuthProvider'
import { db } from '@/lib/firestore'

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (loading) return
    if (!user) {
      setAuthorized(false)
      setChecking(false)
      router.replace('/signin')
      return
    }

    let cancelled = false
    const verify = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', user.uid))
        const role = snap.exists() ? (snap.data() as any).role : null
        if (!cancelled) {
          if (role === 'admin') {
            setAuthorized(true)
          } else {
            setAuthorized(false)
            router.replace('/')
          }
        }
      } finally {
        if (!cancelled) setChecking(false)
      }
    }

    verify()

    return () => {
      cancelled = true
    }
  }, [user, loading, router])

  if (loading || checking) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-500">
        جار التحقق من صلاحيات الوصول...
      </div>
    )
  }

  if (!authorized) return null

  return <>{children}</>
}
