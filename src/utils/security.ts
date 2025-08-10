/**
 * Utilidades de seguridad para prevenir inyecciones SQL y XSS
 */

// Patrones comunes de inyección SQL
const SQL_INJECTION_PATTERNS = [
  // Comentarios SQL
  /(-{2,}|\/\*|\*\/)/gi,
  // Palabras clave SQL peligrosas
  /(union|select|insert|update|delete|drop|create|alter|exec|execute|script)/gi,
  // Caracteres peligrosos para SQL
  /[';"|\\]/gi,
  // Funciones SQL peligrosas
  /(xp_|sp_|fn_)/gi,
  // Operadores SQL
  /(\s(or|and)\s+\d+\s*=\s*\d+)/gi,
  // Intentos de bypass de autenticación
  /(\s(or|and)\s+['"]\w*['"]?\s*=\s*['"]\w*['"]?)/gi,
];

// Patrones XSS comunes
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<img[^>]+src[^>]*>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
];

export type SecurityLevel = 'basic' | 'strict' | 'paranoid';

export interface SecurityOptions {
  level: SecurityLevel;
  allowHtml?: boolean;
  allowSpecialChars?: boolean;
  maxLength?: number;
  customPatterns?: RegExp[];
}

/**
 * Detecta patrones de inyección SQL en un string
 */
export function detectSQLInjection(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Detecta patrones XSS en un string
 */
export function detectXSS(input: string): boolean {
  if (!input || typeof input !== 'string') return false;

  return XSS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitiza un string removiendo caracteres peligrosos
 */
export function sanitizeInput(
  input: string,
  options: SecurityOptions = { level: 'basic' }
): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input;

  // Aplicar sanitización según el nivel
  switch (options.level) {
    case 'paranoid':
      // Remover todo excepto letras, números y espacios
      sanitized = sanitized.replace(/[^a-zA-Z0-9\s\-_.@]/g, '');
      break;

    case 'strict':
      // Remover caracteres SQL y HTML peligrosos
      sanitized = sanitized.replace(/[<>'";&|(){}[\]\\]/g, '');
      break;

    case 'basic':
    default:
      // Escapar caracteres básicos peligrosos
      sanitized = sanitized
        .replace(/'/g, "''") // Escapar comillas simples
        .replace(/"/g, '&quot;') // Escapar comillas dobles
        .replace(/</g, '&lt;') // Escapar menor que
        .replace(/>/g, '&gt;') // Escapar mayor que
        .replace(/&/g, '&amp;'); // Escapar ampersand
      break;
  }

  // Aplicar patrones personalizados si existen
  if (options.customPatterns) {
    options.customPatterns.forEach((pattern) => {
      sanitized = sanitized.replace(pattern, '');
    });
  }

  // Aplicar límite de longitud
  if (options.maxLength && sanitized.length > options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength);
  }

  return sanitized;
}

/**
 * Valida si un input es seguro según los criterios especificados
 */
export function validateInputSecurity(
  input: string,
  options: SecurityOptions = { level: 'basic' }
): {
  isValid: boolean;
  threats: string[];
  sanitized: string;
} {
  const threats: string[] = [];

  if (!input || typeof input !== 'string') {
    return { isValid: true, threats, sanitized: '' };
  }

  // Detectar inyecciones SQL
  if (detectSQLInjection(input)) {
    threats.push('SQL Injection detected');
  }

  // Detectar XSS
  if (detectXSS(input)) {
    threats.push('XSS pattern detected');
  }

  // Validaciones específicas por nivel
  if (options.level === 'paranoid') {
    if (!/^[a-zA-Z0-9\s\-_.@]*$/.test(input)) {
      threats.push('Invalid characters detected');
    }
  }

  if (options.level === 'strict') {
    if (/[<>'";&|(){}[\]\\]/.test(input)) {
      threats.push('Potentially dangerous characters detected');
    }
  }

  // Verificar longitud máxima
  if (options.maxLength && input.length > options.maxLength) {
    threats.push(`Input exceeds maximum length of ${options.maxLength}`);
  }

  const sanitized = sanitizeInput(input, options);
  const isValid = threats.length === 0;

  return { isValid, threats, sanitized };
}

/**
 * Hook personalizado para validación de seguridad en tiempo real
 */
export function useSecurityValidation(
  value: string,
  options: SecurityOptions = { level: 'basic' }
) {
  const validation = validateInputSecurity(value, options);

  return {
    ...validation,
    hasThreats: validation.threats.length > 0,
    threatCount: validation.threats.length,
  };
}

/**
 * Configuraciones predefinidas de seguridad
 */
export const SECURITY_PRESETS = {
  // Para campos de formulario generales
  form: { level: 'basic' as SecurityLevel, allowSpecialChars: true },

  // Para campos de nombre de usuario
  username: { level: 'strict' as SecurityLevel, maxLength: 50 },

  // Para campos de email
  email: { level: 'basic' as SecurityLevel, maxLength: 100 },

  // Para campos de búsqueda
  search: { level: 'basic' as SecurityLevel, allowSpecialChars: false },

  // Para comentarios y texto libre
  comment: { level: 'basic' as SecurityLevel, maxLength: 1000 },

  // Para campos críticos (IDs, códigos)
  critical: { level: 'paranoid' as SecurityLevel, maxLength: 20 },
} as const;

/**
 * Función helper para obtener un preset de seguridad
 */
export function getSecurityPreset(
  presetName: keyof typeof SECURITY_PRESETS
): SecurityOptions {
  return SECURITY_PRESETS[presetName];
}

