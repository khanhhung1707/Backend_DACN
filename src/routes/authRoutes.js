import express from "express";
import {
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  googleLogin,
  googleRegister, // Import các API Google
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";

const authRouter = express.Router();

// Route đăng ký học viên
authRouter.post("/signup", signUp);

// Route đăng nhập học viên
authRouter.post("/login", signIn);

// Route quên mật khẩu
authRouter.post("/forgot-password", forgotPassword);

// Route đổi mật khẩu (chỉ cho người dùng đã đăng nhập)
authRouter.post("/change-password", isAuthenticated, changePassword);

// Route đăng ký qua Google
authRouter.post("/google-register", googleRegister);

// Route đăng nhập qua Google
authRouter.post("/google-login", googleLogin);

export default authRouter;
