import { ArticleMetaData } from "@/components/ArticleMetaData";
import { getBlogPosts } from "@/modules/blogPosts";
import Link from "next/link";

export default async function Home({
	searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const page = Number(searchParams.page as string) || 1;
	const limit = 10;
	const { posts, count } = await getBlogPosts(
		page === 1 ? 0 : (page - 1) * limit,
		limit,
	);
	const pages = Math.ceil(count / limit);

	return (
		<>
			<div className="flex flex-col">
				{posts.map((post) => (
					<Link key={post.slug} href={`/posts${post.slug}`}>
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
			<div className="flex justify-center my-4">
				<div className="flex gap-4">
					{Array.from({ length: pages }, (_, i) => (
						<Link key={`page-${i + 1}`} href={`/?page=${i + 1}`}>
							<div
								className={`px-4 py-2 border rounded-full hover:bg-gray-200 ${page === i + 1 ? "bg-gray-200" : ""}`}
							>
								{i + 1}
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
