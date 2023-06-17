export interface Comment {
  id: number;
  postId: number;
  userId: number;
  username?: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}
