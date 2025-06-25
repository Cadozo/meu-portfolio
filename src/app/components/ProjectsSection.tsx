// components/ProjectsSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

type Project = {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  cover?: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null); // ← modal

  /* ---------- Firestore ---------- */
  useEffect(() => {
  (async () => {
    const snap = await getDocs(collection(db, 'projects'));

    setProjects(
      snap.docs.map(
        (d) =>
          ({
            id: d.id,
            ...(d.data() as Omit<Project, 'id'>),
          } as Project),
      ),
    );
  })();
}, []);

  return (
    <>
      {/* ---------- modal “leia mais” ---------- */}
{selected && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    onClick={() => setSelected(null)}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      onClick={(e) => e.stopPropagation()}
      className="max-w-lg w-full bg-[#1c1e24] rounded-2xl p-8 text-gray-200 relative"
    >
      <button
        onClick={() => setSelected(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-accent"
      >
        ✕
      </button>

      <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>

      {/* área rolável se o texto for grande */}
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        <p className="whitespace-pre-line leading-relaxed">
          {selected.description}
        </p>
      </div>

      <div className="flex gap-4 text-sm mt-6">
        <a
          href={selected.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          GitHub
        </a>
        {selected.demoUrl && (
          <a
            href={selected.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent hover:underline"
          >
            Demo
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
)}


      {/* ---------- seção de projetos ---------- */}
      <section
        id="projects"
        className="relative min-h-[600px] overflow-hidden mt-32 text-gray-200
                   bg-[url('/tech-bg.png')] bg-cover bg-center bg-fixed"
      >
        <div className="max-w-5xl mx-auto px-6 pt-32 pb-32">
          <h2 className="text-3xl font-bold mb-10 text-center text-accent">
            Projetos em Destaque
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Tilt
                  tiltMaxAngleX={6}
                  tiltMaxAngleY={6}
                  scale={1.02}
                  glareEnable
                  glareMaxOpacity={0.2}
                  className="group"
                >
                  <article className="bg-glass backdrop-blur-glass rounded-2xl p-6 border border-white/10 shadow-glass hover:shadow-xl transition flex flex-col h-full">
                    {p.cover && (
                      <Image
                        src={p.cover}
                        alt=""
                        width={500}
                        height={280}
                        className="rounded-lg mb-4 object-cover"
                      />
                    )}

                    <h3 className="text-lg font-semibold text-gray-100 mb-1">
                      {p.title}
                    </h3>

                    {/* descrição truncada */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                      {p.description}
                    </p>

                    <div className="flex gap-4 text-sm mt-auto">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-accent hover:underline"
                      >
                        Leia mais
                      </button>
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accent hover:underline"
                      >
                        GitHub
                      </a>
                      {p.demoUrl && (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-accent hover:underline"
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
        </div>
      </section>
    </>
  );
}
