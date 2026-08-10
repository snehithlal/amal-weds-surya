import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent, coupleNames, monogramText } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")"

function GoldSprig() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
      <path d="M0 34 C 2 22, -2 12, 0 0" />
      {[0, 1, 2].map((i) => {
        const y = 26 - i * 8
        const s = 1 - i * 0.18
        return (
          <g key={i}>
            <path d={`M0 ${y} C ${-7 * s} ${y - 2}, ${-10 * s} ${y - 7}, ${-4 * s} ${y - 9}
                      C ${-1 * s} ${y - 7}, ${-1 * s} ${y - 3}, 0 ${y}`} />
            <path d={`M0 ${y - 4} C ${7 * s} ${y - 6}, ${10 * s} ${y - 11}, ${4 * s} ${y - 13}
                      C ${1 * s} ${y - 11}, ${1 * s} ${y - 7}, 0 ${y - 4}`} />
          </g>
        )
      })}
      <g transform="translate(0,-3)">
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-3.6" rx="2.1" ry="3.6" transform={`rotate(${i * 72})`} />
        ))}
        <circle cx="0" cy="0" r="1.1" />
      </g>
    </g>
  )
}

function EmbossSageBotanicals() {
  const placements = [
    { x: 74, y: 92, r: -18, s: 1.1 },
    { x: 226, y: 52, r: 12, s: 0.82 },
    { x: 386, y: 98, r: 24, s: 1.0 },
    { x: 512, y: 62, r: -10, s: 0.78 },
    { x: 128, y: 232, r: 8, s: 0.88 },
    { x: 336, y: 250, r: -14, s: 1.05 },
    { x: 500, y: 236, r: 18, s: 0.85 },
    { x: 240, y: 344, r: 4, s: 0.92 },
    { x: 52, y: 340, r: 32, s: 0.72 },
    { x: 428, y: 352, r: -28, s: 0.78 },
  ]

  return (
    <svg
      viewBox="0 0 580 400"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        color: 'rgba(90,135,120,0.28)',
        filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.9))',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      {placements.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y}) rotate(${p.r}) scale(${p.s})`}>
          <GoldSprig />
        </g>
      ))}
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
        <path d="M8 168 C 68 148, 110 188, 172 164" />
        <path d="M312 214 C 372 194, 414 234, 476 210" />
        <path d="M196 394 C 228 368, 288 368, 320 394" />
        <path d="M436 128 C 478 112, 520 140, 566 122" />
      </g>
    </svg>
  )
}

function SageGoldWaxSeal({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="goldWaxBase" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="35%" stopColor="#F7EAB7" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#A8842F" />
        </radialGradient>
        <radialGradient id="sageCenter" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#EBF4F1" />
          <stop offset="60%" stopColor="#D2E3DD" />
          <stop offset="100%" stopColor="#B4CDC4" />
        </radialGradient>
        <filter id="sealSageShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#3A5C52" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Realistic wax drip blobs */}
      <circle cx="28" cy="88" r="9" fill="#D4AF37" opacity="0.85" />
      <circle cx="94" cy="38" r="8" fill="#D4AF37" opacity="0.8" />
      <circle cx="98" cy="72" r="6" fill="#A8842F" opacity="0.75" />

      {/* Outer Wax Ring */}
      <path
        d="M60 8
           C 82 7, 106 18, 112 38
           C 118 58, 114 82, 98 100
           C 82 118, 54 116, 34 108
           C 14 100, 4 76, 8 52
           C 12 28, 38 9, 60 8 Z"
        fill="url(#goldWaxBase)"
        filter="url(#sealSageShadow)"
      />

      {/* Inner Beveled Ridge */}
      <circle cx="60" cy="60" r="42" fill="none" stroke="#FFF7D6" strokeWidth="1.5" opacity="0.9" />
      <circle cx="60" cy="60" r="38" fill="url(#sageCenter)" stroke="#C9A24B" strokeWidth="1" />

      {/* Inner Decorative Laurel */}
      <circle cx="60" cy="60" r="33" stroke="rgba(168,132,47,0.4)" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />

      {/* Monogram Text */}
      <text
        x="60"
        y="67"
        textAnchor="middle"
        fill="#96741C"
        fontFamily="'Pinyon Script', cursive"
        fontSize="28"
        fontWeight="bold"
        style={{ filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.8))' }}
      >
        {text}
      </text>
    </svg>
  )
}

