import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, ...props }) => (
  <div className={styles.card} {...props}>
    {children}
  </div>
);

export default React.memo(Card);
