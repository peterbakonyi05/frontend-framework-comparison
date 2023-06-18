import type { CreateCommentRequest } from '@tbcc/models';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDTO implements CreateCommentRequest {
  @IsNumber()
  postId: number;

  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(3)
  content: string;
}
