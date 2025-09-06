# AI Agent Instructions for Synaptic Development Environment

This document provides comprehensive guidelines for AI agents (GitHub Copilot, Claude, etc.) working within this professional development environment. These instructions ensure code quality, security, and compliance with industry standards.

**🧠 NEW: AI Personality-Aware Guardrails** - Based on empirical analysis of LLM coding behaviors, these guidelines adapt to different AI model characteristics to compensate for known weaknesses and leverage strengths.

## 🤖 AI Model-Specific Guidelines

### Claude 3.5 Sonnet (Senior Architect) Guardrails
**Personality**: Highly verbose, comprehensive solutions
**Strengths**: Complex architecture, thorough analysis
**Weaknesses**: Over-engineering, excessive verbosity (370K LOC vs 120K average)

**Specific Instructions:**
- **LIMIT VERBOSITY**: Focus on essential code only, avoid over-engineering
- **SECURITY FOCUS**: 34% of vulnerabilities are path-traversal - validate all file paths
- **RESOURCE MANAGEMENT**: Always use try-with-resources patterns
- **CONCISENESS**: If solution exceeds 100 lines, break into smaller functions

```javascript
// ✅ CORRECT: Concise, focused implementation
const validatePath = (userPath) => {
  if (!userPath || typeof userPath !== 'string') {
    throw new Error('Invalid path provided');
  }
  return path.resolve(path.normalize(userPath));
};

// ❌ AVOID: Over-engineered, verbose solutions
```

### GPT-4o (Rapid Prototyper) Guardrails  
**Personality**: Balanced approach, moderate complexity
**Strengths**: Quick solutions, reasonable verbosity
**Weaknesses**: Control flow mistakes (48% of bugs), exception handling gaps

**Specific Instructions:**
- **CONTROL FLOW VALIDATION**: Extra attention to complex conditional logic
- **MANDATORY ERROR HANDLING**: Never ignore exceptions or error return values
- **DOCUMENTATION**: Include inline comments for complex algorithms
- **TESTING**: Always include basic test cases for control flow

```javascript
// ✅ CORRECT: Proper control flow and error handling
try {
  const result = await processData(input);
  if (!result || result.status !== 'success') {
    throw new Error(`Processing failed: ${result?.error || 'Unknown error'}`);
  }
  return result.data;
} catch (error) {
  logger.error('Data processing failed:', error);
  throw error;
}

// ❌ AVOID: Missing error handling or complex nested conditions
```

### o1-preview/o1-mini (Reasoning Specialist) Guardrails
**Personality**: Deep reasoning, step-by-step analysis
**Strengths**: Complex problem solving, mathematical reasoning
**Weaknesses**: Can be slow, may over-analyze simple problems

**Specific Instructions:**
- **REASONING DOCUMENTATION**: Include step-by-step reasoning in comments
- **ALGORITHM OPTIMIZATION**: Focus on algorithmic efficiency
- **MATHEMATICAL ACCURACY**: Double-check calculations and formulas
- **COMPLEXITY ANALYSIS**: Include time/space complexity comments

```python
# ✅ CORRECT: Clear reasoning and complexity analysis
def binary_search(arr, target):
    """
    Binary search implementation
    Time Complexity: O(log n)
    Space Complexity: O(1)
    
    Reasoning:
    1. Array must be sorted
    2. Compare target with middle element
    3. Eliminate half of search space each iteration
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

### OpenCoder-8B (Efficient Generalist) Guardrails
**Personality**: Minimal code, optimization-focused
**Strengths**: Concise solutions, performance-oriented
**Weaknesses**: Dead code generation (42%), security gaps, hard-coded credentials (29%)

**Specific Instructions:**
- **DEAD CODE ELIMINATION**: Remove unused variables, imports, and functions
- **SECURITY HARDENING**: Never hard-code credentials or sensitive data
- **COMPLETENESS VALIDATION**: Ensure all code paths are implemented
- **PERFORMANCE FOCUS**: Optimize for speed and memory usage

```python
# ✅ CORRECT: Clean, secure, complete implementation
import os
from typing import Optional

def get_api_key(service: str) -> Optional[str]:
    """Retrieve API key from environment variables"""
    key = os.getenv(f"{service.upper()}_API_KEY")
    if not key:
        raise ValueError(f"Missing {service} API key in environment")
    return key

# ❌ AVOID: Hard-coded credentials or unused imports
```

### Claude 3.5 Haiku (Documentation Expert) Guardrails
**Personality**: Well-documented, stable patterns
**Strengths**: Excellent documentation, reliable code
**Weaknesses**: May use outdated patterns, XML vulnerabilities (15%)

**Specific Instructions:**
- **MODERN PATTERNS**: Use current best practices and frameworks
- **SECURITY UPDATES**: Avoid XML external entity processing
- **DOCUMENTATION QUALITY**: Maintain high comment density
- **PATTERN MODERNIZATION**: Update legacy approaches to current standards

```typescript
// ✅ CORRECT: Modern patterns with excellent documentation
/**
 * User authentication service using modern JWT patterns
 * 
 * @class AuthService
 * @description Handles user authentication with secure token management
 * @version 2.0.0
 * @since 2024-01-01
 */
