import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
  display: {
    description: 'Hero headlines for public and high-trust product moments',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '5xl', md: '6xl' },
      lineHeight: '1.1',
      letterSpacing: '-0.045em',
      fontWeight: '800',
    },
  },
  pageTitle: {
    description: 'Primary page headline',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '3xl', md: '4xl' },
      lineHeight: '1.1',
      letterSpacing: '-0.04em',
      fontWeight: '700',
    },
  },
  sectionTitle: {
    description: 'Section headline with strong but calm hierarchy',
    value: {
      fontFamily: 'heading',
      fontSize: { base: '3xl', md: '4xl' },
      lineHeight: '1.12',
      letterSpacing: '-0.04em',
      fontWeight: '700',
    },
  },
  h4: {
    description: 'Sub-section or entity heading',
    value: {
      fontFamily: 'heading',
      fontSize: '2xl',
      lineHeight: '1.25',
      letterSpacing: '-0.03em',
      fontWeight: '700',
    },
  },
  body: {
    description: 'Default product copy',
    value: {
      fontFamily: 'body',
      fontSize: 'lg',
      lineHeight: '1.7',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
  },
  bodyStrong: {
    description: 'Dense body text for supporting operational content',
    value: {
      fontFamily: 'body',
      fontSize: 'sm',
      lineHeight: '1.65',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
  },
  bodyMuted: {
    description: 'Secondary product copy',
    value: {
      fontFamily: 'body',
      fontSize: 'md',
      lineHeight: '1.7',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
  },
  label: {
    description: 'Field labels and short metadata',
    value: {
      fontFamily: 'label',
      fontSize: 'xs',
      lineHeight: '1.4',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontWeight: '700',
    },
  },
  overline: {
    description: 'Uppercase metadata and section eyebrow',
    value: {
      fontFamily: 'label',
      fontSize: '2xs',
      lineHeight: '1.4',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontWeight: '600',
    },
  },
  caption: {
    description: 'Small metadata',
    value: {
      fontFamily: 'body',
      fontSize: 'xs',
      lineHeight: '1.5',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
  },
});
