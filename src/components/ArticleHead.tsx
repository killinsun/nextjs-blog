import type { Post } from "@/modules/blogPosts";
import Link from "next/link";
import React, { type FC, type ReactNode } from "react";

type Props = {
	post: Post;
	children?: ReactNode;
};

export const ArticleHead: FC<Props> = (props) => {
	const { post, children } = props;

	return (
		<div
			className="flex flex-col gap-0 md:gap-1 text-sm border-b-text pb-2"
			style={{
				borderBottom: "2px solid #f2df98",
			}}
		>
			<p className="flex flex-row items-center gap-1">
				<span className="i-tabler-calendar-filled" />
				{post.date}
			</p>
			{children}
			<div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-8">
				<div className="flex flex-wrap items-center gap-1">
					{post.categories.map((category) => (
						<Link key={category} href={`/categories/${category}`}>
							<p className="inline-flex items-center gap-0">
								<span className="i-tabler-folder-filled" />
								{category}
							</p>
						</Link>
					))}
				</div>
				<div className="flex flex-wrap items-center gap-2">
					{post.tags?.map((tag) => (
						<Link key={tag} href={`/tags/${tag}`}>
							<p className="inline-flex items-center gap-0">
								<span className="i-tabler-tag-filled" />
								{tag}
							</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
