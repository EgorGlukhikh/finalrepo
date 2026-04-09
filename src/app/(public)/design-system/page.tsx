import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Internal preview for the Academy Realtors UI foundation.',
};

export default function DesignSystemPage() {
  notFound();
}

