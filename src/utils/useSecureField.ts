import { useState, useCallback, useMemo } from 'react';
import {
  validateInputSecurity,
  useSecurityValidation,
  getSecurityPreset,
  type SecurityOptions,
} from './security';

export interface UseSecureFieldParams {
  value: string;
  setter?: (v: string) => void;
  security?:
    | SecurityOptions
    | keyof typeof import('./security').SECURITY_PRESETS;
  sanitizeOnChange?: boolean;
  showSecurityWarnings?: boolean;
  blockUnsafeInput?: boolean;
  maxCharacters?: number;
  maxLengthProp?: number; // maxLength HTML prop para fallback
  onChangeExternal?: (processed: string) => void; // callback simplificado
  onSecurityThreat?: (threats: string[], value: string) => void;
  onSecurityClear?: (
    reason: 'blocked' | 'sanitizedClear',
    threats: string[]
  ) => void;
}

export interface UseSecureFieldResult {
  value: string;
  handleChange: (raw: string) => { value: string };
  securityWarnings: string[];
  wasClearedReason: null | 'blocked' | 'sanitizedClear';
  effectiveMaxLength?: number;
  currentLength: number;
  isOverLimit: boolean;
  hasSecurityThreats: boolean;
  shouldShowSecurityVariant: boolean;
  resetWarnings: () => void;
}

export function useSecureField(
  params: UseSecureFieldParams
): UseSecureFieldResult {
  const {
    value,
    setter,
    security,
    sanitizeOnChange = false,
    showSecurityWarnings = false,
    blockUnsafeInput = false,
    maxCharacters,
    maxLengthProp,
    onChangeExternal,
    onSecurityThreat,
    onSecurityClear,
  } = params;

  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [wasClearedReason, setWasClearedReason] = useState<
    null | 'blocked' | 'sanitizedClear'
  >(null);

  const securityOptions: SecurityOptions | undefined = useMemo(() => {
    if (!security) return undefined;
    return typeof security === 'string'
      ? getSecurityPreset(security)
      : security;
  }, [security]);

  const validation = useSecurityValidation(
    value,
    securityOptions || { level: 'basic' }
  );

  const effectiveMaxLength = maxCharacters || maxLengthProp;
  const currentLength = value.length;
  const isOverLimit = effectiveMaxLength
    ? currentLength > effectiveMaxLength
    : false;
  const hasSecurityThreats = validation.hasThreats;
  const shouldShowSecurityVariant =
    hasSecurityThreats && (showSecurityWarnings || blockUnsafeInput);

  const resetWarnings = useCallback(() => {
    setSecurityWarnings([]);
    setWasClearedReason(null);
  }, []);

  const handleChange = useCallback(
    (raw: string) => {
      let newValue = raw;
      if (securityOptions) {
        const result = validateInputSecurity(newValue, securityOptions);
        if (!result.isValid) {
          if (onSecurityThreat) onSecurityThreat(result.threats, newValue);
          if (showSecurityWarnings) setSecurityWarnings(result.threats);
          if (blockUnsafeInput) {
            newValue = '';
            if (setter) setter('');
            setWasClearedReason('blocked');
            if (onSecurityClear) onSecurityClear('blocked', result.threats);
            if (onChangeExternal) onChangeExternal('');
            return { value: '' };
          }
          if (sanitizeOnChange && result.sanitized !== newValue) {
            newValue = '';
            if (setter) setter('');
            setWasClearedReason('sanitizedClear');
            if (onSecurityClear)
              onSecurityClear('sanitizedClear', result.threats);
            if (onChangeExternal) onChangeExternal('');
            return { value: '' };
          }
        } else {
          if (securityWarnings.length) setSecurityWarnings([]);
          if (wasClearedReason) setWasClearedReason(null);
        }
      }
      if (effectiveMaxLength && newValue.length > effectiveMaxLength) {
        newValue = newValue.slice(0, effectiveMaxLength);
      }
      if (setter) setter(newValue);
      if (onChangeExternal) onChangeExternal(newValue);
      return { value: newValue };
    },
    [
      securityOptions,
      onSecurityThreat,
      showSecurityWarnings,
      blockUnsafeInput,
      sanitizeOnChange,
      setter,
      onSecurityClear,
      onChangeExternal,
      securityWarnings.length,
      wasClearedReason,
      effectiveMaxLength,
    ]
  );

  return {
    value,
    handleChange,
    securityWarnings,
    wasClearedReason,
    effectiveMaxLength,
    currentLength,
    isOverLimit,
    hasSecurityThreats,
    shouldShowSecurityVariant,
    resetWarnings,
  };
}

export type { SecurityOptions };

