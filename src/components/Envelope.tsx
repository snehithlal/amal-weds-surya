import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")"

function GoldBotanicals() {
  return (
    <svg
      viewBox="0 0 580 400"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        color: 'rgba(212,175,55,0.45)',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.85">
        {/* Top flap gold decorative lines */}
        <path d="M 290 10 L 290 170" strokeDasharray="3 4" opacity="0.4" />
        <path d="M 40 20 Q 290 160 540 20" stroke="rgba(212,175,55,0.3)" strokeWidth="0.6" />
        {/* Corner leaves */}
        <path d="M 290 40 C 270 20, 240 30, 230 50 C 250 50, 275 42, 290 40 Z" fill="rgba(212,175,55,0.15)" stroke="currentColor" />
        <path d="M 290 40 C 310 20, 340 30, 350 50 C 330 50, 305 42, 290 40 Z" fill="rgba(212,175,55,0.15)" stroke="currentColor" />
      </g>
    </svg>
  )
}

const WAX_BLOB =
  `M50 4
   C 68 3, 85 12, 92 28
   C 99 44, 97 58, 91 72
   C 85 86, 70 96, 54 97
   C 38 98, 22 92, 12 78
   C 2 64, 1 47, 6 33
   C 11 17, 28 6, 44 4
   Z`

function WaxSeal() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="waxFill" cx="34%" cy="28%" r="82%">
          <stop offset="0%" stopColor="#435946" />
          <stop offset="40%" stopColor="#2E3E30" />
          <stop offset="85%" stopColor="#1A261B" />
          <stop offset="100%" stopColor="#0F1710" />
        </radialGradient>
        <radialGradient id="waxHighlight" cx="30%" cy="25%" r="45%">
          <stop offset="0%" stopColor="rgba(243,226,159,0.35)" />
          <stop offset="100%" stopColor="rgba(243,226,159,0)" />
        </radialGradient>
        <filter id="goldDrop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Wax Drop Shadows */}
      <path d={WAX_BLOB} fill="#0D140E" opacity="0.5" transform="translate(0, 4)" />
      <path d={WAX_BLOB} fill="#141E15" opacity="0.7" transform="translate(0, 2)" />

      {/* Base Wax Body */}
      <path d={WAX_BLOB} fill="url(#waxFill)" />

      {/* Organic Wax Rim & Highlights */}
      <path d={WAX_BLOB} fill="url(#waxHighlight)" />
      <path d={WAX_BLOB} fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8" opacity="0.7" />

      {/* Inner Pressed Wax Ring */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(243,226,159,0.7)" strokeWidth="1.2" filter="url(#goldDrop)" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.6" />

      {/* Laurel Wreath Ornament */}
      <g stroke="rgba(243,226,159,0.75)" strokeWidth="0.8" fill="none" strokeLinecap="round">
        <path d="M 24 50 C 24 35, 35 24, 50 24 C 65 24, 76 35, 76 50 C 76 65, 65 76, 50 76 C 35 76, 24 65, 24 50" strokeDasharray="2 3" opacity="0.6" />
      </g>

      {/* Monogram A & S */}
      <g filter="url(#goldDrop)">
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#F3E29F"
          fontFamily="'Pinyon Script', cursive"
          fontSize="24"
          fontWeight="bold"
          letterSpacing="0.02em"
        >
          A &amp; S
        </text>
      </g>
    </svg>
  )
}

const MEET = '46%'

