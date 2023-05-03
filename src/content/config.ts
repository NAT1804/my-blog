import { defineCollection } from 'astro:content';
import blogSchema from '../schemas/blogSchema'

const blogCollection = defineCollection({
	// Type-check frontmatter using a schema
	schema: blogSchema
});

export const collections = { 'blog': blogCollection };
