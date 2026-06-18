import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  flat?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', flat = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={flat ? {} : { y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-6 ${!flat ? 'hover:shadow-xl' : ''} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}