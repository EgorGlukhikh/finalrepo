import { defineLayerStyles } from '@chakra-ui/react';

export const layerStyles = defineLayerStyles({
  shell: {
    description: 'Sticky shell and framing surfaces',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'sm',
      backdropFilter: 'blur(16px)',
    },
  },
  panel: {
    description: 'Base product panel',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'sm',
    },
  },
  panelMuted: {
    description: 'Secondary muted product panel',
    value: {
      bg: 'bg.subtle',
      borderWidth: '1px',
      borderColor: 'border.subtle',
      boxShadow: 'xs',
    },
  },
  panelHighlight: {
    description: 'Primary highlighted panel for hero and CTA moments',
    value: {
      bg: 'bg.surface',
      borderWidth: '1px',
      borderColor: 'border.strong',
      boxShadow: 'md',
      backgroundImage:
        'linear-gradient(180deg, color-mix(in srgb, var(--chakra-colors-bg-surface) 88%, white) 0%, var(--chakra-colors-bg-surface) 100%)',
    },
  },
  inset: {
    description: 'Inset nested surface for lists and compact details',
    value: {
      bg: 'bg.inset',
      borderWidth: '1px',
      borderColor: 'border.subtle',
    },
  },
});
