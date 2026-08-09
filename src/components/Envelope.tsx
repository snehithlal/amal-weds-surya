import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent, inviteKind } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

/* Photorealistic White Rose Bouquet with lush leaves & baby's breath */
function FloralCluster({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isTopLeft = position === 'top-left'
  return (
    <svg
      viewBox="0 0 160 160"
      width="120"
      height="120"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '-30px', left: '-30px', transform: 'rotate(-10deg)' }
          : { bottom: '-30px', right: '-30px', transform: 'rotate(170deg)' }),
        zIndex: 12,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 14px rgba(15,25,16,0.35))',
      }}
      aria-hidden
    >
      <defs>
        <radialGradient id="roseSoft" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F9F6EE" />
          <stop offset="85%" stopColor="#EDE6D5" />
          <stop offset="100%" stopColor="#DCD2C0" />
        </radialGradient>
        <radialGradient id="roseInnerWarmth" cx="42%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#FFF7DF" />
          <stop offset="60%" stopColor="#F2E1B6" />
          <stop offset="100%" stopColor="#DFCC9C" />
        </radialGradient>
        <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C826E" />
          <stop offset="50%" stopColor="#4F6451" />
          <stop offset="100%" stopColor="#364738" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5A6F5C" />
          <stop offset="50%" stopColor="#425444" />
          <stop offset="100%" stopColor="#2A382C" />
        </linearGradient>
        <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#202A21" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Leaves Base */}
      <g stroke="#263428" strokeWidth="0.6">
        <path d="M 68 80 C 42 32, 22 45, 8 22 C 32 32, 48 50, 68 80 Z" fill="url(#leafGrad1)" />
        <path d="M 80 68 C 45 22, 58 10, 32 0 C 50 22, 62 45, 80 68 Z" fill="url(#leafGrad2)" />
        <path d="M 80 80 C 115 32, 138 45, 148 22 C 122 32, 105 50, 80 80 Z" fill="url(#leafGrad1)" />
        <path d="M 85 92 C 122 122, 135 100, 155 110 C 125 105, 102 95, 85 92 Z" fill="url(#leafGrad2)" />
      </g>

      {/* Baby's Breath Blossoms */}
      <g fill="#FFFFFF" stroke="#D3C8B4" strokeWidth="0.5" filter="url(#petalShadow)">
        <circle cx="24" cy="38" r="3.8" />
        <circle cx="34" cy="24" r="3" />
        <circle cx="16" cy="50" r="3.2" />
        <circle cx="128" cy="38" r="3.8" />
        <circle cx="116" cy="24" r="3" />
        <circle cx="136" cy="52" r="3.2" />
      </g>

      {/* Main White Rose */}
      <g transform="translate(54, 54)" filter="url(#petalShadow)">
        <circle cx="22" cy="22" r="26" fill="url(#roseSoft)" />
        <path d="M -2 22 C -2 8, 12 -2, 26 -2 C 34 8, 30 26, 14 26 C 2 26, -2 22, -2 22 Z" fill="#F4EFE2" opacity="0.9" />
        <path d="M 22 -2 C 36 -2, 46 12, 46 26 C 36 34, 18 30, 18 14 C 18 2, 22 -2, 22 -2 Z" fill="#EDE6D5" opacity="0.85" />
        <path d="M 46 22 C 46 36, 32 46, 18 46 C 10 36, 14 18, 30 18 C 42 18, 46 22, 46 22 Z" fill="#F6F1E6" opacity="0.95" />

        <path
          d="M 12 14 C 18 6, 30 6, 34 16 C 30 24, 18 26, 12 14 Z"
          fill="url(#roseInnerWarmth)"
          stroke="#DACCA7"
          strokeWidth="0.6"
        />
        <circle cx="22" cy="20" r="5.5" fill="#E8D8A6" opacity="0.95" />
      </g>

      {/* Side Roses */}
      <g transform="translate(24, 68) scale(0.72)" filter="url(#petalShadow)">
        <circle cx="22" cy="22" r="24" fill="url(#roseSoft)" />
        <circle cx="20" cy="18" r="7" fill="#E8D8A6" opacity="0.9" />
      </g>
      <g transform="translate(82, 30) scale(0.65)" filter="url(#petalShadow)">
        <circle cx="22" cy="22" r="24" fill="url(#roseSoft)" />
        <circle cx="20" cy="18" r="7" fill="#E8D8A6" opacity="0.9" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------------- seal */

const WAX_BLOB =
  `M50 6
   C 66 5, 82 14, 89 29
   C 96 43, 95 55, 90 68
   C 85 81, 72 92, 56 94
   C 41 96, 25 91, 15 79
   C 5 67, 3 51, 7 37
   C 12 21, 27 8, 42 6
   Z`

function WaxSeal() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="waxGoldFill" cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#FFF2B3" />
          <stop offset="35%" stopColor="#E5C158" />
          <stop offset="70%" stopColor="#BD9422" />
          <stop offset="100%" stopColor="#6E5109" />
        </radialGradient>
        <radialGradient id="waxGoldRim" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(60,42,4,0.6)" />
        </radialGradient>
      </defs>

      <ellipse cx="18" cy="76" rx="7" ry="5" fill="#8C6A10" opacity="0.9" />
      <ellipse cx="84" cy="40" rx="6" ry="4.4" fill="#8C6A10" opacity="0.85" />

      <path d={WAX_BLOB} fill="url(#waxGoldFill)" />
      <path d={WAX_BLOB} fill="url(#waxGoldRim)" />

      <ellipse cx="36" cy="30" rx="19" ry="14" fill="rgba(255,255,255,0.3)" transform="rotate(-24 36 30)" />

      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="#FFF9D6"
        fontFamily="'Pinyon Script', cursive"
        fontSize="22"
        fontWeight="bold"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(70,50,5,0.8))' }}
      >
        A &amp; S
      </text>
    </svg>
  )
}

