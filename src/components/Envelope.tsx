import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

interface EnvelopeProps {
  onOpen: () => void
}

type Phase = 'idle' | 'opening' | 'done'

const EASE = [0.22, 1, 0.36, 1] as const

const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")"

/* Photorealistic White Rose Bouquet with lush shading, leaves & baby's breath */
function PhotorealisticFloralCluster({ position }: { position: 'top-left' | 'bottom-right' }) {
  const isTopLeft = position === 'top-left'
  return (
    <svg
      viewBox="0 0 200 200"
      width="135"
      height="135"
      style={{
        position: 'absolute',
        ...(isTopLeft
          ? { top: '-38px', left: '-38px', transform: 'rotate(-12deg)' }
          : { bottom: '-38px', right: '-38px', transform: 'rotate(168deg)' }),
        zIndex: 12,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 8px 18px rgba(10,18,11,0.45))',
      }}
      aria-hidden
    >
      <defs>
        {/* Soft Warm Rose Shading */}
        <radialGradient id="roseMain" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FAF7F0" />
          <stop offset="75%" stopColor="#EBE3D0" />
          <stop offset="100%" stopColor="#D4C8AF" />
        </radialGradient>

        <radialGradient id="roseCore" cx="40%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FFF7E0" />
          <stop offset="50%" stopColor="#F2DFAC" />
          <stop offset="100%" stopColor="#D5BF86" />
        </radialGradient>

        {/* Leaf Gradients with 3D Depth */}
        <linearGradient id="leafRich1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A937D" />
          <stop offset="40%" stopColor="#566F59" />
          <stop offset="80%" stopColor="#374B3A" />
          <stop offset="100%" stopColor="#223324" />
        </linearGradient>

        <linearGradient id="leafRich2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#697F6C" />
          <stop offset="50%" stopColor="#465A49" />
          <stop offset="100%" stopColor="#2A3A2C" />
        </linearGradient>

        <filter id="softPetalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#18241A" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Leaves Cluster */}
      <g stroke="#1F2E21" strokeWidth="0.6">
        <path d="M 85 100 C 50 40, 25 55, 10 25 C 40 40, 60 62, 85 100 Z" fill="url(#leafRich1)" />
        <path d="M 85 100 M 48 60 Q 35 44 18 34" stroke="#A1B8A4" strokeWidth="0.6" fill="none" opacity="0.7" />

        <path d="M 100 85 C 55 28, 70 12, 38 0 C 62 28, 78 56, 100 85 Z" fill="url(#leafRich2)" />
        <path d="M 100 85 M 70 44 Q 58 28 48 15" stroke="#A1B8A4" strokeWidth="0.6" fill="none" opacity="0.7" />

        <path d="M 100 100 C 145 40, 172 55, 185 25 C 152 40, 130 62, 100 100 Z" fill="url(#leafRich1)" />
        <path d="M 105 115 C 152 152, 168 125, 192 138 C 155 132, 126 120, 105 115 Z" fill="url(#leafRich2)" />
      </g>

      {/* Baby's Breath Tiny Blossoms */}
      <g fill="#FFFFFF" stroke="#CFC4AE" strokeWidth="0.6" filter="url(#softPetalShadow)">
        <circle cx="30" cy="48" r="4.5" />
        <circle cx="42" cy="30" r="3.6" />
        <circle cx="20" cy="62" r="3.8" />
        <circle cx="160" cy="48" r="4.5" />
        <circle cx="145" cy="30" r="3.6" />
        <circle cx="170" cy="65" r="3.8" />
      </g>

      {/* Main Full White Rose */}
      <g transform="translate(68, 68)" filter="url(#softPetalShadow)">
        <circle cx="28" cy="28" r="32" fill="url(#roseMain)" />
        <path d="M -2 28 C -2 10, 16 -2, 34 -2 C 44 10, 38 32, 18 32 C 3 32, -2 28, -2 28 Z" fill="#F7F3E9" opacity="0.9" />
        <path d="M 28 -2 C 46 -2, 58 14, 58 32 C 46 42, 22 38, 22 18 C 22 2, 28 -2, 28 -2 Z" fill="#EFE8D6" opacity="0.85" />
        <path d="M 58 28 C 58 46, 40 58, 22 58 C 12 46, 18 22, 38 22 C 52 22, 58 28, 58 28 Z" fill="#FAF6ED" opacity="0.95" />

        {/* Inner Rose Petals */}
        <path
          d="M 16 18 C 24 8, 38 8, 44 20 C 38 30, 24 32, 16 18 Z"
          fill="url(#roseCore)"
          stroke="#D5C59C"
          strokeWidth="0.7"
        />
        <path
          d="M 10 28 C 10 15, 28 8, 40 10 C 46 22, 30 38, 10 28 Z"
          fill="none"
          stroke="#D5C59C"
          strokeWidth="0.9"
          opacity="0.8"
        />
        <circle cx="28" cy="25" r="7" fill="#E8D59E" opacity="0.95" />
        <path d="M 24 23 Q 29 20 31 27 Q 26 30 24 23 Z" fill="#C2AB6C" />
      </g>

      {/* Side Rose Left */}
      <g transform="translate(30, 85) scale(0.75)" filter="url(#softPetalShadow)">
        <circle cx="28" cy="28" r="30" fill="url(#roseMain)" />
        <circle cx="26" cy="23" r="8.5" fill="#E8D59E" opacity="0.9" />
      </g>

      {/* Side Rose Right */}
      <g transform="translate(105, 38) scale(0.68)" filter="url(#softPetalShadow)">
        <circle cx="28" cy="28" r="30" fill="url(#roseMain)" />
        <circle cx="26" cy="23" r="8.5" fill="#E8D59E" opacity="0.9" />
      </g>
    </svg>
  )
}

