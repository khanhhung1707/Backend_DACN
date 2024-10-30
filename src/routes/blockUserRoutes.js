import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { chanNguoiDung, xemDanhSachNguoiDungChan } from '../controllers/blockUserController.js';

const blockUserRoute = express.Router();

//chặn học viên
blockUserRoute.post('/block/hocvien/:id',isAuthenticated,isAdmin, chanNguoiDung);
//xem danh sách tất cả người dùng bị chặn
blockUserRoute.get('/block/all',isAuthenticated,isAdmin, xemDanhSachNguoiDungChan);

export default blockUserRoute;