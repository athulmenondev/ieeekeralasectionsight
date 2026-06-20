import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, ProjectCard, VolunteerForm, KeralaWave, CountUp, RevealWords } from '../components/ui';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { getSiteConfig, getProjectsData } from '../data';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 },
  },
};

const sectionHeaderItemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(heroProgress, [0, 1], ['0%', '42%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.8], [1, 0.92]);
  const meshOneY = useTransform(heroProgress, [0, 1], ['0%', '64%']);
  const meshTwoY = useTransform(heroProgress, [0, 1], ['0%', '-48%']);
  const deepWaveY = useTransform(heroProgress, [0, 1], ['0%', '18%']);
  const midWaveY = useTransform(heroProgress, [0, 1], ['0%', '32%']);
  const surfaceWaveY = useTransform(heroProgress, [0, 1], ['0%', '48%']);

  const siteConfig = getSiteConfig();
  const { projects } = getProjectsData();
  const projectsList = projects.slice(0, 5);

  return (
    <main className="min-h-screen flex flex-col bg-canvas text-text selection:bg-primary/20">
      {/* Premium Thin Fluid Progress Tracking Bar */}
      <motion.div
        className="progress-bar !h-[2px] bg-gradient-to-r from-primary via-primary-bright to-secondary"
        style={{ scaleX: pageProgress }}
      />

      {/* ── Hero ── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-canvas"
      >
        {/* Layered fluid mesh glows sitting beneath waves */}
        <motion.div
          style={{ y: meshOneY }}
          animate={{ x: [0, 18, -12, 8, 0], scale: [1, 1.08, 0.96, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          style={{ y: meshTwoY }}
          animate={{ x: [0, -16, 10, -8, 0], scale: [1, 1.06, 0.98, 1.03, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 2 }}
          className="absolute bottom-[5%] right-[-10%] w-[45%] h-[45%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"
        />

        <motion.div style={{ y: deepWaveY }} className="absolute inset-0 pointer-events-none">
          <KeralaWave depth="deep" />
        </motion.div>
        <motion.div style={{ y: midWaveY }} className="absolute inset-0 pointer-events-none">
          <KeralaWave depth="mid" />
        </motion.div>
        <motion.div style={{ y: surfaceWaveY }} className="absolute inset-0 pointer-events-none">
          <KeralaWave depth="surface" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 w-full max-w-5xl mx-auto px-4 md:px-12 text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-bold uppercase tracking-widest text-primary mb-4"
            >
              Advancing Technology for Humanity
            </motion.span>

            <RevealWords
              as="h1"
              text="Humanitarian Technology"
              className="mb-6 w-full text-center text-5xl font-black leading-[1.02] tracking-tight text-text sm:text-6xl md:text-7xl lg:text-[85px]"
              wordClassName="bg-gradient-to-b from-text via-text to-charcoal bg-clip-text text-transparent"
            />

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-charcoal dark:text-dark-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
              IEEE SIGHT Kerala Section brings together engineers and technologists to solve real-world problems in local communities through sustainable technical deployments.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link to="/projects">
                <Button variant="primary" size="lg" className="rounded-full shadow-lg shadow-primary/25">
                  Explore Deployments
                </Button>
              </Link>
              <Link to="/volunteer">
                <Button variant="secondary" size="lg" className="rounded-full">
                  Our Mission
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] text-charcoal font-bold tracking-widest uppercase opacity-60">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            className="w-5 h-8 rounded-full border border-charcoal/30 flex items-start justify-center p-1 backdrop-blur-sm"
          >
            <motion.div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Impact Section ── */}
      <section className="relative py-24 md:py-32 bg-cloud/30 border-t border-b border-hairline/20">
        <motion.div
          animate={{ y: [0, -16, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 2 }}
          className="absolute top-[30%] right-[5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
        />
        <div className="container-site relative z-10">
          <motion.div
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={sectionHeaderItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-black text-text tracking-tight mb-4">Our Impact</motion.h2>
            <motion.p variants={sectionHeaderItemVariants} className="text-sm md:text-base text-charcoal max-w-2xl mx-auto font-medium">Tangible blueprints where targeted engineering answers localized needs.</motion.p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 md:p-8 text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-primary dark:text-primary-bright mb-2 tracking-tight">
                  <CountUp value={metric.value} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wide text-charcoal/80 leading-snug">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects Section ── */}
      <section className="relative py-24 md:py-32 bg-canvas">
        {/* Anchor mesh lights behind bento matrix items */}
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="absolute top-[40%] left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[110px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 16, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 3 }}
          className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-[90px] pointer-events-none"
        />

        <div className="container-site relative z-10">
          <motion.div
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <motion.h2 variants={sectionHeaderItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-black text-text tracking-tight mb-3">Featured Core Projects</motion.h2>
              <motion.p variants={sectionHeaderItemVariants} className="text-sm md:text-base text-charcoal max-w-xl font-medium">Technological solutions mapped dynamically to underserved communities.</motion.p>
            </div>
            <motion.div variants={sectionHeaderItemVariants}>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-bright transition-colors"
            >
              View All Projects →
            </Link>
            </motion.div>
          </motion.div>

          <BentoGrid>
            {projectsList.map((project, index) => {
              const span = index === 0 ? 'featured' : 'default';
              return (
                <BentoItem key={project.id} span={span} className="!bg-transparent shadow-none border-0">
                  <ProjectCard project={project} span={span} />
                </BentoItem>
              );
            })}
          </BentoGrid>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center md:hidden">
            <Link to="/projects">
              <Button variant="secondary" className="rounded-full w-full">View All Projects</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Volunteer Panel Section ── */}
      <section className="relative py-24 md:py-32 bg-cloud/30 border-t border-b border-hairline/20">
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <motion.div variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="lg:col-span-2">
              <motion.h2 variants={sectionHeaderItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-black text-text tracking-tight mb-4">Be the change</motion.h2>
              <motion.p variants={sectionHeaderItemVariants} className="text-base text-primary dark:text-primary-bright font-bold uppercase tracking-wide mb-4">Your Engineering Skills Can Save Lives</motion.p>
              <motion.p variants={sectionHeaderItemVariants} className="text-xs md:text-sm text-charcoal dark:text-dark-foreground leading-relaxed mb-8">
                We look for passionate engineers, user-focused designers, and students who believe technology should function as an engine for social equity. Join an ecosystem of Kerala's brightest humanitarian minds.
              </motion.p>

              <div className="space-y-4">
                {[
                  { title: "Technical Mentorship", desc: "Guide student squads in developing scalable open source nodes for regional challenges.", icon: "🎓" },
                  { title: "Field Deployment Operations", desc: "Participate in direct on-ground deployment logistics and iterative testing workflows.", icon: "🌐" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass-card !bg-white/30">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-lg">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm text-text">{item.title}</h4>
                      <p className="text-xs text-charcoal dark:text-dark-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3 glass-card p-1 md:p-2 !bg-white/20">
              <VolunteerForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="relative py-24 md:py-32 bg-canvas">
        <div className="container-site relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <motion.div variants={sectionHeaderVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="lg:col-span-2 pt-4">
              <motion.h2 variants={sectionHeaderItemVariants} className="text-3xl md:text-4xl lg:text-5xl font-black text-text tracking-tight mb-4">Get in Touch</motion.h2>
              <motion.p variants={sectionHeaderItemVariants} className="text-sm text-charcoal dark:text-dark-foreground leading-relaxed mb-8">
                Interested in collaborating on technical pilots, tracking ecosystem telemetry, or initiating partnerships? Signal our channels below.
              </motion.p>

              <div className="flex flex-wrap gap-2">
                {['Partner Pass', 'Media Sync', 'Technical Support', 'Grants Matrix'].map((topic) => (
                  <span key={topic} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/50 dark:bg-black/25 border border-hairline/40 text-charcoal">
                    {topic}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:col-span-3">
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="glass-card p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-hairline/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-text text-xs transition-all"
            placeholder="Identity Profile"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-hairline/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-text text-xs transition-all"
            placeholder="routing@domain.com"
          />
        </div>
      </div>

      <div className="relative z-10">
        <label htmlFor="inquiry" className="block text-xs font-bold uppercase tracking-wider text-text mb-2">Inquiry Intent Matrix</label>
        <select
          id="inquiry"
          required
          className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-hairline/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-text text-xs transition-all appearance-none"
        >
          <option value="" className="dark:bg-card-dark">Select Intent</option>
          <option value="partnership" className="dark:bg-card-dark">Alliance Partnership</option>
          <option value="collaboration" className="dark:bg-card-dark">Project Co-Deployment</option>
          <option value="general" className="dark:bg-card-dark">General Scope Query</option>
        </select>
      </div>

      <div className="relative z-10">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text mb-2">Message Specification</label>
        <textarea
          id="message"
          required
          rows={4}
          className="w-full px-4 py-3 bg-white/50 dark:bg-black/30 border border-hairline/40 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-text text-xs transition-all resize-none"
          placeholder="Append core log parameters..."
        />
      </div>

      <Button type="submit" fullWidth className="!rounded-xl shadow-lg mt-2 shadow-primary/10 tracking-widest text-xs uppercase font-extrabold">
        Dispatch Message Pass
      </Button>
    </form>
  );
}
