'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card, Input } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { ROUTES } from '@/lib/constants';
import { validateEmail } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'E-post krävs';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }

    if (!password) {
      newErrors.password = 'Lösenord krävs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      setErrors({ general: 'Inloggning misslyckades' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="default" logoSrc={'./logo.png'} title="Logga in" showBackButton />

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Välkommen tillbaka</h1>
              <p className="text-gray-600 mt-2">Logga in på ditt konto</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="E-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                fullWidth
                required
              />

              <Input
                type="password"
                label="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
                required
              />

              {errors.general && (
                <div className="text-red-600 text-sm text-center">
                  {errors.general}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loggar in...' : 'Logga in'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Har du inget konto?{' '}
                <button
                  onClick={() => router.push(ROUTES.REGISTER)}
                  className="text-blue-600 hover:underline"
                >
                  Skapa konto
                </button>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}