import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
  display: {
    description: 'Hero headlines for the public product layer',
    value: {
      fontFamily: 'heading',
      fontSize: '6xl',
      lineHeight: '0.94',
      letterSpacing: '-0.06em',
      fontWeight: '700',
    },
  },
  pageTitle: {
    description: 'Primary page headline',
    value: {
      fontFamily: 'heading',
      fontSize: '4xl',
      lineHeight: '1.02',
      letterSpacing: '-0.05em',
      fontWeight: '700',
    },
  },
  sectionTitle: {
    description: 'Large section title',
    value: {
      fontFamily: 'heading',
      fontSize: '2xl',
      lineHeight: '1.14',
      letterSpacing: '-0.04em',
      fontWeight: '700',
    },
  },
  body: {
    description: 'Default product copy',
    value: {
      fontFamily: 'body',
      fontSize: 'md',
      lineHeight: '1.75',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
  },
  bodyMuted: {
    description: 'Secondary product copy',
    value: {
      fontFamily: 'body',
      fontSize: 'sm',
      lineHeight: '1.75',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
  },
  overline: {
    description: 'Uppercase metadata and section eyebrow',
    value: {
      fontFamily: 'body',
      fontSize: '2xs',
      lineHeight: '1.2',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      fontWeight: '700',
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
