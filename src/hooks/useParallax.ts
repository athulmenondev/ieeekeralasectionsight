import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: number[];
}

export function useParallax(speed: number = 0.5): MotionValue<string> {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
}

export function useParallaxOffset(ref: React.RefObject<HTMLElement | null>, options: ParallaxOptions = {}): MotionValue<string> {
  const { offset = [0, 0.5] } = options;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 1], offset.map((o) => `${-o * 100}%`));
}

export function useScrollProgress(): {
  scrollYProgress: MotionValue<number>;
  isScrolled: boolean;
} {
  const { scrollYProgress } = useScroll();
  const isScrolled = useTransform(scrollYProgress, [0, 0.02], [false, true]);

  return {
    scrollYProgress,
    isScrolled,
  };
}