import { Locator, Page } from "@playwright/test";

export type SortOption = "Position" | "Name: A to Z" | "Name: Z to A" | "Price: Low to High" | "Price: High to Low" | "Created on";

export interface SortOptionData {
    label: string;
    value: string;
}

export default class SortSelector {
    private sortSelectLocator: Locator;
    private page: Page;
    private sortOptions: Map<SortOption, string> = new Map([
        ["Position", "0"],
        ["Name: A to Z", "5"],
        ["Name: Z to A", "6"],
        ["Price: Low to High", "10"],
        ["Price: High to Low", "11"],
        ["Created on", "15"]
    ]);

    constructor(page: Page) {
        this.page = page;
        this.sortSelectLocator = page.locator('#products-orderby');
    }

    // Get the sort selector element
    getSortSelector(): Locator {
        return this.sortSelectLocator;
    }

    // Select a sort option by label
    async selectSortOption(sortOption: SortOption): Promise<void> {
        const value = this.sortOptions.get(sortOption);
        if (!value) {
            throw new Error(`Sort option "${sortOption}" not found`);
        }
        await this.sortSelectLocator.selectOption(value);
    }

    // Get the currently selected sort option
    async getSelectedOption(): Promise<string> {
        return await this.sortSelectLocator.inputValue();
    }

    // Get all available sort options
    async getAllOptions(): Promise<SortOptionData[]> {
        const options = await this.sortSelectLocator.locator('option').all();
        const sortOptions: SortOptionData[] = [];
        for (const option of options) {
            const text = await option.textContent();
            const value = await option.getAttribute('value');
            if (text && value) {
                sortOptions.push({
                    label: text.trim(),
                    value: value
                });
            }
        }
        return sortOptions;
    }

    // Check if sort selector is visible
    async isSortSelectorVisible(): Promise<boolean> {
        return await this.sortSelectLocator.isVisible();
    }

    // Wait for sort selector to be ready
    async waitForSortSelector(): Promise<void> {
        await this.sortSelectLocator.waitFor({ state: 'visible' });
    }

    // Get all valid sort options
    getSortOptions(): SortOption[] {
        return Array.from(this.sortOptions.keys());
    }
}
