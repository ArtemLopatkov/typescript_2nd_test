import { Locator, Page, expect } from '@playwright/test';

export class FooterPage {
  readonly page: Page;
  readonly infoLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.infoLinks = page.locator('.footer-block:nth-of-type(1) ul.list li a');
  }

  async validateHoverEffect() {
    const count = await this.infoLinks.count();

    for (let i = 0; i < count; i++) {
      const link = this.infoLinks.nth(i);

      await expect(link).toHaveCSS('color', 'rgb(119, 119, 119)');
      await link.hover();
      await expect(link).toHaveCSS('color', 'rgb(74, 178, 241)');
    }
  }

  
  async saveHoverScreenshots() {
    const count = await this.infoLinks.count();

    for (let i = 0; i < count; i++) {
      const link = this.infoLinks.nth(i);

      await link.screenshot({ path: `footer-link-${i}-before.png` });
      await link.hover();
      await link.screenshot({ path: `footer-link-${i}-after.png` });
    }
  }
}
