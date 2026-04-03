import { Locator, Page } from "@playwright/test";

export default class RegisterPage {
    getPasswordValue(): any {
        throw new Error('Method not implemented.');
    }
    private maleGenderRadio: Locator;
    private femaleGenderRadio: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private dateOfBirthDaySelect: Locator;
    private dateOfBirthMonthSelect: Locator;
    private dateOfBirthYearSelect: Locator;
    private emailField: Locator;
    private companyField: Locator;
    private newsletterCheckbox: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private registerButton: Locator;
    private formContainer: Locator;

constructor(private page: Page) {
    this.maleGenderRadio = page.locator('#gender-male');
    this.femaleGenderRadio = page.locator('#gender-female');
    this.firstNameField = page.locator('#FirstName');
    this.lastNameField = page.locator('#LastName');
    this.dateOfBirthDaySelect = page.locator('select[name="DateOfBirthDay"]');
    this.dateOfBirthMonthSelect = page.locator('select[name="DateOfBirthMonth"]');
    this.dateOfBirthYearSelect = page.locator('select[name="DateOfBirthYear"]');
    this.emailField = page.locator('#Email');
    this.companyField = page.locator('#Company');
    this.newsletterCheckbox = page.locator('#Newsletter');
    this.passwordField = page.locator('#Password');
    this.confirmPasswordField = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');

    this.formContainer = page.locator('form[action="/register"]');
}


    async goto(url: string) {
        await this.page.goto(url);
    }

    async isFormVisible() {
    await this.formContainer.waitFor({ state: 'visible' });
    return true;
}


    async selectGender(gender: "male" | "female") {
        if (gender === "male") {
            await this.maleGenderRadio.check();
        } else {
            await this.femaleGenderRadio.check();
        }
    }

    async fillFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillCompany(company: string) {
        await this.companyField.fill(company);
    }

    async setNewsletter(shouldSubscribe: boolean) {
        const isChecked = await this.newsletterCheckbox.isChecked();
        if (shouldSubscribe !== isChecked) {
            await this.newsletterCheckbox.click();
        }
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async fillConfirmPassword(password: string) {
        await this.confirmPasswordField.fill(password);
    }

    async fillDateOfBirth(date: { day: string; month: string; year: string }) {
        await this.dateOfBirthDaySelect.selectOption(date.day);
        await this.dateOfBirthMonthSelect.selectOption(date.month);
        await this.dateOfBirthYearSelect.selectOption(date.year);
    }

    async submitForm() {
        await this.registerButton.click();
    }

    async isPasswordValid() {
        const value = await this.passwordField.inputValue();
        return value.length >= 6;
    }

    async doPasswordsMatch() {
        const pass = await this.passwordField.inputValue();
        const confirm = await this.confirmPasswordField.inputValue();
        return pass === confirm;
    }

    async fillRequiredFields(
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
    }

    async fillCompleteForm(
        gender: "male" | "female",
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        dateOfBirth: { day: string; month: string; year: string },
        company?: string,
        newsletter?: boolean
    ) {
        await this.selectGender(gender);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillDateOfBirth(dateOfBirth);

        if (company) {
            await this.fillCompany(company);
        }

        if (newsletter !== undefined) {
            await this.setNewsletter(newsletter);
        }

        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
    }
}
