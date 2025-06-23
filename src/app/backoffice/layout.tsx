'use client';

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (!user) router.replace('/login');
      else setLoading(false);
    });
  }, [router]);

  if (loading) return null; // ou spinner

  return (
    <div className="min-h-screen bg-[#101012] text-gray-200 p-8">
      <header className="flex justify-between mb-8">
        <h1 className="text-xl font-bold">Back-Office</h1>
        <button onClick={() => signOut(auth)}>Sair</button>
      </header>
      {children}
    </div>
  );
}
