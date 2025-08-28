import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  rounded?: boolean;
}

export function Card({
  children,
  className,
  padding = 'md',
  shadow = true,
  rounded = true
}: CardProps) {
  const baseClasses = 'bg-white border border-gray-200';

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClass = shadow ? 'shadow-sm hover:shadow-md transition-shadow' : '';
  const roundedClass = rounded ? 'rounded-lg' : '';

  return (
    <div className={cn(
      baseClasses,
      paddingClasses[padding],
      shadowClass,
      roundedClass,
      className
    )}>
      {children}
    </div>
  );
}