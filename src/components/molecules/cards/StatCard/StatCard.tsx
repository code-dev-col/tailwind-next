import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Layout Atoms (obligatorios)
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Center } from '../../../atoms/layout/Center';
import { Separator } from '../../../atoms/layout/Separator';

// Display Atoms
import { Text } from '../../../atoms/display/Text';
import { Icon } from '../../../atoms/display/Icon';

// Feedback Atoms
import { Badge } from '../../../atoms/feedback/Badge';
import { Meter } from '../../../atoms/feedback/Meter';

// Forms Atoms (si se necesita interacción)
import { Button } from '../../../atoms/forms/Button';

// Iconos para tendencias
import {
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiMoreHorizontal,
} from 'react-icons/fi';

interface StatCardProps<T extends Record<string, any> = any> extends BaseProps {
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

  // Props específicas del StatCard
  title?: string;
  value?: string | number;
  subtitle?: string;
  description?: string;
  icon?: any; // IconType from react-icons
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  $showMeter?: boolean;
  meterValue?: number;
  meterMax?: number;
  meterOptimum?: number;
  $showBadge?: boolean;
  badgeText?: string;
  $interactive?: boolean;

  // Callbacks
  onClick?: () => void;
  onActionClick?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border text-card-foreground',
    title: 'text-card-foreground',
    value: 'text-primary',
    subtitle: 'text-muted-foreground',
    description: 'text-muted-foreground',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-muted-foreground',
    },
    icon: 'text-primary',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20 text-secondary',
    title: 'text-secondary',
    value: 'text-secondary font-bold',
    subtitle: 'text-secondary/70',
    description: 'text-secondary/70',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-secondary/70',
    },
    icon: 'text-secondary',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20 text-destructive',
    title: 'text-destructive',
    value: 'text-destructive font-bold',
    subtitle: 'text-destructive/70',
    description: 'text-destructive/70',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-destructive/70',
    },
    icon: 'text-destructive',
  },
  accent: {
    container: 'bg-accent/10 border-accent/20 text-accent',
    title: 'text-accent',
    value: 'text-accent font-bold',
    subtitle: 'text-accent/70',
    description: 'text-accent/70',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-accent/70',
    },
    icon: 'text-accent',
  },
  muted: {
    container: 'bg-muted/50 border-muted text-muted-foreground',
    title: 'text-muted-foreground',
    value: 'text-foreground font-semibold',
    subtitle: 'text-muted-foreground/70',
    description: 'text-muted-foreground/70',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-muted-foreground/70',
    },
    icon: 'text-muted-foreground',
  },
  minimal: {
    container: 'bg-transparent border-border/50 text-foreground',
    title: 'text-foreground',
    value: 'text-foreground font-bold',
    subtitle: 'text-foreground/70',
    description: 'text-foreground/70',
    trend: {
      up: 'text-success',
      down: 'text-destructive',
      neutral: 'text-foreground/50',
    },
    icon: 'text-foreground/80',
  },
  custom: {
    container: '',
    title: '',
    value: '',
    subtitle: '',
    description: '',
    trend: {
      up: '',
      down: '',
      neutral: '',
    },
    icon: '',
  },
};

