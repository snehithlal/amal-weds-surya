import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent, inviteKind } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE_PAPER = [0.16, 1, 0.3, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")"

/* Photorealistic White Rose Bouquet with lush leaves & baby's breath */
function FloralCluster({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isTopLeft = position === 'top-left'
  return (
    <svg
      viewBox="0 0 160 160"
      width="125"
      height="125"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '-34px', left: '-34px', transform: 'rotate(-10deg)' }
          : { bottom: '-34px', right: '-34px', transform: 'rotate(170deg)' }),
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

const MEET = '46%'

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [topFlapOpen, setTopFlapOpen] = useState(false)
  const [flapsBehind, setFlapsBehind] = useState(false)
  const [cardSlideUp, setCardSlideUp] = useState(false)
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
      setTopFlapOpen(true)
      setFlapsBehind(true)
      setCardSlideUp(true)
      at(300, () => setPhase('done'))
      at(500, onOpen)
      return
    }

    // Phase 1 (0ms - 300ms): Wax seal dissolves
    // Phase 2 (300ms): Top Flap begins flipping open
    at(300, () => setTopFlapOpen(true))

    // Phase 3 (750ms): Top flap passes 90 degrees -> move behind card
    at(750, () => setFlapsBehind(true))

    // Phase 4 (900ms): Card slides UP out of envelope pocket
    at(900, () => setCardSlideUp(true))

    // Phase 5 (2100ms): Finish & Transition to Main Page
    at(2100, () => setPhase('done'))
    at(2400, onOpen)
  }, [phase, reduced, onOpen])

  const isReception = inviteKind === 'reception'
  const eventTitle = isReception ? 'Wedding Reception' : 'Wedding Ceremony'
  const dateText = primaryEvent.dateDisplay // '06 . 09 . 2026' for reception, '30 . 08 . 2026' for wedding

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
        backgroundImage: `${PAPER_GRAIN}, radial-gradient(ellipse at 50% 40%, #FAF8F5 0%, #EAE6DB 65%, #D4CCBB 100%)`,
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
        className="text-center"
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
            marginBottom: 6,
            fontWeight: 500,
            textShadow: '0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          Together with their families
        </p>
        <h1
          style={{
            fontFamily: '"Pinyon Script", cursive',
            fontSize: 'clamp(34px, 8.8vw, 56px)',
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
          width: 'min(380px, 86vw)',
          aspectRatio: '1.45 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE_PAPER }}
      >
        {/* Ground Contact Shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-16%',
            left: '4%',
            width: '92%',
            height: '26%',
            background: 'radial-gradient(ellipse at center, rgba(12,20,13,0.5) 0%, rgba(12,20,13,0.18) 50%, transparent 75%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* White Rose Bouquets */}
        <FloralCluster position="top-left" />
        <FloralCluster position="bottom-right" />

        {/* LAYER 1: Envelope Interior Pocket Back Wall */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#2A382A',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #384A37 0%, #2A382A 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 16px 40px rgba(12,20,13,0.4)',
          }}
          aria-hidden
        />

        {/* LAYER 2: Inner Invitation Card */}
        <motion.div
          style={{
            position: 'absolute',
            left: '5%',
            top: '6%',
            width: '90%',
            height: '88%',
            zIndex: flapsBehind ? 10 : 2,
            background: 'linear-gradient(150deg, #FDFCF9 0%, #F6F3EA 100%)',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(150deg, #FDFCF9 0%, #F6F3EA 100%)`,
            backgroundBlendMode: 'multiply, normal',
            border: '1px solid rgba(212,175,55,0.45)',
            borderRadius: 4,
            boxShadow: '0 12px 28px -8px rgba(20,30,21,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(6px, 2vw, 12px)',
            padding: 'clamp(14px, 4vw, 24px)',
            textAlign: 'center',
          }}
          initial={{ y: 0, scale: 0.98 }}
          animate={{
            y: cardSlideUp ? '-80%' : 0,
            scale: cardSlideUp ? 1.02 : 0.98,
          }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE_PAPER }}
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
            Inviting you to our
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

          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

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

        {/* LAYER 3: Bottom, Left, Right Front Flaps */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            clipPath: `polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% ${MEET})`,
            pointerEvents: 'none',
          }}
        >
          {/* Left Flap */}
          <div
            style={{
              position: 'absolute', inset: 0,
              clipPath: `polygon(0 0, 0 100%, 50% ${MEET})`,
              background: 'linear-gradient(135deg, #5C6E52 0%, #46573C 45%, #34442A 100%)',
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(135deg, #5C6E52 0%, #46573C 45%, #34442A 100%)`,
              backgroundBlendMode: 'multiply, normal',
            }}
          />
          {/* Right Flap */}
          <div
            style={{
              position: 'absolute', inset: 0,
              clipPath: `polygon(100% 0, 100% 100%, 50% ${MEET})`,
              background: 'linear-gradient(225deg, #647759 0%, #4D5F43 45%, #36472C 100%)',
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(225deg, #647759 0%, #4D5F43 45%, #36472C 100%)`,
              backgroundBlendMode: 'multiply, normal',
            }}
          />
          {/* Bottom Flap */}
          <div
            style={{
              position: 'absolute', inset: 0,
              clipPath: `polygon(0 100%, 100% 100%, 50% ${MEET})`,
              background: 'linear-gradient(0deg, #627557 0%, #495B40 50%, #304027 100%)',
              backgroundImage: `${PAPER_GRAIN}, linear-gradient(0deg, #627557 0%, #495B40 50%, #304027 100%)`,
              backgroundBlendMode: 'multiply, normal',
            }}
          />

          {/* Crease Shadow Lines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 0 0 L 50 46 L 0 100 M 100 0 L 50 46 L 100 100 M 0 100 L 50 46 L 100 100" fill="none" stroke="rgba(10,18,11,0.35)" strokeWidth="0.8" />
            <path d="M 0 1 L 50 47 L 0 100 M 100 1 L 50 47 L 100 100 M 0 100 L 50 47 L 100 100" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* LAYER 4: Top Flap (Flips Open 180deg) */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: topFlapOpen && flapsBehind ? 0 : 6,
            clipPath: `polygon(0 0, 100% 0, 50% ${MEET})`,
            transformOrigin: 'center top',
            background: 'linear-gradient(180deg, #748866 0%, #566849 35%, #3C4D32 80%, #293820 100%)',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(180deg, #748866 0%, #566849 35%, #3C4D32 80%, #293820 100%)`,
            backgroundBlendMode: 'multiply, normal',
            filter: 'drop-shadow(0 8px 16px rgba(12,20,13,0.45))',
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: topFlapOpen ? -180 : 0 }}
          transition={{ duration: reduced ? 0.2 : 0.85, ease: EASE_PAPER }}
          aria-hidden
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path d="M 0 0 L 50 46 L 100 0" fill="none" stroke="rgba(10,18,11,0.4)" strokeWidth="0.9" />
            <path d="M 0 1 L 50 47 L 100 1" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* LAYER 5: Photorealistic Transparent Gold Wax Seal Stamp */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(58px, 16vw, 78px)',
            height: 'clamp(58px, 16vw, 78px)',
            zIndex: 15,
            pointerEvents: 'none',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{
            x: '-50%',
            y: '-50%',
            opacity: topFlapOpen ? 0 : 1,
            scale: topFlapOpen ? 0.75 : 1,
          }}
          transition={{ duration: reduced ? 0.15 : 0.32, ease: 'easeOut' }}
          aria-hidden
        >
          <img
            src="./images/gold_wax_seal_transparent.png"
            alt="Photorealistic Gold Wax Seal A&S"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 6px 14px rgba(12,20,13,0.5))',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom Call to Action Text: "CLICK TO OPEN..." */}
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
          textShadow: '0 1px 0 rgba(255,255,255,0.8)',
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
