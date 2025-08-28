import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Klimatappen - Lär dig om klimatförändringar',
  description: 'En interaktiv app för att lära sig om klimatförändringar genom lektioner och datavisualisering',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}