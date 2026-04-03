import { Locator, Page } from "@playwright/test";

export interface MenuLink {
    name: string;
    href: string;
}

export interface MenuItem {
    name: string;
    href: string;
    sublinks?: MenuLink[];
}

export default class TopMenu {
    private menuContainer: Locator;
    private page: Page;
    private menuItems: MenuItem[] = [
        {
            name: "Computers",
            href: "/computers",
            sublinks: [
                { name: "Desktops", href: "/desktops" },
                { name: "Notebooks", href: "/notebooks" },
                { name: "Software", href: "/software" }
            ]
        },
        {
            name: "Electronics",
            href: "/electronics",
            sublinks: [
                { name: "Camera & photo", href: "/camera-photo" },
                { name: "Cell phones", href: "/cell-phones" },
                { name: "Others", href: "/others" }
            ]
        },
        {
            name: "Apparel",
            href: "/apparel",
            sublinks: [
                { name: "Shoes", href: "/shoes" },
                { name: "Clothing", href: "/clothing" },
                { name: "Accessories", href: "/accessories" }
            ]
        },
        {
            name: "Digital downloads",
            href: "/digital-downloads"
        },
        {
            name: "Books",
            href: "/books"
        },
        {
            name: "Jewelry",
            href: "/jewelry"
        },
        {
            name: "Gift Cards",
            href: "/gift-cards"
        }
    ];

    constructor(page: Page) {
        this.page = page;
        this.menuContainer = page.locator(".header-menu");
    }

    // Get a menu item by name
    private getMenuItemLocator(itemName: string): Locator {
        return this.page.locator(`.top-menu > li > a:has-text("${itemName}")`).first();
    }

    // Get a submenu link by parent menu name and link name
    private getSubLinkLocator(parentName: string, linkName: string): Locator {
        return this.page
            .locator(`.top-menu > li:has(> a:has-text("${parentName}")) .sublist a:has-text("${linkName}")`)
            .first();
    }

    // Click on a top-level menu item
    async clickMenuItem(itemName: string): Promise<void> {
        const menuItem = this.getMenuItemLocator(itemName);
        await menuItem.click();
    }

    // Hover over a menu item to reveal submenus
    async hoverMenuItemSublist(itemName: string): Promise<void> {
        const menuItem = this.getMenuItemLocator(itemName);
        await menuItem.hover();
    }

    // Click on a submenu link
    async clickSubLink(parentName: string, linkName: string): Promise<void> {
        const subLink = this.getSubLinkLocator(parentName, linkName);
        await subLink.click();
    }

    // Navigate to a menu item URL
    async navigateTo(itemName: string): Promise<void> {
        const item = this.menuItems.find(m => m.name === itemName);
        if (item) {
            await this.page.goto(item.href);
        }
    }

    // Get all menu items
    getMenuItems(): MenuItem[] {
        return this.menuItems;
    }

    // Check if a menu item is visible
    async isMenuItemVisible(itemName: string): Promise<boolean> {
        const menuItem = this.getMenuItemLocator(itemName);
        return await menuItem.isVisible();
    }

    // Check if submenu is visible
    async isSubMenuVisible(parentName: string, linkName: string): Promise<boolean> {
        const subLink = this.getSubLinkLocator(parentName, linkName);
        return await subLink.isVisible();
    }

    // Get menu text/label
    async getMenuItemText(itemName: string): Promise<string | null> {
        const menuItem = this.getMenuItemLocator(itemName);
        return await menuItem.textContent();
    }

    // Get the menu container
    getMenuContainer(): Locator {
        return this.menuContainer;
    }

    // Check if menu container is visible
    async isMenuVisible(): Promise<boolean> {
        return await this.menuContainer.isVisible();
    }
}
