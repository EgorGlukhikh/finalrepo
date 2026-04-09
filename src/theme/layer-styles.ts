import { defineLayerStyles } from '@chakra-ui/react';

export const layerStyles = defineLayerStyles({
  shell: {
    description: 'Sticky framing shell with slight translucency',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'sm',
      backdropFilter: 'blur(16px)',
    },
  },
  panel: {
    description: 'Base product surface',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'sm',
    },
  },
  panelElevated: {
    description: 'Primary elevated surface for hero, active canvas, and key content',
    value: {
      bg: 'bg.elevated',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'md',
    },
  },
  panelMuted: {
    description: 'Grouped operational surface',
    value: {
      bg: 'bg.surfaceMuted',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'xs',
    },
  },
  panelHighlight: {
    description: 'High-attention but calm product panel',
    value: {
      bg: 'bg.elevated',
      borderWidth: '1px',
      borderColor: 'border.strong',
      boxShadow: 'md',
      backgroundImage:
        'linear-gradient(180deg, color-mix(in srgb, var(--chakra-colors-bg-elevated) 92%, white) 0%, color-mix(in srgb, var(--chakra-colors-bg-elevated) 94%, var(--chakra-colors-accent-secondary) 6%) 100%)',
    },
  },
  inset: {
    description: 'Inset nested surface for grouped data and sub-content',
    value: {
      bg: 'bg.inset',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'inner',
    },
  },
});
