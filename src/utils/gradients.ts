/**
 * 🎨 Ultra-Modern Pastel Gradients - Tailwind Next Library
 *
 * Sistema de gradientes pasteles suaves y elegantes
 * Organizados por familias de colores y casos de uso
 * Prioriza la sutileza y la armonía visual
 */

// 🌸 Gradientes Pasteles Principales
const pastelGradients = {
  // Familia Lavanda - Tonos púrpuras suaves
  'lavender-dream':
    'bg-gradient-to-br from-purple-100 via-violet-50 to-indigo-100',
  'lavender-mist': 'bg-gradient-to-r from-purple-50 to-violet-100',
  'lavender-whisper':
    'bg-gradient-to-bl from-indigo-50 via-purple-50 to-pink-50',

  // Familia Mint - Verdes frescos y suaves
  'mint-breeze': 'bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100',
  'mint-whisper': 'bg-gradient-to-r from-green-50 to-emerald-100',
  'mint-fresh': 'bg-gradient-to-bl from-teal-50 via-green-50 to-lime-50',

  // Familia Peach - Naranjas y rosas cálidos
  'peach-glow': 'bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100',
  'peach-soft': 'bg-gradient-to-r from-orange-50 to-pink-100',
  'peach-blush': 'bg-gradient-to-bl from-rose-50 via-orange-50 to-amber-50',

  // Familia Rose - Rosas delicados
  'rose-quartz': 'bg-gradient-to-br from-pink-100 via-rose-50 to-red-100',
  'rose-blush': 'bg-gradient-to-r from-pink-50 to-rose-100',
  'rose-petal': 'bg-gradient-to-bl from-red-50 via-pink-50 to-purple-50',

  // Familia Sky - Azules celestiales
  'sky-serene': 'bg-gradient-to-br from-blue-100 via-sky-50 to-cyan-100',
  'sky-whisper': 'bg-gradient-to-r from-blue-50 to-sky-100',
  'sky-dream': 'bg-gradient-to-bl from-cyan-50 via-blue-50 to-indigo-50',
} as const;

// 🌅 Gradientes de Transición Suave (hora del día)
const timeGradients = {
  'dawn-soft': 'bg-gradient-to-r from-rose-100 via-orange-50 to-yellow-100',
  'morning-mist': 'bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-100',
  'noon-gentle': 'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-100',
  'dusk-pastel': 'bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100',
  'twilight-soft': 'bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100',
  'midnight-whisper':
    'bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100',
} as const;

// 🌿 Gradientes Naturales Pasteles
const natureGradients = {
  'meadow-gentle': 'bg-gradient-to-br from-green-100 via-lime-50 to-yellow-100',
  'ocean-calm': 'bg-gradient-to-r from-teal-100 via-cyan-50 to-blue-100',
  'forest-whisper':
    'bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100',
  'desert-soft': 'bg-gradient-to-r from-amber-100 via-orange-50 to-red-100',
  'arctic-mist': 'bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-100',
  'sunset-valley': 'bg-gradient-to-r from-orange-100 via-red-50 to-purple-100',
} as const;

// 🎨 Gradientes Ultra-Sutiles para Fondos
const subtleGradients = {
  'cloud-whisper': 'bg-gradient-to-br from-gray-50 to-slate-100',
  'pearl-mist': 'bg-gradient-to-r from-stone-50 to-zinc-100',
  'silk-veil': 'bg-gradient-to-br from-neutral-50 to-gray-100',
  'crystal-fog': 'bg-gradient-to-r from-slate-50 to-stone-100',
  'paper-soft': 'bg-gradient-to-br from-white to-gray-50',
  'cream-gentle': 'bg-gradient-to-r from-amber-25 to-orange-50',
} as const;

