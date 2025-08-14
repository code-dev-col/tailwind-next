import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

// Tipos para el slider
type SliderValue = number | [number, number];

interface SliderProps extends BaseProps {
  // Valores
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;

  // Comportamiento
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';

  // Variantes visuales
  $variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'destructive'
    | 'accent';
  $size?: 'sm' | 'default' | 'lg';

  // UI Features
  $showValue?: boolean;
  $showTicks?: boolean;
  $showLabels?: boolean;
  $formatValue?: (value: number) => string;

  // Labels y descripción
  label?: string;
  description?: string;
  $minLabel?: string;
  $maxLabel?: string;

  // Callbacks
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Personalización
  $custom?: string;
  $trackClassName?: string;
  $thumbClassName?: string;
  $labelClassName?: string;
}

interface RangeSliderProps
  extends Omit<
    SliderProps,
    'value' | 'defaultValue' | 'onValueChange' | 'onValueCommit'
  > {
  // Valores para range
  value?: [number, number];
  defaultValue?: [number, number];

  // Callbacks para range
  onValueChange?: (value: [number, number]) => void;
  onValueCommit?: (value: [number, number]) => void;

  // Features específicas de range
  $minDistance?: number;
  $maxDistance?: number;
}

const sliderVariants = {
  track: {
    base: 'relative flex items-center select-none touch-none w-full cursor-pointer',
    horizontal: 'h-5 flex-row',
    vertical: 'w-5 h-48 flex-col',
    disabled: 'cursor-not-allowed opacity-50',
  },

  range: {
    base: 'relative grow rounded-full',
    horizontal: 'h-2',
    vertical: 'w-2',
    variants: {
      primary: 'bg-blue-200',
      secondary: 'bg-purple-200',
      success: 'bg-green-200',
      warning: 'bg-yellow-200',
      destructive: 'bg-red-200',
      accent: 'bg-pink-200',
    },
  },

  filled: {
    base: 'absolute rounded-full',
    horizontal: 'h-full',
    vertical: 'w-full',
    variants: {
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-red-500',
      accent: 'bg-pink-500',
    },
  },

  thumb: {
    base: 'block border-2 border-white bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-110',
    sizes: {
      sm: 'h-4 w-4',
      default: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
    variants: {
      primary: 'focus:ring-blue-500',
      secondary: 'focus:ring-purple-500',
      success: 'focus:ring-green-500',
      warning: 'focus:ring-yellow-500',
      destructive: 'focus:ring-red-500',
      accent: 'focus:ring-pink-500',
    },
    disabled: 'cursor-not-allowed hover:shadow-md active:scale-100',
  },

  label: {
    base: 'text-sm font-medium mb-2 block',
    disabled: 'text-gray-400',
  },

  description: {
    base: 'text-xs text-gray-500 mt-1',
  },

  value: {
    base: 'text-sm font-mono bg-gray-100 px-2 py-1 rounded border text-center min-w-[3rem]',
    variants: {
      primary: 'border-blue-200 text-blue-700',
      secondary: 'border-purple-200 text-purple-700',
      success: 'border-green-200 text-green-700',
      warning: 'border-yellow-200 text-yellow-700',
      destructive: 'border-red-200 text-red-700',
      accent: 'border-pink-200 text-pink-700',
    },
  },

  ticks: {
    base: 'absolute pointer-events-none',
    horizontal: 'top-0 left-0 right-0 flex justify-between items-center h-full',
    vertical:
      'left-0 top-0 bottom-0 flex flex-col justify-between items-center w-full',
    tick: 'w-0.5 h-2 bg-gray-300 rounded-full',
  },

  minMaxLabels: {
    base: 'text-xs text-gray-500',
    horizontal: 'flex justify-between mt-1',
    vertical: 'flex flex-col justify-between h-full ml-2',
  },

  defaultVariants: {
    variant: 'primary' as const,
    size: 'default' as const,
    orientation: 'horizontal' as const,
  },
};

// Hook personalizado para manejar el arrastre
const useSliderDrag = (
  containerRef: React.RefObject<HTMLDivElement>,
  min: number,
  max: number,
  step: number,
  orientation: 'horizontal' | 'vertical',
  disabled: boolean,
  onValueChange?: (value: number) => void
) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const getValueFromEvent = React.useCallback(
    (event: MouseEvent | Touch) => {
      if (!containerRef.current) return min;

      const rect = containerRef.current.getBoundingClientRect();
      let percentage;

      if (orientation === 'horizontal') {
        percentage = (event.clientX - rect.left) / rect.width;
      } else {
        percentage = 1 - (event.clientY - rect.top) / rect.height;
      }

      percentage = Math.max(0, Math.min(1, percentage));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    },
    [containerRef, min, max, step, orientation]
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;

      event.preventDefault();
      setIsDragging(true);

      const value = getValueFromEvent(event.nativeEvent);
      onValueChange?.(value);
    },
    [disabled, getValueFromEvent, onValueChange]
  );

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      const value = getValueFromEvent(event);
      onValueChange?.(value);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, getValueFromEvent, onValueChange]);

  return { isDragging, handleMouseDown };
};

