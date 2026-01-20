# KPI Coach MVP

A lightweight system that helps users reduce life entropy by focusing on:
1. **Daily KPI logging** (primary value)
2. **Daily tasks** with weekly themes (execution support)
3. **Nightly reflection** (short, includes energy)

## Features

- **2-Page UI**: Today + Goals
- **KPI Quick Log**: Track up to 3 KPIs with simple +/- buttons
- **Task Management**: Create tasks with "tiny start" actions, 0-10 progress tracking, and optional checklists
- **Auto-save**: All interactions save immediately
- **Weekly Themes**: Tasks auto-assign to weekly themes
- **Nightly Reflection**: Quick energy + mood + notes

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kpicoach"
```

Replace with your actual PostgreSQL connection string.

3. **Set up the database:**

```bash
# Generate Prisma Client
npm run db:generate

# Push the schema to your database
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Commands

- `npm run db:generate` - Generate Prisma Client after schema changes
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and run migrations (production)
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (backend)
│   ├── today/             # Today page
│   ├── goals/             # Goals page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── KPILogger.tsx     # KPI tracking component
│   ├── TaskCard.tsx      # Task display with checklist
│   └── ReflectionCard.tsx # Nightly reflection
├── lib/                   # Utilities and services
│   ├── prisma.ts         # Prisma client
│   ├── api-client.ts     # Frontend API utilities
│   └── services/         # Business logic
│       ├── today.ts      # Today page data aggregation
│       └── weekly-theme.ts # Weekly theme auto-assignment
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── package.json
```

## Usage

### First Time Setup

1. Go to **Goals** page
2. Create a **Quarter Theme** (e.g., "Build Healthy Habits")
3. Add 1-3 **KPIs** to track daily
4. Return to **Today** page

### Daily Workflow

1. **Morning**: Log initial KPI values, create tasks for the day
2. **During day**: Update progress on tasks, add checklist steps
3. **Evening**: Complete reflection (energy level + notes)

## API Endpoints

### Today Data
- `GET /api/today?date=YYYY-MM-DD` - Get all today data (context, KPIs, tasks, reflection)

### KPIs
- `POST /api/kpi-entries/increment` - Increment/decrement KPI value
- `GET /api/kpis` - Get all KPIs
- `POST /api/kpis` - Create new KPI (max 3 per quarter)

### Tasks
- `GET /api/tasks?date=YYYY-MM-DD` - Get tasks for date
- `POST /api/tasks` - Create task (auto-assigns to weekly theme)
- `PATCH /api/tasks/:id` - Update task (status, progress, resistance)
- `DELETE /api/tasks/:id` - Delete task

### Task Steps
- `POST /api/tasks/:taskId/steps` - Create checklist step
- `PATCH /api/tasks/:taskId/steps/:stepId` - Toggle step completion
- `DELETE /api/tasks/:taskId/steps/:stepId` - Delete step

### Reflection
- `PUT /api/reflections` - Upsert daily reflection
- `GET /api/reflections?date=YYYY-MM-DD` - Get reflection

### Goals
- `GET /api/quarter-themes` - Get all quarter themes
- `POST /api/quarter-themes` - Create quarter theme
- `POST /api/monthly-focuses` - Create monthly focus
- `POST /api/weekly-themes` - Create weekly theme

## Design Principles

1. **KPI-first**: KPI logging is at the top of Today page
2. **Auto-save**: No explicit save buttons, everything persists immediately
3. **Low pressure**: Avoid guilt language like "overdue" or "failed"
4. **Manual progress**: User always controls progress (0-10), steps are visual helpers only
5. **Tiny starts**: Every task has a 2-minute starter action to reduce resistance

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

### Database Options

- **Vercel Postgres** - Easy integration with Vercel
- **Supabase** - Free tier with PostgreSQL
- **Railway** - Simple PostgreSQL hosting
- **Local PostgreSQL** - For development

## Development Notes

- **User ID**: MVP uses hardcoded `default-user` for simplicity
- **Authentication**: Not implemented in MVP (add NextAuth.js later)
- **Progress Calculation**: Manual only (steps are independent of progress score)
- **Data Persistence**: All data stored in PostgreSQL via Prisma

## Future Enhancements (Post-MVP)

- User authentication (NextAuth.js)
- Push notifications / reminders
- Analytics dashboard
- Calendar integration
- Mobile native apps
- AI coaching suggestions

## License

Private project - All rights reserved

## Support

For issues or questions, contact the development team.
