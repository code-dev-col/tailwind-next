import { create } from 'zustand';

export interface ImageCardExamplesState {
  // Estados para cada story de ImageCard
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  colorSchemeExample: string;
  orientationExample: string;
  aspectRatioExample: string;
  overlayExample: string;
  interactiveExample: string;
  withBadgeExample: string;
  galleryExample: string;
  portfolioExample: string;

  // Setters tipados para cada estado
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setColorSchemeExample: (value: string) => void;
  setOrientationExample: (value: string) => void;
  setAspectRatioExample: (value: string) => void;
  setOverlayExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setWithBadgeExample: (value: string) => void;
  setGalleryExample: (value: string) => void;
  setPortfolioExample: (value: string) => void;

  // Estados para diferentes casos de uso
  productGallery: string;
  portfolioItems: string;
  blogPosts: string;
  eventPhotos: string;
  userAvatars: string;
  articleThumbnails: string;

  // Setters para casos de uso
  setProductGallery: (value: string) => void;
  setPortfolioItems: (value: string) => void;
  setBlogPosts: (value: string) => void;
  setEventPhotos: (value: string) => void;
  setUserAvatars: (value: string) => void;
  setArticleThumbnails: (value: string) => void;

  // Configuración dinámica de ImageCard
  dynamicTitle: string;
  dynamicDescription: string;
  dynamicImageUrl: string;
  dynamicBadgeText: string;
  dynamicOrientation: 'vertical' | 'horizontal';
  showBadge: boolean;
  showOverlay: boolean;
  enableHover: boolean;

  // Configuración avanzada de imagen
  advancedImageOverflow: 'none' | 'top' | 'all';
  advancedImageBgColor: string;
  overflowExample: string;

  // Setters para configuración dinámica
  setDynamicTitle: (value: string) => void;
  setDynamicDescription: (value: string) => void;
  setDynamicImageUrl: (value: string) => void;
  setDynamicBadgeText: (value: string) => void;
  setDynamicOrientation: (value: 'vertical' | 'horizontal') => void;
  setShowBadge: (value: boolean) => void;
  setShowOverlay: (value: boolean) => void;
  setEnableHover: (value: boolean) => void;

  // Setters para configuración avanzada
  setAdvancedImageOverflow: (value: 'none' | 'top' | 'all') => void;
  setAdvancedImageBgColor: (value: string) => void;
  setOverflowExample: (value: string) => void;

  // Utilidad de limpieza
  clearAllImageCard: () => void;
}

export const useImageCardExamples = create<ImageCardExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: '',
  variantExample: '',
  sizeExample: '',
  colorSchemeExample: '',
  orientationExample: '',
  aspectRatioExample: '',
  overlayExample: '',
  interactiveExample: '',
  withBadgeExample: '',
  galleryExample: '',
  portfolioExample: '',

  // Casos de uso iniciales
  productGallery: '',
  portfolioItems: '',
  blogPosts: '',
  eventPhotos: '',
  userAvatars: '',
  articleThumbnails: '',

  // Configuración dinámica inicial
  dynamicTitle: 'Imagen Personalizable',
  dynamicDescription:
    'Descripción configurable para esta imagen con orientación vertical u horizontal.',
  dynamicImageUrl:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  dynamicBadgeText: 'Nuevo',
  dynamicOrientation: 'vertical',
  showBadge: true,
  showOverlay: true,
  enableHover: true,

  // Configuración avanzada inicial
  advancedImageOverflow: 'none',
  advancedImageBgColor: '#ffffff',
  overflowExample: '',

  // Setters para ejemplos
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setVariantExample: (value: string) => set({ variantExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setColorSchemeExample: (value: string) => set({ colorSchemeExample: value }),
  setOrientationExample: (value: string) => set({ orientationExample: value }),
  setAspectRatioExample: (value: string) => set({ aspectRatioExample: value }),
  setOverlayExample: (value: string) => set({ overlayExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setWithBadgeExample: (value: string) => set({ withBadgeExample: value }),
  setGalleryExample: (value: string) => set({ galleryExample: value }),
  setPortfolioExample: (value: string) => set({ portfolioExample: value }),

  // Setters para casos de uso
  setProductGallery: (value: string) => set({ productGallery: value }),
  setPortfolioItems: (value: string) => set({ portfolioItems: value }),
  setBlogPosts: (value: string) => set({ blogPosts: value }),
  setEventPhotos: (value: string) => set({ eventPhotos: value }),
  setUserAvatars: (value: string) => set({ userAvatars: value }),
  setArticleThumbnails: (value: string) => set({ articleThumbnails: value }),

  // Setters para configuración dinámica
  setDynamicTitle: (value: string) => set({ dynamicTitle: value }),
  setDynamicDescription: (value: string) => set({ dynamicDescription: value }),
  setDynamicImageUrl: (value: string) => set({ dynamicImageUrl: value }),
  setDynamicBadgeText: (value: string) => set({ dynamicBadgeText: value }),
  setDynamicOrientation: (value: 'vertical' | 'horizontal') =>
    set({ dynamicOrientation: value }),
  setShowBadge: (value: boolean) => set({ showBadge: value }),
  setShowOverlay: (value: boolean) => set({ showOverlay: value }),
  setEnableHover: (value: boolean) => set({ enableHover: value }),

  // Setters para configuración avanzada
  setAdvancedImageOverflow: (value: 'none' | 'top' | 'all') =>
    set({ advancedImageOverflow: value }),
  setAdvancedImageBgColor: (value: string) =>
    set({ advancedImageBgColor: value }),
  setOverflowExample: (value: string) => set({ overflowExample: value }),

  // Limpieza completa
  clearAllImageCard: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
      colorSchemeExample: '',
      orientationExample: '',
      aspectRatioExample: '',
      overlayExample: '',
      interactiveExample: '',
      withBadgeExample: '',
      galleryExample: '',
      portfolioExample: '',
      productGallery: '',
      portfolioItems: '',
      blogPosts: '',
      eventPhotos: '',
      userAvatars: '',
      articleThumbnails: '',
      dynamicTitle: 'Imagen Personalizable',
      dynamicDescription:
        'Descripción configurable para esta imagen con orientación vertical u horizontal.',
      dynamicImageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      dynamicBadgeText: 'Nuevo',
      dynamicOrientation: 'vertical',
      showBadge: true,
      showOverlay: true,
      enableHover: true,
      advancedImageOverflow: 'none',
      advancedImageBgColor: '#ffffff',
      overflowExample: '',
    }),
}));

