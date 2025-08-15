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
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
        'custom',
      ],
      description: 'Esquema de color usando theme.css',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Chip label="Chip básico" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Chip label="Small" $size="sm" $colorScheme="default" />
      <Chip label="Default" $size="default" $colorScheme="default" />
      <Chip label="Large" $size="lg" $colorScheme="default" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Chip label="Rounded" $shape="rounded" $colorScheme="secondary" />
      <Chip label="Pill" $shape="pill" $colorScheme="secondary" />
      <Chip label="Square" $shape="square" $colorScheme="secondary" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Code" $icon={<FiCode />} $colorScheme="default" />
      <Chip label="Star" $icon={<FiStar />} $colorScheme="default" />
      <Chip label="User" $icon={<FiUser />} $colorScheme="secondary" />
      <Chip label="Tag" $icon={<FiTag />} $colorScheme="accent" />
      <Chip label="Heart" $icon={<FiHeart />} $colorScheme="destructive" />
      <Chip label="Bookmark" $icon={<FiBookmark />} $colorScheme="default" />
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
          $colorScheme="default"
          onClick={() => alert('¡Chip clickeado!')}
        />
        <Chip
          label="Removable"
          $removable
          $colorScheme="secondary"
          onRemove={() => alert('¡Chip removido!')}
        />
        <Chip
          label="Selectable"
          $selectable
          $colorScheme="accent"
          onSelect={(selected) =>
            alert(`Chip ${selected ? 'seleccionado' : 'deseleccionado'}`)
          }
        />
        <Chip label="Selected" $selectable $selected $colorScheme="default" />
        <Chip label="Disabled" $disabled $colorScheme="default" />
      </div>
    </div>
  ),
};

export const WithCounters: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip label="Messages" $count={5} $colorScheme="default" />
      <Chip label="Notifications" $count={23} $colorScheme="secondary" />
      <Chip label="Updates" $count={150} $colorScheme="default" />
      <Chip label="Tasks" $count={999} $colorScheme="accent" />
      <Chip label="Errors" $badge="NEW" $colorScheme="destructive" />
      <Chip label="Features" $badge="8" $colorScheme="secondary" />
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
              $colorScheme={technologies.includes(tech) ? 'default' : 'muted'}
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
                  $colorScheme="default"
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
            $colorScheme="default"
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
            $colorScheme="secondary"
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
            $colorScheme="accent"
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
                $colorScheme="default"
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
                $colorScheme="muted"
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
                  $colorScheme="default"
                  $icon={<FiSettings />}
                />
                <Chip label="Beta" $colorScheme="accent" $badge="NEW" />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Tecnologías:</p>
              <div className="flex flex-wrap gap-1">
                <Chip label="React" $colorScheme="default" $size="sm" />
                <Chip label="TypeScript" $colorScheme="default" $size="sm" />
                <Chip label="Tailwind" $colorScheme="default" $size="sm" />
                <Chip label="Storybook" $colorScheme="secondary" $size="sm" />
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
                  $colorScheme="default"
                  $count={245}
                  $selectable
                />
                <Chip
                  label="Ropa"
                  $colorScheme="secondary"
                  $count={189}
                  $selectable
                />
                <Chip
                  label="Hogar"
                  $colorScheme="accent"
                  $count={156}
                  $selectable
                />
                <Chip
                  label="Deportes"
                  $colorScheme="default"
                  $count={98}
                  $selectable
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Precio:</p>
              <div className="flex gap-2">
                <Chip label="$0 - $50" $colorScheme="muted" $selectable />
                <Chip label="$50 - $100" $colorScheme="muted" $selectable />
                <Chip label="$100+" $colorScheme="muted" $selectable />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Características:</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Envío gratis"
                  $colorScheme="default"
                  $icon={<FiZap />}
                  $selectable
                />
                <Chip
                  label="Descuento"
                  $colorScheme="destructive"
                  $badge="20%"
                  $selectable
                />
                <Chip
                  label="Nuevo"
                  $colorScheme="default"
                  $badge="NEW"
                  $selectable
                />
                <Chip
                  label="Popular"
                  $colorScheme="accent"
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
              $colorScheme="default"
              $icon={<FiCode />}
              $count={1200}
              $selectable
            />
            <Chip
              label="Diseño"
              $colorScheme="accent"
              $icon={<FiLayers />}
              $count={856}
              $selectable
            />
            <Chip
              label="Desarrollo"
              $colorScheme="secondary"
              $count={2340}
              $selectable
            />
            <Chip
              label="JavaScript"
              $colorScheme="default"
              $count={1890}
              $selectable
            />
            <Chip
              label="React"
              $colorScheme="default"
              $count={1456}
              $selectable
            />
            <Chip
              label="UI/UX"
              $colorScheme="accent"
              $count={734}
              $selectable
            />
            <Chip
              label="Frontend"
              $colorScheme="default"
              $count={2100}
              $selectable
            />
            <Chip
              label="Backend"
              $colorScheme="destructive"
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
              $colorScheme="default"
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
              $colorScheme="secondary"
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
              $colorScheme="accent"
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
        <Chip
          label="Hover Animation"
          $colorScheme="default"
          $animate
          $clickable
        />
        <Chip
          label="Scale Effect"
          $colorScheme="secondary"
          $animate
          $selectable
        />
        <Chip label="Interactive" $colorScheme="accent" $animate $removable />
        <Chip
          label="With Icon"
          $colorScheme="default"
          $animate
          $icon={<FiStar />}
          $clickable
        />
        <Chip
          label="With Count"
          $colorScheme="default"
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

