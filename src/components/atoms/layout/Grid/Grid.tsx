import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface GridProps extends BaseProps {
  children?: React.ReactNode;
  $columns?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto' | string; // Número de columnas o 'auto' para auto-fit
  $maxGridWidth?: string; // Ancho máximo del grid (por defecto '1200px')
  $maxItemWidth?: string; // Ancho máximo para cada hijo (por defecto sin límite)
  $gap?: string; // Espaciado entre celdas (por defecto '1rem')
  $justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'; // Alineación horizontal
  $alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; // Alineación vertical
  $zIndex?: string | number; // z-index del grid
  $isShadow?: boolean; // Habilitar sombra por defecto
  $custom?: string;
}

const gridVariants = {
  base: 'grid transition-all duration-200',
  columns: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    auto: 'grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(min(230px,80%),0.9fr))]',
  },
  justifyContent: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  },
  alignItems: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
};

// Función helper para detectar si es clase Tailwind o valor CSS
const isValidTailwindClass = (value: string): boolean => {
  return (
    value.startsWith('gap-') ||
    value.startsWith('z-') ||
    value.includes('max-w-') ||
    /^(w-|h-|p-|m-|text-|bg-|border-)/.test(value)
  );
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      $columns = 'auto',
      $maxGridWidth = '1200px',
      $maxItemWidth,
      $gap = '1rem',
      $justifyContent = 'center',
      $alignItems = 'start',
      $zIndex,
      $isShadow = false,
      $custom,
      ...props
    },
    ref
  ) => {
    // Función para obtener las clases de columnas
    const getColumnsClass = (): string => {
      if (typeof $columns === 'string') {
        if ($columns === 'auto') {
          return gridVariants.columns.auto;
        }
        // Si es un string custom, devolverlo tal como está
        return $columns;
      }
      // Si es un número, usar las variantes predefinidas
      return (
        gridVariants.columns[$columns as keyof typeof gridVariants.columns] ||
        gridVariants.columns.auto
      );
    };

    // Construir estilos dinámicos
    const dynamicStyles: React.CSSProperties & { [key: string]: any } = {};

    // Manejo del ancho máximo del grid
    if ($maxGridWidth && !isValidTailwindClass($maxGridWidth)) {
      dynamicStyles.maxWidth = $maxGridWidth;
    }

    // Manejo del gap
    if ($gap && !isValidTailwindClass($gap)) {
      dynamicStyles.gap = $gap;
    }

    // Manejo del z-index
    if ($zIndex && !isValidTailwindClass($zIndex.toString())) {
      dynamicStyles.zIndex = $zIndex;
    }

    // Clases base del grid
    const gridClasses = cn(
      gridVariants.base,
      // Aplicar columnas según la prop $columns
      getColumnsClass(),

      // Aplicar clases Tailwind si son válidas
      isValidTailwindClass($gap) ? $gap : '',
      isValidTailwindClass($maxGridWidth) ? $maxGridWidth : 'mx-auto',
      isValidTailwindClass($zIndex?.toString() || '') ? `z-${$zIndex}` : '',

      // Alineaciones
      gridVariants.justifyContent[$justifyContent],
      gridVariants.alignItems[$alignItems],

      // Shadow condicional
      $isShadow ? 'shadow-sm' : '',

      className,
      $custom
    );

    return (
      <>
        {/* Inyectar estilos CSS para características avanzadas */}
        {$maxItemWidth && !isValidTailwindClass($maxItemWidth) && (
          <style>
            {`
              .grid-max-item-width > * {
                max-width: ${$maxItemWidth};
              }
            `}
          </style>
        )}

        <div
          ref={ref}
          className={cn(
            gridClasses,
            $maxItemWidth && !isValidTailwindClass($maxItemWidth)
              ? 'grid-max-item-width'
              : ''
          )}
          style={
            Object.keys(dynamicStyles).length > 0 ? dynamicStyles : undefined
          }
          {...props}>
          {children}
        </div>
      </>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid, type GridProps };
