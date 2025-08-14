import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckBox } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';
import {
  useCheckboxExamples,
  useCheckboxExamplesStore,
} from '../../../stores/checkboxExamples.store';

// Store de ejemplo para el patrón storeKey avanzado
import { create } from 'zustand';

interface DemoPreferencesStore {
  interests: string[];
  setInterests: (value: string[]) => void;
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  newsletter: boolean;
  setNewsletter: (value: boolean) => void;
}

const useDemoPreferencesStore = create<DemoPreferencesStore>((set) => ({
  interests: ['web-development'],
  setInterests: (value) => set({ interests: value }),
  notifications: true,
  setNotifications: (value) => set({ notifications: value }),
  newsletter: false,
  setNewsletter: (value) => set({ newsletter: value }),
}));

const meta: Meta<typeof CheckBox> = {
  title: 'Atoms/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['default', 'destructive', 'ghost'],
      description: 'Variante visual del checkbox',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del checkbox',
    },
    $store: {
      control: 'text',
      description: 'Nombre del store de Zustand para manejo de estado',
    },
    value: {
      control: 'text',
      description: 'Valor del checkbox (para arrays)',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del checkbox',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
    checked: {
      control: 'boolean',
      description: 'Si el checkbox está marcado',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado indeterminado del checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el checkbox está deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
    description: 'Al marcar esta casilla, acepta nuestros términos de servicio',
  },
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Variantes
      </Text>

      <CheckBox label="Default" description="Checkbox por defecto" />
      <CheckBox
        $variant="destructive"
        label="Destructive"
        description="Checkbox con estilo destructivo"
      />
      <CheckBox
        $variant="ghost"
        label="Ghost"
        description="Checkbox con estilo transparente"
      />
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Tamaños
      </Text>

      <CheckBox $size="sm" label="Small" description="Checkbox pequeño" />
      <CheckBox label="Default" description="Checkbox normal" />
      <CheckBox $size="lg" label="Large" description="Checkbox grande" />
    </Container>
  ),
};

export const WithZustandStore: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold">
        CheckBoxes conectados a Zustand Store (Legacy)
      </Text>

      <div className="space-y-4">
        {/* Checkbox simple */}
        <div>
          <Text $size="sm" $weight="medium" className="mb-2">
            Configuración simple:
          </Text>
          <CheckBox
            $storeString="exampleSingleCheckStore"
            label="Recibir notificaciones"
            description="Habilitar notificaciones push"
          />
        </div>

        {/* Checkboxes múltiples */}
        <div>
          <Text $size="sm" $weight="medium" className="mb-2">
            Selección múltiple:
          </Text>
          <div className="space-y-2">
            <CheckBox
              $storeString="exampleMultiCheckStore"
              value="option1"
              label="Opción 1"
              description="Primera opción disponible"
            />
            <CheckBox
              $storeString="exampleMultiCheckStore"
              value="option2"
              label="Opción 2"
              description="Segunda opción disponible"
            />
            <CheckBox
              $storeString="exampleMultiCheckStore"
              value="option3"
              label="Opción 3"
              description="Tercera opción disponible"
            />
            <CheckBox
              $storeString="exampleMultiCheckStore"
              value="option4"
              label="Opción 4"
              description="Cuarta opción disponible"
            />
          </div>
        </div>
      </div>

      <Text $size="sm" $variant="muted">
        Los estados se sincronizan automáticamente con los stores
      </Text>
    </Container>
  ),
};

