import { describe, it, expect } from 'vitest'
import { getCategories, getTags } from './blogPosts'

describe("getCategories", () => {
	it("should return an array of category meta objects", async () => {
		const categories = await getCategories();
		console.log(categories);
		expect(categories).toBeInstanceOf(Object);
		expect(Object.keys(categories).length).toBeGreaterThan(0);
	});
})

describe("getTags", () => {
	it("should return an array of tag meta objects", async () => {
		const tags = await getTags();
		console.log(tags);
		expect(tags).toBeInstanceOf(Object);
		expect(Object.keys(tags).length).toBeGreaterThan(0);
	});
})