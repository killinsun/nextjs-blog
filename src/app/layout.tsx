import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalFooter } from "@/components/GlobalFooter";
import { GlobalHeader } from "@/components/GlobalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://blog.killinsun.com"),
	title: "お首が長いのよ",
	description: "チラシの裏",
	keywords: "プログラミング, フロントエンド, バックエンド, 副業, エンジニア",
	openGraph: {
		url: "https://killinsun.com",
		siteName: "お首が長いのよ",
		title: "お首が長いのよ",
		description: "チラシの裏",
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
		description: "チラシの裏",
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
