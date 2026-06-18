import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader, ProjectCard, Button } from '../components/ui';
import { getProjectsData } from '../data';

export function ProjectsPage() {
  const { projects, categories } = getProjectsData();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-surface to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">Our Projects</h1>
            <p className="text-lg text-muted">
              Explore our portfolio of humanitarian technology initiatives
              making a tangible difference across Kerala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sticky top-16 bg-surface/80 backdrop-blur-md z-10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-white/50 text-text hover:bg-white'
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white/50 text-text hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-text text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{projects.length}+</div>
              <div className="text-white/60 text-sm">Active Projects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-white/60 text-sm">Focus Areas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">14</div>
              <div className="text-white/60 text-sm">Districts Covered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-white/60 text-sm">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}