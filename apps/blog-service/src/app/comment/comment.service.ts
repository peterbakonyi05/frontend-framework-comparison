import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { Comment, CommentCountByPostIdResponse } from '@tbcc/models';
import { COMMENTS } from './comment.mock';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  private comments: Comment[] = COMMENTS;
  private currentCommentId = COMMENTS.length;

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  async getAllCommentsByPostId(postId: number): Promise<Comment[]> {
    return this.comments.filter((comment) => comment.postId === postId);
  }

  async createComment({
    userId,
    postId,
    content,
  }: {
    userId: number;
    postId: number;
    content: string;
  }): Promise<Comment> {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const user = await this.userService.findOneById(userId);
    const newComment: Comment = {
      id: this.getNextId(),
      userId,
      username: `${user?.firstName} ${user.lastName}`,
      postId,
      content,
      createdAt: this.getDateISO(),
      updatedAt: this.getDateISO(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  async updateComment({
    userId,
    id,
    content,
  }: {
    userId: number;
    id: number;
    content: string;
  }): Promise<Comment> {
    const comment = this.comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new UnauthorizedException();
    }

    comment.content = content;
    comment.updatedAt = this.getDateISO();
    return comment;
  }

  async getNumberOfCommentsByPostId(): Promise<CommentCountByPostIdResponse> {
    // in a real app with more data this should get a list of post ids as input and query the DB for the given posts only
    return this.comments.reduce((result, comment) => {
      if (typeof result[comment.postId] === 'undefined') {
        result[comment.postId] = 0;
      }
      result[comment.postId]++;
      return result;
    }, {} as CommentCountByPostIdResponse);
  }

  private getNextId() {
    this.currentCommentId++;
    return this.currentCommentId;
  }

  private getDateISO() {
    return new Date().toISOString();
  }
}
