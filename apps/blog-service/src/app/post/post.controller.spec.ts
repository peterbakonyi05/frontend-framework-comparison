import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostModule } from './post.module';
import { POSTS } from './post.mock';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  describe('getAllPosts', () => {
    it('should return all the posts', async () => {
      const result = await controller.getAllPosts();
      expect(result).toEqual(POSTS);
    });
  });

  describe('getAllPosts', () => {
    it('should return single post when exists', async () => {
      const firstPost = POSTS[0];
      const result = await controller.getPostById(`${firstPost.id}`);
      expect(result).toEqual(firstPost);
    });

    it('should return undefined when post does not exist', async () => {
      const result = await controller.getPostById(`${Number.MAX_SAFE_INTEGER}`);
      expect(result).toEqual(undefined);
    });
  });
});
