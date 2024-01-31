import { getBlogPosts, getCategories, getTags } from "@/modules/blogPosts";
import Link from "next/link";
import {ArticleMetaData} from "@/components/ArticleMetaData";

export default async function Home() {
	const posts = await getBlogPosts();

	return (
		<>
			<div className="flex flex-col">
				{posts.map((post) => (
					<Link href={`/posts${post.slug}`}>
						<article key={post.slug} className="mx-4 my-8">
							<h1 className="py-2">{post.title}</h1>
							<ArticleMetaData post={post} />
							<div className="py-2">
								<p>{post.excerpt}</p>
							</div>
						</article>
					</Link>
				))}
			</div>
		</>
	);
}
