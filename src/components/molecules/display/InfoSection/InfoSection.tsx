import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { IconType } from 'react-icons';

// Importar TODOS los Atoms necesarios (Layout + Others)
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Separator } from '../../../atoms/layout/Separator';
import { Text } from '../../../atoms/display/Text';
import { Badge } from '../../../atoms/feedback/Badge';
import { Icon } from '../../../atoms/display/Icon';

// Interface para items de datos
interface DataItem {
  label: string;
  value: string | number;
  icon?: IconType;
  badge?: string;
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom'
    | 'success'
    | 'warning'
    | 'outline';
}

interface InfoSectionProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'compact' | 'detailed';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del molecule
  title: string;
  description?: string;
  data?: DataItem[];
  showSeparator?: boolean;

  // Callbacks
  onClick?: () => void;
  onDataItemClick?: (item: DataItem, index: number) => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    separator: 'border-border',
    focus: 'focus-visible:ring-ring/20',
    activeRing: 'ring-2 ring-ring/20 ring-offset-2',
  },
  secondary: {
    container: 'bg-secondary/3 border-secondary/20',
    text: 'text-secondary',
    textSecondary: 'text-secondary',
    separator: 'border-secondary/20',
    focus: 'focus-visible:ring-secondary/20',
    activeRing: 'ring-2 ring-secondary/20 ring-offset-2',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20',
    text: 'text-destructive',
    textSecondary: 'text-destructive/70',
    separator: 'border-destructive/20',
    focus: 'focus-visible:ring-destructive/20',
    activeRing: 'ring-2 ring-destructive/20 ring-offset-2',
  },
  accent: {
    container: 'bg-accent/3 border-accent/20',
    text: 'text-accent',
    textSecondary: 'text-accent',
    separator: 'border-accent/20',
    focus: 'focus-visible:ring-accent/20',
    activeRing: 'ring-2 ring-accent/20 ring-offset-2',
  },
  muted: {
    container: 'bg-muted border-muted',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    separator: 'border-muted',
    focus: 'focus-visible:ring-muted/20',
    activeRing: 'ring-2 ring-muted/20 ring-offset-2',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    separator: 'border-foreground/20',
    focus: 'focus-visible:ring-foreground/20',
    activeRing: 'ring-2 ring-foreground/20 ring-offset-2',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    separator: '',
    focus: '',
    activeRing: '',
  },
};

const infoSectionVariants = {
  base: 'relative rounded-md border shadow-sm transition-all duration-200',
  interactiveBase:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  variants: {
    size: {
      default: 'p-4 space-y-4',
      sm: 'p-3 space-y-3',
      lg: 'p-6 space-y-6',
    },
    variant: {
      default: '',
      compact: 'space-y-2',
      detailed: 'space-y-6',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const InfoSection = React.forwardRef<HTMLDivElement, InfoSectionProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title,
      description,
      data,
      showSeparator = true,
      onClick,
      onDataItemClick,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    const isInteractive = onClick || onDataItemClick;

    return (
      <Container
        ref={ref}
        className={cn(
          infoSectionVariants.base,
          currentColorScheme.container,
          infoSectionVariants.variants.size[$size],
          infoSectionVariants.variants.variant[$variant],
          isInteractive && infoSectionVariants.interactiveBase,
          isInteractive && currentColorScheme.focus,
          isInteractive && 'cursor-pointer hover:shadow-md',
          className,
          $custom
        )}
        onClick={onClick}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        {...props}>
        {/* Header: Título y descripción */}
        <Container className="space-y-2">
          <Text
            $size={$size === 'lg' ? 'xl' : $size === 'sm' ? 'base' : 'lg'}
            $weight="semibold"
            className={currentColorScheme.text}>
            {title}
          </Text>

          {description && (
            <Text
              $size={$size === 'lg' ? 'base' : 'sm'}
              className={currentColorScheme.textSecondary}>
              {description}
            </Text>
          )}
        </Container>

        {/* Separador opcional */}
        {showSeparator && (title || description) && data && data.length > 0 && (
          <Separator
            $orientation="horizontal"
            className={currentColorScheme.separator}
          />
        )}

        {/* Grid de datos */}
        {data && data.length > 0 && (
          <Grid
            $columns={$variant === 'compact' ? 1 : 2}
            $gap={$size === 'lg' ? 'gap-6' : $size === 'sm' ? 'gap-2' : 'gap-4'}
            className="w-full">
            {data.map((item, index) => (
              <Container
                key={index}
                className={cn(
                  'flex items-center justify-between p-2 rounded-md transition-colors',
                  onDataItemClick && 'cursor-pointer hover:bg-muted/50',
                  onDataItemClick && infoSectionVariants.interactiveBase,
                  onDataItemClick && currentColorScheme.focus
                )}
                onClick={() => onDataItemClick?.(item, index)}
                tabIndex={onDataItemClick ? 0 : undefined}
                role={onDataItemClick ? 'button' : undefined}>
                {/* Lado izquierdo: Icon + Label */}
                <Container className="flex items-center space-x-2 min-w-0 flex-1">
                  {item.icon && (
                    <Icon
                      icon={item.icon}
                      $size={$size === 'lg' ? 'lg' : 'sm'}
                      className={currentColorScheme.textSecondary}
                    />
                  )}
                  <Text
                    $size={$size === 'lg' ? 'base' : 'sm'}
                    className={cn(
                      currentColorScheme.textSecondary,
                      'truncate'
                    )}>
                    {item.label}
                  </Text>
                </Container>

                {/* Lado derecho: Value + Badge */}
                <Container className="flex items-center space-x-2 flex-shrink-0">
                  <Text
                    $size={$size === 'lg' ? 'base' : 'sm'}
                    $weight="medium"
                    className={currentColorScheme.text}>
                    {item.value}
                  </Text>

                  {item.badge && (
                    <Badge
                      $size={$size === 'lg' ? 'default' : 'sm'}
                      $colorScheme={item.$colorScheme || 'default'}>
                      {item.badge}
                    </Badge>
                  )}
                </Container>
              </Container>
            ))}
          </Grid>
        )}

        {/* Mostrar valor del store si existe (para debugging) */}
        {storeValue && (
          <Container className="mt-2 p-2 bg-muted/50 rounded text-xs">
            <Text $size="xs" className="text-muted-foreground">
              Store value: {String(storeValue)}
            </Text>
          </Container>
        )}
      </Container>
    );
  }
);

InfoSection.displayName = 'InfoSection';

export { InfoSection, type InfoSectionProps, type DataItem };

