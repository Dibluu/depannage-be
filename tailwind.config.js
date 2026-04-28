/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange:  '#FF6B35',
        navy:    '#1A1A2E',
        'navy-2': '#0F2952',
        green:   '#22C55E',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  // Disable container so it doesn't conflict with existing .container CSS class
  corePlugins: {
    container: false,
  },
}
