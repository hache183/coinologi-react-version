import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import BlogCard from '../components/blog/BlogCard';
import { getPostBySlug, getRelatedPosts } from '../content/posts';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const relatedPosts = useMemo(() => getRelatedPosts(slug), [slug]);

  const sanitizedContent = useMemo(() => {
    if (!post?.content) {
      return '';
    }
    return DOMPurify.sanitize(post.content);
  }, [post]);

  if (!post) {
    return (
      <div className="container blog-post__error">
        <div className="alert alert--error" role="alert">
          Articolo non trovato
        </div>
        <button type="button" className="btn btn--secondary" onClick={() => navigate('/blog')}>
          Torna al blog
        </button>
      </div>
    );
  }

  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('it-IT') : null;
  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://coinologi.net/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt || 'Approfondimento blog Coinologi'}
        keywords={post.seo?.keywords}
      />

      <article className="blog-post">
        <header className="blog-post__hero">
          <div className="container blog-post__header">
            <div className="blog-post__meta">
              <span className="badge">{post.category || 'Senza categoria'}</span>
              {publishDate ? <time dateTime={publishDate}>{publishDate}</time> : null}
              <span>{post.author?.name || 'Coinologi Team'}</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt ? <p className="blog-post__excerpt">{post.excerpt}</p> : null}
            <div className="blog-post__actions">
              <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>
                ← Torna indietro
              </button>
              <div className="blog-post__share" aria-label="Condividi">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook" aria-hidden />
                  <span className="sr-only">Condividi su Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {post.featuredImage ? (
            <div className="blog-post__image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          ) : null}
        </header>

        <div className="container blog-post__content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </article>

      {relatedPosts.length > 0 ? (
        <section className="related-posts">
          <div className="container">
            <h2>Articoli correlati</h2>
            <div className="blog-grid">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogPost;
