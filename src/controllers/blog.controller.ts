import { Request, Response } from 'express';
import BlogModel from '../models/Blog';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const author = req.user?.firstName || 'Anonymous';
    const image = req.file ? req.file.filename : '';

    const newBlog = new BlogModel({ title, author, content, image });
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
