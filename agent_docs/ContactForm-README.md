# ContactForm Molecule

## 📋 Descripción

`ContactForm` es un molecule completo y versátil que combina campos de nombre, email y mensaje para crear formularios de contacto, soporte, feedback y comunicación. Incluye validación integrada, manejo de estado con Zustand, seguridad automática y múltiples configuraciones predefinidas.

## 🎯 Características Principales

### ✅ Funcionalidades Core

- **Campos configurables** - Nombre, email y mensaje con validación opcional
- **Integración Zustand** - Manejo de estado robusto con patrón storeKey
- **Seguridad integrada** - Sanitización automática con `useSecureField`
- **Validación flexible** - Campos requeridos/opcionales configurables
- **Estados de loading** - Manejo de envío y estados de carga
- **Callbacks completos** - onSubmit, onReset, onChange

### 🎨 Variantes de Diseño

- **`default`** - Layout estándar con espaciado normal
- **`compact`** - Espaciado reducido para espacios limitados
- **`detailed`** - Espaciado amplio para mejor legibilidad
- **`minimal`** - Sin bordes ni sombras para integración suave

### 📏 Tamaños

- **`sm`** - Compacto para interfaces densas
- **`default`** - Tamaño estándar
- **`lg`** - Grande para mejor visibilidad

### 🎨 Esquemas de Color

- **`default`**, **`secondary`**, **`accent`**, **`destructive`**, **`muted`**, **`minimal`**, **`custom`**

## 📚 Casos de Uso

### 📧 Contacto General

```tsx
<ContactForm
  title="Contáctanos"
  description="Nos encantaría escuchar de ti"
  onSubmit={async (data) => {
    await sendContactMessage(data);
    showSuccessNotification('Mensaje enviado exitosamente');
  }}
/>
```

### 🆘 Soporte Técnico

```tsx
<ContactForm
  $colorScheme="destructive"
  title="Reportar Problema"
  description="Describe el problema que estás experimentando"
  nameLabel="Tu nombre"
  emailLabel="Email para seguimiento"
  messageLabel="Descripción del problema"
  submitText="Enviar Reporte"
  onSubmit={createSupportTicket}
/>
```

### 📰 Newsletter

```tsx
<ContactForm
  $colorScheme="accent"
  $variant="compact"
  showMessageField={false}
  title="Suscríbete"
  description="Recibe nuestras últimas noticias"
  submitText="Suscribirse"
  showResetButton={false}
  onSubmit={subscribeToNewsletter}
/>
```

### 💬 Feedback

```tsx
<ContactForm
  $colorScheme="secondary"
  title="Comparte tu Opinión"
  nameLabel="Tu nombre"
  emailLabel="Email (opcional)"
  messageLabel="Tu feedback"
  emailRequired={false}
  submitText="Enviar Feedback"
  onSubmit={submitFeedback}
/>
```

### 🏢 Solicitud de Demo

```tsx
<ContactForm
  $variant="detailed"
  title="Solicitar Demo"
  description="Agenda una demostración personalizada"
  nameLabel="Nombre completo"
  emailLabel="Email corporativo"
  messageLabel="Cuéntanos sobre tu empresa"
  submitText="Solicitar Demo"
  onSubmit={requestDemo}
/>
```

## 🔧 API Completa

### Props Principales

```tsx
interface ContactFormProps {
  // Configuración visual
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $custom?: string;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  nameStoreKey?: keyof T;
  emailStoreKey?: keyof T;
  messageStoreKey?: keyof T;

  // Contenido y etiquetas
  title?: string;
  description?: string;
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  submitText?: string;
  resetText?: string;

  // Placeholders
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;

  // Configuración de campos
  showNameField?: boolean;
  showEmailField?: boolean;
  showMessageField?: boolean;
  showResetButton?: boolean;

  // Validación y estado
  disabled?: boolean;
  loading?: boolean;
  nameRequired?: boolean;
  emailRequired?: boolean;
  messageRequired?: boolean;

  // Callbacks
  onSubmit?: (data: {
    name?: string;
    email?: string;
    message?: string;
  }) => void | Promise<void>;
  onReset?: () => void;
  onChange?: (field: string, value: string) => void;
}
```

## 🏪 Integración con Store (Zustand)

### Crear Store de Contacto

