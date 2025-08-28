'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

const navigationItems = [
  {
    name: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: '🏠'
  },
  {
    name: 'Lektioner',
    path: ROUTES.LESSONS,
    icon: '📚'
  },
  {
    name: 'Klimatgrupper',
    path: ROUTES.GROUPS,
    icon: '👥'
  }
];

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}