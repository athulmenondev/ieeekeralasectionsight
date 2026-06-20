import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-28 bg-gradient-to-b from-primary/10 to-transparent"
        initial={{ opacity: 0, scaleX: 0.65 }}
        animate={{ opacity: [0, 1, 0], scaleX: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
      />
      {children}
    </motion.div>
  );
}