// Componente Slider principal
const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      orientation = 'horizontal',
      $variant = 'primary',
      $size = 'default',
      $showValue = false,
      $showTicks = false,
      $showLabels = false,
      $formatValue = (val) => val.toString(),
      label,
      description,
      $minLabel,
      $maxLabel,
      onValueChange,
      onValueCommit,
      $store,
      storeKey,
      $custom,
      $trackClassName,
      $thumbClassName,
      $labelClassName,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue
    );

    // Valor actual (controlado vs no controlado)
    const actualValue = value !== undefined ? value : internalValue;

    // Integración con store
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;
    const finalValue = storeValue !== undefined ? storeValue : actualValue;

    // Hook de arrastre
    const { isDragging, handleMouseDown } = useSliderDrag(
      containerRef,
      min,
      max,
      step,
      orientation,
      disabled,
      (newValue) => {
        if (value === undefined) setInternalValue(newValue);
        onValueChange?.(newValue);

        // Actualizar store si está conectado
        if ($store && storeKey) {
          const setter =
            $store.getState()[
              `set${storeKey.charAt(0).toUpperCase() + storeKey.slice(1)}`
            ];
          if (setter) setter(newValue);
        }
      }
    );

    // Manejar commit (cuando se suelta)
    React.useEffect(() => {
      if (!isDragging && onValueCommit) {
        onValueCommit(finalValue);
      }
    }, [isDragging, finalValue, onValueCommit]);

    // Calcular porcentaje para posición
    const percentage = ((finalValue - min) / (max - min)) * 100;

    // Generar ticks si están habilitados
    const ticks = React.useMemo(() => {
      if (!$showTicks) return [];
      const tickCount = Math.min(Math.floor((max - min) / step) + 1, 20); // Máximo 20 ticks
      return Array.from({ length: tickCount }, (_, i) => {
        const tickValue = min + (i * (max - min)) / (tickCount - 1);
        return Math.max(
          min,
          Math.min(max, Math.round(tickValue / step) * step)
        );
      });
    }, [$showTicks, min, max, step]);

    // Clases CSS
    const trackClasses = cn(
      sliderVariants.track.base,
      sliderVariants.track[orientation],
      {
        [sliderVariants.track.disabled]: disabled,
      },
      $trackClassName,
      $custom
    );

    const rangeClasses = cn(
      sliderVariants.range.base,
      sliderVariants.range[orientation],
      sliderVariants.range.variants[$variant]
    );

    const filledClasses = cn(
      sliderVariants.filled.base,
      sliderVariants.filled[orientation],
      sliderVariants.filled.variants[$variant]
    );

    const thumbClasses = cn(
      sliderVariants.thumb.base,
      sliderVariants.thumb.sizes[$size],
      sliderVariants.thumb.variants[$variant],
      {
        [sliderVariants.thumb.disabled]: disabled,
      },
      $thumbClassName
    );

    const labelClasses = cn(
      sliderVariants.label.base,
      {
        [sliderVariants.label.disabled]: disabled,
      },
      $labelClassName
    );

    const valueClasses = cn(
      sliderVariants.value.base,
      sliderVariants.value.variants[$variant]
    );

    return (
      <div className={cn('w-full', className)} {...props}>
        {/* Label */}
        {label && (
          <label className={labelClasses}>
            {label}
            {$showValue && (
              <span className={cn('ml-2', valueClasses)}>
                {$formatValue(finalValue)}
              </span>
            )}
          </label>
        )}

        {/* Slider container */}
        <div
          className={cn(
            'relative',
            orientation === 'horizontal' ? 'py-2' : 'px-2'
          )}>
          <div
            ref={containerRef}
            className={trackClasses}
            onMouseDown={handleMouseDown}>
            {/* Track background */}
            <div className={rangeClasses}>
              {/* Filled portion */}
              <div
                className={filledClasses}
                style={
                  orientation === 'horizontal'
                    ? { width: `${percentage}%` }
                    : { height: `${percentage}%`, bottom: 0 }
                }
              />

              {/* Ticks */}
              {$showTicks && (
                <div
                  className={cn(
                    sliderVariants.ticks.base,
                    sliderVariants.ticks[orientation]
                  )}>
                  {ticks.map((tick, index) => {
                    const tickPercentage = ((tick - min) / (max - min)) * 100;
                    return (
                      <div
                        key={index}
                        className={sliderVariants.ticks.tick}
                        style={
                          orientation === 'horizontal'
                            ? {
                                left: `${tickPercentage}%`,
                                transform: 'translateX(-50%)',
                              }
                            : {
                                bottom: `${tickPercentage}%`,
                                transform: 'translateY(50%)',
                              }
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Thumb */}
            <div
              className={thumbClasses}
              style={
                orientation === 'horizontal'
                  ? {
                      left: `${percentage}%`,
                      transform: 'translateX(-50%)',
                      position: 'absolute',
                      top: '50%',
                      marginTop: '-0.625rem',
                    }
                  : {
                      bottom: `${percentage}%`,
                      transform: 'translateY(50%)',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-0.625rem',
                    }
              }
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={finalValue}
              aria-disabled={disabled}
              aria-orientation={orientation}
            />
          </div>

          {/* Min/Max labels */}
          {$showLabels && (
            <div
              className={cn(
                sliderVariants.minMaxLabels.base,
                sliderVariants.minMaxLabels[orientation]
              )}>
              <span>{$minLabel || min}</span>
              <span>{$maxLabel || max}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className={sliderVariants.description.base}>{description}</div>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

// Componente RangeSlider para selección de rangos
const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      className,
      value,
      defaultValue = [25, 75],
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      orientation = 'horizontal',
      $variant = 'primary',
      $size = 'default',
      $showValue = false,
      $showTicks = false,
      $showLabels = false,
      $formatValue = (val) => val.toString(),
      $minDistance = 0,
      $maxDistance,
      label,
      description,
      $minLabel,
      $maxLabel,
      onValueChange,
      onValueCommit,
      $store,
      storeKey,
      $custom,
      $trackClassName,
      $thumbClassName,
      $labelClassName,
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = React.useState<[number, number]>(
      value ?? defaultValue
    );
    const [activeThumb, setActiveThumb] = React.useState<number | null>(null);

    // Valor actual (controlado vs no controlado)
    const actualValue = value !== undefined ? value : internalValue;

    // Integración con store
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;
    const finalValue: [number, number] =
      storeValue !== undefined ? storeValue : actualValue;

    const [startValue, endValue] = finalValue;

    // Validar distancias
    const isValidRange = React.useCallback(
      (newValue: [number, number]) => {
        const [start, end] = newValue;
        const distance = end - start;

        if ($minDistance && distance < $minDistance) return false;
        if ($maxDistance && distance > $maxDistance) return false;

        return true;
      },
      [$minDistance, $maxDistance]
    );

    // Manejar cambio de valor con validación
    const handleValueChange = React.useCallback(
      (newValue: [number, number]) => {
        if (!isValidRange(newValue)) return;

        if (value === undefined) setInternalValue(newValue);
        onValueChange?.(newValue);

        // Actualizar store si está conectado
        if ($store && storeKey) {
          const setter =
            $store.getState()[
              `set${storeKey.charAt(0).toUpperCase() + storeKey.slice(1)}`
            ];
          if (setter) setter(newValue);
        }
      },
      [value, onValueChange, $store, storeKey, isValidRange]
    );

    // Calcular porcentajes
    const startPercentage = ((startValue - min) / (max - min)) * 100;
    const endPercentage = ((endValue - min) / (max - min)) * 100;
    const rangePercentage = endPercentage - startPercentage;

    // Clases CSS (reutilizar las del Slider)
    const trackClasses = cn(
      sliderVariants.track.base,
      sliderVariants.track[orientation],
      {
        [sliderVariants.track.disabled]: disabled,
      },
      $trackClassName,
      $custom
    );

    const rangeClasses = cn(
      sliderVariants.range.base,
      sliderVariants.range[orientation],
      sliderVariants.range.variants[$variant]
    );

    const filledClasses = cn(
      sliderVariants.filled.base,
      sliderVariants.filled[orientation],
      sliderVariants.filled.variants[$variant]
    );

    const thumbClasses = cn(
      sliderVariants.thumb.base,
      sliderVariants.thumb.sizes[$size],
      sliderVariants.thumb.variants[$variant],
      {
        [sliderVariants.thumb.disabled]: disabled,
      },
      $thumbClassName
    );

    const labelClasses = cn(
      sliderVariants.label.base,
      {
        [sliderVariants.label.disabled]: disabled,
      },
      $labelClassName
    );

    const valueClasses = cn(
      sliderVariants.value.base,
      sliderVariants.value.variants[$variant]
    );

    return (
      <div className={cn('w-full', className)} {...props}>
        {/* Label */}
        {label && (
          <label className={labelClasses}>
            {label}
            {$showValue && (
              <span className={cn('ml-2 flex gap-1', valueClasses)}>
                <span>{$formatValue(startValue)}</span>
                <span>-</span>
                <span>{$formatValue(endValue)}</span>
              </span>
            )}
          </label>
        )}

        {/* Slider container */}
        <div
          className={cn(
            'relative',
            orientation === 'horizontal' ? 'py-2' : 'px-2'
          )}>
          <div className={trackClasses}>
            {/* Track background */}
            <div className={rangeClasses}>
              {/* Filled portion (range) */}
              <div
                className={filledClasses}
                style={
                  orientation === 'horizontal'
                    ? {
                        left: `${startPercentage}%`,
                        width: `${rangePercentage}%`,
                      }
                    : {
                        bottom: `${startPercentage}%`,
                        height: `${rangePercentage}%`,
                      }
                }
              />
            </div>

            {/* Start thumb */}
            <div
              className={thumbClasses}
              style={
                orientation === 'horizontal'
                  ? {
                      left: `${startPercentage}%`,
                      transform: 'translateX(-50%)',
                      position: 'absolute',
                      top: '50%',
                      marginTop: '-0.625rem',
                    }
                  : {
                      bottom: `${startPercentage}%`,
                      transform: 'translateY(50%)',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-0.625rem',
                    }
              }
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={endValue}
              aria-valuenow={startValue}
              aria-disabled={disabled}
              aria-orientation={orientation}
              aria-label="Minimum value"
            />

            {/* End thumb */}
            <div
              className={thumbClasses}
              style={
                orientation === 'horizontal'
                  ? {
                      left: `${endPercentage}%`,
                      transform: 'translateX(-50%)',
                      position: 'absolute',
                      top: '50%',
                      marginTop: '-0.625rem',
                    }
                  : {
                      bottom: `${endPercentage}%`,
                      transform: 'translateY(50%)',
                      position: 'absolute',
                      left: '50%',
                      marginLeft: '-0.625rem',
                    }
              }
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={startValue}
              aria-valuemax={max}
              aria-valuenow={endValue}
              aria-disabled={disabled}
              aria-orientation={orientation}
              aria-label="Maximum value"
            />
          </div>

          {/* Min/Max labels */}
          {$showLabels && (
            <div
              className={cn(
                sliderVariants.minMaxLabels.base,
                sliderVariants.minMaxLabels[orientation]
              )}>
              <span>{$minLabel || min}</span>
              <span>{$maxLabel || max}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className={sliderVariants.description.base}>{description}</div>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';

export { Slider, RangeSlider, type SliderProps, type RangeSliderProps };

