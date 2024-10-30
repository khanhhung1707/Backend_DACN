import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { kiemDuyetKhoaHoc, layDanhSachKhoaHocKiemDuyet } from '../controllers/kiemDuyetController.js';


const kiemDuyetRoute = express.Router();

// Route lấy danh sách các khóa học chưa duyệt (chỉ dành cho admin)
kiemDuyetRoute.get('/khoa-hoc-kiem-duyet', isAuthenticated, isAdmin, layDanhSachKhoaHocKiemDuyet);
// Route kiểm duyệt khóa học (chỉ dành cho admin)
kiemDuyetRoute.post('/kiem-duyet-khoa-hoc', isAuthenticated, isAdmin, kiemDuyetKhoaHoc);


export default kiemDuyetRoute;
