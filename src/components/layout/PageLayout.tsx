'use client';
import { Header } from '@/components/layout/Header';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  customBackRoute?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
  showBreadcrumb?: boolean;
  headerVariant?: 'default' | 'minimal';
  logoSrc?: string;
}

export function PageLayout({
  children,
  title,
  showBackButton = false,
  customBackRoute,
  breadcrumbs,
  className = "max-w-7xl mx-auto px-4 py-8",
  showBreadcrumb = true,
  headerVariant = 'minimal',
  logoSrc
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/*<Header variant={headerVariant} logoSrc={logoSrc} />*/}

      {showBreadcrumb && (
        <Breadcrumb
          items={breadcrumbs}
          showBackButton={showBackButton}
          customBackRoute={customBackRoute}
          title={title}
        />
      )}

      <main className={className}>
        {children}
      </main>
    </div>
  );
}