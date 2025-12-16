# CampKit

UTM Link Manager for Marketing Teams.

## Setup

### 1. Run Database Schema

In Neon SQL Editor, run `schema.sql` to create the tables.

### 2. Environment Variables

Add these to Vercel:

```
DATABASE_URL=your-neon-connection-string
NEXTAUTH_URL=https://getcampkit.com
NEXTAUTH_SECRET=generate-a-random-32-char-string
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. Deploy

Push to GitHub, Vercel auto-deploys.

## Features

- ✅ User authentication
- ✅ UTM link builder
- ✅ Short links
- ✅ Click tracking
- ✅ Copy to clipboard

## Tech Stack

- Next.js 14
- Neon (Postgres)
- NextAuth.js
- Tailwind CSS
