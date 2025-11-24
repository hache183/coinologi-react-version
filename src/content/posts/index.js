const loadPosts = () => {
  const context = require.context('./entries', false, /\.js$/);
  const seenSlugs = new Set();

  return context.keys().map((key) => {
    const mod = context(key);
    const post = mod.default || mod;

    if (!post || typeof post !== 'object') {
      throw new Error(`Invalid post module: ${key}`);
    }

    if (!post.slug) {
      throw new Error(`Missing slug for post module: ${key}`);
    }

    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate slug detected: ${post.slug}`);
    }

    seenSlugs.add(post.slug);

    return {
      author: { name: 'Coinologi Team' },
      tags: [],
      ...post
    };
  }).sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });
};

const posts = loadPosts();

export const getAllPosts = () => posts.slice();

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug);

export const getRelatedPosts = (slug, limit = 3) => {
  const current = getPostBySlug(slug);
  if (!current) {
    return [];
  }

  const sameCategory = current.category
    ? posts.filter((post) => post.slug !== slug && post.category === current.category)
    : [];

  const fallback = posts.filter((post) => post.slug !== slug && !sameCategory.includes(post));

  return [...sameCategory, ...fallback].slice(0, limit);
};

export const listCategories = () => {
  const categories = new Set();
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};
