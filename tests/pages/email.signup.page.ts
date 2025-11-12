import { Page } from '@playwright/test';

/**
 * Page Object Model for Email Signup/Verification Pages
 */
export class EmailSignupPage {
  constructor(private page: Page) {}

  // Selectors
  private readonly emailInput = 'input[type="email"], input[name*="email" i]';
  private readonly passwordInput = 'input[type="password"]';
  private readonly signupButton = 'button[type="submit"]:has-text("Sign Up"), button[type="submit"]:has-text("Register")';
  private readonly errorMessage = '[role="alert"], .error, .error-message, .alert-danger';
  private readonly successMessage = '.success, .success-message, .alert-success';
  private readonly verificationInput = 'input[placeholder*="verification" i], input[placeholder*="code" i]';
  private readonly verifyButton = 'button:has-text("Verify"), button:has-text("Confirm")';

  /**
   * Navigate to signup page
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click signup button
   */
  async clickSignup(): Promise<void> {
    await this.page.click(this.signupButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Fill email and password and submit
   */
  async signupWithEmail(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignup();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.page.textContent(this.errorMessage);
    } catch {
      return null;
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string | null> {
    try {
      await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
      return await this.page.textContent(this.successMessage);
    } catch {
      return null;
    }
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill verification code
   */
  async fillVerificationCode(code: string): Promise<void> {
    await this.page.fill(this.verificationInput, code);
  }

  /**
   * Click verify button
   */
  async clickVerify(): Promise<void> {
    await this.page.click(this.verifyButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify email with code
   */
  async verifyWithCode(code: string): Promise<void> {
    await this.fillVerificationCode(code);
    await this.clickVerify();
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible(): Promise<boolean> {
    return await this.page.isVisible(this.emailInput);
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
