import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('button.login-button');
    }

    async goto() {
        await this.page.goto('https://nop-qa.portnov.com/login');
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async expectLoaded() {
        await expect(this.page.locator('.ico-logout')).toBeVisible();
    }
}
