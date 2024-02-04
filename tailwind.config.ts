import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{jsx,tsx,}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      primary: "#fb7299",
      primaryActive: "#FF5C8B",
      // Background
      bgPage: "#ffffff",
      bgPageDark: "#222C3C",
      bgHover: "#DEE6F7",
      bgHoverDark: "#6C86AD80",
      bg1: "#E8EFFD",
      bg1Dark: "#E8EFFD",
      // Border
      // Divider
      divider1: "#ECECEC",
      divider1Dark: "#6C86AD80",
      // Text
      text1: "#121212",
      text1Dark: "#E8EFFD",
      text2: "#545454",
      text2Dark: "#FFFFFF80",
      textLink: "#2081E2",
      textLinkDark: "#2081E2",
    },
    extend: {
      spacing: {
        smallContentW: "11.8rem",
        contentW: "12.1rem",
        largeContentW: "15.12rem",
        headerHeight: ".7rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
