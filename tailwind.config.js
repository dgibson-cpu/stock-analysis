/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1628',
        surface: '#132040',
        accent: '#C9A84C',
        'accent-light': '#E8C97A',
        'text-primary': '#F0EDE6',
        'text-secondary': '#8A9BB5',
        danger: '#E05252',
        success: '#4CAF82',
        border: '#1E3157',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
