import { test } from '@playwright/test';
import Quote from '../pages/Quote';
test('Should submit the quote form successfully', async ({ page }) => {
    const quotePage = new Quote(page);
    await quotePage.goto();
    await quotePage.fillNameField('User Test123');
    await quotePage.fillUserNameField('testuser123');
    await quotePage.fillEmailField('testuser123@example.com');
    await quotePage.fillPasswordField('12345abc');
    await quotePage.fillConfirmPasswordField('12345abc');
    await quotePage.checkAcceptPolicy();
    await quotePage.clickSubmit();
});
//# sourceMappingURL=submit.spec.js.map