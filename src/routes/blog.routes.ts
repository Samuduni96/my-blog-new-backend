import express from 'express';
import * as blogController from '../controllers/blog.controller';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/images' });

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById); 
router.post('/create', upload.single('image'), blogController.createBlog);
router.put('/:id', blogController.updateBlog); 
router.delete('/:id', blogController.deleteBlog);

export default router;