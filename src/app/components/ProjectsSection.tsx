'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

type Project = {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  /* ---------- Fetch Firestore ---------- */
  useEffect(() => {
    async function fetchProjects() {
      const snap = await getDocs(collection(db, 'projects'));
      setProjects(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Project))
      );
    }
    fetchProjects();
  }, []);

  /* ---------- Render ---------- */
  return (
    <motion.section
      id="projects"
      className="max-w-5xl mx-auto mt-20 text-gray-200"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Projetos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              glareEnable
              glareColor="#ffffff22"
            >
              <article className="bg-glass backdrop-blur-glass rounded-2xl p-6 border border-white/10 shadow-glass hover:shadow-xl transition">
                <h3 className="text-lg font-semibold text-gray-100 mb-1">
                  {p.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3 transition-all duration-300">
                  {p.description}
                </p>

                {p.description.length > 150 && (
                  <button
                    onClick={() => setSelected(p)}
                    className="text-accent text-xs hover:underline"
                  >
                    Leia mais
                  </button>
                )}

                <div className="flex gap-3 text-sm mt-2">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    className="text-accent"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      className="hover:text-accent"
                      rel="noreferrer"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </article>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* ---------- Modal de detalhes ---------- */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Center wrapper */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90
+            text-gray-100 w-full max-w-lg p-6
+            rounded-2xl shadow-xl shadow-accent/10
+            border border-white/10 ring-1 ring-accent/20
+            relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-2xl leading-none"
              aria-label="Fechar"
            >
              &times;
            </button>

            <Dialog.Title className="text-2xl font-bold mb-3">
              {selected?.title}
            </Dialog.Title>

            <p className="whitespace-pre-line mb-6">{selected?.description}</p>

            <div className="flex gap-4 text-sm">
              {selected?.repoUrl && (
                <a
                  href={selected.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>
              )}
              {selected?.demoUrl && (
                <a
                  href={selected.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  Demo
                </a>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </motion.section>
  );
}
