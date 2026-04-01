// tests/e2e/pages/GaragePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
  readonly addVehicleBtn: Locator;
  readonly vinInput: Locator;
  readonly decodeBtn: Locator;
  readonly saveBtn: Locator;
  readonly decodedInfo: Locator;

  constructor(page: Page) {
    super(page);
    this.addVehicleBtn = page.locator('#add-vehicle-modal-button');
    this.vinInput = page.locator('#vin-input');
    this.decodeBtn = page.locator('#decode-vin-button');
    this.saveBtn = page.locator('#save-vehicle-button');
    this.decodedInfo = page.locator('#decoded-vehicle-info');
  }

  async addVehicle(vin: string) {
    await this.addVehicleBtn.click();
    await expect(this.vinInput).toBeVisible();
    await this.vinInput.fill(vin);
    await this.decodeBtn.click();
    await expect(this.decodedInfo).toBeVisible();
    await this.saveBtn.click();
    await expect(this.addVehicleBtn).toBeVisible(); // Modal should close
  }

  async verifyVehicleInGarage(make: string, model: string) {
    await expect(this.page.locator(`text=${make}`)).toBeVisible();
    await expect(this.page.locator(`text=${model}`)).toBeVisible();
  }
}
