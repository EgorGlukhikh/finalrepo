import { defineLayerStyles } from '@chakra-ui/react';

export const layerStyles = defineLayerStyles({
  shell: {
    description: 'Sticky framing shell with slight translucency',
    value: {
      bg: 'transparent',
    },
  },
  panel: {
    description: 'Base product surface',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.subtle',
    },
  },
  panelElevated: {
    description: 'Primary elevated surface for hero, active canvas, and key content',
    value: {
      bg: 'bg.elevated',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'sm',
    },
  },
  panelMuted: {
    description: 'Grouped operational surface',
    value: {
      bg: 'bg.surfaceMuted',
      borderWidth: '1px',
      borderColor: 'border.subtle',
    },
  },
  panelHighlight: {
    description: 'High-attention but calm product panel',
    value: {
      bg: 'bg.elevated',
      borderWidth: '1px',
      borderColor: 'border.strong',
      boxShadow: 'sm',
      backgroundImage:
        'linear-gradient(180deg, color-mix(in srgb, var(--chakra-colors-bg-elevated) 88%, var(--chakra-colors-accent-primary) 12%) 0%, color-mix(in srgb, var(--chakra-colors-bg-elevated) 96%, #05070b) 100%)',
    },
  },
  inset: {
    description: 'Inset nested surface for grouped data and sub-content',
    value: {
      bg: 'bg.inset',
      borderWidth: '1px',
      borderColor: 'border.subtle',
    },
  },
});
