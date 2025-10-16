import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await login(form);
      if (response.success) {
        const redirectTo = location.state?.from?.pathname || '/admin/dashboard';
        navigate(redirectTo, { replace: true });
      } else {
        setError(response.message || 'Accesso non riuscito');
      }
    } catch (err) {
      setError(err.message || 'Errore durante il login');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-loader" role="status" aria-live="polite">
        <div className="loader-spinner" />
        <p>Caricamento…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <SEO title="Accesso admin" />
      <section className="auth-page">
        <div className="auth-card">
          <h1>Area Riservata</h1>
          <p>Inserisci le credenziali fornite dal team Coinologi.</p>
          {error ? (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          ) : null}
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Accesso in corso…' : 'Accedi'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
