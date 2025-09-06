import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import type { IconType } from 'react-icons';
import { FiChevronRight } from 'react-icons/fi';

// Importar Atoms necesarios para el Molecule
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Badge } from '../../../atoms/feedback/Badge';
import { Icon } from '../../../atoms/display/Icon';
import { Link } from '../../../atoms/navigation/Link';

interface NavigationItemProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del NavigationItem
  label: string;
  href?: string;
  icon?: IconType;
  badgeText?: string;
  badgeCount?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  showChevron?: boolean;
  description?: string;

  // Variantes de comportamiento
  $asButton?: boolean; // Renderizar como button en lugar de link
  $external?: boolean; // Link externo (target="_blank")
  $download?: boolean; // Link de descarga

  // Callbacks
  onClick?: (event: React.MouseEvent) => void;
  onHover?: () => void;
  onFocus?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border hover:bg-muted/50',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-muted-foreground',
    badge: 'default',
    active: 'bg-primary/10 text-primary border-primary/20',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20 hover:bg-secondary/15',
    text: 'text-secondary',
    textSecondary: 'text-secondary/70',
    icon: 'text-secondary/80',
    badge: 'secondary',
    active: 'bg-secondary/25 text-secondary border-secondary/30',
  },
  accent: {
    container: 'bg-accent/5 border-accent/10 hover:bg-accent/7',
    text: 'text-accent',
    textSecondary: 'text-accent/70',
    icon: 'text-accent/80',
    badge: 'accent',
    active: 'bg-accent/10 text-accent border-accent/15',
  },
  destructive: {
    container:
      'bg-destructive/10 border-destructive/20 hover:bg-destructive/15',
    text: 'text-destructive',
    textSecondary: 'text-destructive/70',
    icon: 'text-destructive/80',
    badge: 'destructive',
    active: 'bg-destructive/25 text-destructive border-destructive/30',
  },
  muted: {
    container: 'bg-muted/30 border-muted-foreground/20 hover:bg-muted/40',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    icon: 'text-muted-foreground/80',
    badge: 'muted',
    active: 'bg-muted/50 text-muted-foreground border-muted-foreground/30',
  },
  minimal: {
    container: 'bg-transparent border-transparent hover:bg-muted/30',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-muted-foreground',
    badge: 'minimal',
    active: 'bg-muted/40 text-foreground',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    icon: '',
    badge: 'custom',
    active: '',
  },
};

const navigationItemVariants = {
  base: [
    'relative group transition-all duration-200 rounded-md border',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
  ].join(' '),

  interactive: [
    'cursor-pointer select-none',
    'hover:shadow-sm active:scale-[0.98]',
  ].join(' '),

  disabled: ['opacity-50 cursor-not-allowed pointer-events-none'].join(' '),

  variants: {
    size: {
      sm: 'p-2 min-h-[2.5rem]',
      default: 'p-3 min-h-[3rem]',
      lg: 'p-4 min-h-[3.5rem]',
    },
    variant: {
      default: 'flex items-center gap-3',
      compact: 'flex items-center gap-2',
      detailed: 'flex flex-col gap-2 items-start',
      minimal: 'flex items-center gap-2 p-2',
    },
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const NavigationItem = React.forwardRef<HTMLElement, NavigationItemProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,

      // Props específicas
      label,
      href,
      icon,
      badgeText,
      badgeCount,
      isActive = false,
      isDisabled = false,
      showChevron = false,
      description,

      // Variantes de comportamiento
      $asButton = false,
      $external = false,
      $download = false,

      // Callbacks
      onClick,
      onHover,
      onFocus,

      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Override props with store data if available
    const finalLabel = storeValue?.label || label;
    const finalHref = storeValue?.href || href;
    const finalIsActive = storeValue?.isActive ?? isActive;
    const finalIsDisabled = storeValue?.isDisabled ?? isDisabled;
    const finalBadgeText = storeValue?.badgeText || badgeText;
    const finalBadgeCount = storeValue?.badgeCount || badgeCount;
    const finalDescription = storeValue?.description || description;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Clases dinámicas
    const containerClasses = cn(
      navigationItemVariants.base,
      currentColorScheme.container,
      navigationItemVariants.variants.size[$size],
      navigationItemVariants.variants.variant[$variant],
      !finalIsDisabled && navigationItemVariants.interactive,
      finalIsDisabled && navigationItemVariants.disabled,
      finalIsActive && currentColorScheme.active,
      className,
      $custom
    );

    // Event handlers
    const handleClick = (event: React.MouseEvent) => {
      if (finalIsDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const handleMouseEnter = () => {
      if (!finalIsDisabled) {
        onHover?.();
      }
    };

    const handleFocus = () => {
      if (!finalIsDisabled) {
        onFocus?.();
      }
    };

    // Calcular badge a mostrar
    const shouldShowBadge =
      finalBadgeText || (finalBadgeCount && finalBadgeCount > 0);
    const badgeContent = finalBadgeText || finalBadgeCount?.toString();

    // Render content interno
    const renderContent = () => (
      <>
        {/* Icon + Label + Badge Container */}
        <Container
          $display="flex"
          $alignItems="center"
          $gap="gap-3"
          className={$variant === 'detailed' ? 'w-full' : ''}>
          {/* Icon */}
          {icon && (
            <Icon
              icon={icon}
              className={cn(
                'shrink-0',
                currentColorScheme.icon,
                finalIsActive && currentColorScheme.text,
                $size === 'sm'
                  ? 'w-4 h-4'
                  : $size === 'lg'
                  ? 'w-6 h-6'
                  : 'w-5 h-5'
              )}
            />
          )}

          {/* Text Content */}
          <Container className="flex-1 min-w-0">
            <Text
              $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'lg' : 'base'}
              $weight={finalIsActive ? 'semibold' : 'medium'}
              className={cn(
                'truncate',
                currentColorScheme.text,
                finalIsActive && currentColorScheme.text
              )}>
              {finalLabel}
            </Text>

            {/* Description (solo en variant detailed) */}
            {$variant === 'detailed' && finalDescription && (
              <Text
                $size="xs"
                className={cn(
                  'truncate mt-1',
                  currentColorScheme.textSecondary
                )}>
                {finalDescription}
              </Text>
            )}
          </Container>

          {/* Badge */}
          {shouldShowBadge && (
            <Badge
              $colorScheme={currentColorScheme.badge as any}
              $size={$size === 'sm' ? 'sm' : 'default'}
              className="shrink-0">
              {badgeContent}
            </Badge>
          )}

          {/* Chevron */}
          {showChevron && (
            <Icon
              icon={FiChevronRight}
              className={cn(
                'shrink-0 w-4 h-4 transition-transform',
                currentColorScheme.icon,
                'group-hover:translate-x-0.5'
              )}
            />
          )}
        </Container>
      </>
    );

    // Render como Button si $asButton es true
    if ($asButton || !finalHref) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          type="button"
          disabled={finalIsDisabled}
          className={containerClasses}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onFocus={handleFocus}
          aria-disabled={finalIsDisabled}
          aria-current={finalIsActive ? 'page' : undefined}
          {...props}>
          {renderContent()}
        </button>
      );
    }

    // Render como Link
    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        {...props}>
        <Link
          href={finalHref!}
          $external={$external}
          download={$download ? '' : undefined}
          className="w-full h-full flex items-center focus:outline-none"
          onClick={handleClick}
          onFocus={handleFocus}
          aria-disabled={finalIsDisabled}
          aria-current={finalIsActive ? 'page' : undefined}>
          {renderContent()}
        </Link>
      </div>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export { NavigationItem, type NavigationItemProps };

