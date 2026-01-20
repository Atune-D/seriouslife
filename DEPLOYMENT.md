# Deployment Guide - KPI Coach MVP

## Prerequisites

Before deploying, ensure you have:
- A GitHub account with your code pushed to a repository
- A Vercel account (free tier works fine)
- A PostgreSQL database (Vercel Postgres, Supabase, or Railway)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Prepare Your Database

#### Using Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to Storage → Create Database
3. Select "Postgres" and create your database
4. Copy the `DATABASE_URL` connection string

#### Using Supabase (Free Tier)

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password

### Step 2: Deploy to Vercel

1. **Push your code to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: KPI Coach MVP"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Import Project in Vercel**

- Go to [Vercel Dashboard](https://vercel.com/new)
- Click "Import Project"
- Select your GitHub repository
- Click "Import"

3. **Configure Environment Variables**

In the Vercel deployment settings:
- Add variable: `DATABASE_URL`
- Paste your PostgreSQL connection string
- Click "Deploy"

4. **Run Database Migrations**

After first deployment, run migrations:
- Go to your project in Vercel
- Navigate to Settings → Functions
- Or use Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel env pull .env.local
npm run db:push
npm run db:seed  # Optional: add sample data
```

### Step 3: Access Your App

Your app will be live at: `https://your-project-name.vercel.app`

## Option 2: Deploy Elsewhere

### Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add PostgreSQL service
4. Set `DATABASE_URL` environment variable
5. Deploy

### Render

1. Go to [Render.com](https://render.com)
2. Create new Web Service from Git
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

## Post-Deployment

### 1. Run Database Setup

```bash
# If using Vercel CLI
vercel env pull
npm run db:push
npm run db:seed
```

### 2. Test Your Application

Visit your deployed URL and:
1. Go to Goals page
2. Create a Quarter Theme
3. Add KPIs
4. Go to Today page
5. Test KPI logging
6. Create tasks
7. Test reflection

### 3. Monitor

- Check Vercel logs for any errors
- Verify database connections
- Test all features in production

## Environment Variables

Required for deployment:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

Optional (for future features):

```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"
```

## Common Issues

### Database Connection Errors

**Problem**: `Error: P1001: Can't reach database server`

**Solution**:
- Verify `DATABASE_URL` is correctly set
- Check database firewall allows connections from Vercel IPs
- For Supabase: Use "Connection Pooling" URL instead of "Direct Connection"

### Prisma Client Not Generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:
- Add postinstall script to package.json (already included)
- Vercel should automatically run `prisma generate`
- Check build logs for errors

### Cold Start Performance

**Problem**: First load is slow

**Solution**:
- This is normal for serverless (free tier)
- Upgrade to paid plan for better performance
- Or deploy to Railway/Render for always-on instances

## Database Backup

### Backup Command

```bash
# Using PostgreSQL client
pg_dump $DATABASE_URL > backup.sql

# Restore from backup
psql $DATABASE_URL < backup.sql
```

### Automated Backups

- Vercel Postgres: Automatic backups on paid plans
- Supabase: Daily backups on all plans
- Railway: Point-in-time recovery available

## Scaling Considerations

### When to Upgrade

- Free tier handles ~100 users easily
- Upgrade when:
  - Response times > 1 second
  - Database connections exhausted
  - Need guaranteed uptime

### Performance Tips

1. **Database Indexing** (already optimized in schema)
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: Vercel provides global CDN automatically
4. **Database Connection Pooling**: Use Prisma Accelerate for production

## Security Checklist

- [x] Environment variables not in code
- [x] Database uses SSL connections
- [ ] Add authentication (NextAuth.js - post-MVP)
- [ ] Add rate limiting (post-MVP)
- [ ] Set up monitoring (Sentry, LogRocket)

## Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** - Built-in, free
2. **Sentry** - Error tracking
3. **PostHog** - Product analytics
4. **Uptime Robot** - Uptime monitoring

## Maintenance

### Regular Tasks

- Monitor error logs weekly
- Check database size monthly
- Review performance metrics
- Update dependencies quarterly

### Updating the App

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Vercel auto-deploys on push
```

## Support

If you encounter issues during deployment:
1. Check Vercel build logs
2. Verify environment variables
3. Test database connection locally first
4. Review this guide for common issues

---

**Ready to deploy?** Start with Step 1 above and follow the guide sequentially.


