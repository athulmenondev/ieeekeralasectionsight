import { motion } from 'framer-motion';

interface RevealWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const word = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function RevealWords({ text, className = '', wordClassName = '', as: Tag = 'h1' }: RevealWordsProps) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-wrap justify-center gap-x-[0.22em] overflow-hidden text-center"
      >
        {words.map((w, i) => (
          <motion.span key={i} variants={word} className={`inline-block ${wordClassName}`}>
            {w}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
