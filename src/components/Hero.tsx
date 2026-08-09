import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { heroPhoto } from '../lib/images'
import { primaryEvent, inviteKind } from '../lib/invite'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.72])

  const isReception = inviteKind === 'reception'
  const eventSub = isReception ? 'ARE CELEBRATING THEIR RECEPTION' : 'ARE GETTING MARRIED'
  const eventDate = primaryEvent.dateDisplay

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden py-10 px-6"
    >
      {/* Background Image with Perfect Couple Head & Face Centering */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src={heroPhoto}
          alt="Amal and Surya"
          className="w-full h-full object-cover animate-kenburns"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: 'center 46%' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background:
              'radial-gradient(ellipse at center, rgba(15,20,16,0.3) 0%, rgba(10,15,11,0.75) 100%), linear-gradient(180deg, rgba(10,15,11,0.65) 0%, rgba(10,15,11,0.15) 45%, rgba(10,15,11,0.85) 100%)',
          }}
        />
      </motion.div>

      {/* Top Corner Ornaments */}
      <div className="absolute top-6 left-6 opacity-80 z-20" aria-hidden>
        <CornerOrnament />
      </div>
      <div className="absolute top-6 right-6 opacity-80 scale-x-[-1] z-20" aria-hidden>
        <CornerOrnament />
      </div>

      {/* Top Header Text */}
      <motion.div
        className="relative z-10 text-center mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p
          className="font-heading text-[11px] sm:text-xs tracking-[0.5em] uppercase text-[#DFBF70] font-medium"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          Together with their families
        </p>
      </motion.div>

      {/* Main Title & Couple Name */}
      <motion.div
        className="relative z-10 text-center my-auto py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.h1
          className="font-script gold-foil text-6xl sm:text-8xl md:text-9xl leading-none mb-2 py-1"
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.85))' }}
        >
          Amal &amp; Surya
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 my-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="text-[#DFBF70] text-xs opacity-80">✦</span>
        </motion.div>

        <motion.p
          className="font-heading text-xs sm:text-sm tracking-[0.42em] uppercase text-ivory/95 my-2 font-medium"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
        >
          {eventSub}
        </motion.p>

        <motion.p
          className="font-display text-base sm:text-lg text-[#DFBF70] mt-2 tracking-[0.3em] font-semibold"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          {eventDate}
        </motion.p>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="relative z-10 text-[#DFBF70]/80 flex flex-col items-center gap-1 cursor-pointer mb-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <span className="text-[9px] tracking-[0.3em] uppercase opacity-75" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
          Scroll to explore
        </span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  )
}

function CornerOrnament() {
  return (
    <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M4 4 L24 4 M4 4 L4 24 M4 4 Q28 10 36 28 Q44 36 60 36"
        stroke="#DFBF70"
        strokeWidth="1.2"
        opacity="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="24" cy="4" r="1.5" fill="#DFBF70" />
      <circle cx="4" cy="24" r="1.5" fill="#DFBF70" />
    </svg>
  )
}
