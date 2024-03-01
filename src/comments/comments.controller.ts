import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @Get(':id')
  async getComment(@Param('id') id: string) {
    return await this.commentsService.getComment(id);
  }

  @Post()
  async createComment(@Body() commentData: any) {
    return await this.commentsService.createComment(commentData);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentData: any,
  ): Promise<any> {
    return await this.commentsService.updateComment(id, commentData);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    await this.commentsService.deleteComment(id);
    return { message: 'Comment deleted successfully' };
  }
}
