import express from 'express';
import { createCourse, getAllCourses, getCourseDetail, getFreeCourses, getHotCourses, getPaidCourses, getRecommendedCourses, getTrendingCourses, searchCoursesByCategory,  searchCoursesByName, updateCourse } from '../controllers/courseController.js';
import { isAuthenticated, isGiangVien } from '../middleware/auth.js';


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
// Route tìm kiếm khóa học theo tên
courseRouter.get('/khoa-hoc/tim-kiem-theo-ten',isAuthenticated, searchCoursesByName);
// Route tìm kiếm khóa học theo danh mục
courseRouter.get('/khoa-hoc/tim-kiem-theo-danh-muc',isAuthenticated, searchCoursesByCategory);
// Route để tạo khóa học, chỉ giảng viên mới có quyền
courseRouter.post('/khoa-hoc',isAuthenticated, isGiangVien, createCourse);
// Route chỉnh sửa khóa học của giảng viên đó tạo
courseRouter.put('/khoa-hoc/:id', isAuthenticated, isGiangVien, updateCourse);

export default courseRouter;
