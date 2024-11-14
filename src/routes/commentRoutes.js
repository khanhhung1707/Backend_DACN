import express from 'express';

import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { deleteCommentById, getAllComments, getCommentById, getCommentsByCourseId, postCommentByCourseId, postReplyToComment } from '../controllers/commentController.js';

const commentRouter = express.Router();

// Route để lấy tất cả bình luận
commentRouter.get('/binh-luan',isAuthenticated,isAdmin, getAllComments);
// Route để lấy bình luận theo ID khóa học
commentRouter.get('/binh-luan/get/:id', isAuthenticated, getCommentsByCourseId);
// Route để lấy bình luận theo ID bình luận
commentRouter.get('/binh-luan/:id', isAuthenticated, isAdmin, getCommentById);
//Route để gửi bình luận theo ID khóa học
commentRouter.post('/binh-luan/post/:id',isAuthenticated, postCommentByCourseId);
// Route để gửi phản hồi cho bình luận theo ID bình luận
commentRouter.post('/binh-luan/reply/:commentId', isAuthenticated, postReplyToComment);
// Route để xóa bình luận theo ID bình luận
commentRouter.delete('/binh-luan/delete/:id', isAuthenticated, isAdmin, deleteCommentById);


export default commentRouter;