import { create } from 'zustand';

interface ImageExamplesState {
  // Estados para cada story
  defaultExample: string;
  variantExample: string;
  sizeExample: string;
  aspectExample: string;
  objectFitExample: string;
  gradientExample: string;
  fallbackExample: string;
  nextJsExample: string;
  fillExample: string;
  interactiveExample: string;
  galleryImages: string[];
  selectedImage: string | null;
  loadingStates: Record<string, boolean>;
  errorStates: Record<string, boolean>;

  // Setters tipados
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setAspectExample: (value: string) => void;
  setObjectFitExample: (value: string) => void;
  setGradientExample: (value: string) => void;
  setFallbackExample: (value: string) => void;
  setNextJsExample: (value: string) => void;
  setFillExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;

  // Gestión de galería
  setGalleryImages: (images: string[]) => void;
  addImageToGallery: (image: string) => void;
  removeImageFromGallery: (image: string) => void;
  setSelectedImage: (image: string | null) => void;

  // Estados de carga y error
  setImageLoading: (imageId: string, isLoading: boolean) => void;
  setImageError: (imageId: string, hasError: boolean) => void;

  // Utilidad de limpieza
  clearAllImage: () => void;
}

export const useImageExamples = create<ImageExamplesState>((set) => ({
  // Estados iniciales
  defaultExample: '',
  variantExample: '',
  sizeExample: '',
  aspectExample: '',
  objectFitExample: '',
  gradientExample: '',
  fallbackExample: '',
  nextJsExample: '',
  fillExample: '',
  interactiveExample: '',
  galleryImages: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80',
  ],
  selectedImage: null,
  loadingStates: {},
  errorStates: {},

  // Setters para ejemplos básicos
  setDefaultExample: (value: string) => set({ defaultExample: value }),

  setVariantExample: (value: string) => set({ variantExample: value }),

  setSizeExample: (value: string) => set({ sizeExample: value }),

  setAspectExample: (value: string) => set({ aspectExample: value }),

  setObjectFitExample: (value: string) => set({ objectFitExample: value }),

  setGradientExample: (value: string) => set({ gradientExample: value }),

  setFallbackExample: (value: string) => set({ fallbackExample: value }),

  setNextJsExample: (value: string) => set({ nextJsExample: value }),

  setFillExample: (value: string) => set({ fillExample: value }),

  setInteractiveExample: (value: string) => set({ interactiveExample: value }),

  // Gestión de galería
  setGalleryImages: (images: string[]) => set({ galleryImages: images }),

  addImageToGallery: (image: string) =>
    set((state) => ({
      galleryImages: [...state.galleryImages, image],
    })),

  removeImageFromGallery: (image: string) =>
    set((state) => ({
      galleryImages: state.galleryImages.filter((img) => img !== image),
    })),

  setSelectedImage: (image: string | null) => set({ selectedImage: image }),

  // Estados de carga y error
  setImageLoading: (imageId: string, isLoading: boolean) =>
    set((state) => ({
      loadingStates: {
        ...state.loadingStates,
        [imageId]: isLoading,
      },
    })),

  setImageError: (imageId: string, hasError: boolean) =>
    set((state) => ({
      errorStates: {
        ...state.errorStates,
        [imageId]: hasError,
      },
    })),

  // Utilidad de limpieza
  clearAllImage: () =>
    set({
      defaultExample: '',
      variantExample: '',
      sizeExample: '',
      aspectExample: '',
      objectFitExample: '',
      gradientExample: '',
      fallbackExample: '',
      nextJsExample: '',
      fillExample: '',
      interactiveExample: '',
      selectedImage: null,
      loadingStates: {},
      errorStates: {},
      galleryImages: [],
    }),
}));

