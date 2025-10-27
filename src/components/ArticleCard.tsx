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
			className="flex flex-col gap-1 p-4 rounded border-text border"
		>
			<ArticleHead post={post}>
				<Link key={post.slug} href={`/posts${post.slug}`}>
					<h1 className="text-xl md:text-2xl">{post.title}</h1>
				</Link>
			</ArticleHead>
			<div>
				<p className="text-sm break-words">{post.excerpt}</p>
			</div>
		</article>
	)
}