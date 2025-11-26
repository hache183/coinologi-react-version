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

  // Stats calculation for Dashboard
  const stats = useMemo(() => {
    const total = allPosts.length;
    const cats = categories.length;
    const latest = [...allPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
    return { total, cats, latest };
  }, [allPosts, categories]);

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
          <div className="hero__visual">
            <div className="blog-dashboard">
              <div className="dashboard-header">
                <h3>📊 CONTENT HUB</h3>
                <span className="status-live">LIVE</span>
              </div>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Articoli Pubblicati</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{stats.cats}</span>
                  <span className="stat-label">Categorie Attive</span>
                </div>
              </div>

              {stats.latest && (
                <div className="latest-post-preview">
                  <div className="preview-label">Appena Pubblicato</div>
                  <h4 className="preview-title">{stats.latest.title}</h4>
                  <div className="preview-meta">
                    <span>{new Date(stats.latest.publishedAt).toLocaleDateString('it-IT')}</span>
                    <span className="preview-tag">{stats.latest.category}</span>
                  </div>
                </div>
              )}

              <div className="dashboard-footer">
                <div className="update-info">
                  <i className="fas fa-sync-alt fa-spin" style={{marginRight: '6px'}}></i> Aggiornato in tempo reale
                </div>
              </div>
            </div>
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
      <style>{`
        .blog-dashboard {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.5);
          width: 100%;
          max-width: 400px;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform: translateY(20px);
          opacity: 0;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .dashboard-header h3 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #64748b;
          margin: 0;
          letter-spacing: 0.05em;
        }

        .status-live {
          background: #10b981;
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .status-live::before {
          content: '';
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-item {
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.75rem;
          text-align: center;
          transition: transform 0.2s;
        }

        .stat-item:hover {
          transform: translateY(-2px);
          background: #f1f5f9;
        }

        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 0.25rem;
          background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }

        .latest-post-preview {
          background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
        }

        .latest-post-preview::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #ff6b35;
        }

        .preview-label {
          font-size: 0.625rem;
          text-transform: uppercase;
          color: #ff6b35;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .preview-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .preview-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .preview-tag {
          background: #e2e8f0;
          color: #475569;
          padding: 0.125rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
        }

        .dashboard-footer {
          text-align: center;
          font-size: 0.75rem;
          color: #94a3b8;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 1rem;
        }

        @media (max-width: 991px) {
          .blog-dashboard {
            margin: 2rem auto 0;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Blog;
