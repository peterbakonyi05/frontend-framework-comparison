import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useAuth } from '../lib/auth/auth.hook';

export interface LogoutButtonProps {
  text?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  text = 'Logout',
}) => {
  const {
    logoutMutation: { mutateAsync: logout, isLoading },
  } = useAuth();
  const toast = useToast();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch {
      // nothing to do, error is displayed
      toast({
        title: 'Logout failed',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [logout, toast]);

  return (
    <Button
      variant="link"
      colorScheme="white"
      onClick={handleLogout}
      isLoading={isLoading}
    >
      {text}
    </Button>
  );
};
