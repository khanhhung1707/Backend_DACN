import express from 'express';
import { signUp, signIn, forgotPassword, changePassword } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const authRouter = express.Router();

// Route đăng ký học viên
authRouter.post('/signup', signUp);
// Route đăng nhập học viên
authRouter.post('/login', signIn);
// Route quên mật khẩu
authRouter.post('/forgot-password', forgotPassword);
// Route đổi mật khẩu (chỉ cho người dùng đã đăng nhập)
authRouter.post('/change-password', isAuthenticated, changePassword);

export default authRouter;