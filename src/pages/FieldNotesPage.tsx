import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, GlassCard } from '../components/ui';
import { getFieldNotesData } from '../data';
import type { FieldNote } from '../types';

export function FieldNotesPage() {
  const data = getFieldNotesData();
  
  // Safely map the data: if it's an array, use it directly. 
  // If it's an object containing a notes/fieldNotes array, look for those instead.
  const notes = Array.isArray(data) 
    ? data 
    : (data as any)?.notes || (data as any)?.fieldNotes || [];

  const [selectedNote, setSelectedNote] = useState<FieldNote | null>(null);

  const featuredNote = notes.find((n) => n.featured);
  const otherNotes = notes.filter((n) => !n.featured);

  // ... rest of your return JSX stays exactly the same
  return (
    <main className="pt-20 bg-canvas text-text min-h-screen selection:bg-secondary/20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="absolute top-[-10%] left-[20%] w-[45%] h-[45%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text via-text to-charcoal">
              Field Notes
            </h1>
            <p className="text-base md:text-lg text-charcoal leading-relaxed">
              Direct telemetry from human-centered initiatives. Follow our active engineers and volunteers across Kerala as they document localized design deployments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Featured Entry */}
      {featuredNote && (
        <section className="py-8 bg-cloud/30 border-t border-b border-hairline/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedNote(featuredNote)}
              className="glass-card overflow-hidden cursor-pointer group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 aspect-[16/9] lg:aspect-auto bg-gradient-to-br from-primary/20 via-primary-soft/10 to-transparent flex items-center justify-center border-b lg:border-b-0 lg:border-r border-hairline/30 relative overflow-hidden">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500 z-10 filter drop-shadow-md">📖</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-8 lg:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-0.5 bg-secondary text-white text-[10px] font-extrabold uppercase tracking-widest rounded-md shadow-sm">
                        Featured Entry
                      </span>
                      <span className="text-graphite font-bold text-xs uppercase tracking-wide">{featuredNote.category}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text mb-3 group-hover:text-primary transition-colors">
                      {featuredNote.title}
                    </h2>
                    <p className="text-charcoal text-sm leading-relaxed mb-6">
                      {featuredNote.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-graphite border-t border-hairline/20 pt-4">
                    <span className="text-text">By {featuredNote.author}</span>
                    <span>•</span>
                    <span>{featuredNote.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Grid Collections */}
      <section className="py-16 pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Archived Records" subtitle="Every regional deployment leaves a blueprint worth documenting" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {otherNotes.map((note, index) => (
              <motion.article
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedNote(note)}
                className="glass-card p-6 cursor-pointer flex flex-col justify-between group min-h-[300px]"
              >
                <div>
                  <span className="text-primary font-bold text-[11px] uppercase tracking-wider block mb-2">
                    {note.category}
                  </span>
                  <h3 className="text-lg font-bold text-text tracking-tight group-hover:text-primary transition-colors mt-1 mb-2 line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-charcoal text-xs leading-relaxed line-clamp-3 mb-4">
                    {note.excerpt}
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-white/60 dark:bg-black/20 text-charcoal border border-hairline/30 text-[10px] font-medium rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-graphite border-t border-hairline/20 pt-3">
                    <span className="text-charcoal">{note.author}</span>
                    <span>•</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphic Modal Viewer Overlay */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-paper/80 dark:bg-card-dark/80 border border-white/20 dark:border-white/5 shadow-2xl rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-0.5 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider rounded">
                  {selectedNote.category}
                </span>
                <span className="text-graphite font-medium text-xs">{selectedNote.date}</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-text mb-1">{selectedNote.title}</h2>
              <p className="text-primary text-xs font-semibold mb-6">Documented by {selectedNote.author}</p>
              
              <div className="prose prose-sm dark:prose-invert text-charcoal dark:text-dark-foreground text-sm leading-relaxed max-w-none border-t border-hairline/20 pt-4">
                {selectedNote.content}
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-5 py-2 bg-primary hover:bg-primary-deep text-on-primary text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-primary/20"
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}