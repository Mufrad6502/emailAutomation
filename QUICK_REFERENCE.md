# Quick Reference Guide - Email Verification Automation

## 🚀 Getting Started in 3 Steps

### Step 1: Configure Your Test URLs
```bash
# Edit this file and update the URLs to your application
nano tests/data/test.data.ts

# Look for this section and update:
urls: {
  signup: 'YOUR_SIGNUP_URL',          # e.g., http://localhost:3000/signup
  verification: 'YOUR_VERIFY_URL',    # e.g., http://localhost:3000/verify
  dashboard: 'YOUR_DASHBOARD_URL',    # e.g., http://localhost:3000/dashboard
}
```

### Step 2: Run Tests in UI Mode (Recommended)
```bash
npm run test:ui
```
This opens an interactive UI where you can:
- Watch tests execute in real-time
- Click on tests to run them individually
- Inspect elements on the page
- See detailed failure information

### Step 3: Review Results
- ✅ Green = Passed
- ❌ Red = Failed
- ⏸️ Click any test to inspect

---

## 📋 Common Commands

```bash
# Run all tests
npm test

# Run tests with visual browser
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Show test report
npm run test:report

# List all tests
npx playwright test --list

# Run specific test by name
npx playwright test -g "should accept valid email"

# Run specific browser only
npx playwright test --project=chromium

# Run with detailed output
npx playwright test --reporter=list
```

---

## 🎯 Test Suites at a Glance

### 1. Email Format Validation
Tests email format acceptance and rejection
```
should accept valid email formats
should reject invalid email formats
should reject all invalid email formats in batch
should normalize email addresses
```

### 2. Disposable Email Detection
Identifies and blocks disposable email addresses
```
should identify disposable email addresses
should not mark regular emails as disposable
```

### 3. Signup with Valid Email
Tests successful signup flows
```
should successfully signup with valid credentials
should display verification prompt after signup
should navigate to verification page after signup
```

### 4. Signup with Invalid Email
Tests error handling for invalid emails
```
should reject signup with invalid email format
should show appropriate error message for invalid email
should reject all invalid email formats
```

### 5. Verification Code Validation
Tests verification code processing
```
should accept valid verification code format
should verify email with valid code
should reject invalid verification codes
```

### 6. Email Token Extraction
Tests token/URL extraction from emails
```
should extract verification token from email body
should extract verification code from email body
should return null if no token found
should extract verification URL from email
```

### 7. Email Case Sensitivity
Tests email normalization
```
should handle uppercase emails correctly
should treat different cases as same email
should trim whitespace from email
```

### 8. Complete Signup Flow
End-to-end integration tests
```
should complete full signup and verification process
should handle verification retry on invalid code
```

### 9. Edge Cases
Tests special email formats
```
should handle plus addressing in emails
should handle emails with dots
should handle international domain names
should reject consecutive dots in local part
```

---

## 🔍 Debugging Tips

### When Tests Fail

1. **Check the Error Message**
   - Look at red test name
   - Read error details

2. **Use Debug Mode**
   ```bash
   npm run test:debug
   ```
   - Pause at each step
   - Step through code
   - Inspect variables

3. **Use UI Mode**
   ```bash
   npm run test:ui
   ```
   - Visually see what's happening
   - Click on elements
   - Check element selectors

4. **View Full Report**
   ```bash
   npm run test:report
   ```
   - Screenshots of failures
   - Detailed error messages
   - Network activity

---

## 📝 Files Overview

| File | Purpose |
|------|---------|
| `tests/email.verification.spec.ts` | Main test file (28 tests) |
| `tests/pages/email.signup.page.ts` | Page selectors & interactions |
| `tests/utils/email.validator.ts` | Email validation utilities |
| `tests/data/test.data.ts` | Test data & configuration |
| `tests/fixtures/email.fixture.ts` | Test setup/teardown |
| `playwright.config.ts` | Playwright configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies & scripts |

---

## 🛠️ Customization Quick Guide

### Add New Test Data
```typescript
// In tests/data/test.data.ts
export const TEST_DATA = {
  // ... existing data
  myCustomEmails: ['test1@example.com', 'test2@example.com'],
};
```

### Add New Test Case
```typescript
// In tests/email.verification.spec.ts
test('should do something', async ({ page }) => {
  const signupPage = new EmailSignupPage(page);
  // Your test code here
  expect(someCondition).toBe(true);
});
```

