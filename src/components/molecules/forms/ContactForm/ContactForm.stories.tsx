import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';
import { useContactFormExamples } from '../../../../stores/contactFormExamples.store';
import { useState } from 'react';

const meta: Meta<typeof ContactForm> = {
  title: 'Molecules/Forms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Formulario de contacto completo que combina campos de nombre, email y mensaje con validación y seguridad integrada.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContactForm
      $store={useContactFormExamples}
      nameStoreKey="contactName"
      emailStoreKey="contactEmail"
      messageStoreKey="contactMessage"
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <ContactForm
          $variant="default"
          title="Formulario Default"
          description="Layout estándar con espaciado normal"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Compact</h3>
        <ContactForm
          $variant="compact"
          title="Formulario Compacto"
          description="Espaciado reducido para espacios limitados"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Detailed</h3>
        <ContactForm
          $variant="detailed"
          title="Formulario Detallado"
          description="Espaciado amplio para mejor legibilidad"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal</h3>
        <ContactForm
          $variant="minimal"
          title="Formulario Mínimo"
          description="Sin bordes ni sombras"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <ContactForm
          $size="sm"
          title="Contacto Pequeño"
          description="Tamaño compacto"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <ContactForm
          $size="default"
          title="Contacto Estándar"
          description="Tamaño por defecto"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <ContactForm
          $size="lg"
          title="Contacto Grande"
          description="Tamaño amplio para mejor visibilidad"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <ContactForm
        $colorScheme="default"
        title="Default"
        description="Esquema de color por defecto"
        $variant="compact"
      />

      <ContactForm
        $colorScheme="secondary"
        title="Secondary"
        description="Esquema secundario en azul"
        $variant="compact"
      />

      <ContactForm
        $colorScheme="accent"
        title="Accent"
        description="Esquema de acento"
        $variant="compact"
      />

      <ContactForm
        $colorScheme="muted"
        title="Muted"
        description="Esquema neutro suave"
        $variant="compact"
      />
    </div>
  ),
};

export const WithInteraction: Story = {
  render: () => {
    const [submissions, setSubmissions] = useState<
      Array<{
        name?: string;
        email?: string;
        message?: string;
        timestamp: string;
      }>
    >([]);

    const handleSubmit = async (data: {
      name?: string;
      email?: string;
      message?: string;
    }) => {
      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmissions((prev) => [
        {
          ...data,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      // Limpiar formulario después del envío
      useContactFormExamples.getState().clearInteractiveContact();
    };

    const handleReset = () => {
      useContactFormExamples.getState().clearInteractiveContact();
    };

    return (
      <div className="max-w-4xl space-y-6">
        <ContactForm
          $store={useContactFormExamples}
          nameStoreKey="interactiveName"
          emailStoreKey="interactiveEmail"
          messageStoreKey="interactiveMessage"
          title="Formulario Interactivo"
          description="Prueba el envío y reset del formulario"
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        {submissions.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Envíos Recibidos:</h3>
            <div className="space-y-3">
              {submissions.map((submission, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded text-sm">
                  <div className="text-xs text-muted-foreground mb-1">
                    {submission.timestamp}
                  </div>
                  <div>
                    <strong>Nombre:</strong>{' '}
                    {submission.name || 'No proporcionado'}
                  </div>
                  <div>
                    <strong>Email:</strong>{' '}
                    {submission.email || 'No proporcionado'}
                  </div>
                  <div>
                    <strong>Mensaje:</strong>{' '}
                    {submission.message || 'No proporcionado'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const CustomConfiguration: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Solo Email y Mensaje</h3>
        <ContactForm
          showNameField={false}
          emailLabel="Tu Email"
          messageLabel="¿En qué podemos ayudarte?"
          submitText="Enviar Consulta"
          title="Soporte Rápido"
          description="Solo necesitamos tu email y tu consulta"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sin Campo de Reset</h3>
        <ContactForm
          showResetButton={false}
          title="Formulario Simple"
          description="Sin botón de limpiar"
          submitText="Enviar Ahora"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Campos Opcionales</h3>
        <ContactForm
          nameRequired={false}
          emailRequired={false}
          messageRequired={false}
          title="Formulario Flexible"
          description="Todos los campos son opcionales"
          nameLabel="Nombre (opcional)"
          emailLabel="Email (opcional)"
          messageLabel="Mensaje (opcional)"
        />
      </div>
    </div>
  ),
};

export const SpecializedForms: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Soporte Técnico</h3>
        <ContactForm
          $colorScheme="destructive"
          title="Reportar Problema"
          description="Describe el problema que estás experimentando"
          nameLabel="Tu nombre"
          emailLabel="Email para seguimiento"
          messageLabel="Descripción del problema"
          submitText="Enviar Reporte"
          resetText="Cancelar"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
        <ContactForm
          $colorScheme="accent"
          $variant="compact"
          showMessageField={false}
          title="Suscríbete"
          description="Recibe nuestras últimas noticias"
          nameLabel="Tu nombre"
          emailLabel="Tu email"
          submitText="Suscribirse"
          showResetButton={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Feedback</h3>
        <ContactForm
          $colorScheme="secondary"
          title="Comparte tu Opinión"
          description="Nos encanta escuchar de nuestros usuarios"
          nameLabel="Tu nombre"
          emailLabel="Email (opcional)"
          messageLabel="Tu feedback"
          emailRequired={false}
          submitText="Enviar Feedback"
        />
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Estado Normal</h3>
        <ContactForm
          title="Formulario Normal"
          description="Todos los campos habilitados"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Estado Cargando</h3>
        <ContactForm
          loading={true}
          title="Enviando..."
          description="Por favor espera mientras procesamos tu mensaje"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Estado Deshabilitado</h3>
        <ContactForm
          disabled={true}
          title="Formulario Deshabilitado"
          description="Este formulario está temporalmente deshabilitado"
        />
      </div>
    </div>
  ),
};

export const WithDebugInfo: Story = {
  render: () => {
    const store = useContactFormExamples();

    return (
      <div className="max-w-4xl space-y-6">
        <ContactForm
          $store={useContactFormExamples}
          nameStoreKey="contactName"
          emailStoreKey="contactEmail"
          messageStoreKey="contactMessage"
          title="Formulario con Debug"
          description="Observa los cambios de estado en tiempo real"
          onChange={(field, value) => {
            console.log(`Campo ${field} cambió a:`, value);
          }}
        />

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Estado Actual:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted/50 p-3 rounded">
              <div className="font-medium">Nombre:</div>
              <div className="text-muted-foreground break-all">
                {store.contactName || '(vacío)'}
              </div>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <div className="font-medium">Email:</div>
              <div className="text-muted-foreground break-all">
                {store.contactEmail || '(vacío)'}
              </div>
            </div>
            <div className="bg-muted/50 p-3 rounded">
              <div className="font-medium">Mensaje:</div>
              <div className="text-muted-foreground break-all">
                {store.contactMessage || '(vacío)'}
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => store.clearBasicContact()}
              className="px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm">
              Limpiar Todo
            </button>
            <button
              onClick={() => {
                store.setContactName('Juan Pérez');
                store.setContactEmail('juan@example.com');
                store.setContactMessage('Este es un mensaje de prueba.');
              }}
              className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
              Llenar con Datos de Prueba
            </button>
          </div>
        </div>
      </div>
    );
  },
};