/* ----------------------------------------------------------------- envelope */

const MEET = '46%'

const FLAPS = [
  { key: 'left', clip: `polygon(0 0, 0 100%, 50% ${MEET})`, origin: 'left center', opens: false, shade: 0.94 },
  { key: 'right', clip: `polygon(100% 0, 100% 100%, 50% ${MEET})`, origin: 'right center', opens: false, shade: 0.94 },
  { key: 'bottom', clip: `polygon(0 100%, 100% 100%, 50% ${MEET})`, origin: 'center bottom', opens: false, shade: 0.97 },
  { key: 'top', clip: `polygon(0 0, 100% 0, 50% ${MEET})`, origin: 'center top', opens: true, shade: 1 },
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
  const isReception = inviteKind === 'reception'
  const eventTitle = isReception ? 'Wedding Reception' : 'Wedding Ceremony'
  const dateText = primaryEvent.dateDisplay

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
        gap: 28,
        background: 'radial-gradient(ellipse at 50% 42%, #FAF8F5 0%, #EBE7DC 62%, #D6CFBE 100%)',
        overflow: 'hidden',
        perspective: 1500,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Header Text */}
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p
          style={{
            fontFamily: 'Marcellus, serif',
            fontSize: 'clamp(10px, 2.8vw, 12px)',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#3A4B3C',
            marginBottom: 4,
            fontWeight: 500,
            textShadow: '0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          Together with their families
        </p>
        <h1
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: 'clamp(34px, 8.8vw, 54px)',
            color: '#3A4B3C',
            lineHeight: 1.1,
            margin: 0,
            filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.9))',
          }}
        >
          Amal &amp; Surya
        </h1>
      </motion.div>

      {/* Main 3D Olive Envelope Container */}
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
          width: 'min(420px, 86vw)',
          aspectRatio: '1.45 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          filter: 'drop-shadow(0 18px 30px rgba(25,35,26,0.32))',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
      >
        {/* White Rose Bouquets */}
        <FloralCluster position="top-left" />
        <FloralCluster position="bottom-right" />

        {/* Envelope body (Solid Rich Olive Green with Paper Grain) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(155deg, #4A5B49 0%, #3A4B3C 55%, #2B3A2C 100%)',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #4A5B49 0%, #3A4B3C 55%, #2B3A2C 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 3,
          }}
          aria-hidden
        />

        {/* Letter */}
        <motion.div
          style={{
            position: 'absolute',
            left: '6%',
            top: '7%',
            width: '88%',
            height: '86%',
            zIndex: 2,
            background: 'linear-gradient(150deg, #FDFCF9 0%, #F6F3EA 100%)',
            border: '1px solid rgba(212,175,55,0.45)',
            borderRadius: 2,
            boxShadow: '0 10px 22px -12px rgba(20,30,21,0.45)',
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
              border: '1px solid rgba(212,175,55,0.32)',
              borderRadius: 1,
              pointerEvents: 'none',
            }}
          />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(8px, 2.2vw, 10px)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              margin: 0,
            }}
          >
            Inviting you to our
          </p>

          <p
            className="gold-foil"
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontSize: 'clamp(26px, 7.2vw, 42px)',
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Amal &amp; Surya
          </p>

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(9px, 2.4vw, 11px)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
              margin: 0,
            }}
          >
            {eventTitle}
          </p>

          <div style={{ width: 52, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(10px, 2.6vw, 12px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {dateText}
          </p>
        </motion.div>

        {/* Four X-fold flaps */}
        {FLAPS.map((f) => (
          <motion.div
            key={f.key}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: f.opens && flapsBehind ? 0 : 5,
              clipPath: f.clip,
              transformOrigin: f.origin,
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #4F614E 0%, #3F503E 55%, #30412F 100%)`,
              backgroundBlendMode: 'multiply, normal',
              filter: `brightness(${f.shade}) drop-shadow(0 1px 2px rgba(15,25,16,0.35))`,
            }}
            animate={{ rotateX: open && f.opens ? -180 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
            aria-hidden
          />
        ))}

        {/* Wax seal at the fold centre */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(56px, 16vw, 78px)',
            height: 'clamp(56px, 16vw, 78px)',
            zIndex: 6,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 3px 6px rgba(15,25,16,0.45))',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{ x: '-50%', y: '-50%', opacity: open ? 0 : 1, scale: open ? 0.78 : 1 }}
          transition={{ duration: reduced ? 0.15 : 0.34, ease: 'easeOut' }}
          aria-hidden
        >
          <WaxSeal />
        </motion.div>
      </motion.div>

      {/* Prompt */}
      <motion.p
        style={{
          fontFamily: 'Marcellus, serif',
          fontSize: 11,
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: '#3A4B3C',
          margin: 0,
          pointerEvents: 'none',
          fontWeight: 500,
        }}
        animate={{ opacity: phase === 'idle' ? [0.5, 1, 0.5] : 0 }}
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
