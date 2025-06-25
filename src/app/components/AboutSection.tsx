'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { motion, Variants } from 'framer-motion';

type AboutData = { about?: string };

export default function AboutSection() {
  const [data, setData] = useState<AboutData>({});

  /* --- Firestore ------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'siteConfig', 'main'));
      if (snap.exists()) setData(snap.data() as AboutData);
    })();
  }, []);

  if (!data.about) return null;

  /* --- small hover offset on the card --------------------------------- */
  const textVariants: Variants = {
    rest:  { x: 0,  opacity: 1 },
    hover: { x: 12, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <section
      id="about"
      className="relative max-w-5xl mx-auto mt-32 px-6 flex flex-col md:flex-row items-center gap-10 group"
    >
      {/* ---------- SECTION BACKGROUND (texture only) ---------- */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20
                   [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_14px)]
                   opacity-20"
      />

      {/* ---------- PHOTO with neon ring on hover ---------- */}
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        perspective={800}
        glareEnable
        glareMaxOpacity={0.25}
        glareBorderRadius="50%"
        scale={1.04}
        className="shrink-0 group/photo"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden">
          {/* neon ring appears ONLY on hover – restored */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-accent/40 to-transparent
                       opacity-0 group-hover/photo:opacity-100 transition duration-500"
          />
          <Image
            src="/profile.png"
            alt="Foto de perfil"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Tilt>

      {/* ---------- TEXT CARD ---------- */}
      <motion.div
        variants={textVariants}
        initial="rest"
        whileHover="hover"
        className="flex-1 bg-glass backdrop-blur-glass border border-white/10 rounded-2xl p-8 shadow-glass relative z-10"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-100">Sobre mim</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {data.about}
        </p>
      </motion.div>
    </section>
  );
}
