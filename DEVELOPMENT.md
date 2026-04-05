# Development Guide

This document contains essential information for developers working on the Elite Mechanic Consultations project, focusing on local development, testing, and mock fallbacks.

## Local Development
To run the local development server:
```bash
npm install
npm run dev
```
The server will start on port `3000` or `3001` depending on availability. The E2E test suite expects the dev server on port `3001`.

## End-to-End Testing (Playwright)
The project uses Playwright for end-to-end testing.
To run the test suite:
```bash
npx playwright test
```
The test suite includes tests for:
- User login, VIN decoding, and vehicle management.
- Cart operations (adding services, checking cart count, and clearing the cart).
- Admin booking management.

**Note:** The tests are configured to run against `http://localhost:3001`. Ensure your local server can bind to this port (or the Playwright configuration's `webServer` step will launch it automatically).

## Firebase Mock Fallbacks
The application is designed to degrade gracefully if Firebase configuration is missing or contains placeholder values (e.g., `YOUR_API_KEY`).

1. **Initialization:** In `src/lib/firebase.ts`, the app checks the `.env` configuration. If `VITE_FIREBASE_API_KEY` is a placeholder, it sets `isFirebaseReady = false` and exports safe mock proxies for Firestore, Auth, and Storage. These proxies prevent crashes when Firebase methods are called.
2. **Authentication Mocking:** If `isFirebaseReady` is false, `src/components/auth/LoginModal.tsx` intercepts the login form submission. Instead of throwing an error or attempting to contact Firebase, it dispatches a `mockLogin` browser event and immediately closes the modal.
3. **Session Handling:** `src/App.tsx` listens for this `mockLogin` event. Upon receiving it, it sets a mocked user state (`{ email: 'mock@example.com', uid: 'mock-uid-123' }`), bypassing the standard `onAuthStateChanged` flow, which enables developers and automated tests to access authenticated sections (like the Client Portal or Admin Dashboard) without a live backend connection.