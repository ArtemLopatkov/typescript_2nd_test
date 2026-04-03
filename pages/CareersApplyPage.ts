import {Locator, Page} from '@playwright/test'

export default class CareersApplyPage {
    // fields of the class
    private firstNameField: Locator;
    private middleNameField: Locator;
    private lastNameField: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private confirmPasswordField: Locator;
    private summaryTextArea: Locator;
    private streetField: Locator;
    private cityField: Locator;
    private stateDropdown: Locator;
    private zipField: Locator;
    private submitButton: Locator;

    // constuctor
    constructor(private page: Page) {
        this.firstNameField = page.getByRole('textbox', { name: 'Enter First Name' });
        this.middleNameField = page.getByRole('textbox', { name: 'Optional' });
        this.lastNameField = page.getByRole('textbox', { name: 'Enter Last Name' });
        this.emailField = page.getByRole('textbox', { name: 'Enter Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Enter Password' });
        this.confirmPasswordField = page.getByRole('textbox', { name: 'Confirm Password' });
        this.summaryTextArea = page.getByRole('textbox', { name: 'Enter detailed Summary' });
        this.streetField = page.getByRole('textbox', { name: 'Main st' });
        this.cityField = page.getByRole('textbox', { name: 'City' });
        this.stateDropdown = page.getByRole('combobox');
        this.zipField = page.getByRole('textbox', { name: 'Zip code. Zip plus' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    // methods

    async goto() {
        await this.page.goto('https://skryabin-careers.herokuapp.com/new_candidate');
    }

    async fillRequiredFields(firstName: string, lastName: string, email: string, password: string, summary: string, city: string, state: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.summaryTextArea.fill(summary);
        await this.cityField.fill(city);
        await this.stateDropdown.selectOption(state);
    }

    async fillMiddleName(middleName: string) {
        await this.middleNameField.fill(middleName);
    }

    async fillStreet(street: string) {
        await this.streetField.fill(street);
    }

    async fillZip(zip: string) {
        await this.zipField.fill(zip);
    }

    async fillAllFields(firstName: string, lastName: string, email: string, password: string, summary: string, city: string, state: string, middleName: string, street: string, zip: string) {
        await this.fillRequiredFields(firstName, lastName, email, password, summary, city, state);
        await this.fillMiddleName(middleName);
        await this.fillStreet(street);
        await this.fillZip(zip);
    }

    async submitForm() {
        await this.submitButton.click();
        // expect(this.submitButton).toBeHidden();
        await this.submitButton.waitFor({ state: 'hidden' });
        
    }
}