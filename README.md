# Email Verification Testing Automation

This is a comprehensive Playwright-based test automation suite for email verification flows.

## 📋 Project Structure

```
tests/
├── data/
│   └── test.data.ts              # Test data, configurations, and constants
├── fixtures/
│   └── email.fixture.ts          # Test fixtures for setup/teardown
├── pages/
│   └── email.signup.page.ts      # Page Object Model for signup/verification
├── utils/
│   └── email.validator.ts        # Email validation utility functions
└── email.verification.spec.ts    # Main test suite (440+ tests)
```

## 🎯 Test Coverage

The test suite includes 9 major test suites covering:

### 1. **Email Format Validation**
- Valid email format acceptance
- Invalid format rejection
- Email normalization
- Case sensitivity handling

### 2. **Disposable Email Detection**
- Identification of disposable email addresses
- Regular email validation
- Common disposable domain detection

### 3. **Signup with Valid Email**
- Successful registration with valid credentials
- Verification prompt display
- Correct page navigation after signup

### 4. **Signup with Invalid Email**
- Rejection of invalid email formats
- Appropriate error messaging
- Batch validation of invalid emails

### 5. **Verification Code Validation**
- Valid code format acceptance
- Email verification with valid codes
- Invalid code rejection
- Error handling

### 6. **Email Token Extraction**
- Verification token extraction from email
- Verification code extraction
- Verification URL extraction
- Handling emails without tokens

### 7. **Email Case Sensitivity**
- Uppercase email handling
- Case-insensitive comparison
- Whitespace trimming

### 8. **Complete Signup Flow**
- End-to-end signup and verification
- Verification retry on invalid code
- Dashboard/success page navigation

### 9. **Edge Cases**
- Plus addressing (user+tag@domain.com)
- Dots in email addresses
- International domain names
- Consecutive dot rejection

## 🛠️ Utilities

### EmailValidator Class
Provides static methods for email validation:

- `isValidEmail(email)` - Basic email validation
- `isValidEmailStrict(email)` - RFC 5322 compliant validation
- `isDisposableEmail(email)` - Detects disposable email services
- `normalizeEmail(email)` - Normalizes email (lowercase, trim)
- `extractTokenFromEmail(body)` - Extracts verification tokens
- `extractVerificationUrl(body)` - Extracts verification URLs

### EmailSignupPage Class
Page Object Model providing methods for:

- Page navigation
- Form filling (email, password)
- Button clicking
- Message retrieval (success/error)
- Verification code entry
- URL checking

## 📦 Test Data

Located in `tests/data/test.data.ts`:

- **Valid Emails**: Example email addresses for successful registration
- **Invalid Emails**: Malformed email addresses for rejection testing
- **Disposable Emails**: Known disposable email domain examples
- **Passwords**: Both valid and weak password examples
- **Verification Codes**: Valid and invalid code formats
- **Wait Times**: Configurable timeout values
- **URLs**: Test environment URLs (configure before running)

## 🚀 Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Recommended for Development)
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Specific Test File
```bash
npx playwright test email.verification.spec.ts
```

### Run Specific Test Suite
```bash
npx playwright test --grep "Email Format Validation"
```

### Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run test:report
```

## ⚙️ Configuration

### Update Test URLs
Edit `tests/data/test.data.ts` and update the `urls` object:

```typescript
urls: {
  signup: 'http://localhost:3000/signup',    // Your signup page
  verification: 'http://localhost:3000/verify', // Your verification page
  dashboard: 'http://localhost:3000/dashboard', // Your dashboard
}
```

### Configure Browsers
Edit `playwright.config.ts` to run on specific browsers:

- Chromium (default)
- Firefox
- WebKit

## 🔧 Customization

### Add Custom Email Validators
Extend `EmailValidator` class in `tests/utils/email.validator.ts`:

```typescript
static myCustomValidator(email: string): boolean {
  // Your custom logic
}
```

### Add New Test Data
Update `TEST_DATA` object in `tests/data/test.data.ts`:

```typescript
myCustomData: ['value1', 'value2'],
```

### Create Additional Page Objects
Create new page objects in `tests/pages/` for other pages in your application.

## 📊 Test Reports

After running tests, an HTML report is generated:
```bash
npx playwright show-report
```

Reports include:
- Passed/Failed test counts
- Execution time
- Screenshots on failure
- Video recordings
- Trace files

## 🐛 Debugging

### Enable Trace
```bash
npx playwright test --trace on
```

### Step Through Tests
```bash
npm run test:debug
```

### Inspect Selectors
```bash
npx playwright inspector
```

## 📝 Best Practices

1. **Keep selectors updated** - Update selectors in `EmailSignupPage` if UI changes
2. **Use test data** - Don't hardcode values; use `TEST_DATA` instead
3. **Normalize emails** - Always normalize before comparison
4. **Wait for network** - Use `waitForLoadState('networkidle')` after submissions
5. **Catch errors gracefully** - Most validator methods won't throw, they return false/null

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev)
- [Email Validation Best Practices](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address)
- [RFC 5322 Email Standard](https://tools.ietf.org/html/rfc5322)

## 📄 License

ISC

## 👤 Author

Email Automation Team

---

**Last Updated**: November 2025
**Playwright Version**: ^1.56.1
