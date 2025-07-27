import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Beige theme color system
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Custom beige theme colors
        'beige': {
          50: '#FCFCFA',   // Warm white
          100: '#FAFAF7',  // Light cream
          200: '#F5F5DC',  // Main beige
          300: '#E8E2D5',  // Light tan
          400: '#D4A574',  // Golden accent
          500: '#B8956A',  // Warm brown
          600: '#9A7B56',  // Medium brown
          700: '#7D6142',  // Dark brown
          800: '#5A4530',  // Very dark brown
          900: '#2A2520',  // Almost black brown
        },
        'warm': {
          50: '#FCFCFA',
          100: '#F9F7F4',
          200: '#F0EBE3',
          300: '#E8E2D5',
          400: '#D1C7B8',
          500: '#B8A693',
          600: '#9A8570',
          700: '#7D6B56',
          800: '#5A4F42',
          900: '#3D3530',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.7' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(42, 37, 32, 0.08)',
        'medium': '0 4px 16px rgba(42, 37, 32, 0.12)',
        'large': '0 8px 32px rgba(42, 37, 32, 0.16)',
        'xl': '0 12px 48px rgba(42, 37, 32, 0.2)',
        'inner-soft': 'inset 0 2px 4px rgba(42, 37, 32, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'bounce-soft': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'soft': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    // Custom plugin for beige theme utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-soft': {
          textShadow: '0 1px 3px rgba(42, 37, 32, 0.3)',
        },
        '.text-shadow-medium': {
          textShadow: '0 2px 6px rgba(42, 37, 32, 0.4)',
        },
        '.backdrop-blur-soft': {
          backdropFilter: 'blur(8px)',
        },
        '.backdrop-blur-medium': {
          backdropFilter: 'blur(12px)',
        },
        '.backdrop-blur-strong': {
          backdropFilter: 'blur(20px)',
        },
        '.gradient-beige': {
          background: 'linear-gradient(135deg, #F5F5DC 0%, #E8E2D5 100%)',
        },
        '.gradient-warm': {
          background: 'linear-gradient(135deg, #B8956A 0%, #D4A574 100%)',
        },
        '.gradient-text-warm': {
          background: 'linear-gradient(135deg, #B8956A 0%, #D4A574 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        }
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
