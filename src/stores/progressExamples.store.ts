import { create } from 'zustand';

interface ProgressExamplesState {
  // Estados para cada story
  defaultExample: number;
  sizeExample: number;
  variantExample: number;
  animatedExample: number;
  circularExample: number;

  // Ejemplos específicos de progreso
  downloadProgress: number;
  uploadProgress: number;
  installProgress: number;
  loadingProgress: number;
  skillProgress: number;

  // Estados de animación
  isAnimating: boolean;

  // Setters tipados
  setDefaultExample: (value: number) => void;
  setSizeExample: (value: number) => void;
  setVariantExample: (value: number) => void;
  setAnimatedExample: (value: number) => void;
  setCircularExample: (value: number) => void;

  setDownloadProgress: (value: number) => void;
  setUploadProgress: (value: number) => void;
  setInstallProgress: (value: number) => void;
  setLoadingProgress: (value: number) => void;
  setSkillProgress: (value: number) => void;

  setIsAnimating: (value: boolean) => void;

  // Funciones de utilidad
  startAnimation: () => void;
  stopAnimation: () => void;
  resetAllProgress: () => void;

  // Utilidad de limpieza
  clearAllProgress: () => void;
}

export const useProgressExamples = create<ProgressExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: 65,
    sizeExample: 40,
    variantExample: 75,
    animatedExample: 0,
    circularExample: 80,

    downloadProgress: 45,
    uploadProgress: 78,
    installProgress: 92,
    loadingProgress: 25,
    skillProgress: 85,

    isAnimating: false,

    // Setters
    setDefaultExample: (value: number) =>
      set({ defaultExample: Math.max(0, Math.min(100, value)) }),
    setSizeExample: (value: number) =>
      set({ sizeExample: Math.max(0, Math.min(100, value)) }),
    setVariantExample: (value: number) =>
      set({ variantExample: Math.max(0, Math.min(100, value)) }),
    setAnimatedExample: (value: number) =>
      set({ animatedExample: Math.max(0, Math.min(100, value)) }),
    setCircularExample: (value: number) =>
      set({ circularExample: Math.max(0, Math.min(100, value)) }),

    setDownloadProgress: (value: number) =>
      set({ downloadProgress: Math.max(0, Math.min(100, value)) }),
    setUploadProgress: (value: number) =>
      set({ uploadProgress: Math.max(0, Math.min(100, value)) }),
    setInstallProgress: (value: number) =>
      set({ installProgress: Math.max(0, Math.min(100, value)) }),
    setLoadingProgress: (value: number) =>
      set({ loadingProgress: Math.max(0, Math.min(100, value)) }),
    setSkillProgress: (value: number) =>
      set({ skillProgress: Math.max(0, Math.min(100, value)) }),

    setIsAnimating: (value: boolean) => set({ isAnimating: value }),

    // Funciones de utilidad
    startAnimation: () => {
      set({ isAnimating: true, animatedExample: 0 });

      const animate = () => {
        const { animatedExample, isAnimating } = get();
        if (!isAnimating) return;

        if (animatedExample < 100) {
          set({ animatedExample: animatedExample + 1 });
          setTimeout(animate, 50);
        } else {
          set({ isAnimating: false });
        }
      };

      animate();
    },

    stopAnimation: () => {
      set({ isAnimating: false });
    },

    resetAllProgress: () => {
      set({
        defaultExample: 0,
        sizeExample: 0,
        variantExample: 0,
        animatedExample: 0,
        circularExample: 0,
        downloadProgress: 0,
        uploadProgress: 0,
        installProgress: 0,
        loadingProgress: 0,
        skillProgress: 0,
        isAnimating: false,
      });
    },

    // Limpieza
    clearAllProgress: () =>
      set({
        defaultExample: 0,
        sizeExample: 0,
        variantExample: 0,
        animatedExample: 0,
        circularExample: 0,
        downloadProgress: 0,
        uploadProgress: 0,
        installProgress: 0,
        loadingProgress: 0,
        skillProgress: 0,
        isAnimating: false,
      }),
  })
);

