import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';
import BlogCard from '../components/blog/BlogCard';
import BlogCategories from '../components/blog/BlogCategories';
import BlogSearch from '../components/blog/BlogSearch';
import { blogService } from '../services/blogService';

const INITIAL_SORT = { field: 'publishedAt', order: 'desc' };

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(INITIAL_SORT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await blogService.getPublicPosts(
          {
            page,
            limit: 12,
            category,
            search,
            sort: sort.field,
            order: sort.order
          },
          { signal: controller.signal }
        );

        if (data.success) {
          setPosts(data.posts);
          setTotal(data.total);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Impossibile caricare gli articoli');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();

    return () => controller.abort();
  }, [page, category, search, sort.field, sort.order]);

  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category).filter(Boolean));
    return Array.from(unique).sort();
  }, [posts]);

  const totalPages = Math.max(1, Math.ceil(total / 12));

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  return (
    <>
      <SEO title="Blog Coinologi" description="Notizie, analisi e strategie dal mondo crypto" />
      <section className="hero hero--blog">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-newspaper" />
              <span>Blog & Insights</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Coinologi Blog</span><br />
              Strategie, analisi e novità dal mondo crypto
            </h1>
            <p className="hero__description">
              Approfondimenti esclusivi, guide operative e aggiornamenti sui mercati digitali.
              Filtra gli articoli per categoria, cerca un argomento specifico e resta sempre aggiornato.
            </p>
          </div>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-controls">
            <BlogSearch
              search={search}
              onSearchChange={handleSearchChange}
              sort={sort}
              onSortChange={handleSortChange}
            />
            <BlogCategories
              categories={categories}
              activeCategory={category}
              onSelect={handleCategoryChange}
            />
          </div>

          {isLoading ? (
            <div className="page-loader" role="status" aria-live="polite">
              <div className="loader-spinner" />
              <p>Caricamento degli articoli…</p>
            </div>
          ) : null}

          {error ? (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          ) : null}

          {!isLoading && !error && posts.length === 0 ? (
            <p>Nessun articolo trovato con questi filtri.</p>
          ) : null}

          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          <div className="pagination">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              ← Precedente
            </button>
            <span>
              Pagina {page} di {totalPages}
            </span>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Successiva →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
