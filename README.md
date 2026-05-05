# Folio Gallery

A folder-based photo gallery with admin dashboard. Inspired by a soft scrapbook / file-folder aesthetic.

## Features

### Public Site
- **Homepage** — Stacked folder cards showing all public albums
- **Folder view** — Masonry gallery with natural image ratios
- **Lightbox** — Click any image for full-screen preview with navigation
- **Responsive** — Works beautifully on all screen sizes

### Admin Dashboard (`/admin`)
- **Protected login** via Supabase Auth
- **Folder management** — Create, edit, delete, reorder folders (drag & drop)
- **Visibility toggle** — Public / Private per folder
- **Image management** — Drag & drop upload, reorder, caption, delete
- **Image filters** — Apply filters at upload time with live preview
- **Move images** — Move images between folders
- **Set cover** — Set any image as the folder cover image

### Image Filters
- None / Original
- Soft Warm
- Dusty Vintage
- Muted Pastel
- Film Grain
- Cool Blue
- Black & White
- Low Contrast

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Storage + PostgreSQL)
- **Framer Motion** (animations)
- **dnd-kit** (drag & drop)
- **react-masonry-css** (masonry layout)
- **react-dropzone** (file upload)
- **browser-image-compression** (auto compression)

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd folio-gallery
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Storage** → verify the `gallery` bucket exists and is public
4. Go to **Authentication** → **Users** → Add your admin user

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase URL and anon key from **Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Public gallery homepage |
| `/folder/[slug]` | Individual folder/album view |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard |
| `/admin/folders` | Folder management |
| `/admin/folders/[id]` | Folder detail + image management |

## Deploying

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set your environment variables in Vercel dashboard under **Settings → Environment Variables**.

## Color Theme

| Name | Hex |
|------|-----|
| Charcoal | `#3B3735` |
| Cream | `#D8D1BF` |
| Dusty Pink | `#D8B7B3` |
| Soft Blue | `#B7C8CF` |
| Off White | `#F4F0E8` |
| Muted Text | `#2F2F2F` |
| Warm Brown | `#8B7355` |

## Image Compression

Images are automatically compressed before upload using `browser-image-compression`:
- Max size: 2MB
- Max dimensions: 2400px
- EXIF data preserved
- Quality preserved as much as possible

## Notes

- The admin is a single user system — create one admin user via Supabase Auth dashboard
- Images are served directly from Supabase Storage CDN
- The gallery uses `revalidate = 60` for ISR (Incremental Static Regeneration)
- All drag & drop interactions work on touch devices
