import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ChannelRow from '@/components/ChannelRow'
import NetflixPromo from '@/components/NetflixPromo'
import { CHANNELS } from '@/lib/channels'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const featured = CHANNELS[0]
  return (
    <main style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar user={user} />
      <Hero channel={featured} />
      <ChannelRow title="🤖 AI & Machine Learning" channels={CHANNELS.filter(c => c.category === 'ai')} />
      <ChannelRow title="💻 Coding & Tech" channels={CHANNELS.filter(c => c.category === 'tech')} />
      <ChannelRow title="🔬 Science & Math" channels={CHANNELS.filter(c => c.category === 'science')} />
      <NetflixPromo />
    </main>
  )
}
