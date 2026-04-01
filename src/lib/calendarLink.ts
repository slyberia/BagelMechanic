// src/lib/calendarLink.ts
import { format, parse } from 'date-fns';

export function generateICS(booking: {
  title: string;
  date: string;
  time: string;
  description: string;
}) {
  // Parse the date and time
  const dateTimeStr = `${booking.date} ${booking.time}`;
  const startDate = parse(dateTimeStr, 'yyyy-MM-dd hh:mm aa', new Date());
  
  // Assume 1 hour duration
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatICSDate = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss'Z'");
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elite Mechanic//Consultation//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@elitemechanic.com`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${booking.title}`,
    `DESCRIPTION:${booking.description.replace(/\n/g, '\\n')}`,
    'LOCATION:Remote Consultation',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  return URL.createObjectURL(blob);
}
