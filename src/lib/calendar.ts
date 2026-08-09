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
    'PRODID:-//Amal & Surya Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `DTSTAMP:${now}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    `UID:${now}-wedding@amal-surya.love`,
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

export const weddingEvent: CalendarEvent = {
  title: 'Amal & Surya — Wedding Ceremony',
  startIST: '20260830T103000',
  endIST: '20260830T133000',
  location: 'Wedding Venue',
  description: 'Join us to celebrate the wedding ceremony of Amal & Surya',
}

export const receptionEvent: CalendarEvent = {
  title: 'Amal & Surya — Wedding Reception',
  startIST: '20260906T180000',
  endIST: '20260906T213000',
  location: 'Reception Venue',
  description: 'Join us for the wedding reception of Amal & Surya',
}