// 🎨 ===== THEME.CSS COLOR SCHEMES =====
export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold">Esquemas de Color theme.css</h4>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Default (Primary)
          </h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Primary" $colorScheme="default" />
            <Chip label="Featured" $colorScheme="default" $selected />
            <Chip label="Important" $colorScheme="default" $removable />
            <Chip label="With Icon" $colorScheme="default" $icon={<FiStar />} />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Secondary</h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Info" $colorScheme="secondary" />
            <Chip label="Note" $colorScheme="secondary" $selected />
            <Chip label="Update" $colorScheme="secondary" $removable />
            <Chip
              label="With Icon"
              $colorScheme="secondary"
              $icon={<FiTag />}
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">
            Destructive
          </h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Error" $colorScheme="destructive" />
            <Chip label="Warning" $colorScheme="destructive" $selected />
            <Chip label="Critical" $colorScheme="destructive" $removable />
            <Chip
              label="With Icon"
              $colorScheme="destructive"
              $icon={<FiX />}
            />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Highlight" $colorScheme="accent" />
            <Chip label="Special" $colorScheme="accent" $selected />
            <Chip label="Focus" $colorScheme="accent" $removable />
            <Chip label="With Icon" $colorScheme="accent" $icon={<FiZap />} />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Basic" $colorScheme="muted" />
            <Chip label="Standard" $colorScheme="muted" $selected />
            <Chip label="Regular" $colorScheme="muted" $removable />
            <Chip label="With Icon" $colorScheme="muted" $icon={<FiLayers />} />
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
          <div className="flex flex-wrap gap-2">
            <Chip label="Clean" $colorScheme="minimal" />
            <Chip label="Simple" $colorScheme="minimal" $selected />
            <Chip label="Minimal" $colorScheme="minimal" $removable />
            <Chip
              label="With Icon"
              $colorScheme="minimal"
              $icon={<FiFilter />}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Esquemas de color theme.css:</strong> Estos esquemas utilizan
          las variables CSS definidas en theme.css, proporcionando consistencia
          visual y soporte para modo oscuro automático.
        </p>
      </div>
    </div>
  ),
};

export const ColorSchemeWithStore: Story = {
  render: () => {
    const {
      colorSchemeExample,
      secondaryColorExample,
      destructiveColorExample,
      accentColorExample,
      mutedColorExample,
      minimalColorExample,
      toggleChip,
    } = useChipExamples();

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold">Esquemas de Color con Store</h4>

        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Default (Primary)
            </h5>
            <div className="flex flex-wrap gap-2">
              {['Primary', 'Featured', 'Important', 'Essential', 'Core'].map(
                (item) => (
                  <Chip
                    key={item}
                    label={item}
                    $colorScheme="default"
                    $selectable
                    $selected={colorSchemeExample.includes(item)}
                    chipValue={item}
                    $store={useChipExamples}
                    storeKey="colorSchemeExample"
                    onClick={() => toggleChip(item, 'colorSchemeExample')}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Secondary
            </h5>
            <div className="flex flex-wrap gap-2">
              {['Info', 'Note', 'Update', 'Support', 'Help'].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  $colorScheme="secondary"
                  $selectable
                  $selected={secondaryColorExample.includes(item)}
                  chipValue={item}
                  $store={useChipExamples}
                  storeKey="secondaryColorExample"
                  onClick={() => toggleChip(item, 'secondaryColorExample')}
                />
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">
              Destructive
            </h5>
            <div className="flex flex-wrap gap-2">
              {['Error', 'Warning', 'Critical', 'Danger', 'Alert'].map(
                (item) => (
                  <Chip
                    key={item}
                    label={item}
                    $colorScheme="destructive"
                    $selectable
                    $selected={destructiveColorExample.includes(item)}
                    chipValue={item}
                    $store={useChipExamples}
                    storeKey="destructiveColorExample"
                    onClick={() => toggleChip(item, 'destructiveColorExample')}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Accent</h5>
            <div className="flex flex-wrap gap-2">
              {['Highlight', 'Special', 'Focus', 'Emphasis', 'Bright'].map(
                (item) => (
                  <Chip
                    key={item}
                    label={item}
                    $colorScheme="accent"
                    $selectable
                    $selected={accentColorExample.includes(item)}
                    chipValue={item}
                    $store={useChipExamples}
                    storeKey="accentColorExample"
                    onClick={() => toggleChip(item, 'accentColorExample')}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Muted</h5>
            <div className="flex flex-wrap gap-2">
              {['Basic', 'Standard', 'Regular', 'Normal', 'Default'].map(
                (item) => (
                  <Chip
                    key={item}
                    label={item}
                    $colorScheme="muted"
                    $selectable
                    $selected={mutedColorExample.includes(item)}
                    chipValue={item}
                    $store={useChipExamples}
                    storeKey="mutedColorExample"
                    onClick={() => toggleChip(item, 'mutedColorExample')}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2 text-gray-700">Minimal</h5>
            <div className="flex flex-wrap gap-2">
              {['Clean', 'Simple', 'Minimal', 'Subtle', 'Light'].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  $colorScheme="minimal"
                  $selectable
                  $selected={minimalColorExample.includes(item)}
                  chipValue={item}
                  $store={useChipExamples}
                  storeKey="minimalColorExample"
                  onClick={() => toggleChip(item, 'minimalColorExample')}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h6 className="font-medium mb-2">Estado Actual del Store:</h6>
          <pre className="text-xs text-gray-600 bg-white p-3 rounded overflow-auto max-h-40">
            {JSON.stringify(
              {
                default: colorSchemeExample,
                secondary: secondaryColorExample,
                destructive: destructiveColorExample,
                accent: accentColorExample,
                muted: mutedColorExample,
                minimal: minimalColorExample,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
};

