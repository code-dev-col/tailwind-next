import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { Text } from '../../Text';
import {
  getSecurityPreset,
  type SecurityOptions,
} from '../../../../utils/security';
import { useSecureField } from '../../../../utils/useSecureField';

interface InputProps<T extends Record<string, any> = any> extends BaseProps {
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

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Patrón string store (actual - para compatibilidad)
  $storeString?: string;

  // Funcionalidades existentes
  $maxCharacters?: number; // Máximo de caracteres con contador

  // Nuevas funcionalidades de seguridad
  $security?:
    | SecurityOptions
    | keyof typeof import('../../../../utils/security').SECURITY_PRESETS;
  $sanitizeOnChange?: boolean; // Auto-sanitizar en onChange (por defecto false)
  $showSecurityWarnings?: boolean; // Mostrar advertencias de seguridad (por defecto false)
  $blockUnsafeInput?: boolean; // Bloquear input inseguro completamente (por defecto false)

  // Props normales
  id?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecurityThreat?: (threats: string[], value: string) => void;
  onSecurityClear?: (
    reason: 'blocked' | 'sanitizedClear',
    threats: string[]
  ) => void; // Callback cuando se limpia el input por seguridad
}

// 🎨 Sistema de esquemas de color con theme.css
const colorSchemes = {
  default: {
    base: 'border-input bg-background',
    hover: 'hover:border-primary/50',
    focus: 'focus-visible:ring-ring focus-visible:ring-primary/20',
    text: 'text-foreground',
    placeholder: 'placeholder:text-muted-foreground',
  },
  secondary: {
    base: 'border-secondary/30 bg-secondary/5',
    hover: 'hover:border-secondary/50',
    focus: 'focus-visible:ring-secondary/20',
    text: 'text-secondary-foreground',
    placeholder: 'placeholder:text-secondary/60',
  },
  destructive: {
    base: 'border-destructive/50 bg-destructive/5',
    hover: 'hover:border-destructive/70',
    focus: 'focus-visible:ring-destructive/20',
    text: 'text-destructive-foreground',
    placeholder: 'placeholder:text-destructive/60',
  },
  accent: {
    base: 'border-accent/30 bg-accent/5',
    hover: 'hover:border-accent/50',
    focus: 'focus-visible:ring-accent/20',
    text: 'text-accent-foreground',
    placeholder: 'placeholder:text-accent/60',
  },
  muted: {
    base: 'border-muted bg-muted/10',
    hover: 'hover:border-muted-foreground/30',
    focus: 'focus-visible:ring-muted/20',
    text: 'text-muted-foreground',
    placeholder: 'placeholder:text-muted-foreground/60',
  },
  minimal: {
    base: 'border-transparent bg-transparent',
    hover: 'hover:border-foreground/20',
    focus: 'focus-visible:ring-foreground/10',
    text: 'text-foreground',
    placeholder: 'placeholder:text-foreground/40',
  },
  ghost: {
    base: 'border-transparent bg-accent/5',
    hover: 'hover:bg-accent/10 hover:border-accent/20',
    focus:
      'focus-visible:ring-accent/10 focus-visible:bg-background focus-visible:border-input',
    text: 'text-foreground',
    placeholder: 'placeholder:text-muted-foreground',
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
    text: '',
    placeholder: '',
  },
};

