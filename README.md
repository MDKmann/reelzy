# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Vite + Tailwind + Prettier + ESlint setup

1. npm create vite @latest "project name"-- --template react
2. npm install
3. npm install -D tailwindcss postcss autoprefixer
4. npx tailwindcss init -p
5. configure tailwind template paths in 'tailwind.config.js'
        content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
6. add tailwind directives to index.css file 
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
7. npx eslint --init
8. npm install eslint-plugin-tailwindcss
9. npm install eslint-config-prettier
10. npm install prettier