import express from 'express';

import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { getAllComments, getCommentsByCourseId, postCommentByCourseId, postReplyToComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

// Route để lấy tất cả bình luận
commentRouter.get('/binh-luan',isAuthenticated,isAdmin, getAllComments);
// Route để lấy bình luận theo ID khóa học
commentRouter.get('/binh-luan/get/:id', isAuthenticated, getCommentsByCourseId);
//Route để gửi bình luận theo ID khóa học
commentRouter.post('/binh-luan/post/:id',isAuthenticated, postCommentByCourseId);
// Route để gửi phản hồi cho bình luận theo ID bình luận
commentRouter.post('/binh-luan/reply/:commentId', isAuthenticated, postReplyToComment);



export default commentRouter;