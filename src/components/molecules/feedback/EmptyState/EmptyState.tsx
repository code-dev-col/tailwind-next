import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { IconType } from 'react-icons';
import { FiInbox } from 'react-icons/fi';

// Layout Atoms (obligatorios)
import { Container } from '../../../atoms/layout/Container';
import { Center } from '../../../atoms/layout/Center';
import { Divider } from '../../../atoms/layout/Divider';

// Display Atoms
import { Text } from '../../../atoms/display/Text';
import { Icon } from '../../../atoms/display/Icon';

// Form Atoms
import { Button } from '../../../atoms/forms/Button';

interface EmptyStateProps<T extends Record<string, any> = any>
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

  // Props específicas del EmptyState
  icon?: IconType;
  title?: string;
  description?: string;
  actionText?: string;
  showAction?: boolean;
  showSeparator?: boolean;

  // Callbacks
  onActionClick?: () => void;
  onClick?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-muted-foreground/70',
    focus: 'focus-visible:ring-ring/20',
    separator: 'border-border',
  },
  primary: {
    container: 'bg-primary/5 border-primary/20',
    text: 'text-primary',
    textSecondary: 'text-primary/80',
    icon: 'text-primary/70',
    focus: 'focus-visible:ring-primary/20',
    separator: 'border-primary/20',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    text: 'text-secondary',
    textSecondary: 'text-secondary/80',
    icon: 'text-secondary/70',
    focus: 'focus-visible:ring-secondary/20',
    separator: 'border-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    text: 'text-destructive',
    textSecondary: 'text-destructive/80',
    icon: 'text-destructive/70',
    focus: 'focus-visible:ring-destructive/20',
    separator: 'border-destructive/20',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    text: 'text-accent',
    textSecondary: 'text-accent/80',
    icon: 'text-accent/70',
    focus: 'focus-visible:ring-accent/20',
    separator: 'border-accent/20',
  },
  muted: {
    container: 'bg-muted/30 border-muted',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    icon: 'text-muted-foreground/60',
    focus: 'focus-visible:ring-muted/20',
    separator: 'border-muted',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground/80',
    textSecondary: 'text-foreground/60',
    icon: 'text-foreground/50',
    focus: 'focus-visible:ring-foreground/20',
    separator: 'border-foreground/10',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    icon: '',
    focus: '',
    separator: '',
  },
};

const emptyStateVariants = {
  base: 'relative rounded-lg border transition-all duration-200',
  interactive:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  variants: {
    size: {
      default: 'p-8 space-y-4',
      sm: 'p-6 space-y-3',
      lg: 'p-12 space-y-6',
    },
    variant: {
      default: 'text-center max-w-md mx-auto',
      compact: 'text-center max-w-xs mx-auto',
      detailed: 'text-left max-w-lg mx-auto',
      minimal: 'text-center max-w-sm mx-auto py-4',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const iconSizes = {
  default: 'w-12 h-12',
  sm: 'w-10 h-10',
  lg: 'w-16 h-16',
};

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      icon = FiInbox,
      title = 'No hay elementos',
      description = 'Aún no tienes elementos aquí. Comienza agregando el primero.',
      actionText = 'Agregar elemento',
      showAction = true,
      showSeparator = false,
      onActionClick,
      onClick,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Determinar si es interactivo
    const isInteractive = onClick !== undefined;

    // Props del contenedor principal
    const containerProps = isInteractive
      ? {
          role: 'button',
          tabIndex: 0,
          onClick,
          onKeyDown: (e: React.KeyboardEvent) => {
            if ((e.key === 'Enter' || e.key === ' ') && onClick) {
              e.preventDefault();
              onClick();
            }
          },
        }
      : {};

    return (
      <Container
        ref={ref}
        className={cn(
          emptyStateVariants.base,
          currentColorScheme.container,
          emptyStateVariants.variants.size[$size],
          emptyStateVariants.variants.variant[$variant],
          isInteractive && [
            'cursor-pointer hover:shadow-md',
            emptyStateVariants.interactive,
            currentColorScheme.focus,
          ],
          className,
          $custom
        )}
        {...containerProps}
        {...props}>
        {/* Icon Principal */}
        <Center className="mb-4">
          <Icon
            icon={icon}
            className={cn(iconSizes[$size], currentColorScheme.icon)}
          />
        </Center>

        {/* Título */}
        <Container className="space-y-2">
          <Text
            $size={$size === 'lg' ? 'xl' : $size === 'sm' ? 'base' : 'lg'}
            $weight="semibold"
            className={cn(
              currentColorScheme.text,
              $variant === 'detailed' ? 'text-left' : 'text-center'
            )}>
            {title}
          </Text>

          {/* Descripción */}
          <Text
            $size={$size === 'lg' ? 'base' : 'sm'}
            className={cn(
              currentColorScheme.textSecondary,
              $variant === 'detailed' ? 'text-left' : 'text-center',
              $variant === 'minimal' && 'hidden'
            )}>
            {description}
          </Text>
        </Container>

        {/* Separador opcional */}
        {showSeparator && (
          <Divider
            $colorScheme={$colorScheme === 'default' ? 'muted' : $colorScheme}
            className="my-6"
          />
        )}

        {/* Acción */}
        {showAction && onActionClick && (
          <Center className="pt-2">
            <Button
              $colorScheme={
                $colorScheme === 'default'
                  ? 'default'
                  : $variant === 'minimal'
                  ? 'ghost'
                  : $colorScheme
              }
              $size={$size}
              onClick={onActionClick}>
              {actionText}
            </Button>
          </Center>
        )}

        {/* Valor del store para debugging en desarrollo */}
        {process.env.NODE_ENV === 'development' && storeValue && (
          <Container className="mt-4 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            Store value: {String(storeValue)}
          </Container>
        )}
      </Container>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState, type EmptyStateProps };

