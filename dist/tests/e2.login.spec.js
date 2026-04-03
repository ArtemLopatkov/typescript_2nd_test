import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test('Successfull login test', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('ts_test_user@example.com', '12345Abc');
    await loginPage.expectLoaded();
});
//# sourceMappingURL=e2.login.spec.js.map