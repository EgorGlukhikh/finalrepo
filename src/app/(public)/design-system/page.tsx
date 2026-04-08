import type { Metadata } from 'next';

import { DesignSystemShowcase } from './showcase';

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Internal preview for the Academy Realtors UI foundation.',
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}

