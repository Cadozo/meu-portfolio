// components/Footer.tsx
'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  Github,
  Gitlab,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  const contacts = [
    {
      href: 'mailto:ricardo@email.com',
      label: 'E-mail',
      Icon: Mail,
    },
    {
      href: 'https://wa.me/5511999999999',
      label: 'WhatsApp',
      Icon: MessageCircle,
    },
    {
      href: 'https://github.com/ricardo',
      label: 'GitHub',
      Icon: Github,
    },
    {
      href: 'https://gitlab.com/ricardo',
      label: 'GitLab',
      Icon: Gitlab,
    },
    {
      href: 'https://www.linkedin.com/in/ricardo',
      label: 'LinkedIn',
      Icon: Linkedin,
    },
  ];

  return (
    <footer id="contact" className="mt-32 border-t border-white/10 bg-glass backdrop-blur-glass">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8 text-gray-300">
        {/* blocos de contato */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(({ href, label, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-accent transition"
              >
                <Icon size={20} />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* linha inferior */}
        <div className="text-center text-sm text-gray-500">
          © {year} Ricardo Barbosa – Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
}
