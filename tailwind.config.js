/** @type {import('tailwindcss').Config} */
module.exports = {
  /** arquivos que contêm classes Tailwind */
  content: [
    './src/app/**/*.{ts,tsx}',   // páginas e componentes
    './src/lib/**/*.{ts,tsx}',   // helpers, se houver
  ],

  theme: {
    extend: {
  colors: {
    bg:     '#0d0d0f',   // um tom ainda mais “carbon”
    card:   '#1a1b21',
    glass:  'rgba(255,255,255,0.05)', // vidro fosco
    accent: '#ff7c3d',   // laranja + neon
    accent2:'#2dd4bf',   // verde água p/ gradiente
  },
  boxShadow: {
    glass: '0 4px 30px rgba(0,0,0,0.4)',
  },
  backdropBlur: {
    glass: '8px',
  },
},
plugins: [
  require('@tailwindcss/line-clamp'),
],
}
};