const MEET = '46%'

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
        background: 'radial-gradient(ellipse at 50% 42%, #F6FAF8 0%, #E8F1EE 65%, #DAE6E2 100%)',
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
          width: 'min(450px, 88vw)',
          aspectRatio: '1.45 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          filter: 'drop-shadow(0 18px 32px rgba(60,90,82,0.22))',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        whileHover={phase === 'idle' ? { scale: 1.02, rotateX: 2, rotateY: -2 } : undefined}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
      >
        {/* Envelope Outer Soft Sage Mint Base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(155deg, #F4F9F7 0%, #E4ECE9 60%, #D6E3DF 100%)',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #F4F9F7 0%, #E4ECE9 60%, #D6E3DF 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 4,
            border: '1px solid rgba(212,175,55,0.45)',
          }}
          aria-hidden
        />

        {/* Inner Card / Letter */}
        <motion.div
          style={{
            position: 'absolute',
            left: '6%',
            top: '7%',
            width: '88%',
            height: '86%',
            zIndex: 2,
            background: 'linear-gradient(150deg, #FFFFFF 0%, #F8FCFA 100%)',
            border: '1px solid rgba(201,162,75,0.45)',
            borderRadius: 2,
            boxShadow: '0 10px 22px -12px rgba(50,80,72,0.3)',
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
              border: '1px solid rgba(201,162,75,0.3)',
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
              color: 'var(--ink-soft)',
              margin: 0,
            }}
          >
            You are warmly invited
          </p>

          <p
            className="gold-foil"
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontSize: 'clamp(24px, 6.8vw, 40px)',
              lineHeight: 1.1,
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {coupleNames}
          </p>

          <div style={{ width: 52, height: 1, background: 'rgba(201,162,75,0.5)' }} />

          <p
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(10px, 2.6vw, 12px)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--emerald)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {primaryEvent.dateDisplay}
          </p>
        </motion.div>

        {/* Bottom Flap Pocket */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            clipPath: `polygon(0 100%, 100% 100%, 50% ${MEET})`,
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(180deg, #EEF5F2 0%, #DCE7E3 100%)`,
            backgroundBlendMode: 'multiply, normal',
            filter: 'brightness(0.97) drop-shadow(0 -1px 2px rgba(60,90,82,0.15))',
          }}
          aria-hidden
        >
          <EmbossSageBotanicals />
        </div>

        {/* Side Flaps */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            clipPath: `polygon(0 0, 0 100%, 50% ${MEET})`,
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(135deg, #E4ECE9 0%, #D6E3DF 100%)`,
            backgroundBlendMode: 'multiply, normal',
            filter: 'brightness(0.955)',
          }}
          aria-hidden
        >
          <EmbossSageBotanicals />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            clipPath: `polygon(100% 0, 100% 100%, 50% ${MEET})`,
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(225deg, #E4ECE9 0%, #D6E3DF 100%)`,
            backgroundBlendMode: 'multiply, normal',
            filter: 'brightness(0.955)',
          }}
          aria-hidden
        >
          <EmbossSageBotanicals />
        </div>

        {/* Top Opening V-Flap */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: open && flapsBehind ? 0 : 5,
            clipPath: `polygon(0 0, 100% 0, 50% ${MEET})`,
            transformOrigin: 'center top',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(160deg, #F4F9F7 0%, #E0ECE8 100%)`,
            backgroundBlendMode: 'multiply, normal',
            filter: 'brightness(1) drop-shadow(0 2px 4px rgba(60,90,82,0.2))',
          }}
          animate={{ rotateX: open ? -180 : 0 }}
          transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
          aria-hidden
        >
          <EmbossSageBotanicals />
          {/* Subtle Gold Edge Trim Line */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', stroke: 'rgba(212,175,55,0.7)', strokeWidth: '0.5', fill: 'none' }}>
            <path d="M0 0 L50 46 L100 0" />
          </svg>
        </motion.div>

        {/* Sage & Gold Wax Seal */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(54px, 15vw, 76px)',
            height: 'clamp(54px, 15vw, 76px)',
            zIndex: 6,
            pointerEvents: 'none',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{ x: '-50%', y: '-50%', opacity: open ? 0 : 1, scale: open ? 0.78 : 1 }}
          transition={{ duration: reduced ? 0.15 : 0.34, ease: 'easeOut' }}
          aria-hidden
        >
          <SageGoldWaxSeal text={monogramText} />
        </motion.div>
      </motion.div>

      <motion.p
        style={{
          fontFamily: 'Marcellus, serif',
          fontSize: 10,
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: '#4A635B',
          margin: 0,
          pointerEvents: 'none',
        }}
        animate={{ opacity: phase === 'idle' ? [0.5, 1, 0.5] : 0 }}
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
