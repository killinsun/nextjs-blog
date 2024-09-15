import path from "node:path";
import { ArticleMetaData } from "@/components/ArticleMetaData";
import { getPost } from "@/modules/blogPosts";
import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { type FC, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

const DEFAULT_ALLOWED_ELEMENTS = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"p",
	"a",
	"img",
	"ul",
	"ol",
	"li",
	"br",
	"pre",
	"code",
	"span",
	"u",
	"strong",
	"sub",
	"sup",
	"s",
	"div",
	"style",
];

const ImageComponent: FC<{
	slug: string[];
	className?: string;
	src?: string;
	alt?: string;
}> = (props) => {
	const { slug, className, src, alt } = props;
	if (!src) return null;

	// src が"public" から始まる場合はpublicを取り除いて。
	if (src.startsWith("/public")) {
		const splitSrc = src.split("/public");
		const newSrc = splitSrc.join("");

		return <img className={className} src={newSrc} alt={alt || ""} />;
	}

	const dirPath = slug.slice(0, -1).join("/");
	const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
	const imagePath = `/${dirPath}/${cleanSrc}`;

	return (
		<Image
			className={className}
			src={imagePath}
			alt={alt || ""}
			width={500}
			height={300}
		/>
	);
};

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
		title: post?.title,
		description: post?.excerpt,
		keywords: `プログラミング, フロントエンド, バックエンド, 副業, エンジニア, ${post?.tags?.join(",") ?? ""}`,
		openGraph: {
			title: post?.title,
			description: post?.excerpt,
			type: "article",
			publishedTime: post?.date,
			authors: ["Killinsun"],
			images: [
				{
					url: post?.coverImage || "/default-og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
				...previousImages,
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post?.title,
			description: post?.excerpt,
			images: [post?.coverImage || "/default-og-image.jpg"],
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
			<article className="flex flex-col gap-y-16">
				<div className="flex flex-col">
					<h1 className="text-xl md:text-2xl px-4 py-2">{post?.title}</h1>
					<div className="px-2">{post && <ArticleMetaData post={post} />}</div>
				</div>
				<div className="px-4 md:px-16 text-sm md:text-base">
					{post && (
						<ReactMarkdown
							allowedElements={DEFAULT_ALLOWED_ELEMENTS}
							rehypePlugins={[rehypeRaw]}
							components={{
								p: (props) => {
									return <p className="mb-8" {...props} />;
								},
								ul: (props) => {
									return (
										<ul
											className="flex flex-col list-disc list-inside p-8 rounded-xl bg-gray-100 gap-1"
											{...props}
										/>
									);
								},
								img: (props) => {
									return (
										<ImageComponent
											className={props.className}
											slug={slug}
											src={props.src}
											alt={props.alt}
										/>
									);
								},
								code(props) {
									const { children, className, node, ...rest } = props;

									const match = /language-(\w+)/.exec(className || "");

									const getHTML = (content: ReactNode): string => {
										if (typeof content === "string") {
											return content;
										}
										if (Array.isArray(content)) {
											return content.map(getHTML).join("");
										}
										if (React.isValidElement(content)) {
											return getHTML(content.props.children);
										}
										return "";
									};

									return (
										<>
											{match && (
												<div className="bg-[#fdf6e3] max-w-fit px-4 py-1 rounded-t-lg">
													{match[1]}
												</div>
											)}
											{match ? (
												<SyntaxHighlighter
													language={match ? match[1] : "text"}
													useInlineStyles={!!match}
													style={solarizedlight}
													showLineNumbers={!!match}
													customStyle={{
														display: "inline-block",
														backgroundColor: "#fdf6e3",
														color: "#73613e",
														padding: "0 8px",
														borderRadius: "0 8px 8px 8px",
														margin: "0",
														width: "100%",
														maxWidth: "100%",
													}}
												>
													{getHTML(children)}
												</SyntaxHighlighter>
											) : (
												<code className={className} {...rest}>
													{children}
												</code>
											)}
										</>
									);
								},
							}}
						>
							{post.content}
						</ReactMarkdown>
					)}
				</div>
			</article>
		</main>
	);
}
