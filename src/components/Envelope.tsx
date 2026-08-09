import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

/* High-realism tactile paper noise grain filter */
const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")"

/* White Roses & Baby's Breath Floral Bouquet with soft realistic petal shading & contact shadows */
function RealisticFloralCluster({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isTopLeft = position === 'top-left'
  return (
    <svg
      viewBox="0 0 160 160"
      width="120"
      height="120"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '-32px', left: '-32px', transform: 'rotate(-10deg)' }
          : { bottom: '-32px', right: '-32px', transform: 'rotate(170deg)' }),
        zIndex: 12,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 14px rgba(15,25,16,0.38))',
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

      {/* Deep Leaf & Greenery Base */}
      <g stroke="#263428" strokeWidth="0.6" strokeLinecap="round">
        <path d="M 68 80 C 42 32, 22 45, 8 22 C 32 32, 48 50, 68 80 Z" fill="url(#leafGrad1)" />
        <path d="M 68 80 M 38 48 Q 28 35 15 28" stroke="#7A937D" strokeWidth="0.5" opacity="0.6" fill="none" />

        <path d="M 80 68 C 45 22, 58 10, 32 0 C 50 22, 62 45, 80 68 Z" fill="url(#leafGrad2)" />
        <path d="M 80 68 M 56 35 Q 46 22 38 12" stroke="#7A937D" strokeWidth="0.5" opacity="0.6" fill="none" />

        <path d="M 80 80 C 115 32, 138 45, 148 22 C 122 32, 105 50, 80 80 Z" fill="url(#leafGrad1)" />
        <path d="M 85 92 C 122 122, 135 100, 155 110 C 125 105, 102 95, 85 92 Z" fill="url(#leafGrad2)" />
      </g>

      {/* Baby's Breath White Blossoms */}
      <g fill="#FFFFFF" stroke="#D3C8B4" strokeWidth="0.5" filter="url(#petalShadow)">
        <circle cx="24" cy="38" r="3.8" />
        <circle cx="34" cy="24" r="3" />
        <circle cx="16" cy="50" r="3.2" />
        <circle cx="128" cy="38" r="3.8" />
        <circle cx="116" cy="24" r="3" />
        <circle cx="136" cy="52" r="3.2" />
      </g>

      {/* Main Center White Rose */}
      <g transform="translate(54, 54)" filter="url(#petalShadow)">
        {/* Outer Petals Layer */}
        <circle cx="22" cy="22" r="26" fill="url(#roseSoft)" />
        <path d="M -2 22 C -2 8, 12 -2, 26 -2 C 34 8, 30 26, 14 26 C 2 26, -2 22, -2 22 Z" fill="#F4EFE2" opacity="0.9" />
        <path d="M 22 -2 C 36 -2, 46 12, 46 26 C 36 34, 18 30, 18 14 C 18 2, 22 -2, 22 -2 Z" fill="#EDE6D5" opacity="0.85" />
        <path d="M 46 22 C 46 36, 32 46, 18 46 C 10 36, 14 18, 30 18 C 42 18, 46 22, 46 22 Z" fill="#F6F1E6" opacity="0.95" />

        {/* Inner Rose Petal Curves */}
        <path
          d="M 12 14 C 18 6, 30 6, 34 16 C 30 24, 18 26, 12 14 Z"
          fill="url(#roseInnerWarmth)"
          stroke="#DACCA7"
          strokeWidth="0.6"
        />
        <path
          d="M 8 22 C 8 12, 22 6, 32 8 C 36 18, 24 30, 8 22 Z"
          fill="none"
          stroke="#DACCA7"
          strokeWidth="0.8"
          opacity="0.75"
        />
        <path
          d="M 12 32 C 6 22, 18 14, 30 16 C 38 26, 26 36, 12 32 Z"
          fill="none"
          stroke="#DACCA7"
          strokeWidth="0.7"
          opacity="0.7"
        />
        {/* Swirling Center */}
        <circle cx="22" cy="20" r="5.5" fill="#E8D8A6" opacity="0.95" />
        <path d="M 19 18 Q 23 16 24 21 Q 20 23 19 18 Z" fill="#C9B681" />
      </g>

      {/* Secondary Left Rose */}
      <g transform="translate(24, 68) scale(0.72)" filter="url(#petalShadow)">
        <circle cx="22" cy="22" r="24" fill="url(#roseSoft)" />
        <circle cx="20" cy="18" r="7" fill="#E8D8A6" opacity="0.9" />
        <path d="M 8 18 C 8 8, 26 4, 30 18 Z" fill="none" stroke="#DACCA7" strokeWidth="0.8" />
      </g>

      {/* Secondary Right Rose */}
      <g transform="translate(82, 30) scale(0.65)" filter="url(#petalShadow)">
        <circle cx="22" cy="22" r="24" fill="url(#roseSoft)" />
        <circle cx="20" cy="18" r="7" fill="#E8D8A6" opacity="0.9" />
        <path d="M 8 18 C 8 8, 26 4, 30 18 Z" fill="none" stroke="#DACCA7" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

