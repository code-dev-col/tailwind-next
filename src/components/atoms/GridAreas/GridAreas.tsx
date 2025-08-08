import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

interface GridAreasProps extends BaseProps {
  // Layout para pantallas > 64rem (obligatorio)
  $areasLg: string;
  // Layout para pantallas entre 42rem y 63.99rem (opcional)
  $areasMd?: string;
  // Layout para pantallas < 42rem (opcional)
  $areasSm?: string;
  // Opcional, para definir columnas específicas; si no se define se usa una fórmula responsive
  $columns?: string;
  // Opcional, para definir filas específicas
  $rows?: string;
  // Espaciado entre celdas (default: 1rem)
  $gap?: string;
  // Alineación horizontal (default: center)
  $justifyContent?: JustifyContent;
  // Alineación vertical (default: start)
  $alignItems?: AlignItems;
  // Custom styles override
  $custom?: string;
  // HTML attributes
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const gridAreasVariants = {
  base: 'grid',
  justifyContent: {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
    stretch: 'justify-stretch',
  },
  alignItems: {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  },
};

const GridAreas: React.FC<GridAreasProps> = ({
  className,
  $areasLg,
  $areasMd,
  $areasSm,
  $columns,
  $rows,
  $gap = '1rem',
  $justifyContent = 'center',
  $alignItems = 'start',
  $custom,
  style,
  children,
  ...props
}) => {
  // Build dynamic styles for grid areas (CSS Grid areas need custom CSS)
  const dynamicStyles: React.CSSProperties = {
    ...style,
    gap: $gap && !$gap.includes('gap-') ? $gap : undefined,
    gridTemplateColumns: $columns || 'repeat(auto-fit, minmax(230px, 1fr))',
    gridTemplateRows: $rows || 'auto',
  };

  // Media queries need to be handled via CSS custom properties or inline styles
  // For large screens (> 64rem / 1024px)
  if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
    dynamicStyles.gridTemplateAreas = $areasLg;
  }
  // For medium screens (42rem to 63.99rem / 672px to 1023px)
  else if (
    typeof window !== 'undefined' &&
    window.innerWidth >= 672 &&
    window.innerWidth <= 1023
  ) {
    dynamicStyles.gridTemplateAreas = $areasMd || $areasLg;
  }
  // For small screens (< 42rem / 672px)
  else if (typeof window !== 'undefined' && window.innerWidth < 672) {
    dynamicStyles.gridTemplateAreas = $areasSm || $areasMd || $areasLg;
  }
  // Server-side rendering fallback
  else {
    dynamicStyles.gridTemplateAreas = $areasLg;
  }

  // Build className
  const classes = [
    gridAreasVariants.base,
    gridAreasVariants.justifyContent[$justifyContent],
    gridAreasVariants.alignItems[$alignItems],
    $gap && $gap.includes('gap-') && $gap,
    className,
    $custom,
  ];

  return (
    <div
      className={cn(classes.filter(Boolean))}
      style={dynamicStyles}
      {...props}>
      {children}
    </div>
  );
};

GridAreas.displayName = 'GridAreas';

export {
  GridAreas,
  type GridAreasProps,
  type JustifyContent as GridJustifyContent,
  type AlignItems as GridAlignItems,
};

