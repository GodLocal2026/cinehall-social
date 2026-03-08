'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setMsg('')
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    if (error) { setMsg(error.message); setLoading(false); return }
    if (isSignUp) setMsg('Check your email to confirm!')
    else { router.push('/'); router.refresh() }
    setLoading(false)
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '0 16px' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ fontSize: '2rem', fontWeight: 900, color: '#e50914', textDecoration: 'none' }}>
            CINE<span style={{ color: '#a78bfa' }}>HALL</span>
          </Link>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 14 }}>AI Cinema & Social</p>
        </div>
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 12, padding: 24 }}>
          <button onClick={handleGoogle} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#1a1a2e', border: '1px solid #2e2e3e', color: '#e5e5e5', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 16 }}>
            🔑 Continue with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: '#1e1e2e' }} />
            <span style={{ color: '#6b7280', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1e1e2e' }} />
          </div>
          <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '12px 14px', borderRadius: 8, background: '#1a1a2e', border: '1px solid #2e2e3e', color: '#e5e5e5', fontSize: 14, outline: 'none' }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '12px 14px', borderRadius: 8, background: '#1a1a2e', border: '1px solid #2e2e3e', color: '#e5e5e5', fontSize: 14, outline: 'none' }} />
            <button type="submit" disabled={loading} style={{ padding: '12px', borderRadius: 8, background: '#e50914', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none' }}>
              {loading ? '...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>
          {msg && <p style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: msg.includes('Check') ? '#4ade80' : '#f87171' }}>{msg}</p>}
          <p style={{ marginTop: 16, textAlign: 'center', fontSize: 12, color: '#6b7280' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#a78bfa', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