/* Organic 3D Melted Gold Wax Seal with rich tactile press shading */
const WAX_BLOB =
  `M50 3
   C 69 2, 87 11, 94 28
   C 101 45, 98 60, 92 75
   C 86 90, 71 98, 54 99
   C 37 100, 21 93, 11 78
   C 1 63, 0 45, 6 30
   C 12 14, 29 4, 46 3
   Z`

function Organic3DWaxSeal() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        {/* Metallic Gold Wax Body Shading */}
        <radialGradient id="waxGoldBody" cx="32%" cy="26%" r="85%">
          <stop offset="0%" stopColor="#FFF2B3" />
          <stop offset="25%" stopColor="#E6C158" />
          <stop offset="65%" stopColor="#BD9422" />
          <stop offset="88%" stopColor="#8C6A12" />
          <stop offset="100%" stopColor="#5E4508" />
        </radialGradient>

        {/* Inner Stamp Cavity Deboss Shading */}
        <radialGradient id="waxDeboss" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D4AB33" />
          <stop offset="70%" stopColor="#A88118" />
          <stop offset="100%" stopColor="#6E5109" />
        </radialGradient>

        {/* Specular Highlight */}
        <radialGradient id="waxSpecular" cx="28%" cy="22%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Monogram Press Drop Shadow */}
        <filter id="monogramDepth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="0.8" floodColor="#3B2A03" floodOpacity="0.85" />
        </filter>
        <filter id="sealOuterShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(12,20,13,0.45)" />
        </filter>
      </defs>

      {/* Cast Shadow on Envelope */}
      <path d={WAX_BLOB} fill="#141F15" opacity="0.45" transform="translate(0, 5) scale(0.98)" />
      <path d={WAX_BLOB} fill="#243326" opacity="0.3" transform="translate(0, 2)" />

      {/* Main 3D Melted Wax Body */}
      <g filter="url(#sealOuterShadow)">
        <path d={WAX_BLOB} fill="url(#waxGoldBody)" />
      </g>

      {/* Surface Specular Highlight */}
      <path d={WAX_BLOB} fill="url(#waxSpecular)" />

      {/* Outer Wax Lip Highlight & Shadow Ridges */}
      <path d={WAX_BLOB} fill="none" stroke="#FFF7CC" strokeWidth="1.2" opacity="0.85" />
      <path d={WAX_BLOB} fill="none" stroke="#5E4508" strokeWidth="0.8" opacity="0.7" />

      {/* Debossed Inner Stamp Ring */}
      <circle cx="50" cy="50" r="33" fill="url(#waxDeboss)" stroke="#594106" strokeWidth="1.5" opacity="0.9" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,247,204,0.6)" strokeWidth="0.9" />

      {/* Monogram A & S Pressed Typography */}
      <g filter="url(#monogramDepth)">
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#FFF4C2"
          fontFamily="'Pinyon Script', cursive"
          fontSize="24"
          fontWeight="bold"
          style={{ textShadow: '0 -1px 0 rgba(70,50,5,0.8)' }}
        >
          A &amp; S
        </text>
      </g>
    </svg>
  )
}

const MEET = '46%'

