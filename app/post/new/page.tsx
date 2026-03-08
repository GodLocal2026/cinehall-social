'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function getYouTubeId(url: string) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)(\w[\w-]{10}\w)/)
    return m ? m[1] : null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }
    const ytId = getYouTubeId(youtubeUrl)
    const thumb = ytId ? `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` : null
    const { error } = await supabase.from('posts').insert({ user_id: user.id, title, youtube_url: youtubeUrl, youtube_id: ytId, thumbnail: thumb, description })
    if (!error) router.push('/feed')
    else setLoading(false)
  }

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 8, background: '#1a1a2e', border: '1px solid #2e2e3e', color: '#e5e5e5', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: '#9ca3af', marginBottom: 6 }

  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar user={null} />
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '40px 16px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Share a Video</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={labelStyle}>Title</label><input value={title} onChange={e => setTitle(e.target.value)} required placeholder="What is this about?" style={inputStyle} /></div>
          <div><label style={labelStyle}>YouTube URL</label><input value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} required placeholder="https://youtube.com/watch?v=..." style={inputStyle} /></div>
          <div><label style={labelStyle}>Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Tell people what to expect..." style={{ ...inputStyle, resize: 'none' }} /></div>
          <button type="submit" disabled={loading} style={{ padding: '13px', borderRadius: 8, background: '#e50914', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', border: 'none' }}>
            {loading ? 'Posting...' : 'Post Video'}
          </button>
        </form>
      </div>
    </main>
  )
}
