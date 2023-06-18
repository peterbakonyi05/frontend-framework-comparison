import { AppProps } from 'next/app';
import Head from 'next/head';

import './global.css';
import styles from './app.module.css';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const metadata = {
  title: 'Frontend Frameworks Blog',
  description: 'Simple blog as a take home excercise',
};

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <div className={styles.root}>
        <Header />
        <div className={styles.content}>{<Component {...pageProps} />}</div>
        <Footer />
      </div>
    </>
  );
};

export default CustomApp;
