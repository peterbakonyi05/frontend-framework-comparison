import React from 'react';
import Link from 'next/link';
import { HStack, Heading, Skeleton } from '@chakra-ui/react';
import { useAuth } from '../lib/auth/auth.hook';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Header = () => {
  const { isLoading, isAuthenticated } = useAuth();
  return (
    <HStack
      as="header"
      p={4}
      backgroundColor={'gray.700'}
      color="white"
      justifyContent="space-between"
    >
      <Link href="/">
        <Heading size="lg" as="h1" colorScheme='white'>
          Frontend Frameworks
        </Heading>
      </Link>
      {isLoading ? (
        <Skeleton w={16} h={4} />
      ) : isAuthenticated ? (
        <LogoutButton />
      ) : (
        <LoginButton />
      )}
    </HStack>
  );
};
