import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { auth } from '@/src/firebase.native'
import { db } from '@/src/firestore.native'

type UiSettings = {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  heroHeadline: string
  heroSubheadline: string
  logoUrl: string
  footerText: string
}

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [uiSettings, setUiSettings] = useState<UiSettings>({
    primaryColor: '#0f766e',
    secondaryColor: '#0ea5e9',
    accentColor: '#f97316',
    heroHeadline: 'Happy Time',
    heroSubheadline: 'أهلاً بك في متجر السعادة!',
    logoUrl: '',
    footerText: '© Happy Time'
  })

  useEffect(() => {
    let cancelled = false
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'config', 'uiSettings'))
        if (snap.exists() && !cancelled) {
          setUiSettings((prev) => ({ ...prev, ...(snap.data() as Partial<UiSettings>) }))
        }
      } catch (err) {
        console.warn('Failed to load UI settings', err)
      }
    }
    loadSettings()
    return () => {
      cancelled = true
    }
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => setError(err.message))
  }

  return (
    <View style={[styles.container, { backgroundColor: uiSettings.secondaryColor }]}>
      <Text style={[styles.title, { color: uiSettings.primaryColor }]}>{uiSettings.heroHeadline}</Text>
      <Text style={[styles.subtitle, { color: uiSettings.accentColor }]}>{uiSettings.heroSubheadline}</Text>
      <TextInput
        style={styles.input}
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="دخول" onPress={handleLogin} color={uiSettings.primaryColor} />
      <Text style={[styles.footer, { color: uiSettings.primaryColor }]}>{uiSettings.footerText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 12 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  input: {
    height: 48,
    borderColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff'
  },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  footer: { marginTop: 24, textAlign: 'center' }
})
