import { getBlogPosts } from "@/modules/blogPosts";
import type { Metadata, MetadataRoute } from "next";

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
			lastModified: "2024-09-15T00:00:00.000Z",
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	const dynamicPages = await generateSitemap();

	return [...defaultPages, ...dynamicPages];
}

export const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const { posts } = await getBlogPosts(0, 1000);

	return posts.map((post) => ({
		url: `https://blog.killinsun.com/posts${post.slug}`,
		lastModified: "never",
		changeFrequency: "never",
		priority: 0.5,
	}));
};
