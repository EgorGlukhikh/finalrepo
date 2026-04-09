import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Design system',
  description: 'Страница недоступна.',
};

export default function DesignSystemPage() {
  notFound();
}

