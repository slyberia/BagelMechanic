// src/types/index.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image?: string;
}

export interface CartItem extends Service {
  quantity: number;
}

export interface Booking {
  id: string;
  userId: string;
  userEmail?: string;
  serviceId: string;
  serviceTitle: string;
  price: number;
  date: string;
  time: string;
  clientLocalTime: string;
  localTimezone: string;
  utcTimestamp: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: any;
  mediaUrls?: string[];
}

export interface Vehicle {
  id: string;
  userId: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  cylinders: string;
  driveType: string;
  createdAt: any;
}
