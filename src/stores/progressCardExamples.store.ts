import { create } from 'zustand';

export interface ProgressCardExamplesState {
  // Examples para cada story
  defaultExample: number;
  variantExample: number;
  sizeExample: number;
  interactiveExample: number;

  // Estados para casos específicos
  taskProgress: number;
  downloadProgress: number;
  uploadProgress: number;

  // Títulos y descripciones dinámicas
  taskTitle: string;
  taskDescription: string;

  // Estados de loading/completion
  isLoading: boolean;
  isCompleted: boolean;

  // Setters
  setDefaultExample: (value: number) => void;
  setVariantExample: (value: number) => void;
  setSizeExample: (value: number) => void;
  setInteractiveExample: (value: number) => void;

  setTaskProgress: (value: number) => void;
  setDownloadProgress: (value: number) => void;
  setUploadProgress: (value: number) => void;

  setTaskTitle: (title: string) => void;
  setTaskDescription: (description: string) => void;

  setIsLoading: (loading: boolean) => void;
  setIsCompleted: (completed: boolean) => void;

  // Utilidades
  incrementProgress: (
    key: keyof Pick<
      ProgressCardExamplesState,
      'taskProgress' | 'downloadProgress' | 'uploadProgress'
    >,
    increment?: number
  ) => void;
  resetProgress: (
    key: keyof Pick<
      ProgressCardExamplesState,
      'taskProgress' | 'downloadProgress' | 'uploadProgress'
    >
  ) => void;
  clearAllProgressCard: () => void;

  // Simuladores para demostración
  startSimulation: (type: 'task' | 'download' | 'upload') => void;
  stopSimulation: () => void;
}

export const useProgressCardExamples = create<ProgressCardExamplesState>(
  (set, get) => ({
    // Estados iniciales
    defaultExample: 0,
    variantExample: 25,
    sizeExample: 50,
    interactiveExample: 75,

    taskProgress: 0,
    downloadProgress: 0,
    uploadProgress: 0,

    taskTitle: 'Procesando archivo',
    taskDescription: 'Analizando contenido y aplicando transformaciones...',

    isLoading: false,
    isCompleted: false,

    // Setters básicos
    setDefaultExample: (value: number) =>
      set({ defaultExample: Math.max(0, Math.min(100, value)) }),
    setVariantExample: (value: number) =>
      set({ variantExample: Math.max(0, Math.min(100, value)) }),
    setSizeExample: (value: number) =>
      set({ sizeExample: Math.max(0, Math.min(100, value)) }),
    setInteractiveExample: (value: number) =>
      set({ interactiveExample: Math.max(0, Math.min(100, value)) }),

    setTaskProgress: (value: number) =>
      set({ taskProgress: Math.max(0, Math.min(100, value)) }),
    setDownloadProgress: (value: number) =>
      set({ downloadProgress: Math.max(0, Math.min(100, value)) }),
    setUploadProgress: (value: number) =>
      set({ uploadProgress: Math.max(0, Math.min(100, value)) }),

    setTaskTitle: (title: string) => set({ taskTitle: title }),
    setTaskDescription: (description: string) =>
      set({ taskDescription: description }),

    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    setIsCompleted: (completed: boolean) => set({ isCompleted: completed }),

    // Utilidades avanzadas
    incrementProgress: (key, increment = 10) => {
      const current = get()[key] as number;
      const newValue = Math.min(100, current + increment);
      set({ [key]: newValue });

      // Auto-complete cuando llega a 100
      if (newValue >= 100) {
        set({ isCompleted: true, isLoading: false });
      }
    },

    resetProgress: (key) => {
      set({ [key]: 0, isCompleted: false, isLoading: false });
    },

    clearAllProgressCard: () =>
      set({
        defaultExample: 0,
        variantExample: 25,
        sizeExample: 50,
        interactiveExample: 75,
        taskProgress: 0,
        downloadProgress: 0,
        uploadProgress: 0,
        taskTitle: 'Procesando archivo',
        taskDescription: 'Analizando contenido y aplicando transformaciones...',
        isLoading: false,
        isCompleted: false,
      }),

    // Simuladores para demostraciones
    startSimulation: (type) => {
      const progressKey = `${type}Progress` as keyof Pick<
        ProgressCardExamplesState,
        'taskProgress' | 'downloadProgress' | 'uploadProgress'
      >;

      set({
        isLoading: true,
        isCompleted: false,
        [progressKey]: 0,
      });

      // Simular progreso gradual
      const interval = setInterval(() => {
        const current = get()[progressKey] as number;
        const increment = Math.random() * 15 + 5; // Entre 5-20%
        const newValue = Math.min(100, current + increment);

        set({ [progressKey]: newValue });

        if (newValue >= 100) {
          set({ isCompleted: true, isLoading: false });
          clearInterval(interval);
        }
      }, 500);

      // Guardar el interval para poder detenerlo
      (window as any).progressSimulation = interval;
    },

    stopSimulation: () => {
      if ((window as any).progressSimulation) {
        clearInterval((window as any).progressSimulation);
        (window as any).progressSimulation = null;
      }
      set({ isLoading: false });
    },
  })
);

