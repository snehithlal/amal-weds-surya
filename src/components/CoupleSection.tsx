import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { groomPhoto, bridePhoto } from '../lib/images'
import BotanicalDivider from './BotanicalDivider'

const W = 220
const H = 296
const R = W / 2

const archPath = `M0,${H} L0,${R} A${R},${R} 0 0,1 ${W},${R} L${W},${H} Z`
const archInner = `M5,${H} L5,${R + 3} A${R - 5},${R - 5} 0 0,1 ${W - 5},${R + 3} L${W - 5},${H} Z`

interface PersonCardProps {
  photo: string | undefined
  name: string
  nameDisplay: string
  role: string
  parents?: string
  home?: string
  contact?: string
  delay?: number
}

function ArchCrownFlourish() {
  const cx = W / 2
  return (
    <>
      <path
        d={`M${cx - 2},5 C${cx - 14},-2 ${cx - 26},2 ${cx - 22},10 C${cx - 16},6 ${cx - 8},5 ${cx - 2},5`}
        stroke="#B89228" strokeWidth="0.95" fill="none" strokeLinecap="round"
      />
      <path
        d={`M${cx + 2},5 C${cx + 14},-2 ${cx + 26},2 ${cx + 22},10 C${cx + 16},6 ${cx + 8},5 ${cx + 2},5`}
        stroke="#B89228" strokeWidth="0.95" fill="none" strokeLinecap="round"
      />
      <circle cx={cx} cy="5" r="2.4" fill="#D4AF37" />
      <circle cx={cx} cy="5" r="4.5" fill="none" stroke="#B89228" strokeWidth="0.6" opacity="0.55" />
      <ellipse cx={cx - 14} cy="3" rx="3.5" ry="2" fill="#6B7F6D" stroke="#B89228" strokeWidth="0.5"
        transform={`rotate(-22,${cx - 14},3)`} opacity="0.65" />
      <ellipse cx={cx + 14} cy="3" rx="3.5" ry="2" fill="#6B7F6D" stroke="#B89228" strokeWidth="0.5"
        transform={`rotate(22,${cx + 14},3)`} opacity="0.65" />
    </>
  )
}

function PaisleyCorner({ flip = false, vflip = false }: { flip?: boolean; vflip?: boolean }) {
  const tx = `${flip ? 'scaleX(-1)' : ''} ${vflip ? 'scaleY(-1)' : ''}`.trim()
  return (
    <svg
      width="36" height="36" viewBox="0 0 36 36"
      style={{ transform: tx, opacity: 0.7 }}
      aria-hidden
    >
      <path
        d="M3 3 Q14 5 18 14 Q22 22 14 30 M3 3 Q5 13 13 14 M3 3 L10 3 M3 3 L3 10"
        stroke="#B89228" strokeWidth="0.9" fill="none" strokeLinecap="round"
      />
      <circle cx="3" cy="3" r="1.4" fill="#D4AF37" />
      <circle cx="14" cy="30" r="1.6" fill="#D4AF37" opacity="0.85" />
    </svg>
  )
}

