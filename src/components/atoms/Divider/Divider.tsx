import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import { FiMinus, FiCircle, FiStar, FiHeart } from 'react-icons/fi';

interface DividerProps extends BaseProps {
  // Children para contenido personalizado
  children?: React.ReactNode;

  // Variantes visuales
  $variant?: 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient' | 'shadow';
  $orientation?: 'horizontal' | 'vertical';
  $thickness?: 'thin' | 'default' | 'thick' | 'thicker';
  $length?: 'auto' | 'short' | 'medium' | 'long' | 'full';
  $color?: 'default' | 'primary' | 'secondary' | 'accent' | 'muted' | 'custom';

  // Contenido en el divider
  text?: string;
  $textPosition?: 'left' | 'center' | 'right';
  $textVariant?: 'default' | 'bold' | 'muted' | 'colored' | 'uppercase';

  // Iconos
  icon?: React.ReactNode;
  $iconPosition?: 'left' | 'center' | 'right';
  $iconSize?: 'sm' | 'default' | 'lg';

  // Animaciones
  $animated?: boolean;
  $animationType?: 'fade' | 'slide' | 'pulse' | 'glow' | 'grow';

  // Spacing
  $margin?: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $padding?: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl';

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Personalización
  $custom?: string;
  $lineClassName?: string;
  $textClassName?: string;
  $iconClassName?: string;

  // Color personalizado
  $customColor?: string;
  $gradientFrom?: string;
  $gradientTo?: string;

  // Renderizado personalizado
  renderText?: (text: string) => React.ReactNode;
  renderIcon?: (icon: React.ReactNode) => React.ReactNode;

  // Props adicionales
  role?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
}

