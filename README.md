# Reportr

Reportr is a white-label SEO reporting platform for digital marketing agencies. Generate professional, branded PDF reports automatically by collecting data from Google Search Console, Google Analytics 4, and PageSpeed Insights APIs.

## 🚀 Features

- **White-label branding** - Customize colors, logos, and company names
- **Automated data collection** - Google Search Console, Analytics 4, PageSpeed Insights
- **Professional PDF reports** - Branded reports generated in seconds
- **Multi-client management** - Manage reports for multiple clients
- **User authentication** - Google OAuth with NextAuth.js
- **Responsive design** - Built with Tailwind CSS and atomic design principles

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with atomic design system
- **UI Components**: Custom atomic design components
- **Icons**: Lucide React
- **Validation**: Zod schemas

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Atomic design components
│   ├── atoms/            # Basic elements (Button, Input, Typography)
│   ├── molecules/        # Simple combinations (UserMenu, MetricCard)
│   ├── organisms/        # Complex components (ReportCard, ClientTable)
│   ├── templates/        # Page layouts (DashboardTemplate)
│   └── pages/            # Complete pages
├── lib/                  # Utilities, API clients, helpers
│   ├── auth.ts          # NextAuth configuration
│   ├── db.ts            # Database connection
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
└── styles/              # Additional styles if needed
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google Cloud Console project with APIs enabled

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd reportr
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Random string for NextAuth.js
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for development)
   - `GOOGLE_CLIENT_ID` - Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

3. **Set up the database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

The application uses a comprehensive Prisma schema with the following key models:

- **User** - Agency owners with branding settings
- **Client** - Client websites and API connections  
- **Report** - Generated SEO reports with data and PDFs
- **Account/Session** - NextAuth.js authentication
- **ApiUsage** - API usage tracking and billing
- **WebhookEvent** - Webhook processing queue

## 🎨 Design System

Built with atomic design principles:

- **Atoms** - Basic UI elements (buttons, inputs, typography)
- **Molecules** - Simple component combinations (metric cards, user menus)
- **Organisms** - Complex UI sections (headers, tables, forms)
- **Templates** - Page layouts and structures
- **Pages** - Complete application pages

### Brand Customization

The design system supports white-label customization through CSS custom properties:

```css
:root {
  --brand-50: /* Lightest brand color */;
  --brand-500: /* Primary brand color */;
  --brand-900: /* Darkest brand color */;
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🔧 Configuration

### TypeScript

Strict mode enabled with comprehensive type checking:
- `noImplicitAny: true`
- `strictNullChecks: true`
- `noUncheckedIndexedAccess: true`

### ESLint

Strict linting rules for TypeScript and React:
- TypeScript recommended rules
- Import organization
- React best practices

### Prettier

Consistent code formatting with Tailwind CSS plugin integration.

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any platform supporting Next.js.

1. Set up environment variables in your deployment platform
2. Connect your PostgreSQL database
3. Deploy with `npm run build`

## 📚 Next Steps

To continue development:

1. **Set up Google APIs** - Configure Search Console and Analytics APIs
2. **Implement report generation** - Build PDF generation service
3. **Add payment processing** - Integrate Stripe for subscriptions
4. **Create dashboard pages** - Build client and report management UIs
5. **Add email notifications** - Notify clients when reports are ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.