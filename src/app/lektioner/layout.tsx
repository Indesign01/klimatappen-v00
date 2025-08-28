'use client';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/lib/constants';

export default function LektionerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.user) {
      router.push(ROUTES.LOGIN);
    }
  }, [auth.isLoading, auth.user, router]);

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Laddar...</p>
        </div>
      </div>
    );
  }

  if (!auth.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header />*/}
      <Header variant="default" logoSrc={'./logo.png'} />
      <div className="flex">
        <Navigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}