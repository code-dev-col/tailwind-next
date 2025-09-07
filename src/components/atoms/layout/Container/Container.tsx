import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type DisplayType =
  | 'block'
  | 'inline-block'
  | 'inline'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none'
  | 'contents';
type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap';
type OverflowType = 'visible' | 'hidden' | 'scroll' | 'auto';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type CursorType =
  | 'default'
  | 'pointer'
  | 'not-allowed'
  | 'help'
  | 'wait'
  | 'text'
  | 'move'
  | 'grab'
  | 'grabbing';

interface ContainerProps extends BaseProps {
  // Layout & Position
  $position?: PositionType;
  $display?: DisplayType;
  $float?: 'left' | 'right' | 'none';

  // Flex properties
  $flexDirection?: FlexDirection;
  $justifyContent?: JustifyContent;
  $alignItems?: AlignItems;
  $flexWrap?: FlexWrap;
  $gap?: string;

  // Spacing
  $margin?: string;
  $padding?: string;

  // Dimensions
  $width?: string;
  $height?: string;
  $minWidth?: string;
  $maxWidth?: string;
  $minHeight?: string;
  $maxHeight?: string;

  // Background & Colors
  $backgroundColor?: string;
  $backgroundGradient?: string;
  $color?: string;

  // Border
  $borderRadius?: string;
  $borderColor?: string;
  $borderWidth?: string;
  $borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

  // Visual effects
  $boxShadow?: string;
  $isShadow?: boolean; // Nuevo prop para habilitar shadow por defecto
  $opacity?: number;
  $transform?: string;
  $filter?: string;

  // Overflow & Positioning
  $overflow?: OverflowType;
  $overflowX?: OverflowType;
  $overflowY?: OverflowType;
  $zIndex?: number;

  // Positioning coordinates
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
  $inset?: string;

  // Text & Cursor
  $textAlign?: TextAlign;
  $cursor?: CursorType;

  // Advanced
  $transition?: string;
  $animation?: string;
  $backdropBlur?: string;

  // Custom
  $custom?: string;

  // HTML attributes
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  children?: React.ReactNode;

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  // Accessibility props
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-haspopup'?:
    | boolean
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog';
  'aria-level'?: number;
  'aria-posinset'?: number;
  'aria-setsize'?: number;
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;

  // Additional HTML attributes for accessibility
  tabIndex?: number;
  id?: string;
  title?: string;
  lang?: string;
}

const containerVariants = {
  base: 'box-border', // Base styling
  position: {
    static: 'static',
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  },
  display: {
    block: 'block',
    'inline-block': 'inline-block',
    inline: 'inline',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    grid: 'grid',
    'inline-grid': 'inline-grid',
    none: 'hidden',
    contents: 'contents',
  },
  float: {
    left: 'float-left',
    right: 'float-right',
    none: 'float-none',
  },
  flexDirection: {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse',
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
  flexWrap: {
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
    nowrap: 'flex-nowrap',
  },
  overflow: {
    visible: 'overflow-visible',
    hidden: 'overflow-hidden',
    scroll: 'overflow-scroll',
    auto: 'overflow-auto',
  },
  overflowX: {
    visible: 'overflow-x-visible',
    hidden: 'overflow-x-hidden',
    scroll: 'overflow-x-scroll',
    auto: 'overflow-x-auto',
  },
  overflowY: {
    visible: 'overflow-y-visible',
    hidden: 'overflow-y-hidden',
    scroll: 'overflow-y-scroll',
    auto: 'overflow-y-auto',
  },
  textAlign: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },
  cursor: {
    default: 'cursor-default',
    pointer: 'cursor-pointer',
    'not-allowed': 'cursor-not-allowed',
    help: 'cursor-help',
    wait: 'cursor-wait',
    text: 'cursor-text',
    move: 'cursor-move',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing',
  },
  borderStyle: {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
    none: 'border-none',
  },
};

// Helper function to handle custom values vs Tailwind classes
const processValue = (
  value: string | undefined,
  prefix: string = ''
): string => {
  if (!value) return '';

  // If it looks like a Tailwind class (contains prefix), use it as-is
  if (value.includes(prefix) || value.includes('-')) {
    return value;
  }

  // Otherwise, treat as custom value and return empty (will be handled via style prop)
  return '';
};

