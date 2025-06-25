// components/SkillsSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy , CollectionReference} from 'firebase/firestore';
import * as SI from 'react-icons/si';
import { FiCode } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons'; 

type Skill = {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database';
  icon?: keyof typeof SI;
};
type SkillDoc = Omit<Skill, 'id'>;

const catColor: Record<Skill['category'], string> = {
  frontend: 'bg-indigo-500',
  backend:  'bg-emerald-500',
  database: 'bg-yellow-500',
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);

  /* ---------- Firestore ---------- */
  useEffect(() => {
  (async () => {
    const col = collection(db, 'techStack') as CollectionReference<SkillDoc>;
    const snap = await getDocs(query(col, orderBy('level', 'desc')));
    setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  })();
}, []);

  return (
    <section id="skills" className="max-w-5xl mx-auto mt-32 px-6 text-gray-200">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Linguagens&nbsp;&amp;&nbsp;Tecnologias
      </h2>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => {
          const Icon: IconType = (s.icon && SI[s.icon as keyof typeof SI]) || FiCode;
          const dir = i % 2 === 0 ? -150 : 150; // alterna origem

          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: dir }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              whileHover={{
                y: -4,
                scale: 1.03,
                boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
              }}
              className="p-5 rounded-xl bg-glass border border-white/10 shadow-glass"
            >
              <div className="flex items-center gap-4">
                <Icon className="text-3xl text-accent shrink-0" />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{s.name}</span>
                    <span
                      className={`${catColor[s.category]} text-xs px-2 py-0.5 rounded-full capitalize`}
                    >
                      {s.category}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#2b2d33] rounded overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1 }}
                      style={{ width: `${s.level}%`, transformOrigin: '0% 50%' }}
                      className="h-2 bg-gradient-to-r from-accent to-accent2 rounded"
                    />
                  </div>
                </div>

                <span className="w-10 text-sm text-gray-400 text-right">
                  {s.level}%
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
