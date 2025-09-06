import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { IconType } from 'react-icons';
import {
  FaCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaUserPlus,
  FaUserCheck,
} from 'react-icons/fa';

// Layout Atoms (Obligatorios)
import { Container } from '../../../atoms/layout/Container';
import { Separator } from '../../../atoms/layout/Separator';

// Display Atoms
import { Text } from '../../../atoms/display/Text';
import { Avatar } from '../../../atoms/display/Avatar';
import { Icon } from '../../../atoms/display/Icon';

// Feedback Atoms
import { Badge } from '../../../atoms/feedback/Badge';

// Form Atoms
import { Button } from '../../../atoms/forms/Button';

interface UserCardProps<T extends Record<string, any> = any> extends BaseProps {
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
  nameStoreKey?: keyof T;
  roleStoreKey?: keyof T;
  statusStoreKey?: keyof T;

  // Props del usuario
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusText?: string;
  bio?: string;
  location?: string;
  joinDate?: string;

  // Configuración visual
  showEmail?: boolean;
  showStatus?: boolean;
  showBio?: boolean;
  showLocation?: boolean;
  showJoinDate?: boolean;
  showActions?: boolean;
  showContactButton?: boolean;
  showFollowButton?: boolean;

  // Props de botones
  contactButtonText?: string;
  followButtonText?: string;
  isFollowing?: boolean;

  // Badges opcionales
  badges?: Array<{
    text: string;
    colorScheme?: 'default' | 'secondary' | 'accent' | 'destructive';
  }>;

  // Callbacks
  onContact?: () => void;
  onFollow?: () => void;
  onAvatarClick?: () => void;
  onClick?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border text-card-foreground',
    nameText: 'text-card-foreground',
    roleText: 'text-muted-foreground',
    metaText: 'text-muted-foreground',
    bioText: 'text-card-foreground/80',
    hover: 'hover:bg-muted/5',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20 text-secondary',
    nameText: 'text-secondary',
    roleText: 'text-secondary/80',
    metaText: 'text-secondary/70',
    bioText: 'text-secondary/90',
    hover: 'hover:bg-secondary/15',
  },
  accent: {
    container: 'bg-accent/10 border-accent/20 text-accent',
    nameText: 'text-accent',
    roleText: 'text-accent/80',
    metaText: 'text-accent/70',
    bioText: 'text-accent/90',
    hover: 'hover:bg-accent/15',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20 text-destructive',
    nameText: 'text-destructive',
    roleText: 'text-destructive/80',
    metaText: 'text-destructive/70',
    bioText: 'text-destructive/90',
    hover: 'hover:bg-destructive/15',
  },
  muted: {
    container: 'bg-muted/50 border-muted text-muted-foreground',
    nameText: 'text-muted-foreground',
    roleText: 'text-muted-foreground/80',
    metaText: 'text-muted-foreground/70',
    bioText: 'text-muted-foreground/90',
    hover: 'hover:bg-muted/70',
  },
  minimal: {
    container: 'bg-transparent border-transparent text-foreground',
    nameText: 'text-foreground',
    roleText: 'text-foreground/80',
    metaText: 'text-foreground/70',
    bioText: 'text-foreground/80',
    hover: 'hover:bg-muted/10',
  },
  custom: {
    container: '',
    nameText: '',
    roleText: '',
    metaText: '',
    bioText: '',
    hover: '',
  },
};

const statusIcons: Record<string, { icon: IconType; color: string }> = {
  online: { icon: FaCircle, color: 'text-green-500' },
  offline: { icon: FaCircle, color: 'text-gray-400' },
  away: { icon: FaCircle, color: 'text-yellow-500' },
  busy: { icon: FaCircle, color: 'text-red-500' },
};

