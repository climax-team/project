4/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'light_bg_color': '#343446',
      'light_bg_color_op-50': 'rgba(52, 52, 70, 0.5)',
      'deep_bg_color': '#1e1e2c',
      'accent_color': '#9494ff',
      'accent_color_op-50': 'rgba(148, 148, 255, 0.5)',
      'form_gray_color': '#848484',
      'white': '#ffffff',
      'black': '#000000',
      'light_form_color': '#47474F',
    },
  },
  plugins: [],
}

