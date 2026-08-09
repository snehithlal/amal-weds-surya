import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from './components/Envelope'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import CoupleSection from './components/CoupleSection'
import EventCard from './components/EventCard'
import Gallery from './components/Gallery'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import BotanicalDivider from './components/BotanicalDivider'
import AmbientScene from './components/AmbientScene'
import CursorTrail from './components/CursorTrail'
import TopNav from './components/TopNav'
import { ScrollProgressTrack, ScrollIndicator, MapFAB } from './components/ScrollProgress'
import { weddingEvent, receptionEvent } from './lib/calendar'
import { primaryEvent, showWedding, showReception } from './lib/invite'

const SEEN_KEY = 'amal-surya-envelope-seen'

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
                'radial-gradient(circle at center, rgba(243,226,159,0.85) 0%, rgba(208,219,207,0.4) 30%, transparent 70%)',
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

              <section id="details" aria-label="Wedding details" className="py-24 px-6">
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                >
                  <p className="section-sub mb-3">Join us for the celebrations</p>
                  <h2 className="section-heading-script gold-foil">Event Details</h2>
                </motion.div>

                <div className="flex flex-col gap-16 max-w-4xl mx-auto">
                  {/* Event 1: Wedding Ceremony */}
                  {showWedding && (
                    <EventCard
                      title="The Wedding Ceremony"
                      subtitle="Sacred Muhurtham & Union"
                      date="Sunday, 30 . 08 . 2026"
                      time="10:30 AM – 1:30 PM"
                      venue="Wedding Ceremony Venue"
                      address="Kannur, Kerala"
                      mapUrl={primaryEvent.mapUrl}
                      calEvent={weddingEvent}
                    />
                  )}

                  {showWedding && showReception && <BotanicalDivider className="my-4" />}

                  {/* Event 2: Wedding Reception */}
                  {showReception && (
                    <EventCard
                      title="The Wedding Reception"
                      subtitle="Evening Celebration & Feast"
                      date="Sunday, 06 . 09 . 2026"
                      time="6:00 PM – 9:30 PM"
                      venue="Wedding Reception Venue"
                      address="Kannur, Kerala"
                      mapUrl={primaryEvent.mapUrl}
                      calEvent={receptionEvent}
                    />
                  )}
                </div>
              </section>

              <Gallery />
              <Rsvp />
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
