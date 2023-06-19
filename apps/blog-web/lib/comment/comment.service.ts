import type {
  Comment,
  CommentCountByPostIdResponse,
  CreateCommentRequest,
} from '@tbcc/models';
import { COMMENT_ENDPOINT } from './comment.const';
import { apiClient } from '../api-client';

const create = async (body: CreateCommentRequest): Promise<Comment> => {
  const response = await apiClient.post(COMMENT_ENDPOINT.create, body);
  return response.json();
};

const getByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await apiClient.get(
    COMMENT_ENDPOINT.commentsByPostId(postId)
  );
  return response.json();
};

const getCommentCountByPostId =
  async (): Promise<CommentCountByPostIdResponse> => {
    const response = await apiClient.get(COMMENT_ENDPOINT.commentCountByPostId);
    return response.json();
  };

export const commentService = {
  create,
  getByPostId,
  getCommentCountByPostId,
};
