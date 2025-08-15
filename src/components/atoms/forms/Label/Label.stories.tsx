import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input/Input';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label $variant="default" htmlFor="default">
          Default Label
        </Label>
        <Input id="default" placeholder="Default input" className="mt-1" />
      </div>
      <div>
        <Label $variant="required" htmlFor="required">
          Required Field
        </Label>
        <Input id="required" placeholder="Required input" className="mt-1" />
      </div>
      <div>
        <Label $variant="optional" htmlFor="optional">
          Optional Field
        </Label>
        <Input id="optional" placeholder="Optional input" className="mt-1" />
      </div>
      <div>
        <Label $variant="disabled" htmlFor="disabled">
          Disabled Field
        </Label>
        <Input
          id="disabled"
          placeholder="Disabled input"
          disabled
          className="mt-1"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label $size="sm" htmlFor="small">
          Small Label
        </Label>
        <Input
          id="small"
          $size="sm"
          placeholder="Small input"
          className="mt-1"
        />
      </div>
      <div>
        <Label $size="default" htmlFor="default-size">
          Default Label
        </Label>
        <Input id="default-size" placeholder="Default input" className="mt-1" />
      </div>
      <div>
        <Label $size="lg" htmlFor="large">
          Large Label
        </Label>
        <Input
          id="large"
          $size="lg"
          placeholder="Large input"
          className="mt-1"
        />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <Label
          $custom="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-semibold"
          htmlFor="sunset">
          Sunset Label
        </Label>
        <Input id="sunset" placeholder="Sunset themed" className="mt-1" />
      </div>
      <div>
        <Label
          $custom="bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent font-semibold"
          htmlFor="ocean">
          Ocean Label
        </Label>
        <Input id="ocean" placeholder="Ocean themed" className="mt-1" />
      </div>
      <div>
        <Label
          $custom="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold"
          htmlFor="forest">
          Forest Label
        </Label>
        <Input id="forest" placeholder="Forest themed" className="mt-1" />
      </div>
      <div>
        <Label
          $custom="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold"
          htmlFor="cosmic">
          Cosmic Label
        </Label>
        <Input id="cosmic" placeholder="Cosmic themed" className="mt-1" />
      </div>
    </div>
  ),
};

export const FormExamples: Story = {
  render: () => (
    <div className="max-w-md mx-auto space-y-4">
      <div>
        <Label $variant="required" htmlFor="email" $size="sm">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1"
        />
      </div>

      <div>
        <Label $variant="required" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1"
        />
      </div>

      <div>
        <Label $variant="optional" htmlFor="phone">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Your company name" className="mt-1" />
      </div>
    </div>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <Label $variant="required" htmlFor="error-field">
          Email Address
        </Label>
        <Input
          id="error-field"
          $colorScheme="destructive"
          placeholder="invalid-email"
          className="mt-1"
        />
        <p className="text-destructive text-xs mt-1">
          Please enter a valid email address
        </p>
      </div>

      <div>
        <Label $variant="required" htmlFor="success-field">
          Username
        </Label>
        <Input
          id="success-field"
          placeholder="johndoe"
          $custom="border-green-500 focus-visible:ring-green-500"
          className="mt-1"
        />
        <p className="text-green-600 text-xs mt-1">Username is available!</p>
      </div>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <Label htmlFor="accessible-input" $variant="required">
          Accessible Input
        </Label>
        <Input
          id="accessible-input"
          placeholder="This input is properly labeled"
          className="mt-1"
          aria-describedby="input-help"
        />
        <p id="input-help" className="text-muted-foreground text-xs mt-1">
          This input has proper ARIA labeling and description
        </p>
      </div>
    </div>
  ),
};

