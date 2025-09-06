import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

interface MeterProps<T extends Record<string, any> = any> extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $variant?: 'default' | 'thin' | 'thick' | 'rounded' | 'pill';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  valueStoreKey?: keyof T;
  minStoreKey?: keyof T;
  maxStoreKey?: keyof T;

  // Atributos del elemento meter según MDN
  value?: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;

  // Props de presentación
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  suffix?: string;
  prefix?: string;
  formatter?: (value: number) => string;

  // Configuración visual
  showLabels?: boolean;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  animateOnMount?: boolean;
  hideNativeAppearance?: boolean;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    meter: 'meter-primary',
    text: 'text-card-foreground',
    label: 'text-muted-foreground',
    background: 'bg-muted/20',
  },
  secondary: {
    meter: 'meter-secondary',
    text: 'text-secondary',
    label: 'text-secondary/80',
    background: 'bg-secondary/10',
  },
  accent: {
    meter: 'meter-accent',
    text: 'text-accent',
    label: 'text-accent/80',
    background: 'bg-accent/10',
  },
  destructive: {
    meter: 'meter-destructive',
    text: 'text-destructive',
    label: 'text-destructive/80',
    background: 'bg-destructive/10',
  },
  muted: {
    meter: 'meter-muted',
    text: 'text-muted-foreground',
    label: 'text-muted-foreground/80',
    background: 'bg-muted/30',
  },
  minimal: {
    meter: 'meter-minimal',
    text: 'text-foreground',
    label: 'text-foreground/70',
    background: 'bg-foreground/10',
  },
  custom: {
    meter: '',
    text: '',
    label: '',
    background: '',
  },
};

const meterVariants = {
  base: 'meter appearance-none w-full transition-all duration-300',
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-2',
      default: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    },
    variant: {
      default: 'rounded-sm',
      thin: 'h-1 rounded-sm',
      thick: 'h-6 rounded-sm',
      rounded: 'rounded-md',
      pill: 'rounded-full',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const Meter = React.forwardRef<HTMLMeterElement, MeterProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      valueStoreKey,
      minStoreKey,
      maxStoreKey,
      value: propValue,
      min: propMin = 0,
      max: propMax = 100,
      low,
      high,
      optimum,
      label,
      showValue = false,
      showPercentage = false,
      suffix = '',
      prefix = '',
      formatter,
      showLabels = false,
      labelPosition = 'top',
      animateOnMount = false,
      hideNativeAppearance = true,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && valueStoreKey
        ? $store((state) => state[valueStoreKey])
        : undefined;
    const storeMin =
      $store && minStoreKey ? $store((state) => state[minStoreKey]) : undefined;
    const storeMax =
      $store && maxStoreKey ? $store((state) => state[maxStoreKey]) : undefined;

    // Valores finales
    const finalValue = storeValue ?? propValue ?? 0;
    const finalMin = storeMin ?? propMin;
    const finalMax = storeMax ?? propMax;

    // Validaciones
    const validValue = Math.min(Math.max(finalValue, finalMin), finalMax);
    const percentage = ((validValue - finalMin) / (finalMax - finalMin)) * 100;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Formatear valor
    const formatValue = (val: number): string => {
      if (formatter) return formatter(val);
      if (showPercentage) return `${Math.round(percentage)}%`;
      return `${prefix}${val}${suffix}`;
    };

    // Determinar estado basado en low, high, optimum
    const getValueState = (): 'optimum' | 'suboptimum' | 'even-less-good' => {
      if (!low && !high && !optimum) return 'optimum';

      if (optimum !== undefined) {
        if (low !== undefined && high !== undefined) {
          if (optimum <= low) {
            return validValue <= low
              ? 'optimum'
              : validValue <= high
              ? 'suboptimum'
              : 'even-less-good';
          } else if (optimum >= high) {
            return validValue >= high
              ? 'optimum'
              : validValue >= low
              ? 'suboptimum'
              : 'even-less-good';
          } else {
            return validValue >= low && validValue <= high
              ? 'optimum'
              : 'suboptimum';
          }
        }
      }

      return 'optimum';
    };

    const valueState = getValueState();

    const meterElement = (
      <meter
        ref={ref}
        className={cn(
          meterVariants.base,
          currentColorScheme.meter,
          meterVariants.variants.size[$size],
          meterVariants.variants.variant[$variant],
          hideNativeAppearance && 'appearance-none',
          animateOnMount && 'animate-in slide-in-from-left duration-700',
          className,
          $custom
        )}
        value={validValue}
        min={finalMin}
        max={finalMax}
        low={low}
        high={high}
        optimum={optimum}
        aria-label={label}
        {...props}
      />
    );

    if (!showLabels && !showValue && !label) {
      return meterElement;
    }

    const labelElement = label && (
      <span className={cn('text-sm font-medium', currentColorScheme.label)}>
        {label}
      </span>
    );

    const valueElement = (showValue || showPercentage) && (
      <span className={cn('text-sm font-mono', currentColorScheme.text)}>
        {formatValue(validValue)}
      </span>
    );

    // Layout según posición de label
    if (labelPosition === 'none' || !showLabels) {
      return (
        <div className="flex items-center gap-2">
          {meterElement}
          {valueElement}
        </div>
      );
    }

    if (labelPosition === 'left' || labelPosition === 'right') {
      return (
        <div className="flex items-center gap-2">
          {labelPosition === 'left' && labelElement}
          <div className="flex-1">{meterElement}</div>
          {labelPosition === 'right' && labelElement}
          {valueElement}
        </div>
      );
    }

    // Layout vertical (top/bottom)
    return (
      <div className="space-y-1">
        {labelPosition === 'top' && (
          <div className="flex justify-between items-center">
            {labelElement}
            {valueElement}
          </div>
        )}

        {meterElement}

        {labelPosition === 'bottom' && (
          <div className="flex justify-between items-center">
            {labelElement}
            {valueElement}
          </div>
        )}
      </div>
    );
  }
);

Meter.displayName = 'Meter';

export { Meter, type MeterProps };
