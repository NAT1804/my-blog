export function getListFiteredBlog(
  posts,
  {
    filterDrafts = true,
    filterFuturePosts = true,
    sortByDate = "desc",
    limit = undefined,
  } = {}
) {
  let filteredPosts = [...posts];
  if (filterDrafts) {
    filteredPosts = filteredPosts.filter((post) => !post.data.isDraft);
  }
  if (filterFuturePosts) {
    filteredPosts = filteredPosts.filter(
      (post) => new Date(post.data.pubDate.valueOf()) < new Date()
    );
  }

  switch (sortByDate) {
    case "asc":
      filteredPosts = filteredPosts;
      sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
      break;
    case "desc":
      filteredPosts = filteredPosts.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
      );
      break;
    default:
      break;
  }

  if (typeof limit === "number") {
    filteredPosts = filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
