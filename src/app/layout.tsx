import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalFooter } from "@/components/GlobalFooter";
import { GlobalHeader } from "@/components/GlobalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "お首が長いのよ",
	description: "チラシの裏",
	keywords: "プログラミング, フロントエンド, バックエンド, 副業, エンジニア",
	twitter: {
		title: "お首が長いのよ",
		description: "チラシの裏",
		images: {
			url: "",
			type: "image/png",
			width: 1200,
			height: 630,
			alt: "",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<GoogleAnalytics gaId="G-9LH5TWEG5T" />
			<body className={`${inter.className}`}>
				<GlobalHeader />
				<main
					className="flex flex-col mx-auto
				py-8 text-text-secondary max-w-screen-md"
				>
					{children}
				</main>
				<GlobalFooter />
			</body>
		</html>
	);
}
