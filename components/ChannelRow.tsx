import ChannelCard from './ChannelCard'

export default function ChannelRow({ title, channels }: { title: string; channels: any[] }) {
  return (
    <div style={{ padding: '20px 32px' }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'thin' as const }}>
        {channels.map(ch => <ChannelCard key={ch.id} channel={ch} />)}
      </div>
    </div>
  )
}
