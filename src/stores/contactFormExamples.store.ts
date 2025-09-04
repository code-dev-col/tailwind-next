import { create } from 'zustand';

interface ContactFormExamplesState {
  // Estados para diferentes stories
  defaultExample: string;
  variantExample: string;
  sizeExample: string;

  // Estados para el formulario básico
  contactName: string;
  contactEmail: string;
  contactMessage: string;

  // Estados para el ejemplo interactivo
  interactiveName: string;
  interactiveEmail: string;
  interactiveMessage: string;

  // Estados para el ejemplo completo
  supportName: string;
  supportEmail: string;
  supportSubject: string;
  supportMessage: string;
  supportPriority: string;

  // Estados para el ejemplo de newsletter
  newsletterName: string;
  newsletterEmail: string;

  // Estados para el ejemplo de feedback
  feedbackName: string;
  feedbackEmail: string;
  feedbackRating: string;
  feedbackMessage: string;

  // Setters para estados básicos
  setDefaultExample: (value: string) => void;
  setVariantExample: (value: string) => void;
  setSizeExample: (value: string) => void;

  // Setters para el formulario básico
  setContactName: (value: string) => void;
  setContactEmail: (value: string) => void;
  setContactMessage: (value: string) => void;

  // Setters para el ejemplo interactivo
  setInteractiveName: (value: string) => void;
  setInteractiveEmail: (value: string) => void;
  setInteractiveMessage: (value: string) => void;

  // Setters para el ejemplo completo
  setSupportName: (value: string) => void;
  setSupportEmail: (value: string) => void;
  setSupportSubject: (value: string) => void;
  setSupportMessage: (value: string) => void;
  setSupportPriority: (value: string) => void;

  // Setters para el ejemplo de newsletter
  setNewsletterName: (value: string) => void;
  setNewsletterEmail: (value: string) => void;

  // Setters para el ejemplo de feedback
  setFeedbackName: (value: string) => void;
  setFeedbackEmail: (value: string) => void;
  setFeedbackRating: (value: string) => void;
  setFeedbackMessage: (value: string) => void;

  // Utilidades de limpieza
  clearAllContactForm: () => void;
  clearBasicContact: () => void;
  clearInteractiveContact: () => void;
  clearSupportContact: () => void;
  clearNewsletterContact: () => void;
  clearFeedbackContact: () => void;
}

export const useContactFormExamples = create<ContactFormExamplesState>(
  (set) => ({
    // Estados iniciales
    defaultExample: '',
    variantExample: '',
    sizeExample: '',

    // Formulario básico
    contactName: '',
    contactEmail: '',
    contactMessage: '',

    // Ejemplo interactivo
    interactiveName: '',
    interactiveEmail: '',
    interactiveMessage: '',

    // Ejemplo completo
    supportName: '',
    supportEmail: '',
    supportSubject: '',
    supportMessage: '',
    supportPriority: '',

    // Newsletter
    newsletterName: '',
    newsletterEmail: '',

    // Feedback
    feedbackName: '',
    feedbackEmail: '',
    feedbackRating: '',
    feedbackMessage: '',

    // Setters básicos
    setDefaultExample: (value: string) => set({ defaultExample: value }),
    setVariantExample: (value: string) => set({ variantExample: value }),
    setSizeExample: (value: string) => set({ sizeExample: value }),

    // Setters para formulario básico
    setContactName: (value: string) => set({ contactName: value }),
    setContactEmail: (value: string) => set({ contactEmail: value }),
    setContactMessage: (value: string) => set({ contactMessage: value }),

    // Setters para ejemplo interactivo
    setInteractiveName: (value: string) => set({ interactiveName: value }),
    setInteractiveEmail: (value: string) => set({ interactiveEmail: value }),
    setInteractiveMessage: (value: string) =>
      set({ interactiveMessage: value }),

    // Setters para ejemplo completo
    setSupportName: (value: string) => set({ supportName: value }),
    setSupportEmail: (value: string) => set({ supportEmail: value }),
    setSupportSubject: (value: string) => set({ supportSubject: value }),
    setSupportMessage: (value: string) => set({ supportMessage: value }),
    setSupportPriority: (value: string) => set({ supportPriority: value }),

    // Setters para newsletter
    setNewsletterName: (value: string) => set({ newsletterName: value }),
    setNewsletterEmail: (value: string) => set({ newsletterEmail: value }),

    // Setters para feedback
    setFeedbackName: (value: string) => set({ feedbackName: value }),
    setFeedbackEmail: (value: string) => set({ feedbackEmail: value }),
    setFeedbackRating: (value: string) => set({ feedbackRating: value }),
    setFeedbackMessage: (value: string) => set({ feedbackMessage: value }),

    // Utilidades de limpieza
    clearAllContactForm: () =>
      set({
        defaultExample: '',
        variantExample: '',
        sizeExample: '',
        contactName: '',
        contactEmail: '',
        contactMessage: '',
        interactiveName: '',
        interactiveEmail: '',
        interactiveMessage: '',
        supportName: '',
        supportEmail: '',
        supportSubject: '',
        supportMessage: '',
        supportPriority: '',
        newsletterName: '',
        newsletterEmail: '',
        feedbackName: '',
        feedbackEmail: '',
        feedbackRating: '',
        feedbackMessage: '',
      }),

    clearBasicContact: () =>
      set({
        contactName: '',
        contactEmail: '',
        contactMessage: '',
      }),

    clearInteractiveContact: () =>
      set({
        interactiveName: '',
        interactiveEmail: '',
        interactiveMessage: '',
      }),

    clearSupportContact: () =>
      set({
        supportName: '',
        supportEmail: '',
        supportSubject: '',
        supportMessage: '',
        supportPriority: '',
      }),

    clearNewsletterContact: () =>
      set({
        newsletterName: '',
        newsletterEmail: '',
      }),

    clearFeedbackContact: () =>
      set({
        feedbackName: '',
        feedbackEmail: '',
        feedbackRating: '',
        feedbackMessage: '',
      }),
  })
);

