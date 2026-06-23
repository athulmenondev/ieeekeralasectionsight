import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Event } from '../../types';

interface TimelineProps {
  events: Event[];
  className?: string;
}

export function Timeline({ events, className = '' }: TimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });
  const lineLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const linkVariants = {
    hidden: { opacity: 0, x: -18, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div ref={trackRef} className={`relative pl-8 ${className}`}>
      <motion.svg
        className="absolute left-0 top-2 bottom-2 w-[2px]"
        style={{ height: 'calc(100% - 16px)' }}
        viewBox="0 0 2 200"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="1" y1="0" x2="1" y2="200"
          stroke="url(#timelineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: lineLength }}
          fill="none"
        />
        <defs>
          <linearGradient id="timelineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary, #024ad8)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="var(--color-primary, #024ad8)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary, #024ad8)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            custom={index}
            variants={linkVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="relative group"
          >
            {/* Glowing Liquid Node indicator ring */}
            <motion.div
              className="absolute -left-[38px] top-[7px] w-4 h-4 rounded-full bg-canvas border-2 border-primary shadow-[0_0_10px_rgba(2,74,216,0.3)] flex items-center justify-center"
              whileInView={{ scale: [1, 1.4, 1], boxShadow: ['0 0 10px rgba(2,74,216,0.3)', '0 0 20px rgba(2,74,216,0.5)', '0 0 10px rgba(2,74,216,0.3)'] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            
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