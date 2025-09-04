import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ ...props }, ref) => (
  <input className={styles.input} ref={ref} {...props} />
));

export default React.memo(Input);