const userCardVariants = {
  base: 'relative rounded-lg border shadow-sm transition-all duration-200 overflow-hidden',
  variants: {
    size: {
      default: 'p-4',
      sm: 'p-3',
      lg: 'p-6',
    },
    variant: {
      default: 'space-y-3',
      compact: 'space-y-2',
      detailed: 'space-y-4',
      minimal: 'space-y-2 border-none shadow-none',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      nameStoreKey,
      roleStoreKey,
      statusStoreKey,
      name: propName,
      role: propRole,
      email,
      avatarSrc,
      avatarAlt,
      status = 'offline',
      statusText,
      bio,
      location,
      joinDate,
      showEmail = true,
      showStatus = true,
      showBio = true,
      showLocation = true,
      showJoinDate = true,
      showActions = true,
      showContactButton = true,
      showFollowButton = true,
      contactButtonText = 'Contactar',
      followButtonText = 'Seguir',
      isFollowing = false,
      badges = [],
      onContact,
      onFollow,
      onAvatarClick,
      onClick,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeName =
      $store && nameStoreKey
        ? $store((state) => state[nameStoreKey])
        : undefined;
    const storeRole =
      $store && roleStoreKey
        ? $store((state) => state[roleStoreKey])
        : undefined;
    const storeStatus =
      $store && statusStoreKey
        ? $store((state) => state[statusStoreKey])
        : undefined;

    // Valores finales
    const finalName = storeName || propName || 'Usuario';
    const finalRole = storeRole || propRole || 'Rol no especificado';
    const finalStatus = storeStatus || status;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Avatar size based on card size
    const avatarSize =
      $size === 'sm' ? 'sm' : $size === 'lg' ? 'lg' : 'default';

    // Text sizes based on card size
    const nameTextSize = $size === 'lg' ? 'lg' : $size === 'sm' ? 'sm' : 'base';
    const roleTextSize = $size === 'lg' ? 'base' : 'sm';

    // Status info
    const statusInfo = statusIcons[finalStatus];
    const StatusIcon = statusInfo?.icon;

    return (
      <div
        ref={ref}
        className={cn(
          userCardVariants.base,
          currentColorScheme.container,
          userCardVariants.variants.size[$size],
          userCardVariants.variants.variant[$variant],
          onClick && 'cursor-pointer',
          onClick && currentColorScheme.hover,
          className,
          $custom
        )}
        onClick={onClick}
        {...props}>
        {/* Header Section - Avatar + Basic Info */}
        <Container $display="flex" $gap="gap-3" $alignItems="start">
          <div
            onClick={onAvatarClick}
            className={onAvatarClick ? 'cursor-pointer' : ''}>
            <Avatar
              src={avatarSrc}
              alt={avatarAlt || `Avatar de ${finalName}`}
              $size={avatarSize}
              $colorScheme={$colorScheme}
            />
          </div>

          <Container className="flex-1 min-w-0">
            {/* Name and Status */}
            <Container
              $display="flex"
              $alignItems="center"
              $gap="gap-2"
              className="mb-1">
              <Text
                $size={nameTextSize}
                $weight="semibold"
                className={cn(currentColorScheme.nameText, 'truncate')}>
                {finalName}
              </Text>

              {showStatus && StatusIcon && (
                <Container $display="flex" $alignItems="center" $gap="gap-1">
                  <Icon
                    icon={StatusIcon}
                    $size={$size === 'lg' ? 'sm' : 'xs'}
                    className={statusInfo.color}
                  />
                  {statusText && (
                    <Text
                      $size="xs"
                      className={cn(currentColorScheme.metaText, 'capitalize')}>
                      {statusText}
                    </Text>
                  )}
                </Container>
              )}
            </Container>

            {/* Role */}
            <Text
              $size={roleTextSize}
              className={cn(currentColorScheme.roleText, 'truncate')}>
              {finalRole}
            </Text>

            {/* Email */}
            {showEmail && email && (
              <Text
                $size="sm"
                className={cn(currentColorScheme.metaText, 'truncate')}>
                {email}
              </Text>
            )}
          </Container>
        </Container>

        {/* Badges */}
        {badges.length > 0 && (
          <Container $display="flex" $gap="gap-2" className="flex-wrap">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                $colorScheme={badge.colorScheme || $colorScheme}
                $size="sm">
                {badge.text}
              </Badge>
            ))}
          </Container>
        )}

        {/* Bio */}
        {showBio && bio && $variant !== 'compact' && (
          <>
            <Separator $orientation="horizontal" />
            <Text $size="sm" className={currentColorScheme.bioText}>
              {bio}
            </Text>
          </>
        )}

        {/* Metadata Section */}
        {(showLocation || showJoinDate) && $variant === 'detailed' && (
          <>
            <Separator $orientation="horizontal" />
            <Container $display="flex" $gap="gap-4" className="text-sm">
              {showLocation && location && (
                <Container $display="flex" $alignItems="center" $gap="gap-1">
                  <Icon
                    icon={FaMapMarkerAlt}
                    $size="xs"
                    className={currentColorScheme.metaText}
                  />
                  <Text $size="sm" className={currentColorScheme.metaText}>
                    {location}
                  </Text>
                </Container>
              )}

              {showJoinDate && joinDate && (
                <Container $display="flex" $alignItems="center" $gap="gap-1">
                  <Icon
                    icon={FaCalendarAlt}
                    $size="xs"
                    className={currentColorScheme.metaText}
                  />
                  <Text $size="sm" className={currentColorScheme.metaText}>
                    {joinDate}
                  </Text>
                </Container>
              )}
            </Container>
          </>
        )}

        {/* Actions Section */}
        {showActions && (showContactButton || showFollowButton) && (
          <>
            <Separator $orientation="horizontal" />
            <Container $display="flex" $gap="gap-2">
              {showContactButton && (
                <Button
                  $colorScheme="outline"
                  $size={$size === 'lg' ? 'default' : 'sm'}
                  onClick={onContact}
                  $iconLeft={FaEnvelope}
                  className="flex-1">
                  {contactButtonText}
                </Button>
              )}

              {showFollowButton && (
                <Button
                  $colorScheme={isFollowing ? 'outline' : 'default'}
                  $size={$size === 'lg' ? 'default' : 'sm'}
                  onClick={onFollow}
                  $iconLeft={isFollowing ? FaUserCheck : FaUserPlus}
                  className="flex-1">
                  {isFollowing ? 'Siguiendo' : followButtonText}
                </Button>
              )}
            </Container>
          </>
        )}
      </div>
    );
  }
);

UserCard.displayName = 'UserCard';

export { UserCard, type UserCardProps };

