import React from 'react';
import styles from './post-page-content.module.css';
import type { Comment, Post } from '@tbcc/models';

export interface PostPageContentProps {
  post: Post;
  comments: Comment[];
}

export const PostPageContent: React.FC<PostPageContentProps> = ({
  post,
  comments,
}) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <h3>Comments:</h3>
      {comments.length > 0 ? (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <p>{comment.content}</p>
              <p className={styles.commentInfo}>
                By {comment.username} on {comment.createdAt}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No comments yet</div>
      )}
    </div>
  );
};
