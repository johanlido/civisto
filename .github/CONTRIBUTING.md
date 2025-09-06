# Contributing to Synaptic

Thank you for your interest in contributing to Synaptic! This document provides guidelines for contributing to this AI development orchestrator template.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ with uv package manager
- Git and GitHub account
- Claude Desktop (for MCP server testing)

### Development Setup
1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/Synaptic.git
   cd Synaptic
   ```

2. **Run Interactive Setup**
   ```bash
   chmod +x scripts/interactive-setup.sh
   ./scripts/interactive-setup.sh
   ```

3. **Verify Installation**
   ```bash
   ./scripts/health-check.sh
   ```

## 📋 How to Contribute

### Types of Contributions
- 🐛 **Bug Reports**: Issues with setup scripts, configurations, or documentation
- 💡 **Feature Requests**: New MCP servers, AI personality profiles, or workflow improvements
- 📚 **Documentation**: Improvements to guides, examples, or API documentation
- 🔧 **Code Contributions**: Bug fixes, new features, or optimizations
- 🧪 **Testing**: Platform compatibility, edge cases, or performance testing

### Before You Start
1. **Check Existing Issues**: Search for existing issues or discussions
2. **Create an Issue**: For new features or significant changes, create an issue first
3. **Follow AI Guidelines**: Review `.github/copilot-instructions.md` for AI-assisted development

## 🛠️ Development Guidelines

### Code Standards
- **TypeScript/JavaScript**: Follow ESLint configuration
- **Python**: Use Black formatter and follow PEP 8
- **Shell Scripts**: Use ShellCheck for validation
- **Documentation**: Use Markdown with consistent formatting

### AI Personality Awareness
When contributing code, consider the AI model you're using:

- **Claude 3.5 Sonnet**: Focus on conciseness, avoid over-engineering
- **GPT-4o**: Pay extra attention to control flow and error handling
- **o1-preview/mini**: Include reasoning documentation and complexity analysis
- **OpenCoder**: Eliminate dead code and avoid hard-coded values

### Security Requirements
- ✅ **No Hard-coded Secrets**: Use environment variables
- ✅ **Input Validation**: Sanitize all user inputs
- ✅ **Path Traversal Protection**: Validate file paths
- ✅ **Dependency Security**: Keep dependencies updated

### Testing Requirements
- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: Test MCP server configurations
- **Platform Tests**: Verify on macOS, Linux, and Windows/WSL
- **Documentation Tests**: Validate all links and examples

## 📝 Pull Request Process

### 1. Branch Naming
```bash
# Feature branches
git checkout -b feature/add-new-mcp-server
git checkout -b feature/improve-ai-orchestrator

# Bug fix branches
git checkout -b fix/claude-config-path-issue
git checkout -b fix/windows-setup-script

# Documentation branches
git checkout -b docs/update-installation-guide
git checkout -b docs/add-troubleshooting-section
```

### 2. Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
feat: add Figma MCP server integration
feat(ai): implement GPT-4o personality guardrails

# Bug fixes
fix: resolve Claude Desktop config path on Windows
fix(scripts): handle missing environment variables

# Documentation
docs: update installation guide for macOS
docs(api): add MCP server configuration examples

# Refactoring
refactor: simplify AI orchestrator selection logic
refactor(config): consolidate environment variable handling
```

### 3. Pull Request Template
When creating a PR, include:

- **Description**: Clear explanation of changes
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Testing**: How you tested the changes
- **Checklist**: Complete the PR checklist
- **Screenshots**: For UI changes or new documentation

### 4. Review Process
1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing on different platforms
4. **Documentation**: Update relevant documentation
5. **Merge**: Squash and merge after approval

## 🧪 Testing Guidelines

### Local Testing
```bash
# Run all tests
npm test

# Test specific components
npm run test:mcp-servers
npm run test:ai-orchestrator
npm run test:setup-scripts

# Platform-specific testing
npm run test:macos
npm run test:linux
npm run test:windows
```

