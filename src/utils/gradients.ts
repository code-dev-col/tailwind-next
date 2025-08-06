/**
 * Gradients Utility - Tailwind Next Library
 *
 * Utilidades para aplicar degradados consistentes siguiendo
 * los patrones establecidos en GRADIENTS_GUIDE.md
 */

export const gradients = {
  // Estados principales
  primary:
    'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
  secondary:
    'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400',
  success:
    'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600',
  warning:
    'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600',
  danger:
    'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',

  // Degradados corporativos
  corporateBlue:
    'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
  corporateGreen:
    'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
  corporatePurple:
    'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',

  // Degradados modernos
  sunset:
    'bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500',
  ocean:
    'bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500',
  forest:
    'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600',
  aurora:
    'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:from-purple-500 hover:via-pink-500 hover:to-red-500',

  // Degradados sutiles para fondos
  subtle: 'bg-gradient-to-br from-gray-50 to-gray-100',
  subtleBluegray: 'bg-gradient-to-br from-slate-50 to-slate-100',
  subtleWarm: 'bg-gradient-to-br from-orange-50 to-amber-50',
  subtleCool: 'bg-gradient-to-br from-blue-50 to-indigo-50',

  // Degradados especiales
  glass: 'bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm',
  darkGlass: 'bg-gradient-to-br from-black/20 to-black/5 backdrop-blur-sm',

  // Sin hover para fondos estáticos
  primaryStatic: 'bg-gradient-to-r from-blue-500 to-purple-600',
  dangerStatic: 'bg-gradient-to-r from-red-500 to-pink-500',
  successStatic: 'bg-gradient-to-r from-green-400 to-blue-500',
} as const;

export type GradientKey = keyof typeof gradients;

/**
 * Hook para obtener un degradado por clave
 * @param key - Clave del degradado
 * @returns Clases CSS del degradado
 */
export const useGradient = (key: GradientKey): string => {
  return gradients[key];
};

/**
 * Función para combinar degradado con clases adicionales
 * @param key - Clave del degradado
 * @param additionalClasses - Clases CSS adicionales
 * @returns Clases CSS combinadas
 */
export const getGradientClasses = (
  key: GradientKey,
  additionalClasses = ''
): string => {
  return `${gradients[key]} ${additionalClasses}`.trim();
};

/**
 * Degradados con dirección personalizable
 */
export const getDirectionalGradient = (
  colors: [string, string] | [string, string, string],
  direction:
    | 'to-r'
    | 'to-l'
    | 'to-t'
    | 'to-b'
    | 'to-br'
    | 'to-bl'
    | 'to-tr'
    | 'to-tl' = 'to-r'
): string => {
  if (colors.length === 2) {
    return `bg-gradient-${direction} from-${colors[0]} to-${colors[1]}`;
  } else {
    return `bg-gradient-${direction} from-${colors[0]} via-${colors[1]} to-${colors[2]}`;
  }
};

/**
 * Verificar si una clave de degradado existe
 * @param key - Clave a verificar
 * @returns Boolean indicando si la clave existe
 */
export const isValidGradientKey = (key: string): key is GradientKey => {
  return key in gradients;
};

/**
 * Obtener todas las claves de degradados disponibles
 * @returns Array con todas las claves
 */
export const getAvailableGradients = (): GradientKey[] => {
  return Object.keys(gradients) as GradientKey[];
};

/**
 * Categorías de degradados para organización
 */
export const gradientCategories = {
  states: [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
  ] as GradientKey[],
  corporate: [
    'corporateBlue',
    'corporateGreen',
    'corporatePurple',
  ] as GradientKey[],
  modern: ['sunset', 'ocean', 'forest', 'aurora'] as GradientKey[],
  subtle: [
    'subtle',
    'subtleBluegray',
    'subtleWarm',
    'subtleCool',
  ] as GradientKey[],
  special: ['glass', 'darkGlass'] as GradientKey[],
  static: ['primaryStatic', 'dangerStatic', 'successStatic'] as GradientKey[],
};

/**
 * Obtener degradados por categoría
 * @param category - Categoría de degradados
 * @returns Array de claves de degradados en esa categoría
 */
export const getGradientsByCategory = (
  category: keyof typeof gradientCategories
): GradientKey[] => {
  return gradientCategories[category];
};

/**
 * Configuración de degradados para diferentes variantes de componentes
 */
export const componentGradients = {
  button: {
    default: gradients.primary,
    secondary: gradients.secondary,
    destructive: gradients.danger,
    success: gradients.success,
    warning: gradients.warning,
  },
  card: {
    default: gradients.subtle,
    elevated: gradients.glass,
    warm: gradients.subtleWarm,
    cool: gradients.subtleCool,
  },
  header: {
    primary: gradients.primaryStatic,
    corporate: gradients.corporateBlue,
    modern: gradients.ocean,
  },
  background: {
    subtle: gradients.subtle,
    warm: gradients.subtleWarm,
    cool: gradients.subtleCool,
    corporate: gradients.corporateBlue,
  },
};

export type ComponentGradientCategory = keyof typeof componentGradients;
export type ComponentGradientVariant<T extends ComponentGradientCategory> =
  keyof (typeof componentGradients)[T];

/**
 * Obtener degradado para un componente específico
 * @param component - Tipo de componente
 * @param variant - Variante del componente
 * @returns Clases CSS del degradado
 */
export const getComponentGradient = <T extends ComponentGradientCategory>(
  component: T,
  variant: ComponentGradientVariant<T>
): string => {
  return componentGradients[component][variant] as string;
};

