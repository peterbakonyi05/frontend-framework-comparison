export const COMMENT_ENDPOINT = {
  create: '/api/comments',
  commentsByPostId: (postId: number) => `/api/comments/${postId}`,
  commentCountByPostId: '/api/comments/count-by-post-id',
};

export const COMMENT_CACHE_KEYS = {
  commentPerPost: (postId: number) => ['comment', `post_${postId}`],
};
