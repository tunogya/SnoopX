'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/x');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={"flex items-center justify-center h-full"}>
      <div className={"text-5xl font-bold italic text-white"}>
        SnoopX
      </div>
    </div>
  );
}