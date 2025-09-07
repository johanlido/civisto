# Civisto Backend - AI-Driven Civic Intelligence Platform

🏛️ **Empowering citizens through AI-powered community reporting** 🤖

[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=for-the-badge)](https://github.com/johanlido/civisto)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-🧠-blue?style=for-the-badge)](https://synaptic.civisto.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

## 🌟 Vision: From Everyday Citizens to Everyday Heroes

Civisto transforms civic engagement into a meaningful, gamified experience where every citizen can become a hero in their community. Like Pokemon Go for social impact - discover real problems, report them, and watch your community improve while earning recognition and building connections.

This repository contains the **backend implementation** - a complete Supabase-powered API with PostgreSQL database, AI analysis, gamification system, and municipal integration.

### 🎯 Core Mission
- **Create Meaning**: Transform observations into impactful actions
- **Build Community**: Connect citizens through shared purpose  
- **Empower Heroes**: Turn everyday people into community champions
- **Drive Change**: Use AI to amplify citizen voices and create real solutions

## 🚀 Backend Features

### 🗄️ Database & API
- **PostgreSQL with PostGIS** for geospatial data
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **RESTful API** with comprehensive endpoints
- **Comprehensive seed data** for testing

### 🤖 AI-Powered Intelligence
- **Smart Categorization**: Automatic problem classification
- **Priority Assessment**: AI-driven urgency evaluation
- **Sentiment Analysis**: Emotional tone detection
- **Contextual Insights**: Municipality-specific suggestions
- **Keyword Extraction**: Enhanced searchability

### 🎮 Gamification System
- **Quest System**: Daily, weekly, and milestone challenges
- **Badge System**: Achievement recognition
- **Point System**: Progressive rewards
- **Leaderboards**: Community competition
- **Level Progression**: User advancement tracking

### 🏛️ Municipal Integration
- **Email Notifications**: Formatted reports to authorities
- **API Integration**: Direct system connections
- **Webhook Support**: Real-time municipal updates
- **Multi-channel Delivery**: Flexible notification options
- **Swedish Municipality Support**: Pre-configured for major cities

### 🌐 Multi-Platform Reporting
- **Physical Issues**: Roads, parks, safety, accessibility
- **Digital Harassment**: Social media hate, cyberbullying
- **Community Problems**: Noise, waste, local concerns
- **Geospatial Queries**: Location-based problem discovery

## 🏗️ Architecture

```
civisto/
├── backend/                    # Supabase backend
│   ├── supabase/
│   │   ├── functions/         # Edge Functions (Deno/TypeScript)
│   │   │   ├── analyze-report/    # AI analysis
│   │   │   ├── gamification/      # Quest & badge system
│   │   │   └── notify-municipality/ # Municipal notifications
│   │   ├── migrations/        # Database schema
│   │   ├── config.toml       # Supabase configuration
│   │   └── seed.sql          # Sample data
│   └── package.json
├── docs/                      # Documentation
│   ├── api.md                # API documentation
│   ├── deployment.md         # Deployment guide
│   └── getting-started.md    # Setup instructions
└── README.md                 # This file
```

## 🛠️ Tech Stack

- **Database**: PostgreSQL 15 + PostGIS
- **Backend**: Supabase (Auth + Storage + Edge Functions)
- **Runtime**: Deno (Edge Functions)
- **Language**: TypeScript
- **AI**: OpenAI GPT-4 integration
- **Deployment**: Supabase Cloud
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase CLI
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johanlido/civisto.git
   cd civisto
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Supabase locally**
   ```bash
   cd backend
   supabase start
   ```

5. **Apply database schema**
   ```bash
   supabase db reset
   ```

6. **Deploy Edge Functions**
   ```bash
   supabase functions deploy
   ```

Visit:
- **API**: http://localhost:54321
- **Supabase Studio**: http://localhost:54323

## 📖 API Documentation

### Core Endpoints

#### Reports
```bash
# Create report
POST /rest/v1/reports
{
  "title": "Broken Swing at Central Park",
  "description": "Safety hazard for children",
  "category": "parks_green_areas",
  "location": "POINT(18.0686 59.3293)"
}

# Get reports
GET /rest/v1/reports?select=*&order=created_at.desc

# Get nearby reports
POST /rest/v1/rpc/get_nearby_reports
{
  "center_lat": 59.3293,
  "center_lng": 18.0686,
  "radius_meters": 1000
}
```

#### Gamification
```bash
# Get user quests
GET /rest/v1/user_quests?user_id=eq.{id}&select=*,quests(*)

# Get leaderboard
GET /rest/v1/user_leaderboard?order=rank.asc&limit=100

# Get active quests
GET /rest/v1/quests?is_active=eq.true&select=*
```

#### AI Analysis
```bash
# Analyze report
POST /functions/v1/analyze-report
{
  "reportId": "uuid",
  "title": "Report title",
  "description": "Report description",
  "category": "parks_green_areas"
}
```

See [complete API documentation](docs/api.md) for all endpoints.

## 🗄️ Database Schema

### Core Tables
- **`civisto.users`** - User profiles and gamification data
- **`civisto.reports`** - Citizen reports with geospatial data
- **`civisto.quests`** - Gamification challenges
- **`civisto.user_quests`** - User progress tracking
- **`civisto.badges`** - Achievement system
- **`civisto.report_comments`** - Community engagement
- **`civisto.report_reactions`** - Social interactions

### Key Features
- **PostGIS integration** for geospatial queries
- **Row Level Security** policies
- **Automatic triggers** for gamification
- **AI analysis** stored as JSONB
- **Real-time subscriptions** enabled

## 🎮 Gamification System

### Quest Types
- **Daily**: "Submit 1 report today" (+50 points)
- **Weekly**: "Submit 3 reports this week" (+200 points)  
- **Milestone**: "Submit 10 total reports" (+500 points + badge)
- **Category**: "5 park reports" (+300 points + "Park Guardian" badge)

### Badge System
- 🥇 **First Report** - Submit your first report
- 🏆 **Reporter Pro** - Submit 10 reports
- 🦸 **Community Hero** - Submit 50 reports
- 🌳 **Park Guardian** - 5 park-related reports
- 🛡️ **Safety Champion** - 10 safety reports
- 🔒 **Digital Defender** - 5 digital harassment reports

### Level Progression
- **Levels 1-5**: 100 points per level
- **Levels 6+**: 200 points per level
- **Automatic calculation** via database functions

## 🤖 AI Features

### Report Analysis
Automatic analysis includes:
- **Category classification** (13 predefined categories)
- **Priority assessment** (low, medium, high, critical)
- **Sentiment scoring** (0.0 to 1.0)
- **Keyword extraction** for searchability
- **Municipality suggestions** for action items

### Implementation
```typescript
interface AIAnalysisResult {
  has_people: boolean
  damage_detected: boolean
  suggested_priority: 'low' | 'medium' | 'high' | 'critical'
  sentiment_score: number
  keywords: string[]
  municipality_suggestions: string[]
}
```

## 🏛️ Municipal Integration

### Supported Municipalities
- **Stockholm** (0180) - Email + API + Webhook
- **Göteborg** (1480) - Email + Webhook  
- **Malmö** (1280) - Email only

### Notification Methods
- **Email**: Formatted HTML notifications
- **API**: Direct system integration
- **Webhook**: Real-time updates with HMAC signatures

### Adding New Municipalities
```typescript
const municipalities = {
  'your_code': {
    name: 'Municipality Name',
    email: 'reports@municipality.se',
    api_endpoint: 'https://api.municipality.se/reports',
    notification_preferences: {
      email: true,
      api: true,
      webhook: false
    }
  }
}
```

## 🧪 Sample Data

The database includes comprehensive sample data:
- **4 test users** with different levels and badges
- **5 sample reports** across various categories
- **Comments and reactions** for community engagement
- **Quest progress** examples
- **Notification logs** for testing

Test the system immediately after setup!

## 🚀 Deployment

### Production Deployment
1. Create Supabase project
2. Configure environment variables
3. Deploy schema: `supabase db push`
4. Deploy functions: `supabase functions deploy`
5. Configure authentication providers
6. Set up custom domain (optional)

See [deployment guide](docs/deployment.md) for detailed instructions.

### CI/CD
GitHub Actions automatically:
- Runs tests on pull requests
- Deploys to staging on `develop` branch
- Deploys to production on `main` branch
- Performs security scans

## 🤝 Contributing

We welcome contributions from developers, designers, and civic enthusiasts!

### Ways to Contribute
- 🐛 **Bug Reports**: Help us identify and fix issues
- 💡 **Feature Ideas**: Suggest new civic engagement features
- 🔧 **Code Contributions**: Implement backend functionality
- 📚 **Documentation**: Improve guides and API docs
- 🌍 **Translation**: Make Civisto accessible globally
- 🏛️ **Municipal Integration**: Add support for new cities

### Getting Started
1. Read our [Contributing Guide](CONTRIBUTING.md)
2. Check out [Good First Issues](https://github.com/johanlido/civisto/labels/good%20first%20issue)
3. Join our [Discord Community](https://discord.gg/civisto)
4. Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## 🏆 Community

### Recognition Programs
- 🥇 **Civisto Champions**: Top contributors get special recognition
- 🎯 **First Contribution**: Celebrate your first PR
- 📈 **Monthly MVPs**: Outstanding community members
- 🌟 **Impact Awards**: Real-world change makers

### Connect With Us
- 💬 [Discord Community](https://discord.gg/civisto)
- 🐦 [Twitter](https://twitter.com/civisto)
- 💼 [LinkedIn](https://linkedin.com/company/civisto)
- 📧 [Email](mailto:hello@civisto.com)

## 📊 Impact Goals

*Building towards a more engaged society:*

- **🎯 Goal**: 10,000+ active community reporters
- **🏛️ Target**: Integration with 50+ Swedish municipalities  
- **🌍 Vision**: Expand to Nordic countries and beyond
- **💪 Mission**: Transform 1 million citizens into community heroes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Community Contributors**: Every bug report, feature request, and PR makes Civisto better
- **Municipal Partners**: Forward-thinking local governments embracing citizen engagement
- **Open Source Community**: Built on amazing open source projects
- **Civic Tech Movement**: Inspired by global efforts to improve democracy through technology

---

**🎯 Ready to build the future of civic engagement?** [Get started now](docs/getting-started.md) or [join our community](https://discord.gg/civisto)!

*Civisto Backend - Where every API call empowers a community hero.* ✨

