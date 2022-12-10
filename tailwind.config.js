/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            padding: {
                '1/2': '50%',
                full: '100%',
            },
        },
    },
    corePlugins: {
        aspectRatio: false,
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
