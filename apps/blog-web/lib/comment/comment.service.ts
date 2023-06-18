import type { Comment, CreateCommentRequest } from '@tbcc/models';
import { COMMENT_ENDPOINT } from './comment.const';
import { apiClient } from '../api-client';

const handleResponse = (res: Response): void => {
  if (res.status >= 300) {
    throw new Error();
  }
};

const create = async (body: CreateCommentRequest): Promise<Comment> => {
  const response = await apiClient.post(COMMENT_ENDPOINT.create, body);
  handleResponse(response);
  return response.json();
};

const getByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await apiClient.get(
    COMMENT_ENDPOINT.commentsByPostId(postId)
  );
  handleResponse(response);
  return response.json();
};

export const commentService = {
  create,
  getByPostId,
};
