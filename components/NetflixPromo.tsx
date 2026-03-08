export default function NetflixPromo() {
  return (
    <div style={{ margin: '16px 32px 32px', borderRadius: 12, background: 'linear-gradient(135deg, #141414, #1a0000)', border: '1px solid #2a0000', padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ fontSize: '2rem', fontWeight: 900, color: '#e50914', flexShrink: 0 }}>N</div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Watch movies & series on Netflix</h3>
        <p style={{ fontSize: 13, color: '#6b7280' }}>Thousands of films, shows and documentaries. From $6.99/mo.</p>
      </div>
      <a href="https://netflix.com" target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', padding: '10px 22px', borderRadius: 6, fontWeight: 700, fontSize: 13, background: '#e50914', color: '#fff', textDecoration: 'none', flexShrink: 0 }}>Open Netflix →</a>
    </div>
  )
}
