import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  featured?: boolean;
  tall?: boolean;
  wide?: boolean;
}

export function BentoItem({ children, className = '', featured, tall, wide }: BentoItemProps) {
  let spanClass = '';

  if (featured) {
    spanClass = 'md:col-span-2 md:row-span-2';
  } else if (wide) {
    spanClass = 'md:col-span-2';
  } else if (tall) {
    spanClass = 'md:row-span-2';
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-8 ${spanClass} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}