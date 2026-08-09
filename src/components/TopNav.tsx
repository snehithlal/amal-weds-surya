import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { href: '#couple', label: 'Couple' },
  { href: '#story', label: 'Our Story' },
  { href: '#details', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function TopNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: '-60% 0px 0px 0px' },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Primary"
          className="fixed top-0 left-0 right-0 z-50"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(250,248,245,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(212,175,55,0.28)',
            boxShadow: '0 2px 18px -8px rgba(58,75,60,0.25)',
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3">
            <a
              href="#hero"
              className="font-script gold-foil text-2xl leading-none"
              aria-label="Back to top"
            >
              A &amp; S
            </a>
            <ul className="flex items-center gap-4 sm:gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-heading uppercase text-olive transition-colors duration-300 hover:text-gold-deep"
                    style={{ fontSize: 11, letterSpacing: '0.15em' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
