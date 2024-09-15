import type { Post } from "@/modules/blogPosts";
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
				<p className="flex flex-row items-center gap-1">
					<span
						className="i-tabler-folder-filled
					"
					/>
					{post.categories}
				</p>
			</div>
			<div className="flex flex-wrap gap-1">
				{post.tags?.map((tag) => (
					<p key={tag} className="inline-flex items-center gap-1">
						<span className="i-tabler-tag-filled" />
						{tag}
					</p>
				))}
			</div>
		</div>
	);
};
