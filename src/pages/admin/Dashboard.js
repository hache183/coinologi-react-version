import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';
import { blogService } from '../../services/blogService';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await blogService.getAdminPosts({ limit: 100 });
      if (data.success) {
        setPosts(data.posts);
        const published = data.posts.filter((post) => post.status === 'published').length;
        const drafts = data.posts.filter((post) => post.status === 'draft').length;
        setStats({ total: data.total, published, drafts });
      }
    } catch (err) {
      setError(err.message || 'Impossibile recuperare i post');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleToggleStatus = async (post) => {
    try {
      const nextStatus = post.status === 'published' ? 'draft' : 'published';
      await blogService.updatePost(post._id, {
        status: nextStatus,
        publishedAt: nextStatus === 'published' ? new Date().toISOString() : null
      });
      await loadPosts();
    } catch (err) {
      setError(err.message || 'Aggiornamento stato non riuscito');
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo articolo?');
    if (!confirmDelete) return;

    try {
      await blogService.deletePost(postId);
      await loadPosts();
    } catch (err) {
      setError(err.message || 'Eliminazione non riuscita');
    }
  };

  const lastPublishedDate = useMemo(() => {
    const publishedPosts = posts.filter((post) => post.status === 'published');
    if (publishedPosts.length === 0) return null;
    const latest = publishedPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
    return latest?.publishedAt ? new Date(latest.publishedAt).toLocaleDateString('it-IT') : null;
  }, [posts]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      <SEO title="Dashboard Admin" />
      <section className="dashboard">
        <div className="container">
          <header className="dashboard__header">
            <div>
              <h1>Dashboard amministrativa</h1>
              <p>Benvenuto, {user?.name}</p>
            </div>
            <div className="dashboard__actions">
              <Link to="/admin/blog/new" className="btn btn--primary">Nuovo articolo</Link>
              <button type="button" className="btn btn--secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          <section className="dashboard__stats">
            <div className="stat-card">
              <span className="stat-card__label">Totale post</span>
              <span className="stat-card__value">{stats.total}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Pubblicati</span>
              <span className="stat-card__value">{stats.published}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Bozze</span>
              <span className="stat-card__value">{stats.drafts}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Ultima pubblicazione</span>
              <span className="stat-card__value">{lastPublishedDate || 'N/D'}</span>
            </div>
          </section>

          {error ? (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="page-loader" role="status" aria-live="polite">
              <div className="loader-spinner" />
              <p>Caricamento articoli…</p>
            </div>
          ) : (
            <div className="dashboard__table-wrapper">
              <table className="dashboard__table">
                <thead>
                  <tr>
                    <th>Titolo</th>
                    <th>Categoria</th>
                    <th>Stato</th>
                    <th>Ultimo aggiornamento</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.category || 'N/D'}</td>
                      <td>
                        <span className={`badge badge--${post.status === 'published' ? 'success' : 'warning'}`}>
                          {post.status === 'published' ? 'Pubblicato' : 'Bozza'}
                        </span>
                      </td>
                      <td>{new Date(post.updatedAt).toLocaleDateString('it-IT')}</td>
                      <td className="dashboard__table-actions">
                        <Link to={`/admin/blog/edit/${post._id}`} className="btn btn--link">
                          Modifica
                        </Link>
                        <button type="button" className="btn btn--link" onClick={() => handleToggleStatus(post)}>
                          {post.status === 'published' ? 'Imposta bozza' : 'Pubblica'}
                        </button>
                        <button type="button" className="btn btn--link btn--danger" onClick={() => handleDelete(post._id)}>
                          Elimina
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
