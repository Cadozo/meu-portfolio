import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TransitionProvider from './components/TransitionProvider';


const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio — Ricardo',
  description: 'Meu portfólio pessoal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* blob accent */}
        <div
          aria-hidden
          className="fixed -top-24 -right-24 w-[480px] h-[480px]
                     bg-accent/20 rounded-full blur-[180px] -z-10"
        />

        {/* páginas com transição suave */}
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
