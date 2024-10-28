// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Procesa todos los archivos en la carpeta src con extensiones .js, .jsx, .ts y .tsx
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#white',
        'secondary': '#fcede5',
        'tertiary': '#282828',
        'fourth': '#10D069',
        'fifth': '#white',
      },
    },
  },
  plugins: [],
};
