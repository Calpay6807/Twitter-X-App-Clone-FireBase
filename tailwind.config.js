/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backdrop: "#14171A",
        birdcolor: "#1DA1F2",
        darkgrey: "#1DA1F2",
      },
      lights: {
        colorheaderfooter: "#fff",
        colortext: "#000",
        colorbackground: "#f8f8fa",
      },
      darks: {
        colorheaderfooter: "#36394c",
        colortext: "#eff2f7",
        colorbackground: "#222736",
      },
    },
  },
  plugins: [],
};
