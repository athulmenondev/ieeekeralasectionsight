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
      whileHover={flat ? {} : { y: -6, scale: 1.01 }}
      whileTap={onClick ? { scale: 0.99 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`glass-card p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Specular fluid light sweep underlay effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}