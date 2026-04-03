import { Locator, Page, expect } from "@playwright/test";

export default class Quote {
    private nameField: Locator;
    private userNameField: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private acceptPolicyCheckbox: Locator;
    private submitButton: Locator;

    constructor(private page: Page) {
        this.nameField = page.locator('#name');
        this.userNameField = page.locator('input[name="username"]');
        this.emailField = page.locator('input[name="email"]');
        this.passwordField = page.locator('input[name="password"]');
        this.confirmPasswordField = page.locator('input[name="confirmPassword"]');
        this.acceptPolicyCheckbox = page.locator('input[name="agreedToPrivacyPolicy"]');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('https://skryabin.com/market/quote.html');
    }

    async fillNameField(name: string) {
        await this.nameField.fill(name);
    }

    async fillUserNameField(userName: string) {
        await this.userNameField.fill(userName);
    }

    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);

        // Angular требует blur() для активации confirmPassword
        await this.page.click('body');
    }

    async fillConfirmPasswordField(confirmPassword: string) {
        // Ждём, пока Angular включит поле
        await expect(this.confirmPasswordField).toBeEnabled();

        await this.confirmPasswordField.fill(confirmPassword);
    }

    async checkAcceptPolicy() {
        await this.acceptPolicyCheckbox.check();
    }

    async clickSubmit() {
        await this.submitButton.click();
    }
}
