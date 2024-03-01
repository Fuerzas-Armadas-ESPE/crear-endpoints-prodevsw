import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async getAllComments(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  async getComment(id: string): Promise<Comment | null> {
    try {
      const comment = await this.commentModel.findById(id).exec();
      if (!comment) {
        throw new NotFoundException('Comentario no encontrado');
      }
      return comment;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createComment(commentData: Comment): Promise<Comment> {
    try {
      const createdComment = new this.commentModel(commentData); // No es necesario asignar _id manualmente
      return await createdComment.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateComment(id: string, commentData: any): Promise<Comment | null> {
    try {
      const existingComment = await this.commentModel.findById(id).exec();
      if (!existingComment) {
        throw new NotFoundException('Publicación no encontrada');
      }

      // Actualizar los campos de la publicación existente
      existingComment.email = commentData.email;
      existingComment.content = commentData.content;

      // Guardar los cambios en la base de datos
      return await existingComment.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteComment(id: string): Promise<void> {
    try {
      await this.commentModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
