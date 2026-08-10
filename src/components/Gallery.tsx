import { useState } from 'react'
import { motion } from 'framer-motion'
import { Maximize2, Heart } from 'lucide-react'
import { galleryPhotos } from '../lib/images'
import Lightbox from './Lightbox'
import BotanicalDivider from './BotanicalDivider'

const ROTATIONS = [-2, 2.5, -1.5, 3, -2.2, 1.8, -2.8, 2.2]

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const images = galleryPhotos

  const lightboxPrev = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const lightboxNext = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length))

  return (
    <section id="gallery" aria-label="Photo gallery" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-2">Captured Moments</p>
        <h2 className="section-heading-script gold-foil mb-3">Our Photo Memories</h2>
        <p className="font-display italic text-sage text-base max-w-lg mx-auto">
          "Every picture tells a story of love, laughter, and cherished memories."
        </p>
      </motion.div>

      {/* Single Non-Duplicated 3D Motion Polaroid Gallery */}
      {images.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/80 rounded-2xl border border-champagne/30 p-4 flex items-center justify-center">
              <span className="font-body text-xs text-sage">Photo coming soon</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, i) => {
            const rot = ROTATIONS[i % ROTATIONS.length]
            return (
              <motion.div
                key={src}
                className="break-inside-avoid w-full block cursor-pointer group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-champagne/40 relative shadow-[0_12px_36px_-10px_rgba(47,72,61,0.12)] transition-all duration-500 group-hover:shadow-[0_25px_50px_-10px_rgba(212,175,55,0.35)]"
                  style={{ transform: `rotate(${rot}deg)` }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.04,
                    y: -6,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  onClick={() => setLightboxIdx(i)}
                >
                  {/* Gold Foil Pin Decorative Accent */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-gold/40 shadow-sm flex items-center justify-center z-10">
                    <Heart size={13} className="text-gold fill-gold/20" />
                  </div>

                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sage-mist/40 mb-3 border border-champagne/20">
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Hover Overlay with Action Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-eucalyptus-deep/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      )}

      <BotanicalDivider className="mt-20" />

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          current={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      )}
    </section>
  )
}
