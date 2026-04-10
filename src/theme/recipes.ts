import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    fontFamily: 'label',
    fontWeight: '700',
    borderRadius: 'sm',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    transitionTimingFunction: 'ease-out',
    _focusVisible: {
      boxShadow: '0 0 0 3px var(--chakra-colors-focus-ring)',
    },
    _disabled: {
      opacity: '0.46',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  variants: {
    variant: {
      solid: {
        bg: 'accent.primary',
        color: 'fg.onAccent',
        _hover: {
          bg: 'accent.primary',
          filter: 'brightness(1.1)',
        },
        _active: {
          bg: 'accent.primaryActive',
          filter: 'brightness(0.96)',
        },
      },
      subtle: {
        bg: 'accent.secondary',
        color: 'fg.default',
        borderWidth: '1px',
        borderColor: 'border.subtle',
        _hover: {
          bg: 'accent.secondaryHover',
          borderColor: 'border.strong',
        },
        _active: {
          bg: 'accent.secondaryActive',
        },
      },
      surface: {
        bg: 'bg.surface',
        color: 'fg.default',
        borderWidth: '1px',
        borderColor: 'border.default',
        boxShadow: 'sm',
        _hover: {
          bg: 'bg.elevated',
          borderColor: 'border.strong',
          transform: 'translateY(-1px)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      outline: {
        bg: 'transparent',
        color: 'fg.default',
        borderWidth: '1px',
        borderColor: 'border.default',
        _hover: {
          bg: 'transparent',
          color: 'accent.primary',
          borderColor: 'accent.primary',
        },
        _active: {
          bg: 'transparent',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'fg.muted',
        _hover: {
          color: 'fg.default',
        },
        _active: {
          bg: 'transparent',
        },
      },
      plain: {
        bg: 'transparent',
        color: 'fg.brand',
        _hover: {
          color: 'accent.primaryHover',
        },
      },
    },
    size: {
      sm: {
        h: '9',
        px: '4',
        fontSize: 'xs',
      },
      md: {
        h: '10',
        px: '6',
        fontSize: 'xs',
      },
      lg: {
        h: '12',
        px: '10',
        fontSize: 'sm',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'surface',
  },
});

export const badgeRecipe = defineRecipe({
  base: {
    fontFamily: 'label',
    borderRadius: 'sm',
    px: '2.5',
    py: '1',
    fontSize: '2xs',
    lineHeight: '1',
    fontWeight: '700',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  variants: {
    variant: {
      subtle: {
        bg: 'bg.inset',
        color: 'fg.default',
      },
      outline: {
        bg: 'transparent',
        color: 'fg.default',
        borderWidth: '1px',
        borderColor: 'border.default',
      },
      solid: {
        bg: 'accent.primary',
        color: 'fg.onAccent',
      },
      success: {
        bg: 'status.successBg',
        color: 'status.success',
      },
      warning: {
        bg: 'status.warningBg',
        color: 'status.warning',
      },
      danger: {
        bg: 'status.dangerBg',
        color: 'status.danger',
      },
    },
  },
  defaultVariants: {
    variant: 'subtle',
  },
});
