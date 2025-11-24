import React, { useEffect, useMemo, useState } from 'react';
import SEO from '../components/SEO';
import BlogCard from '../components/blog/BlogCard';
import BlogCategories from '../components/blog/BlogCategories';
import BlogSearch from '../components/blog/BlogSearch';
import { getAllPosts } from '../content/posts';

const INITIAL_SORT = { field: 'publishedAt', order: 'desc' };
const PAGE_SIZE = 12;

const Blog = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(INITIAL_SORT);

  const allPosts = useMemo(() => getAllPosts(), []);

  const categories = useMemo(() => {
    const unique = new Set(allPosts.map((post) => post.category).filter(Boolean));
    return Array.from(unique).sort();
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allPosts.filter((post) => {
      const matchesCategory = category ? post.category === category : true;
      if (!query) {
        return matchesCategory;
      }

      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
        post.author?.name
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return matchesCategory && haystack.includes(query);
    });
  }, [allPosts, category, search]);

  const sortedPosts = useMemo(() => {
    const sorted = [...filteredPosts];

    sorted.sort((a, b) => {
      if (sort.field === 'title') {
        return a.title.localeCompare(b.title);
      }

      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateA - dateB;
    });

    if (sort.order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPosts, sort.field, sort.order]);

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedPosts.slice(start, start + PAGE_SIZE);
  }, [sortedPosts, page]);

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

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setSort(INITIAL_SORT);
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

          {sortedPosts.length === 0 ? (
            <div className="empty-state">
              <p>Nessun articolo trovato con questi filtri.</p>
              <button type="button" className="btn btn--secondary" onClick={handleReset}>
                Reimposta filtri
              </button>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
