console.log('Loading hooks.ts...');
import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(10_000);
Before(async function () {
    await this.init();
});
After(async function ({ result }) {
    // if (result?.status === Status.FAILED) {
    const png = await this.page.screenshot();
    this.attach(png, 'image/png');
    // }
    const video = this.page.video();
    if (video) {
        const videoPath = await video.path();
        this.attach(`Video recording: ${videoPath}`);
    }
    // tear down
    await this.cleanup();
});
//# sourceMappingURL=hooks.js.map