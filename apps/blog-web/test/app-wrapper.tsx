import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../lib/auth/auth.provider';

const queryClient = new QueryClient();

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <CSSReset />
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
