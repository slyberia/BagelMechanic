# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-test.spec.ts >> Elite Mechanic Smoke Test Suite >> Journey A: User logs in, decodes VIN, and saves vehicle
- Location: tests/e2e/smoke-test.spec.ts:11:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Client Portal')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Client Portal')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - link "Skip to content" [ref=e4] [cursor=pointer]:
      - /url: "#main-content"
    - link "Skip to content" [ref=e5] [cursor=pointer]:
      - /url: "#main-content"
    - navigation "Main Navigation" [ref=e6]:
      - generic [ref=e7]:
        - link "Elite Engineer Home" [ref=e8] [cursor=pointer]:
          - /url: /
          - text: Elite Engineer
        - generic [ref=e9]:
          - generic [ref=e10]:
            - button "Services" [ref=e11]
            - button "Process" [ref=e12]
            - button "About" [ref=e13]
            - button "Testimonials" [ref=e14]
            - button "Location" [ref=e15]
          - generic [ref=e16]:
            - button "Switch to light mode" [ref=e17]:
              - img [ref=e18]
            - button "Open shopping cart, 0 items" [ref=e24]:
              - img [ref=e25]
            - generic [ref=e28]:
              - button "View your dashboard" [active] [ref=e29]:
                - img [ref=e30]
                - generic [ref=e33]: Dashboard
              - button "Sign out" [ref=e34]:
                - img [ref=e35]
                - generic [ref=e38]: Sign Out
            - button "Book a consultation" [ref=e39]: Book Now
    - main [ref=e40]:
      - region "The Art of Automotive Excellence" [ref=e41]:
        - generic [ref=e45]:
          - generic [ref=e46]: Precision Engineering • Bespoke Consultation
          - heading "The Art of Automotive Excellence" [level=1] [ref=e47]:
            - text: The Art of
            - text: Automotive Excellence
          - paragraph [ref=e48]: Expert engineering consultation for high-performance vehicles and heritage collections. Where mechanical mastery meets discerning stewardship.
          - generic [ref=e49]:
            - button "Book an elite consultation" [ref=e50]: Book Now
            - button "View our consultation services" [ref=e51]: View Services
        - generic [ref=e53]: Scroll
      - region "The Process" [ref=e55]:
        - generic [ref=e56]:
          - heading "The Process" [level=2] [ref=e58]
          - generic [ref=e60]:
            - generic [ref=e61]:
              - img [ref=e63]
              - heading "Select Expertise" [level=3] [ref=e66]
              - paragraph [ref=e67]: Choose the consultation tier that aligns with your mechanical requirements.
            - generic [ref=e68]:
              - img [ref=e70]
              - heading "Schedule Session" [level=3] [ref=e72]
              - paragraph [ref=e73]: Select a precise time slot from our secure global availability calendar.
            - generic [ref=e74]:
              - img [ref=e76]
              - heading "Virtual Walkthrough" [level=3] [ref=e79]
              - paragraph [ref=e80]: Connect via high-definition video for a deep-dive technical analysis.
            - generic [ref=e81]:
              - img [ref=e83]
              - heading "Technical Report" [level=3] [ref=e86]
              - paragraph [ref=e87]: Receive a comprehensive engineering dossier with actionable insights.
      - region "Service Tiers" [ref=e88]:
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]:
              - heading "Service Tiers" [level=2] [ref=e92]
              - paragraph [ref=e93]: Select a consultation level tailored to your vehicle's specific engineering needs. Each session is conducted by a senior automotive engineer.
            - generic [ref=e94]: Bespoke Options Available
          - generic [ref=e95]:
            - article [ref=e96]:
              - generic [ref=e97]:
                - heading "Pre-Purchase Inspection" [level=3] [ref=e98]
                - text: 60 min
              - generic [ref=e99]: $450.00
              - paragraph [ref=e100]: A comprehensive virtual walkthrough and technical analysis of a prospective vehicle purchase.
              - list "Features of Pre-Purchase Inspection" [ref=e101]:
                - listitem [ref=e102]:
                  - img [ref=e103]
                  - text: Live video consultation
                - listitem [ref=e105]:
                  - img [ref=e106]
                  - text: Historical record analysis
                - listitem [ref=e108]:
                  - img [ref=e109]
                  - text: Common failure point check
                - listitem [ref=e111]:
                  - img [ref=e112]
                  - text: Repair estimate overview
                - listitem [ref=e114]:
                  - img [ref=e115]
                  - text: Final recommendation report
              - button "Select Pre-Purchase Inspection for $450.00" [ref=e117]: Book Now
            - article [ref=e118]:
              - generic [ref=e119]:
                - heading "Performance Engineering" [level=3] [ref=e120]
                - text: 120 min
              - generic [ref=e121]: $850.00
              - paragraph [ref=e122]: Specialized consultation for track preparation, suspension tuning, and powertrain optimization.
              - list "Features of Performance Engineering" [ref=e123]:
                - listitem [ref=e124]:
                  - img [ref=e125]
                  - text: Chassis dynamics review
                - listitem [ref=e127]:
                  - img [ref=e128]
                  - text: ECU data log analysis
                - listitem [ref=e130]:
                  - img [ref=e131]
                  - text: Component selection advice
                - listitem [ref=e133]:
                  - img [ref=e134]
                  - text: Custom maintenance schedule
                - listitem [ref=e136]:
                  - img [ref=e137]
                  - text: Direct engineer access
              - button "Select Performance Engineering for $850.00" [ref=e139]: Book Now
            - article [ref=e140]:
              - generic [ref=e141]:
                - heading "Restoration Strategy" [level=3] [ref=e142]
                - text: Ongoing
              - generic [ref=e143]: $2,500.00/ starting
              - paragraph [ref=e144]: Long-term advisory for concourse-level restorations and historical preservation projects.
              - list "Features of Restoration Strategy" [ref=e145]:
                - listitem [ref=e146]:
                  - img [ref=e147]
                  - text: Originality certification prep
                - listitem [ref=e149]:
                  - img [ref=e150]
                  - text: Global parts sourcing
                - listitem [ref=e152]:
                  - img [ref=e153]
                  - text: Specialist vendor management
                - listitem [ref=e155]:
                  - img [ref=e156]
                  - text: Documentation archiving
                - listitem [ref=e158]:
                  - img [ref=e159]
                  - text: Quarterly progress reviews
              - button "Select Restoration Strategy for $2,500.00" [ref=e161]: Book Now
    - contentinfo "Site Footer" [ref=e162]:
      - generic [ref=e163]:
        - generic [ref=e164]:
          - generic [ref=e165]:
            - heading "Elite Engineer" [level=3] [ref=e166]
            - paragraph [ref=e167]: Providing technical stewardship for the world's most significant automotive collections. Engineering excellence, delivered virtually.
            - generic [ref=e168]:
              - link "Follow us on Instagram" [ref=e169] [cursor=pointer]:
                - /url: "#"
                - img [ref=e170]
              - link "Follow us on Twitter" [ref=e173] [cursor=pointer]:
                - /url: "#"
                - img [ref=e174]
              - link "Follow us on LinkedIn" [ref=e176] [cursor=pointer]:
                - /url: "#"
                - img [ref=e177]
              - link "Follow us on Email" [ref=e181] [cursor=pointer]:
                - /url: "#"
                - img [ref=e182]
          - generic [ref=e185]:
            - heading "Navigation" [level=4] [ref=e186]
            - list [ref=e187]:
              - listitem [ref=e188]:
                - button "Services" [ref=e189]
              - listitem [ref=e190]:
                - button "Process" [ref=e191]
              - listitem [ref=e192]:
                - button "About" [ref=e193]
              - listitem [ref=e194]:
                - button "Contact" [ref=e195]
          - generic [ref=e196]:
            - heading "Legal" [level=4] [ref=e197]
            - list [ref=e198]:
              - listitem [ref=e199]:
                - button "Privacy Policy" [ref=e200]
              - listitem [ref=e201]:
                - button "Terms of Service" [ref=e202]
              - listitem [ref=e203]:
                - button "Consultation Agreement" [ref=e204]
        - generic [ref=e205]:
          - paragraph [ref=e206]: © 2026 Elite Mechanic Consultations. All rights reserved.
          - paragraph [ref=e207]: Designed for the Discerning Enthusiast
