import { test, expect } from '@playwright/test';
const url = 'https://nop-qa.portnov.com/login';
// Функция использует глобальную переменную url
async function login(page, email, password) {
    await page.goto(url);
    await page.locator('#Email').fill(email);
    await page.locator('#Password').fill(password);
    await page.locator('button.login-button').click();
}
test('Login test', async ({ page }) => {
    await page.goto(url);
    await page.locator('#Email').fill('ts_test_user@example.com');
    await page.locator('#Password').fill('12345Abc');
    await page.locator('button.login-button').click();
    await expect(page.locator('.ico-logout')).toBeVisible();
});
test('Test login 2', async ({ page }) => {
    await login(page, 'ts_test_user@example.com', '12345Abc');
    await expect(page.locator('.ico-logout')).toBeVisible();
});
//# sourceMappingURL=e1.login.spec.js.map