/* Hyper-Realistic 3D Melted Yellow-Gold Wax Stamp */
const WAX_BLOB =
  `M50 2
   C 70 1, 88 10, 95 27
   C 102 44, 99 60, 93 76
   C 87 92, 72 99, 54 100
   C 36 101, 20 94, 10 78
   C 0 62, -1 44, 5 29
   C 11 14, 30 3, 47 2
   Z`

function HyperRealisticGoldWaxSeal() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        {/* Rich Photorealistic 3D Golden Yellow Wax Fill */}
        <radialGradient id="goldWax3D" cx="30%" cy="24%" r="88%">
          <stop offset="0%" stopColor="#FFF5BA" />
          <stop offset="20%" stopColor="#F7DB6B" />
          <stop offset="48%" stopColor="#E5C14E" />
          <stop offset="78%" stopColor="#BA931F" />
          <stop offset="92%" stopColor="#8C6A10" />
          <stop offset="100%" stopColor="#5E4306" />
        </radialGradient>

        {/* Debossed Center Stamp Basin */}
        <radialGradient id="waxDebossBasin" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#E0B738" />
          <stop offset="60%" stopColor="#B38B1B" />
          <stop offset="90%" stopColor="#7A5A0A" />
          <stop offset="100%" stopColor="#4D3704" />
        </radialGradient>

        {/* Specular Highlight Gloss */}
        <radialGradient id="waxGloss" cx="26%" cy="20%" r="38%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Monogram Dark Gold Shadow */}
        <filter id="monogramDepth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.8" stdDeviation="0.9" floodColor="#3B2A03" floodOpacity="0.9" />
        </filter>
        <filter id="waxDrop" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(12,20,13,0.5)" />
        </filter>
      </defs>

      {/* Cast Shadow on Envelope Surface */}
      <path d={WAX_BLOB} fill="#121D13" opacity="0.45" transform="translate(0, 6) scale(0.98)" />
      <path d={WAX_BLOB} fill="#223324" opacity="0.3" transform="translate(0, 2)" />

      {/* Main 3D Wax Body */}
      <g filter="url(#waxDrop)">
        <path d={WAX_BLOB} fill="url(#goldWax3D)" />
      </g>

      {/* Surface Gloss Specular */}
      <path d={WAX_BLOB} fill="url(#waxGloss)" />

      {/* Wax Edge Highlights & Dark Ridges */}
      <path d={WAX_BLOB} fill="none" stroke="#FFF9D6" strokeWidth="1.2" opacity="0.9" />
      <path d={WAX_BLOB} fill="none" stroke="#5E4306" strokeWidth="0.8" opacity="0.75" />

      {/* Debossed Inner Stamp Ring */}
      <circle cx="50" cy="50" r="33" fill="url(#waxDebossBasin)" stroke="#4A3403" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="31.5" fill="none" stroke="#FFF7CC" strokeWidth="1" opacity="0.85" />
      <circle cx="50" cy="50" r="29.5" fill="none" stroke="#3D2B02" strokeWidth="0.6" opacity="0.7" />

      {/* Monogram A & S Pressed Typography */}
      <g filter="url(#monogramDepth)">
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#FFF6C7"
          fontFamily="'Pinyon Script', cursive"
          fontSize="24"
          fontWeight="bold"
          style={{ textShadow: '0 -1px 0 rgba(60,42,4,0.9)' }}
        >
          A &amp; S
        </text>
      </g>
    </svg>
  )
}

