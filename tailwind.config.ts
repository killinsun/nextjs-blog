import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import type { Config } from "tailwindcss";

type MyConfig = {
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: string;
					secondary: string;
					tertiary: string;
				};
			};
		};
	};
} & Config;

const config: MyConfig = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: "#73613e",
					secondary: "#f2df98",
					tertiary: "",
				},
				text: {
					DEFAULT: "#f2df98",
					secondary: "#404015",
					tertiary: "",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		iconsPlugin({
			collections: getIconCollections(["tabler"]),
		}),
	],
};
export default config;
