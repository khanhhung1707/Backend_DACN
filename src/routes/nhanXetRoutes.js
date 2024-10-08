import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { themNhanXet } from '../controllers/nhanXetController.js';


const nhanXetRouter = express.Router();

//endpoint cho thêm nhận xét
nhanXetRouter.post('/nhan-xet/:id',isAuthenticated, themNhanXet);

export default nhanXetRouter;
