import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface RadioButtonProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Esquemas de color theme.css (sistema unificado)
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'outline'
    | 'ghost'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Patrón string store (actual - para compatibilidad)
  $storeString?: string;

  // Props normales
  id?: string;
  name?: string;
  value: string; // Valor requerido para radio buttons
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  description?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Hook para manejar estilos CSS-in-JS del RadioButton
const useRadioButtonStyles = ($colorScheme: string, disabled?: boolean) => {
  const styleId = React.useMemo(
    () => `radio-button-styles-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  React.useEffect(() => {
    // Esquemas de color con variables theme.css
    const colorSchemes = {
      default: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--primary))',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--primary))',
        dot: 'hsl(var(--primary-foreground))',
        borderHover: 'hsl(var(--primary) / 0.8)',
        borderFocus: 'hsl(var(--primary))',
      },
      secondary: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--secondary))',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--secondary))',
        dot: 'hsl(var(--secondary-foreground))',
        borderHover: 'hsl(var(--secondary) / 0.8)',
        borderFocus: 'hsl(var(--secondary))',
      },
      destructive: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--destructive))',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--destructive))',
        dot: 'hsl(var(--destructive-foreground))',
        borderHover: 'hsl(var(--destructive) / 0.8)',
        borderFocus: 'hsl(var(--destructive))',
      },
      accent: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--accent))',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--accent))',
        dot: 'hsl(var(--accent-foreground))',
        borderHover: 'hsl(var(--accent) / 0.8)',
        borderFocus: 'hsl(var(--accent))',
      },
      muted: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--muted-foreground))',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--muted))',
        dot: 'hsl(var(--muted-foreground))',
        borderHover: 'hsl(var(--muted-foreground) / 0.8)',
        borderFocus: 'hsl(var(--muted-foreground))',
      },
      minimal: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--foreground))',
        background: 'transparent',
        backgroundChecked: 'transparent',
        dot: 'hsl(var(--foreground))',
        borderHover: 'hsl(var(--foreground) / 0.8)',
        borderFocus: 'hsl(var(--foreground))',
      },
      outline: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--border))',
        background: 'transparent',
        backgroundChecked: 'transparent',
        dot: 'hsl(var(--foreground))',
        borderHover: 'hsl(var(--border))',
        borderFocus: 'hsl(var(--border))',
      },
      ghost: {
        border: 'hsl(var(--border) / 0.5)',
        borderChecked: 'hsl(var(--foreground) / 0.7)',
        background: 'transparent',
        backgroundChecked: 'hsl(var(--muted) / 0.3)',
        dot: 'hsl(var(--foreground))',
        borderHover: 'hsl(var(--foreground) / 0.5)',
        borderFocus: 'hsl(var(--foreground) / 0.7)',
      },
      custom: {
        border: 'hsl(var(--border))',
        borderChecked: 'hsl(var(--border))',
        background: 'transparent',
        backgroundChecked: 'transparent',
        dot: 'hsl(var(--foreground))',
        borderHover: 'hsl(var(--border))',
        borderFocus: 'hsl(var(--border))',
      },
    };

    const scheme =
      colorSchemes[$colorScheme as keyof typeof colorSchemes] ||
      colorSchemes.default;

    const css = `
      .${styleId} {
        appearance: none;
        border-radius: 50%;
        border: 2px solid ${scheme.border};
        background: ${scheme.background};
        display: grid;
        place-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
      }

      .${styleId}:hover:not(:disabled) {
        border-color: ${scheme.borderHover};
        box-shadow: 0 0 0 2px ${scheme.borderHover}20;
      }

      .${styleId}:focus {
        outline: none;
        border-color: ${scheme.borderFocus};
        box-shadow: 0 0 0 2px ${scheme.borderFocus}40;
      }

      .${styleId}:checked {
        border-color: ${scheme.borderChecked};
        background: ${scheme.backgroundChecked};
      }

      .${styleId}:checked::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        background: ${scheme.dot};
        transform: scale(1);
        transition: transform 0.2s ease;
        box-shadow: inset 1em 1em ${scheme.dot};
      }

      .${styleId}:not(:checked)::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.2s ease;
      }

      .${styleId}:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .${styleId}:disabled:hover {
        border-color: ${scheme.border};
        box-shadow: none;
      }
    `;

    // Inyectar estilos
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.setAttribute('data-radio-button-styles', styleId);
    document.head.appendChild(styleElement);

    return () => {
      // Cleanup: remover estilos cuando el componente se desmonta
      const existingStyle = document.querySelector(
        `[data-radio-button-styles="${styleId}"]`
      );
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [$colorScheme, disabled, styleId]);

  return styleId;
};

const radioButtonVariants = {
  base: 'aspect-square focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  sizes: {
    default: 'h-4 w-4',
    sm: 'h-3 w-3',
    lg: 'h-5 w-5',
  },
};

const labelVariants = {
  base: 'text-sm font-medium leading-none cursor-pointer select-none',
  sizes: {
    default: 'text-sm',
    sm: 'text-xs',
    lg: 'text-base',
  },
};

// Función helper para obtener el store
const getZustandStore = (storeName: string) => {
  if (typeof window !== 'undefined') {
    const globalStores = (window as any).__zustand_stores || {};
    return globalStores[storeName];
  }
  return null;
};

const RadioButtonComponent = <T extends Record<string, any> = any>(
  {
    className,
    $colorScheme = 'default',
    $size = 'default',
    $custom,
    $store,
    storeKey,
    $storeString,
    value,
    label,
    description,
    checked: controlledChecked,
    onChange: controlledOnChange,
    id,
    disabled,
    ...props
  }: RadioButtonProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  // CSS-in-JS styles
  const styleClassName = useRadioButtonStyles($colorScheme, disabled);

  // Generar ID único si no se proporciona
  const radioId = id || React.useId();

  // Patrón storeKey (nuevo y preferido)
  const storeValue =
    $store && storeKey
      ? $store((state) => state[storeKey] as string)
      : undefined;

  const storeSetter =
    $store && storeKey
      ? $store((state) => {
          const setterName =
            `set${String(storeKey).charAt(0).toUpperCase()}${String(storeKey).slice(1)}` as keyof T;
          return state[setterName] as (value: string) => void;
        })
      : undefined;

  // Patrón string store (actual - para compatibilidad)
  const zustandStore = $storeString ? getZustandStore($storeString) : null;
  const stringStoreValue = zustandStore
    ? useStore(zustandStore, (state: any) => state.value || '')
    : undefined;
  const stringStoreSetter = zustandStore
    ? useStore(zustandStore, (state: any) => state.setValue)
    : undefined;

  // Determinar valor y setter finales
  const finalValue = storeValue ?? stringStoreValue;
  const finalSetter = storeSetter ?? stringStoreSetter;

  // Determinar si está checked
  const isChecked =
    finalValue !== undefined
      ? finalValue === value
      : controlledChecked || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Debug log para desarrollo
      console.log(`RadioButton: ${String(storeKey)} = "${value}"`);

      if (finalSetter) {
        finalSetter(value);
      }

      if (controlledOnChange) {
        controlledOnChange(value, e);
      }
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <div className="relative">
        <input
          type="radio"
          className={cn(
            radioButtonVariants.base,
            radioButtonVariants.sizes[$size],
            styleClassName,
            className,
            $custom
          )}
          id={radioId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
      </div>

      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                labelVariants.base,
                labelVariants.sizes[$size],
                disabled && 'opacity-50 cursor-not-allowed'
              )}>
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                'text-muted-foreground',
                labelVariants.sizes[$size === 'default' ? 'sm' : $size],
                disabled && 'opacity-50'
              )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const RadioButton = React.forwardRef(RadioButtonComponent) as <
  T extends Record<string, any> = any,
>(
  props: RadioButtonProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(RadioButton as any).displayName = 'RadioButton';

export { RadioButton, type RadioButtonProps };

