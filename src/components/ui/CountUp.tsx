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

  return <span ref={ref}>{isInView ? <motion.span>{display}</motion.span> : '0'}</span>;
}
