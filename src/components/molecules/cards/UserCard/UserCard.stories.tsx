import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './UserCard';
import { useUserCardExamples } from '../../../../stores/userCardExamples.store';

const meta: Meta<typeof UserCard> = {
  title: 'Molecules/Cards/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UserCard
      $store={useUserCardExamples}
      nameStoreKey="defaultUserName"
      roleStoreKey="defaultUserRole"
      statusStoreKey="defaultUserStatus"
      email="ana.garcia@empresa.com"
      bio="Desarrolladora frontend especializada en React y TypeScript"
      location="Barcelona, España"
      joinDate="Enero 2023"
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <UserCard
          name="Ana García"
          role="Desarrolladora Frontend"
          email="ana@empresa.com"
          $variant="default"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Compact</h3>
        <UserCard
          name="Carlos Mendoza"
          role="Product Manager"
          email="carlos@empresa.com"
          $variant="compact"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Detailed</h3>
        <UserCard
          name="María López"
          role="Diseñadora UX/UI"
          email="maria@empresa.com"
          bio="Diseñadora con 5 años de experiencia creando interfaces intuitivas"
          location="Madrid, España"
          joinDate="Marzo 2022"
          $variant="detailed"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Minimal</h3>
        <UserCard
          name="Luis Rodríguez"
          role="Data Scientist"
          $variant="minimal"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Small</h3>
        <UserCard
          name="Ana García"
          role="Frontend Developer"
          email="ana@empresa.com"
          $size="sm"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Default</h3>
        <UserCard
          name="Carlos Mendoza"
          role="Product Manager"
          email="carlos@empresa.com"
          $size="default"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Large</h3>
        <UserCard
          name="María López"
          role="Lead Designer"
          email="maria@empresa.com"
          bio="Especialista en diseño de experiencias digitales"
          $size="lg"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <UserCard
        name="Default User"
        role="Software Engineer"
        email="default@empresa.com"
        $colorScheme="default"
      />

      <UserCard
        name="Secondary User"
        role="Backend Developer"
        email="secondary@empresa.com"
        $colorScheme="secondary"
      />

      <UserCard
        name="Accent User"
        role="DevOps Engineer"
        email="accent@empresa.com"
        $colorScheme="accent"
      />

      <UserCard
        name="Destructive User"
        role="Security Analyst"
        email="security@empresa.com"
        $colorScheme="destructive"
      />

      <UserCard
        name="Muted User"
        role="Technical Writer"
        email="writer@empresa.com"
        $colorScheme="muted"
      />

      <UserCard
        name="Minimal User"
        role="Consultant"
        email="minimal@empresa.com"
        $colorScheme="minimal"
      />
    </div>
  ),
};

export const WithInteraction: Story = {
  render: () => {
    const {
      isFollowing,
      toggleFollowing,
      simulateUserActivity,
      randomizeUserData,
      resetInteractions,
    } = useUserCardExamples();

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Tarjeta Interactiva</h3>
          <p className="text-sm text-muted-foreground">
            Siguiendo: {isFollowing ? 'Sí' : 'No'}
          </p>
        </div>

        <UserCard
          $store={useUserCardExamples}
          nameStoreKey="defaultUserName"
          roleStoreKey="defaultUserRole"
          statusStoreKey="defaultUserStatus"
          email="usuario@empresa.com"
          bio="Usuario de ejemplo con interacciones en tiempo real"
          location="Ciudad, País"
          isFollowing={isFollowing}
          onFollow={toggleFollowing}
          onContact={() => alert('¡Contactando usuario!')}
          onClick={() => alert('¡Tarjeta clickeada!')}
        />

        <div className="flex gap-2">
          <button
            onClick={toggleFollowing}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200">
            Toggle Follow
          </button>

          <button
            onClick={simulateUserActivity}
            className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">
            Simular Actividad
          </button>

          <button
            onClick={randomizeUserData}
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200">
            Datos Aleatorios
          </button>

          <button
            onClick={resetInteractions}
            className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200">
            Reset
          </button>
        </div>
      </div>
    );
  },
};

