export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
}

export type PostItem = Omit<Post, 'content'>;
