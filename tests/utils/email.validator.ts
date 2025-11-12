/**
 * Utility functions for email validation and handling
 */

export class EmailValidator {
  /**
   * Validate email format using regex
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate email with stricter RFC 5322 pattern
   */
  static isValidEmailStrict(email: string): boolean {
    const strictRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    return strictRegex.test(email);
  }

  /**
   * Check if email is disposable
   */
  static isDisposableEmail(email: string): boolean {
    const disposableDomains = [
      'tempmail.com',
      'guerrillamail.com',
      'mailinator.com',
      '10minutemail.com',
      'throwaway.email',
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain || '');
  }

  /**
   * Normalize email (lowercase, trim whitespace)
   */
  static normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Extract verification token from email body
   */
  static extractTokenFromEmail(emailBody: string): string | null {
    // Common patterns for verification links
    const patterns = [
      /verify[?&]token=([a-zA-Z0-9\-_]+)/i,
      /verification[?&]code=([a-zA-Z0-9\-_]+)/i,
      /token=([a-zA-Z0-9\-_]+)/i,
      /code=([a-zA-Z0-9\-_]+)/i,
    ];

    for (const pattern of patterns) {
      const match = emailBody.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Extract verification URL from email body
   */
  static extractVerificationUrl(emailBody: string): string | null {
    const urlPattern =
      /(https?:\/\/[^\s]+verify[^\s]*|https?:\/\/[^\s]+confirm[^\s]*)/gi;
    const match = emailBody.match(urlPattern);
    return match ? match[0] : null;
  }
}
