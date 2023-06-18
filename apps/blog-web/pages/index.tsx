import type { Post as PostModel } from '@tbcc/models';
import { apiClient } from '../lib/api-client';
import { Post } from '../components/post';

import styles from './index.module.css';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export interface IndexPageProps {
  posts: PostModel[];
}

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async (
  _context: GetServerSidePropsContext
) => {
  const posts = await apiClient.getData<PostModel[]>('/api/posts');

  return { props: { posts } };
};

const HomePage: React.FC<IndexPageProps> = ({ posts }) => {
  return (
    <div className={styles.page}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default HomePage;
