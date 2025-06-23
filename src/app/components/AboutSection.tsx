'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const [data, setData] = useState<{
    about?: string;
    phone?: string;
    email?: string;
    avatarUrl?: string;
  }>({});

  useEffect(() => {
    async function fetchData() {
      const snap = await getDoc(doc(db, 'siteConfig', 'main'));
      setData(snap.data() as any);
    }
    fetchData();
  }, []);

  return (
    <motion.section
  id="about"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
    <section id="about" className="max-w-3xl mx-auto text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">
  Sobre mim
</h2>

      {data.avatarUrl && (
        <Image
          src={data.avatarUrl}
          alt="Minha foto"
          width={96}
          height={96}
          unoptimized 
          className="rounded-full mb-4"
        />
      )}

      <p className="mb-6 whitespace-pre-line">{data.about}</p>

      <ul className="space-y-1 text-orange-400">
        <li>📞 {data.phone}</li>
        <li>✉️ {data.email}</li>
      </ul>
    </section>
</motion.section>
  );
}
