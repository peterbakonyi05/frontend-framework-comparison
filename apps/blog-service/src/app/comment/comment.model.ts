import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDTO {
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  content: string;
}
