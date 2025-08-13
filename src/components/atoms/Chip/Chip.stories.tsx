import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipGroup } from './Chip';
import { useChipExamples } from '../../../stores/chipExamples.store';
import {
  FiCode,
  FiStar,
  FiUser,
  FiTag,
  FiHeart,
  FiBookmark,
  FiSettings,
  FiTrendingUp,
  FiPlus,
  FiX,
  FiCheck,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiGlobe,
  FiLayers,
  FiZap,
} from 'react-icons/fi';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto principal del chip',
    },
    $variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'accent',
        'success',
        'warning',
        'outline',
        'ghost',
      ],
      description: 'Variante visual del chip',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del chip',
    },
    $shape: {
      control: 'select',
      options: ['rounded', 'pill', 'square'],
      description: 'Forma del chip',
    },
    $clickable: {
      control: 'boolean',
      description: 'Si el chip es clickeable',
    },
    $removable: {
      control: 'boolean',
      description: 'Si el chip se puede eliminar',
    },
    $selectable: {
      control: 'boolean',
      description: 'Si el chip se puede seleccionar',
    },
    $selected: {
      control: 'boolean',
      description: 'Si el chip está seleccionado',
    },
    $disabled: {
      control: 'boolean',
      description: 'Si el chip está deshabilitado',
    },
    $animate: {
      control: 'boolean',
      description: 'Animaciones de hover',
    },
    $count: {
      control: { type: 'number', min: 0, max: 999, step: 1 },
      description: 'Contador del chip',
    },
    $badge: {
      control: 'text',
      description: 'Badge adicional',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Chip label="Chip básico" />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Default" $variant="default" />
      <Chip label="Primary" $variant="primary" />
      <Chip label="Secondary" $variant="secondary" />
      <Chip label="Success" $variant="success" />
      <Chip label="Warning" $variant="warning" />
      <Chip label="Destructive" $variant="destructive" />
      <Chip label="Accent" $variant="accent" />
      <Chip label="Outline" $variant="outline" />
      <Chip label="Ghost" $variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip label="Small" $size="sm" $variant="primary" />
      <Chip label="Default" $size="default" $variant="primary" />
      <Chip label="Large" $size="lg" $variant="primary" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Chip label="Rounded" $shape="rounded" $variant="secondary" />
      <Chip label="Pill" $shape="pill" $variant="secondary" />
      <Chip label="Square" $shape="square" $variant="secondary" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Code" $icon={<FiCode />} $variant="primary" />
      <Chip label="Star" $icon={<FiStar />} $variant="warning" />
      <Chip label="User" $icon={<FiUser />} $variant="secondary" />
      <Chip label="Tag" $icon={<FiTag />} $variant="accent" />
      <Chip label="Heart" $icon={<FiHeart />} $variant="destructive" />
      <Chip label="Bookmark" $icon={<FiBookmark />} $variant="success" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Chip
          label="Clickable"
          $clickable
          $variant="primary"
          onClick={() => alert('¡Chip clickeado!')}
        />
        <Chip
          label="Removable"
          $removable
          $variant="secondary"
          onRemove={() => alert('¡Chip removido!')}
        />
        <Chip
          label="Selectable"
          $selectable
          $variant="accent"
          onSelect={(selected) =>
            alert(`Chip ${selected ? 'seleccionado' : 'deseleccionado'}`)
          }
        />
        <Chip label="Selected" $selectable $selected $variant="success" />
        <Chip label="Disabled" $disabled $variant="default" />
      </div>
    </div>
  ),
};

export const WithCounters: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Messages" $count={5} $variant="primary" />
      <Chip label="Notifications" $count={23} $variant="warning" />
      <Chip label="Updates" $count={150} $variant="success" />
      <Chip label="Tasks" $count={999} $variant="accent" />
      <Chip label="Errors" $badge="NEW" $variant="destructive" />
      <Chip label="Features" $badge="8" $variant="secondary" />
    </div>
  ),
};

