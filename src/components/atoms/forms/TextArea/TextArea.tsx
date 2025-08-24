import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { Text } from '../../display/Text';
import {
  getSecurityPreset,
  type SecurityOptions,
} from '../../../../utils/security';
import { useSecureField } from '../../../../utils/useSecureField';

interface TextAreaProps<T extends Record<string, any> = any> extends BaseProps {
  // Color scheme system (theme.css integration)
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Patrón string store (actual - para compatibilidad)
  $storeString?: string;

  // Funcionalidades existentes
  $isResize?: boolean; // Por defecto false - evita resize
  $isAutoSizing?: boolean; // Auto ajuste de altura al contenido
  $height?: string; // Altura personalizada (100px, h-32, etc.)
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
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onSecurityThreat?: (threats: string[], value: string) => void;
  onSecurityClear?: (
    reason: 'blocked' | 'sanitizedClear',
    threats: string[]
  ) => void; // Callback cuando se limpia por seguridad
}

// Color schemes using theme.css variables
const colorSchemes = {
  default: {
    border: 'border-input',
    background: 'bg-background',
    hover: 'hover:border-primary/50',
    focus: 'focus-visible:ring-primary/20',
  },
  secondary: {
    border: 'border-secondary/20',
    background: 'bg-background',
    hover: 'hover:border-secondary/40',
    focus: 'focus-visible:ring-secondary/20',
  },
  destructive: {
    border: 'border-destructive',
    background: 'bg-background',
    hover: 'hover:border-destructive/70',
    focus: 'focus-visible:ring-destructive/20',
  },
  accent: {
    border: 'border-accent/20',
    background: 'bg-background',
    hover: 'hover:border-accent/40',
    focus: 'focus-visible:ring-accent/20',
  },
  muted: {
    border: 'border-muted',
    background: 'bg-muted/10',
    hover: 'hover:border-muted-foreground/30',
    focus: 'focus-visible:ring-foreground/20',
  },
  minimal: {
    border: 'border-transparent',
    background: 'bg-transparent',
    hover: 'hover:bg-muted/5',
    focus: 'focus-visible:ring-muted/20',
  },
  custom: {
    border: '',
    background: '',
    hover: '',
    focus: '',
  },
};

const textAreaVariants = {
  base: 'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    size: {
      default: 'min-h-[80px] px-3 py-2 text-sm',
      sm: 'min-h-[60px] px-3 py-2 text-xs',
      lg: 'min-h-[120px] px-4 py-3 text-base',
    },
    resize: {
      true: 'resize-vertical',
      false: 'resize-none',
    },
    autoSizing: {
      true: '[field-sizing:content]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    resize: 'false',
    autoSizing: 'false',
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

// Función helper para validar si es una clase Tailwind
const isValidTailwindClass = (value: string): boolean => {
  const tailwindPatterns = [
    /^h-\d+$/, // h-32, h-64, etc.
    /^min-h-\d+$/, // min-h-32, etc.
    /^max-h-\d+$/, // max-h-32, etc.
    /^h-\[.+\]$/, // h-[200px], etc.
  ];
  return tailwindPatterns.some((pattern) => pattern.test(value));
};

const TextAreaComponent = <T extends Record<string, any> = any>(
  {
    className,
    $colorScheme = 'default',
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    $isResize = false,
    $isAutoSizing = false,
    $height,
    $maxCharacters,
    $security,
    $sanitizeOnChange = false,
    $showSecurityWarnings = false,
    $blockUnsafeInput = false,
    rows = 4,
    value: controlledValue,
    onChange: controlledOnChange,
    onSecurityThreat,
    onSecurityClear,
    maxLength,
    ...props
  }: TextAreaProps<T>,
  ref: React.Ref<HTMLTextAreaElement>
) => {
  // Patrón storeKey (nuevo y preferido)
  const storeValue =
    $store && storeKey
      ? $store((state) => state[storeKey] as string)
      : undefined;

  const storeSetter =
    $store && storeKey
      ? $store((state) => {
          const setterName = `set${String(storeKey)
            .charAt(0)
            .toUpperCase()}${String(storeKey).slice(1)}` as keyof T;
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
        } as React.ChangeEvent<HTMLTextAreaElement>;
        controlledOnChange(syntheticEvent);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    secureField.handleChange(e.target.value);
  };

  // Construir estilos dinámicos
  const dynamicStyles: React.CSSProperties & { [key: string]: any } = {};

  // Aplicar altura personalizada si está definida
  if ($height && !isValidTailwindClass($height)) {
    dynamicStyles.height = $height;
  }

  // Aplicar field-sizing para auto-sizing (solo si el navegador lo soporta)
  if ($isAutoSizing) {
    dynamicStyles['fieldSizing'] = 'content';
  }

  // Determinar esquema de color
  const getColorScheme = () => {
    if (secureField.shouldShowSecurityVariant) return 'destructive';
    if (secureField.isOverLimit) return 'destructive';
    return $colorScheme;
  };

  // Get color scheme classes
  const currentColorScheme = getColorScheme();
  const colorSchemeClasses = colorSchemes[currentColorScheme];

  // Añadir advertencias de seguridad (similar a Input) y limpiar valor si se requiere
  // Advertencias gestionadas por secureField

  // Si se decidió limpiar por amenaza y sanitización/bloqueo, ya se aplicó en handleChange.

  const textAreaCore = (
    <textarea
      className={cn(
        textAreaVariants.base,
        // Apply color scheme classes
        colorSchemeClasses.border,
        colorSchemeClasses.background,
        colorSchemeClasses.hover,
        colorSchemeClasses.focus,
        textAreaVariants.variants.size[$size || 'default'],
        textAreaVariants.variants.resize[$isResize ? 'true' : 'false'],
        textAreaVariants.variants.autoSizing[$isAutoSizing ? 'true' : 'false'],
        $height && isValidTailwindClass($height) ? $height : '',
        secureField.isOverLimit ? 'border-destructive ring-destructive' : '',
        className,
        $custom
      )}
      style={dynamicStyles}
      rows={rows}
      value={secureField.value}
      onChange={handleChange}
      maxLength={secureField.effectiveMaxLength}
      ref={ref}
      {...props}
    />
  );

  const additional: React.ReactNode[] = [];
  if (secureField.effectiveMaxLength) {
    additional.push(
      <div key="char-counter" className="flex justify-end mt-1">
        <Text
          $size="xs"
          $colorScheme={secureField.isOverLimit ? 'destructive' : 'muted'}
          className="tabular-nums">
          {secureField.currentLength}/{secureField.effectiveMaxLength}
        </Text>
      </div>
    );
  }
  if ($showSecurityWarnings && secureField.securityWarnings.length > 0) {
    additional.push(
      <div key="security-warnings" className="space-y-1 mt-1">
        {secureField.securityWarnings.map((w, i) => (
          <Text
            key={i}
            $size="xs"
            $colorScheme="destructive"
            className="flex items-center gap-1">
            <span className="text-red-500">⚠️</span>
            {w}
          </Text>
        ))}
      </div>
    );
  }
  if (secureField.wasClearedReason) {
    additional.push(
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

  if (additional.length === 0 && !secureField.effectiveMaxLength) {
    return textAreaCore;
  }

  return (
    <div className="w-full">
      {textAreaCore}
      {additional.length > 0 && <div>{additional}</div>}
    </div>
  );
};

const TextArea = React.forwardRef(TextAreaComponent) as <
  T extends Record<string, any> = any
>(
  props: TextAreaProps<T> & { ref?: React.Ref<HTMLTextAreaElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(TextArea as any).displayName = 'TextArea';

export { TextArea, type TextAreaProps };
