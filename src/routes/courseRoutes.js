import express from 'express';
import { getAllCourses, getFreeCourses, getPaidCourses, getRecommendedCourses } from '../controllers/courseController.js';
import { isAuthenticated } from '../middleware/auth.js';


const courseRouter = express.Router();

// Route lấy danh sách khóa học
courseRouter.get('/khoa-hoc', getAllCourses);
// Route đề xuất khóa học dựa trên lịch sử mua của người dùng
courseRouter.get('/khoa-hoc-de-xuat', isAuthenticated, getRecommendedCourses);
// Route lấy danh sách khóa học trả phí
courseRouter.get('/khoa-hoc-tra-phi',isAuthenticated, getPaidCourses);
// Route lấy danh sách khóa học miễn phí
courseRouter.get('/khoa-hoc-mien-phi',isAuthenticated, getFreeCourses);
export default courseRouter;