```tsx
// stores/contactForm.store.ts
import { create } from 'zustand';

interface ContactFormState {
  // Estados principales
  contactName: string;
  contactEmail: string;
  contactMessage: string;

  // Estados de soporte
  supportSubject: string;
  supportPriority: 'low' | 'medium' | 'high' | 'urgent';

  // Estados de envío
  isSubmitting: boolean;
  lastSubmission: Date | null;
  submissionCount: number;

  // Setters
  setContactName: (value: string) => void;
  setContactEmail: (value: string) => void;
  setContactMessage: (value: string) => void;
  setSupportSubject: (value: string) => void;
  setSupportPriority: (value: 'low' | 'medium' | 'high' | 'urgent') => void;

  // Utilidades
  clearForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  recordSubmission: () => void;
  validateForm: () => { isValid: boolean; errors: string[] };
}

export const useContactForm = create<ContactFormState>((set, get) => ({
  // Estados iniciales
  contactName: '',
  contactEmail: '',
  contactMessage: '',
  supportSubject: '',
  supportPriority: 'medium',
  isSubmitting: false,
  lastSubmission: null,
  submissionCount: 0,

  // Setters
  setContactName: (value) => set({ contactName: value }),
  setContactEmail: (value) => set({ contactEmail: value }),
  setContactMessage: (value) => set({ contactMessage: value }),
  setSupportSubject: (value) => set({ supportSubject: value }),
  setSupportPriority: (value) => set({ supportPriority: value }),

  // Utilidades
  clearForm: () =>
    set({
      contactName: '',
      contactEmail: '',
      contactMessage: '',
      supportSubject: '',
      supportPriority: 'medium',
    }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  recordSubmission: () =>
    set((state) => ({
      lastSubmission: new Date(),
      submissionCount: state.submissionCount + 1,
      isSubmitting: false,
    })),

  validateForm: () => {
    const state = get();
    const errors: string[] = [];

    if (!state.contactName.trim()) errors.push('Nombre es requerido');
    if (!state.contactEmail.trim()) errors.push('Email es requerido');
    if (!state.contactMessage.trim()) errors.push('Mensaje es requerido');

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
}));
```

### Usar Store con ContactForm

```tsx
import { useContactForm } from './stores/contactForm.store';

function ContactPage() {
  const contactStore = useContactForm();

  const handleSubmit = async (data: {
    name?: string;
    email?: string;
    message?: string;
  }) => {
    contactStore.setSubmitting(true);

    try {
      // Validar antes de enviar
      const validation = contactStore.validateForm();
      if (!validation.isValid) {
        alert('Errores: ' + validation.errors.join(', '));
        return;
      }

      // Enviar a API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        contactStore.recordSubmission();
        contactStore.clearForm();
        showSuccessNotification('Mensaje enviado exitosamente');
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      showErrorNotification('Error al enviar mensaje');
    } finally {
      contactStore.setSubmitting(false);
    }
  };

  return (
    <ContactForm
      $store={useContactForm}
      nameStoreKey="contactName"
      emailStoreKey="contactEmail"
      messageStoreKey="contactMessage"
      onSubmit={handleSubmit}
      loading={contactStore.isSubmitting}
    />
  );
}
```

## 🎨 Personalización Avanzada

### Custom Styling

```tsx
<ContactForm
  $custom="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200"
  className="shadow-2xl"
  title="Formulario Premium"
  // ... resto de props
/>
```

### Configuración Avanzada

```tsx
// Formulario de múltiples pasos
const MultiStepContact = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && (
        <ContactForm
          showMessageField={false}
          title="Paso 1: Información Personal"
          submitText="Siguiente"
          showResetButton={false}
          onSubmit={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <ContactForm
          showNameField={false}
          showEmailField={false}
          title="Paso 2: Tu Mensaje"
          submitText="Enviar"
          onSubmit={finalSubmit}
        />
      )}
    </>
  );
};
```

### Con Validación Custom

```tsx
<ContactForm
  title="Contacto con Validación"
  onChange={(field, value) => {
    // Validación en tiempo real
    if (field === 'email' && value && !isValidEmail(value)) {
      showValidationError('Email no válido');
    }

    if (field === 'message' && value.length > 1000) {
      showValidationError('Mensaje muy largo (máx. 1000 caracteres)');
    }
  }}
  onSubmit={async (data) => {
    // Validación final antes de envío
    if (!isValidData(data)) {
      throw new Error('Datos no válidos');
    }

    await submitToAPI(data);
  }}
/>
```