```

# Test source

```ts
  1  | // tests/e2e/smoke-test.spec.ts
  2  | import { test, expect } from '@playwright/test';
  3  | import { BasePage } from './pages/BasePage';
  4  | import { LoginPage } from './pages/LoginPage';
  5  | import { GaragePage } from './pages/GaragePage';
  6  | import { BookingPage } from './pages/BookingPage';
  7  | import { AdminPage } from './pages/AdminPage';
  8  |
  9  | test.describe('Elite Mechanic Smoke Test Suite', () => {
  10 |
  11 |   test('Journey A: User logs in, decodes VIN, and saves vehicle', async ({ page }) => {
  12 |     const loginPage = new LoginPage(page);
  13 |     const garagePage = new GaragePage(page);
  14 |
  15 |     await loginPage.navigate();
  16 |     // Assuming test credentials exist or are mocked
  17 |     await loginPage.login('client@example.com', 'password123');
  18 |
  19 |     await loginPage.goToDashboard();
> 20 |     await expect(page.locator('text=Client Portal')).toBeVisible();
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  21 |
  22 |     // Decode a valid VIN (e.g., a common Ford VIN)
  23 |     const testVin = '1FA6P8CF0G5123456';
  24 |     await garagePage.addVehicle(testVin);
  25 |
  26 |     // Verify vehicle appears in garage (NHTSA mock or real return)
  27 |     // Note: In real tests, we'd wait for the specific make/model
  28 |     await expect(page.locator('#decoded-vehicle-info')).not.toBeVisible(); // Modal closed
  29 |   });
  30 |
  31 |   test('Journey B: Cart operations - Add, Clear, and Verify reset', async ({ page }) => {
  32 |     const basePage = new BasePage(page);
  33 |
  34 |     await basePage.navigate();
  35 |
  36 |     // Add a service to cart
  37 |     const bookNowBtns = page.locator('button:has-text("Book Now")');
  38 |     await bookNowBtns.first().click();
  39 |
  40 |     // Verify cart count
  41 |     await expect(basePage.cartCount).toHaveText('1');
  42 |
  43 |     // Open cart and clear it
  44 |     await basePage.openCart();
  45 |     const clearCartBtn = page.locator('button:has-text("Clear Selection")');
  46 |     await clearCartBtn.click();
  47 |
  48 |     // Verify cart count resets
  49 |     await expect(basePage.cartCount).not.toBeVisible();
  50 |   });
  51 |
  52 |   test('Journey C: Admin updates booking status', async ({ page }) => {
  53 |     const loginPage = new LoginPage(page);
  54 |     const adminPage = new AdminPage(page);
  55 |
  56 |     await loginPage.navigate();
  57 |     // Admin login
  58 |     await loginPage.login('admin@example.com', 'adminpass');
  59 |
  60 |     await loginPage.goToDashboard();
  61 |     await expect(page.locator('text=Administrative Control')).toBeVisible();
  62 |
  63 |     await adminPage.goToBookings();
  64 |
  65 |     // Update a mock booking status
  66 |     await adminPage.updateBookingStatus('confirmed');
  67 |
  68 |     // Verify success toast
  69 |     await expect(page.locator('text=Booking status updated to confirmed')).toBeVisible();
  70 |   });
  71 | });
  72 |
```