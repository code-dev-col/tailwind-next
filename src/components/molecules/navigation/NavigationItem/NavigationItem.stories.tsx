import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem } from './NavigationItem';
import { useNavigationItemExamples } from '../../../../stores/navigationItemExamples.store';
import { Grid } from '../../../atoms/layout/Grid';
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';

// Icons para los ejemplos
import {
  FiHome,
  FiSettings,
  FiUser,
  FiMail,
  FiChevronRight,
  FiExternalLink,
  FiFolder,
  FiFile,
  FiPlay,
  FiBell,
  FiHeart,
  FiSearch,
  FiBookmark,
  FiDownload,
  FiDatabase,
} from 'react-icons/fi';

const meta: Meta<typeof NavigationItem> = {
  title: 'Molecules/Navigation/NavigationItem',
  component: NavigationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Stories obligatorias con storeKey pattern:

export const Default: Story = {
  render: () => (
    <NavigationItem
      label="Dashboard"
      href="/dashboard"
      icon={FiHome}
      $store={useNavigationItemExamples}
      storeKey="defaultExample"
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Variantes de NavigationItem
      </Text>

      <Grid $columns={2} $gap="2rem" $maxGridWidth="1000px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <Container className="space-y-2">
            <NavigationItem
              label="Inicio"
              href="/home"
              icon={FiHome}
              $variant="default"
            />
            <NavigationItem
              label="Perfil"
              href="/profile"
              icon={FiUser}
              badgeCount={3}
              $variant="default"
            />
            <NavigationItem
              label="Configuración"
              href="/settings"
              icon={FiSettings}
              isActive
              $variant="default"
            />
          </Container>
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Compact
          </Text>
          <Container className="space-y-2">
            <NavigationItem
              label="Mensajes"
              href="/messages"
              icon={FiMail}
              badgeCount={12}
              $variant="compact"
              $size="sm"
            />
            <NavigationItem
              label="Notificaciones"
              href="/notifications"
              icon={FiBell}
              badgeText="Nuevo"
              $variant="compact"
              $size="sm"
            />
            <NavigationItem
              label="Favoritos"
              href="/favorites"
              icon={FiHeart}
              isActive
              $variant="compact"
              $size="sm"
            />
          </Container>
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Detailed
          </Text>
          <Container className="space-y-3">
            <NavigationItem
              label="Proyectos"
              href="/projects"
              icon={FiFolder}
              description="Gestiona todos tus proyectos"
              badgeCount={8}
              $variant="detailed"
              showChevron
            />
            <NavigationItem
              label="Búsqueda Avanzada"
              href="/search"
              icon={FiSearch}
              description="Encuentra contenido específico"
              $variant="detailed"
              showChevron
            />
          </Container>
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Minimal
          </Text>
          <Container className="space-y-1">
            <NavigationItem
              label="Guardados"
              href="/saved"
              icon={FiBookmark}
              $variant="minimal"
            />
            <NavigationItem
              label="Descargas"
              href="/downloads"
              icon={FiDownload}
              badgeCount={2}
              $variant="minimal"
            />
          </Container>
        </Container>
      </Grid>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Tamaños de NavigationItem
      </Text>

      <Grid $columns={3} $gap="1.5rem" $maxGridWidth="900px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Small
          </Text>
          <Container className="space-y-2">
            <NavigationItem
              label="Home"
              href="/home"
              icon={FiHome}
              $size="sm"
            />
            <NavigationItem
              label="Profile"
              href="/profile"
              icon={FiUser}
              badgeCount={5}
              $size="sm"
            />
            <NavigationItem
              label="Settings"
              href="/settings"
              icon={FiSettings}
              isActive
              $size="sm"
            />
          </Container>
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <Container className="space-y-2">
            <NavigationItem
              label="Home"
              href="/home"
              icon={FiHome}
              $size="default"
            />
            <NavigationItem
              label="Profile"
              href="/profile"
              icon={FiUser}
              badgeCount={5}
              $size="default"
            />
            <NavigationItem
              label="Settings"
              href="/settings"
              icon={FiSettings}
              isActive
              $size="default"
            />
          </Container>
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Large
          </Text>
          <Container className="space-y-2">
            <NavigationItem
              label="Home"
              href="/home"
              icon={FiHome}
              $size="lg"
            />
            <NavigationItem
              label="Profile"
              href="/profile"
              icon={FiUser}
              badgeCount={5}
              $size="lg"
            />
            <NavigationItem
              label="Settings"
              href="/settings"
              icon={FiSettings}
              isActive
              $size="lg"
            />
          </Container>
        </Container>
      </Grid>
    </Container>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Esquemas de Color
      </Text>

      <Grid $columns={2} $gap="2rem" $maxGridWidth="1000px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <NavigationItem
            label="Navegación Default"
            href="/default"
            icon={FiHome}
            badgeCount={3}
            $colorScheme="default"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Secondary
          </Text>
          <NavigationItem
            label="Navegación Secondary"
            href="/secondary"
            icon={FiUser}
            badgeText="Nuevo"
            $colorScheme="secondary"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Accent
          </Text>
          <NavigationItem
            label="Navegación Accent"
            href="/accent"
            icon={FiHeart}
            isActive
            $colorScheme="accent"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Minimal
          </Text>
          <NavigationItem
            label="Navegación Minimal"
            href="/minimal"
            icon={FiSettings}
            $colorScheme="minimal"
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { storeExample, setStoreExample, clearAllNavigationItems } =
      useNavigationItemExamples();

    return (
      <div className="space-y-4">
        <NavigationItem
          label={storeExample || 'Store Item'}
          href="/store"
          icon={FiDatabase}
          $store={useNavigationItemExamples}
          storeKey="storeExample"
        />
        <p className="text-sm text-muted-foreground">
          Valor actual: "{storeExample}"
        </p>
        <button
          onClick={clearAllNavigationItems}
          className="px-3 py-1 bg-gray-200 rounded text-sm">
          Clear All
        </button>
      </div>
    );
  },
};

export const ButtonVariants: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        NavigationItem como Botones
      </Text>

      <Container className="max-w-md mx-auto space-y-3">
        <NavigationItem
          label="Acción Principal"
          icon={FiSettings}
          badgeCount={1}
          $asButton
          onClick={() => alert('Acción principal ejecutada!')}
        />

        <NavigationItem
          label="Acción Secundaria"
          icon={FiBell}
          badgeText="Urgente"
          $asButton
          $colorScheme="secondary"
          onClick={() => alert('Acción secundaria ejecutada!')}
        />

        <NavigationItem
          label="Acción Deshabilitada"
          icon={FiMail}
          $asButton
          isDisabled
          onClick={() => alert('No debería ejecutarse')}
        />

        <NavigationItem
          label="Acción Detallada"
          icon={FiFolder}
          description="Descripción de la acción"
          $variant="detailed"
          $asButton
          showChevron
          onClick={() => alert('Acción detallada!')}
        />
      </Container>
    </Container>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Enlaces Externos y Descargas
      </Text>

      <Container className="max-w-md mx-auto space-y-3">
        <NavigationItem
          label="Documentación Externa"
          href="https://docs.example.com"
          icon={FiFolder}
          $external
          showChevron
          onClick={() => alert('Abriendo enlace externo')}
        />

        <NavigationItem
          label="Descargar PDF"
          href="/documents/manual.pdf"
          icon={FiDownload}
          $download
          badgeText="2MB"
          onClick={() => alert('Iniciando descarga')}
        />

        <NavigationItem
          label="GitHub Repository"
          href="https://github.com/example/repo"
          icon={FiFolder}
          description="Ver código fuente"
          $variant="detailed"
          $external
          $colorScheme="accent"
          showChevron
        />
      </Container>
    </Container>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const {
      interactiveExample,
      setInteractiveExample,
      clearAllNavigationItems,
      clickCount,
      incrementClickCount,
    } = useNavigationItemExamples();

    return (
      <Container className="space-y-6">
        <Text as="h2" $size="2xl" $weight="bold" className="text-center">
          Demo Interactivo - NavigationItem
        </Text>

        <Container className="max-w-md mx-auto space-y-4">
          <NavigationItem
            label={interactiveExample || 'Interactive Item'}
            href="/interactive"
            icon={FiPlay}
            badgeCount={clickCount}
            onClick={() => {
              incrementClickCount();
              setInteractiveExample(`Clicked ${clickCount + 1} times`);
            }}
            onHover={() => {
              console.log('Hover sobre NavigationItem');
            }}
            onFocus={() => {
              console.log('Focus en NavigationItem');
            }}
          />

          <Container className="flex gap-2 justify-center flex-wrap">
            <Button
              onClick={() => {
                setInteractiveExample('Active state toggled');
              }}
              $colorScheme="secondary"
              $size="sm">
              🎯 Toggle Active
            </Button>

            <Button
              onClick={() => {
                incrementClickCount();
                setInteractiveExample(`Badge: ${clickCount + 1}`);
              }}
              $colorScheme="accent"
              $size="sm">
              🔢 +Badge
            </Button>

            <Button
              onClick={() => {
                setInteractiveExample('Disabled state toggled');
              }}
              $colorScheme="muted"
              $size="sm">
              🚫 Toggle Disabled
            </Button>

            <Button
              onClick={clearAllNavigationItems}
              $colorScheme="outline"
              $size="sm">
              🔄 Reset
            </Button>
          </Container>

          <Container className="text-center">
            <Text $size="xs" className="text-muted-foreground">
              💡 Tip: Haz click en el NavigationItem para incrementar el badge
            </Text>
            <Text $size="xs" className="text-muted-foreground mt-2">
              Estado: "{interactiveExample}" | Clicks: {clickCount}
            </Text>
          </Container>
        </Container>
      </Container>
    );
  },
};

