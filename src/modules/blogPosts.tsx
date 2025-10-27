import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
	slug: string;
	categories: string[];
	tags: string[];
	date: string;
	title: string;
	excerpt: string;
	content: string;
	coverImage?: string;
};

const getPostFilePaths = (dir: string, child: string[]): string[] => {
	const fileOrDirectoryNames = fs.readdirSync(dir);
	for (const fileOrDirectoryName of fileOrDirectoryNames) {
		const filePath = path.join(dir, fileOrDirectoryName);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) {
			getPostFilePaths(filePath, child);
		} else {
			child.push(filePath);
		}
	}

	return child;
};

export const getBlogPosts = async (
	offset = 0,
	limit = 10,
	categoryName?: string,
	tagName?: string,
): Promise<{ posts: Post[]; count: number }> => {
	const startTime = Date.now();
	const today = startTime;
	const postsDirectory = path.join(process.cwd(), "posts");

	const filePaths = getPostFilePaths(postsDirectory, []);

	const posts = await Promise.all(
		filePaths.map(async (filePath) => {
			const fileContents = fs.readFileSync(filePath, "utf8");
			const { data, content } = matter(fileContents);

			// remove process.cwd() from filePath
			const slug = filePath
				.replace(process.cwd(), "/")
				.replace("/posts/", "")
				.replace(".md", "");

			return {
				slug: slug,
				date: data.date,
				title: data.title,
				categories: data.categories,
				tags: data.tags,
				formatter: data,
				content: content,
				excerpt:
					data.excerpt !== "" ? data.excerpt : `${content.slice(0, 200)}...`,
			};
		}),
	).then((posts) =>
		posts
			.filter((post) => post.slug.indexOf("fixed-articles") === -1)
			.filter((post) => today >= new Date(post.formatter.date).getTime()) // 未来の記事は表示しない≒予約投稿
			.filter((post) => {
				if (!categoryName) return true;

				return post.categories?.includes(categoryName);
			})
			.filter((post) => {
				if (!tagName) return true;

				return post.tags?.includes?.(tagName);
			})
			.sort((a, b) => (a.formatter.date > b.formatter.date ? -1 : 1))
			.slice(offset, offset + limit),
	);

	const elapsedTime = Date.now() - startTime;
	console.log("elapsedTime sec", elapsedTime / 1000);
	return {
		posts,
		count: categoryName || tagName ? posts.length : filePaths.length,
	};
};

export const getPost = async (slug: string[]): Promise<Post | null> => {
	const startTime = Date.now();
	const postsDirectory = path.join(process.cwd(), "posts");

	const filePath = `${path.join(postsDirectory, ...slug)}.md`;
	if (path.extname(filePath) !== ".md") {
		return null;
	}
	const fileContents = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContents);

	const elapsedTime = Date.now() - startTime;
	console.log("elapsedTime sec", elapsedTime / 1000);
	return {
		slug: slug.join("/"),
		date: data.date,
		title: data.title,
		categories: data.categories,
		tags: data.tags,
		content: content,
		excerpt: data.excerpt !== "" ? data.excerpt : `${content.slice(0, 200)}...`,
	};
};

/**
 * Get the categories of the posts
 * @returns Record<string, number> - A record of category names and the number of posts that have the category
 */
export const getCategories = async (): Promise<Record<string, number>> => {
	const postsDirectory = path.join(process.cwd(), "posts");
	const filePaths = getPostFilePaths(postsDirectory, []);

	const getCategoriesPromise = async (filePath: string) => {
		const fileContents = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContents);
		return data.categories?.map((category: string) => category) ?? [];
	}
	const categories = await Promise.all(filePaths.map(getCategoriesPromise));
	return categories.flat().reduce((acc, category) => {
		acc[category] = (acc[category] || 0) + 1;
		return acc;
	}, {});
};

/**
 * Get the tags of the posts
 * @returns Record<string, number> - A record of tag names and the number of posts that have the tag
 */
export const getTags = async (): Promise<Record<string, number>> => {
	const postsDirectory = path.join(process.cwd(), "posts");
	const filePaths = getPostFilePaths(postsDirectory, []);

	const getTagsPromise = async (filePath: string) => {
		const fileContents = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContents);
		return data.tags?.map((tag: string) => tag) ?? [];
	}
	const tags = await Promise.all(filePaths.map(getTagsPromise));
	return tags.flat().reduce((acc, tag) => {
		acc[tag] = (acc[tag] || 0) + 1;
		return acc;
	}, {});
};