export const WithStoreKeyPattern: Story = {
  render: () => {
    const interests = useDemoPreferencesStore((state) => state.interests);
    const notifications = useDemoPreferencesStore(
      (state) => state.notifications
    );
    const newsletter = useDemoPreferencesStore((state) => state.newsletter);

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold">
          Patrón StoreKey Avanzado - CheckBox
        </Text>

        {/* Intereses múltiples (array) */}
        <div>
          <Label className="mb-3 block">Áreas de interés</Label>
          <div className="space-y-2">
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="interests"
              value="web-development"
              label="Desarrollo Web"
              description="Frontend y backend"
            />
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="interests"
              value="mobile-apps"
              label="Apps Móviles"
              description="iOS y Android"
            />
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="interests"
              value="ui-design"
              label="Diseño UI/UX"
              description="Interfaces de usuario"
            />
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="interests"
              value="consulting"
              label="Consultoría"
              description="Asesoramiento técnico"
            />
          </div>
        </div>

        {/* Preferencias booleanas */}
        <div>
          <Label className="mb-3 block">Configuración de notificaciones</Label>
          <div className="space-y-2">
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="notifications"
              label="Recibir notificaciones"
              description="Notificaciones push en tiempo real"
            />
            <CheckBox
              $store={useDemoPreferencesStore}
              storeKey="newsletter"
              label="Newsletter semanal"
              description="Recibir newsletter por email"
            />
          </div>
        </div>

        {/* Estado actual */}
        <div className="bg-muted p-4 rounded-md">
          <Text $size="sm" $weight="medium" className="mb-2">
            Estado actual:
          </Text>
          <Text $size="sm" $variant="muted">
            Intereses: [{interests.join(', ')}]<br />
            Notificaciones: {notifications ? 'Sí' : 'No'}
            <br />
            Newsletter: {newsletter ? 'Sí' : 'No'}
          </Text>
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
        Configuración de Cuenta
      </Text>

      <div className="space-y-6">
        {/* Configuración de privacidad */}
        <div>
          <Label className="mb-3 block">Configuración de privacidad</Label>
          <div className="space-y-3">
            <CheckBox
              label="Perfil público"
              description="Tu perfil será visible para otros usuarios"
            />
            <CheckBox
              label="Mostrar email"
              description="Tu dirección de email será visible en tu perfil"
            />
            <CheckBox
              $variant="destructive"
              label="Eliminar datos al cerrar cuenta"
              description="Todos tus datos serán eliminados permanentemente"
            />
          </div>
        </div>

        {/* Notificaciones */}
        <div>
          <Label className="mb-3 block">Notificaciones</Label>
          <div className="space-y-3">
            <CheckBox
              label="Notificaciones por email"
              description="Recibir actualizaciones importantes"
              checked
            />
            <CheckBox
              label="Notificaciones push"
              description="Notificaciones en tiempo real"
            />
            <CheckBox
              label="Newsletter semanal"
              description="Resumen semanal de contenido"
            />
          </div>
        </div>

        {/* Términos */}
        <div>
          <CheckBox
            label="Acepto los términos y condiciones"
            description="He leído y acepto los términos de servicio"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button $variant="default">Guardar configuración</Button>
          <Button $variant="outline">Cancelar</Button>
        </div>
      </div>
    </Container>
  ),
};

export const States: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Estados
      </Text>

      <CheckBox label="Sin marcar" description="Checkbox en estado normal" />
      <CheckBox label="Marcado" description="Checkbox seleccionado" checked />
      <CheckBox
        label="Indeterminado"
        description="Estado parcialmente seleccionado"
        indeterminate
      />
      <CheckBox
        label="Deshabilitado"
        description="Checkbox deshabilitado"
        disabled
      />
      <CheckBox
        label="Deshabilitado y marcado"
        description="Checkbox deshabilitado pero seleccionado"
        disabled
        checked
      />
    </Container>
  ),
};

export const WithoutLabels: Story = {
  render: () => (
    <Container className="space-y-4">
      <Text as="h3" $weight="semibold" className="mb-2">
        Sin etiquetas
      </Text>

      <div className="flex gap-4 items-center">
        <CheckBox />
        <CheckBox checked />
        <CheckBox indeterminate />
        <CheckBox disabled />
        <CheckBox disabled checked />
      </div>

      <Text $size="sm" $variant="muted">
        Checkboxes sin etiquetas para casos de uso específicos como tablas
      </Text>
    </Container>
  ),
};

