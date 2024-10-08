import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layDanhSachKhoaHocDaDangKy, layTatCaKhoaHocDaDangKy, regisCourse } from '../controllers/registerCourseController.js';


const regisCoursetRouter = express.Router();

// Route đăng ký khóa học
regisCoursetRouter.post('/khoa-hoc-dang-ky/:id',isAuthenticated, regisCourse);
// Route lấy danh sách các khóa học đăng ký theo IDNguoiDung
regisCoursetRouter.get('/khoa-hoc-dang-ky', isAuthenticated, layDanhSachKhoaHocDaDangKy);
// Route lấy tất cả các khóa học đã đăng ký
regisCoursetRouter.get('/khoa-hoc-dang-ky/all',isAuthenticated, isAdmin, layTatCaKhoaHocDaDangKy);

export default regisCoursetRouter;
