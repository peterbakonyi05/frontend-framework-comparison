import type { Comment, Post } from '@tbcc/models';

import { apiClient } from '../../lib/api-client';
import {
  PostPageContent,
  PostPageContentProps,
} from '../../components/post-page-content';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

async function getPostData(postId: number): Promise<Post> {
  return apiClient.getData(`/api/posts/${postId}`);
}

async function getCommentsData(postId: number): Promise<Comment[]> {
  try {
    return apiClient.getData(`/api/comments/${postId}`);
  } catch (err) {
    // do not fail rendering in case comments are missing
    // TODO: log to sentry
    return [];
  }
}

export const getServerSideProps: GetServerSideProps<
  PostPageContentProps
> = async (context: GetServerSidePropsContext) => {
  const postIdParam = context.query.postId;
  if (typeof postIdParam !== 'string') {
    return {
      notFound: true,
    };
  }
  const postId = parseInt(postIdParam, 10);
  if (isNaN(postId)) {
    return {
      notFound: true,
    };
  }

  try {
    const [post, comments] = await Promise.all([
      getPostData(postId),
      getCommentsData(postId),
    ]);
    return { props: { post, comments } };
  } catch (err) {
    // TODO: send to sentry or other error reporting tool
    console.error(err);
    return {
      notFound: true,
    };
  }
};

const PostPage: React.FC<PostPageContentProps> = ({ post, comments }) => {
  return (
    <div>
      <PostPageContent post={post} comments={comments} />
    </div>
  );
};

export default PostPage;
