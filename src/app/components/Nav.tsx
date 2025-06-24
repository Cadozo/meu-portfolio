// components/Nav.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, User, Folder, Code, Mail } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const links = [
  { label: 'Home',     href: '/',          icon: Home },
  { label: 'Sobre',    href: '/#about',    icon: User },
  { label: 'Skills',   href: '/#skills',   icon: Code },
  { label: 'Projetos', href: '/#projects', icon: Folder },
  { label: 'Contato',  href: '/#contact',  icon: Mail },
];

export default function Nav() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | null>(null);

  /* marca ativo apenas no cliente */
  useEffect(() => {
    const getHref = () => {
      const h = window.location.hash;
      return h ? `/#${h.slice(1)}` : pathname;
    };
    setActiveHref(getHref());

    const onHashChange = () => setActiveHref(getHref());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  /* scroll suave para o topo */
  const smoothHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveHref('/');          // destaca o item Home
  };

  return (
    <nav className="fixed top-4 inset-x-0 flex justify-center z-50 pointer-events-none">
      <ul className="flex gap-6 px-6 py-2 rounded-full border border-white/10
                     bg-glass backdrop-blur-glass shadow-glass pointer-events-auto">
        {links.map(({ label, href, icon: Icon }) => {
          const active = activeHref === href;

          const baseClasses =
            'flex items-center gap-2 text-sm px-3 py-1 rounded-full transition';
          const stateClasses = active
            ? 'bg-accent/20 text-accent'
            : 'bg-transparent text-gray-300 hover:bg-white/10 hover:text-accent';

          return (
            <li key={href}>
              {href === '/' ? (
                <button
                  onClick={smoothHome}
                  className={clsx(baseClasses, stateClasses)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="sr-only lg:not-sr-only">{label}</span>
                </button>
              ) : (
                <Link
                  href={href}
                  onClick={() => setActiveHref(href)}
                  className={clsx(baseClasses, stateClasses)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="sr-only lg:not-sr-only">{label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
