'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';

interface BreadcrumbProps {
  items?: Array<{ label: string; href?: string }>;
  showBackButton?: boolean;
  customBackRoute?: string;
  title?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  showBackButton = false,
  customBackRoute,
  title,
  className = "bg-white border-b border-gray-100"
}: BreadcrumbProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackClick = () => {
    if (customBackRoute) {
      router.push(customBackRoute);
    } else {
      router.back();
    }
  };

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = () => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(Boolean);
    const crumbs: Array<{ label: string; href?: string }> = [];

    // Map path segments to readable labels
    const segmentLabels: Record<string, string> = {
      'lektioner': 'Lektioner',
      'klimatgrupper': 'Klimatgrupper',
      'dashboard': 'Dashboard'
    };

    // Skip 'auth' segment in breadcrumbs since login/register are both auth
    const filteredSegments = pathSegments.filter(segment => segment !== 'auth');

    filteredSegments.forEach((segment, index) => {
      // Skip dynamic segments that look like IDs
      if (segment.match(/^[0-9]+$/)) return;

      const label = segmentLabels[segment] || segment;
      const href = index < filteredSegments.length - 1
        ? `/${pathSegments.slice(0, pathSegments.indexOf(segment) + 1).join('/')}`
        : undefined;

      crumbs.push({ label, href });
    });

    return crumbs;
  };

  const currentBreadcrumbs = generateBreadcrumbs();

  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="mr-3 p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              title="Gå tillbaka"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Breadcrumbs */}
          {currentBreadcrumbs.length > 0 ? (
            <nav className="flex items-center space-x-2 text-sm">
              {currentBreadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && (
                    <span className="text-gray-300">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-700 font-medium">
                      {title || crumb.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          ) : (
            // Show title if no breadcrumbs
            title && (
              <h1 className="text-lg font-medium text-gray-700">{title}</h1>
            )
          )}
        </div>
      </div>
    </div>
  );
}