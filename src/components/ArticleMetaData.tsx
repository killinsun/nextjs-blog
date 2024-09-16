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
		gap-0 md:gap-8
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
				<p className="flex flex-row items-center gap-4">
					{post.categories.map((category) => (
						<Link key={category} href={`/categories/${category}`}>
							<p className="inline-flex items-center gap-1">
								<span className="i-tabler-folder-filled" />
								{category}
							</p>
						</Link>
					))}
				</p>
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
