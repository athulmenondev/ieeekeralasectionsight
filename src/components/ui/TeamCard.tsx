import { motion } from 'framer-motion';
import type { TeamMember, ExecomMember } from '../../types';

interface TeamCardProps {
  member: TeamMember | ExecomMember;
  className?: string;
}

export function TeamCard({ member, className = '' }: TeamCardProps) {
  const isExecom = 'position' in member;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card group p-6 text-center relative overflow-hidden flex flex-col items-center justify-between min-h-[250px] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none opacity-60" />
      
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Avatar Ring */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-white/60 dark:border-white/10 flex items-center justify-center overflow-hidden mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-bold text-primary dark:text-primary-bright tracking-wider">
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-text tracking-tight mb-1">{member.name}</h3>
        <p className="text-primary dark:text-primary-bright text-xs font-bold uppercase tracking-wider mb-2">
          {isExecom ? (member as ExecomMember).position : member.role}
        </p>
        
        {isExecom && (
          <p className="text-graphite font-medium text-[11px] bg-white/50 dark:bg-black/20 border border-hairline/30 px-2.5 py-0.5 rounded-full mb-3">
            Tenure: {(member as ExecomMember).tenure}
          </p>
        )}
        
        <p className="text-charcoal dark:text-dark-foreground text-xs leading-relaxed max-w-[200px] line-clamp-3">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}