import { motion } from 'framer-motion'
import BotanicalDivider from './BotanicalDivider'

interface StoryEvent {
  date: string
  title: string
  description: string
  image?: string
}

const STORY_EVENTS: StoryEvent[] = [
  {
    date: '14 OCTOBER 2021',
    title: 'The First Chapter',
    description: 'A chance meeting that sparked a connection like no other. From late-night coffee conversations to endless laughter, our story quietly began.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  },
  {
    date: '24 DECEMBER 2024',
    title: 'The Proposal',
    description: 'Under a canopy of golden lights, Amal popped the question. With tears of joy and full hearts, Surya said YES to a lifetime of love.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    date: '30 AUGUST 2026',
    title: 'The Beginning of Forever',
    description: 'Hand in hand, surrounding by those we cherish most, we step into our next chapter as husband and wife.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
]

export default function StoryTimeline() {
  return (
    <section id="story" aria-label="Our Love Story" className="py-24 px-6 max-w-5xl mx-auto text-center relative">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-3">How our journey began</p>
        <h2 className="section-heading-script gold-foil">Our Story</h2>
      </motion.div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

        <div className="flex flex-col gap-16 md:gap-24 relative">
          {STORY_EVENTS.map((event, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={event.title}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: index * 0.15 }}
              >
                {/* Content Box */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-olive/10 border border-gold/30 font-heading text-[10px] tracking-[0.25em] text-gold-deep uppercase mb-3">
                    {event.date}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-olive mb-3">{event.title}</h3>
                  <p className="font-display italic text-base md:text-lg text-ink-soft leading-relaxed max-w-md mx-auto md:mx-0">
                    {event.description}
                  </p>
                </div>

                {/* Center Node Icon (Desktop) */}
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-10 h-10 rounded-full bg-cream border-2 border-gold flex items-center justify-center shadow-md">
                    <div className="w-3 h-3 rounded-full bg-olive" />
                  </div>
                </div>

                {/* Photo Frame Box */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gold/30 group">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-sage/20 flex items-center justify-center">
                        <span className="font-script text-3xl text-olive">{event.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 border border-white/40 pointer-events-none rounded-xl" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <BotanicalDivider className="mt-20" />
    </section>
  )
}
