import { motion } from 'framer-motion';
import { SectionHeader, Timeline, Button, GlassCard } from '../components/ui';
import { getEventsData } from '../data';

export function EventsPage() {
  const { events, pastEvents } = getEventsData();

  return (
    <main className="pt-20 bg-canvas text-text selection:bg-primary/20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text via-text to-charcoal">
              Community Events
            </h1>
            <p className="text-base md:text-lg text-charcoal leading-relaxed">
              Join our active workshops, direct hackathons, and regional meetups. Connect with professionals passionate about engineering technology for positive social good.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-20 bg-cloud/40 relative border-t border-hairline/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Upcoming Events" subtitle="Don't miss out on these upcoming opportunities to learn, build, and deploy together." />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8">
            {/* Featured Columns */}
            <div className="space-y-8 lg:col-span-3">
              {events.filter(e => e.featured).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 md:p-8 flex flex-col justify-between relative group">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {event.type}
                        </span>
                        <span className="text-graphite font-medium text-xs flex items-center gap-1">
                          🕒 {event.time}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-text mb-3 tracking-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-charcoal text-sm leading-relaxed mb-6">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline/30 text-xs font-semibold text-charcoal/90">
                      <span className="flex items-center gap-1">📍 {event.location}</span>
                      <span className="flex items-center gap-1 bg-white/60 dark:bg-black/20 px-2.5 py-1 rounded-md border border-hairline/20">
                        📅 {event.date}
                      </span>
                    </div>

                    {event.registrationUrl && (
                      <div className="mt-6">
                        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <Button fullWidth className="!rounded-xl shadow-md hover:shadow-primary/20 transition-all uppercase tracking-wider text-xs">
                            Register Core Pass
                          </Button>
                        </a>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* General Timeline column */}
            <div className="lg:col-span-2 glass-card p-6 md:p-8 !bg-white/20 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 border-b border-hairline/40 pb-3">
                Chronological Agenda
              </h3>
              <Timeline events={events} />
            </div>
          </div>
        </div>
      </section>

      {/* Past Archive Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Past Engagements" subtitle="Relive the key learning milestones that shaped our ecosystem" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {pastEvents.map((event, index) => {
              const dateObj = new Date(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <GlassCard className="p-6 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex flex-col items-center justify-center text-primary font-bold mb-4 shadow-sm">
                        <span className="text-sm leading-none">{dateObj.getDate() || '18'}</span>
                        <span className="text-[10px] uppercase tracking-wide opacity-80 mt-0.5">
                          {dateObj.toLocaleString('default', { month: 'short' }) || 'Jul'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text tracking-tight mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-charcoal text-xs leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    <p className="text-primary text-xs font-semibold mt-4 flex items-center gap-1">
                      📍 {event.location}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}