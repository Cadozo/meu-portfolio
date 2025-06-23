'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, User, Folder } from 'lucide-react';

const links = [
  { label: 'Home',    href: '/',        icon: Home },
  { label: 'Sobre',   href: '#about',   icon: User },
  { label: 'Projetos',href: '#projects',icon: Folder },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 inset-x-0 flex justify-center z-50 pointer-events-none">
      <ul className="flex gap-6 px-6 py-2 rounded-full shadow-glass backdrop-blur-glass
                     bg-glass pointer-events-auto border border-white/10">
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 text-sm
                  ${active ? 'text-accent' : 'text-gray-300 hover:text-accent'}
                `}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
