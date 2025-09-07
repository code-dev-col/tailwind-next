import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import {
  FiClock,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
} from 'react-icons/fi';

// Layout Atoms
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { GridAreas, GridAreasField } from '../../../atoms/layout/GridAreas';
import { Center } from '../../../atoms/layout/Center';
import { Divider, Separator } from '../../../atoms/layout/Divider';

// Display & Feedback Atoms
import { Text } from '../../../atoms/display/Text';
import { Badge } from '../../../atoms/feedback/Badge';
import { Progress } from '../../../atoms/feedback/Progress';
import { Icon } from '../../../atoms/display/Icon';

// Form Atoms
import { Button } from '../../../atoms/forms/Button';

interface ProgressCardProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'compact' | 'detailed' | 'circular';
  $custom?: string;

  // Store integration (patrón storeKey)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Contenido principal
  title?: string;
  description?: string;

  // Progress props
  value?: number;
  max?: number;
  showPercentage?: boolean;
  showValue?: boolean;

  // Estados visuales
  status?: 'idle' | 'loading' | 'success' | 'error' | 'warning';
  statusText?: string;

  // Actions
  actions?: Array<{
    id: string;
    label: string;
    $colorScheme?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'accent'
      | 'minimal';
    icon?: any; // IconType from react-icons
    onClick?: () => void;
  }>;

  // Layout options
  hideIcon?: boolean;
  hideActions?: boolean;

  // Callbacks
  onComplete?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    progress: 'default' as const,
    badge: 'default' as const,
    hover: 'hover:bg-muted/50',
    focus: 'focus-visible:ring-ring/20',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    text: 'text-secondary-foreground',
    textSecondary: 'text-secondary/70',
    progress: 'secondary' as const,
    badge: 'secondary' as const,
    hover: 'hover:bg-secondary/10',
    focus: 'focus-visible:ring-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    text: 'text-secondary-foreground',
    textSecondary: 'text-destructive/70',
    progress: 'destructive' as const,
    badge: 'destructive' as const,
    hover: 'hover:bg-destructive/10',
    focus: 'focus-visible:ring-destructive/20',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    text: 'text-accent-foreground',
    textSecondary: 'text-accent/70',
    progress: 'accent' as const,
    badge: 'accent' as const,
    hover: 'hover:bg-accent/10',
    focus: 'focus-visible:ring-accent/20',
  },
  muted: {
    container: 'bg-muted border-muted',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    progress: 'muted' as const,
    badge: 'muted' as const,
    hover: 'hover:bg-muted/80',
    focus: 'focus-visible:ring-muted/20',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    progress: 'minimal' as const,
    badge: 'minimal' as const,
    hover: 'hover:bg-foreground/5',
    focus: 'focus-visible:ring-foreground/20',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    progress: 'custom' as const,
    badge: 'custom' as const,
    hover: '',
    focus: '',
  },
};

// Status icons y colores
const statusConfig = {
  idle: {
    icon: FiClock,
    colorScheme: 'muted' as const,
    badge: 'En espera',
    animated: false,
  },
  loading: {
    icon: FiLoader,
    colorScheme: 'secondary' as const,
    badge: 'Procesando',
    animated: true,
  },
  success: {
    icon: FiCheckCircle,
    colorScheme: 'secondary' as const,
    badge: 'Completado',
    animated: false,
  },
  error: {
    icon: FiXCircle,
    colorScheme: 'destructive' as const,
    badge: 'Error',
    animated: false,
  },
  warning: {
    icon: FiAlertTriangle,
    colorScheme: 'accent' as const,
    badge: 'Advertencia',
    animated: false,
  },
};

