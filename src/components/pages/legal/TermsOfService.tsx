// src/components/pages/legal/TermsOfService.tsx
import { LegalLayout } from './LegalLayout';

export function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="March 30, 2026">
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Elite Mechanic Consultations platform, you agree to be bound 
          by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">2. Service Description</h2>
        <p>
          We provide virtual automotive consultation services and technical advice. Our services 
          are intended for informational and advisory purposes only. We do not perform physical 
          repairs or maintenance.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">3. User Responsibilities</h2>
        <p>
          You are responsible for providing accurate information about your vehicle and its condition. 
          You must have the legal right to the vehicle for which you are seeking consultation.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">4. Payment and Cancellation</h2>
        <p>
          Fees for our services are due at the time of booking. Cancellations must be made at least 
          24 hours in advance to receive a full refund. Late cancellations may be subject to a fee.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">5. Limitation of Liability</h2>
        <p>
          Elite Mechanic Consultations is not liable for any damages resulting from the use or 
          misuse of our technical advice. All final decisions regarding vehicle maintenance 
          and repair are the responsibility of the owner.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">6. Intellectual Property</h2>
        <p>
          All content provided through our services, including technical reports and analysis, 
          is the intellectual property of Elite Mechanic Consultations and is for your personal 
          use only.
        </p>
      </section>
    </LegalLayout>
  );
}
