import React, { useState } from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import { Text } from '../Text';
import {
  validateInputSecurity,
  useSecurityValidation,
  getSecurityPreset,
  type SecurityOptions,
} from '../../../utils/security';

interface TextAreaProps<T extends Record<string, any> = any> extends BaseProps {
  $variant?: 'default' | 'destructive' | 'ghost';
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
    | keyof typeof import('../../../utils/security').SECURITY_PRESETS;
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

const textAreaVariants = {
  base: 'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
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
    $variant,
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
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [wasClearedReason, setWasClearedReason] = useState<
    null | 'blocked' | 'sanitizedClear'
  >(null);

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

  // Configuración de seguridad
  const securityOptions: SecurityOptions =
    typeof $security === 'string'
      ? getSecurityPreset($security)
      : $security || { level: 'basic' };

  // Validación de seguridad en tiempo real
  const securityValidation = useSecurityValidation(finalValue, securityOptions);

  // Lógica para maxCharacters
  const effectiveMaxLength = $maxCharacters || maxLength;
  const currentLength = finalValue.length;
  const isOverLimit = effectiveMaxLength
    ? currentLength > effectiveMaxLength
    : false;

  // Determinar si hay amenazas de seguridad
  const hasSecurityThreats = securityValidation.hasThreats;
  const shouldShowSecurityVariant =
    hasSecurityThreats && ($showSecurityWarnings || $blockUnsafeInput);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;

    // Validar seguridad antes de procesar
    if ($security) {
      const validation = validateInputSecurity(newValue, securityOptions);
      if (!validation.isValid) {
        if (onSecurityThreat) onSecurityThreat(validation.threats, newValue);
        if ($showSecurityWarnings) setSecurityWarnings(validation.threats);
        // Bloqueo
        if ($blockUnsafeInput) {
          if (finalSetter) finalSetter('');
          setWasClearedReason('blocked');
          if (controlledOnChange) {
            const syntheticEvent = {
              ...e,
              target: { ...e.target, value: '' },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            controlledOnChange(syntheticEvent);
          }
          if (onSecurityClear) onSecurityClear('blocked', validation.threats);
          return;
        }
        // Sanitización agresiva
        if ($sanitizeOnChange && validation.sanitized !== newValue) {
          newValue = '';
          setWasClearedReason('sanitizedClear');
          if (onSecurityClear)
            onSecurityClear('sanitizedClear', validation.threats);
        }
      } else {
        setSecurityWarnings([]);
        if (wasClearedReason) setWasClearedReason(null);
      }
    }

    // Aplicar límite de caracteres si está definido
    if (effectiveMaxLength && newValue.length > effectiveMaxLength) {
      newValue = newValue.slice(0, effectiveMaxLength);
    }

    if (finalSetter) {
      finalSetter(newValue);
    }

    if (controlledOnChange) {
      // Crear un nuevo evento con el valor procesado
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: newValue },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      controlledOnChange(syntheticEvent);
    }
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

  // Determinar variante visual
  const getVariant = () => {
    if (shouldShowSecurityVariant) return 'destructive';
    if (isOverLimit) return 'destructive';
    return $variant || 'default';
  };

  // Añadir advertencias de seguridad (similar a Input) y limpiar valor si se requiere
  const showWarnings = $showSecurityWarnings && securityWarnings.length > 0;

  // Si se decidió limpiar por amenaza y sanitización/bloqueo, ya se aplicó en handleChange.

  const textAreaCore = (
    <textarea
      className={cn(
        textAreaVariants.base,
        textAreaVariants.variants.variant[getVariant()],
        textAreaVariants.variants.size[$size || 'default'],
        textAreaVariants.variants.resize[$isResize ? 'true' : 'false'],
        textAreaVariants.variants.autoSizing[$isAutoSizing ? 'true' : 'false'],
        $height && isValidTailwindClass($height) ? $height : '',
        isOverLimit ? 'border-destructive ring-destructive' : '',
        className,
        $custom
      )}
      style={dynamicStyles}
      rows={rows}
      value={finalValue}
      onChange={handleChange}
      maxLength={effectiveMaxLength}
      ref={ref}
      {...props}
    />
  );

  const additional: React.ReactNode[] = [];
  if (effectiveMaxLength) {
    additional.push(
      <div key="char-counter" className="flex justify-end mt-1">
        <Text
          $size="xs"
          $variant={isOverLimit ? 'destructive' : 'muted'}
          className="tabular-nums">
          {currentLength}/{effectiveMaxLength}
        </Text>
      </div>
    );
  }
  if (showWarnings) {
    additional.push(
      <div key="security-warnings" className="space-y-1 mt-1">
        {securityWarnings.map((w, i) => (
          <Text
            key={i}
            $size="xs"
            $variant="destructive"
            className="flex items-center gap-1">
            <span className="text-red-500">⚠️</span>
            {w}
          </Text>
        ))}
      </div>
    );
  }

  if (wasClearedReason) {
    additional.push(
      <Text
        key="security-cleared"
        $size="xs"
        $variant="destructive"
        className="flex items-center gap-1">
        <span className="text-red-500">🧹</span>
        {wasClearedReason === 'blocked'
          ? 'Entrada bloqueada y limpiada por amenaza.'
          : 'Entrada limpiada por sanitización de seguridad.'}
      </Text>
    );
  }

  if (additional.length === 0 && !effectiveMaxLength) {
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
  T extends Record<string, any> = any,
>(
  props: TextAreaProps<T> & { ref?: React.Ref<HTMLTextAreaElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(TextArea as any).displayName = 'TextArea';

export { TextArea, type TextAreaProps };

