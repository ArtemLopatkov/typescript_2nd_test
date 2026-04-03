import { Locator, Page } from "@playwright/test";
import TopMenu from "../components/top_menu";
import SortSelector from "../components/sort_selector";

export interface Product {
    id: string;
    title: string;
    price: string;
    description: string;
}

export default class DigitalDownloadsPage {
    // Components
    public topMenu: TopMenu;
    public sortSelector: SortSelector;

    // Locators
    private pageHeading: Locator;
    private productGrid: Locator;
    private productItems: Locator;
    private addToCartButtons: Locator;
    private addToWishlistButtons: Locator;
    private addToCompareButtons: Locator;
    private viewmodeSelectorGrid: Locator;
    private viewmodeSelectorList: Locator;
    private pageSizeSelector: Locator;

    constructor(private page: Page) {
        this.topMenu = new TopMenu(page);
        this.sortSelector = new SortSelector(page);
        this.pageHeading = page.locator(".page-title h1");
        this.productGrid = page.locator(".product-grid");
        this.productItems = page.locator(".product-item");
        this.addToCartButtons = page.locator(".product-box-add-to-cart-button");
        this.addToWishlistButtons = page.locator(".add-to-wishlist-button");
        this.addToCompareButtons = page.locator(".add-to-compare-list-button");
        this.viewmodeSelectorGrid = page.locator(".viewmode-icon.grid");
        this.viewmodeSelectorList = page.locator(".viewmode-icon.list");
        this.pageSizeSelector = page.locator("#products-pagesize");
    }

    // Navigation
    async goto(url: string = "/digital-downloads"): Promise<void> {
        await this.page.goto(url);
    }

    // Page verification
    async getPageHeading(): Promise<string | null> {
        return await this.pageHeading.textContent();
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.pageHeading.isVisible();
    }

    // View mode operations
    async switchToGridView(): Promise<void> {
        await this.viewmodeSelectorGrid.click();
    }

    async switchToListView(): Promise<void> {
        await this.viewmodeSelectorList.click();
    }

    // Sort operations
    async sortByNameAtoZ(): Promise<void> {
        await this.sortSelector.selectSortOption("Name: A to Z");
    }

    async sortByNameZtoA(): Promise<void> {
        await this.sortSelector.selectSortOption("Name: Z to A");
    }

    async sortByPriceLowToHigh(): Promise<void> {
        await this.sortSelector.selectSortOption("Price: Low to High");
    }

    async sortByPriceHighToLow(): Promise<void> {
        await this.sortSelector.selectSortOption("Price: High to Low");
    }

    async sortByPosition(): Promise<void> {
        await this.sortSelector.selectSortOption("Position");
    }

    async sortByCreatedOn(): Promise<void> {
        await this.sortSelector.selectSortOption("Created on");
    }

    // Page size operations
    async setPageSize(size: 3 | 6 | 9): Promise<void> {
        await this.pageSizeSelector.selectOption(size.toString());
    }

    // Product operations
    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async getProductTitles(): Promise<string[]> {
        const count = await this.getProductCount();
        const titles: string[] = [];
        for (let i = 0; i < count; i++) {
            const title = await this.productItems
                .nth(i)
                .locator(".product-title a")
                .textContent();
            if (title) {
                titles.push(title.trim());
            }
        }
        return titles;
    }

    async getProductPrices(): Promise<string[]> {
        const count = await this.getProductCount();
        const prices: string[] = [];
        for (let i = 0; i < count; i++) {
            const price = await this.productItems
                .nth(i)
                .locator(".actual-price")
                .textContent();
            if (price) {
                prices.push(price.trim());
            }
        }
        return prices;
    }

    async getProducts(): Promise<Product[]> {
        const products: Product[] = [];
        const count = await this.getProductCount();
        for (let i = 0; i < count; i++) {
            const item = this.productItems.nth(i);
            const id = await item.getAttribute("data-productid");
            const title = await item.locator(".product-title a").textContent();
            const price = await item.locator(".actual-price").textContent();
            const description = await item.locator(".description").textContent();

            if (id && title) {
                products.push({
                    id: id,
                    title: title.trim(),
                    price: price?.trim() || "N/A",
                    description: description?.trim() || ""
                });
            }
        }
        return products;
    }

    // Product interaction
    async addProductToCart(productIndex: number): Promise<void> {
        await this.addToCartButtons.nth(productIndex).click();
    }

    async addProductToWishlist(productIndex: number): Promise<void> {
        await this.addToWishlistButtons.nth(productIndex).click();
    }

    async addProductToCompare(productIndex: number): Promise<void> {
        await this.addToCompareButtons.nth(productIndex).click();
    }

    // Get a specific product locator
    getProductByIndex(index: number): Locator {
        return this.productItems.nth(index);
    }

    // Wait for products to load
    async waitForProductsToLoad(): Promise<void> {
        await this.productGrid.waitFor({ state: 'visible' });
        await this.productItems.first().waitFor({ state: 'visible' });
    }

    // Get product container
    getProductsContainer(): Locator {
        return this.productGrid;
    }
}
