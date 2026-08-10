import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

const TARGET_DATE = new Date(primaryEvent.countdownUTC)

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number
}

function getTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const fmt = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-sub mb-2">Countdown to the celebration</p>
        <h2 className="section-heading-script gold-foil mb-8">Until Forever Begins</h2>

        {/* Minimalist Inline Glass Capsule */}
        <div className="inline-flex items-center justify-center flex-wrap gap-4 sm:gap-6 px-8 py-5 rounded-full bg-white/90 backdrop-blur-xl border border-champagne/45 shadow-[0_12px_36px_-10px_rgba(47,72,61,0.1)]">
          <div className="flex items-center gap-1.5">
            <span className="font-heading text-2xl sm:text-3xl text-eucalyptus font-semibold">{fmt(time.days)}</span>
            <span className="font-heading text-[10px] uppercase text-sage tracking-widest font-semibold ml-1">Days</span>
          </div>

          <span className="text-gold opacity-60 text-lg">·</span>

          <div className="flex items-center gap-1.5">
            <span className="font-heading text-2xl sm:text-3xl text-eucalyptus font-semibold">{fmt(time.hours)}</span>
            <span className="font-heading text-[10px] uppercase text-sage tracking-widest font-semibold ml-1">Hours</span>
          </div>

          <span className="text-gold opacity-60 text-lg">·</span>

          <div className="flex items-center gap-1.5">
            <span className="font-heading text-2xl sm:text-3xl text-eucalyptus font-semibold">{fmt(time.minutes)}</span>
            <span className="font-heading text-[10px] uppercase text-sage tracking-widest font-semibold ml-1">Mins</span>
          </div>

          <span className="text-gold opacity-60 text-lg">·</span>

          <div className="flex items-center gap-1.5 relative">
            <span className="font-heading text-2xl sm:text-3xl text-eucalyptus font-semibold">{fmt(time.seconds)}</span>
            <span className="font-heading text-[10px] uppercase text-sage tracking-widest font-semibold ml-1">Secs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping absolute -top-1 -right-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
