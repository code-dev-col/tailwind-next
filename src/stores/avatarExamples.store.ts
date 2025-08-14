import { create } from 'zustand';

interface AvatarExamplesState {
  // Basic examples with different types of content
  defaultExample: string;
  imageExample: string;
  textExample: string;
  emailExample: string;

  // Color scheme examples
  secondaryExample: string;
  destructiveExample: string;
  accentExample: string;
  mutedExample: string;
  minimalExample: string;

  // Size examples
  sizeExample: string;

  // Interactive examples
  interactiveExample: string;
  statusExample: string;

  // Actions
  setDefaultExample: (value: string) => void;
  setImageExample: (value: string) => void;
  setTextExample: (value: string) => void;
  setEmailExample: (value: string) => void;
  setSecondaryExample: (value: string) => void;
  setDestructiveExample: (value: string) => void;
  setAccentExample: (value: string) => void;
  setMutedExample: (value: string) => void;
  setMinimalExample: (value: string) => void;
  setSizeExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setStatusExample: (value: string) => void;

  // Utility action
  clearAllAvatar: () => void;
}

export const useAvatarExamples = create<AvatarExamplesState>((set) => ({
  // Initial state - some with meaningful defaults for better UX
  defaultExample: 'John Doe',
  imageExample:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  textExample: 'Maria Garcia',
  emailExample: 'user@example.com',
  secondaryExample: 'Alex Smith',
  destructiveExample: 'Error User',
  accentExample: 'VIP Member',
  mutedExample: 'Guest User',
  minimalExample: 'Simple User',
  sizeExample: 'Size Demo',
  interactiveExample: 'Click Me',
  statusExample: 'Online User',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setImageExample: (value: string) => set({ imageExample: value }),
  setTextExample: (value: string) => set({ textExample: value }),
  setEmailExample: (value: string) => set({ emailExample: value }),
  setSecondaryExample: (value: string) => set({ secondaryExample: value }),
  setDestructiveExample: (value: string) => set({ destructiveExample: value }),
  setAccentExample: (value: string) => set({ accentExample: value }),
  setMutedExample: (value: string) => set({ mutedExample: value }),
  setMinimalExample: (value: string) => set({ minimalExample: value }),
  setSizeExample: (value: string) => set({ sizeExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setStatusExample: (value: string) => set({ statusExample: value }),

  // Clear all
  clearAllAvatar: () =>
    set({
      defaultExample: '',
      imageExample: '',
      textExample: '',
      emailExample: '',
      secondaryExample: '',
      destructiveExample: '',
      accentExample: '',
      mutedExample: '',
      minimalExample: '',
      sizeExample: '',
      interactiveExample: '',
      statusExample: '',
    }),
}));

