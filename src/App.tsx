import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './components/Envelope'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import CoupleSection from './components/CoupleSection'
import EventCard from './components/EventCard'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import BotanicalDivider from './components/BotanicalDivider'
import AmbientScene from './components/AmbientScene'
import CursorTrail from './components/CursorTrail'
import TopNav from './components/TopNav'
import { ScrollProgressTrack, ScrollIndicator, MapFAB } from './components/ScrollProgress'
import { weddingCeremonyEvent, weddingFeastEvent, receptionEvent } from './lib/calendar'
import { primaryEvent, isReception, isWedding, WEDDING_CEREMONY, WEDDING_FEAST, WEDDING_RECEPTION } from './lib/invite'

const SEEN_KEY = isReception ? 'amal-aishwarya-reception-seen' : 'amal-aishwarya-wedding-seen'

export default function App() {
  const [opened, setOpened] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  })
  const [flourish, setFlourish] = useState(false)

  const handleOpen = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // storage disabled
    }
    setOpened(true)
    setFlourish(true)
    setTimeout(() => setFlourish(false), 1100)
  }

  return (
    <>
      <AmbientScene active={opened} />
      <CursorTrail />

      <AnimatePresence>
        {!opened && <Envelope onOpen={handleOpen} />}
      </AnimatePresence>

      <AnimatePresence>
        {flourish && (
          <motion.div
            key="flourish"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 55,
              pointerEvents: 'none',
              background:
                'radial-gradient(circle at center, rgba(242,199,106,0.85) 0%, rgba(232,210,154,0.4) 30%, transparent 70%)',
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <>
            <a href="#main" className="skip-link">Skip to content</a>
            <TopNav />
            <motion.main
              id="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Hero />
              <Countdown />
              <BotanicalDivider />
              <CoupleSection />

              <section id="details" aria-label="Event details" className="py-24 px-6">
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  <p className="section-sub mb-3">Join us for the celebrations</p>
                  <h2 className="section-heading-script gold-foil">
                    {isReception ? 'Reception Details' : 'Wedding Events'}
                  </h2>
                </motion.div>

                <div className="flex flex-col gap-16 max-w-4xl mx-auto">
                  {/* Wedding View: Thalikettu Ceremony + Nandanam Regency Feast */}
                  {isWedding && (
                    <>
                      <EventCard
                        title={WEDDING_CEREMONY.title}
                        subtitle={WEDDING_CEREMONY.subtitle}
                        date={WEDDING_CEREMONY.dateDisplay}
                        time={WEDDING_CEREMONY.timeDisplay}
                        venue={WEDDING_CEREMONY.venue}
                        address={WEDDING_CEREMONY.address}
                        mapUrl={WEDDING_CEREMONY.mapUrl}
                        calEvent={weddingCeremonyEvent}
                      />

                      <BotanicalDivider className="my-4" />

                      <EventCard
                        title={WEDDING_FEAST.title}
                        subtitle={WEDDING_FEAST.subtitle}
                        date={WEDDING_FEAST.dateDisplay}
                        time={WEDDING_FEAST.timeDisplay}
                        venue={WEDDING_FEAST.venue}
                        address={WEDDING_FEAST.address}
                        mapUrl={WEDDING_FEAST.mapUrl}
                        calEvent={weddingFeastEvent}
                      />
                    </>
                  )}

                  {/* Reception View (?invite=reception): Grand Reception at ALMA Convention Center */}
                  {isReception && (
                    <EventCard
                      title={WEDDING_RECEPTION.title}
                      subtitle={WEDDING_RECEPTION.subtitle}
                      date={WEDDING_RECEPTION.dateDisplay}
                      time={WEDDING_RECEPTION.timeDisplay}
                      venue={WEDDING_RECEPTION.venue}
                      address={WEDDING_RECEPTION.address}
                      mapUrl={WEDDING_RECEPTION.mapUrl}
                      calEvent={receptionEvent}
                    />
                  )}
                </div>
              </section>

              <Gallery />
              <Footer />

              <ScrollProgressTrack />
              <ScrollIndicator />
              <MapFAB mapUrl={primaryEvent.mapUrl} />
            </motion.main>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
