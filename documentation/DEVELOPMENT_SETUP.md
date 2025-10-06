# SEO ReportBot - DEVELOPMENT SETUP GUIDE
*Generated: September 14, 2025*

## 🚀 QUICK START

This guide will get you up and running with the SEO ReportBot development environment in under 30 minutes.

### **Prerequisites**
- **Node.js**: Version 18 or higher
- **PostgreSQL**: Version 14 or higher  
- **Google Cloud Console**: Account for OAuth credentials
- **Git**: For version control

---

## 📦 INSTALLATION

### **1. Clone and Install**
```bash
# Clone the repository
git clone <repository-url>
cd WHITE-LABEL-SEO

# Install dependencies
npm install

# Verify installation
npm run build
```

### **2. Environment Setup**
```bash
# Copy example environment file
cp .env.example .env

# Edit environment variables
nano .env
```

### **3. Required Environment Variables**
```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/seo_reportbot"

# NextAuth.js Configuration  
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Required)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Optional APIs (can be empty for initial setup)
GOOGLE_ANALYTICS_API_KEY=""
PAGESPEED_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## 🔐 GOOGLE OAUTH SETUP

### **Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "SEO ReportBot"
3. Enable required APIs:
   - Google+ API
   - Google Search Console API
   - Google Analytics Reporting API

### **Step 2: Configure OAuth Consent Screen**
1. Navigate to "APIs & Services" → "OAuth consent screen"
2. Choose "External" user type
3. Fill in application information:
   - **App name**: SEO ReportBot
   - **User support email**: Your email
   - **App logo**: Optional
   - **App domain**: http://localhost:3000 (for development)

### **Step 3: Create OAuth Credentials**
1. Navigate to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Configure:
   - **Name**: SEO ReportBot Local
   - **Authorized origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

### **Step 4: Configure Scopes**
Add these scopes to your OAuth consent screen:
```
openid
email
profile  
https://www.googleapis.com/auth/webmasters.readonly
https://www.googleapis.com/auth/analytics.readonly
```

### **Step 5: Add Credentials to .env**
```bash
GOOGLE_CLIENT_ID="your_client_id_here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_client_secret_here"
```

---

## 🗄️ DATABASE SETUP

### **Option A: Local PostgreSQL**

**Install PostgreSQL** (if not already installed):
```bash
# macOS with Homebrew
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

**Create Database**:
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE seo_reportbot;
CREATE USER seo_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE seo_reportbot TO seo_user;
\q
```

**Update .env**:
```bash
DATABASE_URL="postgresql://seo_user:your_password@localhost:5432/seo_reportbot"
```

### **Option B: Cloud Database (Recommended)**

**Supabase** (Free tier available):
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string to `DATABASE_URL`

**Vercel Postgres**:
1. Go to [vercel.com](https://vercel.com)
2. Create database in dashboard
3. Copy connection string to `DATABASE_URL`

### **Run Database Migrations**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma db push

# (Optional) Open database browser
npx prisma studio
```

---

## 🚀 RUNNING THE APPLICATION

### **Development Server**
```bash
# Start development server
npm run dev

# Server will start at http://localhost:3000
```

### **Available URLs**
- **Homepage**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Component Showcase**: http://localhost:3000/showcase
- **Client Management**: http://localhost:3000/clients
- **Settings**: http://localhost:3000/settings

### **Build for Production**
```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 🧪 TESTING THE SETUP

### **1. Basic Functionality**
- [ ] Homepage loads without errors
- [ ] Component showcase displays all components
- [ ] Navigation between pages works

### **2. Authentication**
- [ ] Sign in button appears
- [ ] Google OAuth redirect works
- [ ] User can sign in with Google account
- [ ] Dashboard loads after authentication

### **3. Database**
- [ ] Prisma Studio opens (http://localhost:5555)
- [ ] Database tables are created
- [ ] User data persists after login

### **4. Development Tools**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run linting
npm run lint

# Check build
npm run build
```

---

## 🛠️ DEVELOPMENT WORKFLOW

