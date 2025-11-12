import { test, expect } from '@playwright/test';
import { EmailSignupPage } from './pages/email.signup.page';
import { EmailValidator } from './utils/email.validator';
import { TEST_DATA, ERROR_MESSAGES, SUCCESS_MESSAGES } from './data/test.data';

test.describe('Email Verification Test Suite', () => {
  let signupPage: EmailSignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new EmailSignupPage(page);
    // Update the URL to your test application
    await signupPage.goto(TEST_DATA.urls.signup);
  });

  // ============================================================================
  // PART 1: EMAIL FORMAT VALIDATION
  // ============================================================================

  test.describe('Email Format Validation', () => {
    test('should accept valid email formats', async ({ page }) => {
      const email = TEST_DATA.validEmails[0];
      
      await signupPage.fillEmail(email);
      const isValid = EmailValidator.isValidEmail(email);
      
      expect(isValid).toBe(true);
    });

    test('should reject invalid email formats', async ({ page }) => {
      const invalidEmail = TEST_DATA.invalidEmails[0];
      
      const isValid = EmailValidator.isValidEmail(invalidEmail);
      
      expect(isValid).toBe(false);
    });

    test('should reject all invalid email formats in batch', async ({ page }) => {
      for (const email of TEST_DATA.invalidEmails) {
        const isValid = EmailValidator.isValidEmail(email);
        expect(isValid).toBe(false);
      }
    });

    test('should normalize email addresses', async ({ page }) => {
      const email = 'Test.User@Example.COM ';
      const normalized = EmailValidator.normalizeEmail(email);
      
      expect(normalized).toBe('test.user@example.com');
    });
  });

  // ============================================================================
  // PART 2: DISPOSABLE EMAIL DETECTION
  // ============================================================================

  test.describe('Disposable Email Detection', () => {
    test('should identify disposable email addresses', async ({ page }) => {
      for (const email of TEST_DATA.disposableEmails) {
        const isDisposable = EmailValidator.isDisposableEmail(email);
        expect(isDisposable).toBe(true);
      }
    });

    test('should not mark regular emails as disposable', async ({ page }) => {
      for (const email of TEST_DATA.validEmails) {
        const isDisposable = EmailValidator.isDisposableEmail(email);
        expect(isDisposable).toBe(false);
      }
    });
  });

  // ============================================================================
  // PART 3: SIGNUP WITH VALID EMAIL
  // ============================================================================

  test.describe('Signup with Valid Email', () => {
    test('should successfully signup with valid credentials', async ({ page }) => {
      const email = TEST_DATA.validEmails[0];
      const password = TEST_DATA.validPasswords[0];

      await signupPage.signupWithEmail(email, password);

      // Check for success message
      const successMsg = await signupPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();
    });

    test('should display verification prompt after signup', async ({ page }) => {
      const email = TEST_DATA.validEmails[1];
      const password = TEST_DATA.validPasswords[1];

      await signupPage.signupWithEmail(email, password);

      // Verify that verification UI is shown
      const verificationInput = page.locator('input[placeholder*="verification" i]');
      await expect(verificationInput).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to verification page after signup', async ({ page }) => {
      const email = TEST_DATA.validEmails[2];
      const password = TEST_DATA.validPasswords[2];

      await signupPage.signupWithEmail(email, password);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).toContain('verify');
    });
  });

  // ============================================================================
  // PART 4: SIGNUP WITH INVALID EMAIL
  // ============================================================================

  test.describe('Signup with Invalid Email', () => {
    test('should reject signup with invalid email format', async ({ page }) => {
      const invalidEmail = TEST_DATA.invalidEmails[0];
      const password = TEST_DATA.validPasswords[0];

      await signupPage.signupWithEmail(invalidEmail, password);

      const hasError = await signupPage.isErrorDisplayed();
      expect(hasError).toBe(true);
    });

    test('should show appropriate error message for invalid email', async ({ page }) => {
      const invalidEmail = TEST_DATA.invalidEmails[1];
      const password = TEST_DATA.validPasswords[0];

      await signupPage.signupWithEmail(invalidEmail, password);

      const errorMsg = await signupPage.getErrorMessage();
      expect(errorMsg).toBeTruthy();
      expect(errorMsg).toContain('valid');
    });

    test('should reject all invalid email formats', async ({ page }) => {
      for (const invalidEmail of TEST_DATA.invalidEmails) {
        if (invalidEmail === '') continue; // Skip empty string

        await signupPage.fillEmail(invalidEmail);
        const isValid = EmailValidator.isValidEmail(invalidEmail);
        expect(isValid).toBe(false);
      }
    });
  });

  // ============================================================================
  // PART 5: VERIFICATION CODE VALIDATION
  // ============================================================================

  test.describe('Verification Code Validation', () => {
    test('should accept valid verification code format', async ({ page }) => {
      for (const code of TEST_DATA.validVerificationCodes) {
        expect(code.length).toBe(6);
        expect(/^\d{6}$/.test(code)).toBe(true);
      }
    });

    test('should verify email with valid code', async ({ page }) => {
      const validCode = TEST_DATA.validVerificationCodes[0];

      await signupPage.verifyWithCode(validCode);

      const successMsg = await signupPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();
    });

    test('should reject invalid verification codes', async ({ page }) => {
      const invalidCode = TEST_DATA.invalidVerificationCodes[0];

      await signupPage.verifyWithCode(invalidCode);

      const hasError = await signupPage.isErrorDisplayed();
      expect(hasError).toBe(true);
    });
  });

  // ============================================================================
  // PART 6: TOKEN EXTRACTION FROM EMAIL
  // ============================================================================

  test.describe('Email Token Extraction', () => {
    test('should extract verification token from email body', async ({ page }) => {
      const emailBody =
        'Click here to verify: https://example.com/verify?token=abc123xyz789';

      const token = EmailValidator.extractTokenFromEmail(emailBody);

      expect(token).toBe('abc123xyz789');
    });

    test('should extract verification code from email body', async ({ page }) => {
      const emailBody = 'Your verification code is: verification?code=999888';

      const code = EmailValidator.extractTokenFromEmail(emailBody);

      expect(code).toBe('999888');
    });

    test('should return null if no token found', async ({ page }) => {
      const emailBody = 'Welcome to our service!';

      const token = EmailValidator.extractTokenFromEmail(emailBody);

      expect(token).toBeNull();
    });

    test('should extract verification URL from email', async ({ page }) => {
      const emailBody =
        'Click this link to verify: https://example.com/verify?token=xyz789';

      const url = EmailValidator.extractVerificationUrl(emailBody);

      expect(url).toContain('https://');
      expect(url).toContain('verify');
    });
  });

  // ============================================================================
  // PART 7: EMAIL CASE SENSITIVITY
  // ============================================================================

  test.describe('Email Case Sensitivity', () => {
    test('should handle uppercase emails correctly', async ({ page }) => {
      const email = 'TEST@EXAMPLE.COM';
      const normalized = EmailValidator.normalizeEmail(email);

      expect(normalized).toBe('test@example.com');
    });

    test('should treat different cases as same email', async ({ page }) => {
      const email1 = EmailValidator.normalizeEmail('User@Example.COM');
      const email2 = EmailValidator.normalizeEmail('user@example.com');

      expect(email1).toBe(email2);
    });

    test('should trim whitespace from email', async ({ page }) => {
      const email = '  user@example.com  ';
      const normalized = EmailValidator.normalizeEmail(email);

      expect(normalized).toBe('user@example.com');
    });
  });

  // ============================================================================
  // PART 8: COMPLETE SIGNUP AND VERIFICATION FLOW
  // ============================================================================

  test.describe('Complete Signup to Verification Flow', () => {
    test('should complete full signup and verification process', async ({ page }) => {
      const email = TEST_DATA.validEmails[0];
      const password = TEST_DATA.validPasswords[0];
      const verificationCode = TEST_DATA.validVerificationCodes[0];

      // Step 1: Signup
      await signupPage.signupWithEmail(email, password);
      let successMsg = await signupPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();

      // Step 2: Verify
      await signupPage.verifyWithCode(verificationCode);
      successMsg = await signupPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();

      // Step 3: Check redirect to dashboard or success page
      const currentUrl = await signupPage.getCurrentUrl();
      const isDashboard = currentUrl.includes('dashboard') || currentUrl.includes('success');
      expect(isDashboard).toBe(true);
    });

    test('should handle verification retry on invalid code', async ({ page }) => {
      const email = TEST_DATA.validEmails[1];
      const password = TEST_DATA.validPasswords[1];
      const invalidCode = TEST_DATA.invalidVerificationCodes[0];
      const validCode = TEST_DATA.validVerificationCodes[1];

      // Signup
      await signupPage.signupWithEmail(email, password);

      // Try with invalid code
      await signupPage.verifyWithCode(invalidCode);
      let hasError = await signupPage.isErrorDisplayed();
      expect(hasError).toBe(true);

      // Retry with valid code
      await signupPage.verifyWithCode(validCode);
      const successMsg = await signupPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();
    });
  });

  // ============================================================================
  // PART 9: EDGE CASES AND SPECIAL SCENARIOS
  // ============================================================================

  test.describe('Edge Cases', () => {
    test('should handle plus addressing in emails', async ({ page }) => {
      const email = 'user+tag@example.com';
      const isValid = EmailValidator.isValidEmail(email);

      expect(isValid).toBe(true);
    });

    test('should handle emails with dots', async ({ page }) => {
      const email = 'first.last@example.com';
      const isValid = EmailValidator.isValidEmail(email);

      expect(isValid).toBe(true);
    });

    test('should handle international domain names', async ({ page }) => {
      const email = 'user@example.co.uk';
      const isValid = EmailValidator.isValidEmail(email);

      expect(isValid).toBe(true);
    });

    test('should reject consecutive dots in local part', async ({ page }) => {
      const email = 'user..name@example.com';
      const isValid = EmailValidator.isValidEmail(email);

      // This should fail with strict validation
      const isValidStrict = EmailValidator.isValidEmailStrict(email);
      expect(isValidStrict).toBe(false);
    });
  });
});
