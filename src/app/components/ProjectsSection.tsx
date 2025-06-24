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

  /* ---------- Firestore ---------- */
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'projects'));
      setProjects(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Project)),
      );
    })();
  }, []);

  return (
    <section
      id="projects"
      /* fundo fixo cobre TODA a viewport; conteúdo desfila por cima */
      className="
        relative text-gray-200 overflow-hidden
        bg-[url('/tech-bg.png')] bg-cover bg-center bg-fixed
        before:absolute before:inset-0 before:bg-black/50 before:-z-10   /* leve escurecida */
      "
    >
      {/* ---------- conteúdo centralizado ---------- */}
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

                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {p.description}
                  </p>

                  <div className="mt-auto flex gap-4 text-sm">
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline"
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
  );
}
