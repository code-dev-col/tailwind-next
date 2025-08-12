import React from 'react';

// Mock para next/image en entorno de desarrollo
export default function MockImage({
  src,
  alt,
  width,
  height,
  fill,
  ...props
}: any) {
  const imageProps = {
    src,
    alt,
    ...(width && { width }),
    ...(height && { height }),
    style: {
      ...(fill && {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
      }),
      ...props.style,
    },
    ...props,
  };

  return <img {...imageProps} />;
}

