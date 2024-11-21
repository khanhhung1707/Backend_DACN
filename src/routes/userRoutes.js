import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { capNhatRoleHocVien, getChiTietNguoiDungGiangVien, getChiTietNguoiDungHocVien, getKhoaHocByGiangVien, getNguoiDungAdmin, getNguoiDungGiangVien, getNguoiDungHocVien, suaNguoiDungGiangVien, suaNguoiDungHocVien, themNguoiDungGiangVien, themNguoiDungHocVien,  updateUserProfile, xoaNguoiDungGiangVien, xoaNguoiDungHocVien } from '../controllers/userController.js';

const userRouter = express.Router();

// Route PUT để chỉnh sửa thông tin cá nhân
userRouter.put('/user/profile', isAuthenticated, updateUserProfile);
// Route tìm kiếm tên giảng viên sẽ đề xuất khóa học của giảng viên đó
userRouter.get('/giangvien',isAuthenticated, getKhoaHocByGiangVien);

// Route để lấy danh sách người dùng có role là hocvien
userRouter.get('/hocvien',isAuthenticated, getNguoiDungHocVien);
// Route để thêm người dùng mới có role là hocvien
userRouter.post('/hocvien/add',isAuthenticated,isAdmin, themNguoiDungHocVien);
// Route để chỉnh sửa thông tin người dùng có role là hocvien theo IDNguoiDung
userRouter.put('/hocvien/put/:idNguoiDung',isAuthenticated,isAdmin, suaNguoiDungHocVien);
// Route để xóa thông tin người dùng có role là hocvien theo IDNguoiDung
userRouter.delete('/hocvien/delete/:idNguoiDung',isAuthenticated,isAdmin, xoaNguoiDungHocVien);
// Route để xem chi tiết thông tin người dùng có role là hocvien theo IDNguoiDung
userRouter.get('/hocvien/:idNguoiDung',isAuthenticated,isAdmin, getChiTietNguoiDungHocVien);

// Route tìm kiếm học viên theo HoTen
// userRouter.get('/hocvien/tim-kiem',isAuthenticated,isAdmin, timKiemHocVien);

// Route cập nhật role
userRouter.put('/hocvien/cap-nhat-role/:id',isAuthenticated,isAdmin, capNhatRoleHocVien);

// Lấy danh sách giảng viên
userRouter.get('/giangvien/all',isAuthenticated, getNguoiDungGiangVien);
// Thêm giảng viên mới
userRouter.post('/giangvien/add',isAuthenticated,isAdmin, themNguoiDungGiangVien);
// Sửa thông tin giảng viên theo ID
userRouter.put('/giangvien/put/:idNguoiDung',isAuthenticated,isAdmin, suaNguoiDungGiangVien);
// Xóa giảng viên theo ID
userRouter.delete('/giangvien/delete/:idNguoiDung',isAuthenticated,isAdmin, xoaNguoiDungGiangVien);
// Xem chi tiết giảng viên theo ID
userRouter.get('/giangvien/:idNguoiDung',isAuthenticated,isAdmin, getChiTietNguoiDungGiangVien);

// Route để lấy danh sách người dùng có role là admin
userRouter.get('/admin',isAuthenticated, getNguoiDungAdmin);

export default userRouter;