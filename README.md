# Elite Mechanic Consultations

A luxury-grade, production-ready e-commerce platform for high-end automotive consultation services.

## Project Overview

This application provides a bespoke booking and consultation platform for elite automotive engineering. It features a minimalist, high-end design system, secure client authentication, real-time booking management, and a streamlined checkout process.

## Tech Stack

- **Frontend**: React 18+ (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend/Database**: Firebase (Authentication & Firestore)
- **Language**: TypeScript

## File Architecture

```text
/src
  /components
    /auth         # Login and authentication modals
    /booking      # Real-time booking interface
    /cart         # Shopping cart drawer
    /checkout     # Secure payment processing modal
    /dashboard    # Client portal for session management
    /layout       # Navbar, Footer, and structural components
    /sections     # Page sections (Hero, Pricing, etc.)
    /ui           # Reusable atomic UI components (Button, etc.)
  /lib            # Firebase initialization and utility functions
  /types          # Global TypeScript interfaces
  App.tsx         # Main application logic and state management
  main.tsx        # Application entry point
  index.css       # Global styles and Tailwind directives
```

## Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd elite-mechanic-consultations
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Production Deployment (Firebase)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Initialize Firebase CLI**:
   ```bash
   firebase init
   ```
   Select **Hosting** and **Firestore**.

3. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

## Security & Rules

The application includes a `firestore.rules` file that enforces strict data validation and ownership-based access control. Ensure these rules are deployed to your Firebase project to secure client data.

---
*Precision Engineering • Bespoke Consultation*
