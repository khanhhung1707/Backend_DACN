import express from 'express';
import { getAllCourses, getCourseDetail, getFreeCourses, getHotCourses, getPaidCourses, getRecommendedCourses, getTrendingCourses } from '../controllers/courseController.js';
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
// Route để lấy danh sách khóa học hot
courseRouter.get('/khoa-hoc/hot',isAuthenticated, getHotCourses);
// Route để lấy danh sách khóa học xu hướng
courseRouter.get('/khoa-hoc/trending',isAuthenticated, getTrendingCourses);
// Route xem chi tiết khóa học
courseRouter.get('/khoa-hoc/xem-chi-tiet/:id',isAuthenticated, getCourseDetail);
export default courseRouter;
