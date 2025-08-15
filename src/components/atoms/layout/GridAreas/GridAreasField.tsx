import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface GridAreasFieldProps extends BaseProps {
  $area: string; // Grid area name (obligatorio)
  $width?: string;
  $height?: string;
  $fontSize?: string;
  $color?: string;
  $backgroundColor?: string;
  $padding?: string;
  $margin?: string;
  $borderColor?: string;
  $borderWidth?: string;
  $borderRadius?: string;
  $borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  $textAlign?: TextAlign;
  $custom?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const gridAreasFieldVariants = {
  base: 'box-border',
  textAlign: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },
  borderStyle: {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
    none: 'border-none',
  },
};

const GridAreasField: React.FC<GridAreasFieldProps> = ({
  className,
  $area,
  $width,
  $height,
  $fontSize,
  $color,
  $backgroundColor,
  $padding,
  $margin,
  $borderColor,
  $borderWidth,
  $borderRadius,
  $borderStyle = 'none',
  $textAlign = 'left',
  $custom,
  style,
  children,
  ...props
}) => {
  // Build dynamic styles for custom values
  const dynamicStyles: React.CSSProperties = {
    ...style,
    gridArea: $area, // Este es obligatorio y siempre va en style
  };

  // Handle custom values that can't be expressed as Tailwind classes
  if ($width && !$width.includes('w-')) dynamicStyles.width = $width;
  if ($height && !$height.includes('h-')) dynamicStyles.height = $height;
  if ($fontSize && !$fontSize.includes('text-'))
    dynamicStyles.fontSize = $fontSize;
  if ($color && !$color.includes('text-')) dynamicStyles.color = $color;
  if ($backgroundColor && !$backgroundColor.includes('bg-'))
    dynamicStyles.backgroundColor = $backgroundColor;
  if (
    $padding &&
    !$padding.includes('p-') &&
    !$padding.includes('px-') &&
    !$padding.includes('py-')
  ) {
    dynamicStyles.padding = $padding;
  }
  if (
    $margin &&
    !$margin.includes('m-') &&
    !$margin.includes('mx-') &&
    !$margin.includes('my-')
  ) {
    dynamicStyles.margin = $margin;
  }
  if ($borderColor && !$borderColor.includes('border-'))
    dynamicStyles.borderColor = $borderColor;
  if ($borderWidth && !$borderWidth.includes('border-'))
    dynamicStyles.borderWidth = $borderWidth;
  if ($borderRadius && !$borderRadius.includes('rounded'))
    dynamicStyles.borderRadius = $borderRadius;

  // Build className
  const classes = [
    gridAreasFieldVariants.base,
    gridAreasFieldVariants.textAlign[$textAlign],
    gridAreasFieldVariants.borderStyle[$borderStyle],
    // Tailwind classes
    $width && $width.includes('w-') && $width,
    $height && $height.includes('h-') && $height,
    $fontSize && $fontSize.includes('text-') && $fontSize,
    $color && $color.includes('text-') && $color,
    $backgroundColor && $backgroundColor.includes('bg-') && $backgroundColor,
    $padding && $padding.includes('p') && $padding,
    $margin && $margin.includes('m') && $margin,
    $borderColor && $borderColor.includes('border-') && $borderColor,
    $borderWidth && $borderWidth.includes('border-') && $borderWidth,
    $borderRadius && $borderRadius.includes('rounded') && $borderRadius,
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

GridAreasField.displayName = 'GridAreasField';

export {
  GridAreasField,
  type GridAreasFieldProps,
  type TextAlign as GridAreasFieldTextAlign,
};

