export interface EventInfo {
  title: string
  subtitle?: string
  dateDisplay: string
  timeDisplay: string
  venue: string
  address?: string
  mapUrl: string
  startIST: string
  endIST: string
  countdownUTC: string
}

export const WEDDING_CEREMONY: EventInfo = {
  title: 'Sacred Union & Thalikettu',
  subtitle: 'The Wedding Ceremony',
  dateDisplay: 'Sunday, 30 . 08 . 2026',
  timeDisplay: 'Thalikettu: 8:00 AM – 9:00 AM',
  venue: 'Guruvayur Sree Krishna Temple',
  address: 'Guruvayur, Thrissur',
  mapUrl: 'https://maps.app.goo.gl/jMHYJH2VZES7RyHx8',
  startIST: '20260830T080000',
  endIST: '20260830T093000',
  countdownUTC: '2026-08-30T02:30:00Z',
}

export const WEDDING_FEAST: EventInfo = {
  title: 'Wedding Feast & Celebration',
  subtitle: 'Guruvayur Reception',
  dateDisplay: 'Sunday, 30 . 08 . 2026',
  timeDisplay: '11:00 AM – 2:00 PM',
  venue: 'Nandanam Regency',
  address: 'Karuvanthala, Guruvayur',
  mapUrl: 'https://maps.app.goo.gl/jMHYJH2VZES7RyHx8',
  startIST: '20260830T110000',
  endIST: '20260830T140000',
  countdownUTC: '2026-08-30T05:30:00Z',
}

export const WEDDING_RECEPTION: EventInfo = {
  title: 'The Wedding Reception',
  subtitle: 'Grand Evening Celebration',
  dateDisplay: 'Sunday, 06 . 09 . 2026',
  timeDisplay: '4:00 PM – 9:00 PM',
  venue: 'ALMA Convention Center',
  address: 'Nambikolly, Wayanad',
  mapUrl: 'https://maps.app.goo.gl/1TWeM593fWJEJYEp7',
  startIST: '20260906T160000',
  endIST: '20260906T210000',
  countdownUTC: '2026-09-06T10:30:00Z',
}

export interface CoupleProfile {
  name: string
  nameDisplay: string
  parents: string
  home: string
}

export function readKind(): 'wedding' | 'reception' {
  if (typeof window === 'undefined') return 'wedding'
  const path = window.location.pathname.toLowerCase()
  if (path.includes('/reception')) return 'reception'

  const params = new URLSearchParams(window.location.search)
  const q = (
    params.get('invite') ||
    params.get('type') ||
    params.get('event')
  )?.toLowerCase()

  if (q === 'reception' || params.has('reception')) return 'reception'

  return 'wedding'
}

export const inviteKind = readKind()
export const isReception = inviteKind === 'reception'
export const isWedding = inviteKind === 'wedding'

export const primaryEvent: EventInfo = isReception ? WEDDING_RECEPTION : WEDDING_CEREMONY

export const coupleNames = 'Amal & Aiswarya'
export const monogramText = 'A & A'

export const coupleData = {
  groom: {
    name: 'Amal',
    nameDisplay: 'Amal',
    role: 'The Groom',
    parents: 'Son of Mr. Girish Kumar & Mrs. Sindhu Girish',
    home: 'Edakkattupparambil House, Cheeral, Sultan Bathery, Wayanad',
  },
  bride: {
    name: 'Aiswarya',
    nameDisplay: 'Aiswarya',
    role: 'The Bride',
    parents: 'Daughter of Mr. Jayan M.C. & Mrs. Sindhu Jayan',
    home: 'Marakkath House, Kannoth, Venkitangu, Thrissur',
  },
}
