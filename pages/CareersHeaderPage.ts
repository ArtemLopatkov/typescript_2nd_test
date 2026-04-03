import { Locator, Page } from '@playwright/test';

export default class CareersHeaderPage {
    private logoutButton: Locator;
    private myJobsButton: Locator;
    private candidateName: Locator;

    constructor(private page: Page) {
        this.logoutButton = page.getByRole('button', { name: ' Logout' });
        this.myJobsButton = page.getByRole('button', { name: ' My Jobs' });
        this.candidateName = page.locator('.logout-box > a');  
   }

   // methods
   async getCandidateName(): Promise<string | null> {
    return await this.candidateName.textContent();
    }

    async isLogoutVisible(): Promise<boolean> {
        return await this.logoutButton.isVisible();
    }

    async isMyJobsVisible(): Promise<boolean> {
        return await this.myJobsButton.isVisible();
    }
}