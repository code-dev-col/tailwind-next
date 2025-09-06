import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import type { ArticleData } from '../../../../stores/articleCardExamples.store';
import type { UseBoundStore, StoreApi } from 'zustand';

// Components
import { Text } from '../../../atoms/display/Text';
import { Badge } from '../../../atoms/feedback/Badge';
import { Avatar } from '../../../atoms/display/Avatar';
import { Button } from '../../../atoms/forms/Button';
import { Image } from '../../../atoms/media/Image';
import { Container } from '../../../atoms/layout/Container';

// Icons
import {
  FiBookmark,
  FiHeart,
  FiEye,
  FiClock,
  FiShare2,
  FiExternalLink,
} from 'react-icons/fi';
import { FaBookmark, FaHeart } from 'react-icons/fa';

interface ArticleCardProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Store integration (nuevo patrón storeKey)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Legacy store support
  $storeString?: string;

  // Article data (props directas o desde store)
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  authorAvatar?: string;
  publishedDate?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  imageAlt?: string;
  readTime?: number;
  views?: number;
  likes?: number;
  isBookmarked?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  slug?: string;

  // Variantes y estilos
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $size?: 'sm' | 'default' | 'lg';
  $colorScheme?: 'default' | 'secondary' | 'accent' | 'muted' | 'minimal';
  $interactive?: boolean;
  $showImage?: boolean;
  $showAuthor?: boolean;
  $showMeta?: boolean;
  $showActions?: boolean;
  $showTags?: boolean;
  $showExcerpt?: boolean;
  $custom?: string;

  // Event handlers
  onClick?: () => void;
  onReadMore?: () => void;
  onToggleBookmark?: () => void;
  onToggleLike?: () => void;
  onShare?: () => void;
  onAuthorClick?: () => void;
  onCategoryClick?: () => void;
  onTagClick?: (tag: string) => void;
}

