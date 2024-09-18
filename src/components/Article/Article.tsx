import { ArticleBottom } from "@/components/Article/ArticleBottom";
import { ArticleHead } from "@/components/Article/ArticleHead";
import { ArticleImage } from "@/components/Article/ArticleImage";
import type { Post } from "@/modules/blogPosts";
import React, { type FC, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
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
	"iframe",
	"quote",
	"blockquote",
];

type Props = {
	post: Post;
	slug: string[];
};

export const Article: FC<Props> = (props) => {
	const { post, slug } = props;

	return (
		<article className="flex flex-col gap-y-4 px-4">
			<div className="flex flex-col">
				<ArticleHead post={post}>
					<h1 className="text-xl md:text-2xl">{post.title}</h1>
				</ArticleHead>
			</div>
			<div className="text-sm md:text-base">
				<ReactMarkdown
					allowedElements={DEFAULT_ALLOWED_ELEMENTS}
					rehypePlugins={[rehypeRaw]}
					components={{
						p: (props) => {
							return <p className="mb-8" {...props} />;
						},
						blockquote: (props) => {
							return (
								<blockquote
									className="border-l-8 border-gray-400 pl-2 italic"
									{...props}
								/>
							);
						},
						a: (props) => {
							return (
								<a
									className="text-blue-500 underline hover:text-blue-700"
									{...props}
								/>
							);
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
								<ArticleImage
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
							const fileName = match
								? (className?.split(":")[1] || "").trim() || ""
								: "";

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
										<div className="bg-[#fdf6e3] max-w-fit px-4 py-1 rounded-t-lg font-bold">
											{match[1]}
											{fileName && `: ${fileName}`}
										</div>
									)}
									{match ? (
										<SyntaxHighlighter
											language={match ? match[1] : "text"}
											useInlineStyles={!!match}
											style={solarizedlight}
											showLineNumbers={!!match}
											customStyle={{
												backgroundColor: "#fdf6e3",
												color: "#73613e",
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
			</div>
			<ArticleBottom post={post} />
		</article>
	);
};
