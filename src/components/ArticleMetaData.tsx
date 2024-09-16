import type { Post } from "@/modules/blogPosts";
import Link from "next/link";
import type { FC } from "react";

type Props = {
	post: Post;
};

export const ArticleMetaData: FC<Props> = (props) => {
	const { post } = props;

	return (
		<div
			className="
		flex flex-col md:flex-row
		gap-2 md:gap-4
		text-sm
		bg-background-secondary
		rounded-lg md:rounded-full
		px-4"
		>
			<div className="flex gap-2 self-stretch">
				<p className="flex flex-row items-center gap-1">
					<span className="i-tabler-calendar-filled" />
					{post.date}
				</p>
				<Link href={`/categories/${post.categories}`}>
					<p className="flex flex-row items-center gap-1">
						<span className="i-tabler-folder-filled" />
						{post.categories}
					</p>
				</Link>
			</div>
			<div className="flex flex-wrap gap-1">
				{post.tags?.map((tag) => (
					<Link key={tag} href={`/tags/${tag}`}>
						<p className="inline-flex items-center gap-1">
							<span className="i-tabler-tag-filled" />
							{tag}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};
