import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSearch.module.css';

const BlogSearch = ({ search, onSearchChange, sort, onSortChange }) => {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Cerca articoli, parole chiave o autori"
        aria-label="Cerca articoli"
      />
      <div className={styles.controls}>
        <select
          className={styles.select}
          value={sort.order}
          onChange={(event) => onSortChange({ ...sort, order: event.target.value })}
          aria-label="Ordina"
        >
          <option value="desc">Più recenti</option>
          <option value="asc">Meno recenti</option>
        </select>
        <select
          className={styles.select}
          value={sort.field}
          onChange={(event) => onSortChange({ ...sort, field: event.target.value })}
          aria-label="Ordina per"
        >
          <option value="publishedAt">Data pubblicazione</option>
          <option value="title">Titolo</option>
        </select>
      </div>
    </div>
  );
};

BlogSearch.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string
  }).isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default BlogSearch;
