import express from 'express';
import {  forgotPassword, signUpHocVien, loginHocVien, signUpGiangVien, loginAdmin, loginGiangVien, signUpAdmin  } from '../controllers/authController.js';

const authRouter = express.Router();

// Route đăng ký học viên
authRouter.post('/hocvien/signup', signUpHocVien);
// Route đăng nhập học viên
authRouter.post('/hocvien/login', loginHocVien);
// Route đăng ký giảng viên
authRouter.post('/giangvien/signup', signUpGiangVien);
// Route đăng nhập giảng viên
authRouter.post('/giangvien/login', loginGiangVien);
// Route đăng ký admin
authRouter.post('/admin/signup', signUpAdmin)
// Route đăng nhập admin
authRouter.post('/admin/login', loginAdmin)
//Route quên mật khẩu
authRouter.post('/forgot-password', forgotPassword);

export default authRouter;