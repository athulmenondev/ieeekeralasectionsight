import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader, Button, BentoGrid, BentoItem, ProjectCard, VolunteerForm } from '../components/ui';
import { getSiteConfig, getFeaturedProjects } from '../data';

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const siteConfig = getSiteConfig();
  const featuredProjects = getFeaturedProjects();

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-white to-primary/5" />
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              IEEE Kerala Section SIGHT
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
              Humanitarian Technology
              <span className="block text-primary">for a Better Tomorrow</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              {siteConfig.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <Button size="lg">Explore Projects</Button>
              </Link>
              <Link to="/#volunteer">
                <Button variant="secondary" size="lg">Join as Volunteer</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-text/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-text/40 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Impact"
            subtitle="Measurable change across communities in Kerala"
          />
          <BentoGrid>
            {siteConfig.metrics.map((metric, index) => (
              <BentoItem key={metric.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-muted text-sm">{metric.label}</div>
                </motion.div>
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="Discover how technology is transforming communities"
            className="text-left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button variant="secondary">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section id="volunteer" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="Join Our Mission"
                subtitle="Your skills can make a real difference. Become part of a community of engineers and technologist working for social good."
                className="!mb-0 text-left"
              />
            </div>
            <div>
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}