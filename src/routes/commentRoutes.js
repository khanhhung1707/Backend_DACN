import express from 'express';

import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { getAllComments, getCommentsByCourseId } from '../controllers/commentController.js';

const commentRouter = express.Router();

// Route để lấy tất cả bình luận
commentRouter.get('/binh-luan',isAuthenticated,isAdmin, getAllComments);
// Route để lấy bình luận theo ID khóa học
commentRouter.get('/binh-luan/:id', isAuthenticated, getCommentsByCourseId);

export default commentRouter;