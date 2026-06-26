# SobalTech — Agency Website

A modern, full-stack agency website built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth v5 (Credentials + OAuth) |
| Forms | React Hook Form + Zod |
| Rich Text | TipTap |
| Email | Resend |
| Deployment | Vercel |

## Getting Started

### 1. Clone and install

```bash
cd sobaltech
npm install --legacy-peer-deps
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sobaltech"
AUTH_SECRET="generate-with: openssl rand -base64 32"
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
GEMINI_API_KEY="..."
GEMINI_MODEL="gemini-2.0-flash"

# Optional chatbot fallback
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-5.5"
```

### 3. Database setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to DB
npm run db:push

# Seed with demo data
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

**Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials (after seeding):**
- Email: `admin@sobaltech.com`
- Password: `Admin123!`

## Project Structure

```
sobaltech/
├── app/
│   ├── (site)/              # Public website
│   │   ├── page.tsx         # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── request-quote/
│   ├── admin/               # Admin dashboard
│   │   ├── dashboard/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   ├── team/
│   │   ├── inbox/
│   │   └── settings/
│   └── api/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── shared/              # Reusable shared components
│   ├── site/                # Public site components
│   └── admin/               # Admin panel components
├── lib/
│   ├── actions/             # Server actions
│   ├── auth/                # NextAuth config
│   ├── db/                  # Prisma client
│   ├── email/               # Email sending
│   ├── validations/         # Zod schemas
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── types/
    └── index.ts
```

## Admin Features

The admin dashboard (`/admin`) allows full CMS control over:

- **Services** — CRUD with rich text editor, icon, features list
- **Projects/Portfolio** — CRUD with gallery, tags, client info
- **Blog** — Full post editor with TipTap, tags, SEO
- **Testimonials** — Manage client testimonials
- **Team** — Manage team member profiles
- **Inbox** — View and manage contact/quote submissions
- **Settings** — Edit site content (hero, contact info, SEO)

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Make sure to set up a managed PostgreSQL database (Vercel Postgres, Neon, Supabase, etc.).
