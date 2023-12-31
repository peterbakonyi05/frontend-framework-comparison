import { AppProps } from 'next/app';
import { Box, ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import chakraTheme from '@chakra-ui/theme';
import Head from 'next/head';

import './global.css';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { AuthProvider } from '../lib/auth/auth.provider';

const METADATA = {
  title: 'Frontend Frameworks Blog',
  description: 'Simple blog as a take home excercise',
};

const queryClient = new QueryClient();
const {
  Alert,
  Button,
  Card,
  Container,
  Modal,
  Heading,
  Form,
  FormLabel,
  FormError,
  Input,
  Textarea,
  List,
  Skeleton,
} = chakraTheme.components;
const theme = extendBaseTheme({
  components: {
    Alert,
    Card,
    Container,
    Heading,
    Button,
    Modal,
    Form,
    FormLabel,
    FormError,
    Input,
    Textarea,
    List,
    Skeleton,
  },
});

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraBaseProvider theme={theme}>
        <AuthProvider>
          <Head>
            <title>{METADATA.title}</title>
            <meta name="description" content={METADATA.description} />
          </Head>
          <Box display="flex" flexDir="column" minHeight="100vh">
            <Header />
            <Box flexGrow={1}>{<Component {...pageProps} />}</Box>
            <Footer />
          </Box>
        </AuthProvider>
      </ChakraBaseProvider>
    </QueryClientProvider>
  );
};

export default CustomApp;
