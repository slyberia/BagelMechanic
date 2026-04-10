# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-test.spec.ts >> Elite Mechanic Smoke Test Suite >> Journey C: Admin updates booking status
- Location: tests/e2e/smoke-test.spec.ts:52:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#nav-dashboard')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - img [ref=e6]
  - generic [ref=e8]: System Interruption
  - heading "Technical Refinement in Progress" [level=1] [ref=e9]
  - paragraph [ref=e10]: We've encountered a minor structural anomaly. Our engineering team has been notified. Please return to the dashboard to resume your session.
  - button "Return to Dashboard" [ref=e11]:
    - img [ref=e12]
    - generic [ref=e17]: Return to Dashboard
  - paragraph [ref=e19]:
    - text: "Error Code: TypeError"
    - text: Elite Engineering Systems v2.0
```

# Test source

```ts
  1  | // tests/e2e/pages/BasePage.ts
  2  | import { Page, Locator } from '@playwright/test';
  3  |
  4  | export class BasePage {
  5  |   protected readonly page: Page;
  6  |   readonly navbarLogo: Locator;
  7  |   readonly cartToggle: Locator;
  8  |   readonly cartCount: Locator;
  9  |   readonly clientLoginBtn: Locator;
  10 |   readonly dashboardBtn: Locator;
  11 |   readonly signOutBtn: Locator;
  12 |
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 |     this.navbarLogo = page.locator('text=Elite Engineer');
  16 |     this.cartToggle = page.locator('#nav-cart-toggle');
  17 |     this.cartCount = page.locator('#cart-count');
  18 |     this.clientLoginBtn = page.locator('#nav-client-login');
  19 |     this.dashboardBtn = page.locator('#nav-dashboard');
  20 |     this.signOutBtn = page.locator('#nav-sign-out');
  21 |   }
  22 |
  23 |   async navigate(path: string = '/') {
  24 |     await this.page.goto(path);
  25 |   }
  26 |
  27 |   async openCart() {
  28 |     await this.cartToggle.click();
  29 |   }
  30 |
  31 |   async goToDashboard() {
> 32 |     await this.dashboardBtn.click();
     |                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  33 |   }
  34 |
  35 |   async signOut() {
  36 |     await this.signOutBtn.click();
  37 |   }
  38 | }
  39 |
```