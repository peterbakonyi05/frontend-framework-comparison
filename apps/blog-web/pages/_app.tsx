import { AppProps } from 'next/app';
import Head from 'next/head';

import './global.css';
import styles from './app.module.css';

import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../lib/auth/auth.provider';

const METADATA = {
  title: 'Frontend Frameworks Blog',
  description: 'Simple blog as a take home excercise',
};

const queryClient = new QueryClient();

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Head>
          <title>{METADATA.title}</title>
          <meta name="description" content={METADATA.description} />
        </Head>
        <div className={styles.root}>
          <Header />
          <div className={styles.content}>{<Component {...pageProps} />}</div>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default CustomApp;
