import type { Comment } from '@tbcc/models';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { COMMENT_CACHE_KEYS } from './comment.const';
import { commentService } from './comment.service';

export const useCommentsByPostIdQuery = (
  postId: number,
  options?: UseQueryOptions<Comment[], Error>
): UseQueryResult<Comment[], Error> => {
  return useQuery<Comment[], Error>(
    COMMENT_CACHE_KEYS.commentPerPost(postId),
    () => commentService.getByPostId(postId),
    options
  );
};
