import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', ...props }) => (
  <button className={`${styles.button} ${styles[variant]}`} {...props}>
    {children}
  </button>
);

export default React.memo(Button);