const inputVariants = {
  base: 'flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    variant: {
      default:
        'border-input bg-background hover:border-primary/50 focus-visible:shadow-md',
      destructive:
        'border-destructive bg-background hover:border-destructive/70 focus-visible:ring-destructive focus-visible:shadow-md',
      ghost:
        'border-transparent bg-accent hover:bg-accent/80 focus-visible:bg-background focus-visible:border-input focus-visible:shadow-md',
    },
    size: {
      default: 'h-10 px-3 py-2',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-11 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

// Función helper para obtener el store
const getZustandStore = (storeName: string) => {
  // Buscar el store en el objeto global (patron común en Zustand)
  if (typeof window !== 'undefined') {
    const globalStores = (window as any).__zustand_stores || {};
    return globalStores[storeName];
  }
  return null;
};

const InputComponent = <T extends Record<string, any> = any>(
  {
    className,
    $colorScheme = 'default',
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    $maxCharacters,
    $security,
    $sanitizeOnChange = false,
    $showSecurityWarnings = false,
    $blockUnsafeInput = false,
    type = 'text',
    value: controlledValue,
    onChange: controlledOnChange,
    onSecurityThreat,
    onSecurityClear,
    maxLength,
    ...props
  }: InputProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
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
  const finalValue = storeValue ?? stringStoreValue ?? controlledValue ?? '';
  const finalSetter = storeSetter ?? stringStoreSetter;

  const securityOptions: SecurityOptions | undefined = $security
    ? typeof $security === 'string'
      ? getSecurityPreset($security)
      : $security
    : undefined;

  const secureField = useSecureField({
    value: finalValue,
    setter: finalSetter,
    security: securityOptions,
    sanitizeOnChange: $sanitizeOnChange,
    showSecurityWarnings: $showSecurityWarnings,
    blockUnsafeInput: $blockUnsafeInput,
    maxCharacters: $maxCharacters,
    maxLengthProp: maxLength,
    onSecurityThreat,
    onSecurityClear,
    onChangeExternal: (processed) => {
      if (controlledOnChange) {
        const syntheticEvent = {
          target: { value: processed },
        } as React.ChangeEvent<HTMLInputElement>;
        controlledOnChange(syntheticEvent);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    secureField.handleChange(e.target.value);
  };

  // Determinar esquema de color final (con consideraciones de seguridad)
  const finalColorScheme = React.useMemo(() => {
    // Si hay problemas de seguridad o límites, forzar destructive
    if (secureField.shouldShowSecurityVariant || secureField.isOverLimit) {
      return 'destructive';
    }

    // Usar el esquema de color especificado
    return $colorScheme;
  }, [
    $colorScheme,
    secureField.shouldShowSecurityVariant,
    secureField.isOverLimit,
  ]);

  // Obtener esquema de color activo
  const currentColorScheme = colorSchemes[finalColorScheme];

  const inputElement = (
    <input
      type={type}
      className={
        $custom
          ? cn(
              inputVariants.base,
              inputVariants.variants.size[$size || 'default'],
              className,
              $custom // $custom sobrescribe todo
            )
          : cn(
              inputVariants.base,
              // Usar theme.css color scheme
              currentColorScheme.base,
              currentColorScheme.hover,
              currentColorScheme.focus,
              currentColorScheme.text,
              currentColorScheme.placeholder,
              inputVariants.variants.size[$size || 'default'],
              'focus-visible:shadow-md', // Mantener shadow por defecto
              className
            )
      }
      value={secureField.value}
      onChange={handleChange}
      maxLength={secureField.effectiveMaxLength}
      ref={ref}
      {...props}
    />
  );

  // Construir elementos adicionales
  const additionalElements = [];

  // Contador de caracteres
  if (secureField.effectiveMaxLength) {
    additionalElements.push(
      <div key="char-counter" className="flex justify-end">
        <Text
          $size="xs"
          $colorScheme={secureField.isOverLimit ? 'destructive' : 'muted'}
          className="tabular-nums">
          {secureField.currentLength}/{secureField.effectiveMaxLength}
        </Text>
      </div>
    );
  }

  // Advertencias de seguridad
  if ($showSecurityWarnings && secureField.securityWarnings.length > 0) {
    additionalElements.push(
      <div key="security-warnings" className="space-y-1">
        {secureField.securityWarnings.map((warning, index) => (
          <Text
            key={index}
            $size="xs"
            $colorScheme="destructive"
            className="flex items-center gap-1">
            <span className="text-red-500">⚠️</span>
            {warning}
          </Text>
        ))}
      </div>
    );
  }

  if (secureField.wasClearedReason) {
    additionalElements.push(
      <Text
        key="security-cleared"
        $size="xs"
        $colorScheme="destructive"
        className="flex items-center gap-1">
        <span className="text-red-500">🧹</span>
        {secureField.wasClearedReason === 'blocked'
          ? 'Entrada bloqueada y limpiada por amenaza.'
          : 'Entrada limpiada por sanitización de seguridad.'}
      </Text>
    );
  }

  // Si no hay elementos adicionales, devolver solo el input
  if (additionalElements.length === 0) {
    return inputElement;
  }

  // Si hay elementos adicionales, envolver con contenedor
  return (
    <div className="w-full">
      {inputElement}
      <div className="mt-1 space-y-1">{additionalElements}</div>
    </div>
  );
};

const Input = React.forwardRef(InputComponent) as <
  T extends Record<string, any> = any,
>(
  props: InputProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(Input as any).displayName = 'Input';

export { Input, type InputProps };

