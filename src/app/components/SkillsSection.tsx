'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import * as SI from 'react-icons/si';                 // todos os ícones
import { FiCode } from 'react-icons/fi';

type Skill = {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database';
  icon?: string;
};

const catColor: Record<Skill['category'], string> = {
  frontend: 'bg-indigo-500',
  backend: 'bg-emerald-500',
  database: 'bg-yellow-500',
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(
        query(collection(db, 'techStack'), orderBy('level', 'desc')),
      );
      setSkills(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) } as Skill)),
      );
    })();
  }, []);

  return (
    <section id="skills" className="max-w-5xl mx-auto mt-20 text-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center">
  Linguagens &amp; Tecnologias
</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s) => {
          // escolhe ícone dinâmico
          const Icon =
            (s.icon && (SI as any)[s.icon as keyof typeof SI]) || FiCode;

          return (
            <div
              key={s.id}
              className="flex items-center gap-4 p-4 bg-card rounded-xl shadow shadow-black/30"
            >
              {/* ícone */}
              <Icon className="text-3xl text-accent shrink-0" />

              <div className="flex-1 space-y-1">
                {/* nome + badge */}
                <div className="flex justify-between items-center">
                  <span className="font-medium">{s.name}</span>
                  <span
                    className={`${catColor[s.category]} text-xs px-2 py-0.5 rounded-full capitalize`}
                  >
                    {s.category}
                  </span>
                </div>

                {/* barra de progresso */}
                <div className="w-full h-2 bg-[#2b2d33] rounded">
                  <div
                    style={{ width: `${s.level}%` }}
                    className="h-2 rounded bg-gradient-to-r from-accent to-accent2"
                  />
                </div>
              </div>
              {/* percentual */}
              <span className="w-10 text-sm text-gray-400 text-right">
                {s.level}%
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
