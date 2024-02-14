/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
        error: "var(--error-color)",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width)",
      },
      borderColor: {
        DEFAULT: "var(--primary-color)",
      },
    },
  },
};
