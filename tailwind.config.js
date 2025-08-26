/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Glassmorphism 전용 색상 팔레트
      colors: {
        gray: {
          100: "#E0E7E0",
          200: "#C7CEC7",
          300: "#ADB4AE",
          400: "#949A95",
          500: "#7A807B",
          600: "#616662",
          700: "#474C49",
          800: "#2D3230",
          900: "#131816",
        },
        "green-gray": {
          100: "#E0E7E0",
          200: "#C7CEC7",
          300: "#ADB4AE",
          400: "#949A95",
          500: "#7A807B",
          600: "#616662",
          700: "#474C49",
          800: "#2D3230",
          900: "#131816",
        },

        glass: {
          // 기본 글래스 배경
          strong: "rgba(255, 255, 255, 0.7)",
          intermediate: "rgba(255, 255, 255, 0.5)",
          weak: "rgba(255, 255, 255, 0.2)",

          // 다크 글래스
          dark: "rgba(0, 0, 0, 0.08)",
          "dark-secondary": "rgba(0, 0, 0, 0.05)",
        },
      },

      // 글래스 전용 박스 그림자
      boxShadow: {
        glass: "0 8px 32px 0 rgba(13, 24, 22, 0.05)",
      },

      // 글래스 전용 보더
      borderColor: {
        glass: "rgba(13, 24, 22, 0.08)",
        "glass-dark": "rgba(0, 0, 0, 0.18)",
      },
    },
  },
  plugins: [],
};
