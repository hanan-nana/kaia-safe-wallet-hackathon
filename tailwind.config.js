/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Glassmorphism 전용 색상 팔레트
      colors: {
        glass: {
          // 기본 글래스 배경
          primary: "rgba(255, 255, 255, 0.1)",
          secondary: "rgba(255, 255, 255, 0.05)",
          accent: "rgba(255, 255, 255, 0.15)",

          // 다크 글래스
          dark: "rgba(0, 0, 0, 0.1)",
          "dark-secondary": "rgba(0, 0, 0, 0.05)",

          // 컬러 글래스
          blue: "rgba(59, 130, 246, 0.1)",
          purple: "rgba(147, 51, 234, 0.1)",
          pink: "rgba(236, 72, 153, 0.1)",
          green: "rgba(34, 197, 94, 0.1)",
        },
      },

      // 글래스 전용 박스 그림자
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
        "glass-lg": "0 12px 48px 0 rgba(31, 38, 135, 0.5)",
      },

      // 글래스 전용 블러
      backdropBlur: {
        glass: "10px",
        "glass-sm": "6px",
        "glass-lg": "16px",
      },

      // 글래스 전용 보더
      borderColor: {
        glass: "rgba(255, 255, 255, 0.18)",
        "glass-dark": "rgba(0, 0, 0, 0.18)",
      },
    },
  },
  plugins: [],
};
