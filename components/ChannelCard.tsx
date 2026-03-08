'use client'
import { useState } from 'react'
import VideoModal from './VideoModal'

const BADGE: Record<string, string> = { ai: '#7c3aed', tech: '#e50914', science: '#0891b2' }

export default function ChannelCard({ channel }: { channel: any }) {
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState(false)
  return (
    <>
      <div onClick={() => setOpen(true)} style={{ flexShrink: 0, width: 200, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: '#111118', border: '1px solid #1e1e2e', transition: 'transform 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
          {!err && channel.thumb
            ? <img src={channel.thumb} alt={channel.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={() => setErr(true)} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>▶</div>}
          <span style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 4, background: BADGE[channel.category] || '#6b7280', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{channel.tag}</span>
        </div>
        <div style={{ padding: '10px 12px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#d1d5db', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{channel.name}</p>
          <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>YouTube · {channel.category}</p>
        </div>
      </div>
      {open && <VideoModal channel={channel} onClose={() => setOpen(false)} />}
    </>
  )
}
