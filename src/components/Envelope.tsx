import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")"

/* White Roses & Baby's Breath Floral Bouquet Component */
function FloralCluster({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isTopLeft = position === 'top-left'
  return (
    <svg
      viewBox="0 0 140 140"
      width="110"
      height="110"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '-28px', left: '-28px', transform: 'rotate(-12deg)' }
          : { bottom: '-28px', right: '-28px', transform: 'rotate(168deg)' }),
        zIndex: 12,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 10px rgba(25,35,26,0.25))',
      }}
      aria-hidden
    >
      <defs>
        <radialGradient id="roseWhite" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FAF7F0" />
          <stop offset="100%" stopColor="#EAE5D8" />
        </radialGradient>
        <radialGradient id="roseCenter" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="100%" stopColor="#E6D3A3" />
        </radialGradient>
      </defs>

      {/* Leaves & Greenery */}
      <g stroke="#3B4C3A" strokeWidth="0.8">
        <path d="M 60 70 C 40 30, 20 40, 10 20 C 30 30, 45 45, 60 70 Z" fill="#586C59" />
        <path d="M 70 60 C 40 20, 50 10, 30 0 C 45 20, 55 40, 70 60 Z" fill="#6B7F6D" />
        <path d="M 70 70 C 100 30, 120 40, 130 20 C 110 30, 95 45, 70 70 Z" fill="#4B5E4D" />
        <path d="M 80 80 C 110 110, 120 90, 140 100 C 115 95, 95 85, 80 80 Z" fill="#586C59" />
      </g>

      {/* Baby's Breath Small White Berries/Blossoms */}
      <g fill="#FFFFFF" stroke="#D4CBB8" strokeWidth="0.5">
        <circle cx="25" cy="35" r="3.5" />
        <circle cx="32" cy="24" r="2.8" />
        <circle cx="18" cy="45" r="3" />
        <circle cx="115" cy="35" r="3.5" />
        <circle cx="105" cy="22" r="2.8" />
        <circle cx="122" cy="48" r="3" />
      </g>

      {/* Main White Rose 1 */}
      <g transform="translate(48, 48)">
        <circle cx="20" cy="20" r="24" fill="url(#roseWhite)" />
        <path
          d="M 12 12 C 18 6, 28 6, 32 14 C 28 22, 18 24, 12 12 Z"
          fill="url(#roseCenter)"
          stroke="#D8CCA8"
          strokeWidth="0.6"
        />
        <path
          d="M 6 20 C 6 10, 20 4, 30 6 C 34 16, 22 28, 6 20 Z"
          fill="none"
          stroke="#D8CCA8"
          strokeWidth="0.8"
          opacity="0.8"
        />
        <path
          d="M 10 30 C 4 20, 16 12, 28 14 C 36 24, 24 34, 10 30 Z"
          fill="none"
          stroke="#D8CCA8"
          strokeWidth="0.7"
          opacity="0.7"
        />
        <circle cx="20" cy="18" r="5" fill="#EADBA8" opacity="0.9" />
      </g>

      {/* Secondary Rose 2 */}
      <g transform="translate(22, 62) scale(0.75)">
        <circle cx="20" cy="20" r="22" fill="url(#roseWhite)" />
        <circle cx="18" cy="16" r="6" fill="#EADBA8" opacity="0.85" />
        <path d="M 8 16 C 8 8, 24 4, 28 16 Z" fill="none" stroke="#D8CCA8" strokeWidth="0.7" />
      </g>

      {/* Secondary Rose 3 */}
      <g transform="translate(72, 28) scale(0.65)">
        <circle cx="20" cy="20" r="22" fill="url(#roseWhite)" />
        <circle cx="18" cy="16" r="6" fill="#EADBA8" opacity="0.85" />
      </g>
    </svg>
  )
}

/* Yellow-Gold Wax Seal Component matching the phone screenshot */
const WAX_BLOB =
  `M50 4
   C 68 3, 85 12, 92 28
   C 99 44, 97 58, 91 72
   C 85 86, 70 96, 54 97
   C 38 98, 22 92, 12 78
   C 2 64, 1 47, 6 33
   C 11 17, 28 6, 44 4
   Z`

function YellowGoldWaxSeal() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="goldWaxFill" cx="34%" cy="28%" r="82%">
          <stop offset="0%" stopColor="#FFE885" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="75%" stopColor="#C49B28" />
          <stop offset="100%" stopColor="#967215" />
        </radialGradient>
        <radialGradient id="goldWaxHighlight" cx="30%" cy="25%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="waxShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(20,30,22,0.4)" />
        </filter>
      </defs>

      {/* Wax Drop Shadows */}
      <path d={WAX_BLOB} fill="#1C291D" opacity="0.4" transform="translate(0, 3)" />

      {/* Base Golden Wax Body */}
      <path d={WAX_BLOB} fill="url(#goldWaxFill)" />
      <path d={WAX_BLOB} fill="url(#goldWaxHighlight)" />

      {/* Wax Rim Outlines */}
      <path d={WAX_BLOB} fill="none" stroke="#FFF2B2" strokeWidth="1" opacity="0.75" />
      <path d={WAX_BLOB} fill="none" stroke="#84630F" strokeWidth="0.8" opacity="0.6" />

      {/* Inner Pressed Ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="#7A5A0C" strokeWidth="1.2" opacity="0.65" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#FFF2B2" strokeWidth="0.8" opacity="0.85" />

      {/* Monogram A & S */}
      <g filter="url(#waxShadow)">
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#4A3606"
          fontFamily="'Pinyon Script', cursive"
          fontSize="24"
          fontWeight="bold"
        >
          A &amp; S
        </text>
      </g>
    </svg>
  )
}

