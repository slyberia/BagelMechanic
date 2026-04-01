// tests/e2e/pages/BookingPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingPage extends BasePage {
  readonly bookNowBtn: Locator;
  readonly confirmBookingBtn: Locator;
  readonly successMessage: Locator;
  readonly calendarInviteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.bookNowBtn = page.locator('button:has-text("Book Now")');
    this.confirmBookingBtn = page.locator('button:has-text("Confirm Booking")');
    this.successMessage = page.locator('text=Booking Confirmed');
    this.calendarInviteBtn = page.locator('button:has-text("Add to Calendar")');
  }

  async startBooking() {
    await this.bookNowBtn.first().click();
  }

  async completeBooking() {
    // Navigate through steps if needed
    // For now, assuming simple flow
    await this.confirmBookingBtn.click();
    await expect(this.successMessage).toBeVisible();
  }

  async verifyCalendarInvite() {
    await expect(this.calendarInviteBtn).toBeVisible();
  }
}
