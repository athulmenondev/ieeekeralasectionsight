import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, type ReactNode, type HTMLAttributes, type MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ink' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
}

let rippleId = 0;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...attrs
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2 h-9 rounded-xl tracking-wider',
    md: 'text-sm px-6 py-3 h-11 rounded-2xl tracking-widest',
    lg: 'text-base px-8 py-4 h-14 rounded-[18px] tracking-widest',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'btn-primary shadow-lg shadow-primary/20 border border-primary-bright/20',
    secondary: 'btn-secondary bg-white/10 dark:bg-black/10 backdrop-blur-md border border-primary/30 hover:border-primary text-primary font-bold',
    ink: 'btn-ink shadow-md border border-white/5',
    ghost: 'btn-ghost bg-transparent hover:bg-ink/5 dark:hover:bg-white/5 text-text',
    link: 'text-primary hover:text-primary-bright hover:underline bg-transparent inline uppercase font-bold tracking-wider',
  };

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++rippleId;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1.5, shadow: '0 10px 20px rgba(2,74,216,0.15)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      {...attrs}
      className={`
        btn font-bold uppercase select-none relative z-10
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={variant !== 'link' ? handleClick : undefined}
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute pointer-events-none rounded-full bg-white/20 dark:bg-white/30"
            style={{ left: r.x, top: r.y, width: 8, height: 8, translateX: '-50%', translateY: '-50%' }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 30, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
      {icon && <span className="inline-flex items-center mr-2">{icon}</span>}
      <span className="relative z-10">{attrs.children}</span>
    </motion.button>
  );
}