/* Tactile 3D Flap Shading Gradient Configurations */
const FLAPS = [
  {
    key: 'left',
    clip: `polygon(0 0, 0 100%, 50% ${MEET})`,
    origin: 'left center',
    opens: false,
    grad: 'linear-gradient(135deg, #425341 0%, #3B4B3A 60%, #314030 100%)',
    shadow: 'inset -8px 0 16px rgba(0,0,0,0.25)',
  },
  {
    key: 'right',
    clip: `polygon(100% 0, 100% 100%, 50% ${MEET})`,
    origin: 'right center',
    opens: false,
    grad: 'linear-gradient(225deg, #4A5B49 0%, #3F503E 60%, #324231 100%)',
    shadow: 'inset 8px 0 16px rgba(0,0,0,0.25)',
  },
  {
    key: 'bottom',
    clip: `polygon(0 100%, 100% 100%, 50% ${MEET})`,
    origin: 'center bottom',
    opens: false,
    grad: 'linear-gradient(0deg, #485A47 0%, #3C4D3B 70%, #2F3E2E 100%)',
    shadow: 'inset 0 12px 20px rgba(0,0,0,0.3)',
  },
  {
    key: 'top',
    clip: `polygon(0 0, 100% 0, 50% ${MEET})`,
    origin: 'center top',
    opens: true,
    grad: 'linear-gradient(180deg, #526551 0%, #465745 65%, #384837 100%)',
    shadow: 'drop-shadow(0 8px 16px rgba(12,20,13,0.45))',
  },
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
        backgroundImage: `${PAPER_GRAIN}, radial-gradient(ellipse at 50% 40%, #FAF8F5 0%, #EBE7DC 65%, #D6CFBE 100%)`,
        overflow: 'hidden',
        perspective: 1500,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Header Text matching reference photo */}
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
          aspectRatio: '1.42 / 1',
          transformStyle: 'preserve-3d',
          cursor: phase === 'idle' ? 'pointer' : 'default',
        }}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={
          phase === 'done'
            ? { opacity: 0, y: -22, scale: 1.02 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: reduced ? 0.2 : 0.7, ease: EASE }}
      >
        {/* Studio Floor Contact Drop Shadow underneath envelope */}
        <div
          style={{
            position: 'absolute',
            bottom: '-14%',
            left: '5%',
            width: '90%',
            height: '24%',
            background: 'radial-gradient(ellipse at center, rgba(15,25,16,0.45) 0%, rgba(15,25,16,0.15) 50%, transparent 75%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* Realistic White Rose Bouquets */}
        <RealisticFloralCluster position="top-left" />
        <RealisticFloralCluster position="bottom-right" />

        {/* Envelope Base Pocket (Solid Rich Olive Green with Tactile Paper Grain) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#3B4B3A',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #4A5B49 0%, #3A4B3C 55%, #2B3A2C 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.18)',
            boxShadow: '0 12px 30px rgba(15,25,16,0.35)',
          }}
          aria-hidden
        />

        {/* Inner Card (Slides Upward on Open) */}
        <motion.div
          style={{
            position: 'absolute',
            left: '5%',
            top: '6%',
            width: '90%',
            height: '88%',
            zIndex: 2,
            background: 'linear-gradient(150deg, #FDFCF9 0%, #F6F3EA 100%)',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(150deg, #FDFCF9 0%, #F6F3EA 100%)`,
            backgroundBlendMode: 'multiply, normal',
            border: '1px solid rgba(212,175,55,0.45)',
            borderRadius: 4,
            boxShadow: '0 10px 24px -10px rgba(20,30,21,0.45)',
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

        {/* Tactile Triangular Olive Envelope Flaps with 3D Depth & Light Shading */}
        {FLAPS.map((f) => (
          <motion.div
            key={f.key}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: f.opens && flapsBehind ? 0 : 5,
              clipPath: f.clip,
              transformOrigin: f.origin,
              background: f.grad,
              backgroundImage: `${PAPER_GRAIN}, ${f.grad}`,
              backgroundBlendMode: 'multiply, normal',
              boxShadow: f.shadow,
              filter: f.key === 'top' ? 'drop-shadow(0 6px 14px rgba(12,20,13,0.45))' : undefined,
            }}
            animate={{ rotateX: open && f.opens ? -180 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
            aria-hidden
          >
            {/* Tactile Crease Highlight Lines */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={
                  f.key === 'top' ? 'M 0 0 L 50 46 L 100 0' :
                  f.key === 'bottom' ? 'M 0 100 L 50 46 L 100 100' :
                  f.key === 'left' ? 'M 0 0 L 50 46 L 0 100' :
                  'M 100 0 L 50 46 L 100 100'
                }
                fill="none"
                stroke="rgba(0,0,0,0.22)"
                strokeWidth="0.7"
              />
              <path
                d={
                  f.key === 'top' ? 'M 0 1 L 50 47 L 100 1' :
                  f.key === 'bottom' ? 'M 0 99 L 50 45 L 100 99' :
                  f.key === 'left' ? 'M 1 0 L 51 46 L 1 100' :
                  'M 99 0 L 49 46 L 99 100'
                }
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        ))}

        {/* Organic 3D Yellow-Gold Wax Seal Stamp Centered on Flap Meeting Point */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: MEET,
            width: 'clamp(58px, 16vw, 78px)',
            height: 'clamp(58px, 16vw, 78px)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{ x: '-50%', y: '-50%', opacity: open ? 0 : 1, scale: open ? 0.78 : 1 }}
          transition={{ duration: reduced ? 0.15 : 0.34, ease: 'easeOut' }}
          aria-hidden
        >
          <Organic3DWaxSeal />
        </motion.div>
      </motion.div>

      {/* Bottom Text matching reference photo: "CLICK TO OPEN..." */}
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