// Utility functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'advanced':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Variant classes
const articleCardVariants = {
  base: [
    'group relative overflow-hidden',
    'bg-card border border-border rounded-lg',
    'shadow-sm transition-all duration-200',
  ].join(' '),

  interactive: [
    'hover:shadow-md hover:border-border/60',
    'cursor-pointer',
  ].join(' '),

  variants: {
    variant: {
      default: 'flex flex-col h-full',
      compact: 'flex flex-row space-x-4 p-4',
      detailed: 'flex flex-col h-full',
      minimal: 'flex flex-col space-y-2 p-3',
    },
    size: {
      sm: 'max-w-xs',
      default: 'max-w-sm',
      lg: 'max-w-md',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

// Color schemes
const colorSchemes = {
  default: {
    background: 'bg-card',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    textMuted: 'text-muted-foreground/70',
    border: 'border-border',
    hover: 'hover:bg-muted/50',
    active: 'bg-primary/10 text-primary',
  },
  secondary: {
    background: 'bg-secondary/5',
    text: 'text-secondary',
    textSecondary: 'text-secondary/90',
    textMuted: 'text-secondary/70',
    border: 'border-secondary/20',
    hover: 'hover:bg-secondary/10',
    active: 'bg-secondary/25 text-secondary',
  },
  accent: {
    background: 'bg-accent/2',
    text: 'text-accent',
    textSecondary: 'text-accent/90',
    textMuted: 'text-accent/70',
    border: 'border-accent/20',
    hover: 'hover:bg-accent/5',
    active: 'bg-accent/25 text-accent',
  },
  muted: {
    background: 'bg-muted/30',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/90',
    textMuted: 'text-muted-foreground/70',
    border: 'border-muted-foreground/20',
    hover: 'hover:bg-muted/40',
    active: 'bg-muted/50 text-muted-foreground',
  },
  minimal: {
    background: 'bg-transparent',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground',
    textMuted: 'text-muted-foreground/70',
    border: 'border-transparent',
    hover: 'hover:bg-muted/30',
    active: 'bg-muted/40',
  },
};

const ArticleCard = <T extends Record<string, any> = any>({
  className,
  $store,
  storeKey,
  $storeString,

  // Article data props
  title: titleProp,
  excerpt: excerptProp,
  content: contentProp,
  author: authorProp,
  authorAvatar: authorAvatarProp,
  publishedDate: publishedDateProp,
  category: categoryProp,
  tags: tagsProp,
  imageUrl: imageUrlProp,
  imageAlt: imageAltProp,
  readTime: readTimeProp,
  views: viewsProp,
  likes: likesProp,
  isBookmarked: isBookmarkedProp,
  isFeatured: isFeaturedProp,
  isSponsored: isSponsoredProp,
  difficulty: difficultyProp,
  slug: slugProp,

  // Style props
  $variant = 'default',
  $size = 'default',
  $colorScheme = 'default',
  $interactive = false,
  $showImage = true,
  $showAuthor = true,
  $showMeta = true,
  $showActions = true,
  $showTags = true,
  $showExcerpt = true,
  $custom,

  // Event handlers
  onClick,
  onReadMore,
  onToggleBookmark,
  onToggleLike,
  onShare,
  onAuthorClick,
  onCategoryClick,
  onTagClick,

  ...props
}: ArticleCardProps<T>) => {
  // Store data resolution (nuevo patrón storeKey)
  const storeData =
    $store && storeKey
      ? $store((state) => state[storeKey] as ArticleData)
      : undefined;

  // Final data resolution (removemos legacy support por ahora)
  const articleData = storeData;

  const title = titleProp || articleData?.title || 'Título del Artículo';
  const excerpt = excerptProp || articleData?.excerpt;
  const content = contentProp || articleData?.content;
  const author = authorProp || articleData?.author || 'Autor Desconocido';
  const authorAvatar = authorAvatarProp || articleData?.authorAvatar;
  const publishedDate =
    publishedDateProp ||
    articleData?.publishedDate ||
    new Date().toISOString().split('T')[0];
  const category = categoryProp || articleData?.category || 'General';
  const tags = tagsProp || articleData?.tags || [];
  const imageUrl =
    imageUrlProp ||
    articleData?.imageUrl ||
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop';
  const imageAlt = imageAltProp || articleData?.imageAlt || title;
  const readTime = readTimeProp || articleData?.readTime || 5;
  const views = viewsProp || articleData?.views || 0;
  const likes = likesProp || articleData?.likes || 0;
  const isBookmarked = isBookmarkedProp ?? articleData?.isBookmarked ?? false;
  const isFeatured = isFeaturedProp ?? articleData?.isFeatured ?? false;
  const isSponsored = isSponsoredProp ?? articleData?.isSponsored ?? false;
  const difficulty = difficultyProp || articleData?.difficulty;
  const slug = slugProp || articleData?.slug || '';

  // Get color scheme classes
  const colorScheme = colorSchemes[$colorScheme];

  // Event handlers
  const handleClick = () => {
    if ($interactive && onClick) {
      onClick();
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark?.();
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike?.();
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAuthorClick?.();
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCategoryClick?.();
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReadMore?.();
  };

  // Render variants
  if ($variant === 'compact') {
    return (
      <Container
        className={cn(
          articleCardVariants.base,
          articleCardVariants.variants.variant.compact,
          $interactive && articleCardVariants.interactive,
          colorScheme.background,
          colorScheme.border,
          $interactive && colorScheme.hover,
          className,
          $custom
        )}
        onClick={handleClick}
        {...props}>
        {/* Image - Compact */}
        {$showImage && (
          <Container className="flex-shrink-0 w-24 h-24">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-md"
            />
          </Container>
        )}

        {/* Content - Compact */}
        <Container className="flex-1 min-w-0 space-y-2">
          {/* Category & Featured Badge */}
          <Container className="flex items-center gap-2">
            <Badge
              $colorScheme="outline"
              $size="sm"
              className={cn(colorScheme.active)}>
              {category}
            </Badge>
            {isFeatured && (
              <Badge $colorScheme="default" $size="sm">
                Destacado
              </Badge>
            )}
            {isSponsored && (
              <Badge $colorScheme="secondary" $size="sm">
                Patrocinado
              </Badge>
            )}
          </Container>

          {/* Title */}
          <Text
            as="h3"
            $size="sm"
            $weight="semibold"
            className={cn(colorScheme.text, 'line-clamp-2')}>
            {title}
          </Text>

          {/* Meta Info */}
          {$showMeta && (
            <Container className="flex items-center gap-3 text-xs text-muted-foreground">
              <Container className="flex items-center gap-1">
                <FiClock />
                <span>{readTime} min</span>
              </Container>
              {views > 0 && (
                <Container className="flex items-center gap-1">
                  <FiEye />
                  <span>{formatNumber(views)}</span>
                </Container>
              )}
              <span>{formatDate(publishedDate)}</span>
            </Container>
          )}

          {/* Author - Compact */}
          {$showAuthor && (
            <Container
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleAuthorClick}>
              <Avatar src={authorAvatar} $size="xs" />
              <Text $size="xs" className={colorScheme.textSecondary}>
                {author}
              </Text>
            </Container>
          )}
        </Container>

        {/* Actions - Compact */}
        {$showActions && (
          <Container className="flex flex-col gap-1">
            <Button
              $colorScheme="ghost"
              $size="sm"
              onClick={handleBookmarkClick}
              className="p-1">
              {isBookmarked ? (
                <FaBookmark className="text-primary" />
              ) : (
                <FiBookmark />
              )}
            </Button>
            <Button
              $colorScheme="ghost"
              $size="sm"
              onClick={handleLikeClick}
              className="p-1">
              {likes > 0 ? <FaHeart className="text-red-500" /> : <FiHeart />}
            </Button>
          </Container>
        )}
      </Container>
    );
  }

  if ($variant === 'minimal') {
    return (
      <Container
        className={cn(
          articleCardVariants.base,
          articleCardVariants.variants.variant.minimal,
          $interactive && articleCardVariants.interactive,
          colorScheme.background,
          colorScheme.border,
          $interactive && colorScheme.hover,
          className,
          $custom
        )}
        onClick={handleClick}
        {...props}>
        {/* Category */}
        <Badge
          $colorScheme="outline"
          $size="sm"
          className={colorScheme.active}
          onClick={handleCategoryClick}>
          {category}
        </Badge>

        {/* Title */}
        <Text
          as="h3"
          $size="sm"
          $weight="medium"
          className={cn(colorScheme.text, 'line-clamp-2')}>
          {title}
        </Text>

        {/* Meta */}
        <Container className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{author}</span>
          <span>{readTime} min</span>
        </Container>
      </Container>
    );
  }

  // Default and Detailed variants
  return (
    <Container
      className={cn(
        articleCardVariants.base,
        articleCardVariants.variants.variant[$variant],
        articleCardVariants.variants.size[$size],
        $interactive && articleCardVariants.interactive,
        colorScheme.background,
        colorScheme.border,
        $interactive && colorScheme.hover,
        className,
        $custom
      )}
      onClick={handleClick}
      {...props}>
      {/* Image */}
      {$showImage && (
        <Container className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Image Overlays */}
          <Container className="absolute top-3 left-3 flex gap-2">
            {isFeatured && (
              <Badge $colorScheme="default" $size="sm">
                Destacado
              </Badge>
            )}
            {isSponsored && (
              <Badge $colorScheme="secondary" $size="sm">
                Patrocinado
              </Badge>
            )}
            {difficulty && (
              <Badge
                $colorScheme="outline"
                $size="sm"
                className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            )}
          </Container>

          {/* Bookmark button overlay */}
          {$showActions && (
            <Container className="absolute top-3 right-3">
              <Button
                $colorScheme="ghost"
                $size="sm"
                onClick={handleBookmarkClick}
                className="bg-white/90 backdrop-blur-sm hover:bg-white">
                {isBookmarked ? (
                  <FaBookmark className="text-primary" />
                ) : (
                  <FiBookmark />
                )}
              </Button>
            </Container>
          )}
        </Container>
      )}

      {/* Content */}
      <Container className="flex-1 p-4 space-y-3">
        {/* Category & Tags */}
        <Container className="flex items-center justify-between">
          <Badge
            $colorScheme="outline"
            $size="sm"
            className={colorScheme.active}
            onClick={handleCategoryClick}>
            {category}
          </Badge>

          {$showMeta && (
            <Container className="flex items-center gap-1 text-xs text-muted-foreground">
              <FiClock />
              <span>{readTime} min</span>
            </Container>
          )}
        </Container>

        {/* Title */}
        <Text
          as="h3"
          $size="lg"
          $weight="semibold"
          className={cn(colorScheme.text, 'line-clamp-2')}>
          {title}
        </Text>

        {/* Excerpt */}
        {$showExcerpt && excerpt && (
          <Text
            $size="sm"
            className={cn(colorScheme.textSecondary, 'line-clamp-3')}>
            {excerpt}
          </Text>
        )}

        {/* Tags */}
        {$showTags && tags.length > 0 && (
          <Container className="flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                $colorScheme="secondary"
                $size="sm"
                onClick={(e) => handleTagClick(e, tag)}
                className="cursor-pointer hover:bg-secondary/20">
                {tag}
              </Badge>
            ))}
            {tags.length > 4 && (
              <Badge $colorScheme="outline" $size="sm">
                +{tags.length - 4}
              </Badge>
            )}
          </Container>
        )}

        {/* Author & Meta */}
        {$showAuthor && (
          <Container className="flex items-center justify-between pt-2 border-t border-border/50">
            <Container
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleAuthorClick}>
              <Avatar src={authorAvatar} $size="sm" />
              <Container>
                <Text $size="sm" $weight="medium" className={colorScheme.text}>
                  {author}
                </Text>
                <Text $size="xs" className={colorScheme.textMuted}>
                  {formatDate(publishedDate)}
                </Text>
              </Container>
            </Container>

            {/* Actions */}
            {$showActions && (
              <Container className="flex items-center gap-1">
                {$showMeta && views > 0 && (
                  <Container className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
                    <FiEye />
                    <span>{formatNumber(views)}</span>
                  </Container>
                )}

                <Button
                  $colorScheme="ghost"
                  $size="sm"
                  onClick={handleLikeClick}
                  className="flex items-center gap-1">
                  {likes > 0 ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FiHeart />
                  )}
                  {likes > 0 && (
                    <span className="text-xs">{formatNumber(likes)}</span>
                  )}
                </Button>

                <Button
                  $colorScheme="ghost"
                  $size="sm"
                  onClick={handleShareClick}>
                  <FiShare2 />
                </Button>

                {onReadMore && (
                  <Button
                    $colorScheme="ghost"
                    $size="sm"
                    onClick={handleReadMoreClick}>
                    <FiExternalLink />
                  </Button>
                )}
              </Container>
            )}
          </Container>
        )}
      </Container>
    </Container>
  );
};

ArticleCard.displayName = 'ArticleCard';

export { ArticleCard, type ArticleCardProps };

