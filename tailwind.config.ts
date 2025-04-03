/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans your files
	],
	theme: {
		extend: {
			colors: {
				brand: "#131316", // Example custom color
			},
		},
	},
	plugins: [],
};