const FLAPS = [
  { key: 'left', clip: `polygon(0 0, 0 100%, 50% ${MEET})`, origin: 'left center', opens: false, shade: 0.96 },
  { key: 'right', clip: `polygon(100% 0, 100% 100%, 50% ${MEET})`, origin: 'right center', opens: false, shade: 0.96 },
  { key: 'bottom', clip: `polygon(0 100%, 100% 100%, 50% ${MEET})`, origin: 'center bottom', opens: false, shade: 0.985 },
  { key: 'top', clip: `polygon(0 0, 100% 0, 50% ${MEET})`, origin: 'center top', opens: true, shade: 1.0 },
] as const

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [flapsBehind, setFlapsBehind] = useState(false)
  const reduced = useReducedMotion() ?? false
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))

    setPhase('opening')

    if (reduced) {
      setFlapsBehind(true)
      at(220, () => setPhase('done'))
      at(440, onOpen)
      return
    }

    at(620, () => setFlapsBehind(true))
    at(1700, () => setPhase('done'))
    at(2000, onOpen)
  }, [phase, reduced, onOpen])

  const open = phase === 'opening' || phase === 'done'

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
        background: 'radial-gradient(ellipse at 50% 45%, #FAF8F5 0%, #E2ECE5 60%, #C4D4C8 100%)',
        overflow: 'hidden',
        perspective: 1500,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        role="button"
        tabIndex={phase === 'idle' ? 0 : -1}
        aria-label="Open the wedding invitation"
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (phase === 'idle' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleOpen()
          }
        }}
        style={{
          position: 'relative',
          width: 'min(480px, 88vw)',
          aspectRatio: '1.45 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          filter: 'drop-shadow(0 24px 42px rgba(35,50,37,0.32))',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
      >
        {/* Envelope Base Body */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#FDFBF7',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #FDFBF7 0%, #F4F2EC 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 4,
            border: '1px solid rgba(212,175,55,0.3)',
          }}
          aria-hidden
        />

        {/* Inner Card */}
        <motion.div
          style={{
            position: 'absolute',
            left: '5%',
            top: '6%',
            width: '90%',
            height: '88%',
            zIndex: 2,
            background: 'linear-gradient(150deg, #FDFCF9 0%, #FAF7F0 100%)',
            border: '1px solid rgba(212,175,55,0.45)',
            borderRadius: 3,
            boxShadow: '0 10px 24px -10px rgba(35,50,37,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(8px, 2.4vw, 14px)',
            padding: 'clamp(16px, 5vw, 30px)',
            textAlign: 'center',
          }}
          initial={{ y: 0 }}
          animate={{ y: open ? '-72%' : 0 }}
          transition={{ duration: reduced ? 0.2 : 0.85, delay: reduced ? 0 : 0.62, ease: EASE }}
          aria-hidden
        >
          <div
            style={{
              position: 'absolute',
              inset: 9,
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: 2,
              pointerEvents: 'none',
            }}
          />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(8px, 2.2vw, 10px)',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              margin: 0,
            }}
          >
            You are warmly invited
          </p>

          <p
            className="gold-foil"
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontSize: 'clamp(28px, 7.5vw, 44px)',
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Amal &amp; Surya
          </p>

          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(10px, 2.6vw, 12px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              margin: 0,
            }}
          >
            {primaryEvent.dateDisplay}
          </p>
        </motion.div>

        {/* Triangular Envelope Flaps */}
        {FLAPS.map((f) => (
          <motion.div
            key={f.key}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: f.opens && flapsBehind ? 0 : 5,
              clipPath: f.clip,
              transformOrigin: f.origin,
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #FDFBF7 0%, #F5F2EA 55%, #EBE6DB 100%)`,
              backgroundBlendMode: 'multiply, normal',
              filter: `brightness(${f.shade}) drop-shadow(0 1px 3px rgba(35,50,37,0.25))`,
            }}
            animate={{ rotateX: open && f.opens ? -180 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
            aria-hidden
          >
            <GoldBotanicals />
            {/* Gold foil edge line on flap edge */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={
                  f.key === 'top' ? 'M 0 0 L 50 46 L 100 0' :
                  f.key === 'bottom' ? 'M 0 100 L 50 46 L 100 100' :
                  f.key === 'left' ? 'M 0 0 L 50 46 L 0 100' :
                  'M 100 0 L 50 46 L 100 100'
                }
                fill="none"
                stroke="rgba(212,175,55,0.4)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        ))}

        {/* Organic 3D Wax Seal Stamp */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(62px, 16vw, 84px)',
            height: 'clamp(62px, 16vw, 84px)',
            zIndex: 6,
            pointerEvents: 'none',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{ x: '-50%', y: '-50%', opacity: open ? 0 : 1, scale: open ? 0.78 : 1 }}
          transition={{ duration: reduced ? 0.15 : 0.34, ease: 'easeOut' }}
          aria-hidden
        >
          <WaxSeal />
        </motion.div>
      </motion.div>

      {/* Tap Instruction */}
      <motion.p
        style={{
          fontFamily: 'Marcellus, serif',
          fontSize: 10,
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: '#3A4B3C',
          margin: 0,
          pointerEvents: 'none',
        }}
        animate={{ opacity: phase === 'idle' ? [0.55, 1, 0.55] : 0 }}
        transition={
          phase === 'idle'
            ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
      >
        Tap to open invitation
      </motion.p>
    </motion.div>
  )
}