export const SelectableGroup: Story = {
  render: () => {
    const { technologies, toggleChip, hasChip } = useChipExamples();

    const availableTechs = [
      'React',
      'Vue',
      'Angular',
      'Svelte',
      'Next.js',
      'Nuxt.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'Go',
      'Rust',
    ];

    return (
      <div className="space-y-6 max-w-2xl">
        <h4 className="text-lg font-semibold">
          Selecciona tus tecnologías favoritas:
        </h4>

        <div className="flex flex-wrap gap-2">
          {availableTechs.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              $selectable
              $selected={technologies.includes(tech)}
              $variant={technologies.includes(tech) ? 'primary' : 'outline'}
              $animate
              onSelect={() => toggleChip(tech, 'technologies')}
            />
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Tecnologías seleccionadas:
          </p>
          <div className="flex flex-wrap gap-2">
            {technologies.length > 0 ? (
              technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  $variant="success"
                  $removable
                  $icon={<FiCheck />}
                  onRemove={() => toggleChip(tech, 'technologies')}
                />
              ))
            ) : (
              <span className="text-gray-400 italic">Ninguna seleccionada</span>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const ChipGroupShowcase: Story = {
  render: () => {
    const { skills, categories, filters } = useChipExamples();

    return (
      <div className="space-y-8 max-w-3xl">
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Habilidades (Removables)
          </h4>
          <ChipGroup
            $store={useChipExamples}
            storeKey="skills"
            $variant="primary"
            $removable
            $gap="default"
            $wrap
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">
            Categorías (Seleccionables)
          </h4>
          <ChipGroup
            chips={[
              'Frontend',
              'Backend',
              'DevOps',
              'Mobile',
              'Desktop',
              'AI/ML',
              'Blockchain',
              'IoT',
            ]}
            $variant="secondary"
            $selectable
            $gap="sm"
            $wrap
            onChipSelect={(chip, selected) => {
              console.log(`${chip} ${selected ? 'selected' : 'deselected'}`);
            }}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Filtros (Con límite)</h4>
          <ChipGroup
            chips={[
              'Popular',
              'Reciente',
              'Trending',
              'Destacado',
              'Premium',
              'Gratis',
              'Nuevo',
              'Actualizado',
            ]}
            $variant="accent"
            $clickable
            $gap="default"
            $maxItems={4}
            $showMore
            onChipClick={(chip) => alert(`Filtro clickeado: ${chip}`)}
          />
        </div>
      </div>
    );
  },
};

export const RealWorldExamples: Story = {
  render: () => {
    const {
      skills,
      addSkill,
      removeSkill,
      newTagInput,
      setNewTagInput,
      isAddingTag,
      setIsAddingTag,
    } = useChipExamples();

    const handleAddSkill = () => {
      if (newTagInput.trim() && !skills.includes(newTagInput.trim())) {
        addSkill(newTagInput.trim());
        setNewTagInput('');
        setIsAddingTag(false);
      }
    };

    return (
      <div className="space-y-8 max-w-4xl">
        {/* Profile Skills */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <FiUser className="text-blue-600" />
            <h4 className="text-lg font-semibold">Habilidades del Perfil</h4>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                $variant="primary"
                $removable
                $icon={<FiCode />}
                $animate
                onRemove={() => removeSkill(skill)}
              />
            ))}

            {isAddingTag ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSkill();
                    if (e.key === 'Escape') setIsAddingTag(false);
                  }}
                  placeholder="Nueva habilidad..."
                  className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleAddSkill}
                  className="p-1 text-green-600 hover:bg-green-50 rounded">
                  <FiCheck size={14} />
                </button>
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <Chip
                label="Agregar habilidad"
                $variant="outline"
                $clickable
                $icon={<FiPlus />}
                onClick={() => setIsAddingTag(true)}
              />
            )}
          </div>
        </div>

        {/* Project Tags */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <FiTag className="text-green-600" />
            <h4 className="text-lg font-semibold">Etiquetas del Proyecto</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Estado del Proyecto:</p>
              <div className="flex gap-2">
                <Chip
                  label="En desarrollo"
                  $variant="warning"
                  $icon={<FiSettings />}
                />
                <Chip label="Beta" $variant="accent" $badge="NEW" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Tecnologías:</p>
              <div className="flex flex-wrap gap-1">
                <Chip label="React" $variant="primary" $size="sm" />
                <Chip label="TypeScript" $variant="primary" $size="sm" />
                <Chip label="Tailwind" $variant="primary" $size="sm" />
                <Chip label="Storybook" $variant="secondary" $size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* E-commerce Filters */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <FiFilter className="text-purple-600" />
            <h4 className="text-lg font-semibold">Filtros de E-commerce</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Categorías:</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Electrónicos"
                  $variant="primary"
                  $count={245}
                  $selectable
                />
                <Chip
                  label="Ropa"
                  $variant="secondary"
                  $count={189}
                  $selectable
                />
                <Chip
                  label="Hogar"
                  $variant="accent"
                  $count={156}
                  $selectable
                />
                <Chip
                  label="Deportes"
                  $variant="success"
                  $count={98}
                  $selectable
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Precio:</p>
              <div className="flex gap-2">
                <Chip label="$0 - $50" $variant="outline" $selectable />
                <Chip label="$50 - $100" $variant="outline" $selectable />
                <Chip label="$100+" $variant="outline" $selectable />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Características:</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Envío gratis"
                  $variant="success"
                  $icon={<FiZap />}
                  $selectable
                />
                <Chip
                  label="Descuento"
                  $variant="destructive"
                  $badge="20%"
                  $selectable
                />
                <Chip
                  label="Nuevo"
                  $variant="warning"
                  $badge="NEW"
                  $selectable
                />
                <Chip
                  label="Popular"
                  $variant="accent"
                  $icon={<FiTrendingUp />}
                  $selectable
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Tags */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FiGlobe className="text-gray-600" />
            <h4 className="text-lg font-semibold">Red Social - Intereses</h4>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip
              label="Tecnología"
              $variant="primary"
              $icon={<FiCode />}
              $count={1200}
              $selectable
            />
            <Chip
              label="Diseño"
              $variant="accent"
              $icon={<FiLayers />}
              $count={856}
              $selectable
            />
            <Chip
              label="Desarrollo"
              $variant="secondary"
              $count={2340}
              $selectable
            />
            <Chip
              label="JavaScript"
              $variant="warning"
              $count={1890}
              $selectable
            />
            <Chip label="React" $variant="primary" $count={1456} $selectable />
            <Chip label="UI/UX" $variant="accent" $count={734} $selectable />
            <Chip
              label="Frontend"
              $variant="success"
              $count={2100}
              $selectable
            />
            <Chip
              label="Backend"
              $variant="destructive"
              $count={987}
              $selectable
            />
          </div>
        </div>
      </div>
    );
  },
};

