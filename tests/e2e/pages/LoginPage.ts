// tests/e2e/pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitBtn: Locator;
  readonly loginTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginSubmitBtn = page.locator('#login-submit');
    this.loginTitle = page.locator('#login-title');
  }

  async login(email: string, pass: string) {
    await this.clientLoginBtn.click();
    await expect(this.loginTitle).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginSubmitBtn.click();
    await expect(this.loginTitle).not.toBeVisible();
  }
}
