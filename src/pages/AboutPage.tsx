import { motion } from 'framer-motion';
import { SectionHeader, TeamCard, GlassCard } from '../components/ui';
import { getTeamData } from '../data';

export function AboutPage() {
  const teamData = getTeamData();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-canvas relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[-10%] right-[-5%] w-[35%] h-[35%] bg-primary/8 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">About Us</h1>
            <p className="text-lg text-charcoal">
              IEEE Kerala Section SIGHT (Special Interest Group on Humanitarian Technology)
              brings together engineers, technologists, and volunteers dedicated to using
              technology for the benefit of humanity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8" flat>
                <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
                <p className="text-charcoal">
                  To promote and inspire humanitarian technology initiatives across Kerala
                  through sustainable engineering practices and meaningful community engagement
                  that addresses real-world challenges.
                </p>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8" flat>
                <h2 className="text-2xl font-bold text-text mb-4">Our Vision</h2>
                <p className="text-charcoal">
                  A Kerala where technology serves as a bridge to inclusive development,
                  where every community has access to sustainable solutions that improve
                  quality of life while preserving our environment.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ExeCom */}
      <section className="py-20 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Executive Committee" subtitle="Meet the team leading our initiatives" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamData.execom.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cloud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Team" subtitle="Dedicated volunteers making impact happen" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
