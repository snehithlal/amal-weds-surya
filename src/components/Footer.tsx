import { motion } from 'framer-motion'
import { primaryEvent, coupleNames, monogramText } from '../lib/invite'

export default function Footer() {
  return (
    <footer className="relative py-24 px-6 text-center overflow-hidden border-t border-champagne/30 bg-gradient-to-b from-pearl to-pearl-soft">
      <div
        className="mandala-bg"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-white/80 backdrop-blur-md shadow-sm">
          <span className="font-script gold-foil text-3xl font-bold">{monogramText}</span>
        </div>

        <div>
          <p className="section-sub mb-2">With gratitude & joy</p>
          <h2 className="font-script gold-foil text-5xl sm:text-6xl mb-3">{coupleNames}</h2>
          <p className="font-display italic text-sage text-sm tracking-[0.2em]">{primaryEvent.dateDisplay}</p>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent my-2" />

        <p className="font-body text-[10px] text-ink-soft/70 uppercase tracking-[0.3em]">
          Crafted with love for our wedding celebration
        </p>
      </motion.div>
    </footer>
  )
}
