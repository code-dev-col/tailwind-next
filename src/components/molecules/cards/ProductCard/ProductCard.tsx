import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Layout Atoms (obligatorios)
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Center } from '../../../atoms/layout/Center';
import { Separator } from '../../../atoms/layout/Separator';

// Display Atoms
import { Text } from '../../../atoms/display/Text';
import { Icon } from '../../../atoms/display/Icon';

// Media Atoms
import { Image } from '../../../atoms/media/Image';

// Feedback Atoms
import { Badge } from '../../../atoms/feedback/Badge';

// Forms Atoms
import { Button } from '../../../atoms/forms/Button';

// Iconos para acciones
import {
  FiShoppingCart,
  FiHeart,
  FiEye,
  FiStar,
  FiMoreVertical,
} from 'react-icons/fi';

// Helper function para formatear precios
const formatPrice = (price: string | number | undefined): string => {
  if (!price && price !== 0) return '';

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) return '';

  // Formatear con máximo 2 decimales y separadores de miles
  return numericPrice.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

interface ProductCardProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del ProductCard
  title?: string;
  description?: string;
  price?: string | number;
  originalPrice?: string | number;
  currency?: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  brand?: string;
  rating?: number;
  maxRating?: number;
  reviewCount?: number;
  inStock?: boolean;
  stockCount?: number;
  discount?: string;
  isNew?: boolean;
  isFavorite?: boolean;
  $showBadges?: boolean;
  $showRating?: boolean;
  $showStock?: boolean;
  $showActions?: boolean;
  $showQuickView?: boolean;
  $interactive?: boolean;

  // Callbacks
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  onQuickView?: () => void;
  onClick?: () => void;
  onMoreActions?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border text-card-foreground',
    title: 'text-card-foreground',
    description: 'text-muted-foreground',
    price: 'text-primary font-bold',
    originalPrice: 'text-muted-foreground line-through',
    category: 'text-muted-foreground',
    brand: 'text-foreground font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20 text-secondary',
    title: 'text-secondary',
    description: 'text-secondary/70',
    price: 'text-secondary font-bold',
    originalPrice: 'text-secondary/50 line-through',
    category: 'text-secondary/70',
    brand: 'text-secondary font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  accent: {
    container: 'bg-accent/10 border-accent/20 text-accent',
    title: 'text-accent',
    description: 'text-accent/70',
    price: 'text-accent font-bold',
    originalPrice: 'text-accent/50 line-through',
    category: 'text-accent/70',
    brand: 'text-accent font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20 text-destructive',
    title: 'text-destructive',
    description: 'text-destructive/70',
    price: 'text-destructive font-bold',
    originalPrice: 'text-destructive/50 line-through',
    category: 'text-destructive/70',
    brand: 'text-destructive font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  muted: {
    container: 'bg-muted/50 border-muted text-muted-foreground',
    title: 'text-muted-foreground',
    description: 'text-muted-foreground/70',
    price: 'text-foreground font-bold',
    originalPrice: 'text-muted-foreground/50 line-through',
    category: 'text-muted-foreground/70',
    brand: 'text-muted-foreground font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  minimal: {
    container: 'bg-transparent border-border/50 text-foreground',
    title: 'text-foreground',
    description: 'text-foreground/70',
    price: 'text-foreground font-bold',
    originalPrice: 'text-foreground/50 line-through',
    category: 'text-foreground/70',
    brand: 'text-foreground font-medium',
    stock: 'text-success',
    outOfStock: 'text-destructive',
  },
  custom: {
    container: '',
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    brand: '',
    stock: '',
    outOfStock: '',
  },
};

