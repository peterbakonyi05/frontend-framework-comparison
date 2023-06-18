export const COMMENT_ENDPOINT = {
  create: '/api/comments',
  commentsByPostId: (postId: number) => `/api/comments/${postId}`,
};

export const COMMENT_CACHE_KEYS = {
  commentPerPost: (postId: number) => ['comment', `post_${postId}`],
};
