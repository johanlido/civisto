# Civisto Deployment Guide

This guide covers deploying Civisto to production environments using Supabase and various hosting platforms.

## 🏗️ Architecture Overview

Civisto uses a modern serverless architecture:

- **Database**: PostgreSQL with PostGIS (Supabase)
- **Backend**: Supabase Edge Functions (Deno runtime)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## 🚀 Production Deployment

### Prerequisites

- Supabase account and project
- GitHub account (for CI/CD)
- Domain name (optional)
- Email service account (SendGrid, Resend, etc.)

### Step 1: Create Supabase Project

1. **Create Project**
   ```bash
   # Visit https://supabase.com/dashboard
   # Click "New Project"
   # Choose organization and region
   ```

2. **Get Project Credentials**
   ```bash
   # From Project Settings > API
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### Step 2: Configure Environment Variables

Create production environment variables:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Authentication
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_SECRET=your-github-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_SECRET=your-google-secret

# AI Services
OPENAI_API_KEY=your-openai-api-key

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key

# Municipality Integration
MUNICIPALITY_API_KEY=your-municipality-api-key
WEBHOOK_SECRET=your-webhook-secret

# Application URLs
NEXT_PUBLIC_APP_URL=https://civisto.com
NEXT_PUBLIC_API_URL=https://your-project.supabase.co
```

### Step 3: Deploy Database Schema

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
cd backend
supabase link --project-ref your-project-id

# Deploy database schema
supabase db push

# Seed with initial data (optional for production)
supabase db reset --seed
```

### Step 4: Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy analyze-report
supabase functions deploy gamification  
supabase functions deploy notify-municipality

# Set function secrets
supabase secrets set OPENAI_API_KEY=your-openai-api-key
supabase secrets set SENDGRID_API_KEY=your-sendgrid-api-key
supabase secrets set MUNICIPALITY_API_KEY=your-municipality-api-key
```

### Step 5: Configure Authentication

1. **OAuth Providers**
   ```bash
   # In Supabase Dashboard > Authentication > Providers
   # Enable GitHub, Google, etc.
   # Add redirect URLs: https://your-domain.com/auth/callback
   ```

2. **Email Templates**
   ```bash
   # Customize email templates in Authentication > Email Templates
   # Update with your branding and domain
   ```

### Step 6: Set Up Storage

```bash
# Create storage buckets
supabase storage create report-images --public
supabase storage create user-avatars --public
supabase storage create badge-icons --public

# Set up storage policies
# (These are included in the schema migration)
```

## 🔄 CI/CD with GitHub Actions

### Setup Secrets

Add these secrets to your GitHub repository:

```bash
# Repository Settings > Secrets and Variables > Actions

SUPABASE_ACCESS_TOKEN=your-supabase-access-token
SUPABASE_PROJECT_ID=your-production-project-id
SUPABASE_STAGING_PROJECT_ID=your-staging-project-id (optional)
```

### Deployment Workflow

The included `.github/workflows/ci.yml` automatically:

1. **On Pull Request**: Runs tests and security scans
2. **On Push to `develop`**: Deploys to staging environment
3. **On Push to `main/master`**: Deploys to production

### Manual Deployment

```bash
# Deploy to production manually
cd backend
supabase link --project-ref your-project-id
supabase db push
supabase functions deploy
```

## 🌐 Custom Domain Setup

### Supabase Custom Domain

1. **Add Domain in Dashboard**
   ```bash
   # Supabase Dashboard > Settings > Custom Domains
   # Add your domain: api.civisto.com
   ```

2. **Update DNS Records**
   ```bash
   # Add CNAME record pointing to Supabase
   api.civisto.com CNAME your-project.supabase.co
   ```

3. **Update Environment Variables**
   ```bash
   SUPABASE_URL=https://api.civisto.com
   NEXT_PUBLIC_API_URL=https://api.civisto.com
   ```

## 📊 Monitoring and Analytics

### Supabase Dashboard

Monitor your deployment through:
- **Database**: Query performance, connections
- **Auth**: User signups, login attempts
- **Storage**: File uploads, bandwidth usage
- **Edge Functions**: Invocations, errors, performance

### Custom Monitoring

Add monitoring services:

```bash
# Sentry for error tracking
SENTRY_DSN=your-sentry-dsn

# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Mixpanel for user analytics
MIXPANEL_TOKEN=your-mixpanel-token
```

## 🔒 Security Configuration

### Database Security

```sql
-- Enable RLS on all tables (already included in schema)
-- Review and update RLS policies as needed
-- Set up database backups and point-in-time recovery
```

### API Security

```bash
# Rate limiting (configured in Edge Functions)
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# CORS configuration (in supabase/config.toml)
# JWT expiry settings
# Password requirements
```

### Infrastructure Security

- Enable 2FA on all service accounts
- Use environment variables for all secrets
- Regularly rotate API keys and tokens
- Monitor for suspicious activity
- Keep dependencies updated

## 📈 Scaling Considerations

### Database Scaling

```bash
# Monitor database performance
# Consider read replicas for high traffic
# Optimize queries and add indexes
# Set up connection pooling
```

### Edge Functions Scaling

```bash
# Functions auto-scale with Supabase
# Monitor invocation limits
# Optimize function performance
# Consider caching strategies
```

### Storage Scaling

```bash
# Monitor storage usage and bandwidth
# Implement CDN for global distribution
# Optimize image sizes and formats
# Set up automated cleanup policies
```

## 🚨 Backup and Recovery

### Database Backups

```bash
# Supabase provides automatic backups
# Set up additional backup strategies if needed
# Test recovery procedures regularly
```

### Configuration Backups

```bash
# Version control all configuration
# Document deployment procedures
# Maintain staging environment for testing
```

## 🔧 Troubleshooting

### Common Issues

1. **Migration Failures**
   ```bash
   # Check migration logs
   supabase db reset --debug
   
   # Rollback if needed
   supabase db reset --to-migration 20240101000000
   ```

2. **Function Deployment Issues**
   ```bash
   # Check function logs
   supabase functions logs analyze-report
   
   # Test functions locally
   supabase functions serve
   ```

3. **Authentication Problems**
   ```bash
   # Verify OAuth configuration
   # Check redirect URLs
   # Review email template settings
   ```

### Performance Issues

```bash
# Monitor database queries
# Check function execution times
# Review storage access patterns
# Analyze user behavior
```

## 📞 Support

### Production Support

- **Critical Issues**: [urgent@civisto.com](mailto:urgent@civisto.com)
- **General Support**: [support@civisto.com](mailto:support@civisto.com)
- **Community**: [Discord](https://discord.gg/civisto)

### Supabase Support

- **Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- **Enterprise**: Supabase Pro/Team support

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Database schema tested
- [ ] Edge Functions tested locally
- [ ] Authentication providers configured
- [ ] Storage buckets created
- [ ] Monitoring set up
- [ ] Backup strategy in place

### Post-Deployment

- [ ] Database migrations successful
- [ ] Edge Functions deployed and working
- [ ] Authentication flow tested
- [ ] Storage uploads working
- [ ] Monitoring alerts configured
- [ ] Performance baseline established
- [ ] Documentation updated

### Ongoing Maintenance

- [ ] Regular security updates
- [ ] Performance monitoring
- [ ] Backup verification
- [ ] User feedback review
- [ ] Feature flag management
- [ ] Capacity planning

---

**🎉 Congratulations! Your Civisto deployment is ready to empower citizens and improve communities worldwide!**

