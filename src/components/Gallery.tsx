import { useState } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../lib/images'
import Lightbox from './Lightbox'
import BotanicalDivider from './BotanicalDivider'

const ROTATIONS = [-2, 3, -1, 4, -3, 2, -4, 1, 3, -2]

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const images = galleryPhotos

  const prev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const next = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length))

  return (
    <section id="gallery" aria-label="Photo gallery" className="py-20 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-2">Moments captured</p>
        <h2 className="section-heading-script gold-foil">Our Gallery</h2>
      </motion.div>

      {images.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="aspect-[3/4]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
            >
              <div
                className="h-full bg-white shadow-[0_8px_24px_-8px_rgba(31,52,43,0.2)] flex flex-col"
                style={{ padding: '8px 8px 28px' }}
              >
                <div className="flex-1 bg-sage-mist/30 border border-champagne/20 flex items-center justify-center">
                  <p className="font-body text-xs text-sage text-center px-4">Photo coming soon</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {images.map((src, i) => {
            const rot = ROTATIONS[i % ROTATIONS.length]
            return (
              <motion.button
                key={src}
                className="break-inside-avoid w-full block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxIdx(i)}
                aria-label={`Open photo ${i + 1} in lightbox`}
                style={{
                  transform: `rotate(${rot}deg)`,
                  transition: 'transform 400ms cubic-bezier(0.22,1,0.36,1)',
                }}
                whileHover={{
                  rotate: 0,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div
                  className="bg-white rounded-xl sm:rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_45px_-10px_rgba(31,52,43,0.3)] relative"
                  style={{
                    padding: '8px 8px 30px',
                    boxShadow: '0 8px 24px -6px rgba(31,52,43,0.18), 0 2px 6px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    className="absolute inset-1.5 rounded-lg sm:rounded-xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.6), inset 0 0 16px rgba(212,175,55,0.25)' }}
                    aria-hidden
                  />
                  <div className="overflow-hidden rounded-lg sm:rounded-xl relative">
                    <img
                      src={src}
                      alt={`Wedding photo ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full object-cover block transition-all duration-500 group-hover:scale-[1.05]"
                      style={{
                        transition: 'filter 500ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)',
                      }}
                    />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      <BotanicalDivider className="mt-16" />

      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          current={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
