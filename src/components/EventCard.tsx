import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { googleCalendarUrl, outlookCalendarUrl, downloadICS } from '../lib/calendar'
import type { CalendarEvent } from '../lib/calendar'

interface EventCardProps {
  title: string
  subtitle?: string
  date: string
  time: string
  venue: string
  address?: string
  mapUrl: string
  calEvent: CalendarEvent
}

export default function EventCard({
  title, subtitle, date, time, venue, address, mapUrl, calEvent,
}: EventCardProps) {
  const [calOpen, setCalOpen] = useState(false)

  return (
    <motion.div
      className="relative bg-white/90 backdrop-blur-xl border border-champagne/45 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-[0_16px_50px_-10px_rgba(47,72,61,0.1)]"
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1 rounded-full bg-sage-mist text-eucalyptus text-[10px] uppercase font-heading tracking-widest font-semibold mb-3">
          {subtitle}
        </span>
      )}
      <h3 className="section-heading text-3xl sm:text-4xl mb-4" style={{ color: 'var(--eucalyptus)' }}>
        {title}
      </h3>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

      {/* Info Rows Grid */}
      <div className="space-y-4 text-left mb-8">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-pearl-soft/70 border border-champagne/25">
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-semibold shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <p className="text-[10px] uppercase font-heading tracking-widest text-sage font-semibold">Date</p>
            <p className="font-display font-medium text-lg text-eucalyptus">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-pearl-soft/70 border border-champagne/25">
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-semibold shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <p className="text-[10px] uppercase font-heading tracking-widest text-sage font-semibold">Time</p>
            <p className="font-display font-medium text-lg text-eucalyptus">{time}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-pearl-soft/70 border border-champagne/25">
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-semibold shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <p className="text-[10px] uppercase font-heading tracking-widest text-sage font-semibold">Venue</p>
            <p className="font-display font-medium text-lg text-eucalyptus">{address ? `${venue}, ${address}` : venue}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
        >
          Open Google Maps
        </a>
        <button
          onClick={() => setCalOpen((v) => !v)}
          className="px-6 py-3 border border-sage/40 text-eucalyptus font-body font-light tracking-widest text-xs uppercase rounded-full hover:bg-sage-mist transition-colors"
        >
          {calOpen ? 'Close Calendar Options' : 'Add to Calendar'}
        </button>
      </div>

      {/* Calendar Drawer */}
      <AnimatePresence>
        {calOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-6"
          >
            <div className="p-4 rounded-2xl bg-pearl-soft border border-champagne/30 space-y-2 text-left">
              <button
                onClick={() => { window.open(googleCalendarUrl(calEvent), '_blank'); setCalOpen(false) }}
                className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors font-display text-base text-eucalyptus"
              >
                Google Calendar
              </button>
              <button
                onClick={() => { window.open(outlookCalendarUrl(calEvent), '_blank'); setCalOpen(false) }}
                className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors font-display text-base text-eucalyptus"
              >
                Outlook Calendar
              </button>
              <button
                onClick={() => { downloadICS(calEvent); setCalOpen(false) }}
                className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors font-display text-base text-eucalyptus"
              >
                Apple Calendar / iCal (.ics)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
