export default class RegisterPage {
    page;
    getPasswordValue() {
        throw new Error('Method not implemented.');
    }
    maleGenderRadio;
    femaleGenderRadio;
    firstNameField;
    lastNameField;
    dateOfBirthDaySelect;
    dateOfBirthMonthSelect;
    dateOfBirthYearSelect;
    emailField;
    companyField;
    newsletterCheckbox;
    passwordField;
    confirmPasswordField;
    registerButton;
    formContainer;
    constructor(page) {
        this.page = page;
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
        // ✔ Уникальный локатор формы регистрации
        this.formContainer = page.locator('form[action="/register"]');
    }
    async goto(url) {
        await this.page.goto(url);
    }
    async isFormVisible() {
        await this.formContainer.waitFor({ state: 'visible' });
        return true;
    }
    async selectGender(gender) {
        if (gender === "male") {
            await this.maleGenderRadio.check();
        }
        else {
            await this.femaleGenderRadio.check();
        }
    }
    async fillFirstName(firstName) {
        await this.firstNameField.fill(firstName);
    }
    async fillLastName(lastName) {
        await this.lastNameField.fill(lastName);
    }
    async fillEmail(email) {
        await this.emailField.fill(email);
    }
    async fillCompany(company) {
        await this.companyField.fill(company);
    }
    async setNewsletter(shouldSubscribe) {
        const isChecked = await this.newsletterCheckbox.isChecked();
        if (shouldSubscribe !== isChecked) {
            await this.newsletterCheckbox.click();
        }
    }
    async fillPassword(password) {
        await this.passwordField.fill(password);
    }
    async fillConfirmPassword(password) {
        await this.confirmPasswordField.fill(password);
    }
    async fillDateOfBirth(date) {
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
    async fillRequiredFields(firstName, lastName, email, password) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(password);
    }
    async fillCompleteForm(gender, firstName, lastName, email, password, dateOfBirth, company, newsletter) {
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
//# sourceMappingURL=RegisterPage.js.map