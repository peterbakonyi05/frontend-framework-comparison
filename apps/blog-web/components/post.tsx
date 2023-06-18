import type { Post as PostModel } from '@tbcc/models';
import Link from 'next/link';

import styles from './post.module.css';
import { dateUtil } from '../lib/date.util';

export interface PostProps {
  post: PostModel;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <Link href={`/posts/${encodeURIComponent(post.id)}`}>
        <h2 className={styles.title}>{post.title}</h2>
      </Link>
      <p className={styles.createdAt}>
        Created at: {dateUtil.convertIsoStringToDisplay(post.createdAt)}
      </p>
    </div>
  );
};
