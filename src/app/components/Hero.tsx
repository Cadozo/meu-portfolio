// components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <header className="relative h-[65vh] overflow-hidden isolate">
      {/* vídeo de fundo */}
      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* aurora gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute -inset-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))]
                   from-accent via-accent2 to-transparent opacity-40 blur-3xl"
      />

      {/* título + cargo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center backdrop-blur-[2px]">
        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-black/60"
          style={{ WebkitTextStroke: '1px #FF9329' }}
        >
          Ricardo&nbsp;Barbosa
        </h1>

        <p
          className="mt-2 text-xl sm:text-2xl font-semibold tracking-wide text-accent/90"
          style={{ WebkitTextStroke: '1px #000000' }}
        >
          Full-stack&nbsp;Developer
        </p>
      </div>

      {/* frase de efeito – marquee */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: 18,           // ajuste a velocidade
        }}
        className="absolute bottom-6 whitespace-nowrap text-3xl sm:text-4xl font-semibold text-gray-200 opacity-80"
        style={{ pointerEvents: 'none' }}
      >
        Transformando&nbsp;ideias&nbsp;em&nbsp;experiências&nbsp;digitais&nbsp;impactantes&nbsp;
      </motion.div>
    </header>
  );
}
