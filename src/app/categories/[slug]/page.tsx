import React from "react";

import { ArticleCard } from "@/components/ArticleCard";
import { getBlogPosts } from "@/modules/blogPosts";

export default async function CategoryPosts({
	params,
}: { params: { slug: string } }) {
	const categorySlug = params.slug;
	const decodedSlug = decodeURIComponent(categorySlug);

	const { posts, count } = await getBlogPosts(0, 100, decodedSlug);

	return (
		<div className="flex flex-col gap-16">
			<section className="flex flex-col gap-8 p-4 md:p-0">
				<h2 className="m-0 flex items-center gap-0">
					<span className="i-tabler-folder-filled" />
					{decodedSlug} の記事一覧 ({count} 件)
				</h2>
				{posts.map((post) => (
					<ArticleCard key={post.slug} post={post} />
				))}
			</section>
		</div>
	);
}
