# Development Guide - KPI Coach MVP

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

If you encounter npm permission errors, you can try:
```bash
# Using yarn instead
npm install -g yarn
yarn install

# Or using pnpm
npm install -g pnpm
pnpm install
```

### 2. Set Up Local Database

#### Option A: Local PostgreSQL

Install PostgreSQL locally:
- **macOS**: `brew install postgresql@15`
- **Windows**: Download from postgresql.org
- **Linux**: `sudo apt-get install postgresql`

Start PostgreSQL and create database:
```bash
# Start PostgreSQL
brew services start postgresql@15  # macOS

# Create database
createdb kpicoach

# Set environment variable
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kpicoach"' > .env.local
```

#### Option B: Docker PostgreSQL

```bash
# Run PostgreSQL in Docker
docker run --name kpicoach-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=kpicoach \
  -p 5432:5432 \
  -d postgres:15

# Set environment variable
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kpicoach"' > .env.local
```

#### Option C: Cloud Database (Development)

Use Supabase free tier:
1. Create project at supabase.com
2. Get connection string from Settings → Database
3. Add to `.env.local`

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

### Key Directories

```
app/
├── api/              # Backend API routes (Next.js API)
│   ├── today/        # GET /api/today
│   ├── tasks/        # Task CRUD
│   ├── kpi-entries/  # KPI logging
│   └── ...
├── today/            # Today page (main UI)
├── goals/            # Goals management page
└── layout.tsx        # Root layout

components/
├── ui/               # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ProgressSlider.tsx
│   └── Checkbox.tsx
├── KPILogger.tsx     # KPI quick-log component
├── TaskCard.tsx      # Task with checklist
└── ReflectionCard.tsx # Nightly reflection

lib/
├── prisma.ts         # Prisma client singleton
├── api-client.ts     # Frontend API utilities
└── services/         # Business logic layer
    ├── today.ts      # Aggregate today data
    └── weekly-theme.ts # Auto-assign weekly themes

prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Seed script
```

### Architecture Flow

```
User → UI Component → API Client → API Route → Service → Prisma → PostgreSQL
```

## Common Development Tasks

### Adding a New Feature

1. **Update Prisma Schema** (if database changes needed)
```bash
# Edit prisma/schema.prisma
npm run db:push
npm run db:generate
```

2. **Create Service Function** (business logic)
```typescript
// lib/services/my-feature.ts
export async function myFeature() {
  // Business logic here
}
```

3. **Create API Route**
```typescript
// app/api/my-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle request
  return NextResponse.json({ data });
}
```

4. **Add API Client Function**
```typescript
// lib/api-client.ts
export async function fetchMyFeature() {
  const response = await fetch('/api/my-feature');
  return response.json();
}
```

5. **Use in Component**
```typescript
// components/MyFeature.tsx
'use client';
import { fetchMyFeature } from '@/lib/api-client';
// Implement UI
```

### Working with Database

```bash
# View database contents
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Create a migration (for production)
npx prisma migrate dev --name my_migration

# Format schema
npx prisma format
```

### Debugging

#### Database Queries
```typescript
// Enable Prisma query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

#### API Routes
- Check Network tab in browser DevTools
- Console.log in API routes shows in terminal
- Use Postman/Insomnia to test endpoints

#### React Components
- Use React DevTools browser extension
- Add console.log in component
- Check browser console for errors

## Code Style

### Naming Conventions

- **Components**: PascalCase (`TaskCard.tsx`)
- **Functions**: camelCase (`fetchTodayData`)
- **Database fields**: snake_case (`quarter_theme_id`)
- **API fields**: snake_case (`kpi_id`, `tiny_start`)
- **React props**: camelCase (`onUpdate`, `taskId`)

### File Organization

- One component per file
- Export component as default
- Keep components under 300 lines
- Extract logic into hooks when complex

### Database Patterns

```typescript
// ✅ Good: Aggregate queries
const data = await getTodayData(date, userId);

// ❌ Bad: Multiple separate queries
const kpis = await fetchKPIs();
const tasks = await fetchTasks();
const reflection = await fetchReflection();
```

## Testing

### Manual Testing Checklist

Today Page:
- [ ] KPI increment/decrement
- [ ] Create task
- [ ] Update task progress
- [ ] Add checklist step
- [ ] Toggle step completion
- [ ] Submit reflection

Goals Page:
- [ ] Create quarter theme
- [ ] Create KPI
- [ ] View all goals
- [ ] Navigate between pages

### Unit Tests (Future)

```bash
# Install test dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## Performance Tips

### Optimization Strategies

1. **Use Server Components** where possible
2. **Client Components** only for interactivity
3. **Debounce** user inputs (already implemented)
4. **Optimistic UI** for instant feedback
5. **Single aggregated queries** (Today page pattern)

### Monitoring Performance

```bash
# Analyze bundle size
npm run build
```

Check `.next/analyze` for bundle analysis.

## Troubleshooting

### Common Issues

#### "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

#### "Database connection failed"
- Check `.env.local` exists
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running

#### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

#### Hot reload not working
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Git Workflow

### Branch Strategy

```bash
# Feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create PR on GitHub
```

### Commit Messages

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructure
- `test:` - Tests
- `chore:` - Maintenance

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Vercel CLI](https://vercel.com/docs/cli) - Deployment
- [React DevTools](https://react.dev/learn/react-developer-tools)

## Getting Help

1. Check error message carefully
2. Search codebase for similar patterns
3. Review relevant documentation
4. Check this guide for common issues
5. Ask on team Discord/Slack

---

Happy coding! 🚀


