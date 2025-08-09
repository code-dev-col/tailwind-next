import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextArea } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';

// Store de ejemplo para el patrón storeKey avanzado
import { create } from 'zustand';

interface DemoTextStore {
  message: string;
  setMessage: (value: string) => void;
  feedback: string;
  setFeedback: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const useDemoTextStore = create<DemoTextStore>((set) => ({
  message: '',
  setMessage: (value) => set({ message: value }),
  feedback: 'Comentario inicial...',
  setFeedback: (value) => set({ feedback: value }),
  description: '',
  setDescription: (value) => set({ description: value }),
}));

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['default', 'destructive', 'ghost'],
      description: 'Variante visual del textarea',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del textarea',
    },
    $store: {
      control: 'text',
      description: 'Nombre del store de Zustand para manejo de estado',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el textarea está deshabilitado',
    },
    rows: {
      control: 'number',
      description: 'Número de filas',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Escribe tu mensaje aquí...',
    rows: 4,
  },
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Default</Label>
        <TextArea placeholder="Textarea por defecto" />
      </div>
      <div>
        <Label>Destructive</Label>
        <TextArea $variant="destructive" placeholder="Textarea con error" />
      </div>
      <div>
        <Label>Ghost</Label>
        <TextArea $variant="ghost" placeholder="Textarea transparente" />
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Small</Label>
        <TextArea $size="sm" placeholder="Textarea pequeño" />
      </div>
      <div>
        <Label>Default</Label>
        <TextArea placeholder="Textarea normal" />
      </div>
      <div>
        <Label>Large</Label>
        <TextArea $size="lg" placeholder="Textarea grande" />
      </div>
    </Container>
  ),
};

export const WithZustandStore: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold">
        TextArea conectado a Zustand Store (Legacy)
      </Text>
      <div>
        <Label htmlFor="zustand-textarea">Mensaje</Label>
        <TextArea
          id="zustand-textarea"
          $storeString="exampleTextAreaStore"
          placeholder="Este textarea está conectado a Zustand"
          rows={5}
        />
      </div>
      <Text $size="sm" $variant="muted">
        El contenido se sincroniza automáticamente con el store
      </Text>
    </Container>
  ),
};

export const WithStoreKeyPattern: Story = {
  render: () => {
    const message = useDemoTextStore((state) => state.message);
    const feedback = useDemoTextStore((state) => state.feedback);
    const description = useDemoTextStore((state) => state.description);

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold">
          Patrón StoreKey Avanzado - TextArea
        </Text>

        {/* TextArea para mensaje */}
        <div>
          <Label htmlFor="message">Mensaje principal</Label>
          <TextArea
            id="message"
            $store={useDemoTextStore}
            storeKey="message"
            placeholder="Escribe tu mensaje aquí..."
            rows={4}
          />
        </div>

        {/* TextArea para feedback */}
        <div>
          <Label htmlFor="feedback">Comentarios</Label>
          <TextArea
            id="feedback"
            $store={useDemoTextStore}
            storeKey="feedback"
            $variant="ghost"
            placeholder="Tus comentarios..."
            rows={3}
          />
        </div>

        {/* TextArea para descripción */}
        <div>
          <Label htmlFor="description">Descripción detallada</Label>
          <TextArea
            id="description"
            $store={useDemoTextStore}
            storeKey="description"
            $size="lg"
            placeholder="Proporciona una descripción detallada..."
            rows={6}
          />
        </div>

        {/* Estado actual */}
        <div className="bg-muted p-4 rounded-md">
          <Text $size="sm" $weight="medium" className="mb-2">
            Estado actual:
          </Text>
          <div className="space-y-1">
            <Text $size="xs" $variant="muted">
              <strong>Mensaje:</strong> {message || '(vacío)'}
            </Text>
            <Text $size="xs" $variant="muted">
              <strong>Comentarios:</strong> {feedback || '(vacío)'}
            </Text>
            <Text $size="xs" $variant="muted">
              <strong>Descripción:</strong> {description || '(vacío)'}
            </Text>
          </div>
        </div>

        <Text $size="sm" $variant="muted">
          ✨ Usando patrón:{' '}
          <code>$store={`{useStore}`} storeKey="propertyName"</code>
        </Text>
      </Container>
    );
  },
};
export const FormExample: Story = {
  render: () => (
    <Container
      $padding="p-6"
      $backgroundColor="bg-white"
      $borderRadius="rounded-lg"
      className="shadow-sm w-96">
      <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
        Formulario de Contacto
      </Text>

      <div className="space-y-4">
        <div>
          <Label htmlFor="message">Mensaje</Label>
          <TextArea
            id="message"
            placeholder="Escribe tu mensaje aquí..."
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="feedback">Comentarios adicionales</Label>
          <TextArea
            id="feedback"
            $variant="ghost"
            placeholder="Cualquier comentario adicional (opcional)"
            rows={3}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button $variant="default">Enviar</Button>
          <Button $variant="outline">Borrador</Button>
        </div>
      </div>
    </Container>
  ),
};

export const States: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Normal</Label>
        <TextArea placeholder="Textarea normal" />
      </div>
      <div>
        <Label>Con contenido</Label>
        <TextArea value="Este textarea tiene contenido inicial que puede ser editado por el usuario." />
      </div>
      <div>
        <Label>Deshabilitado</Label>
        <TextArea disabled placeholder="Este textarea está deshabilitado" />
      </div>
      <div>
        <Label>Solo lectura</Label>
        <TextArea
          readOnly
          value="Este contenido es de solo lectura y no puede ser modificado."
        />
      </div>
    </Container>
  ),
};

