// src/components/pages/legal/PrivacyPolicy.tsx
import { LegalLayout } from './LegalLayout';

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 30, 2026">
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including your name, email address, phone number, 
          and vehicle information. This data is essential for providing our elite consultation services and 
          maintaining your technical records.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">2. How We Use Your Data</h2>
        <p>
          Your data is used exclusively to facilitate consultations, provide technical reports, and manage 
          your account. We do not sell or share your personal information with third-party marketers. 
          Technical data may be anonymized for internal research and failure database analysis.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">3. Data Security</h2>
        <p>
          We implement rigorous security measures to protect your information. All virtual consultations 
          are conducted over encrypted channels, and your technical reports are stored in secure, 
          access-controlled environments.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">4. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information at any time. 
          Please contact our technical stewardship team to initiate a data request.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">5. Cookies and Tracking</h2>
        <p>
          Our platform uses essential cookies to maintain your session and provide a seamless 
          user experience. We do not use invasive tracking technologies.
        </p>
      </section>
    </LegalLayout>
  );
}
