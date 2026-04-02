// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let rawDb: any = null;
let rawAuth: any = null;
let rawStorage: any = null;
let isFirebaseReady = false;

try {
  const hasConfig = import.meta.env.VITE_FIREBASE_API_KEY && 
                   import.meta.env.VITE_FIREBASE_API_KEY !== 'undefined' &&
                   import.meta.env.VITE_FIREBASE_API_KEY !== 'YOUR_API_KEY' &&
                   import.meta.env.VITE_FIREBASE_PROJECT_ID &&
                   import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'YOUR_PROJECT_ID';

  if (hasConfig) {
    const app = initializeApp(firebaseConfig);
    rawDb = getFirestore(app);
    rawAuth = getAuth(app);
    rawStorage = getStorage(app);
    isFirebaseReady = true;
  } else {
    console.warn('Firebase configuration is missing. App will run in offline/mock mode.');
  }
} catch (error) {
  console.warn('CRITICAL: Firebase failed to initialize. Check your API keys.', error);
}

// Safe Proxy Factory
const createSafeProxy = (obj: any, name: string) => {
  return new Proxy(obj || {}, {
    get(target, prop) {
      if (!obj) {
        // Return a no-op function for any method call to prevent crashes
        return (...args: any[]) => {
          console.warn(`Firebase ${name} is NOT initialized. Method "${String(prop)}" called with:`, args);
          return Promise.resolve(null);
        };
      }
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  });
};

export const db = createSafeProxy(rawDb, 'Firestore');
export const auth = createSafeProxy(rawAuth, 'Auth');
export const storage = createSafeProxy(rawStorage, 'Storage');
export { isFirebaseReady };
