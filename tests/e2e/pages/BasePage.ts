// tests/e2e/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  readonly navbarLogo: Locator;
  readonly cartToggle: Locator;
  readonly cartCount: Locator;
  readonly clientLoginBtn: Locator;
  readonly dashboardBtn: Locator;
  readonly signOutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbarLogo = page.locator('text=Elite Engineer');
    this.cartToggle = page.locator('#nav-cart-toggle');
    this.cartCount = page.locator('#cart-count');
    this.clientLoginBtn = page.locator('#nav-client-login');
    this.dashboardBtn = page.locator('#nav-dashboard');
    this.signOutBtn = page.locator('#nav-sign-out');
  }

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  async openCart() {
    await this.cartToggle.click();
  }

  async goToDashboard() {
    await this.dashboardBtn.click();
  }

  async signOut() {
    await this.signOutBtn.click();
  }
}