// 💎 Gradientes Premium con Efectos
const premiumGradients = {
  'rainbow-pastel':
    'bg-gradient-to-r from-red-100 via-yellow-100 via-green-100 via-blue-100 to-purple-100',
  'cosmic-gentle':
    'bg-gradient-to-br from-purple-100 via-pink-100 via-blue-100 to-cyan-100',
  'aurora-soft':
    'bg-gradient-to-r from-green-100 via-blue-100 via-purple-100 to-pink-100',
  'prism-light':
    'bg-gradient-to-br from-red-50 via-orange-50 via-yellow-50 via-green-50 via-blue-50 via-indigo-50 to-purple-50',
  'galaxy-whisper':
    'bg-gradient-to-r from-indigo-100 via-purple-100 via-pink-100 to-rose-100',
  'unicorn-dream':
    'bg-gradient-to-br from-pink-100 via-purple-100 via-blue-100 to-cyan-100',
} as const;

// 🎯 Gradientes para Estados de Componentes
const stateGradients = {
  // Estados principales con versiones pastel
  'primary-soft':
    'bg-gradient-to-r from-purple-100 to-indigo-200 hover:from-purple-200 hover:to-indigo-300',
  'secondary-soft':
    'bg-gradient-to-r from-teal-100 to-cyan-200 hover:from-teal-200 hover:to-cyan-300',
  'success-soft':
    'bg-gradient-to-r from-emerald-100 to-green-200 hover:from-emerald-200 hover:to-green-300',
  'warning-soft':
    'bg-gradient-to-r from-amber-100 to-orange-200 hover:from-amber-200 hover:to-orange-300',
  'destructive-soft':
    'bg-gradient-to-r from-red-100 to-pink-200 hover:from-red-200 hover:to-pink-300',
  'info-soft':
    'bg-gradient-to-r from-sky-100 to-blue-200 hover:from-sky-200 hover:to-blue-300',

  // Estados sin hover para elementos estáticos
  'primary-static': 'bg-gradient-to-r from-purple-100 to-indigo-200',
  'secondary-static': 'bg-gradient-to-r from-teal-100 to-cyan-200',
  'success-static': 'bg-gradient-to-r from-emerald-100 to-green-200',
  'warning-static': 'bg-gradient-to-r from-amber-100 to-orange-200',
  'destructive-static': 'bg-gradient-to-r from-red-100 to-pink-200',
  'info-static': 'bg-gradient-to-r from-sky-100 to-blue-200',
} as const;

// 🌊 Gradientes con Efectos Especiales
const effectGradients = {
  'glass-soft': 'bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm',
  'glass-tinted':
    'bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-md',
  'shimmer-light':
    'bg-gradient-to-r from-transparent via-white/20 to-transparent',
  'shimmer-color':
    'bg-gradient-to-r from-transparent via-purple-200/30 to-transparent',
  'glow-soft':
    'bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg shadow-purple-200/50',
  'neon-pastel':
    'bg-gradient-to-r from-cyan-100 to-purple-100 shadow-lg shadow-cyan-200/30',
} as const;

// 🎭 Todas las categorías combinadas
export const gradients = {
  ...pastelGradients,
  ...timeGradients,
  ...natureGradients,
  ...subtleGradients,
  ...premiumGradients,
  ...stateGradients,
  ...effectGradients,
} as const;

export type GradientKey = keyof typeof gradients;

// 📂 Categorías organizadas para fácil acceso
export const gradientCategories = {
  pastel: pastelGradients,
  time: timeGradients,
  nature: natureGradients,
  subtle: subtleGradients,
  premium: premiumGradients,
  states: stateGradients,
  effects: effectGradients,
} as const;

export type GradientCategory = keyof typeof gradientCategories;

// Lista cache para random
const _gradientKeys: GradientKey[] = Object.keys(gradients) as GradientKey[];

/**
 * 🎨 Hook para obtener un degradado por clave
 */