export const IndeterminateExample: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = React.useState(false);
    const [childStates, setChildStates] = React.useState([false, false, false]);

    const allChecked = childStates.every(Boolean);
    const someChecked = childStates.some(Boolean);
    const indeterminate = someChecked && !allChecked;

    React.useEffect(() => {
      setParentChecked(allChecked);
    }, [allChecked]);

    const handleParentChange = (checked: boolean) => {
      setParentChecked(checked);
      setChildStates([checked, checked, checked]);
    };

    const handleChildChange = (index: number, checked: boolean) => {
      const newStates = [...childStates];
      newStates[index] = checked;
      setChildStates(newStates);
    };

    return (
      <Container className="w-80">
        <Text as="h3" $weight="semibold" className="mb-4">
          Ejemplo de estado indeterminado
        </Text>

        <div className="space-y-3">
          <CheckBox
            label="Seleccionar todo"
            description="Marcar/desmarcar todas las opciones"
            checked={parentChecked}
            indeterminate={indeterminate}
            onChange={handleParentChange}
          />

          <div className="ml-6 space-y-2">
            <CheckBox
              label="Opción 1"
              checked={childStates[0]}
              onChange={(checked) => handleChildChange(0, checked)}
            />
            <CheckBox
              label="Opción 2"
              checked={childStates[1]}
              onChange={(checked) => handleChildChange(1, checked)}
            />
            <CheckBox
              label="Opción 3"
              checked={childStates[2]}
              onChange={(checked) => handleChildChange(2, checked)}
            />
          </div>
        </div>

        <Text $size="sm" $variant="muted" className="mt-4">
          El checkbox padre muestra estado indeterminado cuando algunos hijos
          están seleccionados
        </Text>
      </Container>
    );
  },
};

// 🎨 ===== THEME.CSS COLOR SCHEMES =====
export const ColorSchemes: Story = {
  render: () => (
    <Container className="space-y-6 w-96">
      <Text as="h3" $weight="semibold" className="mb-4">
        Esquemas de Color theme.css
      </Text>

      <div className="space-y-4">
        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Default (Primary)
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="default"
              label="Acepto términos y condiciones"
              description="Checkbox con esquema default"
            />
            <CheckBox
              $colorScheme="default"
              $size="sm"
              label="Newsletter semanal"
              checked
            />
            <CheckBox
              $colorScheme="default"
              $size="lg"
              label="Promociones especiales"
            />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Secondary
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="secondary"
              label="Notificaciones secundarias"
              description="Estilo turquesa pastel"
            />
            <CheckBox
              $colorScheme="secondary"
              label="Configuración opcional"
              checked
            />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Destructive
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="destructive"
              label="Eliminar datos permanentemente"
              description="Acción irreversible"
            />
            <CheckBox
              $colorScheme="destructive"
              label="Confirmar eliminación"
              checked
            />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Accent
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="accent"
              label="Función premium"
              description="Características especiales"
            />
            <CheckBox $colorScheme="accent" label="Destacar perfil" checked />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Muted
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="muted"
              label="Configuración avanzada"
              description="Opciones adicionales"
            />
            <CheckBox
              $colorScheme="muted"
              label="Mostrar elementos ocultos"
              checked
            />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Minimal
          </Text>
          <div className="space-y-2">
            <CheckBox
              $colorScheme="minimal"
              label="Modo simplificado"
              description="Interfaz minimalista"
            />
            <CheckBox
              $colorScheme="minimal"
              label="Ocultar decoraciones"
              checked
            />
          </div>
        </div>

        <div>
          <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
            Legacy Variants (Backward Compatibility)
          </Text>
          <div className="space-y-2">
            <CheckBox $variant="default" label="Legacy default" />
            <CheckBox
              $variant="destructive"
              label="Legacy destructive"
              checked
            />
            <CheckBox $variant="ghost" label="Legacy ghost (→minimal)" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <Text $size="sm" className="text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Estos esquemas utilizan
          las variables CSS definidas en theme.css, proporcionando consistencia
          visual y soporte para modo oscuro automático.
        </Text>
      </div>
    </Container>
  ),
};