class AuthService {
  /**
   * Authenticate user with email and password
   * 
   * @param email - User email address (validated)
   * @param password - User password (will be hashed)
   * @returns Promise<AuthResult> - Authentication result with JWT token
   * @throws {AuthError} When credentials are invalid
   */
  async authenticate(email: string, password: string): Promise<AuthResult> {
    // Implementation with modern async/await patterns
  }
}
```

## 🛡️ Universal Security Guidelines

### API Key and Secrets Management
```bash
# ✅ CORRECT: Environment-based configuration
export OPENAI_API_KEY="your-key-here"
export ANTHROPIC_API_KEY="your-key-here"

# ❌ NEVER: Hard-coded in source files
const API_KEY = "sk-1234567890abcdef"; // NEVER DO THIS
```

### Input Validation and Sanitization
```javascript
// ✅ CORRECT: Comprehensive input validation
const validateUserInput = (input) => {
  if (!input || typeof input !== 'string') {
    throw new ValidationError('Input must be a non-empty string');
  }
  
  // Sanitize against XSS
  const sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Validate length
  if (sanitized.length > 1000) {
    throw new ValidationError('Input exceeds maximum length');
  }
  
  return sanitized.trim();
};
```

### Path Traversal Prevention
```javascript
// ✅ CORRECT: Safe path handling
const path = require('path');

const validateFilePath = (userPath) => {
  const normalizedPath = path.normalize(userPath);
  const resolvedPath = path.resolve(normalizedPath);
  
  // Ensure path is within allowed directory
  if (!resolvedPath.startsWith(process.cwd())) {
    throw new SecurityError('Path traversal attempt detected');
  }
  
  return resolvedPath;
};
```

## 🏗️ Architecture Guidelines

### Project Structure Standards
```
project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── services/       # Business logic and API calls
│   ├── utils/          # Helper functions and utilities
│   ├── types/          # TypeScript type definitions
│   └── tests/          # Test files
├── docs/               # Documentation
├── scripts/            # Build and deployment scripts
└── configs/            # Configuration files
```

### Code Organization Principles
1. **Single Responsibility**: Each function/class has one clear purpose
2. **Dependency Injection**: Avoid tight coupling between modules
3. **Error Boundaries**: Implement proper error handling at module boundaries
4. **Configuration Management**: Externalize all configuration

## 🎯 Code Quality Standards

### TypeScript/JavaScript Guidelines
```typescript
// ✅ CORRECT: Proper TypeScript usage
interface UserProfile {
  readonly id: string;
  email: string;
  name: string;
  createdAt: Date;
  preferences?: UserPreferences;
}

class UserService {
  private readonly repository: UserRepository;
  
  constructor(repository: UserRepository) {
    this.repository = repository;
  }
  
  async createUser(userData: Omit<UserProfile, 'id' | 'createdAt'>): Promise<UserProfile> {
    const user: UserProfile = {
      id: generateId(),
      createdAt: new Date(),
      ...userData
    };
    
    return await this.repository.save(user);
  }
}
```

### Python Guidelines
```python
# ✅ CORRECT: Python best practices
from typing import Optional, List, Dict, Any
from dataclasses import dataclass
from abc import ABC, abstractmethod

@dataclass(frozen=True)
class UserProfile:
    """Immutable user profile data structure"""
    id: str
    email: str
    name: str
    created_at: datetime
    preferences: Optional[Dict[str, Any]] = None

class UserRepository(ABC):
    """Abstract base class for user data access"""
    
    @abstractmethod
    async def save(self, user: UserProfile) -> UserProfile:
        """Save user profile to storage"""
        pass
    
    @abstractmethod
    async def find_by_email(self, email: str) -> Optional[UserProfile]:
        """Find user by email address"""
        pass
```

## 🚫 Prohibited Patterns

### Security Anti-Patterns
```javascript
// ❌ NEVER: SQL injection vulnerability
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

// ✅ CORRECT: Parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
const result = await db.query(query, [userEmail]);
```

### Performance Anti-Patterns
```javascript
// ❌ NEVER: Blocking operations in loops
for (const item of items) {
  await processItem(item); // Blocks each iteration
}

// ✅ CORRECT: Parallel processing
await Promise.all(items.map(item => processItem(item)));
```

### Code Quality Anti-Patterns
```javascript
// ❌ NEVER: Magic numbers and unclear variable names
const x = data.filter(d => d.age > 18 && d.score > 85);

