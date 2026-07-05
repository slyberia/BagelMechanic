# BagelMechanic | Elite Mechanic Consultations

A luxury-grade, production-ready e-commerce platform for high-end automotive consultation services.

## Project Overview

BagelMechanic provides a bespoke booking and consultation platform for elite automotive engineering. Clients can book specialized sessions such as Pre-Purchase Inspections, Performance Engineering, and Restoration Strategies. It features a minimalist, high-end design system, secure client authentication, real-time booking management, and a streamlined checkout process.

## Tech Stack

- **Frontend**: React 19 (Vite)
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

## Production Deployment (Google Cloud Run)

The app ships as a static SPA served by nginx in a container (see `Dockerfile`). Firebase web config is **public client config** and is baked into the bundle at build time via Docker build args.

### Automated (recommended)

`cloudbuild.yaml` builds the image, pushes it to Artifact Registry, and deploys to Cloud Run. One-time setup (Artifact Registry repo, Secret Manager entries for the `VITE_*` values, IAM roles, and a build trigger on `main`) is documented at the top of `cloudbuild.yaml`. To run it manually:

```bash
gcloud builds submit --config cloudbuild.yaml
```

### Manual

```bash
docker build \
  --build-arg VITE_FIREBASE_API_KEY=... \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN=... \
  --build-arg VITE_FIREBASE_PROJECT_ID=... \
  --build-arg VITE_FIREBASE_STORAGE_BUCKET=... \
  --build-arg VITE_FIREBASE_MESSAGING_SENDER_ID=... \
  --build-arg VITE_FIREBASE_APP_ID=... \
  --build-arg VITE_ADMIN_EMAIL=... \
  -t REGION-docker.pkg.dev/PROJECT/REPO/elite-mechanic-consultations .

docker push REGION-docker.pkg.dev/PROJECT/REPO/elite-mechanic-consultations
gcloud run deploy elite-mechanic-consultations \
  --image REGION-docker.pkg.dev/PROJECT/REPO/elite-mechanic-consultations \
  --region REGION --allow-unauthenticated
```

> **Note:** Setting `VITE_*` variables on the Cloud Run *service* has no effect — Vite inlines them at **build** time. If the config is missing at build time the app silently falls back to offline/mock mode (see `DEVELOPMENT.md`).

## Security & Rules

The application includes a `firestore.rules` file (referenced by `firebase.json`) that enforces ownership-based access control. Rules are deployed to the Firebase project independently of the Cloud Run app:

```bash
npx firebase-tools deploy --only firestore:rules --project <PROJECT_ID>
```

---
*Precision Engineering • Bespoke Consultation*
