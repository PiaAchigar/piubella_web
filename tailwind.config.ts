import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors
        surface: '#F7F3EB',
        'surface-dim': '#D5CFC7',
        'surface-bright': '#F7F3EB',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#FCF8F3',
        'surface-container': '#F5EFE7',
        'surface-container-high': '#EEE8E0',
        'surface-container-highest': '#E7E1D9',
        'on-surface': '#1D1D1D',
        'on-surface-variant': '#776F4F',
        'inverse-surface': '#302F2E',
        'inverse-on-surface': '#F3F0EE',
        outline: '#776F4F',
        'outline-variant': '#B3A89A',
        'surface-tint': '#A16D47',

        // Primary colors
        primary: '#A16D47',
        'on-primary': '#ffffff',
        'primary-container': '#D9B89F',
        'on-primary-container': '#6B4C2F',
        'inverse-primary': '#D9B89F',
        'primary-fixed': '#D9B89F',
        'primary-fixed-dim': '#C9A089',
        'on-primary-fixed': '#3D2617',
        'on-primary-fixed-variant': '#6B4C2F',

        // Secondary colors
        secondary: '#776F4F',
        'on-secondary': '#ffffff',
        'secondary-container': '#A39A89',
        'on-secondary-container': '#5A5242',
        'secondary-fixed': '#A39A89',
        'secondary-fixed-dim': '#8B8270',
        'on-secondary-fixed': '#2A2420',
        'on-secondary-fixed-variant': '#5A5242',

        // Tertiary colors
        tertiary: '#C0AD8D',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#D9CCBA',
        'on-tertiary-container': '#8B8165',
        'tertiary-fixed': '#D9CCBA',
        'tertiary-fixed-dim': '#C1B5A2',
        'on-tertiary-fixed': '#3F3A2D',
        'on-tertiary-fixed-variant': '#8B8165',

        // Error colors
        error: '#BA1A1A',
        'on-error': '#ffffff',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',

        // Background
        background: '#F7F3EB',
        'on-background': '#1D1D1D',
        'surface-variant': '#EEE8E0',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        display: ['Angella White', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg-mobile': ['36px', { lineHeight: '1.2' }],
        'display-sm': ['40px', { lineHeight: '1.1', letterSpacing: '0.01em' }],
        'headline-md': ['32px', { lineHeight: '1.3' }],
        'headline-sm': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.6' }],
        'label-md': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        'unit': '8px',
        'gutter': '24px',
        'margin-mobile': '20px',
      },
      maxWidth: {
        'container': '1200px',
      },
      padding: {
        'section-lg': '120px',
      },
    },
  },
  plugins: [],
}

export default config
