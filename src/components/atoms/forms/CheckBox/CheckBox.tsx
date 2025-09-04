import React, { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import type { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface CheckBoxProps<T extends Record<string, any> = any> extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'ghost'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;
  // Nuevo patrón storeKey (preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;
  // Patrón legacy para compatibilidad
  $storeString?: string;
  id?: string;
  name?: string;
  value?: string; // Valor opcional para checkboxes
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean; // Estado indeterminado
  label?: string;
  description?: string;
  onChange?: (
    checked: boolean,
    value?: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// 🎨 CSS-in-JS: Función para obtener colores por esquema usando variables CSS del theme
const getColorSchemeValues = (scheme: string) => {
  // Usar CSS custom properties del theme.css para máxima personalización
  const colors = {
    default: {
      primary: 'hsl(var(--primary))',
      border: 'hsl(var(--primary) / 0.5)',
      focus: 'hsl(var(--primary) / 0.2)',
    },
    secondary: {
      primary: 'hsl(var(--secondary))',
      border: 'hsl(var(--secondary) / 0.5)',
      focus: 'hsl(var(--secondary) / 0.2)',
    },
    destructive: {
      primary: 'hsl(var(--destructive))',
      border: 'hsl(var(--destructive) / 0.5)',
      focus: 'hsl(var(--destructive) / 0.2)',
    },
    accent: {
      primary: 'hsl(var(--accent))',
      border: 'hsl(var(--accent) / 0.5)',
      focus: 'hsl(var(--accent) / 0.2)',
    },
    muted: {
      primary: 'hsl(var(--muted-foreground))',
      border: 'hsl(var(--muted-foreground) / 0.5)',
      focus: 'hsl(var(--muted-foreground) / 0.2)',
    },
    minimal: {
      primary: 'hsl(var(--foreground))',
      border: 'hsl(var(--foreground) / 0.3)',
      focus: 'hsl(var(--foreground) / 0.1)',
    },
    ghost: {
      primary: 'hsl(var(--primary))',
      border: 'hsl(var(--primary) / 0.2)',
      focus: 'hsl(var(--primary) / 0.1)',
    },
    custom: {
      primary: 'currentColor',
      border: 'currentColor',
      focus: 'currentColor',
    },
  };

  return colors[scheme as keyof typeof colors] || colors.default;
};

// 🎨 CSS-in-JS: SVG Icons como data URIs mejorados y más grandes
const getSvgIcons = () => ({
  check: `url("data:image/svg+xml,%3csvg viewBox='0 0 20 20' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z' stroke='white' stroke-width='1'/%3e%3c/svg%3e")`,
  indeterminate: `url("data:image/svg+xml,%3csvg viewBox='0 0 20 20' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4 9h12v2H4z'/%3e%3c/svg%3e")`,
});

// 🎨 Hook para CSS-in-JS dinámico con ::before pseudo-element
const useCheckboxStyles = (
  colorScheme: string,
  isChecked: boolean,
  isIndeterminate: boolean,
  disabled: boolean
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const colors = getColorSchemeValues(colorScheme);
  const icons = getSvgIcons();

  useEffect(() => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const styleId = `checkbox-style-${Math.random().toString(36).substr(2, 9)}`;

    // Crear estilos CSS dinámicos para ::before
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      input[data-checkbox-id="${styleId}"] {
        appearance: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        display: grid !important;
        place-content: center !important;
        margin: 0 !important;
        background-color: transparent !important;
        font: inherit !important;
        color: currentColor !important;
      }
      
      input[data-checkbox-id="${styleId}"]::before {
        content: "";
        width: 0.75em;
        height: 0.75em;
        transform: scale(0);
        transition: none;
        transform-origin: bottom left;
        mask-size: contain;
        mask-repeat: no-repeat;
        mask-position: center;
        background-color: ${colors.primary};
      }
      
      input[data-checkbox-id="${styleId}"]:checked::before,
      input[data-checkbox-id="${styleId}"][data-indeterminate="true"]::before {
        transform: scale(1);
        transition: 120ms transform ease-in-out;
      }
      
      input[data-checkbox-id="${styleId}"]:checked::before {
        mask-image: ${icons.check};
      }
      
      input[data-checkbox-id="${styleId}"][data-indeterminate="true"]::before {
        mask-image: ${icons.indeterminate};
      }
      
      input[data-checkbox-id="${styleId}"]:focus {
        outline: max(2px, 0.15em) solid ${colors.focus} !important;
        outline-offset: max(2px, 0.15em) !important;
      }
      
      input[data-checkbox-id="${styleId}"]:disabled {
        cursor: not-allowed !important;
        opacity: 0.5 !important;
      }
      
      input[data-checkbox-id="${styleId}"]:disabled::before {
        background-color: hsl(var(--muted-foreground) / 0.5) !important;
      }
      
      @media (forced-colors: active) {
        input[data-checkbox-id="${styleId}"]::before {
          background-color: CanvasText !important;
        }
      }
    `;

    document.head.appendChild(style);
    input.setAttribute('data-checkbox-id', styleId);
    input.setAttribute('data-indeterminate', isIndeterminate.toString());

    return () => {
      document.head.removeChild(style);
    };
  }, [colors, icons, isChecked, isIndeterminate, disabled]);

  return inputRef;
};

// 🎨 Sistema de esquemas de color usando theme.css
const colorSchemes = {
  default: {
    border: 'border-primary/50',
    hoverBorder: 'hover:border-primary',
    focusRing: 'focus-visible:ring-primary/20',
  },
  secondary: {
    border: 'border-secondary/50',
    hoverBorder: 'hover:border-secondary',
    focusRing: 'focus-visible:ring-secondary/20',
  },
  destructive: {
    border: 'border-destructive/50',
    hoverBorder: 'hover:border-destructive',
    focusRing: 'focus-visible:ring-destructive/20',
  },
  accent: {
    border: 'border-accent/50',
    hoverBorder: 'hover:border-accent',
    focusRing: 'focus-visible:ring-accent/20',
  },
  muted: {
    border: 'border-muted-foreground/50',
    hoverBorder: 'hover:border-muted-foreground',
    focusRing: 'focus-visible:ring-muted-foreground/20',
  },
  minimal: {
    border: 'border-foreground/30',
    hoverBorder: 'hover:border-foreground/50',
    focusRing: 'focus-visible:ring-foreground/10',
  },
  ghost: {
    border: 'border-primary/30',
    hoverBorder: 'hover:border-primary/50',
    focusRing: 'focus-visible:ring-primary/10',
  },
  custom: {
    border: '', // Vacío para personalización externa
    hoverBorder: '',
    focusRing: '',
  },
} as const;

const checkBoxVariants = {
  base: 'peer h-5 w-5 shrink-0 rounded-sm border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 cursor-pointer',
  variants: {
    size: {
      default: 'h-5 w-5',
      sm: 'h-4 w-4',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'default',
  },
};

const labelVariants = {
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
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

const CheckBox = <T extends Record<string, any> = any>({
  className,
  $colorScheme = 'default',
  $size = 'default',
  $custom,
  $store,
  storeKey,
  $storeString,
  id,
  name,
  value,
  disabled = false,
  checked,
  indeterminate = false,
  label,
  description,
  onChange,
  onFocus,
  onBlur,
  ...props
}: CheckBoxProps<T>) => {
  // Generate unique ID
  const checkboxId =
    id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // storeKey pattern (nuevo)
  const storeValue =
    $store && storeKey ? $store((state) => state[storeKey]) : undefined;

  const storeSetValue =
    $store && storeKey
      ? $store((state) => {
          const setterName = `set${
            String(storeKey).charAt(0).toUpperCase() + String(storeKey).slice(1)
          }`;
          return state[setterName as keyof typeof state];
        })
      : undefined;

  // Legacy pattern support
  const legacyStore = $storeString ? getZustandStore($storeString) : null;
  const legacyValue = legacyStore
    ? useStore(legacyStore, (state: any) => state.value)
    : undefined;
  const legacySetValue = legacyStore
    ? useStore(legacyStore, (state: any) => state.setValue)
    : undefined;

  // Determinar el valor final para checkboxes
  const finalIsChecked = React.useMemo(() => {
    // Si checked prop está definido, usarlo (mayor prioridad)
    if (checked !== undefined) {
      return checked;
    }

    // storeKey pattern con array support
    if ($store && storeKey && storeValue !== undefined) {
      // Si es un array y tenemos un value, verificar si el value está en el array
      if (Array.isArray(storeValue) && value !== undefined) {
        return storeValue.includes(value);
      }
      // Si no es array, convertir a boolean
      return Boolean(storeValue);
    }

    // Legacy pattern support
    if (legacyValue !== undefined) {
      return Boolean(legacyValue);
    }

    return false;
  }, [checked, storeValue, value, legacyValue]);

  // Usar el esquema de color especificado directamente
  const finalColorScheme = $colorScheme;

  // Obtener esquema de color activo
  const currentColorScheme =
    colorSchemes[finalColorScheme as keyof typeof colorSchemes];

  // CSS-in-JS hook para estilos dinámicos
  const inputRef = useCheckboxStyles(
    finalColorScheme,
    finalIsChecked,
    indeterminate,
    disabled
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    // Update stores if provided
    if (storeSetValue && typeof storeSetValue === 'function') {
      // Si tenemos un value y el storeValue es array, manejar como array
      if (value !== undefined && Array.isArray(storeValue)) {
        const currentArray = storeValue as string[];
        const newArray = newChecked
          ? [...currentArray, value] // Agregar valor
          : currentArray.filter((item) => item !== value); // Remover valor

        storeSetValue(newArray);
      } else {
        // Manejar como boolean simple
        storeSetValue(newChecked);
      }
    }

    // Legacy store support
    if (legacySetValue && typeof legacySetValue === 'function') {
      legacySetValue(newChecked);
    }

    // Call onChange prop
    if (onChange) {
      onChange(newChecked, value, e);
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          className={
            $custom
              ? cn(
                  checkBoxVariants.base,
                  checkBoxVariants.variants.size[$size || 'default'],
                  className,
                  $custom // $custom sobrescribe todo
                )
              : cn(
                  checkBoxVariants.base,
                  // Usar theme.css color scheme con clases Tailwind base
                  currentColorScheme.border,
                  currentColorScheme.hoverBorder,
                  currentColorScheme.focusRing,
                  checkBoxVariants.variants.size[$size || 'default'],
                  'focus-visible:shadow-md', // Mantener shadow por defecto
                  className
                )
          }
          id={checkboxId}
          name={name}
          value={value}
          checked={finalIsChecked}
          disabled={disabled}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          {...props}
        />
      </div>

      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                labelVariants.base,
                labelVariants.sizes[$size || 'default']
              )}>
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

CheckBox.displayName = 'CheckBox';

export { CheckBox, type CheckBoxProps };
