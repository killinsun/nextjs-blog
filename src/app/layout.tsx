import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalHeader } from "@/components/GlobalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<GoogleAnalytics gaId="G-9LH5TWEG5T" />
			<body className={`${inter.className}`}>
				<GlobalHeader />
				<main className="my-8 text-text-secondary max-w-screen-lg mx-auto">
					{children}
				</main>
			</body>
		</html>
	);
}
