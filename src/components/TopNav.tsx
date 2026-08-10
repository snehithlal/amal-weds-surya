import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { monogramText } from '../lib/invite'

const LINKS = [
  { href: '#couple', label: 'Couple' },
  { href: '#details', label: 'Details' },
  { href: '#gallery', label: 'Gallery' },
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
            background: 'rgba(252,250,247,0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(229,198,135,0.3)',
            boxShadow: '0 4px 20px -8px rgba(47,72,61,0.08)',
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3.5">
            <a
              href="#hero"
              className="font-script gold-foil text-2xl leading-none"
              aria-label="Back to top"
            >
              {monogramText}
            </a>
            <ul className="flex items-center gap-6 sm:gap-8">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-heading uppercase text-eucalyptus transition-colors duration-300 hover:text-gold-deep"
                    style={{ fontSize: 11, letterSpacing: '0.2em' }}
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
