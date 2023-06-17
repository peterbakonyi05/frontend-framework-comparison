import { Injectable } from '@nestjs/common';
import type { Post } from '@tbcc/models';

import { POSTS } from './post.mock';

@Injectable()
export class PostService {
  private posts: Post[] = POSTS;

  async getAllPosts(): Promise<Post[]> {
    return this.posts;
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }
}
