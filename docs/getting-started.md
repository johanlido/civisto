# Getting Started with Civisto

Welcome to Civisto! 🏛️ This guide will help you set up your development environment and start contributing to the AI-driven civic intelligence platform.

## 🎯 What is Civisto?

Civisto transforms civic engagement into a meaningful, gamified experience where every citizen can become a hero in their community. Think Pokemon Go for social impact - discover real problems, report them, and watch your community improve while earning recognition and building connections.

### Key Features

- **🎮 Gamified Reporting**: Quests, badges, and progression systems
- **🤖 AI-Powered Analysis**: Smart categorization and priority assessment
- **🏛️ Municipal Integration**: Direct connection to local authorities
- **🌐 Multi-Platform**: Physical and digital problem reporting
- **🤝 Community Building**: Comments, reactions, and social features

## 🛠️ Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - We recommend [VS Code](https://code.visualstudio.com/)
- **Basic knowledge** of TypeScript/JavaScript and SQL

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/johanlido/civisto.git
cd civisto
```

### 2. Run the Setup Script

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

The setup script will:
- ✅ Check prerequisites
- 📦 Install dependencies
- 🔐 Set up environment variables
- 🏗️ Initialize Supabase
- 🗄️ Create database schema
- 🌱 Seed with sample data
- ⚡ Deploy Edge Functions

### 3. Start Development

```bash
npm run dev
```

Visit:
- **API**: http://localhost:54321
- **Supabase Studio**: http://localhost:54323

## 📁 Project Structure

```
civisto/
├── backend/                 # Supabase backend
│   ├── supabase/
│   │   ├── functions/       # Edge Functions (AI, gamification, etc.)
│   │   ├── migrations/      # Database schema migrations
│   │   ├── config.toml      # Supabase configuration
│   │   └── seed.sql         # Sample data
│   └── package.json
├── docs/                    # Documentation
│   ├── api.md              # API documentation
│   ├── deployment.md       # Deployment guide
│   └── getting-started.md  # This file
├── scripts/                 # Utility scripts
│   └── setup.sh            # Development setup
├── .github/                 # GitHub templates and workflows
├── README.md               # Project overview
├── CONTRIBUTING.md         # Contribution guidelines
└── package.json            # Root package configuration
```

## 🗄️ Database Schema

Civisto uses PostgreSQL with PostGIS for geospatial data:

### Core Tables

- **`users`** - User profiles and gamification data
- **`reports`** - Citizen reports with location and AI analysis
- **`quests`** - Gamification challenges and rewards
- **`user_quests`** - User progress on quests
- **`badges`** - Achievement system
- **`report_comments`** - Community engagement
- **`report_reactions`** - Likes, support, concerns

### Key Features

- **Geospatial queries** with PostGIS
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **AI analysis** stored as JSONB
- **Gamification** with points and levels

## ⚡ Edge Functions

Civisto uses Supabase Edge Functions for serverless backend logic:

### Available Functions

1. **`analyze-report`** - AI analysis of submitted reports
2. **`gamification`** - Quest completion and badge awards
3. **`notify-municipality`** - Send notifications to local authorities

### Testing Functions Locally

```bash
# Start functions locally
cd backend
supabase functions serve

# Test a function
curl -X POST http://localhost:54321/functions/v1/analyze-report \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reportId": "123", "title": "Test Report", "description": "Test description", "category": "road_issues"}'
```

## 🎮 Gamification System

### How It Works

1. **Users submit reports** → Earn points and progress on quests
2. **Complete quests** → Unlock badges and rewards
3. **Level progression** → Based on total points earned
4. **Community recognition** → Leaderboards and achievements

### Quest Types

- **Daily**: Submit 1 report today (+50 points)
- **Weekly**: Submit 3 reports this week (+200 points)
- **Milestone**: Submit 10 total reports (+500 points + badge)
- **Category**: 5 park reports (+300 points + "Park Guardian" badge)

### Badge System

- 🥇 **First Report** - Submit your first report
- 🏆 **Reporter Pro** - Submit 10 reports
- 🦸 **Community Hero** - Submit 50 reports
- 🌳 **Park Guardian** - 5 park-related reports
- 🛡️ **Safety Champion** - 10 safety reports
- 🔒 **Digital Defender** - 5 digital harassment reports

## 🤖 AI Features

### Report Analysis

When a report is submitted, AI automatically:

- **Categorizes** the problem type
- **Assesses priority** (low, medium, high, critical)
- **Detects sentiment** and emotional tone
- **Extracts keywords** for better searchability
- **Suggests actions** for municipalities

### Implementation

```typescript
// AI analysis is triggered automatically on report creation
const analysis = {
  has_people: false,
  damage_detected: true,
  suggested_priority: "high",
  sentiment_score: 0.3,
  keywords: ["broken", "swing", "safety", "children"],
  municipality_suggestions: [
    "Forward to parks and recreation",
    "Schedule maintenance crew visit"
  ]
}
```

## 🏛️ Municipal Integration

### Notification System

When reports are submitted, municipalities are notified via:

- **Email** - Formatted notifications with report details
- **API** - Direct integration with municipal systems
- **Webhooks** - Real-time updates for integrated systems

### Supported Municipalities

Currently configured for Swedish municipalities:
- Stockholm (0180)
- Göteborg (1480)
- Malmö (1280)

## 🧪 Testing with Sample Data

The setup script creates sample data including:

### Test Users
- **jane_hero** - Level 5, multiple badges
- **civic_mike** - Level 3, active reporter
- **anna_reporter** - Level 2, new user
- **erik_guardian** - Level 8, community leader

### Sample Reports
- Broken swing at Tantolunden Park
- Pothole on Drottninggatan
- Graffiti on historic building
- Cyberbullying incident
- Missing wheelchair ramp

### Test the API

```bash
# Get all reports
curl http://localhost:54321/rest/v1/reports?select=*