### **File Structure Overview**
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages  
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/             # Component library
│   ├── atoms/             # Basic elements
│   ├── molecules/         # Combinations
│   ├── organisms/         # Complex components
│   └── templates/         # Page layouts
├── lib/                   # Utilities
│   ├── auth.ts            # NextAuth config
│   ├── db.ts              # Database client
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
└── styles/                # Additional styles
```

### **Adding New Components**
1. Create component in appropriate atomic level
2. Export from index.ts file
3. Add to showcase page for testing
4. Update component documentation

### **Database Changes**
1. Modify `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Update TypeScript types if needed
4. Test changes in Prisma Studio

### **API Development**
1. Create API route in `src/app/api/[endpoint]/route.ts`
2. Use TypeScript for request/response types
3. Add input validation with Zod
4. Test with REST client or Postman

---

## 🔧 TROUBLESHOOTING

### **Common Issues**

#### **1. Build Errors**
```bash
# If TypeScript errors
npx tsc --noEmit

# If dependency issues
rm -rf node_modules package-lock.json
npm install

# If Prisma issues
npx prisma generate
npx prisma db push
```

#### **2. Database Connection**
```bash
# Test database connection
npx prisma db pull

# If connection fails, check:
# - DATABASE_URL format
# - Database server running
# - Firewall/network settings
```

#### **3. Google OAuth Issues**
- Verify redirect URI exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check client ID and secret are correct
- Ensure required APIs are enabled
- Verify scopes in OAuth consent screen

#### **4. Environment Variables**
```bash
# Check environment variables are loaded
node -e "console.log(process.env.GOOGLE_CLIENT_ID)"

# Restart development server after .env changes
```

### **Development Tools**

#### **Database Management**
```bash
# Open Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database schema
npx prisma db pull
```

#### **Code Quality**
```bash
# Format code
npx prettier --write .

# Check linting
npx eslint . --ext .ts,.tsx

# Type checking
npx tsc --noEmit
```

---

## 📱 MOBILE DEVELOPMENT

### **Responsive Testing**
- **Chrome DevTools**: Device simulation
- **Browser Stack**: Real device testing
- **Responsive Design Mode**: Firefox/Safari

### **Mobile-Specific Testing**
```bash
# Test on local network (replace with your IP)
npm run dev -- --host 0.0.0.0
# Access from mobile: http://YOUR_IP:3000
```

---

## 🔒 SECURITY CONSIDERATIONS

### **Development Environment**
- Never commit `.env` files to version control
- Use strong passwords for local databases
- Keep dependencies updated: `npm audit`
- Use HTTPS in production

### **Authentication Security**
- Generate strong `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Configure OAuth consent screen properly
- Limit API scopes to minimum required
- Implement proper session management

---

## 📈 PERFORMANCE MONITORING

### **Local Performance**
```bash
# Bundle analyzer
npm run build
npm run analyze

# Lighthouse CI (if configured)
npm run lighthouse
```

### **Development Metrics**
- **Build Time**: Should be under 30 seconds
- **Hot Reload**: Should be under 2 seconds
- **Type Check**: Should be under 10 seconds
- **Lint Check**: Should be under 5 seconds

---

## 🚀 DEPLOYMENT PREPARATION

### **Environment Setup**
1. **Production Database**: Set up cloud database
2. **Environment Variables**: Configure all production values
3. **Domain Setup**: Configure DNS and SSL
4. **Google OAuth**: Update authorized origins and redirects

### **Pre-Deployment Checklist**
- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] Build passes without errors
- [ ] All tests pass
- [ ] Google OAuth configured for production domain
- [ ] Error monitoring setup (Sentry)
- [ ] Performance monitoring setup

---

## 📞 GETTING HELP

### **Resources**
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **NextAuth.js Documentation**: https://next-auth.js.org
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs

### **Common Commands Reference**
```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run type-check         # TypeScript check

# Database
npx prisma studio          # Database browser
npx prisma db push         # Push schema changes
npx prisma generate        # Generate client
npx prisma migrate dev     # Create migration

# Debugging
npm run build:analyze      # Bundle analysis
npm run lighthouse         # Performance audit
```

---

**Document Version**: 1.0  
**Last Updated**: September 14, 2025  
**Support**: Check documentation directory for additional guides  
**Setup Time**: ~30 minutes for complete environment
