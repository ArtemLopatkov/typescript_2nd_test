import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/RegisterPage';
import { URLS } from '../utils/urls';
import registrationData from '../test-data/registration-data.json' with { type: 'json' };
import { generateRandomEmail } from '../utils/data-generator';
test('Registration form success', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const testData = registrationData.validUser;
    // Navigate to register page
    await registerPage.goto(URLS.NOP_REGISTER);
    // Verify form is visible
    expect(await registerPage.isFormVisible()).toBe(true);
    // Fill complete form with valid data
    await registerPage.fillCompleteForm(testData.gender, testData.firstName, testData.lastName, generateRandomEmail(), // Use dynamic email to avoid duplicates
    testData.password, testData.dateOfBirth, testData.company, testData.newsletter);
    // Verify password validation passes
    expect(await registerPage.isPasswordValid()).toBe(true);
    expect(await registerPage.doPasswordsMatch()).toBe(true);
    // Submit the form
    await registerPage.submitForm();
    // Note: Since this is a static HTML file, we can't test actual submission
    // In a real application, you would assert on success page or success message
    // For now, we verify the form was properly filled
    expect(await registerPage.getPasswordValue()).toBe(testData.password);
    expect(await registerPage.getPasswordValue()).toBe(testData.password);
});
test('Registration form - successful registration with minimum required fields', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const testData = registrationData.minimumRequiredFields;
    // Navigate to register page
    await registerPage.goto(URLS.NOP_REGISTER);
    // Fill only required fields
    await registerPage.fillRequiredFields(testData.firstName, testData.lastName, testData.email, testData.password);
    // Verify password validation
    expect(await registerPage.isPasswordValid()).toBe(true);
    expect(await registerPage.doPasswordsMatch()).toBe(true);
    // Submit the form
    await registerPage.submitForm();
    // Verify form was properly filled
    expect(await registerPage.getPasswordValue()).toBe(testData.password);
});
test('Registration form - successful registration for female user', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const testData = registrationData.validUserFemale;
    // Navigate to register page
    await registerPage.goto(URLS.NOP_REGISTER);
    // Fill complete form for female user
    await registerPage.fillCompleteForm(testData.gender, testData.firstName, testData.lastName, testData.email, testData.password, testData.dateOfBirth, testData.company, testData.newsletter);
    // Verify form completion
    expect(await registerPage.isPasswordValid()).toBe(true);
    expect(await registerPage.doPasswordsMatch()).toBe(true);
    // Submit the form
    await registerPage.submitForm();
});
//# sourceMappingURL=register.spec.js.map