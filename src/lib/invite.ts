export interface EventInfo {
  dateDisplay: string
  countdownUTC: string
  mapUrl: string
}

export const WEDDING_CEREMONY: EventInfo = {
  dateDisplay: '30 . 08 . 2026',
  countdownUTC: '2026-08-30T05:00:00Z', // 10:30 AM IST
  mapUrl: 'https://maps.google.com',
}

export const WEDDING_RECEPTION: EventInfo = {
  dateDisplay: '06 . 09 . 2026',
  countdownUTC: '2026-09-06T12:30:00Z', // 6:00 PM IST
  mapUrl: 'https://maps.google.com',
}

function readKind(): 'all' | 'wedding' | 'reception' {
  if (typeof window === 'undefined') return 'all'
  const path = window.location.pathname.toLowerCase()
  if (path.startsWith('/reception')) return 'reception'
  if (path.startsWith('/wedding')) return 'wedding'
  const raw = new URLSearchParams(window.location.search).get('invite')
  if (raw === 'wedding') return 'wedding'
  if (raw === 'reception') return 'reception'
  return 'all'
}

export const inviteKind = readKind()
export const showWedding = inviteKind !== 'reception'
export const showReception = inviteKind !== 'wedding'

export const primaryEvent: EventInfo =
  inviteKind === 'reception' ? WEDDING_RECEPTION : WEDDING_CEREMONY
