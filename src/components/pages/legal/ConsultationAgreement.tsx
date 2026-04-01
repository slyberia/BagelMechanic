// src/components/pages/legal/ConsultationAgreement.tsx
import { LegalLayout } from './LegalLayout';

export function ConsultationAgreement() {
  return (
    <LegalLayout title="Consultation Agreement" lastUpdated="March 30, 2026">
      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">1. Scope of Service</h2>
        <p>
          This Consultation Agreement ("Agreement") governs the virtual automotive consultation 
          services provided by Elite Mechanic Consultations. These services include technical 
          advice, historical analysis, and strategic roadmap development for your vehicle.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">2. Virtual Nature of Service</h2>
        <p>
          You acknowledge that all consultations are conducted virtually via video conferencing 
          and data analysis. Elite Mechanic Consultations does not perform physical inspections 
          or repairs. Our advice is based on the information and visual data you provide.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">3. Technical Analysis and Reports</h2>
        <p>
          Following your consultation, you will receive a technical report. This report is 
          intended for your personal use and provides a summary of findings and recommendations 
          based on the data available at the time of the consultation.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">4. Professional Advice Disclaimer</h2>
        <p>
          While our consultations are conducted by senior automotive engineers, our advice 
          does not replace the need for physical inspections by qualified local mechanics 
          prior to performing any repairs or maintenance.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">5. Confidentiality</h2>
        <p>
          We maintain strict confidentiality regarding your vehicle and its technical records. 
          Your data will not be shared with third parties without your explicit consent, 
          except as required by law.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif text-gold italic">6. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Elite Mechanic Consultations from any 
          claims, damages, or liabilities arising from your reliance on our technical 
          advice or the use of our services.
        </p>
      </section>
    </LegalLayout>
  );
}
