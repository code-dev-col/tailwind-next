import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { useFormFieldExamples } from '../../../stores/formFieldExamples.store';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    $layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'grid'],
    },
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
      ],
    },
    $fieldType: {
      control: 'select',
      options: ['input', 'textarea', 'dropdown'],
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    $gridGap: {
      control: 'text',
      description: 'Gap del grid (ej: "1rem", "gap-4")',
    },
    $gridMaxItemWidth: {
      control: 'text',
      description: 'Ancho máximo de items (ej: "8rem", "max-w-sm")',
    },
    $gridAutoRows: {
      control: 'text',
      description: 'Altura automática de filas (ej: "6rem")',
    },
    $gridJustifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
    },
    $gridAlignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Story básica por defecto
export const Default: Story = {
  args: {
    label: 'Nombre completo',
    inputProps: {
      placeholder: 'Ingresa tu nombre',
    },
    $store: useFormFieldExamples,
    storeKey: 'defaultField',
  },
};

// ✅ Diferentes layouts
export const Layouts: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Layout Vertical (Default)
        </h3>
        <FormField
          label="Email"
          inputProps={{
            placeholder: 'tu@correo.com',
          }}
          helperText="Te enviaremos notificaciones importantes"
          $store={useFormFieldExamples}
          storeKey="defaultField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Layout Horizontal</h3>
        <FormField
          $layout="horizontal"
          label="Teléfono"
          inputProps={{
            placeholder: '+57 300 123 4567',
          }}
          helperText="Formato internacional recomendado"
          $store={useFormFieldExamples}
          storeKey="horizontalField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Layout Grid</h3>
        <FormField
          $layout="grid"
          label="Dirección"
          inputProps={{
            placeholder: 'Calle 123 #45-67',
          }}
          helperText="Layout grid responsivo: vertical en móvil, horizontal en desktop"
          $store={useFormFieldExamples}
          storeKey="gridField"
        />
      </div>
    </div>
  ),
};

// ✅ Diferentes tipos de campo
export const FieldTypes: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <FormField
        $fieldType="input"
        label="Nombre de usuario"
        inputProps={{
          placeholder: '@usuario',
        }}
        helperText="Solo letras, números y guiones"
        $store={useFormFieldExamples}
        storeKey="defaultField"
      />

      <FormField
        $fieldType="textarea"
        label="Descripción"
        textAreaProps={{
          placeholder: 'Cuéntanos sobre ti...',
          rows: 4,
        }}
        helperText="Máximo 500 caracteres"
        $store={useFormFieldExamples}
        storeKey="textareaField"
      />

      <FormField
        $fieldType="dropdown"
        label="País"
        dropdownProps={{
          placeholder: 'Selecciona tu país',
          options: [
            { value: 'co', label: 'Colombia' },
            { value: 'mx', label: 'México' },
            { value: 'ar', label: 'Argentina' },
            { value: 'cl', label: 'Chile' },
          ],
        }}
        helperText="Necesario para configurar tu zona horaria"
        $store={useFormFieldExamples}
        storeKey="dropdownField"
      />
    </div>
  ),
};

// ✅ Estados del campo
export const FieldStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <FormField
        label="Campo requerido"
        inputProps={{
          placeholder: 'Este campo es obligatorio',
        }}
        required
        helperText="Marca los campos requeridos con *"
        $store={useFormFieldExamples}
        storeKey="requiredField"
      />

      <FormField
        label="Campo con error"
        inputProps={{
          placeholder: 'Valor inválido',
        }}
        errorText="El formato del email no es válido"
        $store={useFormFieldExamples}
        storeKey="errorField"
      />

      <FormField
        label="Campo deshabilitado"
        inputProps={{
          placeholder: 'No se puede editar',
        }}
        $disabled
        helperText="Este campo no se puede modificar"
        $store={useFormFieldExamples}
        storeKey="disabledField"
      />
    </div>
  ),
};

