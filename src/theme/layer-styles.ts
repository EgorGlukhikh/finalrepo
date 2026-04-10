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
      boxShadow: 'xs',
    },
  },
  panelElevated: {
    description: 'Primary elevated surface for hero, active canvas, and key content',
    value: {
      bg: 'bg.elevated',
      boxShadow: 'sm',
    },
  },
  panelMuted: {
    description: 'Grouped operational surface',
    value: {
      bg: 'bg.surfaceMuted',
      boxShadow: 'xs',
    },
  },
  panelHighlight: {
    description: 'High-attention but calm product panel',
    value: {
      bg: 'bg.elevated',
      boxShadow: 'sm',
      backgroundImage:
        'linear-gradient(180deg, color-mix(in srgb, var(--chakra-colors-bg-elevated) 88%, var(--chakra-colors-accent-primary) 12%) 0%, color-mix(in srgb, var(--chakra-colors-bg-elevated) 96%, #05070b) 100%)',
    },
  },
  inset: {
    description: 'Inset nested surface for grouped data and sub-content',
    value: {
      bg: 'bg.inset',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
    },
  },
});
