import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalFooter } from "@/components/GlobalFooter";
import { GlobalHeader } from "@/components/GlobalHeader";
import Script from "next/script";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://blog.killinsun.com"),
	title: "お首が長いのよ",
	description:
		"チラシの裏よりお届けするソフトウェアエンジニアとして成長したい人のためのブログ",
	keywords: "プログラミング, フロントエンド, バックエンド, 副業, エンジニア",
	openGraph: {
		url: "https://killinsun.com",
		siteName: "お首が長いのよ",
		title: "お首が長いのよ",
		description:
			"チラシの裏よりお届けするソフトウェアエンジニアとして成長したい人のためのブログ",
		type: "website",
		images: {
			url: "/default-og-image.png",
			width: 420,
			height: 420,
			alt: "お首が長いのよ_og",
		},
	},
	twitter: {
		card: "summary",
		title: "お首が長いのよ",
		description:
			"チラシの裏よりお届けするソフトウェアエンジニアとして成長したい人のためのブログ",
		images: {
			url: "/default-og-image.png",
			width: 420,
			height: 420,
			alt: "お首が長いのよ_og",
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
			<Script src="https://j.wovn.io/1" data-wovnio="key=Zlq6ux" async />
			<GoogleAnalytics gaId="G-9LH5TWEG5T" />
			<Script
				async={true}
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6418958272896113"
				crossOrigin="anonymous"
			/>
			<body className={`${inter.className}`}>
				<GlobalHeader />
				<main
					className="flex flex-col mx-auto
				py-8 text-text-secondary max-w-screen-lg"
				>
					{children}
				</main>
				<GlobalFooter />
			</body>
		</html>
	);
}
