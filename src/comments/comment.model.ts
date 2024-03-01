// post.model.ts
import { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  postId: string;
  email: string;
  content: string;
}

export const CommentSchema = new Schema<Comment>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true }, // Definir explícitamente _id como ObjectId
    postId: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
); // Añadir timestamps para createdAt y updatedAt
