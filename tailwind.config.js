import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';
// import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/js/**/*.vue',
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            colors: {
                'primary': '#0b4b74',
                'primary-light': '#0d6f9a',
                'primary-dark': '#0a3a53',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    prefix: 'tw-',

    // plugins: [forms, typography],
};
