import express from 'express';
import { signUp, signIn  } from '../controllers/authController.js';

const authRouter = express.Router();

// Route đăng ký học viên
authRouter.post('/signup', signUp);
// Route đăng nhập học viên
authRouter.post('/login', signIn);


export default authRouter;