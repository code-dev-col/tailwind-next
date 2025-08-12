import React from 'react';

// Mock para next/link en entorno de desarrollo
export default function MockLink({ children, href, ...props }: any) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