const statCardVariants = {
  base: 'relative rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md',
  interactive: 'cursor-pointer hover:border-primary/30 hover:bg-primary/5',
  variants: {
    size: {
      sm: 'p-3',
      default: 'p-4',
      lg: 'p-6',
    },
    variant: {
      default: 'space-y-3',
      compact: 'space-y-2',
      detailed: 'space-y-4',
      minimal: 'space-y-1',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title = 'Estadística',
      value,
      subtitle,
      description,
      icon,
      trend = 'neutral',
      trendValue,
      $showMeter = false,
      meterValue,
      meterMax = 100,
      meterOptimum,
      $showBadge = false,
      badgeText,
      $interactive = false,
      onClick,
      onActionClick,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Si storeValue es un objeto completo, extraer las propiedades
    const isStoreObject =
      storeValue && typeof storeValue === 'object' && 'id' in storeValue;

    // Usar valores del store si están disponibles, sino usar props directas
    const finalTitle = isStoreObject ? (storeValue as any).title : title;
    const finalValue = isStoreObject
      ? (storeValue as any).value
      : storeValue ?? value ?? '0';
    const finalSubtitle = isStoreObject
      ? (storeValue as any).subtitle
      : subtitle;
    const finalDescription = isStoreObject
      ? (storeValue as any).description
      : description;
    const finalIcon = isStoreObject ? (storeValue as any).icon : icon;
    const finalTrend = isStoreObject ? (storeValue as any).trend : trend;
    const finalTrendValue = isStoreObject
      ? (storeValue as any).trendValue
      : trendValue;
    const finalShowMeter = isStoreObject
      ? (storeValue as any).showMeter
      : $showMeter;
    const finalMeterValue = isStoreObject
      ? (storeValue as any).meterValue
      : meterValue;
    const finalMeterMax = isStoreObject
      ? (storeValue as any).meterMax
      : meterMax;
    const finalMeterOptimum = isStoreObject
      ? (storeValue as any).meterOptimum
      : meterOptimum;
    const finalShowBadge = isStoreObject
      ? (storeValue as any).showBadge
      : $showBadge;
    const finalBadgeText = isStoreObject
      ? (storeValue as any).badgeText
      : badgeText;
    const finalInteractive = isStoreObject
      ? (storeValue as any).interactive
      : $interactive;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Obtener icono de tendencia
    const getTrendIcon = () => {
      switch (finalTrend) {
        case 'up':
          return FiTrendingUp;
        case 'down':
          return FiTrendingDown;
        case 'neutral':
        default:
          return FiMinus;
      }
    };

    const handleClick = () => {
      if (finalInteractive && onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          statCardVariants.base,
          currentColorScheme.container,
          statCardVariants.variants.size[$size],
          statCardVariants.variants.variant[$variant],
          finalInteractive && statCardVariants.interactive,
          className,
          $custom
        )}
        onClick={handleClick}
        {...props}>
        {/* Header con icono y badge */}
        <Container
          $display="flex"
          $justifyContent="between"
          $alignItems="start">
          <Container $display="flex" $alignItems="center" $gap="gap-3">
            {finalIcon && (
              <Icon
                icon={finalIcon}
                $size="default"
                className={currentColorScheme.icon}
              />
            )}
            <Container>
              <Text
                $size={$size === 'sm' ? 'sm' : 'base'}
                $weight="medium"
                className={currentColorScheme.title}>
                {finalTitle}
              </Text>
              {finalSubtitle && (
                <Text $size="xs" className={currentColorScheme.subtitle}>
                  {finalSubtitle}
                </Text>
              )}
            </Container>
          </Container>

          {finalShowBadge && finalBadgeText && (
            <Badge $colorScheme={$colorScheme} $size="sm">
              {finalBadgeText}
            </Badge>
          )}
        </Container>

        {/* Separador si es detailed */}
        {$variant === 'detailed' && <Separator $orientation="horizontal" />}

        {/* Valor principal con tendencia */}
        <Container $display="flex" $alignItems="end" $gap="gap-2">
          <Text
            $size={$size === 'sm' ? 'xl' : $size === 'lg' ? '4xl' : '2xl'}
            $weight="bold"
            className={currentColorScheme.value}>
            {finalValue}
          </Text>

          {finalTrendValue && (
            <Container $display="flex" $alignItems="center" $gap="gap-1">
              <Icon
                icon={getTrendIcon()}
                $size="sm"
                className={
                  currentColorScheme.trend[
                    (finalTrend as 'up' | 'down' | 'neutral') || 'neutral'
                  ]
                }
              />
              <Text
                $size="sm"
                $weight="medium"
                className={
                  currentColorScheme.trend[
                    (finalTrend as 'up' | 'down' | 'neutral') || 'neutral'
                  ]
                }>
                {finalTrendValue}
              </Text>
            </Container>
          )}
        </Container>

        {/* Descripción */}
        {finalDescription && (
          <Text $size="sm" className={currentColorScheme.description}>
            {finalDescription}
          </Text>
        )}

        {/* Meter si está habilitado */}
        {finalShowMeter && typeof finalMeterValue === 'number' && (
          <Container className="space-y-2">
            <Meter
              value={finalMeterValue}
              max={finalMeterMax}
              optimum={finalMeterOptimum}
              $colorScheme={$colorScheme}
              $size={$size}
              showValue
              showPercentage
            />
          </Container>
        )}

        {/* Acción adicional para variante detailed */}
        {$variant === 'detailed' && onActionClick && (
          <>
            <Separator $orientation="horizontal" />
            <Container $display="flex" $justifyContent="end">
              <Button $colorScheme="ghost" $size="sm" onClick={onActionClick}>
                <Icon icon={FiMoreHorizontal} $size="sm" />
                Ver detalles
              </Button>
            </Container>
          </>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard, type StatCardProps };

