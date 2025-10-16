import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogCategories.module.css';

const BlogCategories = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => onSelect('')}
        className={`${styles.button} ${!activeCategory ? styles.active : ''}`}
      >
        Tutte
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`${styles.button} ${activeCategory === category ? styles.active : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

BlogCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default BlogCategories;
