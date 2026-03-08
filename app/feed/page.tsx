export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url), likes(count)')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar user={user} />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Feed</h1>
          <Link href="/post/new" style={{ padding: '8px 18px', borderRadius: 20, background: '#e50914', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>+ Post Video</Link>
        </div>
        {posts?.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map((post: any) => <PostCard key={post.id} post={post} userId={user.id} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>📺</div>
            <p>No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </main>
  )
}
