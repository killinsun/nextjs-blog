import {FC} from "react";
import {Post} from "@/modules/blogPosts";

type Props = {
	post: Post;
}

export const ArticleMetaData:FC<Props> = (props) => {
	const {post} = props

	return (
		<div className="flex gap-4 text-sm bg-background-secondary rounded-full px-4">
			<p>{post.date}</p>
			<p>{post.categories}</p>
			<div>
				{post.tags?.map((tag) => (
					<p key={tag} className="inline-flex flex-col mx-1">
						{tag}
					</p>
				))}
			</div>
		</div>
	)
}