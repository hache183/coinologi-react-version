import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './BlogCard.module.css';

const BlogCard = ({ post }) => {
  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('it-IT') : 'Bozza';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {post.featuredImage ? (
          <img src={post.featuredImage} alt={post.title} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <i className="fas fa-newspaper" />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{post.category || 'Senza categoria'}</span>
        <h3 className={styles.title}>{post.title}</h3>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <div className={styles.meta}>
          <span>{publishDate}</span>
          <span>{post.author?.name || 'Coinologi Team'}</span>
        </div>
        <Link className={styles.readMore} to={`/blog/${post.slug}`}>
          Leggi tutto →
        </Link>
      </div>
    </article>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    featuredImage: PropTypes.string,
    category: PropTypes.string,
    publishedAt: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};

export default BlogCard;
