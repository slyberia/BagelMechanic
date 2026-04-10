# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-test.spec.ts >> Elite Mechanic Smoke Test Suite >> Journey B: Cart operations - Add, Clear, and Verify reset
- Location: tests/e2e/smoke-test.spec.ts:31:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('#cart-count')
Expected: "1"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#cart-count')

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
            - button "Client login" [ref=e28]:
              - img [ref=e29]
              - generic [ref=e32]: Client Login
            - button "Book a consultation" [active] [ref=e33]: Book Now
    - main [ref=e34]:
      - region "The Art of Automotive Excellence" [ref=e35]:
        - generic [ref=e39]:
          - generic [ref=e40]: Precision Engineering • Bespoke Consultation
          - heading "The Art of Automotive Excellence" [level=1] [ref=e41]:
            - text: The Art of
            - text: Automotive Excellence
          - paragraph [ref=e42]: Expert engineering consultation for high-performance vehicles and heritage collections. Where mechanical mastery meets discerning stewardship.
          - generic [ref=e43]:
            - button "Book an elite consultation" [ref=e44]: Book Now
            - button "View our consultation services" [ref=e45]: View Services
        - generic [ref=e47]: Scroll
      - region "The Process" [ref=e49]:
        - generic [ref=e50]:
          - heading "The Process" [level=2] [ref=e52]
          - generic [ref=e54]:
            - generic [ref=e55]:
              - img [ref=e57]
              - heading "Select Expertise" [level=3] [ref=e60]
              - paragraph [ref=e61]: Choose the consultation tier that aligns with your mechanical requirements.
            - generic [ref=e62]:
              - img [ref=e64]
              - heading "Schedule Session" [level=3] [ref=e66]
              - paragraph [ref=e67]: Select a precise time slot from our secure global availability calendar.
            - generic [ref=e68]:
              - img [ref=e70]
              - heading "Virtual Walkthrough" [level=3] [ref=e73]
              - paragraph [ref=e74]: Connect via high-definition video for a deep-dive technical analysis.
            - generic [ref=e75]:
              - img [ref=e77]
              - heading "Technical Report" [level=3] [ref=e80]
              - paragraph [ref=e81]: Receive a comprehensive engineering dossier with actionable insights.
      - region "Service Tiers" [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]:
            - generic [ref=e85]:
              - heading "Service Tiers" [level=2] [ref=e86]
              - paragraph [ref=e87]: Select a consultation level tailored to your vehicle's specific engineering needs. Each session is conducted by a senior automotive engineer.
            - generic [ref=e88]: Bespoke Options Available
          - generic [ref=e89]:
            - article [ref=e90]:
              - generic [ref=e91]:
                - heading "Pre-Purchase Inspection" [level=3] [ref=e92]
                - text: 60 min
              - generic [ref=e93]: $450.00
              - paragraph [ref=e94]: A comprehensive virtual walkthrough and technical analysis of a prospective vehicle purchase.
              - list "Features of Pre-Purchase Inspection" [ref=e95]:
                - listitem [ref=e96]:
                  - img [ref=e97]
                  - text: Live video consultation
                - listitem [ref=e99]:
                  - img [ref=e100]
                  - text: Historical record analysis
                - listitem [ref=e102]:
                  - img [ref=e103]
                  - text: Common failure point check
                - listitem [ref=e105]:
                  - img [ref=e106]
                  - text: Repair estimate overview
                - listitem [ref=e108]:
                  - img [ref=e109]
                  - text: Final recommendation report
              - button "Select Pre-Purchase Inspection for $450.00" [ref=e111]: Book Now
            - article [ref=e112]:
              - generic [ref=e113]:
                - heading "Performance Engineering" [level=3] [ref=e114]
                - text: 120 min
              - generic [ref=e115]: $850.00
              - paragraph [ref=e116]: Specialized consultation for track preparation, suspension tuning, and powertrain optimization.
              - list "Features of Performance Engineering" [ref=e117]:
                - listitem [ref=e118]:
                  - img [ref=e119]
                  - text: Chassis dynamics review
                - listitem [ref=e121]:
                  - img [ref=e122]
                  - text: ECU data log analysis
                - listitem [ref=e124]:
                  - img [ref=e125]
                  - text: Component selection advice
                - listitem [ref=e127]:
                  - img [ref=e128]
                  - text: Custom maintenance schedule
                - listitem [ref=e130]:
                  - img [ref=e131]
                  - text: Direct engineer access
              - button "Select Performance Engineering for $850.00" [ref=e133]: Book Now
            - article [ref=e134]:
              - generic [ref=e135]:
                - heading "Restoration Strategy" [level=3] [ref=e136]
                - text: Ongoing
              - generic [ref=e137]: $2,500.00/ starting
              - paragraph [ref=e138]: Long-term advisory for concourse-level restorations and historical preservation projects.
              - list "Features of Restoration Strategy" [ref=e139]:
                - listitem [ref=e140]:
                  - img [ref=e141]
                  - text: Originality certification prep
                - listitem [ref=e143]:
                  - img [ref=e144]
                  - text: Global parts sourcing
                - listitem [ref=e146]:
                  - img [ref=e147]
                  - text: Specialist vendor management
                - listitem [ref=e149]:
                  - img [ref=e150]
                  - text: Documentation archiving
                - listitem [ref=e152]:
                  - img [ref=e153]
                  - text: Quarterly progress reviews
              - button "Select Restoration Strategy for $2,500.00" [ref=e155]: Book Now
    - contentinfo "Site Footer" [ref=e156]:
      - generic [ref=e157]:
        - generic [ref=e158]:
          - generic [ref=e159]:
            - heading "Elite Engineer" [level=3] [ref=e160]
            - paragraph [ref=e161]: Providing technical stewardship for the world's most significant automotive collections. Engineering excellence, delivered virtually.
            - generic [ref=e162]:
              - link "Follow us on Instagram" [ref=e163] [cursor=pointer]:
                - /url: "#"
                - img [ref=e164]
              - link "Follow us on Twitter" [ref=e167] [cursor=pointer]:
                - /url: "#"
                - img [ref=e168]
              - link "Follow us on LinkedIn" [ref=e170] [cursor=pointer]:
                - /url: "#"
                - img [ref=e171]
              - link "Follow us on Email" [ref=e175] [cursor=pointer]:
                - /url: "#"
                - img [ref=e176]
          - generic [ref=e179]:
            - heading "Navigation" [level=4] [ref=e180]
            - list [ref=e181]:
              - listitem [ref=e182]:
                - button "Services" [ref=e183]
              - listitem [ref=e184]:
                - button "Process" [ref=e185]
              - listitem [ref=e186]:
                - button "About" [ref=e187]
              - listitem [ref=e188]:
                - button "Contact" [ref=e189]
          - generic [ref=e190]:
            - heading "Legal" [level=4] [ref=e191]
            - list [ref=e192]:
              - listitem [ref=e193]:
                - button "Privacy Policy" [ref=e194]
              - listitem [ref=e195]:
                - button "Terms of Service" [ref=e196]
              - listitem [ref=e197]:
                - button "Consultation Agreement" [ref=e198]
        - generic [ref=e199]:
          - paragraph [ref=e200]: © 2026 Elite Mechanic Consultations. All rights reserved.
          - paragraph [ref=e201]: Designed for the Discerning Enthusiast
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
  20 |     await expect(page.locator('text=Client Portal')).toBeVisible();
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
> 41 |     await expect(basePage.cartCount).toHaveText('1');
     |                                      ^ Error: expect(locator).toHaveText(expected) failed
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