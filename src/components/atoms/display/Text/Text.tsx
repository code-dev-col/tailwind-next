import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'small'
  | 'strong'
  | 'em';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type TextWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

type TextColorScheme =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'accent'
  | 'muted'
  | 'minimal'
  | 'custom';

interface TextProps<T extends Record<string, any> = any> extends BaseProps {
  // $colorScheme system
  $colorScheme?: TextColorScheme;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Size and typography
  $size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  $customSize?: number; // Tamaño en rem
  $dynamicSize?: boolean; // Habilita clamp para responsive
  $weight?: TextWeight;
  $align?: TextAlign;
  $transform?: TextTransform;
  $textShadow?: 'none' | 'sm' | 'md' | 'lg' | 'colored';
  $color?: string; // Color personalizado
  $lineHeight?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  $letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  $gradient?: boolean; // Para texto con gradiente
  $truncate?: boolean; // Truncar texto con ellipsis
  $clampLines?: number; // Número de líneas para clamp
  $custom?: string;
  as?: TextElement;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Color schemes using theme.css variables
const colorSchemes = {
  default: {
    text: 'text-foreground',
    textSecondary: 'text-foreground/90',
    textMuted: 'text-foreground/70',
  },
  secondary: {
    text: 'text-secondary',
    textSecondary: 'text-secondary/90',
    textMuted: 'text-secondary/70',
  },
  destructive: {
    text: 'text-destructive',
    textSecondary: 'text-destructive/90',
    textMuted: 'text-destructive/70',
  },
  accent: {
    text: 'text-accent-foreground',
    textSecondary: 'text-accent-foreground/90',
    textMuted: 'text-accent-foreground/70',
  },
  muted: {
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/90',
    textMuted: 'text-muted-foreground/70',
  },
  minimal: {
    text: 'text-foreground/80',
    textSecondary: 'text-foreground/60',
    textMuted: 'text-foreground/40',
  },
  custom: {
    text: '',
    textSecondary: '',
    textMuted: '',
  },
};

const textVariants = {
  base: 'transition-colors duration-200',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    textShadow: {
      none: '',
      sm: 'drop-shadow-sm',
      md: 'drop-shadow-md',
      lg: 'drop-shadow-lg',
      colored: 'drop-shadow-lg',
    },
    lineHeight: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    letterSpacing: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    align: 'left',
    transform: 'none',
    textShadow: 'none',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
};

// Función para generar clamp responsivo
const generateClampSize = (size: string) => {
  const clampMap = {
    xs: 'clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)', // 10px-12px
    sm: 'clamp(0.75rem, 0.625rem + 0.5vw, 0.875rem)', // 12px-14px
    base: 'clamp(0.875rem, 0.75rem + 0.5vw, 1rem)', // 14px-16px
    lg: 'clamp(1rem, 0.875rem + 0.5vw, 1.125rem)', // 16px-18px
    xl: 'clamp(1.125rem, 1rem + 0.75vw, 1.25rem)', // 18px-20px
    '2xl': 'clamp(1.25rem, 1.125rem + 1vw, 1.5rem)', // 20px-24px
    '3xl': 'clamp(1.5rem, 1.25rem + 1.5vw, 1.875rem)', // 24px-30px
    '4xl': 'clamp(1.875rem, 1.5rem + 2vw, 2.25rem)', // 30px-36px
    '5xl': 'clamp(2.25rem, 1.875rem + 2.5vw, 3rem)', // 36px-48px
    '6xl': 'clamp(3rem, 2.25rem + 3vw, 3.75rem)', // 48px-60px
  };
  return clampMap[size as keyof typeof clampMap] || clampMap.base;
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $store,
      storeKey,
      $size,
      $customSize,
      $dynamicSize = false,
      $weight,
      $align,
      $transform,
      $textShadow,
      $color,
      $lineHeight,
      $letterSpacing,
      $gradient = false,
      $truncate = false,
      $clampLines,
      $custom,
      as = 'p',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const currentSize = $size || 'base';

    // Store integration - get content from store if available
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Use store value as children if available, otherwise use children prop
    const finalChildren = storeValue || children;

    // Get color scheme classes
    const colorSchemeClasses = colorSchemes[$colorScheme];

    // Generar estilos dinámicos
    const dynamicStyles: React.CSSProperties = {
      ...style,
    };

    // Tamaño personalizado en rem
    if ($customSize) {
      dynamicStyles.fontSize = `${$customSize}rem`;
    }

    // Tamaño dinámico con clamp
    if ($dynamicSize && !$customSize) {
      dynamicStyles.fontSize = generateClampSize(currentSize);
    }

    // Color personalizado
    if ($color) {
      dynamicStyles.color = $color;
    }

    // Text shadow colored personalizado
    if ($textShadow === 'colored' && $color) {
      dynamicStyles.filter = `drop-shadow(2px 2px 4px ${$color}40)`;
    }

    // Clamp de líneas
    if ($clampLines && $clampLines > 0) {
      dynamicStyles.display = '-webkit-box';
      dynamicStyles.WebkitLineClamp = $clampLines;
      dynamicStyles.WebkitBoxOrient = 'vertical';
      dynamicStyles.overflow = 'hidden';
    }

    return (
      <Component
        className={cn(
          textVariants.base,
          // Use color scheme classes instead of legacy variant
          !$color && colorSchemeClasses.text,
          // Solo aplicar tamaño de Tailwind si no hay customSize o dynamicSize
          !$customSize &&
            !$dynamicSize &&
            textVariants.variants.size[currentSize],
          textVariants.variants.weight[$weight || 'normal'],
          textVariants.variants.align[$align || 'left'],
          textVariants.variants.transform[$transform || 'none'],
          textVariants.variants.textShadow[$textShadow || 'none'],
          textVariants.variants.lineHeight[$lineHeight || 'normal'],
          textVariants.variants.letterSpacing[$letterSpacing || 'normal'],
          $gradient && 'bg-clip-text text-transparent',
          $truncate && 'truncate',
          className,
          $custom
        )}
        style={dynamicStyles}
        ref={ref as any}
        {...props}>
        {finalChildren}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export {
  Text,
  type TextProps,
  type TextElement,
  type TextAlign,
  type TextWeight,
  type TextTransform,
};

