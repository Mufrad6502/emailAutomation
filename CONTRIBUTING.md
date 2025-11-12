# Contributing Guide

Thank you for your interest in contributing to the Email Verification Automation project!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

---

## Code of Conduct

Be respectful, inclusive, and professional. We're committed to maintaining a welcoming community.

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm 8+
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/emailAutomation.git
   cd emailAutomation
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests with debug
npm run test:debug

# Run specific test
npx playwright test -g "test name"
```

### Project Structure

```
tests/
├── email.verification.spec.ts  # Main test file
├── pages/
│   └── email.signup.page.ts    # Page Object Model
├── utils/
│   └── email.validator.ts      # Utility functions
├── data/
│   └── test.data.ts            # Test data
└── fixtures/
    └── email.fixture.ts        # Test fixtures
```

### Adding New Tests

1. Add test cases to `tests/email.verification.spec.ts`
2. Use existing utilities from `EmailValidator` class
3. Follow the test naming convention: `should [action] [when condition]`

### Adding New Utilities

1. Add methods to `tests/utils/email.validator.ts`
2. Include JSDoc comments
3. Write unit tests for new utilities

### Updating Page Objects

1. Modify `tests/pages/email.signup.page.ts`
2. Update selectors if UI changes
3. Add new methods for new page actions

---

## Coding Standards

### TypeScript

- Use TypeScript for all files
- Enable strict mode
- Avoid `any` type
- Use meaningful variable names
- Add JSDoc comments for public methods

### Naming Conventions

- **Classes**: PascalCase (e.g., `EmailValidator`)
- **Methods**: camelCase (e.g., `isValidEmail`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TEST_TIMEOUT`)
- **Test names**: descriptive with "should" prefix (e.g., `should accept valid email formats`)

### Code Style

```typescript
// ✅ Good
static isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ❌ Avoid
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
```

---

## Testing Guidelines

### Test Structure

```typescript
test('should do something', async ({ page }) => {
  // Arrange - setup
  const testData = 'value';
  
  // Act - perform action
  await page.goto('url');
  
  // Assert - verify result
  expect(result).toBe(expected);
});
```

### Test Naming

- Use descriptive names
- Include the action and expected outcome
- Example: `should accept valid email formats`

### Test Coverage

- Test happy paths
- Test error cases
- Test edge cases
- Aim for comprehensive coverage

### Selectors

Use descriptive selectors:
```typescript
// ✅ Good
private readonly emailInput = 'input[type="email"]';
private readonly submitButton = 'button[type="submit"]';

// ❌ Avoid
private readonly field1 = 'input';
private readonly btn = 'button';
```

---

## Commit Messages

Follow Conventional Commits format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Adding/updating tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Examples

```
feat(validator): add strict email validation

Added isValidEmailStrict() method with RFC 5322 compliance.

Closes #123
```

```
fix(pages): update email input selector

The email input selector was changed in the latest UI update.
```

```
test(spec): add edge case tests for email formats
```

---

## Pull Requests

### Before Submitting

1. ✅ Tests pass: `npm test`
2. ✅ No TypeScript errors: `npx tsc --noEmit`
3. ✅ Code is formatted
4. ✅ Commit messages follow conventions
5. ✅ Documentation is updated

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added new tests
- [ ] All tests pass

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tests pass locally

## Related Issues
Closes #(issue number)
```

### Review Process

1. CI/CD checks must pass
2. At least one approval required
3. Address review feedback
4. Squash commits if needed

---

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable
- Environment info (Node version, OS, etc.)

### Feature Requests

Include:
- Clear description of the feature
- Use case/benefit
- Proposed solution
- Alternative solutions

---

## Documentation

### Updating Docs

- Update README.md for major changes
- Update inline comments for code changes
- Keep PLAN.md architecture current
- Add examples for new features

### Style Guide

- Use clear, simple language
- Include code examples
- Add links to related docs
- Keep formatting consistent

---

## Questions?

- Check existing documentation
- Search closed issues
- Open a discussion issue
- Ask maintainers for clarification

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC).

---

**Thank you for contributing! 🎉**
