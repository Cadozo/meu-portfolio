'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  doc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  CollectionReference,
} from 'firebase/firestore';

/* ----------------------- TYPES ----------------------- */
type Project = {
  id?: string;
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
};

type Skill = {
  id?: string;
  name: string;
  level: number; // 0–100
  category: 'frontend' | 'backend' | 'database';
  icon?: string; // ex.: SiReact
};
type ProjectDoc = Omit<Project, 'id'>;
type SkillDoc   = Omit<Skill,   'id'>;
type SiteConfig = { about?: string; phone?: string; email?: string };
const categories: Skill['category'][] = [
  'frontend',
  'backend',
  'database',
];

/* -------------------- COMPONENT ---------------------- */
export default function Dashboard() {
  /* --------- siteConfig --------- */
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  /* --------- projects --------- */
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    description: '',
    repoUrl: '',
  });

  /* --------- skills --------- */
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: '',
    level: 50,
    category: 'frontend',
    icon: '',
  });

  /* --------- listeners --------- */
  useEffect(() => {
  /* -------- siteConfig -------- */
  const cfgUnsub = onSnapshot(doc(db, 'siteConfig', 'main'), snap => {
    const d = snap.data() as SiteConfig | undefined;
    setAbout(d?.about ?? '');
    setPhone(d?.phone ?? '');
    setEmail(d?.email ?? '');
  });

  /* -------- projects -------- */
  const projCol  = collection(db, 'projects')  as CollectionReference<ProjectDoc>;
  const projQ    = query(projCol, orderBy('title'));
  const projUnsub = onSnapshot(projQ, snap => {
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });

  /* -------- skills -------- */
  const skillCol = collection(db, 'techStack') as CollectionReference<SkillDoc>;
  const skillQ   = query(skillCol, orderBy('level', 'desc'));
  const skillUnsub = onSnapshot(skillQ, snap => {
    setSkills(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });

  /* -------- cleanup -------- */
  return () => {
    cfgUnsub();
    projUnsub();
    skillUnsub();
  };
}, []);



  /* -------------- actions -------------- */
  async function saveConfig() {
    await updateDoc(doc(db, 'siteConfig', 'main'), { about, phone, email });
    alert('Salvo!');
  }

  /* projects */
  async function addProject() {
    if (!newProject.title.trim()) return alert('Título obrigatório');
    await addDoc(collection(db, 'projects'), newProject);
    setNewProject({ title: '', description: '', repoUrl: '', demoUrl: '' });
  }
  async function removeProject(id: string) {
    await deleteDoc(doc(db, 'projects', id));
  }

  /* skills */
  async function addSkill() {
    if (!newSkill.name.trim()) return alert('Nome obrigatório');
    await addDoc(collection(db, 'techStack'), newSkill);
    setNewSkill({ name: '', level: 50, category: 'frontend', icon: '' });
  }
  async function removeSkill(id: string) {
    await deleteDoc(doc(db, 'techStack', id));
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-24 max-w-5xl mx-auto p-8 text-gray-200">
      {/* -------- CONFIGURAÇÕES -------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Configurações gerais</h2>

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full h-24 p-2 mb-2 bg-card"
          placeholder="Sobre mim"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
          className="w-full p-2 mb-2 bg-card"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 bg-card"
        />
        <button onClick={saveConfig} className="bg-accent py-2 px-4 rounded">
          Salvar dados
        </button>
      </section>

      {/* -------------- PROJETOS -------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projetos</h2>

        <div className="grid gap-4 mb-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-card p-4 rounded flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {p.description}
                </p>
              </div>
              <button
                onClick={() => removeProject(p.id!)}
                className="text-red-400"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* novo projeto */}
        <div className="space-y-2">
          <input
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            placeholder="Título"
            className="w-full p-2 bg-card"
          />

          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="Descrição"
            className="w-full p-2 h-20 bg-card"
          />

          <input
            value={newProject.repoUrl}
            onChange={(e) =>
              setNewProject({ ...newProject, repoUrl: e.target.value })
            }
            placeholder="URL do repositório"
            className="w-full p-2 bg-card"
          />

          <input
            value={newProject.demoUrl || ''}
            onChange={(e) =>
              setNewProject({ ...newProject, demoUrl: e.target.value })
            }
            placeholder="URL da demo (opcional)"
            className="w-full p-2 bg-card"
          />

          <button onClick={addProject} className="bg-accent py-2 px-4 rounded">
            Adicionar projeto
          </button>
        </div>
      </section>

      {/* -------------- SKILLS -------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Linguagens &amp; Tecnologias
        </h2>

        {/* lista */}
        <div className="space-y-3 mb-8">
          {skills.map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              <span className="w-40">{s.name}</span>
              <span className="w-20 text-xs capitalize text-gray-400">
                {s.category}
              </span>
              <span className="w-10 text-xs text-gray-500">{s.level}%</span>
              <button
                onClick={() => removeSkill(s.id!)}
                className="text-red-400"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* novo skill */}
        <div className="grid sm:grid-cols-4 gap-3">
          <input
            value={newSkill.name}
            onChange={(e) =>
              setNewSkill({ ...newSkill, name: e.target.value })
            }
            placeholder="Tecnologia (ex.: React)"
            className="p-2 bg-card col-span-2"
          />

          <input
            type="number"
            min={0}
            max={100}
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill({ ...newSkill, level: Number(e.target.value) })
            }
            className="p-2 bg-card"
          />

          <select
            value={newSkill.category}
            onChange={(e) =>
              setNewSkill({
                ...newSkill,
                category: e.target.value as Skill['category'],
              })
            }
            className="p-2 bg-card"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            value={newSkill.icon}
            onChange={(e) =>
              setNewSkill({ ...newSkill, icon: e.target.value })
            }
            placeholder="Icon (SiReact)"
            className="p-2 bg-card col-span-2 sm:col-span-2"
          />

          <button
            onClick={addSkill}
            className="bg-accent px-4 py-2 rounded sm:col-span-2"
          >
            Adicionar
          </button>
        </div>
      </section>
    </div>
  );
}