export const ColorSchemeWithStore: Story = {
  render: () => {
    const {
      acceptTerms,
      newsletter,
      notifications,
      marketing,
      interests,
      skills,
      setAcceptTerms,
      setNewsletter,
      setNotifications,
      setMarketing,
      setInterests,
      setSkills,
      clearAllCheckboxes,
      getCheckedCount,
      selectAllInterests,
      selectAllSkills,
      deselectAllPreferences,
    } = useCheckboxExamples();

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold" className="mb-4">
          Esquemas de Color con Store
        </Text>

        <div className="space-y-4">
          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Checkboxes Básicos
            </Text>
            <div className="space-y-2">
              <CheckBox
                $colorScheme="default"
                $store={useCheckboxExamplesStore}
                storeKey="acceptTerms"
                label="Acepto términos"
                description={`Estado: ${acceptTerms ? 'Aceptado' : 'No aceptado'}`}
              />

              <CheckBox
                $colorScheme="secondary"
                $store={useCheckboxExamplesStore}
                storeKey="newsletter"
                label="Newsletter"
                description={`Estado: ${newsletter ? 'Suscrito' : 'No suscrito'}`}
              />

              <CheckBox
                $colorScheme="accent"
                $store={useCheckboxExamplesStore}
                storeKey="notifications"
                label="Notificaciones"
                description={`Estado: ${notifications ? 'Activadas' : 'Desactivadas'}`}
              />

              <CheckBox
                $colorScheme="destructive"
                $store={useCheckboxExamplesStore}
                storeKey="marketing"
                label="Marketing emails"
                description={`Estado: ${marketing ? 'Habilitado' : 'Deshabilitado'}`}
              />
            </div>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Checkboxes Múltiples - Intereses
            </Text>
            <div className="space-y-2">
              {[
                { value: 'web-development', label: 'Desarrollo Web' },
                { value: 'mobile-development', label: 'Desarrollo Móvil' },
                { value: 'data-science', label: 'Ciencia de Datos' },
                { value: 'ai-ml', label: 'IA y Machine Learning' },
              ].map(({ value, label }) => (
                <CheckBox
                  key={value}
                  $colorScheme="default"
                  value={value}
                  $store={useCheckboxExamplesStore}
                  storeKey="interests"
                  label={label}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Seleccionados: {interests.join(', ') || 'Ninguno'}
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Checkboxes Múltiples - Habilidades
            </Text>
            <div className="space-y-2">
              {[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue.js' },
                { value: 'angular', label: 'Angular' },
              ].map(({ value, label }) => (
                <CheckBox
                  key={value}
                  $colorScheme="secondary"
                  value={value}
                  $store={useCheckboxExamplesStore}
                  storeKey="skills"
                  label={label}
                  $size="sm"
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Seleccionadas: {skills.join(', ') || 'Ninguna'}
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Diferentes Tamaños y Esquemas
            </Text>
            <div className="space-y-2">
              <CheckBox
                $colorScheme="accent"
                $size="sm"
                label="Pequeño accent"
                checked
              />
              <CheckBox
                $colorScheme="muted"
                $size="default"
                label="Default muted"
              />
              <CheckBox
                $colorScheme="minimal"
                $size="lg"
                label="Grande minimal"
                checked
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <Text $size="sm" $weight="medium">
            Estado Actual del Store:
          </Text>

          <div className="grid grid-cols-1 gap-2 text-sm">
            <p>
              <strong>Total checkboxes marcados:</strong> {getCheckedCount()}
            </p>
            <p>
              <strong>Términos aceptados:</strong> {acceptTerms ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Newsletter:</strong> {newsletter ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Notificaciones:</strong> {notifications ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Marketing:</strong> {marketing ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Intereses:</strong> {interests.length}
            </p>
            <p>
              <strong>Habilidades:</strong> {skills.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button $size="sm" $variant="outline" onClick={selectAllInterests}>
              Todos los Intereses
            </Button>
            <Button $size="sm" $variant="outline" onClick={selectAllSkills}>
              Todas las Habilidades
            </Button>
            <Button
              $size="sm"
              $variant="secondary"
              onClick={deselectAllPreferences}>
              Limpiar Preferencias
            </Button>
            <Button
              $size="sm"
              $variant="destructive"
              onClick={clearAllCheckboxes}>
              Limpiar Todo
            </Button>
          </div>

          <details className="text-xs">
            <summary className="cursor-pointer font-medium">
              Ver esquemas disponibles
            </summary>
            <div className="text-gray-600 bg-white p-3 rounded overflow-auto max-h-32 mt-2">
              <p>
                <strong>Esquemas theme.css:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>default: Colores principales del sistema</li>
                <li>secondary: Azul turquesa pastel</li>
                <li>destructive: Coral suave para errores</li>
                <li>accent: Violeta rosado para destacados</li>
                <li>muted: Grises neutros</li>
                <li>minimal: Transparente con bordes sutiles</li>
                <li>custom: Vacío para personalización externa</li>
              </ul>
            </div>
          </details>
        </div>
      </Container>
    );
  },
};