export const StatusVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <UserCard
        name="Usuario Online"
        role="Desarrollador"
        status="online"
        statusText="En línea"
        showStatus={true}
      />

      <UserCard
        name="Usuario Ausente"
        role="Diseñador"
        status="away"
        statusText="Ausente"
        showStatus={true}
      />

      <UserCard
        name="Usuario Ocupado"
        role="Product Manager"
        status="busy"
        statusText="Ocupado"
        showStatus={true}
      />

      <UserCard
        name="Usuario Offline"
        role="QA Engineer"
        status="offline"
        statusText="Desconectado"
        showStatus={true}
      />
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <UserCard
        name="Elena Martínez"
        role="Senior Developer"
        email="elena@empresa.com"
        badges={[
          { text: 'Pro', colorScheme: 'accent' },
          { text: 'Mentor', colorScheme: 'secondary' },
        ]}
      />

      <UserCard
        name="Diego Torres"
        role="Tech Lead"
        email="diego@empresa.com"
        badges={[
          { text: 'Admin', colorScheme: 'destructive' },
          { text: 'Expert', colorScheme: 'default' },
          { text: 'Speaker', colorScheme: 'accent' },
        ]}
      />

      <UserCard
        name="Carmen Ruiz"
        role="Designer"
        email="carmen@empresa.com"
        $colorScheme="secondary"
        badges={[
          { text: 'Creative', colorScheme: 'accent' },
          { text: 'Award Winner', colorScheme: 'secondary' },
        ]}
      />
    </div>
  ),
};

export const TeamMemberCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserCard
        $store={useUserCardExamples}
        nameStoreKey="teamMemberName"
        roleStoreKey="teamMemberRole"
        statusStoreKey="teamMemberStatus"
        email="maria@empresa.com"
        bio="Especialista en investigación de usuarios y diseño centrado en el usuario"
        badges={[{ text: 'Team Lead', colorScheme: 'accent' }]}
        $colorScheme="secondary"
      />

      <UserCard
        name="Roberto Silva"
        role="Backend Engineer"
        email="roberto@empresa.com"
        status="online"
        bio="Experto en arquitecturas escalables y sistemas distribuidos"
        badges={[{ text: 'Senior', colorScheme: 'default' }]}
      />

      <UserCard
        name="Lucía Fernández"
        role="DevOps Specialist"
        email="lucia@empresa.com"
        status="busy"
        bio="Automatización de infraestructura y CI/CD pipelines"
        badges={[
          { text: 'Cloud Expert', colorScheme: 'accent' },
          { text: 'Certified', colorScheme: 'secondary' },
        ]}
        $colorScheme="accent"
      />
    </div>
  ),
};

export const WithDebugInfo: Story = {
  render: () => {
    const store = useUserCardExamples();

    return (
      <div className="space-y-6">
        <UserCard
          $store={useUserCardExamples}
          nameStoreKey="profileName"
          roleStoreKey="profileRole"
          email={store.profileEmail}
          bio={store.profileBio}
          location={store.profileLocation}
          status="online"
          isFollowing={store.isFollowing}
          onFollow={store.toggleFollowing}
          $variant="detailed"
        />

        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <h4 className="font-semibold">Estado del Store:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Nombre:</strong> {store.profileName}
            </div>
            <div>
              <strong>Rol:</strong> {store.profileRole}
            </div>
            <div>
              <strong>Email:</strong> {store.profileEmail}
            </div>
            <div>
              <strong>Siguiendo:</strong> {store.isFollowing ? 'Sí' : 'No'}
            </div>
            <div>
              <strong>Ubicación:</strong> {store.profileLocation}
            </div>
            <div>
              <strong>Notificaciones:</strong> {store.notificationCount}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={store.loadSampleUsers}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              Cargar Usuarios Ejemplo
            </button>

            <button
              onClick={store.clearAllUserCard}
              className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm">
              Limpiar Todo
            </button>
          </div>
        </div>
      </div>
    );
  },
};

