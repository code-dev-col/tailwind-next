import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { useLoginFormExamples } from '../../../../stores/loginFormExamples.store';

const meta: Meta<typeof LoginForm> = {
  title: 'Molecules/Forms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
        'ghost',
        'custom',
      ],
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    $variant: {
      control: 'select',
      options: ['default', 'compact', 'card', 'minimal'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    success: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Stories obligatorias:

export const Default: Story = {
  render: () => (
    <LoginForm
      $store={useLoginFormExamples}
      emailStoreKey="email"
      passwordStoreKey="password"
      rememberMeStoreKey="rememberMe"
      onSubmit={(data) => {
        console.log('Login attempt:', data);
      }}
      onForgotPassword={() => {
        console.log('Forgot password clicked');
      }}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Default</h3>
        <LoginForm $variant="default" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Compact</h3>
        <LoginForm $variant="compact" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Card</h3>
        <LoginForm $variant="card" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Minimal</h3>
        <LoginForm $variant="minimal" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 items-start">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Small</h3>
        <LoginForm $size="sm" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Default</h3>
        <LoginForm $size="default" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Large</h3>
        <LoginForm $size="lg" />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Default</h3>
        <LoginForm $colorScheme="default" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Secondary</h3>
        <LoginForm $colorScheme="secondary" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Accent</h3>
        <LoginForm $colorScheme="accent" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Muted</h3>
        <LoginForm $colorScheme="muted" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Minimal</h3>
        <LoginForm $colorScheme="minimal" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Ghost</h3>
        <LoginForm $colorScheme="ghost" />
      </div>
    </div>
  ),
};

export const WithStoreIntegration: Story = {
  render: () => {
    const { email, password, rememberMe, clearAllLoginForm } =
      useLoginFormExamples();

    return (
      <div className="space-y-6">
        <LoginForm
          $store={useLoginFormExamples}
          emailStoreKey="email"
          passwordStoreKey="password"
          rememberMeStoreKey="rememberMe"
          onSubmit={(data) => {
            alert(`Login attempt with:
Email: ${data.email}
Password: ${data.password}
Remember Me: ${data.rememberMe}`);
          }}
          onForgotPassword={() => {
            alert('Redirecting to forgot password page...');
          }}
        />

        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <h4 className="text-sm font-medium">Store State:</h4>
          <p className="text-xs text-muted-foreground">
            Email: {email || 'empty'}
          </p>
          <p className="text-xs text-muted-foreground">
            Password: {password ? '••••••••' : 'empty'}
          </p>
          <p className="text-xs text-muted-foreground">
            Remember Me: {rememberMe ? 'true' : 'false'}
          </p>

          <button
            onClick={clearAllLoginForm}
            className="text-xs px-2 py-1 bg-background border rounded text-foreground hover:bg-muted">
            Clear All
          </button>
        </div>
      </div>
    );
  },
};

export const WithStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Loading State
        </h3>
        <LoginForm loading />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Disabled State
        </h3>
        <LoginForm disabled />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Error
        </h3>
        <LoginForm error="Credenciales incorrectas. Inténtalo de nuevo." />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          With Success
        </h3>
        <LoginForm success="¡Sesión iniciada correctamente!" />
      </div>
    </div>
  ),
};

export const CustomConfiguration: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Without Icons
        </h3>
        <LoginForm
          $showIcons={false}
          title="Login Simple"
          subtitle="Versión sin iconos"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Minimal Options
        </h3>
        <LoginForm
          $showRememberMe={false}
          $showForgotPassword={false}
          $showPasswordToggle={false}
          title="Login Básico"
          subtitle="Solo campos esenciales"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Custom Labels
        </h3>
        <LoginForm
          title="Bienvenido de Vuelta"
          subtitle="Ingresa a tu cuenta personal"
          emailLabel="Correo Electrónico"
          passwordLabel="Clave de Acceso"
          rememberMeLabel="Mantenerme conectado"
          submitLabel="Acceder"
          forgotPasswordLabel="¿Problemas para acceder?"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">No Header</h3>
        <LoginForm
          $showTitle={false}
          $showSubtitle={false}
          $variant="minimal"
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const { clearAllLoginForm } = useLoginFormExamples();

    return (
      <div className="space-y-6">
        <LoginForm
          $store={useLoginFormExamples}
          emailStoreKey="interactiveExample"
          passwordStoreKey="password"
          rememberMeStoreKey="rememberMe"
          $variant="card"
          $colorScheme="accent"
          title="Demo Interactivo"
          subtitle="Prueba todas las funcionalidades"
          onSubmit={(data) => {
            console.log('Form submitted:', data);
            if (data.email && data.password) {
              alert('¡Login exitoso! (simulado)');
            }
          }}
          onForgotPassword={() => {
            alert('Función de recuperación de contraseña');
          }}
          onEmailChange={(email) => {
            console.log('Email changed:', email);
          }}
          onPasswordChange={(password) => {
            console.log('Password changed:', password);
          }}
          onRememberMeChange={(checked) => {
            console.log('Remember me changed:', checked);
          }}
        />

        <div className="flex gap-2">
          <button
            onClick={clearAllLoginForm}
            className="px-3 py-1 bg-muted border rounded text-sm hover:bg-muted/80">
            Clear Form
          </button>
          <button
            onClick={() => {
              // Simular error
            }}
            className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive hover:bg-destructive/20">
            Show Error
          </button>
        </div>
      </div>
    );
  },
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Ocean Gradient
        </h3>
        <LoginForm
          $custom="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
          $colorScheme="secondary"
          title="Ocean Login"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Sunset Gradient
        </h3>
        <LoginForm
          $custom="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border-orange-500/20"
          $colorScheme="accent"
          title="Sunset Login"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Forest Gradient
        </h3>
        <LoginForm
          $custom="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
          $colorScheme="muted"
          title="Forest Login"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Cosmic Gradient
        </h3>
        <LoginForm
          $custom="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20"
          $colorScheme="default"
          title="Cosmic Login"
        />
      </div>
    </div>
  ),
};

