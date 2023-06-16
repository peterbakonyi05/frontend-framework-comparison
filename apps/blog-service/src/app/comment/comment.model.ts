import { IsNotEmpty, IsNumber } from 'class-validator';
export class Comment {
  id: number;
  postId: number;
  userId: number;
  username?: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export class CreateCommentDTO {
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  content: string;
}
