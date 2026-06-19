import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
  span?: 'featured' | 'wide' | 'tall' | 'default';
}

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: 'bg-success/20 text-success border-success/30', label: 'Completed' },
  ongoing: { color: 'bg-primary/20 text-primary-bright border-primary/30', label: 'Active' },
  planning: { color: 'bg-warning/20 text-warning border-warning/30', label: 'In Testing' },
};

export function ProjectCard({ project, className = '', span = 'default' }: ProjectCardProps) {
  const status = project.details?.status || 'ongoing';
  const s = statusConfig[status];
  const isFeatured = span === 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-card group h-full flex flex-col justify-between relative overflow-hidden transition-all duration-400 ${
        isFeatured ? 'p-6 md:p-8' : 'p-5 md:p-6'
      } ${className}`}
    >
      {/* High-visibility internal tint path gradient as seen in image_2d5c3f.png and image_2d5c42.png */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        {/* Header Badges Layout */}
        <div className="flex items-start justify-between gap-3">
          <div className={`${isFeatured ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl bg-primary/10 border border-primary/20 dark:bg-white/5 dark:border-white/10 flex items-center justify-center shrink-0 text-xl shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            {project.icon || <span className="text-primary-bright">⚡</span>}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-primary-soft rounded border border-primary/20 dark:border-white/15">
              {project.category}
            </span>
            {project.details && (
              <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${s.color}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {s.label}
              </span>
            )}
          </div>
        </div>

        {/* Info Layout */}
        <div className="flex-1">
          <h3 className={`font-bold text-text tracking-tight mb-2 group-hover:text-primary dark:group-hover:text-primary-bright transition-colors ${
            isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          }`}>
            {project.title}
          </h3>
          <p className={`text-xs text-charcoal dark:text-dark-foreground leading-relaxed ${
            isFeatured ? 'line-clamp-4' : 'line-clamp-3'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Bottom Highlights Row */}
        {isFeatured && project.details?.highlights && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.details.highlights.slice(0, 2).map((h, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/40 dark:bg-black/20 text-charcoal dark:text-dark-foreground border border-hairline/30">
                {h}
              </span>
            ))}
            {project.details.partners && project.details.partners.length > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/40 dark:bg-black/20 text-graphite border border-hairline/30">
                +{project.details.partners.length} partners
              </span>
            )}
          </div>
        )}

        {/* Footer Row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-hairline/20 mt-auto text-xs font-semibold text-charcoal/90">
          <span className="flex items-center gap-1">📍 {project.location}</span>
          {project.impact && (
            <span className="text-[11px] font-bold text-primary dark:text-primary-soft bg-primary/5 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-primary/10 dark:border-white/5 w-fit">
              Impact: {project.impact}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}