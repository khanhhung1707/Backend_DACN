import express from 'express';

import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { getAllComments, getCommentsByCourseId, postCommentByCourseId } from '../controllers/commentController.js';

const commentRouter = express.Router();

// Route để lấy tất cả bình luận
commentRouter.get('/binh-luan',isAuthenticated,isAdmin, getAllComments);
// Route để lấy bình luận theo ID khóa học
commentRouter.get('/binh-luan/get/:id', isAuthenticated, getCommentsByCourseId);
//Route để gửi bình luận theo ID khóa học
commentRouter.post('/binh-luan/post/:id',isAuthenticated, postCommentByCourseId);


export default commentRouter;