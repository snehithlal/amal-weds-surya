import { motion } from 'framer-motion'
import { groomPhoto, bridePhoto } from '../lib/images'
import { coupleData } from '../lib/invite'
import BotanicalDivider from './BotanicalDivider'

export default function CoupleSection() {
  return (
    <section id="couple" aria-label="The couple" className="py-24 px-6 max-w-6xl mx-auto relative">
      <motion.div
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-2">The Happy Couple</p>
        <h2 className="section-heading-script gold-foil mb-4">Groom & Bride</h2>
        <p className="font-display italic text-sage text-lg">"Two souls, one sacred path — united in love and blessings."</p>
      </motion.div>

      {/* Editorial Magazine Staggered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Groom Editorial Card */}
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl border border-champagne/40 rounded-3xl p-6 sm:p-8 shadow-[0_16px_45px_-10px_rgba(47,72,61,0.09)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative bg-sage-mist/40 border border-champagne/20">
            {groomPhoto ? (
              <img
                src={groomPhoto}
                alt={coupleData.groom.nameDisplay}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-script text-7xl text-eucalyptus/60">{coupleData.groom.nameDisplay[0]}</span>
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-champagne/30 text-[10px] uppercase font-heading tracking-widest text-eucalyptus">
              {coupleData.groom.role}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-script gold-foil text-5xl mb-2">{coupleData.groom.nameDisplay}</h3>
            <p className="font-display italic text-base text-ink-soft mb-3">{coupleData.groom.parents}</p>
            <div className="w-12 h-px bg-gold/40 mx-auto sm:mx-0 mb-3" />
            <p className="font-heading text-xs text-gold-deep tracking-widest uppercase">{coupleData.groom.home}</p>
          </div>
        </motion.div>

        {/* Bride Editorial Card (Staggered offset) */}
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl border border-champagne/40 rounded-3xl p-6 sm:p-8 shadow-[0_16px_45px_-10px_rgba(47,72,61,0.09)] md:translate-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative bg-sage-mist/40 border border-champagne/20">
            {bridePhoto ? (
              <img
                src={bridePhoto}
                alt={coupleData.bride.nameDisplay}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-script text-7xl text-eucalyptus/60">{coupleData.bride.nameDisplay[0]}</span>
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-champagne/30 text-[10px] uppercase font-heading tracking-widest text-eucalyptus">
              {coupleData.bride.role}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="font-script gold-foil text-5xl mb-2">{coupleData.bride.nameDisplay}</h3>
            <p className="font-display italic text-base text-ink-soft mb-3">{coupleData.bride.parents}</p>
            <div className="w-12 h-px bg-gold/40 mx-auto sm:mx-0 mb-3" />
            <p className="font-heading text-xs text-gold-deep tracking-widest uppercase">{coupleData.bride.home}</p>
          </div>
        </motion.div>
      </div>

      <BotanicalDivider className="mt-20" />
    </section>
  )
}