export const useGradient = () => {
  const getGradient = (key: GradientKey): string => {
    return gradients[key];
  };

  const getRandomGradient = (options?: {
    category?: GradientCategory;
    exclude?: GradientKey[];
  }): { key: GradientKey; classes: string } => {
    let pool = _gradientKeys;

    if (options?.category) {
      pool = Object.keys(gradientCategories[options.category]) as GradientKey[];
    }

    if (options?.exclude?.length) {
      const excludeSet = new Set(options.exclude);
      pool = pool.filter((k) => !excludeSet.has(k));
    }

    const key =
      pool[Math.floor(Math.random() * pool.length)] || _gradientKeys[0];
    return { key, classes: gradients[key] };
  };

  const getGradientsByCategory = (
    category: GradientCategory
  ): GradientKey[] => {
    return Object.keys(gradientCategories[category]) as GradientKey[];
  };

  return {
    getGradient,
    getRandomGradient,
    getGradientsByCategory,
  };
};

/**
 * 🔧 Función para combinar degradado con clases adicionales
 */
export const getGradientClasses = (
  key: GradientKey,
  additionalClasses = ''
): string => {
  return `${gradients[key]} ${additionalClasses}`.trim();
};

/**
 * 🎨 Degradados direccionales personalizables con colores pasteles
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
 * 🧪 Verificar si una clave de degradado existe
 */
export const isValidGradientKey = (key: string): key is GradientKey => {
  return key in gradients;
};

/**
 * 📋 Obtener todas las claves de degradados disponibles
 */
export const getAvailableGradients = (): GradientKey[] => {
  return Object.keys(gradients) as GradientKey[];
};

/**
 * 🎯 Configuración de degradados para diferentes componentes
 */
export const componentGradients = {
  button: {
    default: gradients['primary-soft'],
    secondary: gradients['secondary-soft'],
    destructive: gradients['destructive-soft'],
    success: gradients['success-soft'],
    warning: gradients['warning-soft'],
    ghost: gradients['cloud-whisper'],
    outline: gradients['silk-veil'],
  },
  card: {
    default: gradients['cloud-whisper'],
    elevated: gradients['glass-soft'],
    warm: gradients['peach-soft'],
    cool: gradients['sky-whisper'],
    elegant: gradients['lavender-mist'],
  },
  background: {
    subtle: gradients['paper-soft'],
    warm: gradients['dawn-soft'],
    cool: gradients['sky-serene'],
    nature: gradients['meadow-gentle'],
    premium: gradients['cosmic-gentle'],
  },
  header: {
    primary: gradients['primary-static'],
    elegant: gradients['lavender-dream'],
    modern: gradients['sky-serene'],
    warm: gradients['peach-glow'],
  },
  overlay: {
    light: gradients['glass-soft'],
    tinted: gradients['glass-tinted'],
    shimmer: gradients['shimmer-light'],
  },
} as const;

export type ComponentGradientCategory = keyof typeof componentGradients;
export type ComponentGradientVariant<T extends ComponentGradientCategory> =
  keyof (typeof componentGradients)[T];

/**
 * 🎯 Obtener degradado para un componente específico
 */
export const getComponentGradient = <T extends ComponentGradientCategory>(
  component: T,
  variant: ComponentGradientVariant<T>
): string => {
  return componentGradients[component][variant] as string;
};

/**
 * 🎨 Gradientes temáticos especiales
 */
export const thematicGradients = {
  // Estaciones del año
  spring: gradients['meadow-gentle'],
  summer: gradients['dawn-soft'],
  autumn: gradients['peach-glow'],
  winter: gradients['arctic-mist'],

  // Emociones
  calm: gradients['sky-whisper'],
  joy: gradients['dawn-soft'],
  serenity: gradients['mint-whisper'],
  elegance: gradients['lavender-dream'],
  warmth: gradients['peach-soft'],

  // Usos específicos
  hero: gradients['cosmic-gentle'],
  feature: gradients['aurora-soft'],
  testimonial: gradients['pearl-mist'],
  pricing: gradients['galaxy-whisper'],
  footer: gradients['twilight-soft'],
} as const;

export type ThematicGradient = keyof typeof thematicGradients;

/**
 * 🌟 Obtener degradado temático
 */
export const getThematicGradient = (theme: ThematicGradient): string => {
  return thematicGradients[theme];
};
