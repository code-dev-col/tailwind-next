import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface CenterProps extends BaseProps {
  children: React.ReactNode;
  /**
   * Clases adicionales de Tailwind para personalización
   */
  $custom?: string;
}

interface CenterStyleProps extends React.HTMLAttributes<HTMLDivElement> {
  '--center-max-width-sm'?: string;
  '--center-max-width-md'?: string;
  '--center-max-width-lg'?: string;
  '--center-padding-sm'?: string;
  '--center-padding-md'?: string;
  '--center-padding-lg'?: string;
}

const centerVariants = {
  base: [
    // Base styles
    'mx-auto',

    // Mobile - Para pantallas menores a 380px (23.75rem)
    'max-w-[396.8px]', // 24.8rem = 396.8px
    'px-[2cqw]',

    // Tablet - Para pantallas entre 380px y 1024px
    'sm:max-w-[800px]', // 50rem = 800px
    'sm:px-[6cqw]',

    // Desktop - Para pantallas mayores a 1024px
    'lg:max-w-[1500px]', // 93.75rem = 1500px
    'lg:px-[7cqw]',
  ].join(' '),
};

/**
 * Componente Center - Centra contenido con responsive padding usando container queries
 *
 * Basado en breakpoints específicos:
 * - Mobile (< 380px): max-width 396.8px, padding 2cqw
 * - Tablet (380px - 1024px): max-width 800px, padding 6cqw
 * - Desktop (> 1024px): max-width 1500px, padding 7cqw
 */
const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ children, className, $custom, ...props }, ref) => {
    return (
      <div
        className={cn(centerVariants.base, className, $custom)}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }
);

Center.displayName = 'Center';

export { Center, type CenterProps };

