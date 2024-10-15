import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { getKhoaHocByGiangVien, updateUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

// Route PUT để chỉnh sửa thông tin cá nhân
userRouter.put('/user/profile', isAuthenticated, updateUserProfile);
// Route tìm kiếm tên giảng viên sẽ đề xuất khóa học của giảng viên đó
userRouter.get('/giangvien',isAuthenticated, getKhoaHocByGiangVien);

export default userRouter;