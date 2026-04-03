export default class USPSLookupZip {
    page;
    streetField;
    cityField;
    stateSelect;
    findButton;
    constructor(page) {
        this.page = page;
        this.streetField = page.locator('#tAddress');
        this.cityField = page.locator('#tCity');
        this.stateSelect = page.locator('#tState');
        this.findButton = page.getByRole('button', { name: /find/i });
    }
    async goto() {
        await this.page.goto('https://tools.usps.com/zip-code-lookup.htm?byaddress', { waitUntil: 'domcontentloaded' });
    }
    async fillRequiredFields(street, city, state) {
        await this.streetField.waitFor({ state: 'visible', timeout: 10000 });
        await this.streetField.fill(street);
        await this.cityField.fill(city);
        await this.stateSelect.selectOption(state);
    }
    async clickFind() {
        await this.findButton.click();
        await this.page.waitForTimeout(1500); // USPS needs time
    }
    async waitForResults(timeout = 15000) {
        const selectors = [
            '.zipcode-result strong',
            '.zipcode-result p strong',
            '.zipcode-result-address strong',
            '.result-text strong',
            '[class*="zipcode"] strong',
        ];
        for (const selector of selectors) {
            const loc = this.page.locator(selector).first();
            try {
                await loc.waitFor({ state: 'visible', timeout: 2000 });
                return; // found!
            }
            catch {
                // try next selector
            }
        }
        throw new Error('ZIP code result not found in any known USPS selectors.');
    }
    async getZipcode() {
        const selectors = [
            '.zipcode-result strong',
            '.zipcode-result p strong',
            '.zipcode-result-address strong',
            '.result-text strong',
            '[class*="zipcode"] strong',
        ];
        for (const selector of selectors) {
            const loc = this.page.locator(selector).first();
            const text = await loc.textContent().catch(() => null);
            if (text && text.trim()) {
                return text.trim();
            }
        }
        throw new Error('ZIP code text not found.');
    }
}
//# sourceMappingURL=USPSLookupZip.js.map