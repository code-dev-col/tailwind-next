import type { Meta, StoryObj } from '@storybook/react';
import {
  FaHeart,
  FaUser,
  FaCog,
  FaHome,
  FaStar,
  FaCheck,
  FaTimes,
  FaPlus,
  FaArrowRight,
  FaDownload,
} from 'react-icons/fa';
import {
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineHeart,
} from 'react-icons/hi';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: FaHeart,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon icon={FaHeart} $variant="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Icon icon={FaUser} $variant="primary" />
        <p className="text-xs mt-1">Primary</p>
      </div>
      <div className="text-center">
        <Icon icon={FaCog} $variant="secondary" />
        <p className="text-xs mt-1">Secondary</p>
      </div>
      <div className="text-center">
        <Icon icon={FaTimes} $variant="destructive" />
        <p className="text-xs mt-1">Destructive</p>
      </div>
      <div className="text-center">
        <Icon icon={FaHome} $variant="ghost" />
        <p className="text-xs mt-1">Ghost</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon icon={FaStar} $size="xs" />
        <p className="text-xs mt-1">XS</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="sm" />
        <p className="text-xs mt-1">SM</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="default" />
        <p className="text-xs mt-1">Default</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="lg" />
        <p className="text-xs mt-1">LG</p>
      </div>
      <div className="text-center">
        <Icon icon={FaStar} $size="xl" />
        <p className="text-xs mt-1">XL</p>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <Icon
          icon={FaCheck}
          $variant="primary"
          $size="lg"
          onClick={() => alert('Success!')}
        />
        <p className="text-xs mt-1">Success</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaPlus}
          $variant="primary"
          $size="lg"
          onClick={() => alert('Add item!')}
        />
        <p className="text-xs mt-1">Add</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaDownload}
          $variant="primary"
          $size="lg"
          onClick={() => alert('Download!')}
        />
        <p className="text-xs mt-1">Download</p>
      </div>
      <div className="text-center">
        <Icon
          icon={FaArrowRight}
          $variant="primary"
          $size="lg"
          onClick={() => alert('Next!')}
        />
        <p className="text-xs mt-1">Next</p>
      </div>
    </div>
  ),
};

export const IconLibraries: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <h3 className="font-medium mb-2">Font Awesome</h3>
        <div className="flex gap-2">
          <Icon icon={FaHeart} $variant="destructive" />
          <Icon icon={FaUser} $variant="primary" />
          <Icon icon={FaCog} $variant="secondary" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Heroicons</h3>
        <div className="flex gap-2">
          <Icon icon={HiOutlineSparkles} $variant="primary" />
          <Icon icon={HiOutlineFire} $variant="destructive" />
          <Icon icon={HiOutlineHeart} $variant="destructive" />
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Mixed Usage</h3>
        <div className="flex gap-2">
          <Icon icon={FaStar} $variant="primary" />
          <Icon icon={HiOutlineSparkles} $variant="primary" />
          <Icon icon={FaCheck} $variant="primary" />
        </div>
      </div>
    </div>
  ),
};

