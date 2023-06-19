import {
  Controller,
  Get,
  Post,
  Put,
  Request,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import type { Comment, CommentCountByPostIdResponse } from '@tbcc/models';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './comment.model';
import { AuthGuard } from '../auth/auth.guard';
import { JWTUser } from '../auth/auth.model';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('count-by-post-id')
  getNumberOfCommentsByPostId(): Promise<CommentCountByPostIdResponse> {
    return this.commentService.getNumberOfCommentsByPostId();
  }

  @Get(':postId')
  getAllCommentsByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.getAllCommentsByPostId(parseInt(postId, 10));
  }

  @Post()
  @UseGuards(AuthGuard)
  createComment(
    @Request() req,
    @Body() commentDto: CreateCommentDTO
  ): Promise<Comment> {
    const user: JWTUser = req.user;
    const { postId, content } = commentDto;
    return this.commentService.createComment({
      userId: user.sub,
      postId,
      content,
    });
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateComment(
    @Request() req,
    @Param('id') id: number,
    @Body() commentDto: { content: string }
  ): Promise<Comment> {
    const user: JWTUser = req.user;
    const { content } = commentDto;
    return this.commentService.updateComment({ userId: user.sub, id, content });
  }
}
