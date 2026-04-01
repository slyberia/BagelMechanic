// tests/e2e/pages/AdminPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  readonly bookingsTab: Locator;
  readonly servicesTab: Locator;
  readonly addServiceBtn: Locator;
  readonly bookingRow: Locator;
  readonly statusDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.bookingsTab = page.locator('#admin-tab-bookings');
    this.servicesTab = page.locator('#admin-tab-services');
    this.addServiceBtn = page.locator('#add-service-button');
    this.bookingRow = page.locator('tbody tr').first();
    this.statusDropdown = page.locator('.group\\/status').first();
  }

  async goToBookings() {
    await this.bookingsTab.click();
    await expect(this.page.locator('text=Booking Operations')).toBeVisible();
  }

  async updateBookingStatus(status: string) {
    await this.statusDropdown.hover();
    const statusBtn = this.page.locator(`button:has-text("${status}")`).first();
    await statusBtn.click();
    await expect(this.page.locator(`text=Booking status updated to ${status}`)).toBeVisible();
  }

  async verifyBookingInList(email: string) {
    await expect(this.page.locator(`text=${email}`)).toBeVisible();
  }
}