## 🔄 Patrones Comunes

### Sistema de Tickets

```tsx
// Sistema completo de soporte
const SupportSystem = () => {
  const [tickets, setTickets] = useState([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ContactForm
        $colorScheme="destructive"
        title="Reportar Problema"
        onSubmit={async (data) => {
          const ticket = await createTicket({
            ...data,
            priority: 'high',
            category: 'technical',
          });

          setTickets((prev) => [...prev, ticket]);
        }}
      />

      <div className="space-y-4">
        <h3>Tickets Recientes</h3>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
```

### Formulario con Attachments

```tsx
const ContactWithAttachments = () => {
  const [files, setFiles] = useState([]);

  return (
    <div className="space-y-6">
      <ContactForm
        title="Contacto con Archivos"
        onSubmit={async (data) => {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('message', data.message);

          files.forEach((file) => {
            formData.append('attachments', file);
          });

          await submitWithFiles(formData);
        }}
      />

      <FileUploader
        files={files}
        onFilesChange={setFiles}
        maxFiles={5}
        maxSize="10MB"
      />
    </div>
  );
};
```

## 🎯 Casos de Uso Especializados

### E-commerce: Consulta de Producto

```tsx
<ContactForm
  title="Consultar sobre este Producto"
  description="¿Tienes preguntas sobre especificaciones, disponibilidad o envío?"
  messageLabel="Tu consulta sobre el producto"
  messagePlaceholder="Pregunta sobre características, compatibilidad, disponibilidad..."
  submitText="Enviar Consulta"
  onSubmit={async (data) => {
    await createProductInquiry({
      ...data,
      productId: currentProduct.id,
      productName: currentProduct.name,
    });
  }}
/>
```

### SaaS: Solicitud de Funcionalidad

```tsx
<ContactForm
  $colorScheme="accent"
  title="Solicitar Nueva Funcionalidad"
  description="Ayúdanos a mejorar el producto"
  messageLabel="Describe la funcionalidad que necesitas"
  messagePlaceholder="Explica cómo esta funcionalidad mejoraría tu flujo de trabajo..."
  submitText="Enviar Solicitud"
  onSubmit={createFeatureRequest}
/>
```

### Educación: Consulta de Admisión

```tsx
<ContactForm
  $variant="detailed"
  title="Consulta de Admisión"
  description="¿Interesado en nuestros programas? Contáctanos"
  nameLabel="Nombre completo del estudiante"
  emailLabel="Email de contacto"
  messageLabel="Programa de interés y preguntas"
  submitText="Enviar Consulta"
  onSubmit={createAdmissionInquiry}
/>
```

## ⚡ Performance y Optimización

### Lazy Loading

```tsx
import { lazy, Suspense } from 'react';

const LazyContactForm = lazy(() =>
  import('@code-dev-col/tailwind-next').then((module) => ({
    default: module.ContactForm,
  }))
);

function ContactSection() {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <LazyContactForm />
    </Suspense>
  );
}
```

### Memoización

```tsx
import { memo, useCallback } from 'react';

const OptimizedContactForm = memo(ContactForm);

function ContactPage() {
  const handleSubmit = useCallback(async (data) => {
    // Lógica de envío memoizada
    await submitContact(data);
  }, []);

  return (
    <OptimizedContactForm
      onSubmit={handleSubmit}
      // ... otras props
    />
  );
}
```

## 🧪 Testing

```tsx
// test/ContactForm.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@code-dev-col/tailwind-next';

describe('ContactForm', () => {
  test('submits form with correct data', async () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <ContactForm onSubmit={onSubmit} />
    );

    fireEvent.change(getByLabelText(/nombre/i), {
      target: { value: 'Juan Pérez' },
    });

    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'juan@test.com' },
    });

    fireEvent.change(getByLabelText(/mensaje/i), {
      target: { value: 'Mensaje de prueba' },
    });

    fireEvent.click(getByText(/enviar/i));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Juan Pérez',
        email: 'juan@test.com',
        message: 'Mensaje de prueba',
      });
    });
  });

  test('validates required fields', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(<ContactForm onSubmit={onSubmit} />);

    fireEvent.click(getByText(/enviar/i));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
```

---

El `ContactForm` es una solución completa y flexible para todas las necesidades de comunicación en aplicaciones web modernas. Su integración con Zustand, seguridad automática y configurabilidad lo hacen ideal para cualquier caso de uso. 📧✨