function PersonCard({ photo, name, nameDisplay, role, parents, home, contact, delay = 0 }: PersonCardProps) {
  const clipId = `arch-${name.replace(/\s+/g, '-').toLowerCase()}`
  const wrapRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 16 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 120, damping: 16 })

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(x * 2)
    my.set(y * 2)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="flex flex-col items-center text-center gap-7 relative"
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          position: 'relative',
          width: W + 28,
          padding: 14,
          background: 'linear-gradient(160deg, rgba(253,252,249,0.85) 0%, rgba(243,226,159,0.55) 100%)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212,175,55,0.45)',
          borderRadius: 6,
          boxShadow: '0 12px 36px -8px rgba(58,75,60,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{ position: 'absolute', top: 4, left: 4 }}><PaisleyCorner /></div>
        <div style={{ position: 'absolute', top: 4, right: 4 }}><PaisleyCorner flip /></div>
        <div style={{ position: 'absolute', bottom: 4, left: 4 }}><PaisleyCorner vflip /></div>
        <div style={{ position: 'absolute', bottom: 4, right: 4 }}><PaisleyCorner flip vflip /></div>

        <div style={{ position: 'relative', width: W, height: H, transform: 'translateZ(20px)' }}>
          <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden>
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <path d={archPath} />
              </clipPath>
            </defs>
          </svg>

          {photo ? (
            <img
              src={photo}
              alt={`Portrait of ${nameDisplay}`}
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                clipPath: `url(#${clipId})`,
                filter: 'sepia(0.05) saturate(0.96) contrast(1.02)',
                transition: 'filter 600ms ease, transform 800ms cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ) : (
            <div
              style={{
                position: 'absolute', inset: 0,
                clipPath: `url(#${clipId})`,
                background: 'linear-gradient(160deg, #6B7F6D 0%, #3A4B3C 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span className="font-script text-6xl text-gold-light/90">{nameDisplay[0]}</span>
            </div>
          )}

          <svg
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            viewBox={`0 0 ${W} ${H}`}
            width={W}
            height={H}
            aria-hidden
          >
            <path d={archPath} fill="none" stroke="#B89228" strokeWidth="1.5" opacity="0.85" />
            <path d={archInner} fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.55" />
            <ArchCrownFlourish />
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: 24,
            background: 'radial-gradient(ellipse, rgba(58,75,60,0.18) 0%, transparent 70%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
          }}
          aria-hidden
        />
      </motion.div>

      <div>
        <p className="section-sub mb-2" style={{ color: 'var(--olive)' }}>{role}</p>
        <h3 className="font-script gold-foil text-5xl mb-3" style={{ lineHeight: 1 }}>{nameDisplay}</h3>
        {parents && <p className="font-display italic text-base text-ink-soft leading-relaxed max-w-[280px]">{parents}</p>}
        {home && <p className="font-heading text-[11px] text-gold-deep tracking-[0.28em] uppercase mt-3">{home}</p>}
        {contact && (
          <a href={`tel:${contact.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-1.5 font-body text-xs text-olive hover:text-gold-deep mt-2 tracking-wider transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{contact}</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

function PeacockFeather() {
  return (
    <motion.svg
      width="80"
      height="160"
      viewBox="0 0 80 160"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <radialGradient id="eye" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#3A4B3C" />
          <stop offset="40%" stopColor="#0F4C5C" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#6B7F6D" />
        </radialGradient>
      </defs>
      <motion.path
        d="M40 158 Q42 100 40 30"
        stroke="#B89228"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      {Array.from({ length: 14 }).map((_, i) => {
        const t = i / 13
        const y = 30 + t * 110
        const len = 6 + Math.sin(t * Math.PI) * 18
        return (
          <g key={i} opacity={0.6}>
            <line x1={40} y1={y} x2={40 - len} y2={y - 2} stroke="#6B7F6D" strokeWidth="0.6" />
            <line x1={40} y1={y} x2={40 + len} y2={y - 2} stroke="#6B7F6D" strokeWidth="0.6" />
          </g>
        )
      })}
      <ellipse cx="40" cy="22" rx="14" ry="20" fill="url(#eye)" opacity="0.85" />
      <ellipse cx="40" cy="18" rx="6" ry="10" fill="#0F4C5C" opacity="0.9" />
      <ellipse cx="40" cy="16" rx="3" ry="5" fill="#3A4B3C" />
      <circle cx="40" cy="14" r="1.5" fill="#FAF8F5" />
    </motion.svg>
  )
}

export default function CoupleSection() {
  return (
    <section id="couple" aria-label="The couple" className="py-24 px-6 max-w-5xl mx-auto relative">
      <motion.div
        className="text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-3">With immense joy</p>
        <h2 className="section-heading-script gold-foil mb-6">Amal &amp; Surya</h2>
        
        <div className="card-glass p-6 sm:p-8 rounded-xl border border-gold/40 shadow-lg mb-10">
          <p className="font-display italic text-lg sm:text-xl text-ink leading-relaxed mb-4">
            &ldquo;We warmly invite you to join us in celebrating our wedding and reception as we begin our new journey together.&rdquo;
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-16 md:gap-10 items-start justify-items-center">
        <PersonCard
          photo={groomPhoto}
          name="Amal"
          nameDisplay="Amal"
          role="The Groom"
          delay={0.1}
        />

        <div className="hidden md:flex items-center justify-center self-center">
          <PeacockFeather />
        </div>
        <div className="md:hidden">
          <BotanicalDivider />
        </div>

        <PersonCard
          photo={bridePhoto}
          name="Surya"
          nameDisplay="Surya"
          role="The Bride"
          delay={0.25}
        />
      </div>

      <BotanicalDivider className="mt-14" />
    </section>
  )
}
