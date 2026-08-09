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
  title: 'Wedding Ceremony (Muhurtham)',
  subtitle: 'The Sacred Union of Amal & Surya',
  dateDisplay: '30 . 08 . 2026',
  timeDisplay: '10:15 AM - 11:30 AM',
  venue: 'Sri Gokulam Convention Centre',
  address: 'Guruvayur, Thrissur, Kerala',
  mapUrl: 'https://maps.google.com/?q=Guruvayur+Kerala',
  startIST: '20260830T101500',
  endIST: '20260830T123000',
  countdownUTC: '2026-08-30T04:45:00Z',
}

export const WEDDING_RECEPTION: EventInfo = {
  title: 'Wedding Reception',
  subtitle: 'Grand Evening Celebration',
  dateDisplay: '06 . 09 . 2026',
  timeDisplay: '6:30 PM Onwards',
  venue: 'Grand Palace Auditorium',
  address: 'Kochi, Kerala',
  mapUrl: 'https://maps.google.com/?q=Kochi+Kerala',
  startIST: '20260906T183000',
  endIST: '20260906T220000',
  countdownUTC: '2026-09-06T13:00:00Z',
}

export interface CoupleProfile {
  name: string
  nameDisplay: string
  parents: string
  home: string
  photo: string
}

export const coupleData = {
  groom: {
    name: 'Amal',
    nameDisplay: 'Amal',
    parents: 'Son of Family',
    home: 'Thrissur, Kerala',
    photo: './images/couple.jpg',
  },
  bride: {
    name: 'Surya',
    nameDisplay: 'Surya',
    parents: 'Daughter of Family',
    home: 'Kochi, Kerala',
    photo: './images/couple2.jpg',
  },
  heroImage: './images/couple.jpg',
  gallery: [
    {
      src: './images/couple.jpg',
      caption: 'Traditional Moments',
      category: 'Ceremony',
    },
    {
      src: './images/couple2.jpg',
      caption: 'By the Temple Pond',
      category: 'Pre-Wedding',
    },
    {
      src: './images/gallery1.jpg',
      caption: 'Picnic Fun with our Furry Friend',
      category: 'Memories',
    },
    {
      src: './images/gallery2.jpg',
      caption: 'Walking Together in Nature',
      category: 'Memories',
    },
  ],
}

export function readKind(): 'all' | 'wedding' | 'reception' {
  if (typeof window === 'undefined') return 'all'
  const path = window.location.pathname.toLowerCase()
  if (path.includes('/reception')) return 'reception'
  if (path.includes('/wedding')) return 'wedding'

  const params = new URLSearchParams(window.location.search)
  const q = params.get('invite')?.toLowerCase()
  if (q === 'reception') return 'reception'
  if (q === 'wedding') return 'wedding'

  return 'all'
}

export const inviteKind = readKind()
export const primaryEvent: EventInfo =
  inviteKind === 'reception' ? WEDDING_RECEPTION : WEDDING_CEREMONY

export const showWedding = inviteKind === 'all' || inviteKind === 'wedding'
export const showReception = inviteKind === 'all' || inviteKind === 'reception'
