import express from 'express';
import { getCourseDetails, getCourses, getFreeCourses, getHotCourses, getPaidCourses, getTrendingCourses, suggestCourses} from '../controllers/courseController.js';

const courseRouter = express.Router();

// Route lấy danh sách khóa học
courseRouter.get('/courses', getCourses);
// Route lấy danh sách khóa học hot 
courseRouter.get('/courses/hot', getHotCourses);
// Route lấy danh sách khóa học xu hướng
courseRouter.get('/courses/trending', getTrendingCourses);
// Đề xuất khóa học dựa trên lịch sử mua hàng của học viên
courseRouter.get('/suggestCourses/:ma_hoc_vien', suggestCourses);
// Route để lấy danh sách khóa học miễn phí
courseRouter.get('/courses/free', getFreeCourses);
// Route để lấy danh sách khóa học trả phí
courseRouter.get('/courses/paid', getPaidCourses);
// Route để xem chi tiết khóa học theo mã khóa học
courseRouter.get('/courses/:ma_khoa_hoc', getCourseDetails);
export default courseRouter;
