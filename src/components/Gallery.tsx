import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryPhotos } from '../lib/images'
import Lightbox from './Lightbox'
import BotanicalDivider from './BotanicalDivider'

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  if (galleryPhotos.length === 0) return null

  return (
    <section id="gallery" aria-label="Photo gallery" className="py-24 px-6 max-w-5xl mx-auto text-center">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-3">Moments captured</p>
        <h2 className="section-heading-script gold-foil">Our Memories</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {galleryPhotos.map((src, i) => (
          <motion.div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => setLightboxIdx(i)}
          >
            <img
              src={src}
              alt={`Gallery moment ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-olive-deep/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-gold-light font-heading text-xs tracking-widest uppercase">View</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx >= 0 && (
          <Lightbox
            photos={galleryPhotos}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(-1)}
            onPrev={() => setLightboxIdx((i) => (i > 0 ? i - 1 : galleryPhotos.length - 1))}
            onNext={() => setLightboxIdx((i) => (i < galleryPhotos.length - 1 ? i + 1 : 0))}
          />
        )}
      </AnimatePresence>

      <BotanicalDivider className="mt-14" />
    </section>
  )
}
