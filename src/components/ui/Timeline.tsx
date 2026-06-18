import { motion } from 'framer-motion';
import type { Event } from '../../types';

interface TimelineProps {
  events: Event[];
  className?: string;
}

export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`relative pl-8 ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20" />
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-primary border-[3px] border-white shadow-[0_0_0_2px_#006699]" />
            <div className="mb-1 text-sm text-muted">{event.date}</div>
            <h3 className="text-xl font-semibold text-text mb-1">{event.title}</h3>
            <p className="text-muted">{event.description}</p>
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-primary hover:underline"
              >
                Register →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}