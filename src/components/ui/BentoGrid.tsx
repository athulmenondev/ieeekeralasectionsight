import type { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  span?: 'featured' | 'wide' | 'tall' | 'default';
}

export function BentoItem({ children, className = '', span = 'default' }: BentoItemProps) {
  const spanClasses: Record<string, string> = {
    featured: 'md:col-span-2 md:row-span-2',
    wide: 'md:col-span-2 md:row-span-1',
    tall: 'md:col-span-1 md:row-span-2',
    default: 'md:col-span-1 md:row-span-1',
  };

  return (
    <div className={`${spanClasses[span]} ${className}`}>
      {children}
    </div>
  );
}
