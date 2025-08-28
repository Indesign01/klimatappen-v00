'use client';
import { Button, Card } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import Image from 'next/image'
export default function WelcomePage() {
  const router = useRouter();
  const logoSrc = '/logo.png';

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Logo/Hero Section */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            {/*<div className="text-6xl">🌍</div>*/}
            {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={68}
                  height={56}
                  className="rounded-lg"
                />

              ) : (
                <div className="text-6xl">🌍</div>
              )}




          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Välkommen!
          </h1>
          <p className="text-gray-600">
            Lär dig klimat på ett roligt sätt
          </p>
        </div>

        {/* Action Cards */}
        <Card className="text-center space-y-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => router.push(ROUTES.LOGIN)}
          >
            Logga in
          </Button>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => router.push(ROUTES.REGISTER)}
          >
            Skapa konto
          </Button>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl mb-1">📚</div>
            <span className="text-gray-600">Lektioner</span>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl mb-1">👥</div>
            <span className="text-gray-600">Grupper</span>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl mb-1">📊</div>
            <span className="text-gray-600">Data</span>
          </div>
        </div>
      </div>
    </main>
  );
}