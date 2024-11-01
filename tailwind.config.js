// tailwind.config.js
// eslint-disable-next-line no-undef
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
        'fourth': '#0D3D38',
        'fifth': '#2D7A71 ',
        'sixth': '#1E1F24',
        'seventh': '#F3FBFA',
        'eighth': '#6AB5AB',
        'ninth': '#CBF3ED',
      },
    },
  },
  plugins: [],
};
