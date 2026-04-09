import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { layerStyles } from './layer-styles';
import { textStyles } from './text-styles';

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'brand',
      bg: 'bg.canvas',
      color: 'fg.default',
      scrollBehavior: 'smooth',
      textSizeAdjust: '100%',
    },
    body: {
      minHeight: '100dvh',
      margin: '0',
      bg: 'bg.canvas',
      color: 'fg.default',
      fontFamily: 'body',
      textRendering: 'optimizeLegibility',
      backgroundImage:
        'radial-gradient(circle at top left, color-mix(in srgb, var(--chakra-colors-brand-100) 56%, transparent) 0, transparent 28%), linear-gradient(180deg, var(--chakra-colors-bg-canvas) 0%, color-mix(in srgb, var(--chakra-colors-bg-canvas) 84%, white) 100%)',
      backgroundAttachment: 'fixed',
    },
    '::selection': {
      bg: 'brand.100',
      color: 'fg.default',
    },
    'a, button': {
      transitionProperty: 'common',
      transitionDuration: 'normal',
      transitionTimingFunction: 'ease-out',
    },
    ':where(button, a, input, textarea, select, summary, [role="button"]):focus-visible': {
      outline: 'none',
      boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
    },
  },
  theme: {
    breakpoints: {
      sm: '30rem',
      md: '48rem',
      lg: '64rem',
      xl: '80rem',
      '2xl': '96rem',
    },
    tokens: {
      colors: {
        brand: {
          50: { value: '#eef4ff' },
          100: { value: '#dce7ff' },
          200: { value: '#b9d1ff' },
          300: { value: '#8fb3ff' },
          400: { value: '#5f8fff' },
          500: { value: '#2f63f1' },
          600: { value: '#2146c0' },
          700: { value: '#1c3693' },
          800: { value: '#192d73' },
          900: { value: '#18275d' },
        },
        slate: {
          50: { value: '#f4f6fb' },
          100: { value: '#ebeff6' },
          200: { value: '#d9e0ec' },
          300: { value: '#b7c1d2' },
          400: { value: '#8f9cb0' },
          500: { value: '#677588' },
          600: { value: '#4a5668' },
          700: { value: '#394253' },
          800: { value: '#242c39' },
          900: { value: '#161b24' },
        },
        success: {
          100: { value: '#dbf5e6' },
          500: { value: '#1f8f57' },
          700: { value: '#176642' },
        },
        warning: {
          100: { value: '#fff1d6' },
          500: { value: '#c98016' },
          700: { value: '#8a5c12' },
        },
        danger: {
          100: { value: '#fee5e4' },
          500: { value: '#cc4f45' },
          700: { value: '#8f322c' },
        },
      },
      fonts: {
        heading: { value: 'var(--font-heading), system-ui, sans-serif' },
        body: { value: 'var(--font-body), system-ui, sans-serif' },
      },
      fontSizes: {
        '2xs': { value: '0.6875rem' },
        xs: { value: '0.75rem' },
        sm: { value: '0.875rem' },
        md: { value: '1rem' },
        lg: { value: '1.125rem' },
        xl: { value: '1.3125rem' },
        '2xl': { value: '1.625rem' },
        '3xl': { value: '2rem' },
        '4xl': { value: '2.5rem' },
        '5xl': { value: '3.5rem' },
        '6xl': { value: '4.625rem' },
      },
      spacing: {
        1: { value: '0.25rem' },
        2: { value: '0.5rem' },
        3: { value: '0.75rem' },
        4: { value: '1rem' },
        6: { value: '1.5rem' },
        8: { value: '2rem' },
        10: { value: '2.5rem' },
        12: { value: '3rem' },
        16: { value: '4rem' },
      },
      radii: {
        sm: { value: '0.5rem' },
        md: { value: '0.75rem' },
        lg: { value: '1rem' },
        xl: { value: '1.25rem' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '2rem' },
      },
      shadows: {
        xs: { value: '0 1px 2px rgba(15, 23, 42, 0.04)' },
        sm: { value: '0 1px 2px rgba(15, 23, 42, 0.04), 0 14px 32px -28px rgba(15, 23, 42, 0.24)' },
        md: { value: '0 10px 28px -20px rgba(15, 23, 42, 0.24), 0 24px 64px -40px rgba(15, 23, 42, 0.22)' },
        lg: { value: '0 28px 82px -46px rgba(15, 23, 42, 0.3)' },
      },
      sizes: {
        container: { value: '72rem' },
        content: { value: '54rem' },
        wide: { value: '80rem' },
      },
    },
    semanticTokens: {
      colors: {
        'bg.canvas': { value: '{colors.slate.50}' },
        'bg.subtle': { value: '#f8fafe' },
        'bg.surface': { value: 'rgba(255, 255, 255, 0.9)' },
        'bg.elevated': { value: 'rgba(255, 255, 255, 0.96)' },
        'bg.inset': { value: 'rgba(239, 243, 251, 0.78)' },
        'bg.brand': { value: '{colors.brand.500}' },
        'fg.default': { value: '{colors.slate.900}' },
        'fg.muted': { value: '{colors.slate.600}' },
        'fg.subtle': { value: '{colors.slate.500}' },
        'fg.brand': { value: '{colors.brand.600}' },
        'border.subtle': { value: 'rgba(36, 44, 57, 0.09)' },
        'border.strong': { value: 'rgba(36, 44, 57, 0.16)' },
        'focus.ring': { value: 'rgba(47, 99, 241, 0.22)' },
        'status.success': { value: '{colors.success.500}' },
        'status.warning': { value: '{colors.warning.500}' },
        'status.danger': { value: '{colors.danger.500}' },
      },
    },
    textStyles,
    layerStyles,
  },
});

export const system = createSystem(defaultConfig, config);
