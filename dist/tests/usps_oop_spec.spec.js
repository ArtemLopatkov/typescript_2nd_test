import { test, expect } from '@playwright/test';
import USPSLookupZip from '../pages/USPSLookupZip';
test('USPS zip plus oop', async ({ page }) => {
    const lookupZip = new USPSLookupZip(page);
    await lookupZip.goto();
    await lookupZip.fillRequiredFields('4970 El Camino Real', 'Los Altos', 'CA');
    await lookupZip.clickFind();
    await lookupZip.waitForResults();
    const zip = await lookupZip.getZipcode();
    expect(zip).toContain('94022');
});
//# sourceMappingURL=usps_oop_spec.spec.js.map