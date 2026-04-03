import { test } from '@playwright/test';
import { FooterPage } from '../pages/FooterPage';

test('Footer items hover effect', async ({ page }) => {
  await page.goto('https://nop-qa.portnov.com', { waitUntil: 'networkidle' });

  const footer = new FooterPage(page);

  await footer.validateHoverEffect();
});
