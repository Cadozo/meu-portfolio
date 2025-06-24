// components/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, MessageCircle, Github, Gitlab, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

/* ---------- links corretos ---------- */
const contacts = [
  { href: 'mailto:tiucado@hotmail.com', label: 'E-mail',   Icon: Mail },
  { href: 'https://w.app/vqnwdr',       label: 'WhatsApp', Icon: MessageCircle },
  { href: 'https://github.com/Cadozo',  label: 'GitHub',   Icon: Github },
  { href: 'https://gitlab.com/cadotiu', label: 'GitLab',   Icon: Gitlab },
  { href: 'https://www.linkedin.com/in/ricardo-barbosa-rodrigues/', label: 'LinkedIn', Icon: Linkedin },
];

/* ---------- deslocamento pseudo-aleatório ---------- */
const jitter = (i: number) => {
  const seed = (i + 1) * 37;
  return {
    translateX: `${(seed % 15) - 7}px`,
    translateY: `${(seed % 23) - 11}px`,
    rotate:     `${(seed % 10) - 5}deg`,
  };
};

/* ---------- animação hover ---------- */
const hoverAnim = {
  whileHover: {
    y: -6,
    rotate: 2,
    scale: 1.15,
    transition: { type: 'spring', stiffness: 200, damping: 10 },
  },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"                                    /* ← âncora para o link do menu */
      className="relative w-full overflow-hidden pt-28 pb-24"
    >
      {/* blobs de cor */}
      <div aria-hidden className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px]" />
      <div aria-hidden className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-accent2/15 rounded-full blur-[120px]" />

      {/* links “bagunçados” com motion */}
      <div className="relative flex flex-wrap justify-center gap-14 sm:gap-20 px-6">
        {contacts.map(({ href, label, Icon }, i) => (
          <Link key={href} href={href} target="_blank" rel="noreferrer">
            <motion.div
              {...hoverAnim}
              style={jitter(i)}
              className="flex flex-col items-center gap-1 text-gray-300 transition-colors duration-300 hover:text-accent"
            >
              <Icon size={24} />
              <span className="text-xs">{label}</span>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* linha divisória */}
      <div className="mt-20 flex justify-center">
        <div className="w-40 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* copyright ligeiramente torto */}
      <p
        className="mt-6 text-center text-sm text-gray-500"
        style={{ transform: 'rotate(-0.6deg) translateX(4px)' }}
      >
        © {year} Ricardo&nbsp;Barbosa – Todos os direitos reservados
      </p>
    </footer>
  );
}
