import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getListFiteredBlog } from "../utils/filter-blog";

export async function GET(context) {
  const posts = await getCollection("blog");
  const filteredPosts = getListFiteredBlog(posts);
  return rss({
    stylesheet: "/rss/styles.xsl",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: filteredPosts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
      customData: `
				<author>${post.data.author}</author>
			`,
    })),
  });
}
