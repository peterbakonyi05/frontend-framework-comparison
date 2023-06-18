import type { CreateCommentRequest, Comment } from '@tbcc/models';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { commentService } from './comment.service';

export const useCreateCommentMutation = (
  options?: UseMutationOptions<Comment, Error, CreateCommentRequest>
) => {
  return useMutation<Comment, Error, CreateCommentRequest, unknown>(
    commentService.create,
    options
  );
};
