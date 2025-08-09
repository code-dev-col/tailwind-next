import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { create } from 'zustand';
import { Container } from '../components/atoms/Container';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { TextArea } from '../components/atoms/TextArea';
import { Dropdown } from '../components/atoms/Dropdown';
import { RadioButton } from '../components/atoms/RadioButton';
import { CheckBox } from '../components/atoms/CheckBox';
import { Label } from '../components/atoms/Label';

// Definir interfaces para el formulario
interface ContactFormData {
  name: string;
  email: string;
  country: string;
  contactPreference: string;
  message: string;
  newsletter: boolean;
  interests: string[];
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCountry: (country: string) => void;
  setContactPreference: (preference: string) => void;
  setMessage: (message: string) => void;
  setNewsletter: (newsletter: boolean) => void;
  setInterests: (interests: string[]) => void;
  reset: () => void;
}

// Store del formulario de contacto - ejemplo completo
const useContactFormStore = create<ContactFormData>()((set) => ({
  name: '',
  email: '',
  country: '',
  contactPreference: 'email',
  message: '',
  newsletter: false,
  interests: [],
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setCountry: (country) => set({ country }),
  setContactPreference: (preference) => set({ contactPreference: preference }),
  setMessage: (message) => set({ message }),
  setNewsletter: (newsletter) => set({ newsletter }),
  setInterests: (interests) => set({ interests }),
  reset: () =>
    set({
      name: '',
      email: '',
      country: '',
      contactPreference: 'email',
      message: '',
      newsletter: false,
      interests: [],
    }),
}));

const countryOptions = [
  { value: 'es', label: 'España' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'fr', label: 'Francia' },
  { value: 'de', label: 'Alemania' },
  { value: 'it', label: 'Italia' },
  { value: 'uk', label: 'Reino Unido' },
];

const meta: Meta = {
  title: 'Examples/Complete Form with Zustand',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteContactForm: Story = {
  render: () => {
    const formData = useContactFormStore();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        contactPreference: formData.contactPreference,
        message: formData.message,
        newsletter: formData.newsletter,
        interests: formData.interests,
      });
      alert('Formulario enviado! Revisa la consola para ver los datos.');
    };

    return (
      <Container $padding="p-6" className="min-h-screen bg-gray-50">
        <Container $maxWidth="max-w-2xl" className="mx-auto">
          <Container
            $padding="p-8"
            $backgroundColor="bg-white"
            $borderRadius="rounded-lg"
            className="shadow-sm">
            <Text
              as="h1"
              $size="3xl"
              $weight="bold"
              className="mb-2 text-center">
              Formulario de Contacto
            </Text>
            <Text $variant="muted" className="text-center mb-8">
              Ejemplo completo usando todos los componentes con Zustand
            </Text>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información personal */}
              <div className="space-y-4">
                <Text as="h2" $size="lg" $weight="semibold">
                  Información Personal
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      $store={useContactFormStore}
                      storeKey="name"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      $store={useContactFormStore}
                      storeKey="email"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">País</Label>
                  <Dropdown
                    id="country"
                    $store={useContactFormStore}
                    storeKey="country"
                    options={countryOptions}
                    placeholder="Seleccionar país"
                  />
                </div>
              </div>

              {/* Preferencias de contacto */}
              <div className="space-y-4">
                <Text as="h2" $size="lg" $weight="semibold">
                  Preferencias de Contacto
                </Text>

                <div>
                  <Label className="mb-3 block">
                    ¿Cómo prefieres que te contactemos?
                  </Label>
                  <div className="space-y-2">
                    <RadioButton
                      $store={useContactFormStore}
                      storeKey="contactPreference"
                      name="contact-preference"
                      value="email"
                      label="Email"
                      description="Respuesta por correo electrónico"
                    />
                    <RadioButton
                      $store={useContactFormStore}
                      storeKey="contactPreference"
                      name="contact-preference"
                      value="phone"
                      label="Teléfono"
                      description="Llamada telefónica"
                    />
                    <RadioButton
                      $store={useContactFormStore}
                      storeKey="contactPreference"
                      name="contact-preference"
                      value="whatsapp"
                      label="WhatsApp"
                      description="Mensaje por WhatsApp"
                    />
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <Label htmlFor="message">Mensaje *</Label>
                <TextArea
                  id="message"
                  $store={useContactFormStore}
                  storeKey="message"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={5}
                />
              </div>

              {/* Intereses */}
              <div className="space-y-4">
                <Text as="h2" $size="lg" $weight="semibold">
                  Áreas de Interés
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <CheckBox
                    $store={useContactFormStore}
                    storeKey="interests"
                    value="web-development"
                    label="Desarrollo Web"
                    description="Frontend y backend"
                  />
                  <CheckBox
                    $store={useContactFormStore}
                    storeKey="interests"
                    value="mobile-apps"
                    label="Apps Móviles"
                    description="iOS y Android"
                  />
                  <CheckBox
                    $store={useContactFormStore}
                    storeKey="interests"
                    value="ui-design"
                    label="Diseño UI/UX"
                    description="Interfaces de usuario"
                  />
                  <CheckBox
                    $store={useContactFormStore}
                    storeKey="interests"
                    value="consulting"
                    label="Consultoría"
                    description="Asesoramiento técnico"
                  />
                </div>
              </div>

              {/* Newsletter */}
              <div className="border-t pt-6">
                <CheckBox
                  checked={formData.newsletter}
                  onChange={(checked) => formData.setNewsletter(checked)}
                  label="Suscribirse al newsletter"
                  description="Recibir actualizaciones y contenido exclusivo por email"
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" $variant="default" className="flex-1">
                  Enviar Formulario
                </Button>
                <Button
                  type="button"
                  $variant="outline"
                  onClick={() => formData.reset()}
                  className="flex-1">
                  Limpiar Formulario
                </Button>
              </div>
            </form>

            {/* Debug info */}
            <Container
              $padding="p-4"
              $backgroundColor="bg-gray-50"
              $borderRadius="rounded"
              className="mt-8">
              <Text as="h3" $weight="semibold" className="mb-2">
                Estado del Formulario (Debug)
              </Text>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(
                  {
                    name: formData.name,
                    email: formData.email,
                    country: formData.country,
                    contactPreference: formData.contactPreference,
                    message: formData.message,
                    newsletter: formData.newsletter,
                    interests: formData.interests,
                  },
                  null,
                  2
                )}
              </pre>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  },
};

