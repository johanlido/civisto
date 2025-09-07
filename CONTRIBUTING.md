# Contributing to Civisto Backend

🎉 Thank you for your interest in contributing to Civisto! We're building an AI-driven civic intelligence platform that empowers citizens to become community heroes.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Check if the issue already exists in [GitHub Issues](https://github.com/johanlido/civisto/issues)
- Use the bug report template
- Include steps to reproduce, expected behavior, and logs if applicable

### 💡 Feature Requests
Have an idea to improve civic engagement?
- Check existing [feature requests](https://github.com/johanlido/civisto/labels/enhancement)
- Use the feature request template
- Explain the problem you're solving and your proposed solution

### 🔧 Code Contributions
Ready to code? We'd love your help!
- Check out [Good First Issues](https://github.com/johanlido/civisto/labels/good%20first%20issue)
- Look for [Help Wanted](https://github.com/johanlido/civisto/labels/help%20wanted) issues
- Follow our development workflow below

## 🛠️ Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Supabase CLI** - Install with `npm install -g supabase`
- **Basic knowledge** of TypeScript/JavaScript and SQL

## 🚀 Development Setup

### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/civisto.git
cd civisto
```

### 2. Install Dependencies
```bash
npm install
cd backend && npm install
```

### 3. Set up Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Start Supabase
```bash
cd backend
supabase start
```

### 5. Apply Database Schema
```bash
supabase db reset
```

### 6. Deploy Edge Functions
```bash
supabase functions deploy
```

Visit:
- **API**: http://localhost:54321
- **Supabase Studio**: http://localhost:54323

## 🔄 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run tests
npm test

# Check linting
npm run lint

# Test database migrations
npm run db:reset
```

### 4. Commit Your Changes
We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add AI sentiment analysis for reports"
git commit -m "fix: resolve quest completion bug"
git commit -m "docs: update API documentation"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Link to related issues
- Test instructions

## 📋 Code Guidelines

### TypeScript/JavaScript
- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Prefer async/await over promises

### Database
- Use descriptive migration names
- Include rollback instructions
- Test migrations thoroughly
- Follow PostgreSQL best practices

### Edge Functions
- Handle errors gracefully
- Include proper CORS headers
- Use environment variables for secrets
- Add comprehensive logging

## 🧪 Testing

### Running Tests
```bash
# All tests
npm test

# Backend tests
npm run test:backend

# Watch mode
npm run test:watch
```

### Writing Tests
- Write tests for new features
- Include edge cases
- Use descriptive test names
- Mock external dependencies

## 🏆 Recognition

We celebrate our contributors!

### Civisto Champions Program
- **First Contribution**: Welcome package and recognition
- **Regular Contributor**: Special Discord role and badge
- **Core Contributor**: Quarterly recognition and swag

### Hall of Fame
Outstanding contributors are featured in:
- README.md contributors section
- Monthly newsletter
- Social media shoutouts

## 💬 Community

### Discord Server
Join our [Discord community](https://discord.gg/civisto) for:
- Real-time discussions
- Help and support
- Feature brainstorming
- Community events

### Communication Guidelines
- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and resources
- Celebrate successes together

## 📖 Resources

### Learning Materials
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Civic Tech Inspiration
- [Code for America](https://codeforamerica.org/)
- [mySidewalk](https://mysidewalk.com/)
- [Decidim](https://decidim.org/)

## 🚨 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 📝 License

By contributing to Civisto, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## ❓ Questions?

Need help getting started? Have questions about contributing?

- 💬 Ask in our [Discord](https://discord.gg/civisto)
- 📧 Email us at [contributors@civisto.com](mailto:contributors@civisto.com)
- 🐛 Open an issue for technical questions

---

**Thank you for helping make civic engagement more accessible and meaningful for everyone! 🏛️✨**
