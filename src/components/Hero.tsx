import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { heroPhoto } from '../lib/images'
import { primaryEvent, coupleNames, isReception } from '../lib/invite'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.65])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full Page Couple Photo Cover Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {heroPhoto ? (
          <>
            {/* Ambient blurred backdrop */}
            <img
              src={heroPhoto}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 opacity-40"
            />
            {/* Main responsive cover image focused on couple faces */}
            <img
              src={heroPhoto}
              alt={coupleNames}
              className="relative z-10 w-full h-full object-cover object-[center_18%] md:object-center opacity-95"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pearl via-sage-mist to-sage-light/40" />
        )}
        <motion.div
          className="absolute inset-0 z-20"
          style={{
            opacity: overlayOpacity,
            background:
              'linear-gradient(180deg, rgba(15,30,24,0.48) 0%, rgba(15,30,24,0.22) 50%, rgba(15,30,24,0.72) 100%)',
          }}
        />
      </motion.div>

      {/* Decorative Corner Flourishes */}
      <div className="absolute top-8 left-8 z-30 opacity-75" aria-hidden>
        <CornerOrnament />
      </div>
      <div className="absolute top-8 right-8 z-30 opacity-75 scale-x-[-1]" aria-hidden>
        <CornerOrnament />
      </div>

      {/* Hero Content Overlay */}
      <motion.div
        className="relative z-30 text-center px-6 max-w-4xl mx-auto pt-12 md:pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.div
          className="inline-block px-5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/40 shadow-sm mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-heading text-[10px] sm:text-xs tracking-[0.45em] uppercase text-white font-medium">
            Together with their families
          </span>
        </motion.div>

        {/* Elegant Lighter Script Title */}
        <motion.h1
          className="font-script text-white text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-none mb-5 font-normal"
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.85)) drop-shadow(0 1px 3px rgba(0,0,0,0.9))',
          }}
        >
          {coupleNames}
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/80 to-white/80" />
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden>
            <path d="M7 1 L8 6 L13 7 L8 8 L7 13 L6 8 L1 7 L6 6 Z" fill="#FFFFFF" opacity="0.9" />
          </svg>
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-white/80 to-white/80" />
        </motion.div>

        <motion.p
          className="font-heading text-xs sm:text-sm tracking-[0.38em] uppercase text-white mt-3 font-medium"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
        >
          {isReception ? 'are celebrating their reception' : 'are celebrating their wedding'}
        </motion.p>

        <motion.p
          className="font-display italic font-normal text-base sm:text-lg text-white/95 mt-3 tracking-[0.22em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
        >
          {primaryEvent.dateDisplay}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/90"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ChevronDown size={24} style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.85))' }} />
      </motion.div>
    </section>
  )
}

function CornerOrnament() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M4 4 L20 4 M4 4 L4 20 M4 4 Q24 8 32 24 Q40 32 56 32"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        opacity="0.85"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="4" r="1.5" fill="#FFFFFF" />
      <circle cx="4" cy="20" r="1.5" fill="#FFFFFF" />
      <path
        d="M14 14 Q20 10 26 16 Q22 22 14 14 Z"
        fill="#FFFFFF"
        opacity="0.55"
      />
    </svg>
  )
}