const MEET = '46%'

/* Hyper-Realistic Olive Envelope Flap Shading Gradients matching phone screenshot */
const FLAPS = [
  {
    key: 'left',
    clip: `polygon(0 0, 0 100%, 50% ${MEET})`,
    origin: 'left center',
    opens: false,
    grad: 'linear-gradient(135deg, #5C6E52 0%, #46573C 45%, #34442A 100%)',
    edgeLine: 'M 0 0 L 50 46 L 0 100',
  },
  {
    key: 'right',
    clip: `polygon(100% 0, 100% 100%, 50% ${MEET})`,
    origin: 'right center',
    opens: false,
    grad: 'linear-gradient(225deg, #647759 0%, #4D5F43 45%, #36472C 100%)',
    edgeLine: 'M 100 0 L 50 46 L 100 100',
  },
  {
    key: 'bottom',
    clip: `polygon(0 100%, 100% 100%, 50% ${MEET})`,
    origin: 'center bottom',
    opens: false,
    grad: 'linear-gradient(0deg, #627557 0%, #495B40 50%, #304027 100%)',
    edgeLine: 'M 0 100 L 50 46 L 100 100',
  },
  {
    key: 'top',
    clip: `polygon(0 0, 100% 0, 50% ${MEET})`,
    origin: 'center top',
    opens: true,
    // Top Flap matches phone screenshot: Lighter top edge gradient fading into dark tip
    grad: 'linear-gradient(180deg, #748866 0%, #566849 35%, #3C4D32 80%, #293820 100%)',
    edgeLine: 'M 0 0 L 50 46 L 100 0',
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
        backgroundImage: `${PAPER_GRAIN}, radial-gradient(ellipse at 50% 40%, #FAF8F5 0%, #EAE6DB 65%, #D4CCBB 100%)`,
        overflow: 'hidden',
        perspective: 1500,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Text matching reference phone screenshot */}
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

      {/* Main Photorealistic 3D Olive Envelope Container */}
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

        {/* Photorealistic White Rose Floral Clusters at corners */}
        <PhotorealisticFloralCluster position="top-left" />
        <PhotorealisticFloralCluster position="bottom-right" />

        {/* Envelope Base Pocket (Solid Rich Olive Green with Smooth Gradient & Paper Grain) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: '#3B4B3A',
            backgroundImage: `${PAPER_GRAIN}, linear-gradient(155deg, #5C6E52 0%, #445542 50%, #2A382A 100%)`,
            backgroundBlendMode: 'multiply, normal',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 16px 40px rgba(12,20,13,0.4)',
          }}
          aria-hidden
        />

        {/* Inner Ivory Card (Slides Upward on Open) */}
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

        {/* Triangular Envelope Flaps with Photorealistic Smooth Shading */}
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
              filter: f.key === 'top' ? 'drop-shadow(0 10px 18px rgba(12,20,13,0.5))' : undefined,
            }}
            animate={{ rotateX: open && f.opens ? -180 : 0 }}
            transition={{ duration: reduced ? 0.2 : 0.8, delay: reduced ? 0 : 0.14, ease: EASE }}
            aria-hidden
          >
            {/* Flap Edge 3D Highlight & Shadow Lines */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Deep Crease Dark Shadow */}
              <path
                d={f.edgeLine}
                fill="none"
                stroke="rgba(10,18,11,0.4)"
                strokeWidth="0.9"
              />
              {/* Top Edge Specular Highlight Line */}
              <path
                d={f.edgeLine}
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.5"
                transform="translate(0, -0.4)"
              />
            </svg>
          </motion.div>
        ))}

        {/* Hyper-Realistic 3D Yellow-Gold Wax Stamp Centered on Flap Meeting Point */}
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
          <HyperRealisticGoldWaxSeal />
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
