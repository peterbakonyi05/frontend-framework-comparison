import React from 'react';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} - Simple blog about frontend frameworks
    </footer>
  );
};
