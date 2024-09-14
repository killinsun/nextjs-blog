import { ArticleMetaData } from "@/components/ArticleMetaData";
import { getPost } from "@/modules/blogPosts";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

export default async function BlogPost({
	params,
}: { params: { slug: string[] } }) {
	const slug = params.slug;
	const post = await getPost(slug);

	return (
		<main>
			<article className="my-8">
				<h1 className="text-2xl px-4 py-2">{post?.title}</h1>
				<div className="px-2">{post && <ArticleMetaData post={post} />}</div>
				<div className="blog-post">
					{post && (
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							components={{
								code(props) {
									const { children, className, node, ...rest } = props;
									const match = /language-(\w+)/.exec(className || "");
									return (
										<>
											{match && (
												<div className="bg-[#fdf6e3] max-w-fit px-4 py-1 rounded-t-lg">
													{match[1]}
												</div>
											)}
											{match ? (
												<SyntaxHighlighter
													children={String(children).replace(/\n$/, "")}
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
												/>
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