// ✅ Esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <FormField
        $colorScheme="default"
        label="Esquema Default"
        inputProps={{
          placeholder: 'Esquema por defecto',
        }}
        helperText="Colores neutros y profesionales"
        $store={useFormFieldExamples}
        storeKey="defaultField"
      />

      <FormField
        $colorScheme="secondary"
        label="Esquema Secondary"
        inputProps={{
          placeholder: 'Esquema secundario',
        }}
        helperText="Tonos azules y turquesas"
        $store={useFormFieldExamples}
        storeKey="horizontalField"
      />

      <FormField
        $colorScheme="accent"
        label="Esquema Accent"
        inputProps={{
          placeholder: 'Esquema de acento',
        }}
        helperText="Tonos violetas y rosados"
        $store={useFormFieldExamples}
        storeKey="gridField"
      />

      <FormField
        $colorScheme="muted"
        label="Esquema Muted"
        inputProps={{
          placeholder: 'Esquema silenciado',
        }}
        helperText="Tonos grises y sutiles"
        $store={useFormFieldExamples}
        storeKey="textareaField"
      />
    </div>
  ),
};

// ✅ Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <FormField
        $size="sm"
        label="Campo pequeño"
        inputProps={{
          placeholder: 'Tamaño compacto',
        }}
        helperText="Ideal para formularios densos"
        $store={useFormFieldExamples}
        storeKey="defaultField"
      />

      <FormField
        $size="default"
        label="Campo normal"
        inputProps={{
          placeholder: 'Tamaño estándar',
        }}
        helperText="Tamaño recomendado para la mayoría de casos"
        $store={useFormFieldExamples}
        storeKey="horizontalField"
      />

      <FormField
        $size="lg"
        label="Campo grande"
        inputProps={{
          placeholder: 'Tamaño amplio',
        }}
        helperText="Ideal para interfaces con mucho espacio"
        $store={useFormFieldExamples}
        storeKey="gridField"
      />
    </div>
  ),
};

// ✅ Con separador
export const WithSeparator: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <FormField
        label="Información personal"
        inputProps={{
          placeholder: 'Datos básicos',
        }}
        helperText="Esta sección contiene tu información personal"
        $showSeparator
        separatorText="Información Personal"
        $store={useFormFieldExamples}
        storeKey="separatorField"
      />

      <FormField
        label="Configuración de cuenta"
        inputProps={{
          placeholder: 'Ajustes de tu cuenta',
        }}
        helperText="Personaliza cómo funciona tu cuenta"
        $showSeparator
        separatorText="Configuración"
        $colorScheme="secondary"
        $store={useFormFieldExamples}
        storeKey="defaultField"
      />
    </div>
  ),
};

// ✅ Formulario completo interactivo
export const InteractiveForm: Story = {
  render: () => {
    const { clearAllFormField } = useFormFieldExamples();

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Formulario de Registro</h3>
          <button
            onClick={clearAllFormField}
            className="px-4 py-2 bg-destructive/10 text-destructive rounded-md text-sm hover:bg-destructive/20 transition-colors">
            Limpiar Todo
          </button>
        </div>

        <FormField
          $showSeparator
          separatorText="Datos Personales"
          label="Nombre completo"
          inputProps={{
            placeholder: 'Juan Pérez',
          }}
          required
          helperText="Nombre y apellidos como aparecen en tu documento"
          $store={useFormFieldExamples}
          storeKey="defaultField"
        />

        <FormField
          label="Correo electrónico"
          inputProps={{
            placeholder: 'juan@correo.com',
            type: 'email',
          }}
          required
          helperText="Usaremos este correo para enviarte actualizaciones"
          $store={useFormFieldExamples}
          storeKey="labeledField"
        />

        <FormField
          $layout="horizontal"
          label="Teléfono"
          inputProps={{
            placeholder: '+57 300 123 4567',
            type: 'tel',
          }}
          helperText="Incluye el código de país"
          $store={useFormFieldExamples}
          storeKey="horizontalField"
        />

        <FormField
          $fieldType="dropdown"
          label="País de residencia"
          dropdownProps={{
            placeholder: 'Selecciona tu país',
            options: [
              { value: 'co', label: 'Colombia' },
              { value: 'mx', label: 'México' },
              { value: 'ar', label: 'Argentina' },
              { value: 'cl', label: 'Chile' },
              { value: 'pe', label: 'Perú' },
            ],
          }}
          required
          helperText="Necesario para cumplir con regulaciones locales"
          $store={useFormFieldExamples}
          storeKey="dropdownField"
        />

        <FormField
          $showSeparator
          separatorText="Información Adicional"
          $colorScheme="secondary"
          $fieldType="textarea"
          label="Cuéntanos sobre ti"
          textAreaProps={{
            placeholder:
              'Describe brevemente tus intereses, experiencia o lo que quieras compartir...',
            rows: 4,
          }}
          helperText="Esta información nos ayudará a personalizar tu experiencia"
          $store={useFormFieldExamples}
          storeKey="textareaField"
        />
      </div>
    );
  },
};

