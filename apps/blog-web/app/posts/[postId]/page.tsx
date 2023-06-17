import type { Comment, Post } from '@tbcc/models';

import { apiClient } from '../../lib/api-client';
import { PostPageContent } from '../../components/post-page-content';

export const revalidate = 60; // revalidate every min, should be minutes/hours in production

async function getPostData(postId: string | number): Promise<Post> {
  return apiClient.getData(`/api/posts/${postId}`);
}

async function getCommentsData(postId: string | number): Promise<Comment[]> {
  try {
    return apiClient.getData(`/api/comments/${postId}`);
  } catch (err) {
    // do not fail rendering in case comments are missing
    // TODO: log to sentry
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const [postData, comments] = await Promise.all([
    getPostData(params.postId),
    getCommentsData(params.postId),
  ]);

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <PostPageContent post={postData} comments={comments} />
    </div>
  );
}
