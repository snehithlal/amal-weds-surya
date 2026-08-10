import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { heroPhoto } from '../lib/images'
import { primaryEvent, coupleNames, isReception } from '../lib/invite'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.5])

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
            {/* Main responsive cover image with Arjun's fit styling */}
            <img
              src={heroPhoto}
              alt={coupleNames}
              className="relative z-10 w-full h-full object-cover md:object-contain object-[center_12%] md:object-center animate-kenburns opacity-95"
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
              'linear-gradient(180deg, rgba(31,52,43,0.35) 0%, rgba(15,30,24,0.12) 50%, rgba(15,30,24,0.48) 100%)',
          }}
        />
      </motion.div>

      {/* Decorative Corner Flourishes */}
      <div className="absolute top-8 left-8 z-30 opacity-70" aria-hidden>
        <CornerOrnament />
      </div>
      <div className="absolute top-8 right-8 z-30 opacity-70 scale-x-[-1]" aria-hidden>
        <CornerOrnament />
      </div>

      {/* Hero Content Overlay */}
      <motion.div
        className="relative z-30 text-center px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.div
          className="inline-block px-5 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-heading text-[10px] sm:text-xs tracking-[0.45em] uppercase text-white/95 font-medium">
            Together with their families
          </span>
        </motion.div>

        <motion.h1
          className="font-script text-white text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] leading-none mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.85)) drop-shadow(0 2px 6px rgba(0,0,0,0.85))' }}
        >
          {coupleNames}
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-white/80 to-white/80" />
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M7 1 L8 6 L13 7 L8 8 L7 13 L6 8 L1 7 L6 6 Z" fill="#FFFFFF" opacity="0.95" />
          </svg>
          <span className="block h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-white/80 to-white/80" />
        </motion.div>

        <motion.p
          className="font-heading text-xs sm:text-sm tracking-[0.4em] uppercase text-white mt-4 font-medium"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          {isReception ? 'are celebrating their reception' : 'are celebrating their wedding'}
        </motion.p>

        <motion.p
          className="font-display italic text-lg sm:text-xl text-white/95 mt-4 tracking-[0.25em]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
        >
          {primaryEvent.dateDisplay}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/80"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}

function CornerOrnament() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        d="M4 4 L20 4 M4 4 L4 20 M4 4 Q24 8 32 24 Q40 32 56 32"
        stroke="#E5C687"
        strokeWidth="0.9"
        opacity="0.7"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="4" r="1.4" fill="#E5C687" opacity="0.8" />
      <circle cx="4" cy="20" r="1.4" fill="#E5C687" opacity="0.8" />
      <path
        d="M14 14 Q20 10 26 16 Q22 22 14 14 Z"
        fill="#E5C687"
        opacity="0.45"
      />
    </svg>
  )
}
