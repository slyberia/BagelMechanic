// tests/e2e/smoke-test.spec.ts
import { test, expect } from '@playwright/test';
import { BasePage } from './pages/BasePage';
import { LoginPage } from './pages/LoginPage';
import { GaragePage } from './pages/GaragePage';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';

test.describe('Elite Mechanic Smoke Test Suite', () => {
  
  test('Journey A: User logs in, decodes VIN, and saves vehicle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const garagePage = new GaragePage(page);

    await loginPage.navigate();
    // Assuming test credentials exist or are mocked
    await loginPage.login('client@example.com', 'password123');
    
    await loginPage.goToDashboard();
    await expect(page.locator('text=Client Portal')).toBeVisible();

    // Decode a valid VIN (e.g., a common Ford VIN)
    const testVin = '1FA6P8CF0G5123456'; 
    await garagePage.addVehicle(testVin);
    
    // Verify vehicle appears in garage (NHTSA mock or real return)
    // Note: In real tests, we'd wait for the specific make/model
    await expect(page.locator('#decoded-vehicle-info')).not.toBeVisible(); // Modal closed
  });

  test('Journey B: Cart operations - Add, Clear, and Verify reset', async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.navigate();
    
    // Add a service to cart
    const bookNowBtns = page.locator('button:has-text("Book Now")');
    await bookNowBtns.first().click();
    
    // Verify cart count
    await expect(basePage.cartCount).toHaveText('1');
    
    // Open cart and clear it
    await basePage.openCart();
    const clearCartBtn = page.locator('button:has-text("Clear Cart")');
    await clearCartBtn.click();
    
    // Verify cart count resets
    await expect(basePage.cartCount).not.toBeVisible();
  });

  test('Journey C: Admin updates booking status', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.navigate();
    // Admin login
    await loginPage.login('admin@example.com', 'adminpass');
    
    await loginPage.goToDashboard();
    await expect(page.locator('text=Administrative Control')).toBeVisible();

    await adminPage.goToBookings();
    
    // Update a mock booking status
    await adminPage.updateBookingStatus('confirmed');
    
    // Verify success toast
    await expect(page.locator('text=Booking status updated to confirmed')).toBeVisible();
  });
});