# Get user leaderboard
curl http://localhost:54321/rest/v1/user_leaderboard?order=rank.asc&limit=10

# Get active quests
curl http://localhost:54321/rest/v1/quests?is_active=eq.true&select=*
```

## 🔧 Development Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit database schema in `backend/supabase/migrations/`
   - Update Edge Functions in `backend/supabase/functions/`
   - Add tests and documentation

3. **Test locally**
   ```bash
   npm test
   npm run lint
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use the provided PR template
   - Include screenshots for UI changes
   - Link related issues

### Database Migrations

```bash
# Create a new migration
cd backend
supabase migration new add_new_feature

# Apply migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > types/database.ts
```

### Adding New Edge Functions

```bash
# Create new function
cd backend
supabase functions new my-new-function

# Deploy function
supabase functions deploy my-new-function
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase not starting**
   ```bash
   # Check Docker is running
   docker ps
   
   # Restart Supabase
   cd backend
   supabase stop
   supabase start
   ```

2. **Migration errors**
   ```bash
   # Reset database
   cd backend
   supabase db reset
   ```

3. **Function deployment issues**
   ```bash
   # Check function logs
   supabase functions logs my-function
   ```

### Getting Help

- 💬 **Discord**: [Join our community](https://discord.gg/civisto)
- 🐛 **Issues**: [GitHub Issues](https://github.com/johanlido/civisto/issues)
- 📧 **Email**: [help@civisto.com](mailto:help@civisto.com)
- 📖 **Docs**: [API Documentation](api.md)

## 🎯 Next Steps

Now that you have Civisto running locally, you can:

### For Developers
- 🔍 **Explore the API** - Try different endpoints in Supabase Studio
- 🧪 **Run tests** - `npm test` to ensure everything works
- 📚 **Read the code** - Understand the Edge Functions and database schema
- 🐛 **Find issues** - Check [Good First Issues](https://github.com/johanlido/civisto/labels/good%20first%20issue)

### For Designers
- 🎨 **Review UI/UX** - Check existing designs and mockups
- 📱 **Mobile experience** - Consider mobile-first design principles
- ♿ **Accessibility** - Ensure inclusive design practices
- 🌍 **Internationalization** - Plan for multiple languages

### For Civic Tech Enthusiasts
- 🏛️ **Municipal research** - Study how local governments handle citizen reports
- 📊 **Data analysis** - Explore patterns in the sample data
- 🤝 **Community building** - Help plan engagement strategies
- 📖 **Documentation** - Improve guides and tutorials

### For Everyone
- 🌟 **Star the repo** - Show your support on GitHub
- 🐦 **Share on social** - Help spread the word about Civisto
- 💬 **Join Discord** - Connect with other contributors
- 📝 **Give feedback** - Share your ideas and suggestions

## 🏆 Contributing

Ready to contribute? Check out our [Contributing Guide](../CONTRIBUTING.md) for:

- 🔧 **Code contributions** - Features, bug fixes, improvements
- 📚 **Documentation** - Guides, tutorials, API docs
- 🎨 **Design** - UI/UX, graphics, user research
- 🌍 **Translation** - Make Civisto accessible globally
- 🧪 **Testing** - Quality assurance and user testing

## 📜 License

Civisto is open source software licensed under the [MIT License](../LICENSE).

---

**🎉 Welcome to the Civisto community! Together, we're building a platform where every citizen can become a community hero.** 🏛️✨

*Ready to make a difference? Let's start coding for civic good!*

