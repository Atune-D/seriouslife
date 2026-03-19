# Quick Start Guide - KPI Coach MVP

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

> **Note**: If you get npm permission errors, try using `yarn` or `pnpm` instead.

### 2. Set Up Database Connection

Create a `.env.local` file in the root directory:

```bash
# Copy the example
cp env.example .env.local
```

Edit `.env.local` with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/kpicoach"
```

**Quick database options:**

**Option A - Local PostgreSQL:**
```bash
createdb kpicoach
# Use: postgresql://postgres:postgres@localhost:5432/kpicoach
```

**Option B - Docker:**
```bash
docker run --name kpicoach-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=kpicoach -p 5432:5432 -d postgres:15
# Use: postgresql://postgres:postgres@localhost:5432/kpicoach
```

**Option C - Supabase (Free):**
1. Go to https://supabase.com
2. Create project
3. Copy connection string from Settings → Database

### 3. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Create tables
npm run db:push

# Add sample data (optional but recommended)
npm run db:seed
```

### 4. Start the App

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## First Use

### If You Used Seed Data

1. Go to **Today** page
2. You'll see:
   - 3 sample KPIs (Deep work, Exercise, Reading)
   - 2 sample tasks with checklists
   - Active quarter theme

3. Try these actions:
   - Click + on KPIs to log values
   - Drag progress slider on tasks
   - Toggle checklist items
   - Expand reflection and fill it out

### If Starting Fresh

1. Click **Goals** button
2. Create a Quarter Theme:
   - Title: "Build Healthy Habits"
   - Start/End dates for Q1 2026
3. Add KPIs (1-3):
   - Name: "Deep work sessions"
   - Unit: "sessions"
   - Target: 2
4. Return to **Today**
5. Click **+ Add Task**:
   - Title: "Complete project proposal"
   - Tiny start: "Open blank doc"
6. Start tracking!

## Common Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Run production build

# Database
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema changes
npm run db:seed       # Seed sample data

# Tools
npx prisma studio     # Open database GUI
```

## Troubleshooting

### "Cannot find module '@prisma/client'"
Run: `npm run db:generate`

### "Database connection failed"
- Check `.env.local` exists
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running

### "Port 3000 already in use"
```bash
lsof -ti:3000 | xargs kill -9
# Or use different port:
npm run dev -- -p 3001
```

## What's Next?

- ✅ Read [README.md](README.md) for full documentation
- ✅ Check [DEVELOPMENT.md](DEVELOPMENT.md) for development guide
- ✅ See [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to production

## Getting Help

1. Check error messages in terminal
2. Review [DEVELOPMENT.md](DEVELOPMENT.md) troubleshooting section
3. Verify database connection with: `npx prisma studio`

---

**Enjoy tracking your KPIs!** 🎯