export const WithStoreIntegration: Story = {
  render: () => {
    const {
      defaultExample,
      skills,
      categories,
      resetToDefaults,
      clearAllChips,
    } = useChipExamples();

    return (
      <div className="space-y-8 max-w-3xl">
        <h4 className="text-lg font-semibold">
          Integración con Store de Zustand
        </h4>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Chips desde Store (defaultExample):
            </p>
            <ChipGroup
              $store={useChipExamples}
              storeKey="defaultExample"
              $variant="primary"
              $removable
              $gap="default"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">
              Habilidades desde Store (skills):
            </p>
            <ChipGroup
              $store={useChipExamples}
              storeKey="skills"
              $variant="secondary"
              $removable
              $selectable
              $gap="sm"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-3">
              Categorías desde Store (categories):
            </p>
            <ChipGroup
              $store={useChipExamples}
              storeKey="categories"
              $variant="accent"
              $removable
              $gap="default"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Estado actual del store:</h5>
          <pre className="text-xs text-gray-600 bg-white p-3 rounded overflow-auto max-h-40">
            {JSON.stringify(
              {
                defaultExample,
                skills: skills.slice(0, 3) + (skills.length > 3 ? '...' : ''),
                categories:
                  categories.slice(0, 3) + (categories.length > 3 ? '...' : ''),
              },
              null,
              2
            )}
          </pre>
        </div>

        <div className="flex gap-3">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Resetear a Defaults
          </button>
          <button
            onClick={clearAllChips}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
            Limpiar Todo
          </button>
        </div>
      </div>
    );
  },
};

export const AnimatedShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Chips con Animaciones</h4>

      <div className="flex flex-wrap gap-3">
        <Chip label="Hover Animation" $variant="primary" $animate $clickable />
        <Chip label="Scale Effect" $variant="secondary" $animate $selectable />
        <Chip label="Interactive" $variant="accent" $animate $removable />
        <Chip
          label="With Icon"
          $variant="success"
          $animate
          $icon={<FiStar />}
          $clickable
        />
        <Chip
          label="With Count"
          $variant="warning"
          $animate
          $count={42}
          $selectable
        />
      </div>

      <p className="text-sm text-gray-600">
        Los chips con <code>$animate</code> tienen efectos de hover y scale
        suaves.
      </p>
    </div>
  ),
};

