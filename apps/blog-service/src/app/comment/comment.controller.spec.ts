import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentModule } from './comment.module';
import { COMMENTS } from './comment.mock';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { testingUtil } from '../testing/testing.util';
import { PostModule } from '../post/post.module';
import { USERS } from '../user/user.mock';

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-06-15'));

    const module: TestingModule = await Test.createTestingModule({
      imports: [CommentModule, PostModule, UserModule, AuthModule],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  describe('getAllCommentsByPostId', () => {
    it('should return comments for an existing posts', async () => {
      const result = await controller.getAllCommentsByPostId(`${1}`);
      expect(result).toEqual(COMMENTS.filter((c) => c.postId === 1));
    });

    it('should return empty array for a post that does not exist or does not have a comment', async () => {
      const result = await controller.getAllCommentsByPostId(
        `${Number.MAX_SAFE_INTEGER}`
      );
      expect(result).toEqual([]);
    });
  });

  describe('createComment', () => {
    it('should create a new comment in the name of the logged in user for an existing post', async () => {
      const request = testingUtil.createRequestWithUser();
      const newComment = await controller.createComment(request, {
        content: 'New comment',
        postId: 1,
      });
      expect(newComment).toEqual({
        content: 'New comment',
        createdAt: '2023-06-15T00:00:00.000Z',
        id: 2,
        postId: 1,
        updatedAt: '2023-06-15T00:00:00.000Z',
        userId: 2,
        username: 'Adam Angularadvocate',
      });
      const comments = await controller.getAllCommentsByPostId(`${1}`);
      expect(comments.length).toEqual(2);
      expect(comments[1]).toEqual(newComment);
    });

    it('should throw an error if there is no logged in user', async () => {
      try {
        await controller.createComment(
          {},
          { content: 'New content', postId: 1 }
        );
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('should throw an error if the post does not exist', async () => {
      const request = testingUtil.createRequestWithUser();
      await expect(
        controller.createComment(request, {
          content: 'New content',
          postId: 100,
        })
      ).rejects.toThrowError('Post not found');
    });
  });

  describe('updateComment', () => {
    it('should update a comment in the name of the logged in user if post exists and user was the creator', async () => {
      const request = testingUtil.createRequestWithUser();
      const newComment = await controller.createComment(request, {
        content: 'New comment',
        postId: 1,
      });

      const updatedComment = await controller.updateComment(
        request,
        newComment.id,
        {
          content: 'Updated content of new comment',
        }
      );
      expect(updatedComment).toEqual({
        content: 'Updated content of new comment',
        createdAt: '2023-06-15T00:00:00.000Z',
        id: newComment.id,
        postId: 1,
        updatedAt: '2023-06-15T00:00:00.000Z',
        userId: 2,
        username: 'Adam Angularadvocate',
      });
      const comments = await controller.getAllCommentsByPostId(`${1}`);
      expect(comments[comments.length - 1]).toEqual(updatedComment);
    });

    it('should throw an error if there is no logged in user', async () => {
      try {
        await controller.updateComment({}, 1, { content: 'New content' });
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(TypeError);
      }
    });

    it('should throw an error if the comment does not exist', async () => {
      const request = testingUtil.createRequestWithUser();
      await expect(
        controller.updateComment(request, 100, {
          content: 'New content',
        })
      ).rejects.toThrowError('Comment not found');
    });

    it('should throw an error if the logged in user is not the creator of the comment', async () => {
      const newComment = await controller.createComment(
        testingUtil.createRequestWithUser(USERS[0].id, USERS[0].email),
        {
          content: 'New comment',
          postId: 1,
        }
      );
      await expect(
        controller.updateComment(
          testingUtil.createRequestWithUser(USERS[1].id, USERS[1].email),
          newComment.id,
          {
            content: 'New content',
          }
        )
      ).rejects.toThrowError('Unauthorized');
    });
  });
});
