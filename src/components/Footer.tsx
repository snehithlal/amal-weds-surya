import { motion } from 'framer-motion'
import { primaryEvent } from '../lib/invite'

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 text-center overflow-hidden border-t border-gold/30">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-script gold-foil text-6xl md:text-7xl mb-4">
            Amal &amp; Surya
          </p>

          <p className="font-heading text-xs tracking-[0.4em] uppercase text-olive mb-6">
            {primaryEvent.dateDisplay}
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

          <p className="font-display italic text-ink-soft text-lg max-w-lg mx-auto mb-8">
            &ldquo;Thank you for being a part of our lives and sharing in our happiness.&rdquo;
          </p>

          <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-gold-deep">
            #AmalWedsSurya
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
