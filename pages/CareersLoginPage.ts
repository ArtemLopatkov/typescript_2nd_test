import { Page, Locator, expect } from '@playwright/test';

export class CareersLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly logoutButton: Locator;
  readonly myJobsButton: Locator;
  readonly userNameLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByRole('textbox', { name: 'Enter an Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Please enter a Password' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    this.logoutButton = page.getByRole('button', { name: ' Logout' });
    this.myJobsButton = page.getByRole('button', { name: ' My Jobs' });
    this.userNameLabel = page.locator('#shuffle');
  }

  async goto() {
    await this.page.goto('https://skryabin-careers.herokuapp.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectLoggedIn(userName: string) {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.myJobsButton).toBeVisible();
    await expect(this.userNameLabel).toContainText(userName);
  }
}
