// src/constants/services.ts
import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'consult-basic',
    title: 'Pre-Purchase Inspection',
    description: 'A comprehensive virtual walkthrough and technical analysis of a prospective vehicle purchase.',
    price: 450,
    duration: '60 min',
    features: [
      'Live video consultation',
      'Historical record analysis',
      'Common failure point check',
      'Repair estimate overview',
      'Final recommendation report'
    ]
  },
  {
    id: 'consult-pro',
    title: 'Performance Engineering',
    description: 'Specialized consultation for track preparation, suspension tuning, and powertrain optimization.',
    price: 850,
    duration: '120 min',
    features: [
      'Chassis dynamics review',
      'ECU data log analysis',
      'Component selection advice',
      'Custom maintenance schedule',
      'Direct engineer access'
    ]
  },
  {
    id: 'consult-elite',
    title: 'Restoration Strategy',
    description: 'Long-term advisory for concourse-level restorations and historical preservation projects.',
    price: 2500,
    duration: 'Ongoing',
    features: [
      'Originality certification prep',
      'Global parts sourcing',
      'Specialist vendor management',
      'Documentation archiving',
      'Quarterly progress reviews'
    ]
  }
];
