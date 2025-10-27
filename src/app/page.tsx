
import { getBlogPosts } from "@/modules/blogPosts";
import Link from "next/link";
import { AllCategories } from "@/components/AllCategories";
import { ArticleCard } from "@/components/ArticleCard";

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
		<div className="flex flex-col gap-8">
			<AllCategories />
			<section className="flex flex-col gap-4 md:p-0">
				{posts.map((post) => (
					<ArticleCard key={post.slug} post={post} />
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
