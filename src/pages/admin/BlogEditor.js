import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { blogService } from '../../services/blogService';

const DEFAULT_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  status: 'draft',
  featuredImage: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: ''
};

const extractErrorMessage = (err, fallback) => {
  if (err?.data?.errors?.length) {
    const messages = err.data.errors
      .map((item) => item?.msg)
      .filter(Boolean);

    if (messages.length) {
      return messages.join(', ');
    }
  }

  if (typeof err?.message === 'string' && err.message.trim().length > 0) {
    return err.message;
  }

  return fallback;
};

const BlogEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;

    const controller = new AbortController();

    const loadPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await blogService.getAdminPost(id, { signal: controller.signal });
        if (data.success) {
          const { post } = data;
          setForm({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            category: post.category || '',
            tags: post.tags?.join(', ') || '',
            status: post.status || 'draft',
            featuredImage: post.featuredImage || '',
            seoTitle: post.seo?.metaTitle || '',
            seoDescription: post.seo?.metaDescription || '',
            seoKeywords: post.seo?.keywords?.join(', ') || ''
          });
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Impossibile caricare l\'articolo');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();

    return () => controller.abort();
  }, [id, isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  const handleFeaturedImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const supportsObjectURL = typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function';
    const objectUrl = supportsObjectURL ? URL.createObjectURL(file) : null;
    if (objectUrl) {
      setPreviewUrl(objectUrl);
    }
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await blogService.uploadFeaturedImage(file);
      if (response.success) {
        setForm((prev) => ({ ...prev, featuredImage: response.file.url }));
        setSuccessMessage('Immagine caricata con successo');
        setPreviewUrl(null);
      }
    } catch (err) {
      setError(err.message || 'Caricamento immagine non riuscito');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const buildPayload = () => ({
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    content: form.content,
    category: form.category,
    tags: form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: form.status,
    featuredImage: form.featuredImage,
    seo: {
      metaTitle: form.seoTitle,
      metaDescription: form.seoDescription,
      keywords: form.seoKeywords
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const payload = buildPayload();
      if (isEditing) {
        await blogService.updatePost(id, payload);
        setSuccessMessage('Articolo aggiornato con successo');
      } else {
        await blogService.createPost(payload);
        setSuccessMessage('Articolo creato con successo');
        setForm(DEFAULT_FORM);
      }
    } catch (err) {
      setError(extractErrorMessage(err, 'Salvataggio non riuscito'));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishNow = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = { ...buildPayload(), status: 'published' };
      if (isEditing) {
        await blogService.updatePost(id, { ...payload, publishedAt: new Date().toISOString() });
        setSuccessMessage('Articolo pubblicato');
      } else {
        await blogService.createPost({ ...payload, publishedAt: new Date().toISOString() });
        setSuccessMessage('Articolo creato e pubblicato');
        setForm(DEFAULT_FORM);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(extractErrorMessage(err, 'Pubblicazione non riuscita'));
    } finally {
      setIsLoading(false);
    }
  };

  const imagePreviewSrc = previewUrl || form.featuredImage;

  return (
    <>
      <SEO title={isEditing ? 'Modifica articolo' : 'Nuovo articolo'} />
      <section className="editor">
        <div className="container">
          <header className="editor__header">
            <div>
              <h1>{isEditing ? 'Modifica articolo' : 'Nuovo articolo'}</h1>
              <p>Gestisci contenuti, SEO e stato di pubblicazione.</p>
            </div>
            <div className="editor__actions">
              <button type="button" className="btn btn--secondary" onClick={() => navigate('/admin/dashboard')}>
                Annulla
              </button>
              <button type="button" className="btn btn--primary" onClick={handlePublishNow} disabled={isLoading}>
                Pubblica subito
              </button>
            </div>
          </header>

          {error ? (
            <div className="alert alert--error" role="alert">
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div className="alert alert--success" role="status">
              {successMessage}
            </div>
          ) : null}

          <form className="editor__form" onSubmit={handleSubmit}>
            <div className="editor__grid">
              <div className="editor__main">
                <label htmlFor="title">
                  Titolo
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="slug">
                  Slug (URL)
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="esempio-articolo-coinologi"
                    required
                  />
                </label>

                <label htmlFor="excerpt">
                  Excerpt
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    value={form.excerpt}
                    onChange={handleChange}
                    placeholder="Riassunto dell'articolo"
                  />
                </label>

                <div className="editor__richtext">
                  <span>Contenuto</span>
                  <RichTextEditor value={form.content} onChange={handleContentChange} />
                </div>
              </div>

              <aside className="editor__sidebar">
                <label htmlFor="status">
                  Stato
                  <select id="status" name="status" value={form.status} onChange={handleChange}>
                    <option value="draft">Bozza</option>
                    <option value="published">Pubblicato</option>
                  </select>
                </label>

                <label htmlFor="category">
                  Categoria
                  <input
                    id="category"
                    name="category"
                    type="text"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="es. Trading"
                  />
                </label>

                <label htmlFor="tags">
                  Tags (separati da virgola)
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="trading, analisi, bitcoin"
                  />
                </label>

                <label htmlFor="featuredImage">
                  Immagine in evidenza (URL)
                  <input
                    id="featuredImage"
                    name="featuredImage"
                    type="url"
                    value={form.featuredImage}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                  <div className="editor__upload">
                    <button
                      type="button"
                      className="btn btn--secondary"
                      style={{ width: '100%' }}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Caricamento…' : 'Carica immagine'}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      style={{ display: 'none' }}
                      disabled={isUploading}
                    />
                    <small>Supporto immagini fino a 2MB. Il file verrà ospitato dal backend.</small>
                  </div>
                  {imagePreviewSrc ? (
                    <div className="editor__image-preview">
                      <img src={imagePreviewSrc} alt="Anteprima immagine in evidenza" />
                      <button
                        type="button"
                        className="btn btn--link btn--danger"
                        onClick={() => {
                          setPreviewUrl(null);
                          setForm((prev) => ({ ...prev, featuredImage: '' }));
                        }}
                      >
                        Rimuovi immagine
                      </button>
                    </div>
                  ) : null}
                </label>

                <fieldset className="editor__fieldset">
                  <legend>SEO</legend>
                  <label htmlFor="seoTitle">
                    Meta title
                    <input
                      id="seoTitle"
                      name="seoTitle"
                      type="text"
                      value={form.seoTitle}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="seoDescription">
                    Meta description
                    <textarea
                      id="seoDescription"
                      name="seoDescription"
                      rows={3}
                      value={form.seoDescription}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="seoKeywords">
                    Keywords (separate da virgola)
                    <input
                      id="seoKeywords"
                      name="seoKeywords"
                      type="text"
                      value={form.seoKeywords}
                      onChange={handleChange}
                      placeholder="crypto, trading, investimenti"
                    />
                  </label>
                </fieldset>

                <button type="submit" className="btn btn--secondary" disabled={isLoading}>
                  {isLoading ? 'Salvataggio…' : 'Salva bozza'}
                </button>
              </aside>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BlogEditor;
