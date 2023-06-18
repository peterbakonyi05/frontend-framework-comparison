import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={styles.title}>Frontend Frameworks</h1>
      </Link>
    </header>
  );
};
