'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PostCard({ post, userId }: { post: any; userId: string }) {
  const [likes, setLikes] = useState(post.likes?.[0]?.count ?? 0)
  const [liked, setLiked] = useState(false)
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  async function toggleLike() {
    if (liked) {
      await supabase.from('likes').delete().match({ user_id: userId, post_id: post.id })
      setLikes((l: number) => l - 1)
    } else {
      await supabase.from('likes').insert({ user_id: userId, post_id: post.id })
      setLikes((l: number) => l + 1)
    }
    setLiked(!liked)
  }

  const thumb = post.thumbnail || (post.youtube_id ? `https://i.ytimg.com/vi/${post.youtube_id}/maxresdefault.jpg` : null)
  const embedUrl = post.youtube_id ? `https://www.youtube.com/embed/${post.youtube_id}?autoplay=1` : null

  return (
    <>
      <div style={{ borderRadius: 12, overflow: 'hidden', background: '#111118', border: '1px solid #1e1e2e' }}>
        {thumb && (
          <div style={{ position: 'relative', aspectRatio: '16/9', cursor: 'pointer' }} onClick={() => setOpen(true)}>
            <img src={thumb} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
              <span style={{ fontSize: '3rem' }}>▶</span>
            </div>
          </div>
        )}
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#a78bfa', fontSize: 11, fontWeight: 700 }}>
              {post.profiles?.username?.[0]?.toUpperCase() || '?'}
            </div>
            <span style={{ fontSize: 12, color: '#6b7280' }}>{post.profiles?.username || 'Anonymous'}</span>
          </div>
          <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{post.title}</h3>
          {post.description && <p style={{ fontSize: 12, color: '#9ca3af', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{post.description}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
            <button onClick={toggleLike} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', color: liked ? '#e50914' : '#6b7280' }}>
              {liked ? '❤️' : '🤍'} {likes}
            </button>
          </div>
        </div>
      </div>
      {open && embedUrl && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setOpen(false)}>
          <div style={{ width: '100%', maxWidth: 720, borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}>
            <iframe src={embedUrl} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </>
  )
}
