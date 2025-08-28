'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card, Input } from '@/components/ui';
import { Header } from '@/components/layout/Header';
import { ROUTES } from '@/lib/constants';
import { validateEmail, validatePassword } from '@/lib/utils';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Namn krävs';
    }

    if (!formData.email) {
      newErrors.email = 'E-post krävs';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Lösenorden matchar inte';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register(formData);
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      setErrors({ general: 'Registrering misslyckades' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header title="Skapa konto" showBackButton />*/}
      <Header variant="default" logoSrc={'./logo.png'} />
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Skapa ditt konto</h1>
              <p className="text-gray-600 mt-2">Börja din klimatresa idag</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Fullständigt namn"
                value={formData.name}
                onChange={handleChange('name')}
                error={errors.name}
                fullWidth
                required
              />

              <Input
                type="email"
                label="E-postadress"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                fullWidth
                required
              />

              <Input
                type="password"
                label="Lösenord"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                helperText="Minst 8 tecken, en stor bokstav och en siffra"
                fullWidth
                required
              />

              <Input
                type="password"
                label="Bekräfta lösenord"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
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
                {isSubmitting ? 'Skapar konto...' : 'Skapa konto'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Har du redan ett konto?{' '}
                <button
                  onClick={() => router.push(ROUTES.LOGIN)}
                  className="text-blue-600 hover:underline"
                >
                  Logga in
                </button>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}