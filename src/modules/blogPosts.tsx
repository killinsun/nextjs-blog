import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

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
): Promise<{ posts: Post[]; count: number }> => {
	const startTime = Date.now();
	const postsDirectory = path.join(process.cwd(), "posts");

	const filePaths = getPostFilePaths(postsDirectory, []);

	const posts = await Promise.all(
		filePaths.map(async (filePath) => {
			const fileContents = fs.readFileSync(filePath, "utf8");
			const { data, content } = matter(fileContents);

			const body = await unified()
				.use(remarkParse)
				.use(remarkHtml)
				.process(content);
			const html = body.toString();

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
				content: html,
				excerpt:
					data.excerpt !== "" ? data.excerpt : `${content.slice(0, 200)}...`,
			};
		}),
	).then((posts) =>
		posts
			.filter((post) => post.slug.indexOf("fixed-articles") === -1)
			.sort((a, b) => (a.formatter.date > b.formatter.date ? -1 : 1))
			.slice(offset, offset + limit),
	);

	const elapsedTime = Date.now() - startTime;
	console.log("elapsedTime sec", elapsedTime / 1000);
	return {
		posts,
		count: filePaths.length,
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

	const body = await unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(content);

	const html = body.toString();

	const elapsedTime = Date.now() - startTime;
	console.log("elapsedTime sec", elapsedTime / 1000);
	return {
		slug: slug.join("/"),
		date: data.date,
		title: data.title,
		categories: data.categories,
		tags: data.tags,
		content: html,
		excerpt: data.excerpt !== "" ? data.excerpt : `${content.slice(0, 200)}...`,
	};
};

export const getCategories = async (posts: Post[]): Promise<Set<string>> => {
	const categories = posts.flatMap((post) => post.categories);
	return new Set(categories);
};

export const getTags = async (posts: Post[]): Promise<Set<string>> => {
	const tags = posts.flatMap((post) => post.tags);
	return new Set(tags);
};
