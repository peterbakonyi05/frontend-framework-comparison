import React from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box as="header" p={4} backgroundColor={'gray.700'} color='white'>
      <Link href="/">
        <Heading size="lg" as="h1" className={styles.title}>
          Frontend Frameworks
        </Heading>
      </Link>
    </Box>
  );
};
