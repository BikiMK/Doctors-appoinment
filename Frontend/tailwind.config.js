// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#5f6FFF",
//       },
//       gridTemplateColumns:{
//         'auto' : 'repeat(auto-fill, minmax(200px, 1fr))'
//       }
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // Example: blue-600, adjust to your design
      },
    },
  },
  plugins: [],
};
