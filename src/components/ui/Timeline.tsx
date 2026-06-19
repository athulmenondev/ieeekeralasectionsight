import { motion } from 'framer-motion';
import type { Event } from '../../types';

interface TimelineProps {
  events: Event[];
  className?: string;
}

export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`relative pl-8 ${className}`}>
      {/* Translucent Track line */}
      <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            {/* Glowing Liquid Node indicator ring */}
            <div className="absolute -left-[38px] top-[7px] w-4 h-4 rounded-full bg-canvas border-2 border-primary shadow-[0_0_10px_rgba(2,74,216,0.3)] transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary-bright" />
            
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-soft">
              {event.date}
            </div>
            <h3 className="text-lg font-bold text-text tracking-tight mb-1 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <p className="text-charcoal dark:text-dark-foreground text-xs leading-relaxed mb-2">
              {event.description}
            </p>
            
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-bright group/link transition-colors pt-1"
              >
                Register Pass <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform ml-1">→</span>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}