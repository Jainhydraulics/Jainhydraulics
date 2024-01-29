/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
		"./node_modules/preline/preline.js",
	],
	theme: {
		extend: {
			keyframes: {
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-100%)" },
				},
			},
			animation: {
				marquee: "marquee 25s linear infinite",
				marqueeSlow: "marquee 100s linear infinite",
			},
			fontFamily: {
				customHead: ["'Montserrat'"],
			},
		},
	},
	darkMode: "class",
	plugins: [require("preline/plugin"), require("@tailwindcss/typography")],
};
