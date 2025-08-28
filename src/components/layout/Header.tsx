'use client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

interface HeaderProps {
  variant?: 'default' | 'minimal';
  logoSrc?: string; // For custom logo image
}

export function Header({
  variant = 'default',
  logoSrc
}: HeaderProps) {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const handleLogoClick = () => {
    if (auth.user) {
      router.push(ROUTES.DASHBOARD);
    } else {
      router.push(ROUTES.HOME);
    }
  };

  // Minimal variant for auth pages and secondary navigation
  if (variant === 'minimal') {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo only */}
            <button
              onClick={handleLogoClick}
              className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-md hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
              title={auth.user ? 'Gå till Dashboard' : 'Gå till startsidan'}
            >
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="w-6 h-6 rounded-sm" />
              ) : (
                <span className="text-white font-bold text-sm">K</span>
              )}
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Default variant for main application
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            {/*Temp using img*/}
            <button
              onClick={handleLogoClick}
              className="flex items-center justify-center w-15 h-15 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-sm"
              title={auth.user ? 'Gå till Dashboard' : 'Gå till startsidan'}
            >
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="w-15 h-15 rounded-md" />
              ) : (
                <span className="text-white font-bold text-lg">K</span>
              )}
            </button>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {auth.user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Hej {auth.user.name}!
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logga ut
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}