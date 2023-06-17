import { Footer } from './components/footer';
import { Header } from './components/header';
import './global.css';

import styles from './layout.module.css';

export const metadata = {
  title: 'Frontend Frameworks Blog',
  description: 'Simple blog as a take home excercise',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div className={styles.root}>
          <Header />
          <div className={styles.content}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
