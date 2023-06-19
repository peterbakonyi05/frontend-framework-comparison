import React from 'react';
import { Box } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box
      as="footer"
      p={4}
      backgroundColor="gray.900"
      color="white"
      textAlign="center"
    >
      &copy; {new Date().getFullYear()} - Simple blog about frontend frameworks
    </Box>
  );
};
