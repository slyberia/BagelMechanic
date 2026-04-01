// src/lib/analytics.ts

type EventName = 
  | 'Booking_Started' 
  | 'Booking_Completed' 
  | 'VIN_Decoded' 
  | 'Cart_Added' 
  | 'Cart_Cleared' 
  | 'Admin_Login' 
  | 'Client_Login';

interface EventProperties {
  [key: string]: any;
}

/**
 * Analytics Proxy
 * Currently logs to console, ready for GA4 or Mixpanel integration.
 */
export const trackEvent = (name: EventName, properties?: EventProperties) => {
  const timestamp = new Date().toISOString();
  
  // Console logging for development/mock state
  console.group(`[Analytics] ${name}`);
  console.log('Timestamp:', timestamp);
  if (properties) {
    console.log('Properties:', properties);
  }
  console.groupEnd();

  // Placeholder for production integration
  // if (import.meta.env.PROD && window.gtag) {
  //   window.gtag('event', name, properties);
  // }
};
