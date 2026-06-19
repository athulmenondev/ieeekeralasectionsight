import { useState } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from '../components/ui';
import { getProjectsData } from '../data';

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: 'bg-success/20 text-success border-success/30', label: 'Completed' },
  ongoing: { color: 'bg-primary/20 text-primary-bright border-primary/30', label: 'Active' },
  planning: { color: 'bg-warning/20 text-warning border-warning/30', label: 'In Testing' },
};

export function ProjectsPage() {
  const { projects, categories } = getProjectsData();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activeStatus && (p.details?.status || 'ongoing') !== activeStatus) return false;
    return true;
  });

  return (
    <main className="min-h-screen flex flex-col pt-20 md:pt-24 bg-canvas text-text selection:bg-primary/30">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">
              IEEE Kerala Section SIGHT
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text via-text/90 to-charcoal">
              Our Projects
            </h1>
            <p className="text-base md:text-lg text-charcoal max-w-2xl leading-relaxed">
              Explore our portfolio of humanitarian technology initiatives making a tangible difference across Kerala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Sticky Filter Bar */}
      <section className="sticky top-16 md:top-20 z-30 bg-canvas/40 backdrop-blur-xl border-b border-hairline/30 transition-all duration-300">
        <div className="container-site py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveCategory(null); setActiveStatus(null); }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 ${
                activeCategory === null && activeStatus === null
                  ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'bg-white/40 dark:bg-[#242424]/40 border-hairline/40 text-charcoal hover:bg-white/80 dark:hover:bg-[#242424]/80 hover:text-text'
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/25 scale-[1.02]'
                    : 'bg-white/40 dark:bg-[#242424]/40 border-hairline/40 text-charcoal hover:bg-white/80 dark:hover:bg-[#242424]/80 hover:text-text'
                }`}
              >
                {category}
              </button>
            ))}
            {Object.entries(statusConfig).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setActiveStatus(activeStatus === key ? null : key)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all duration-300 ${
                  activeStatus === key
                    ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/25 scale-[1.02]'
                    : 'bg-white/40 dark:bg-[#242424]/40 border-hairline/40 text-charcoal hover:bg-white/80 dark:hover:bg-[#242424]/80 hover:text-text'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs font-medium text-graphite/80 tracking-wide">
            Displaying {filteredProjects.length} of {projects.length} innovations
          </div>
        </div>
      </section>

      {/* Bento Grid Implementation */}
      <section className="py-12 md:py-16 flex-1 relative">
        <div className="container-site">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-6">
              {filteredProjects.map((project, index) => {
                // Procedural distribution of bento block shapes inspired by image 2026-06-19_21-01.jpg
                const isFeatured = index % 5 === 0; 
                const isWide = index % 5 === 1;
                const isAccentColor = index % 5 === 3;

                let gridClasses = "col-span-1 row-span-1";
                if (isFeatured) gridClasses = "md:col-span-2 md:row-span-2";
                else if (isWide) gridClasses = "md:col-span-2 md:row-span-1";
                else if (isAccentColor) gridClasses = "col-span-1 md:row-span-2";

                const currentStatus = statusConfig[project.details?.status || 'ongoing'];

                return (
                  <motion.div
                    key={project.id}
                    className={`${gridClasses} group relative flex flex-col justify-between overflow-hidden rounded-[24px] transition-all duration-300`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isFeatured ? (
                      /* FEATURED HERO BENTO BOX (Image background + Glass banner overlay) */
                      <div className="absolute inset-0 w-full h-full flex flex-col justify-end p-6 bg-charcoal">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-deep to-ink opacity-40" />
                        )}
                        
                        {/* Floating Fluid Glass Card inside Featured Box */}
                        <div className="relative z-20 glass-card p-5 !bg-black/30 backdrop-blur-md border-white/10 text-white rounded-xl">
                          <div className="flex gap-2 mb-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-600/80 rounded border border-blue-400/30">
                              {project.category}
                            </span>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${currentStatus.color}`}>
                              {currentStatus.label}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold tracking-tight mb-2 line-clamp-1">{project.title}</h3>
                          <p className="text-xs text-white/70 line-clamp-2 mb-3">{project.description}</p>
                          {project.impact && (
                            <div className="text-[11px] font-medium text-primary-soft/90 bg-white/5 inline-block px-2.5 py-1 rounded">
                              Impact: {project.impact}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : isAccentColor ? (
                      /* BRAND COLOR BENTO BOX (Deep Primary Gradient) */
                      <div className="absolute inset-0 w-full h-full p-6 bg-gradient-to-b from-primary to-primary-deep text-on-primary flex flex-col justify-between border border-primary-bright/20 shadow-inner">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                            <span className="text-xl">⚡</span>
                          </div>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-black/20 px-2 py-0.5 rounded border border-white/10">
                            {project.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight mb-3 leading-snug">{project.title}</h3>
                          <p className="text-xs text-on-primary/70 line-clamp-4 mb-4">{project.description}</p>
                          <button className="w-full text-center py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm">
                            DETAILS
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* STANDARD LIQUID GLASS CARD BENTO VARIATION */
                      <div className="glass-card absolute inset-0 w-full h-full p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 bg-primary/10 rounded border border-primary/20">
                              {project.category}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-graphite/40" />
                          </div>
                          <h3 className="text-lg font-bold text-text tracking-tight group-hover:text-primary transition-colors line-clamp-1 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-xs text-charcoal leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                        {project.impact && (
                          <div className="text-[11px] font-semibold text-graphite/80 bg-cloud px-2.5 py-1 rounded-lg border border-hairline/30 w-fit">
                            Impact: {project.impact}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 glass-card max-w-xl mx-auto p-8">
              <svg className="w-12 h-12 mx-auto text-graphite/60 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17.25v-.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v.75m-4.5 0a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5m-4.5 0H6.375a2.625 2.625 0 0 1-2.625-2.625V5.25a2.625 2.625 0 0 1 2.625-2.625h11.25a2.625 2.625 0 0 1 2.625 2.625v9.375a2.625 2.625 0 0 1-2.625 2.625h-3.75m-4.5 0h4.5" />
              </svg>
              <p className="text-text text-lg font-bold tracking-tight mb-1">No Projects Found</p>
              <p className="text-charcoal text-sm">Refine your configuration or select another operational scope.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Board */}
      <section className="py-16 md:py-20 relative bg-ink text-on-ink overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/20 via-transparent to-transparent opacity-60" />
        <div className="container-site relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[{ value: `${projects.length}+`, label: "Active Deployments" },
              { value: categories.length, label: "Focus Disciplines" },
              { value: "14", label: "Districts Documented" },
              { value: "50+", label: "Allied Organizations" }].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                <div className="text-3xl md:text-4xl font-black text-primary-bright tracking-tight mb-1"><CountUp value={stat.value} /></div>
                <div className="text-on-ink/60 text-xs uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}