'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Navbar({ user }: { user: any }) {
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/'); router.refresh()
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
      <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#e50914', textDecoration: 'none' }}>
        CINE<span style={{ color: '#a78bfa' }}>HALL</span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        <Link href="/" style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
        <Link href="/feed" style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, color: '#9ca3af', textDecoration: 'none' }}>Feed</Link>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {user ? (
          <>
            <Link href="/post/new" style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: '#e50914', color: '#fff', textDecoration: 'none' }}>+ Post</Link>
            <button onClick={signOut} style={{ fontSize: 12, color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
          </>
        ) : (
          <Link href="/auth/login" style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: '#e50914', color: '#fff', textDecoration: 'none' }}>Sign In</Link>
        )}
      </div>
    </nav>
  )
}
