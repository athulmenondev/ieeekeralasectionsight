import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden ${className}`}
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/5 relative">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-white text-xs font-medium rounded">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{project.title}</h3>
        <p className="text-muted text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted">📍 {project.location}</span>
          <span className="text-primary font-medium">{project.impact}</span>
        </div>
      </div>
    </motion.div>
  );
}