import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'

export default function Rsvp() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('1')
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitted(true)
  }

  return (
    <section id="rsvp" aria-label="RSVP section" className="py-24 px-6 max-w-2xl mx-auto text-center">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className="section-sub mb-3">Response requested</p>
        <h2 className="section-heading-script gold-foil mb-2">Are you coming?</h2>
        <p className="font-display italic text-ink-soft text-base">Please let us know so we can prepare for your presence</p>
      </motion.div>

      <motion.div
        className="card-glass p-8 sm:p-10 rounded-2xl border border-gold/40 shadow-xl relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 flex flex-col items-center gap-4"
          >
            <CheckCircle2 size={54} className="text-olive" />
            <h3 className="font-heading text-2xl text-olive">Thank You!</h3>
            <p className="font-display italic text-lg text-ink-soft">
              Your response has been saved. We look forward to celebrating with you!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
            <div>
              <label htmlFor="name" className="block font-heading text-xs uppercase tracking-widest text-olive mb-2">
                Your Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/70 border border-gold/40 rounded-lg font-body text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="guests" className="block font-heading text-xs uppercase tracking-widest text-olive mb-2">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gold/40 rounded-lg font-body text-sm text-ink focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4+ Family</option>
                </select>
              </div>

              <div>
                <label className="block font-heading text-xs uppercase tracking-widest text-olive mb-2">
                  Will You Attend?
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      checked={attendance === 'yes'}
                      onChange={() => setAttendance('yes')}
                      className="accent-olive"
                    />
                    <span className="font-body text-sm text-ink">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      checked={attendance === 'no'}
                      onChange={() => setAttendance('no')}
                      className="accent-olive"
                    />
                    <span className="font-body text-sm text-ink">Regretfully Decline</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block font-heading text-xs uppercase tracking-widest text-olive mb-2">
                Warm Wishes / Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message for Amal & Surya"
                className="w-full px-4 py-3 bg-white/70 border border-gold/40 rounded-lg font-body text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-4 bg-olive text-gold-light font-heading text-xs tracking-[0.25em] uppercase rounded-lg hover:bg-olive-deep transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            >
              <Send size={14} />
              <span>Send RSVP</span>
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
