import { Injectable } from '@nestjs/common';
import type { Post, PostItem } from '@tbcc/models';

import { POSTS } from './post.mock';

@Injectable()
export class PostService {
  private posts: Post[] = POSTS;

  async getAllPosts(): Promise<PostItem[]> {
    return this.posts.map(({ content, ...rest }) => rest);
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }
}
