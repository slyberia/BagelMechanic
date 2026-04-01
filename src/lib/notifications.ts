// src/lib/notifications.ts

interface EmailPayload {
  clientName: string;
  clientEmail: string;
  serviceTitle: string;
  appointmentTime: string;
  vin?: string;
  price: number;
}

/**
 * Mock service to simulate sending confirmation emails.
 * In a production environment, this would integrate with an API like Resend, SendGrid, or AWS SES.
 */
export async function sendConfirmationEmail(payload: EmailPayload) {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                    ELITE MECHANIC - EMAIL CONFIRMATION                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ TO: ${payload.clientEmail.padEnd(64)} ║
║ SUBJECT: Consultation Confirmed - ${payload.serviceTitle.padEnd(35)} ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ Dear ${payload.clientName},                                                         ║
║                                                                              ║
║ Your high-performance consultation has been successfully scheduled.          ║
║                                                                              ║
║ DETAILS:                                                                     ║
║ - Service: ${payload.serviceTitle.padEnd(58)} ║
║ - Time:    ${payload.appointmentTime.padEnd(58)} ║
║ - VIN:     ${(payload.vin || 'N/A').padEnd(58)} ║
║ - Total:   $${payload.price.toString().padEnd(57)} ║
║                                                                              ║
║ Our engineers are reviewing your diagnostic data.                            ║
║                                                                              ║
║ Regards,                                                                     ║
║ Elite Mechanic Operations Team                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  /* 
     PRODUCTION INTEGRATION EXAMPLE (Resend):
     
     import { Resend } from 'resend';
     const resend = new Resend(process.env.RESEND_API_KEY);

     await resend.emails.send({
       from: 'Elite Mechanic <ops@elitemechanic.com>',
       to: payload.clientEmail,
       subject: `Consultation Confirmed: ${payload.serviceTitle}`,
       html: `<h1>Elite Mechanic Confirmation</h1>...`
     });
  */

  return { success: true };
}