const progressCardVariants = {
  base: 'relative rounded-md border shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  variants: {
    size: {
      sm: 'p-3 space-y-2',
      default: 'p-4 space-y-3',
      lg: 'p-6 space-y-4',
    },
    variant: {
      default: '',
      compact: 'p-3 space-y-2',
      detailed: 'space-y-4',
      circular: 'text-center',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const ProgressCard = React.forwardRef<HTMLDivElement, ProgressCardProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title = 'Procesando...',
      description,
      value: controlledValue,
      max = 100,
      showPercentage = true,
      showValue = false,
      status = 'loading',
      statusText,
      actions,
      hideIcon = false,
      hideActions = false,
      onComplete,
      onCancel,
      onRetry,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Value calculation
    const value = storeValue ?? controlledValue ?? 0;
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    // Obtener configuración de color actual
    const currentColorScheme =
      colorSchemes[$colorScheme] || colorSchemes.default;
    const currentStatus = statusConfig[status] || statusConfig.loading;

    // Auto-trigger onComplete cuando se completa
    React.useEffect(() => {
      if (percentage >= 100 && status !== 'error' && onComplete) {
        onComplete();
      }
    }, [percentage, status, onComplete]);

    // Determinar si usar layout circular
    const isCircular = $variant === 'circular';

    // Preparar acciones por defecto según el status
    const defaultActions = React.useMemo(() => {
      const baseActions: Array<{
        id: string;
        label: string;
        $colorScheme:
          | 'default'
          | 'secondary'
          | 'destructive'
          | 'accent'
          | 'minimal';
        icon?: any;
        onClick: () => void;
      }> = [];

      if (status === 'error' && onRetry) {
        baseActions.push({
          id: 'retry',
          label: 'Reintentar',
          $colorScheme: 'destructive',
          onClick: onRetry,
        });
      }

      if ((status === 'loading' || status === 'idle') && onCancel) {
        baseActions.push({
          id: 'cancel',
          label: 'Cancelar',
          $colorScheme: 'minimal',
          onClick: onCancel,
        });
      }

      return baseActions;
    }, [status, onRetry, onCancel]);

    const finalActions = actions || defaultActions;

    return (
      <Container
        ref={ref}
        className={cn(
          progressCardVariants.base,
          currentColorScheme.container,
          currentColorScheme.hover,
          currentColorScheme.focus,
          progressCardVariants.variants.size[$size],
          progressCardVariants.variants.variant[$variant],
          className,
          $custom
        )}
        {...props}>
        {/* Layout principal según variante */}
        {isCircular ? (
          /* Layout circular */
          <Container
            $display="flex"
            $flexDirection="col"
            $alignItems="center"
            $gap="gap-4">
            <Center>
              <Progress
                value={value}
                max={max}
                $colorScheme={currentColorScheme.progress}
                $shape="circular"
                $showPercentage={showPercentage}
                $size={$size}
                $circularSize={$size === 'sm' ? 80 : $size === 'lg' ? 140 : 100}
              />
            </Center>

            <Container className="text-center space-y-2">
              <Container
                $display="flex"
                $alignItems="center"
                $justifyContent="center"
                $gap="gap-2">
                {!hideIcon && (
                  <Icon
                    icon={currentStatus.icon}
                    className={cn(
                      'w-4 h-4',
                      currentStatus.animated && 'animate-spin'
                    )}
                  />
                )}
                <Text
                  $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'xl' : 'base'}
                  $weight="medium"
                  className={currentColorScheme.text}>
                  {title}
                </Text>
              </Container>

              {description && (
                <Text $size="sm" className={currentColorScheme.textSecondary}>
                  {description}
                </Text>
              )}
            </Container>
          </Container>
        ) : (
          /* Layout lineal */
          <Container className="space-y-3">
            {/* Header con título, status y badge */}
            <Container
              $display="flex"
              $alignItems="center"
              $justifyContent="between">
              <Container $display="flex" $alignItems="center" $gap="gap-2">
                {!hideIcon && (
                  <Icon
                    icon={currentStatus.icon}
                    className={cn(
                      'w-4 h-4 flex-shrink-0',
                      currentStatus.animated && 'animate-spin'
                    )}
                  />
                )}
                <Text
                  $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'xl' : 'base'}
                  $weight="medium"
                  className={currentColorScheme.text}>
                  {title}
                </Text>
              </Container>

              <Badge $colorScheme={currentStatus.colorScheme} $size="sm">
                {statusText || currentStatus.badge}
              </Badge>
            </Container>

            {/* Progress bar */}
            <Progress
              value={value}
              max={max}
              $colorScheme={currentColorScheme.progress}
              $size={$size}
              $showPercentage={showPercentage}
              $showValue={showValue}
            />

            {/* Descripción */}
            {description && (
              <Text $size="sm" className={currentColorScheme.textSecondary}>
                {description}
              </Text>
            )}
          </Container>
        )}

        {/* Separador si hay acciones */}
        {!hideActions && finalActions.length > 0 && (
          <Divider $orientation="horizontal" $colorScheme="muted" />
        )}

        {/* Actions */}
        {!hideActions && finalActions.length > 0 && (
          <Container
            $display="flex"
            $alignItems="center"
            $justifyContent="end"
            $gap="gap-2"
            className="flex-wrap">
            {finalActions.map((action) => (
              <Button
                key={action.id}
                $colorScheme={action.$colorScheme || 'minimal'}
                $size="sm"
                onClick={action.onClick}
                className="min-w-0">
                {action.icon && <Icon icon={action.icon} className="w-3 h-3" />}
                {action.label}
              </Button>
            ))}
          </Container>
        )}
      </Container>
    );
  }
);

ProgressCard.displayName = 'ProgressCard';

export { ProgressCard, type ProgressCardProps };

