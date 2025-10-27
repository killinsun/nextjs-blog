import { getTags } from "@/modules/blogPosts";
import Link from "next/link";

export const AllTags = async () => {
	const tags = await getTags();

	const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);
	return (
		<div>
			<ul className="flex flex-wrap">
				{sortedTags.map(([tag, count]) => (
					<li key={tag} className="px-2">
						<Link href={`/tags/${tag}`}>
							<p className="inline-flex items-center gap-0">
								<span className="i-tabler-tag-filled" />
								<span className="text-sm">{tag}</span>
								<span className="text-sm">({count})</span>
							</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};