### Manual Testing Checklist
- [ ] **Fresh Installation**: Test on clean system
- [ ] **MCP Server Setup**: Verify all supported servers
- [ ] **AI Personality Selection**: Test orchestrator logic
- [ ] **Documentation Links**: Validate all references
- [ ] **Cross-Platform**: Test on multiple operating systems

## 📚 Documentation Guidelines

### Documentation Structure
```
docs/
├── setup/                 # Installation and setup guides
├── guides/               # How-to guides and tutorials
├── examples/             # Example configurations and workflows
├── api/                  # API documentation
└── troubleshooting/      # Common issues and solutions
```

### Writing Style
- **Clear and Concise**: Use simple, direct language
- **Step-by-Step**: Break complex processes into steps
- **Code Examples**: Include working code samples
- **Screenshots**: Add visuals for UI-related documentation
- **Cross-References**: Link to related documentation

### Documentation Testing
- **Link Validation**: Ensure all links work
- **Code Examples**: Test all code snippets
- **Platform Accuracy**: Verify instructions for each OS
- **Version Compatibility**: Update for new releases

## 🏷️ Issue Guidelines

### Bug Reports
Use the bug report template and include:
- **Environment**: OS, Node.js version, Python version
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Logs**: Relevant error messages or logs
- **Screenshots**: If applicable

### Feature Requests
Use the feature request template and include:
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Use Cases**: Real-world scenarios
- **Implementation Ideas**: Technical approach (optional)

### Questions and Discussions
- **Search First**: Check existing issues and discussions
- **Be Specific**: Provide context and details
- **Tag Appropriately**: Use relevant labels
- **Follow Up**: Respond to clarifying questions

## 🎯 AI-Assisted Development

### Using GitHub Copilot
- **Follow Guidelines**: Adhere to `.github/copilot-instructions.md`
- **Review Suggestions**: Don't accept code blindly
- **Test Thoroughly**: AI-generated code needs testing
- **Document Decisions**: Explain complex AI-assisted solutions

### AI Personality Considerations
- **Model Selection**: Choose appropriate AI for the task
- **Guardrail Application**: Apply model-specific guidelines
- **Quality Validation**: Use AI orchestrator for quality checks
- **Security Review**: Extra scrutiny for AI-generated security code

## 🚀 Release Process

### Version Management
- **Semantic Versioning**: Follow semver (MAJOR.MINOR.PATCH)
- **Changelog**: Update CHANGELOG.md for each release
- **Breaking Changes**: Clearly document breaking changes
- **Migration Guides**: Provide upgrade instructions

### Release Checklist
- [ ] **Version Bump**: Update version numbers
- [ ] **Changelog**: Document all changes
- [ ] **Documentation**: Update relevant docs
- [ ] **Testing**: Full test suite passes
- [ ] **Security**: Security audit for major releases
- [ ] **Compatibility**: Test with latest dependencies

## 🤝 Community Guidelines

### Code of Conduct
- **Be Respectful**: Treat all contributors with respect
- **Be Inclusive**: Welcome diverse perspectives and backgrounds
- **Be Constructive**: Provide helpful, actionable feedback
- **Be Patient**: Remember that everyone is learning

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and community discussions
- **Pull Requests**: Code review and collaboration
- **Documentation**: Comprehensive guides and examples

### Recognition
Contributors are recognized through:
- **Contributors List**: Maintained in README.md
- **Release Notes**: Acknowledgment in changelog
- **GitHub Insights**: Contribution graphs and statistics

## 📞 Getting Help

### Resources
- **Documentation**: Comprehensive guides in `/docs`
- **Examples**: Working examples in `/examples`
- **Troubleshooting**: Common issues and solutions
- **AI Guidelines**: AI-assisted development best practices

### Support Channels
1. **GitHub Issues**: Technical problems and bugs
2. **GitHub Discussions**: Questions and community help
3. **Documentation**: Self-service guides and tutorials

### Response Times
- **Bug Reports**: 24-48 hours for initial response
- **Feature Requests**: 1-2 weeks for evaluation
- **Pull Requests**: 2-5 days for review
- **Questions**: 24-48 hours for community response

---

Thank you for contributing to Synaptic! Your contributions help make AI-assisted development more accessible and effective for everyone. 🚀

