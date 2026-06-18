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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center ${className}`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <span className="text-2xl font-bold text-primary">
          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{member.name}</h3>
      <p className="text-primary text-sm font-medium mb-1">{isExecom ? (member as ExecomMember).position : member.role}</p>
      {isExecom && (
        <p className="text-muted text-xs mb-2">Tenure: {(member as ExecomMember).tenure}</p>
      )}
      <p className="text-muted text-sm">{member.bio}</p>
    </motion.div>
  );
}