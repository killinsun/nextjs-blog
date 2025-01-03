import { getBlogPosts } from "@/modules/blogPosts";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const defaultPages: MetadataRoute.Sitemap = [
		{
			url: "https://blog.killinsun.com",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: "https://blog.killinsun.com/posts/fixed-articles/who_am_i",
			lastModified: new Date("2024-09-15 00:00:00"),
			changeFrequency: "yearly",
			priority: 0.5,
		},
		{
			url: "https://blog.killinsun.com/posts/fixed-articles/privacy_policy",
			lastModified: new Date("2024-09-16 00:00:00"),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	const sitemapXml = await readSitemapXml();
	const dynamicPages = await generateSitemap();

	return [...defaultPages, ...dynamicPages];
}

const readSitemapXml = async () => {
	const sitemap = await fetch("https://blog.killinsun.com/sitemap.xml");
	// 1週間以上古い場合は新しく生成
	if (
		new Date(sitemap.headers.get("last-modified") ?? 0) <
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	) {
		return null;
	}

	return await sitemap.text();
};

export const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const { posts } = await getBlogPosts(0, 1000);

	const jaPosts: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `https://blog.killinsun.com/posts${post.slug}`,
		changeFrequency: "never",
		priority: 0.5,
		lastModified: post.date,
	}));

	const enPosts: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `https://blog.killinsun.com/posts${post.slug}?wovn=en`,
		changeFrequency: "never",
		priority: 0.5,
		lastModified: post.date,
	}));

	const koPosts: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `https://blog.killinsun.com/posts${post.slug}?wovn=ko`,
		changeFrequency: "never",
		priority: 0.5,
		lastModified: post.date,
	}));

	return [...jaPosts, ...enPosts, ...koPosts];
};
