import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { addFavoriteCourse, getFavoriteCoursesByUser, removeFavoriteCourse } from '../controllers/likeCourseController.js';


const likeCourseRouter = express.Router();

// Thêm khóa học yêu thích
likeCourseRouter.post('/add-favorite/:IDKhoaHoc',isAuthenticated, addFavoriteCourse);
// Route lấy danh sách khóa học yêu thích theo người dùng
likeCourseRouter.get('/favorites',isAuthenticated, getFavoriteCoursesByUser);
// Route bỏ khóa học yêu thích
likeCourseRouter.delete('/favorites/:IDKhoaHoc',isAuthenticated, removeFavoriteCourse);

export default likeCourseRouter;