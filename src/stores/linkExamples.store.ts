import { create } from 'zustand';

interface LinkExamplesState {
  // Basic examples
  defaultExample: string;
  secondaryExample: string;
  destructiveExample: string;
  accentExample: string;
  mutedExample: string;
  minimalExample: string;

  // External links
  externalExample: string;
  githubExample: string;
  emailExample: string;

  // Internal links
  internalExample: string;
  dashboardExample: string;
  profileExample: string;

  // Interactive examples
  interactiveExample: string;
  downloadExample: string;

  // Actions
  setDefaultExample: (value: string) => void;
  setSecondaryExample: (value: string) => void;
  setDestructiveExample: (value: string) => void;
  setAccentExample: (value: string) => void;
  setMutedExample: (value: string) => void;
  setMinimalExample: (value: string) => void;
  setExternalExample: (value: string) => void;
  setGithubExample: (value: string) => void;
  setEmailExample: (value: string) => void;
  setInternalExample: (value: string) => void;
  setDashboardExample: (value: string) => void;
  setProfileExample: (value: string) => void;
  setInteractiveExample: (value: string) => void;
  setDownloadExample: (value: string) => void;

  // Utility action
  clearAllLink: () => void;
}

export const useLinkExamples = create<LinkExamplesState>((set) => ({
  // Initial state with meaningful defaults
  defaultExample: '#default-link',
  secondaryExample: '#secondary-link',
  destructiveExample: '#destructive-action',
  accentExample: '#accent-link',
  mutedExample: '#muted-link',
  minimalExample: '#minimal-link',
  externalExample: 'https://www.google.com',
  githubExample: 'https://github.com',
  emailExample: 'mailto:example@test.com',
  internalExample: '/internal-page',
  dashboardExample: '/dashboard',
  profileExample: '/profile',
  interactiveExample: '#interactive',
  downloadExample: '/download/file.pdf',

  // Setters
  setDefaultExample: (value: string) => set({ defaultExample: value }),
  setSecondaryExample: (value: string) => set({ secondaryExample: value }),
  setDestructiveExample: (value: string) => set({ destructiveExample: value }),
  setAccentExample: (value: string) => set({ accentExample: value }),
  setMutedExample: (value: string) => set({ mutedExample: value }),
  setMinimalExample: (value: string) => set({ minimalExample: value }),
  setExternalExample: (value: string) => set({ externalExample: value }),
  setGithubExample: (value: string) => set({ githubExample: value }),
  setEmailExample: (value: string) => set({ emailExample: value }),
  setInternalExample: (value: string) => set({ internalExample: value }),
  setDashboardExample: (value: string) => set({ dashboardExample: value }),
  setProfileExample: (value: string) => set({ profileExample: value }),
  setInteractiveExample: (value: string) => set({ interactiveExample: value }),
  setDownloadExample: (value: string) => set({ downloadExample: value }),

  // Clear all
  clearAllLink: () =>
    set({
      defaultExample: '',
      secondaryExample: '',
      destructiveExample: '',
      accentExample: '',
      mutedExample: '',
      minimalExample: '',
      externalExample: '',
      githubExample: '',
      emailExample: '',
      internalExample: '',
      dashboardExample: '',
      profileExample: '',
      interactiveExample: '',
      downloadExample: '',
    }),
}));