// Helper function to build className string
const buildClassName = (props: ContainerProps): string => {
  const {
    className,
    $position = 'static',
    $display = 'block',
    $float,
    $flexDirection,
    $justifyContent,
    $alignItems,
    $flexWrap,
    $gap,
    $margin,
    $padding,
    $width,
    $height,
    $maxWidth,
    $backgroundColor,
    $backgroundGradient,
    $color,
    $borderRadius,
    $borderColor,
    $borderWidth,
    $borderStyle = 'solid',
    $boxShadow,
    $isShadow = false, // Por defecto sin shadow
    $opacity,
    $overflow,
    $overflowX,
    $overflowY,
    $textAlign,
    $cursor,
    $transition,
    $animation,
    $backdropBlur,
    $custom,
  } = props;

  const classes: string[] = [];

  // Base classes
  classes.push(containerVariants.base);
  classes.push(containerVariants.position[$position]);
  classes.push(containerVariants.display[$display]);

  // Conditional classes
  if ($float) classes.push(containerVariants.float[$float]);
  if ($display === 'flex' || $display === 'inline-flex') {
    if ($flexDirection)
      classes.push(containerVariants.flexDirection[$flexDirection]);
    if ($justifyContent)
      classes.push(containerVariants.justifyContent[$justifyContent]);
    if ($alignItems) classes.push(containerVariants.alignItems[$alignItems]);
    if ($flexWrap) classes.push(containerVariants.flexWrap[$flexWrap]);
  }
  if ($margin && $margin.includes('m')) classes.push($margin);
  if ($padding && $padding.includes('p')) classes.push($padding);
  if ($gap && $gap.includes('gap-')) classes.push($gap);
  if ($width && $width.includes('w-')) classes.push($width);
  if ($height && $height.includes('h-')) classes.push($height);
  if ($maxWidth && $maxWidth.includes('max-w-')) classes.push($maxWidth);
  if ($backgroundColor && $backgroundColor.includes('bg-'))
    classes.push($backgroundColor);
  if ($backgroundGradient) classes.push($backgroundGradient);
  if ($color && $color.includes('text-')) classes.push($color);
  if ($borderRadius && $borderRadius.includes('rounded'))
    classes.push($borderRadius);
  if ($borderColor && $borderColor.includes('border-'))
    classes.push($borderColor);
  if ($borderWidth && $borderWidth.includes('border-'))
    classes.push($borderWidth);
  classes.push(containerVariants.borderStyle[$borderStyle]);

  // Shadow logic: $boxShadow tiene prioridad sobre $isShadow
  if ($boxShadow && $boxShadow.includes('shadow')) {
    classes.push($boxShadow);
  } else if ($isShadow) {
    classes.push('shadow-sm'); // Shadow por defecto según las instrucciones
  }

  if ($opacity !== undefined) classes.push(`opacity-${$opacity}`);
  if ($overflow) classes.push(containerVariants.overflow[$overflow]);
  if ($overflowX) classes.push(containerVariants.overflowX[$overflowX]);
  if ($overflowY) classes.push(containerVariants.overflowY[$overflowY]);
  if ($textAlign) classes.push(containerVariants.textAlign[$textAlign]);
  if ($cursor) classes.push(containerVariants.cursor[$cursor]);
  if ($transition) classes.push($transition);
  if ($animation) classes.push($animation);
  if ($backdropBlur) classes.push(`backdrop-blur-${$backdropBlur}`);
  if (className) classes.push(className);
  if ($custom) classes.push($custom);

  return cn(classes.filter(Boolean).join(' '));
};

// Container component with forwardRef support for better flexibility
const Container = React.forwardRef<HTMLElement, ContainerProps>(
  (props, ref) => {
    const {
      className,
      $margin,
      $padding,
      $width,
      $height,
      $minWidth,
      $maxWidth,
      $minHeight,
      $maxHeight,
      $backgroundColor,
      $color,
      $borderRadius,
      $borderColor,
      $borderWidth,
      $boxShadow,
      $isShadow,
      $opacity,
      $transform,
      $filter,
      $zIndex,
      $top,
      $right,
      $bottom,
      $left,
      $inset,
      $gap,
      as = 'div',
      style,
      children,
      onClick,
      ...restProps
    } = props;

    const Component = as as any;

    // Build dynamic styles for custom values
    const dynamicStyles: React.CSSProperties = {
      ...style,
    };

    // Handle custom values
    if (
      $margin &&
      !$margin.includes('m-') &&
      !$margin.includes('mx-') &&
      !$margin.includes('my-')
    ) {
      dynamicStyles.margin = $margin;
    }
    if (
      $padding &&
      !$padding.includes('p-') &&
      !$padding.includes('px-') &&
      !$padding.includes('py-')
    ) {
      dynamicStyles.padding = $padding;
    }
    if ($width && !$width.includes('w-')) dynamicStyles.width = $width;
    if ($height && !$height.includes('h-')) dynamicStyles.height = $height;
    if ($minWidth) dynamicStyles.minWidth = $minWidth;
    if ($maxWidth && !$maxWidth.includes('max-w-'))
      dynamicStyles.maxWidth = $maxWidth;
    if ($minHeight) dynamicStyles.minHeight = $minHeight;
    if ($maxHeight) dynamicStyles.maxHeight = $maxHeight;
    if ($backgroundColor && !$backgroundColor.includes('bg-'))
      dynamicStyles.backgroundColor = $backgroundColor;
    if ($color && !$color.includes('text-')) dynamicStyles.color = $color;
    if ($borderRadius && !$borderRadius.includes('rounded'))
      dynamicStyles.borderRadius = $borderRadius;
    if ($borderColor && !$borderColor.includes('border-'))
      dynamicStyles.borderColor = $borderColor;
    if ($borderWidth && !$borderWidth.includes('border-'))
      dynamicStyles.borderWidth = $borderWidth;
    if ($boxShadow && !$boxShadow.includes('shadow'))
      dynamicStyles.boxShadow = $boxShadow;
    if ($opacity !== undefined) dynamicStyles.opacity = $opacity / 100;
    if ($transform) dynamicStyles.transform = $transform;
    if ($filter) dynamicStyles.filter = $filter;
    if ($zIndex !== undefined) dynamicStyles.zIndex = $zIndex;
    if ($top) dynamicStyles.top = $top;
    if ($right) dynamicStyles.right = $right;
    if ($bottom) dynamicStyles.bottom = $bottom;
    if ($left) dynamicStyles.left = $left;
    if ($inset) {
      dynamicStyles.top = $inset;
      dynamicStyles.right = $inset;
      dynamicStyles.bottom = $inset;
      dynamicStyles.left = $inset;
    }
    if ($gap && !$gap.includes('gap-')) dynamicStyles.gap = $gap;

    const finalClassName = buildClassName(props);

    return (
      <Component
        ref={ref}
        className={finalClassName}
        style={dynamicStyles}
        onClick={onClick}
        {...restProps}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export {
  Container,
  type ContainerProps,
  type PositionType,
  type DisplayType,
  type FlexDirection,
  type JustifyContent,
  type AlignItems,
  type FlexWrap,
  type OverflowType,
  type TextAlign as ContainerTextAlign,
  type CursorType,
};
