# Contributing to Civisto

🎉 Thank you for your interest in contributing to Civisto! We're building an AI-driven civic intelligence platform that empowers citizens to become community heroes. Every contribution, no matter how small, makes a difference.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
- Check if the issue already exists in [GitHub Issues](https://github.com/johanlido/civisto/issues)
- Use the bug report template
- Include steps to reproduce, expected behavior, and screenshots if applicable

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

### 📚 Documentation
Help make Civisto more accessible!
- Improve API documentation
- Write tutorials and guides
- Translate content to other languages
- Fix typos and clarify explanations

### 🎨 Design & UX
Make Civisto more user-friendly!
- Design mockups for new features
- Improve existing UI/UX
- Create icons and illustrations
- Conduct user research

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Basic knowledge of TypeScript/JavaScript
- Familiarity with Supabase (helpful but not required)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/civisto.git
   cd civisto
   ```

2. **Run Setup Script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Visit the Application**
   - API: http://localhost:54321
   - Supabase Studio: http://localhost:54323

### Project Structure
```
civisto/
├── backend/              # Supabase backend
│   ├── supabase/
│   │   ├── functions/    # Edge Functions
│   │   ├── migrations/   # Database migrations
│   │   └── config.toml   # Supabase config
├── docs/                 # Documentation
├── scripts/              # Setup and utility scripts
└── README.md
```

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
- Screenshots for UI changes
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

### API Design
- Follow RESTful conventions
- Use consistent naming
- Include proper HTTP status codes
- Document all endpoints

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

### Test Structure
```javascript
describe('Report Creation', () => {
  it('should create a report with valid data', async () => {
    // Arrange
    const reportData = { /* test data */ }
    
    // Act
    const result = await createReport(reportData)
    
    // Assert
    expect(result.success).toBe(true)
  })
})
```

## 🎯 Issue Labels

We use labels to organize issues:

- `good first issue` - Perfect for newcomers
- `help wanted` - We need community help
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation needs
- `question` - Further information needed
- `priority: high` - Urgent issues
- `area: backend` - Backend-related
- `area: frontend` - Frontend-related
- `area: mobile` - Mobile app related

## 🏆 Recognition

We celebrate our contributors!

### Civisto Champions Program
- **First Contribution**: Welcome package and recognition
- **Regular Contributor**: Special Discord role and badge
- **Core Contributor**: Quarterly recognition and swag
- **Maintainer**: Ongoing collaboration opportunities

### Hall of Fame
Outstanding contributors are featured in:
- README.md contributors section
- Monthly newsletter
- Social media shoutouts
- Conference speaking opportunities

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
- [React Documentation](https://react.dev/)

### Civic Tech Inspiration
- [Code for America](https://codeforamerica.org/)
- [mySidewalk](https://mysidewalk.com/)
- [Decidim](https://decidim.org/)
- [Consul](https://consulproject.org/)

## 🚨 Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

### Our Standards
- **Be respectful**: Treat everyone with kindness and respect
- **Be inclusive**: Welcome people of all backgrounds and experience levels
- **Be collaborative**: Work together towards common goals
- **Be constructive**: Provide helpful feedback and suggestions

## 📝 License

By contributing to Civisto, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## ❓ Questions?

Need help getting started? Have questions about contributing?

- 💬 Ask in our [Discord](https://discord.gg/civisto)
- 📧 Email us at [contributors@civisto.com](mailto:contributors@civisto.com)
- 🐛 Open an issue for technical questions
- 📖 Check our [documentation](docs/)

---

**Thank you for helping make civic engagement more accessible and meaningful for everyone! 🏛️✨**

*Together, we're building a platform where every citizen can become a community hero.*

