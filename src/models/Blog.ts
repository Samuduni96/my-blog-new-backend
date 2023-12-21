import mongoose, { Document, Schema } from 'mongoose';

export interface Blog extends Document {
  title: string;
  author: string;
  content: string;
  image: string;
  createdAt: Date;
}

const blogSchema = new Schema<Blog>(
  {
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
  },
  { versionKey: false } 
);

const BlogModel = mongoose.model<Blog>('Blog', blogSchema);

export default BlogModel;
