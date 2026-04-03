import { expect } from '@playwright/test';
export class LoginPage {
    page;
    email;
    password;
    loginButton;
    constructor(page) {
        this.page = page;
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('button.login-button');
    }
    async goto() {
        await this.page.goto('https://nop-qa.portnov.com/login');
    }
    async login(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async expectLoaded() {
        await expect(this.page.locator('.ico-logout')).toBeVisible();
    }
}
//# sourceMappingURL=LoginPage.js.map