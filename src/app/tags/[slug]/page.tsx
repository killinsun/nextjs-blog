import React from "react";

import { getBlogPosts } from "@/modules/blogPosts";
import { ArticleCard } from "../../../components/ArticleCard";

export default async function TagPosts({
	params,
}: { params: { slug: string } }) {
	const tagSlug = params.slug;
	const decodedSlug = decodeURIComponent(tagSlug);

	const { posts, count } = await getBlogPosts(0, 100, undefined, decodedSlug);

	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col gap-8 md:p-0">
				<h2 className="m-0 flex items-center gap-0">
					<span className="i-tabler-tag-filled" />
					{decodedSlug} の記事一覧 ({count} 件)
				</h2>
				{posts.map((post) => (
					<ArticleCard key={post.slug} post={post} />
				))}
			</section>
		</div>
	);
}