const productCardVariants = {
  base: 'relative rounded-lg border shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden',
  interactive: 'cursor-pointer hover:border-primary/30 hover:shadow-lg',
  variants: {
    size: {
      sm: 'max-w-xs',
      default: 'max-w-sm',
      lg: 'max-w-md',
    },
    variant: {
      default: '',
      compact: '',
      detailed: '',
      minimal: '',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title = 'Producto',
      description,
      price,
      originalPrice,
      currency = '₡',
      imageUrl,
      imageAlt,
      category,
      brand,
      rating,
      maxRating = 5,
      reviewCount,
      inStock = true,
      stockCount,
      discount,
      isNew = false,
      isFavorite = false,
      $showBadges = true,
      $showRating = true,
      $showStock = true,
      $showActions = true,
      $showQuickView = false,
      $interactive = false,
      onAddToCart,
      onToggleFavorite,
      onQuickView,
      onClick,
      onMoreActions,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Si storeValue es un objeto completo, extraer las propiedades
    const isStoreObject =
      storeValue && typeof storeValue === 'object' && 'id' in storeValue;

    // Usar valores del store si están disponibles, sino usar props directas
    const finalTitle = isStoreObject ? (storeValue as any).title : title;
    const finalDescription = isStoreObject
      ? (storeValue as any).description
      : description;
    const finalPrice = isStoreObject ? (storeValue as any).price : price;
    const finalOriginalPrice = isStoreObject
      ? (storeValue as any).originalPrice
      : originalPrice;
    const finalCurrency = isStoreObject
      ? (storeValue as any).currency
      : currency;
    const finalImageUrl = isStoreObject
      ? (storeValue as any).imageUrl
      : imageUrl;
    const finalImageAlt = isStoreObject
      ? (storeValue as any).imageAlt
      : imageAlt;
    const finalCategory = isStoreObject
      ? (storeValue as any).category
      : category;
    const finalBrand = isStoreObject ? (storeValue as any).brand : brand;
    const finalRating = isStoreObject ? (storeValue as any).rating : rating;
    const finalReviewCount = isStoreObject
      ? (storeValue as any).reviewCount
      : reviewCount;
    const finalInStock = isStoreObject ? (storeValue as any).inStock : inStock;
    const finalStockCount = isStoreObject
      ? (storeValue as any).stockCount
      : stockCount;
    const finalDiscount = isStoreObject
      ? (storeValue as any).discount
      : discount;
    const finalIsNew = isStoreObject ? (storeValue as any).isNew : isNew;
    const finalIsFavorite = isStoreObject
      ? (storeValue as any).isFavorite
      : isFavorite;
    const finalInteractive = isStoreObject
      ? (storeValue as any).interactive
      : $interactive;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Calcular descuento si hay precio original
    const hasDiscount =
      finalOriginalPrice && finalPrice && finalOriginalPrice > finalPrice;
    const discountPercentage = hasDiscount
      ? Math.round(
          ((Number(finalOriginalPrice) - Number(finalPrice)) /
            Number(finalOriginalPrice)) *
            100
        )
      : 0;

    // Renderizar estrellas de rating
    const renderStars = () => {
      if (!finalRating || !$showRating) return null;

      const stars = [];
      for (let i = 1; i <= maxRating; i++) {
        stars.push(
          <Icon
            key={i}
            icon={FiStar}
            $size="sm"
            className={
              i <= finalRating
                ? 'text-warning fill-current'
                : 'text-muted-foreground/30'
            }
          />
        );
      }
      return stars;
    };

    const handleClick = () => {
      if (finalInteractive && onClick) {
        onClick();
      }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onAddToCart) {
        onAddToCart();
      }
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onToggleFavorite) {
        onToggleFavorite();
      }
    };

    const handleQuickView = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onQuickView) {
        onQuickView();
      }
    };

    const handleMoreActions = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onMoreActions) {
        onMoreActions();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          productCardVariants.base,
          currentColorScheme.container,
          productCardVariants.variants.size[$size],
          productCardVariants.variants.variant[$variant],
          finalInteractive && productCardVariants.interactive,
          className,
          $custom
        )}
        onClick={handleClick}
        {...props}>
        {/* Imagen del producto */}
        <Container className="relative group overflow-hidden">
          <Image
            src={finalImageUrl || '/api/placeholder/300/300'}
            alt={finalImageAlt || finalTitle}
            $fill
            $aspect="square"
            $objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay con acciones (aparece en hover) */}
          {$showActions && (
            <Container className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Container $display="flex" $gap="gap-2">
                {onAddToCart && finalInStock && (
                  <Button
                    $colorScheme="default"
                    $size="sm"
                    onClick={handleAddToCart}
                    className="bg-white/90 text-foreground hover:bg-white gap-2">
                    <Icon
                      icon={FiShoppingCart}
                      $size="sm"
                      className="text-current"
                    />
                  </Button>
                )}

                {onToggleFavorite && (
                  <Button
                    $colorScheme="default"
                    $size="sm"
                    onClick={handleToggleFavorite}
                    className={cn(
                      'bg-white/90 hover:bg-white gap-2',
                      finalIsFavorite ? 'text-destructive' : 'text-foreground'
                    )}>
                    <Icon icon={FiHeart} $size="sm" className="text-current" />
                  </Button>
                )}

                {$showQuickView && onQuickView && (
                  <Button
                    $colorScheme="default"
                    $size="sm"
                    onClick={handleQuickView}
                    className="bg-white/90 text-foreground hover:bg-white gap-2">
                    <Icon icon={FiEye} $size="sm" className="text-current" />
                  </Button>
                )}
              </Container>
            </Container>
          )}

          {/* Badges en la imagen */}
          {$showBadges && (
            <Container className="absolute top-2 left-2 flex flex-col gap-1">
              {finalIsNew && (
                <Badge $colorScheme="accent" $size="sm">
                  Nuevo
                </Badge>
              )}
              {finalDiscount && (
                <Badge $colorScheme="destructive" $size="sm">
                  {finalDiscount}
                </Badge>
              )}
              {hasDiscount && (
                <Badge $colorScheme="warning" $size="sm">
                  -{discountPercentage}%
                </Badge>
              )}
              {!finalInStock && (
                <Badge $colorScheme="muted" $size="sm">
                  Agotado
                </Badge>
              )}
            </Container>
          )}

          {/* Botón de más acciones */}
          {onMoreActions && (
            <Container className="absolute top-2 right-2">
              <Button
                $colorScheme="default"
                $size="sm"
                onClick={handleMoreActions}
                className="bg-white/90 text-foreground hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon icon={FiMoreVertical} $size="sm" />
              </Button>
            </Container>
          )}
        </Container>

        {/* Contenido del producto */}
        <Container
          className={cn(
            'p-4',
            $variant === 'compact' && 'p-3',
            $variant === 'detailed' && 'p-5'
          )}>
          {/* Categoría y marca */}
          {(finalCategory || finalBrand) && (
            <Container
              $display="flex"
              $justifyContent="between"
              $alignItems="start"
              className="mb-2">
              {finalCategory && (
                <Text
                  $size="xs"
                  $weight="medium"
                  className={currentColorScheme.category}>
                  {finalCategory}
                </Text>
              )}
              {finalBrand && (
                <Text
                  $size="xs"
                  $weight="medium"
                  className={currentColorScheme.brand}>
                  {finalBrand}
                </Text>
              )}
            </Container>
          )}

          {/* Título */}
          <Text
            $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'lg' : 'base'}
            $weight="semibold"
            className={cn(currentColorScheme.title, 'mb-2 line-clamp-2')}>
            {finalTitle}
          </Text>

          {/* Descripción (solo en variante detailed) */}
          {$variant === 'detailed' && finalDescription && (
            <Text
              $size="sm"
              className={cn(
                currentColorScheme.description,
                'mb-3 line-clamp-2'
              )}>
              {finalDescription}
            </Text>
          )}

          {/* Rating */}
          {$showRating && finalRating && (
            <Container
              $display="flex"
              $alignItems="center"
              $gap="gap-1"
              className="mb-2">
              <Container $display="flex" $gap="gap-0.5">
                {renderStars()}
              </Container>
              <Text $size="sm" className="text-muted-foreground ml-1">
                ({finalReviewCount || 0})
              </Text>
            </Container>
          )}

          {/* Precio */}
          <Container
            $display="flex"
            $alignItems="center"
            $gap="gap-2"
            className="mb-3">
            <Text
              $size={$size === 'sm' ? 'lg' : $size === 'lg' ? 'xl' : 'lg'}
              className={currentColorScheme.price}>
              {finalCurrency}
              {formatPrice(finalPrice)}
            </Text>
            {finalOriginalPrice && finalOriginalPrice !== finalPrice && (
              <Text $size="sm" className={currentColorScheme.originalPrice}>
                {finalCurrency}
                {formatPrice(finalOriginalPrice)}
              </Text>
            )}
          </Container>

          {/* Stock */}
          {$showStock && (
            <Container className="mb-3">
              {finalInStock ? (
                <Text $size="sm" className={currentColorScheme.stock}>
                  {finalStockCount
                    ? `${finalStockCount} disponibles`
                    : 'En stock'}
                </Text>
              ) : (
                <Text $size="sm" className={currentColorScheme.outOfStock}>
                  Agotado
                </Text>
              )}
            </Container>
          )}

          {/* Separador para variante detailed */}
          {$variant === 'detailed' && (
            <Separator $orientation="horizontal" className="my-3" />
          )}

          {/* Acciones principales */}
          {$showActions && (
            <Container $display="flex" $gap="gap-2">
              {onAddToCart && (
                <Button
                  $colorScheme={finalInStock ? 'default' : 'muted'}
                  $size="sm"
                  onClick={handleAddToCart}
                  disabled={!finalInStock}
                  className="flex-1 gap-2">
                  <Icon
                    icon={FiShoppingCart}
                    $size="sm"
                    className="text-current"
                  />
                  {finalInStock ? 'Agregar' : 'Agotado'}
                </Button>
              )}

              {onToggleFavorite && (
                <Button
                  $colorScheme={finalIsFavorite ? 'destructive' : 'outline'}
                  $size="sm"
                  onClick={handleToggleFavorite}
                  className="gap-2">
                  <Icon icon={FiHeart} $size="sm" className="text-current" />
                </Button>
              )}
            </Container>
          )}
        </Container>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export { ProductCard, type ProductCardProps };

