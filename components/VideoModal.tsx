'use client'
import { useEffect } from 'react'

export default function VideoModal({ channel, onClose }: { channel: any; onClose: () => void }) {
  const embed = `https://www.youtube.com/embed?listType=user_uploads&list=${channel.id}&autoplay=1&rel=0`

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: '100%', maxWidth: 800, borderRadius: 12, overflow: 'hidden', background: '#111118', border: '1px solid #1e1e2e' }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          <iframe src={embed} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
        </div>
        <div style={{ padding: '16px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18 }}>{channel.name}</h3>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', border: 'none', color: '#e5e5e5', cursor: 'pointer', fontSize: 14 }}>✕</button>
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10 }}>YouTube · {channel.tag}</p>
          <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.5 }}>{channel.desc}</p>
          <a href={`https://www.youtube.com/channel/${channel.id}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 10, fontSize: 12, color: '#a78bfa', textDecoration: 'none' }}>↗ Open on YouTube</a>
        </div>
      </div>
    </div>
  )
}
