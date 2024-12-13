/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  safelist: [
    ...['red', 'blue', 'green', 'yellow', 'gray', 'purple', 'orange', 'pink', 'indigo'].flatMap(color =>
      ['100', '200', '300', '400', '500', '600', '700', '800', '900'].map(shade => [
        `bg-${color}-${shade}`,    
        `text-${color}-${shade}`,  
      ]).flat() 
    )
  ],
}

