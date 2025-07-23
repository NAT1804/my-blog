import { z } from "astro:content";

export default z.object({
  isDraft: z.boolean(),
  title: z.string(),
  sortOrder: z.number(),
  heroImage: z.string(),
  description: z.string(),
  language: z.enum(["en", "vn"]).default("en").optional(),
  author: z.string().default("Tuanna184-dev").optional(),
  tags: z.array(z.string()).optional(),
  footnote: z.string().optional(),
  // Transform string to Date object
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  updatedDate: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  // Advanced: Validate that the string is also an email
  authorContact: z.string().email().optional(),
  // Advanced: Validate that the string is also a URL
  canonicalURL: z.string().url().optional(),
  robots: z.boolean().optional(),
});
