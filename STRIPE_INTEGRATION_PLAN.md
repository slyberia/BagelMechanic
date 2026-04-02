# Stripe Integration Plan (Phase 15 Roadmap)

To move from "Mock" to "Live" payments and integrate Stripe Checkouts cleanly, we should adopt the following plan:

## 1. Implement a Centralized `CartContext`
Currently, the cart state is managed locally within `src/App.tsx` (`useState<CartItem[]>([])`). To properly scale and maintain a lean integration, extract this state into a dedicated `CartContext`.
- Create `src/lib/CartContext.tsx` using `createContext` and a context provider (`<CartProvider>`).
- Move `cart`, `addToCart`, `removeFromCart`, and `clearCart` logic into this provider.
- Wrap `App.tsx` with `<CartProvider>`.

## 2. Frontend Stripe Setup
- Install `@stripe/stripe-js`.
- In the `CheckoutModal` or the `CartDrawer`'s "Proceed to Checkout" handler, replace the mock logic with a fetch request to a backend endpoint to create a Stripe Checkout Session.
- Load Stripe using `loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)`.
- Use the returned `sessionId` from the backend to redirect the user: `stripe.redirectToCheckout({ sessionId })`.

## 3. Backend/Serverless Functions
- Create a serverless function (e.g., Firebase Cloud Functions or an API route if switching to a framework like Next.js/Vite SSR) to handle creating the Stripe Checkout Session securely.
- Ensure the backend verifies the requested cart items and prices from a trusted source (Firestore database or `constants/services.ts`), avoiding price manipulation by the client.

## 4. Webhooks & Fulfillment
- Create a secure endpoint to receive Stripe Webhooks.
- Listen for the `checkout.session.completed` event.
- Upon receipt, trigger the order fulfillment process: securely saving the finalized order in Firestore, and clearing the user's cart (which can be triggered by a success page callback).
