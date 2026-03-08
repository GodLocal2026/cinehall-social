# CineHall Social

AI Cinema Social Media Platform — Next.js 14 + Supabase + Tailwind + Vercel

## Quick Start

### 1. Run database schema
Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/icaudjhthgdbrcelpmfx/sql) and run `supabase/schema.sql`

### 2. Set Vercel env vars
In Vercel project settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://icaudjhthgdbrcelpmfx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key from Supabase Settings > API>
```

### 3. Done — redeploy on Vercel

## Features
- 🎬 Netflix-style home with curated AI YouTube channels
- 🔐 Auth: Google OAuth + email/password via Supabase
- 📺 Feed: share YouTube videos with title + description
- ❤️ Likes (real-time ready)
- 💬 Comments table ready
- 👥 Follows table ready
