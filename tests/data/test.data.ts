/**
 * Test data and configurations for email verification tests
 */

export const TEST_DATA = {
  // Valid test emails
  validEmails: [
    'user.name@example.com',
    'test+tag@domain.co.uk',
    'firstname.lastname@company.org',
  ],

  // Invalid email formats
  invalidEmails: [
    'notanemail',
    '@nodomain.com',
    'user@',
    'user @domain.com',
    'user@domain',
    '',
    'user..name@domain.com',
  ],

  // Common disposable email domains
  disposableEmails: [
    'user@tempmail.com',
    'test@guerrillamail.com',
    'someone@mailinator.com',
  ],

  // Passwords for testing
  validPasswords: [
    'SecurePass123!',
    'MyP@ssw0rd',
    'Test1234!@#$',
  ],

  weakPasswords: [
    '123456',
    'password',
    '12345678',
    'qwerty',
  ],

  // Verification codes
  validVerificationCodes: ['123456', '000000', '999999'],
  invalidVerificationCodes: ['12345', '1234567', 'abcdef', ''],

  // Wait times (in ms)
  waitTimes: {
    short: 3000,
    medium: 5000,
    long: 10000,
  },

  // Test URLs - Update these with your actual test environment URLs
  urls: {
    signup: 'http://localhost:3000/signup',
    verification: 'http://localhost:3000/verify',
    dashboard: 'http://localhost:3000/dashboard',
  },
};

export const ERROR_MESSAGES = {
  invalidEmail: 'Please enter a valid email address',
  emailExists: 'This email is already registered',
  weakPassword: 'Password is too weak',
  verificationExpired: 'Verification link has expired',
  invalidCode: 'Invalid verification code',
  disposableEmail: 'Disposable email addresses are not allowed',
};

export const SUCCESS_MESSAGES = {
  signupSuccess: 'Check your email to verify your account',
  verificationSuccess: 'Email verified successfully',
  accountCreated: 'Account created successfully',
};
