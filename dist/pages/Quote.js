import { expect } from "@playwright/test";
export default class Quote {
    page;
    nameField;
    userNameField;
    emailField;
    passwordField;
    confirmPasswordField;
    acceptPolicyCheckbox;
    submitButton;
    constructor(page) {
        this.page = page;
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
    async fillNameField(name) {
        await this.nameField.fill(name);
    }
    async fillUserNameField(userName) {
        await this.userNameField.fill(userName);
    }
    async fillEmailField(email) {
        await this.emailField.fill(email);
    }
    async fillPasswordField(password) {
        await this.passwordField.fill(password);
        // Angular требует blur() для активации confirmPassword
        await this.page.click('body');
    }
    async fillConfirmPasswordField(confirmPassword) {
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
//# sourceMappingURL=Quote.js.map