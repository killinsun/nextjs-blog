import Link from "next/link"
import { Post } from "../modules/blogPosts"
import { ArticleHead } from "./Article/ArticleHead"

type Props = {
	post: Post
}

export const ArticleCard = async (props: Props) => {
	const { post } = props;

	return (
		<article
			key={post.slug}
			className="group flex flex-col gap-1 p-4 rounded border-text border hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] has-[a:active]:translate-y-0 has-[a:active]:shadow"
		>
			<ArticleHead post={post}>
				<Link
					key={post.slug}
					href={`/posts${post.slug}`}
					className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
				>
					<h1 className="text-xl md:text-2xl group-hover:text-yellow-500 transition-all duration-300">
						{post.title}
					</h1>
				</Link>
			</ArticleHead>
			<div>
				<p className="text-sm break-words">{post.excerpt}</p>
			</div>
		</article>
	)
}