// ✅ Con gradientes personalizados
export const WithGradients: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <FormField
        label="Campo con gradiente sunset"
        inputProps={{
          placeholder: 'Gradiente cálido',
        }}
        helperText="Utilizando gradientes de la categoría sunset"
        $custom="bg-gradient-to-r from-orange-400 to-pink-400"
        $store={useFormFieldExamples}
        storeKey="defaultField"
      />

      <FormField
        label="Campo con gradiente ocean"
        inputProps={{
          placeholder: 'Gradiente azul',
        }}
        helperText="Utilizando gradientes de la categoría ocean"
        $custom="bg-gradient-to-r from-blue-400 to-cyan-400"
        $store={useFormFieldExamples}
        storeKey="horizontalField"
      />

      <FormField
        label="Campo con gradiente cosmic"
        inputProps={{
          placeholder: 'Gradiente púrpura',
        }}
        helperText="Utilizando gradientes de la categoría cosmic"
        $custom="bg-gradient-to-r from-purple-400 to-pink-400"
        $store={useFormFieldExamples}
        storeKey="gridField"
      />
    </div>
  ),
};

// ✅ Configuraciones avanzadas de Grid
export const GridAdvanced: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid con auto-fit y minmax (por defecto)
        </h3>
        <FormField
          $layout="grid"
          label="Nombre"
          inputProps={{
            placeholder: 'Grid responsivo estándar',
          }}
          helperText="Grid que se adapta automáticamente"
          $store={useFormFieldExamples}
          storeKey="defaultField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid con gap personalizado
        </h3>
        <FormField
          $layout="grid"
          $gridGap="2rem"
          label="Email"
          inputProps={{
            placeholder: 'Gap aumentado',
          }}
          helperText="Mayor separación entre elementos"
          $store={useFormFieldExamples}
          storeKey="horizontalField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid con ancho máximo de item
        </h3>
        <FormField
          $layout="grid"
          $gridMaxItemWidth="16rem"
          label="Teléfono"
          inputProps={{
            placeholder: 'Campo con ancho limitado',
          }}
          helperText="El campo no excederá 16rem de ancho"
          $store={useFormFieldExamples}
          storeKey="gridField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid con altura automática de filas
        </h3>
        <FormField
          $layout="grid"
          $gridAutoRows="4rem"
          $fieldType="textarea"
          label="Descripción"
          textAreaProps={{
            placeholder: 'TextArea con altura mínima de fila',
            rows: 2,
          }}
          helperText="Las filas del grid tendrán 4rem de altura mínima"
          $store={useFormFieldExamples}
          storeKey="textareaField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid con alineación personalizada
        </h3>
        <FormField
          $layout="grid"
          $gridJustifyContent="center"
          $gridAlignItems="center"
          label="Centrado"
          inputProps={{
            placeholder: 'Campo centrado',
          }}
          helperText="Elementos centrados en el grid"
          $store={useFormFieldExamples}
          storeKey="separatorField"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Grid completo personalizado
        </h3>
        <FormField
          $layout="grid"
          $gridGap="1.5rem"
          $gridMaxItemWidth="20rem"
          $gridAutoRows="5rem"
          $gridJustifyContent="between"
          $gridAlignItems="stretch"
          $fieldType="dropdown"
          label="Configuración Avanzada"
          dropdownProps={{
            placeholder: 'Todas las opciones combinadas',
            options: [
              { value: 'option1', label: 'Opción 1' },
              { value: 'option2', label: 'Opción 2' },
              { value: 'option3', label: 'Opción 3' },
            ],
          }}
          helperText="Gap 1.5rem, max-width 20rem, auto-rows 5rem, justify between, align stretch"
          $store={useFormFieldExamples}
          storeKey="dropdownField"
        />
      </div>
    </div>
  ),
};

