import type { Meta, StoryObj } from '@storybook/react';
import { GalleryItem } from './GalleryItem';
// import { useGalleryItemExamples } from '../../../../stores/galleryItemExamples.store';
import { FiImage } from 'react-icons/fi';

const meta: Meta<typeof GalleryItem> = {
  title: 'Molecules/Media/GalleryItem',
  component: GalleryItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'destructive',
        'muted',
        'minimal',
      ],
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    $variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
    },
    showOverlay: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Usar imagen local como en ProductCard
const sampleImage = '/src/assets/image-example.png';

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: 'A beautiful landscape',
    title: 'Mountain View',
    subtitle: 'Switzerland',
    onView: () => alert('View clicked'),
    onLike: () => alert('Like clicked'),
    onDownload: () => alert('Download clicked'),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <GalleryItem
        src={sampleImage}
        title="Default"
        $variant="default"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Compact"
        $variant="compact"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Detailed"
        $variant="detailed"
        onView={() => {}}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <GalleryItem
        src={sampleImage}
        title="Small"
        $size="sm"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Default"
        $size="default"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Large"
        $size="lg"
        onView={() => {}}
      />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <GalleryItem
        src={sampleImage}
        title="Default"
        $colorScheme="default"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Primary"
        $colorScheme="primary"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Secondary"
        $colorScheme="secondary"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Accent"
        $colorScheme="accent"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Destructive"
        $colorScheme="destructive"
        onView={() => {}}
      />
      <GalleryItem
        src={sampleImage}
        title="Muted"
        $colorScheme="muted"
        onView={() => {}}
      />
    </div>
  ),
};

export const WithoutOverlay: Story = {
  args: {
    src: sampleImage,
    alt: 'A beautiful landscape',
    showOverlay: false,
    title: 'Always Visible',
    subtitle: 'This text is always shown',
    onView: () => alert('View clicked'),
    onLike: () => alert('Like clicked'),
  },
};

export const MinimalContent: Story = {
  args: {
    src: sampleImage,
    alt: 'Minimal content',
    onView: () => alert('View clicked'),
  },
};

