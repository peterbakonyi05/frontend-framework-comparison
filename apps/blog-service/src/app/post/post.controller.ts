import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import type { Post } from '@tbcc/models';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<Post[]> {
    // in a real application this endpoint should support pagination
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<Post | boolean> {
    return this.postService.getPostById(parseInt(id, 10));
  }
}
