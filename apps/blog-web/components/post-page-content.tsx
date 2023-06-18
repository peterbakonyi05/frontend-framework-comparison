import React from 'react';
import styles from './post-page-content.module.css';
import type { Comment, Post } from '@tbcc/models';
import { useCommentsByPostIdQuery } from '../lib/comment/comment.query';
import { CreateComment } from './create-comment';
import { Box } from '@chakra-ui/react';
import { dateUtil } from '../lib/date.util';

export interface PostPageContentProps {
  post: Post;
  comments: Comment[];
}

export const PostPageContent: React.FC<PostPageContentProps> = ({
  post,
  comments: commentsInitialData,
}) => {
  const { data: comments, refetch } = useCommentsByPostIdQuery(post.id, {
    initialData: commentsInitialData,
    refetchOnMount: false,
  });

  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{post.title}</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Box mb={6}>
        <h3>Comments:</h3>
        {comments && comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <p>{comment.content}</p>
                <p className={styles.commentInfo}>
                  By {comment.username} at{' '}
                  {dateUtil.convertIsoStringToDisplay(comment.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div>No comments yet</div>
        )}
      </Box>
      <CreateComment postId={post.id} onSuccess={refetch} />
    </div>
  );
};
