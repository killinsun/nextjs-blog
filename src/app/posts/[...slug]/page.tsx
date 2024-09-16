import path from "node:path";
import { Article } from "@/components/Article/Article";
import { ArticleHead } from "@/components/ArticleHead";
import { getPost } from "@/modules/blogPosts";
import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { type FC, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

type Props = {
	params: { slug: string[] };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const slug = params.slug;
	const post = await getPost(slug);

	// オプション: 親のメタデータを取得
	const previousImages = (await parent).openGraph?.images || [];

	return {
		metadataBase: new URL("https://blog.killinsun.com"),
		title: post?.title,
		description: post?.excerpt,
		keywords: `プログラミング, フロントエンド, バックエンド, 副業, エンジニア, ${post?.tags?.join(",") ?? ""}`,
		openGraph: {
			url: `https://killinsun.com/posts/${slug.join("/")}`,
			siteName: "お首が長いのよ",
			title: post?.title,
			description: post?.excerpt,
			type: "article",
			publishedTime: post?.date,
			authors: ["Killinsun"],
			images: [
				{
					url: post?.coverImage || "/default-og-image.png",
					width: post?.coverImage ? 1200 : 420,
					height: post?.coverImage ? 630 : 420,
					alt: post?.title,
				},
				...previousImages,
			],
		},
		twitter: {
			card: post?.coverImage ? "summary_large_image" : "summary",
			title: post?.title,
			description: post?.excerpt,
			images: [post?.coverImage || "/default-og-image.png"],
		},
	};
}
export default async function BlogPost({
	params,
}: { params: { slug: string[] } }) {
	const slug = params.slug;
	const post = await getPost(slug);

	return (
		<main>
			<Head>
				<title>{post?.title}</title>
			</Head>
			{post && <Article post={post} slug={slug} />}
		</main>
	);
}
