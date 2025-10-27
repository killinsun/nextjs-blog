import { getCategories } from "@/modules/blogPosts";
import Link from "next/link";

export const AllCategories = async () => {
	const categories = await getCategories();
	const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
	return (
		<div>
			<ul className="flex flex-wrap">
				{sortedCategories.map(([category, count]) => (
					<li key={category} className="px-2">
						<Link href={`/categories/${category}`}>
						<p className="inline-flex items-center gap-0">
							<span className="i-tabler-folder-filled" />
						<span className="text-sm">{category}</span>
						<span className="text-sm">({count})</span>
						</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};