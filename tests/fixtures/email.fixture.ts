import { test as base, Page } from '@playwright/test';

export type EmailFixtures = {
  page: Page;
};

/**
 * Fixtures for email testing
 */
export const test = base.extend<EmailFixtures>({
  page: async ({ page }, use) => {
    // Setup - add any email-specific initialization here
    await use(page);
    // Teardown
  },
});

export { expect } from '@playwright/test';
