import { ArticleHead } from "@/components/ArticleHead";
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
		<div className="flex flex-col gap-16">
			<section className="flex flex-col gap-4 md:p-0">
				{posts.map((post) => (
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
				))}
			</section>
			<div className="flex justify-center my-4">
				<div className="flex flex-wrap gap-2 md:gap-4">
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
		</div>
	);
}
