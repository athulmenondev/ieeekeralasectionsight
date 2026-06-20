import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';

interface CountUpProps {
  value: string | number;
}

export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const strValue = String(value);
  const match = strValue.match(/^([\d,]+)(.*)$/);
  const rawNum = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? match[2] : '';

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 25, stiffness: 80 });
  const display = useTransform(spring, (latest) => {
    const rounded = rawNum >= 1000 ? Math.round(latest) : Math.round(latest * 10) / 10;
    return rounded.toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(rawNum);
    }
  }, [isInView, rawNum, motionValue]);

  return (
    <span ref={ref} className="relative inline-flex items-center justify-center">
      {isInView && (
        <motion.span
          className="absolute inset-[-0.15em] rounded-full bg-primary/15 blur-md"
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.65, 1.35, 1.7] }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10">{isInView ? <motion.span>{display}</motion.span> : '0'}</span>
    </span>
  );
}
