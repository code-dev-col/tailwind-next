import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

// Tipos para Next.js Link props
interface NextLinkProps {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
}

interface LinkProps<T extends Record<string, any> = any>
  extends BaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  /**
   * URL de destino (opcional cuando se usa con store)
   */
  href?: string;

  /**
   * Contenido del enlace
   */
  children?: React.ReactNode;

  /**
   * Esquema de color de theme.css
   */
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  /**
   * Tamaño del enlace
   */
  $size?: 'sm' | 'md' | 'lg';

  /**
   * Estilo del subrayado
   */
  $underline?: 'none' | 'hover' | 'always';

  /**
   * Si el enlace es externo (abre en nueva pestaña)
   */
  $external?: boolean;

  /**
   * Si el enlace está deshabilitado
   */
  $disabled?: boolean;

  /**
   * Icono antes del texto
   */
  $startIcon?: React.ReactNode;

  /**
   * Icono después del texto (no se aplica si es externo)
   */
  $endIcon?: React.ReactNode;

  /**
   * Usar Next.js Link automáticamente (por defecto true)
   */
  $useNextLink?: boolean;

  /**
   * Props adicionales para Next.js Link
   */
  $nextProps?: Partial<NextLinkProps>;

  /**
   * Componente Link personalizado (para otros routers como React Router)
   */
  $linkComponent?: React.ComponentType<any>;

  /**
   * Clases adicionales de Tailwind
   */
  $custom?: string;
}

const linkVariants = {
  base: [
    'inline-flex',
    'px-2',
    'items-center',
    'gap-1.5',
    'font-medium',
    'transition-all',
    'duration-200',
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
  ].join(' '),

  // Color schemes using theme.css variables
  colorScheme: {
    default: 'text-primary hover:text-primary/80',
    secondary: 'text-secondary hover:text-secondary/80',
    destructive: 'text-destructive hover:text-destructive/80',
    accent: 'text-accent hover:text-accent/80',
    muted: 'text-muted-foreground hover:text-foreground',
    minimal: 'text-muted-foreground hover:text-accent',
    custom: '', // Empty for custom styling
  },

  size: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },

  underline: {
    none: 'no-underline',
    hover: 'no-underline hover:underline',
    always: 'underline',
  },

  disabled: {
    true: ['pointer-events-none', 'opacity-50', 'cursor-not-allowed'].join(' '),
    false: 'cursor-pointer',
  },
};

// Detectar automáticamente si Next.js está disponible
const detectNextLink = (): React.ComponentType<any> | null => {
  try {
    // Intentar importar Next.js Link dinámicamente
    const NextLink = require('next/link').default;
    return NextLink;
  } catch {
    return null;
  }
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps<any>>(
  (
    {
      className,
      children,
      href,
      $store,
      storeKey,
      $colorScheme = 'default',
      $size = 'md',
      $underline = 'hover',
      $external = false,
      $disabled = false,
      $startIcon,
      $endIcon,
      $useNextLink = true,
      $nextProps = {},
      $linkComponent,
      $custom,
      target,
      rel,
      onClick,
      ...props
    },
    ref
  ) => {
    // Store integration - get value from store if available
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Use store value as href if available, otherwise use href prop
    const finalHref = storeValue || href || '#';

    // Validate that we have a valid href
    if (!finalHref || finalHref === '#') {
      console.warn('Link component requires either href prop or store value');
    }

    // Detectar automáticamente enlaces externos
    const isAutoExternal =
      finalHref.startsWith('http') ||
      finalHref.startsWith('//') ||
      finalHref.startsWith('mailto:') ||
      finalHref.startsWith('tel:');
    const isExternal = $external || isAutoExternal;

    // Detectar Next.js Link disponible
    const NextLink = detectNextLink();
    const shouldUseNextLink =
      $useNextLink && NextLink && !isExternal && !$disabled;

    // Usar componente personalizado si se proporciona
    const shouldUseCustomLink = $linkComponent && !isExternal && !$disabled;

    // Determine color scheme class
    const colorSchemeClass = linkVariants.colorScheme[$colorScheme];

    // Props base del enlace
    const linkClasses = cn(
      linkVariants.base,
      colorSchemeClass,
      linkVariants.size[$size],
      linkVariants.underline[$underline],
      linkVariants.disabled[$disabled ? 'true' : 'false'],
      className,
      $custom
    );

    // Props para enlaces externos
    const externalProps = isExternal
      ? {
          target: target || '_blank',
          rel: rel || 'noopener noreferrer',
        }
      : {
          target,
          rel,
        };

    // Icono para enlaces externos
    const ExternalIcon = () => (
      <svg
        className="w-3 h-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    );

    // Contenido del enlace con iconos
    const linkContent = (
      <>
        {$startIcon && <span className="flex-shrink-0">{$startIcon}</span>}
        <span>{children}</span>
        {$endIcon && !isExternal && (
          <span className="flex-shrink-0">{$endIcon}</span>
        )}
        {isExternal && !$endIcon && <ExternalIcon />}
      </>
    );

    // Si está deshabilitado, renderizar como span
    if ($disabled) {
      return (
        <span
          className={linkClasses}
          role="link"
          aria-disabled="true"
          ref={ref as React.Ref<HTMLSpanElement>}>
          {linkContent}
        </span>
      );
    }

    // Usar componente Link personalizado (React Router, etc.)
    if (shouldUseCustomLink) {
      const CustomLink = $linkComponent!;
      return (
        <CustomLink
          to={finalHref}
          href={finalHref}
          className={linkClasses}
          onClick={onClick}
          ref={ref}
          {...props}>
          {linkContent}
        </CustomLink>
      );
    }

    // Usar Next.js Link
    if (shouldUseNextLink) {
      return (
        <NextLink href={finalHref} {...$nextProps} passHref>
          <a className={linkClasses} onClick={onClick} ref={ref} {...props}>
            {linkContent}
          </a>
        </NextLink>
      );
    }

    // Enlace HTML estándar
    return (
      <a
        href={finalHref}
        className={linkClasses}
        onClick={onClick}
        ref={ref}
        {...externalProps}
        {...props}>
        {linkContent}
      </a>
    );
  }
);

Link.displayName = 'Link';

export { Link, type LinkProps, type NextLinkProps };