const dividerVariants = {
  container: {
    base: 'flex items-center justify-center',
    horizontal: 'w-full',
    vertical: 'h-full flex-col',

    margins: {
      none: '',
      xs: 'my-1',
      sm: 'my-2',
      default: 'my-4',
      lg: 'my-6',
      xl: 'my-8',
    },

    paddings: {
      none: '',
      xs: 'px-1',
      sm: 'px-2',
      default: 'px-4',
      lg: 'px-6',
      xl: 'px-8',
    },

    animations: {
      fade: 'transition-opacity duration-500 ease-in-out hover:opacity-75',
      slide: 'transition-transform duration-300 ease-in-out hover:scale-105',
      pulse: 'animate-pulse',
      glow: 'transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-current/20',
      grow: 'transition-all duration-200 ease-in-out hover:scale-y-110',
    },
  },

  line: {
    base: 'border-0 flex-shrink-0',

    // Orientación y longitud
    horizontal: {
      base: 'w-full h-px',
      lengths: {
        auto: 'flex-1',
        short: 'w-16',
        medium: 'w-32',
        long: 'w-64',
        full: 'w-full',
      },
    },

    vertical: {
      base: 'h-full w-px',
      lengths: {
        auto: 'flex-1',
        short: 'h-16',
        medium: 'h-32',
        long: 'h-64',
        full: 'h-full',
      },
    },

    // Grosor
    thickness: {
      thin: 'border-t border-current',
      default: 'border-t-2 border-current',
      thick: 'border-t-4 border-current',
      thicker: 'border-t-8 border-current',
    },

    thicknessVertical: {
      thin: 'border-l border-current',
      default: 'border-l-2 border-current',
      thick: 'border-l-4 border-current',
      thicker: 'border-l-8 border-current',
    },

    // Variantes
    variants: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      double: 'border-double',
      gradient:
        'bg-gradient-to-r from-transparent via-current to-transparent border-0',
      shadow: 'border-solid shadow-sm',
    },

    // Colores
    colors: {
      default: 'text-gray-300 border-gray-300',
      primary: 'text-blue-400 border-blue-400',
      secondary: 'text-green-400 border-green-400',
      accent: 'text-purple-400 border-purple-400',
      muted: 'text-gray-200 border-gray-200',
      custom: '', // Se aplicará color personalizado
    },
  },

  content: {
    base: 'flex items-center justify-center bg-white px-2 text-sm',

    textVariants: {
      default: 'text-gray-600 font-normal',
      bold: 'text-gray-800 font-semibold',
      muted: 'text-gray-400 font-light',
      colored: 'text-current font-medium',
      uppercase: 'text-gray-700 font-medium uppercase tracking-wider text-xs',
    },

    positions: {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    },

    iconSizes: {
      sm: 'w-3 h-3',
      default: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },

  withContent: {
    horizontal: 'relative',
    vertical: 'relative',
  },

  defaultVariants: {
    variant: 'solid' as const,
    orientation: 'horizontal' as const,
    thickness: 'default' as const,
    length: 'auto' as const,
    color: 'default' as const,
    textPosition: 'center' as const,
    textVariant: 'default' as const,
    iconPosition: 'center' as const,
    iconSize: 'default' as const,
    animationType: 'fade' as const,
    margin: 'default' as const,
    padding: 'default' as const,
  },
};

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      children,
      $variant = 'solid',
      $orientation = 'horizontal',
      $thickness = 'default',
      $length = 'auto',
      $color = 'default',
      text,
      $textPosition = 'center',
      $textVariant = 'default',
      icon,
      $iconPosition = 'center',
      $iconSize = 'default',
      $animated = false,
      $animationType = 'fade',
      $margin = 'default',
      $padding = 'default',
      $store,
      storeKey,
      $custom,
      $lineClassName,
      $textClassName,
      $iconClassName,
      $customColor,
      $gradientFrom,
      $gradientTo,
      renderText,
      renderIcon,
      role = 'separator',
      'aria-orientation': ariaOrientation,
      ...props
    },
    ref
  ) => {
    // Integración con store
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Determinar contenido final
    const finalText = storeValue?.text || text;
    const finalIcon = storeValue?.icon || icon;
    const hasContent = !!(finalText || finalIcon || children);

    // Clases para animaciones
    const animationClasses = $animated
      ? dividerVariants.container.animations[$animationType]
      : '';

    // Clases del contenedor principal
    const containerClasses = cn(
      dividerVariants.container.base,
      $orientation === 'horizontal'
        ? dividerVariants.container.horizontal
        : dividerVariants.container.vertical,
      dividerVariants.container.margins[$margin],
      dividerVariants.container.paddings[$padding],
      animationClasses,
      className,
      $custom
    );

    // Obtener color personalizado
    const getCustomColorStyle = React.useCallback(() => {
      const style: React.CSSProperties = {};

      if ($customColor) {
        style.color = $customColor;
        style.borderColor = $customColor;
      }

      if ($variant === 'gradient' && ($gradientFrom || $gradientTo)) {
        const from = $gradientFrom || 'transparent';
        const to = $gradientTo || 'transparent';
        style.backgroundImage = `linear-gradient(to right, ${from}, currentColor, ${to})`;
      }

      return Object.keys(style).length > 0 ? style : undefined;
    }, [$customColor, $variant, $gradientFrom, $gradientTo]);

    // Clases de la línea
    const getLineClasses = React.useCallback(() => {
      const baseClasses = [
        dividerVariants.line.base,
        dividerVariants.line.variants[$variant],
      ];

      // Orientación y longitud
      if ($orientation === 'horizontal') {
        baseClasses.push(
          dividerVariants.line.horizontal.base,
          dividerVariants.line.horizontal.lengths[$length]
        );
        baseClasses.push(dividerVariants.line.thickness[$thickness]);
      } else {
        baseClasses.push(
          dividerVariants.line.vertical.base,
          dividerVariants.line.vertical.lengths[$length]
        );
        baseClasses.push(dividerVariants.line.thicknessVertical[$thickness]);
      }

      // Color (solo si no es personalizado)
      if ($color !== 'custom') {
        baseClasses.push(dividerVariants.line.colors[$color]);
      }

      return cn(...baseClasses, $lineClassName);
    }, [$variant, $orientation, $length, $thickness, $color, $lineClassName]);

    // Renderizar contenido (texto/icono)
    const renderContent = React.useCallback(() => {
      if (!hasContent) return null;

      const contentClasses = cn(
        dividerVariants.content.base,
        dividerVariants.content.positions[
          $textPosition === 'left'
            ? 'left'
            : $textPosition === 'right'
              ? 'right'
              : 'center'
        ]
      );

      return (
        <div className={contentClasses}>
          {/* Icono */}
          {finalIcon && (
            <span
              className={cn(
                dividerVariants.content.iconSizes[$iconSize],
                'flex items-center justify-center',
                finalText ? 'mr-2' : '',
                $iconClassName
              )}>
              {renderIcon ? renderIcon(finalIcon) : finalIcon}
            </span>
          )}

          {/* Texto */}
          {finalText && (
            <span
              className={cn(
                dividerVariants.content.textVariants[$textVariant],
                $textClassName
              )}>
              {renderText ? renderText(finalText) : finalText}
            </span>
          )}

          {/* Children */}
          {children}
        </div>
      );
    }, [
      hasContent,
      finalIcon,
      finalText,
      children,
      $textPosition,
      $iconSize,
      $textVariant,
      $iconClassName,
      $textClassName,
      renderIcon,
      renderText,
    ]);

    // Si no hay contenido, renderizar línea simple
    if (!hasContent) {
      return (
        <div
          ref={ref}
          className={containerClasses}
          style={getCustomColorStyle()}
          role={role}
          aria-orientation={ariaOrientation || $orientation}
          {...props}>
          <hr className={getLineClasses()} />
        </div>
      );
    }

    // Si hay contenido, renderizar con diseño complejo
    if ($orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          className={containerClasses}
          style={getCustomColorStyle()}
          role={role}
          aria-orientation={ariaOrientation || $orientation}
          {...props}>
          {/* Línea izquierda */}
          <hr className={cn(getLineClasses(), 'flex-1')} />

          {/* Contenido central */}
          {renderContent()}

          {/* Línea derecha */}
          <hr className={cn(getLineClasses(), 'flex-1')} />
        </div>
      );
    }

    // Orientación vertical con contenido
    return (
      <div
        ref={ref}
        className={containerClasses}
        style={getCustomColorStyle()}
        role={role}
        aria-orientation={ariaOrientation || $orientation}
        {...props}>
        {/* Línea superior */}
        <hr className={cn(getLineClasses(), 'flex-1')} />

        {/* Contenido central */}
        {renderContent()}

        {/* Línea inferior */}
        <hr className={cn(getLineClasses(), 'flex-1')} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

// Componente de utilidad para casos de uso específicos
interface SeparatorProps extends BaseProps {
  items: (string | React.ReactNode)[];
  $separator?: React.ReactNode | string;
  $variant?: 'default' | 'pills' | 'breadcrumb' | 'navigation';
  $size?: 'sm' | 'default' | 'lg';
  onItemClick?: (item: string | React.ReactNode, index: number) => void;
  $itemClassName?: string;
  $separatorClassName?: string;
  renderItem?: (
    item: string | React.ReactNode,
    index: number
  ) => React.ReactNode;
}

const separatorVariants = {
  container: {
    base: 'flex items-center',
    variants: {
      default: 'space-x-2',
      pills: 'space-x-1',
      breadcrumb: 'space-x-1 text-sm',
      navigation: 'space-x-4',
    },
    sizes: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },

  item: {
    base: 'transition-colors duration-200',
    variants: {
      default: 'text-gray-700 hover:text-blue-600',
      pills:
        'px-2 py-1 rounded-md bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700',
      breadcrumb: 'text-gray-600 hover:text-blue-600 cursor-pointer',
      navigation: 'text-gray-800 hover:text-blue-600 font-medium',
    },
  },

  separator: {
    base: 'text-gray-400 select-none flex items-center',
    variants: {
      default: 'mx-2',
      pills: 'mx-1',
      breadcrumb: 'mx-1',
      navigation: 'mx-4',
    },
  },
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      items,
      $separator = '•',
      $variant = 'default',
      $size = 'default',
      onItemClick,
      $itemClassName,
      $separatorClassName,
      renderItem,
      ...props
    },
    ref
  ) => {
    const handleItemClick = React.useCallback(
      (item: string | React.ReactNode, index: number) => {
        onItemClick?.(item, index);
      },
      [onItemClick]
    );

    const containerClasses = cn(
      separatorVariants.container.base,
      separatorVariants.container.variants[$variant],
      separatorVariants.container.sizes[$size],
      className
    );

    const separatorClasses = cn(
      separatorVariants.separator.base,
      separatorVariants.separator.variants[$variant],
      $separatorClassName
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Item */}
            <span
              className={cn(
                separatorVariants.item.base,
                separatorVariants.item.variants[$variant],
                onItemClick && 'cursor-pointer',
                $itemClassName
              )}
              onClick={() => onItemClick && handleItemClick(item, index)}>
              {renderItem ? renderItem(item, index) : item}
            </span>

            {/* Separador (no en el último item) */}
            {index < items.length - 1 && (
              <span className={separatorClasses}>{$separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

Separator.displayName = 'Separator';

export { Divider, Separator, type DividerProps, type SeparatorProps };

