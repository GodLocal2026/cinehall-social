'use client'
import { useState } from 'react'
import VideoModal from './VideoModal'

export default function Hero({ channel }: { channel: any }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{ position: 'relative', height: 520, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${channel.thumb}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.05) 40%, rgba(10,10,15,0.85) 75%, #0a0a0f 100%)' }} />
        <div style={{ position: 'relative', padding: '0 40px 40px', maxWidth: 580 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a78bfa', marginBottom: 10 }}>✦ Featured · AI</p>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: 10, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{channel.name}</h2>
          <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.5, marginBottom: 20, textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>{channel.desc}</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14, background: '#fff', color: '#000', border: 'none', cursor: 'pointer' }}>▶ Watch</button>
            <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 6, fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>ℹ More Info</button>
          </div>
        </div>
      </div>
      {open && <VideoModal channel={channel} onClose={() => setOpen(false)} />}
    </>
  )
}
