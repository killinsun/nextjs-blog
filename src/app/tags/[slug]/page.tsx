import React from "react";

import { ArticleHead } from "@/components/Article/ArticleHead";
import { getBlogPosts } from "@/modules/blogPosts";
import Link from "next/link";

export default async function TagPosts({
	params,
}: { params: { slug: string } }) {
	const tagSlug = params.slug;
	const decodedSlug = decodeURIComponent(tagSlug);

	const { posts, count } = await getBlogPosts(0, 100, undefined, decodedSlug);

	return (
		<div className="flex flex-col gap-16">
			<section className="flex flex-col gap-8 md:p-0">
				<h2 className="m-0 flex items-center gap-0">
					<span className="i-tabler-tag-filled" />
					{decodedSlug} の記事一覧 ({count} 件)
				</h2>
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
		</div>
	);
}
