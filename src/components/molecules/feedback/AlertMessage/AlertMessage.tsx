import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import type { IconType } from 'react-icons';
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiX,
} from 'react-icons/fi';

// Importar Atoms necesarios para el Molecule
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Icon } from '../../../atoms/display/Icon';

interface AlertAction {
  id: string;
  label: string;
  action?: string;
  $colorScheme?: 'default' | 'secondary' | 'destructive' | 'accent' | 'minimal';
  onClick?: () => void;
}

interface AlertMessageProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'filled' | 'outlined' | 'minimal';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del AlertMessage
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  icon?: IconType;
  actions?: AlertAction[];
  showCloseButton?: boolean;
  isClosable?: boolean;
  isDismissible?: boolean;

  // Callbacks
  onClose?: () => void;
  onDismiss?: () => void;
  onActionClick?: (action: AlertAction) => void;
}

// Mapeo de tipos a iconos y colores por defecto
const typeConfig = {
  info: {
    icon: FiInfo,
    defaultColorScheme: 'default' as const,
  },
  success: {
    icon: FiCheckCircle,
    defaultColorScheme: 'secondary' as const,
  },
  warning: {
    icon: FiAlertTriangle,
    defaultColorScheme: 'accent' as const,
  },
  error: {
    icon: FiXCircle,
    defaultColorScheme: 'destructive' as const,
  },
};

// Esquemas de color usando theme.css variables con focus ring
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-muted-foreground',
    closeButton: 'text-muted-foreground hover:text-card-foreground',
    focus: 'focus-visible:ring-ring/20',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20',
    text: 'text-secondary',
    textSecondary: 'text-card-foreground',
    icon: 'text-secondary',
    closeButton: 'text-secondary/70 hover:text-secondary',
    focus: 'focus-visible:ring-secondary/20',
  },
  accent: {
    container: 'bg-accent/1 border-accent/20',
    text: 'text-accent',
    textSecondary: 'text-card-foreground',
    icon: 'text-accent',
    closeButton: 'text-accent/70 hover:text-accent',
    focus: 'focus-visible:ring-accent/20',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20',
    text: 'text-destructive',
    textSecondary: 'text-destructive/70',
    icon: 'text-destructive',
    closeButton: 'text-destructive/70 hover:text-destructive',
    focus: 'focus-visible:ring-destructive/20',
  },
  muted: {
    container: 'bg-muted/30 border-muted-foreground/20',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    icon: 'text-muted-foreground',
    closeButton: 'text-muted-foreground/70 hover:text-muted-foreground',
    focus: 'focus-visible:ring-muted/20',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    icon: 'text-foreground/60',
    closeButton: 'text-foreground/60 hover:text-foreground',
    focus: 'focus-visible:ring-foreground/20',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    icon: '',
    closeButton: '',
    focus: '',
  },
};

const alertMessageVariants = {
  base: [
    'relative w-full rounded-md border shadow-sm transition-all duration-200',
  ].join(' '),

  variants: {
    size: {
      sm: 'p-3',
      default: 'p-4',
      lg: 'p-6',
    },
    variant: {
      default: '',
      filled: 'border-transparent shadow-md',
      outlined: 'border-2 bg-transparent shadow-none',
      minimal: 'border-transparent shadow-none bg-transparent',
    },
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  (
    {
      className,
      $colorScheme,
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,

      // Props específicas
      type = 'info',
      title,
      description,
      icon,
      actions = [],
      showCloseButton = true,
      isClosable = true,
      isDismissible = true,

      // Callbacks
      onClose,
      onDismiss,
      onActionClick,

      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Override props with store data if available
    const finalType = (storeValue?.alertType || type) as
      | 'info'
      | 'success'
      | 'warning'
      | 'error';
    const finalTitle = storeValue?.alertTitle || title;
    const finalDescription = storeValue?.alertDescription || description;
    const finalActions = (storeValue?.alertActions || actions) as AlertAction[];

    // Determinar colorScheme automático basado en type si no se especifica
    const effectiveColorScheme =
      $colorScheme || typeConfig[finalType]?.defaultColorScheme || 'default';

    // Determinar icono (prop > tipo > default)
    const effectiveIcon = icon || typeConfig[finalType]?.icon;

    // Obtener esquema de color activo con fallback
    const currentColorScheme =
      colorSchemes[effectiveColorScheme] || colorSchemes.default;

    // Clases dinámicas
    const containerClasses = cn(
      alertMessageVariants.base,
      currentColorScheme.container,
      alertMessageVariants.variants.size[$size],
      alertMessageVariants.variants.variant[$variant],
      className,
      $custom
    );

    // Event handlers
    const handleClose = () => {
      onClose?.();
      onDismiss?.();
    };

    const handleActionClick = (action: AlertAction) => {
      action.onClick?.();
      onActionClick?.(action);
    };

    const closeButtonClasses = cn(
      'absolute top-2 right-2 p-1 rounded-md transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      currentColorScheme.focus,
      currentColorScheme.closeButton
    );

    return (
      <Container
        ref={ref}
        className={containerClasses}
        role="alert"
        aria-live="polite"
        {...props}>
        {/* Close Button */}
        {isClosable && showCloseButton && (
          <button
            type="button"
            className={closeButtonClasses}
            onClick={handleClose}
            aria-label="Cerrar alerta">
            <Icon icon={FiX} className="w-4 h-4" />
          </button>
        )}

        {/* Content Container */}
        <Container
          $display="flex"
          $gap="gap-3"
          className={isClosable && showCloseButton ? 'pr-8' : ''}>
          {/* Icon */}
          {effectiveIcon && (
            <Container className="shrink-0 pt-0.5">
              <Icon
                icon={effectiveIcon}
                className={cn(
                  currentColorScheme.icon,
                  $size === 'sm'
                    ? 'w-4 h-4'
                    : $size === 'lg'
                    ? 'w-6 h-6'
                    : 'w-5 h-5'
                )}
              />
            </Container>
          )}

          {/* Text Content */}
          <Container className="flex-1 min-w-0 space-y-2">
            {/* Title */}
            {finalTitle && (
              <Text
                $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'lg' : 'base'}
                $weight="semibold"
                className={cn('leading-none', currentColorScheme.text)}>
                {finalTitle}
              </Text>
            )}

            {/* Description */}
            {finalDescription && (
              <Text
                $size={$size === 'sm' ? 'xs' : $size === 'lg' ? 'base' : 'sm'}
                className={cn(
                  'leading-relaxed',
                  currentColorScheme.textSecondary,
                  !finalTitle && currentColorScheme.text
                )}>
                {finalDescription}
              </Text>
            )}

            {/* Actions */}
            {finalActions && finalActions.length > 0 && (
              <Container
                $display="flex"
                $gap="gap-2"
                $flexWrap="wrap"
                className="pt-1">
                {finalActions.map((action: AlertAction) => (
                  <Button
                    key={action.id}
                    $size={$size === 'lg' ? 'default' : 'sm'}
                    $colorScheme={action.$colorScheme || 'default'}
                    onClick={() => handleActionClick(action)}>
                    {action.label}
                  </Button>
                ))}
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    );
  }
);

AlertMessage.displayName = 'AlertMessage';

export { AlertMessage, type AlertMessageProps, type AlertAction };

