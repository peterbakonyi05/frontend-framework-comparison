import type { Post as PostModel } from '@tbcc/models';
import { apiClient } from './lib/api-client';
import styles from './page.module.css';
import { Post } from './components/post';

export const revalidate = 60; // revalidate every min, should be minutes/hours in production

async function getPostsData(): Promise<PostModel[]> {
  return apiClient.getData('/api/posts');
}

export default async function Index() {
  const posts = await getPostsData();

  return (
    <div className={styles.page}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
