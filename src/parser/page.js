exports.parse = (page) => {
  return {
    id: page.id,
    title: page.meta_title,
    keywords: page.meta_keywords,
    excerpt: page.meta_description ? page.meta_description : null,
    slug: page.link_rewrite,
    content: page.content ? page.content : null
  };
};
