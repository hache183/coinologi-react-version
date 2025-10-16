import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import SEO from '../components/SEO';
import BlogCard from '../components/blog/BlogCard';
import { blogService } from '../services/blogService';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await blogService.getPostBySlug(slug, { signal: controller.signal });
        if (data.success) {
          setPost(data.post);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Articolo non trovato');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (!post?.category) return;

    const controller = new AbortController();

    const loadRelated = async () => {
      try {
        const data = await blogService.getPublicPosts(
          {
            category: post.category,
            limit: 3,
            page: 1
          },
          { signal: controller.signal }
        );
        if (data.success) {
          const filtered = data.posts.filter((item) => item.slug !== slug);
          setRelatedPosts(filtered);
        }
      } catch (_err) {
        // Ignora, non bloccare il rendering per suggerimenti mancanti
      }
    };

    loadRelated();

    return () => controller.abort();
  }, [post, slug]);

  const sanitizedContent = useMemo(() => {
    if (!post?.content) return '';
    return DOMPurify.sanitize(post.content);
  }, [post]);

  if (isLoading) {
    return (
      <div className="page-loader" role="status" aria-live="polite">
        <div className="loader-spinner" />
        <p>Caricamento articolo…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="alert alert--error" role="alert">
          {error}
        </div>
        <button type="button" className="btn btn--secondary" onClick={() => navigate('/blog')}>
          Torna al blog
        </button>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('it-IT') : null;

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
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-x-twitter" aria-hidden />
                  <span className="sr-only">Condividi su X</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook" aria-hidden />
                  <span className="sr-only">Condividi su Facebook</span>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin" aria-hidden />
                  <span className="sr-only">Condividi su LinkedIn</span>
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
                <BlogCard key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default BlogPost;
