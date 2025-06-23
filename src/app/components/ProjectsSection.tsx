'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

type Project = {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

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
      <h2 className="text-3xl font-bold mb-8 text-center">
  Projetos
</h2>


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
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex gap-3 text-sm">
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
    </motion.section>
  );
}
