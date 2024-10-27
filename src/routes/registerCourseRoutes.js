import express from 'express';
import { isAdmin, isAuthenticated, isGiangVien } from '../middleware/auth.js';
import { layDanhSachHocVienDangKyKhoaHoc, layDanhSachKhoaHocDaDangKy, layTatCaKhoaHocDaDangKy, regisCourse, thongKeSoLuotDangKyKhoaHoc } from '../controllers/registerCourseController.js';


const regisCoursetRouter = express.Router();

// Route đăng ký khóa học
regisCoursetRouter.post('/khoa-hoc-dang-ky/:id',isAuthenticated, regisCourse);
// Route lấy danh sách các khóa học đăng ký theo IDNguoiDung
regisCoursetRouter.get('/khoa-hoc-dang-ky', isAuthenticated, layDanhSachKhoaHocDaDangKy);
// Route lấy tất cả các khóa học đã đăng ký
regisCoursetRouter.get('/khoa-hoc-dang-ky/all',isAuthenticated, isAdmin, layTatCaKhoaHocDaDangKy);
// Route lấy danh sách học viên đã đăng ký khóa học (chỉ dành cho giảng viên)
regisCoursetRouter.get('/khoa-hoc-dang-ky/hocvien/:id', isAuthenticated, isGiangVien, layDanhSachHocVienDangKyKhoaHoc);
// Route thống kê số lượt đăng ký của một khóa học
regisCoursetRouter.get('/khoa-hoc-dang-ky/thong-ke/:IDKhoaHoc', isAuthenticated, isGiangVien, thongKeSoLuotDangKyKhoaHoc);

export default regisCoursetRouter;
