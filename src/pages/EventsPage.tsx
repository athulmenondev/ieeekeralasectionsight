import { motion } from 'framer-motion';
import { SectionHeader, Timeline, Button } from '../components/ui';
import { getEventsData } from '../data';

export function EventsPage() {
  const { events, pastEvents } = getEventsData();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">Events</h1>
            <p className="text-lg text-muted">
              Join our workshops, meetups, and webinars. Connect with like-minded
              professionals passionate about technology for social good.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Upcoming Events" subtitle="Don't miss out on these opportunities to learn and connect" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {events.filter(e => e.featured).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </div>
                    <div className="text-muted text-sm">{event.time}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">{event.title}</h3>
                  <p className="text-muted text-sm mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">📍 {event.location}</span>
                    <span className="text-sm text-muted">{event.date}</span>
                  </div>
                  {event.registrationUrl && (
                    <div className="mt-4">
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                        <Button fullWidth>Register Now</Button>
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text mb-6">All Upcoming</h3>
              <Timeline events={events} />
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Past Events" subtitle="Relive the moments that shaped our community" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mb-4">
                  {new Date(event.date).getDate()}
                  <br />
                  <span className="text-xs">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{event.title}</h3>
                <p className="text-muted text-sm">{event.description}</p>
                <p className="text-primary text-sm mt-4">📍 {event.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}