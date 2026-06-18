import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui';
import { getFieldNotesData } from '../data';
import type { FieldNote } from '../types';

export function FieldNotesPage() {
  const { notes } = getFieldNotesData();
  const [selectedNote, setSelectedNote] = useState<FieldNote | null>(null);

  const featuredNote = notes.find((n) => n.featured);
  const otherNotes = notes.filter((n) => !n.featured);

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
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">Field Notes</h1>
            <p className="text-lg text-muted">
              Stories from the ground. Follow our volunteers and partners as they document
              the impact of technology on communities across Kerala.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredNote && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedNote(featuredNote)}
              className="bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-primary/50 text-6xl">📖</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <span className="text-muted text-sm">{featuredNote.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-text mb-3">{featuredNote.title}</h2>
                  <p className="text-muted mb-4">{featuredNote.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span>By {featuredNote.author}</span>
                    <span>•</span>
                    <span>{featuredNote.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* All Stories */}
      <section className="py-12 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="More Stories" subtitle="Every project has a story worth telling" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNotes.map((note, index) => (
              <motion.article
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedNote(note)}
                className="bg-white/45 backdrop-blur-md border border-white/20 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all"
              >
                <span className="text-muted text-sm">{note.category}</span>
                <h3 className="text-lg font-semibold text-text mt-2 mb-3">{note.title}</h3>
                <p className="text-muted text-sm line-clamp-2 mb-4">{note.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span>{note.author}</span>
                  <span>•</span>
                  <span>{note.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedNote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedNote(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                {selectedNote.category}
              </span>
              <span className="text-muted text-sm">{selectedNote.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-text mb-2">{selectedNote.title}</h2>
            <p className="text-muted text-sm mb-6">By {selectedNote.author}</p>
            <div className="prose prose-sm text-text/80">
              {selectedNote.content}
            </div>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-6 px-4 py-2 bg-surface text-text rounded-lg hover:bg-text/10 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}