const MEET = '46%'

const FLAPS = [
  { key: 'left', clip: `polygon(0 0, 0 100%, 50% ${MEET})`, origin: 'left center', opens: false, shade: 0.94 },
  { key: 'right', clip: `polygon(100% 0, 100% 100%, 50% ${MEET})`, origin: 'right center', opens: false, shade: 0.94 },
  { key: 'bottom', clip: `polygon(0 100%, 100% 100%, 50% ${MEET})`, origin: 'center bottom', opens: false, shade: 0.97 },
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
        gap: 'clamp(20px, 4vh, 36px)',
        padding: '24px 16px',
        background: '#FAF8F5',
        backgroundImage: `${PAPER_GRAIN}, radial-gradient(ellipse at 50% 40%, #FAF8F5 0%, #F0EDE5 100%)`,
        overflow: 'hidden',
        perspective: 1500,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Header Text matching phone screenshot */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p
          style={{
            fontFamily: 'Marcellus, serif',
            fontSize: 'clamp(10px, 2.8vw, 12px)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#3A4B3C',
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          Together with their families
        </p>
        <h1
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: 'clamp(32px, 8.5vw, 54px)',
            color: '#3A4B3C',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Amal &amp; Surya
        </h1>
      </motion.div>

      {/* Main Olive Envelope Wrapper */}
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
          width: 'min(380px, 86vw)',
          aspectRatio: '1.42 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          filter: 'drop-shadow(0 16px 36px rgba(35,50,37,0.30))',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
      >
        {/* Floral Bouquets at Top-Left and Bottom-Right */}
        <FloralCluster position="top-left" />
        <FloralCluster position="bottom-right" />

        {/* Envelope Base Body (Solid Deep Olive Green) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#445543',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #4A5C49 0%, #3B4B3A 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          aria-hidden
        />

        {/* Inner Ivory Card */}
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
            borderRadius: 4,
            boxShadow: '0 10px 24px -10px rgba(35,50,37,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(6px, 2vw, 12px)',
            padding: 'clamp(14px, 4vw, 24px)',
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
              inset: 8,
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
              fontSize: 'clamp(26px, 7vw, 42px)',
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Amal &amp; Surya
          </p>

          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(9px, 2.4vw, 11px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              margin: 0,
            }}
          >
            {primaryEvent.dateDisplay}
          </p>
        </motion.div>

        {/* Triangular Olive Envelope Flaps */}
        {FLAPS.map((f) => (
          <motion.div
            key={f.key}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: f.opens && flapsBehind ? 0 : 5,
              clipPath: f.clip,
              transformOrigin: f.origin,
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #4A5C49 0%, #3F503E 55%, #344333 100%)`,
              backgroundBlendMode: 'multiply, normal',
              filter: `brightness(${f.shade}) drop-shadow(0 1px 3px rgba(20,30,22,0.35))`,
            }}
            animate={{ rotateX: open && f.opens ? -180 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
            aria-hidden
          >
            {/* Flap crease lines */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={
                  f.key === 'top' ? 'M 0 0 L 50 46 L 100 0' :
                  f.key === 'bottom' ? 'M 0 100 L 50 46 L 100 100' :
                  f.key === 'left' ? 'M 0 0 L 50 46 L 0 100' :
                  'M 100 0 L 50 46 L 100 100'
                }
                fill="none"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="0.6"
              />
            </svg>
          </motion.div>
        ))}

        {/* Yellow-Gold Wax Seal Stamp Centered on Flap Meeting Point */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(56px, 15vw, 76px)',
            height: 'clamp(56px, 15vw, 76px)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{ x: '-50%', y: '-50%', opacity: open ? 0 : 1, scale: open ? 0.78 : 1 }}
          transition={{ duration: reduced ? 0.15 : 0.34, ease: 'easeOut' }}
          aria-hidden
        >
          <YellowGoldWaxSeal />
        </motion.div>
      </motion.div>

      {/* Bottom Text matching phone screenshot: "CLICK TO OPEN..." */}
      <motion.p
        style={{
          fontFamily: 'Marcellus, serif',
          fontSize: 'clamp(11px, 3vw, 13px)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#3A4B3C',
          margin: 0,
          fontWeight: 500,
          pointerEvents: 'none',
        }}
        animate={{ opacity: phase === 'idle' ? [0.6, 1, 0.6] : 0 }}
        transition={
          phase === 'idle'
            ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
      >
        CLICK TO OPEN...
      </motion.p>
    </motion.div>
  )
}