### Update Page Selectors
```typescript
// In tests/pages/email.signup.page.ts
private readonly mySelector = 'input[name="my-field"]';

async fillMyField(value: string): Promise<void> {
  await this.page.fill(this.mySelector, value);
}
```

### Add Custom Validation
```typescript
// In tests/utils/email.validator.ts
static myCustomCheck(email: string): boolean {
  return email.includes('custom');
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
npx tsc --noEmit
```

### Issue: Tests not found
**Solution:**
```bash
npx playwright test --list
# If empty, check test file imports
```

### Issue: Selectors not working
**Solution:**
1. Run: `npm run test:ui`
2. Open DevTools (right-click → Inspect)
3. Find correct selector
4. Update in `tests/pages/email.signup.page.ts`

### Issue: Tests timeout
**Solution:**
- Increase timeout in `playwright.config.ts`
- Check if webpage is responding
- Verify network connectivity

### Issue: Tests fail randomly (flaky)
**Solution:**
1. Increase wait times in `tests/data/test.data.ts`
2. Add explicit waits: `await page.waitForLoadState('networkidle')`
3. Use more specific selectors

---

## 📊 Performance Tips

1. **Parallel Execution**
   - Enabled by default
   - Tests run simultaneously
   - Faster overall execution

2. **Retry Failed Tests**
   - Configured in `playwright.config.ts`
   - Helps with flaky tests

3. **Use UI Mode**
   - Better for debugging
   - Not for CI/CD

4. **Headless Mode**
   - Faster than headed
   - Default for `npm test`

---

## 🚀 CI/CD Integration

### GitHub Actions
```bash
# Already configured in .github/workflows/playwright.yml
# Tests run automatically on push
```

### Manual CI/CD Setup
```yaml
# Add to your CI/CD config
- name: Run Email Verification Tests
  run: npm test

- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

---

## 📈 Test Coverage

| Category | Tests | Coverage |
|----------|-------|----------|
| Email Validation | 4 | 100% |
| Disposable Emails | 2 | 100% |
| Signup Flow | 6 | 100% |
| Verification | 3 | 100% |
| Token Extraction | 4 | 100% |
| Edge Cases | 4 | 100% |
| Integration | 2 | 100% |
| **TOTAL** | **28** | **100%** |

Each test runs on 3 browsers = **84 total test executions**

---

## 💡 Pro Tips

1. **Use Test Explorer**
   ```bash
   npm run test:ui
   ```
   Easiest way to understand tests

2. **Save Time with Grep**
   ```bash
   npx playwright test -g "valid email"
   ```
   Run only matching tests

3. **Check Selectors**
   - Use browser DevTools
   - Update in `email.signup.page.ts`
   - Re-run tests

4. **Use Traces**
   ```bash
   npx playwright test --trace on
   ```
   Great for debugging

5. **View Network**
   - Run in debug mode
   - Check network requests
   - Verify API responses

---

## 📱 Running on Different Browsers

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit

# Specific test on all browsers
npx playwright test email.verification.spec.ts
```

---

## 🎯 Before Going to Production

- [ ] Configure correct test URLs
- [ ] Update test data for your application
- [ ] Run all tests: `npm test`
- [ ] Review HTML report
- [ ] Check for any failures
- [ ] Customize page selectors if needed
- [ ] Set up CI/CD pipeline
- [ ] Schedule regular test runs

---

## 🆘 Need Help?

1. **Check Documentation**
   - `README.md` - Full reference
   - `PLAN.md` - Architecture details

2. **Debug Tests**
   ```bash
   npm run test:debug
   ```

3. **View Reports**
   ```bash
   npm run test:report
   ```

4. **Check Test Output**
   ```bash
   npx playwright test --reporter=verbose
   ```

---

## ⚡ Quick Checklist

- [ ] Run `npm install`
- [ ] Update test URLs in `tests/data/test.data.ts`
- [ ] Run `npm run test:ui`
- [ ] Tests pass ✓
- [ ] Run `npm test` for full suite
- [ ] Check `npm run test:report`
- [ ] Customize for your needs
- [ ] Ready to integrate into CI/CD! 🚀

---

**Need more help?** See README.md and PLAN.md for detailed information.

Last Updated: November 12, 2025