// ✅ CORRECT: Clear, self-documenting code
const MINIMUM_AGE = 18;
const PASSING_SCORE = 85;
const eligibleCandidates = applicants.filter(applicant => 
  applicant.age >= MINIMUM_AGE && applicant.score >= PASSING_SCORE
);
```

## 🧪 Testing Requirements

### Unit Testing Standards
```javascript
// ✅ CORRECT: Comprehensive test coverage
describe('UserService', () => {
  let userService: UserService;
  let mockRepository: jest.Mocked<UserRepository>;
  
  beforeEach(() => {
    mockRepository = createMockRepository();
    userService = new UserService(mockRepository);
  });
  
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result.id).toBeDefined();
      expect(result.email).toBe(userData.email);
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining(userData));
    });
    
    it('should throw error for invalid email', async () => {
      // Arrange
      const invalidData = { email: 'invalid-email', name: 'Test User' };
      
      // Act & Assert
      await expect(userService.createUser(invalidData)).rejects.toThrow('Invalid email format');
    });
  });
});
```

## 📚 Documentation Standards

### Code Documentation
```typescript
/**
 * Calculates the compound interest for an investment
 * 
 * @param principal - Initial investment amount in dollars
 * @param rate - Annual interest rate as a decimal (e.g., 0.05 for 5%)
 * @param time - Investment period in years
 * @param compoundingFrequency - Number of times interest is compounded per year
 * @returns The final amount after compound interest
 * 
 * @example
 * ```typescript
 * const finalAmount = calculateCompoundInterest(1000, 0.05, 10, 12);
 * console.log(finalAmount); // 1643.62
 * ```
 * 
 * @throws {Error} When any parameter is negative or zero
 */
function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  compoundingFrequency: number = 1
): number {
  if (principal <= 0 || rate < 0 || time <= 0 || compoundingFrequency <= 0) {
    throw new Error('All parameters must be positive numbers');
  }
  
  return principal * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * time);
}
```

## 🔄 Code Review Checklist

### Before Submitting Code
- [ ] **Security**: No hard-coded secrets, proper input validation
- [ ] **Performance**: No blocking operations, efficient algorithms
- [ ] **Testing**: Unit tests with >80% coverage
- [ ] **Documentation**: Clear comments and function documentation
- [ ] **Error Handling**: Proper exception handling and logging
- [ ] **Type Safety**: Full TypeScript coverage, no `any` types
- [ ] **Accessibility**: WCAG 2.1 AA compliance for UI components
- [ ] **Mobile Responsive**: Works on all device sizes
- [ ] **Browser Compatibility**: Tested on major browsers

### AI Model-Specific Checks
- [ ] **Claude**: Avoided over-engineering and excessive verbosity
- [ ] **GPT-4o**: Validated control flow and error handling
- [ ] **o1**: Included reasoning documentation and complexity analysis
- [ ] **OpenCoder**: Eliminated dead code and hard-coded values
- [ ] **Haiku**: Used modern patterns and avoided XML vulnerabilities

## 🚀 Deployment Guidelines

### Environment Configuration
```bash
# ✅ CORRECT: Environment-specific configuration
# .env.production
NODE_ENV=production
API_BASE_URL=https://api.production.com
LOG_LEVEL=error
RATE_LIMIT_REQUESTS=1000

# .env.development
NODE_ENV=development
API_BASE_URL=http://localhost:3001
LOG_LEVEL=debug
RATE_LIMIT_REQUESTS=100
```

### Build Optimization
```javascript
// ✅ CORRECT: Production build configuration
const config = {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    maxAssetSize: 250000,
    maxEntrypointSize: 250000,
  },
};
```

## 🎯 AI Agent Behavior Guidelines

### Response Quality
1. **Accuracy First**: Provide correct, tested solutions
2. **Security Conscious**: Always consider security implications
3. **Performance Aware**: Optimize for speed and efficiency
4. **Maintainable Code**: Write code that's easy to understand and modify
5. **Documentation Rich**: Include clear explanations and examples

### Communication Style
1. **Concise Explanations**: Clear, direct communication
2. **Code Examples**: Always provide working code samples
3. **Best Practices**: Highlight industry standards and conventions
4. **Error Prevention**: Anticipate common mistakes and provide guidance

### Continuous Learning
1. **Stay Updated**: Use current versions of frameworks and libraries
2. **Security Awareness**: Keep up with latest security best practices
3. **Performance Optimization**: Apply modern optimization techniques
4. **Accessibility Standards**: Ensure inclusive design practices

---

**Remember**: These guidelines are designed to work with AI personality characteristics to produce the highest quality code while maintaining security, performance, and maintainability standards. Always prioritize user safety and data protection in every implementation.

