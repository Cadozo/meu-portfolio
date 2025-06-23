'use client';       
import { motion } from 'framer-motion';

export default
 function Hero() {
  return (
    <header className="relative h-[65vh] overflow-hidden isolate">
      {/* vídeo */}

      <video
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Aurora gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute -inset-20 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))]
                   from-accent via-accent2 to-transparent opacity-40 blur-3xl"
      />

      {/* Heading */}
      <div className="absolute inset-0 flex flex-col items-center justify-center
                      text-center backdrop-blur-[2px]">
        <h1
  className="text-6xl sm:text-7xl lg:text-8xl
             font-extrabold leading-tight tracking-tight
              text-black/60"                      /* branco 80 % opac. */
  style={{ WebkitTextStroke: '1px #FF9329' }}    /* contorno laranja */
>
          Ricardo&nbsp;Barbosa
        </h1>
        <p
  className="text-xl sm:text-2xl font-semibold tracking-wide text-accent/90"
  style={{ WebkitTextStroke: '1px #000000' }}
>
          Full-stack&nbsp;Developer
        </p>
      </div>
    </header>
  );
}
