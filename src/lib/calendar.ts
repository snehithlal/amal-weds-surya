export interface CalendarEvent {
  title: string
  startIST: string
  endIST: string
  location: string
  description: string
}

function istToUtc(ist: string): string {
  const y = ist.slice(0, 4), mo = ist.slice(4, 6), d = ist.slice(6, 8)
  const h = parseInt(ist.slice(9, 11)), m = parseInt(ist.slice(11, 13))
  const date = new Date(Date.UTC(+y, +mo - 1, +d, h - 5, m - 30))
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function googleCalendarUrl(event: CalendarEvent): string {
  const start = istToUtc(event.startIST)
  const end = istToUtc(event.endIST)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    location: event.location,
    details: event.description,
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export function outlookCalendarUrl(event: CalendarEvent): string {
  const start = istToUtc(event.startIST)
  const end = istToUtc(event.endIST)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: start,
    enddt: end,
    location: event.location,
    body: event.description,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`
}

export function downloadICS(event: CalendarEvent): void {
  const start = istToUtc(event.startIST)
  const end = istToUtc(event.endIST)
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amal & Aiswarya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    `UID:${now}-wedding@amal.love`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.title.replace(/\s+/g, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export const weddingCeremonyEvent: CalendarEvent = {
  title: 'Amal & Aiswarya — Thalikettu Wedding Ceremony',
  startIST: '20260830T080000',
  endIST: '20260830T093000',
  location: 'Guruvayur Sree Krishna Temple, Guruvayur, Thrissur',
  description: 'Join us for the auspicious Thalikettu wedding ceremony of Amal & Aiswarya.',
}

export const weddingFeastEvent: CalendarEvent = {
  title: 'Amal & Aiswarya — Wedding Feast & Celebration',
  startIST: '20260830T110000',
  endIST: '20260830T140000',
  location: 'Nandanam Regency, Karuvanthala, Guruvayur',
  description: 'Join us for the wedding feast and celebration of Amal & Aiswarya.',
}

export const receptionEvent: CalendarEvent = {
  title: 'Amal & Aiswarya — Wedding Reception',
  startIST: '20260906T160000',
  endIST: '20260906T210000',
  location: 'ALMA Convention Center, Nambikolly, Wayanad',
  description: 'Join us for the grand evening wedding reception of Amal & Aiswarya.',
}
