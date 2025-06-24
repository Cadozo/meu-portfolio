// components/AboutSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

type AboutData = { about?: string };

export default function AboutSection() {
  const [data, setData] = useState<AboutData>({});

  /* ---------- Firestore ---------- */
  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'siteConfig', 'main'));
      if (snap.exists()) setData(snap.data() as AboutData);
    })();
  }, []);

  if (!data.about) return null;

  const textVariants = {
    rest:  { x: 0,  opacity: 1 },
    hover: { x: 12, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto mt-32 px-6 text-gray-200 flex flex-col md:flex-row items-center gap-10 group"
    >
      {/* ---------- foto circular sem borda quadrada ---------- */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 shrink-0">
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={800}
          glareEnable
          glareMaxOpacity={0.25}
          glareBorderRadius="50%"   /* mantém o glare redondo */
          scale={1.04}
          className="w-full h-full rounded-full overflow-hidden"
        >
          {/* anel neon */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-accent/40 to-transparent
                       opacity-0 group-hover:opacity-100 transition duration-500"
          />
          <Image
            src="/profile.png"
            alt="Foto de perfil"
            fill
            priority
            className="object-cover"
          />
        </Tilt>
      </div>

      {/* ---------- texto ---------- */}
      <motion.div
        variants={textVariants}
        initial="rest"
        whileHover="hover"
        className="flex-1 bg-glass backdrop-blur-glass border border-white/10 rounded-2xl p-8 shadow-glass"
      >
        <h2 className="text-3xl font-bold mb-4">Sobre mim</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data.about}
        </p>
      </motion.div>
    </motion.section>
  );
}
