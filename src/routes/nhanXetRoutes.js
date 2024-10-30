import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layChiTietNhanXet, layDanhSachNhanXet, themNhanXet, xoaNhanXet } from '../controllers/nhanXetController.js';


const nhanXetRouter = express.Router();

//endpoint cho thêm nhận xét
nhanXetRouter.post('/nhan-xet/add/:IDKhoaHoc',isAuthenticated, themNhanXet);
//endpoint lấy danh sách tất cả nhận xét
nhanXetRouter.get('/nhan-xet/all', isAuthenticated,isAdmin, layDanhSachNhanXet);
//endpoint xóa nhận xét
nhanXetRouter.delete('/nhan-xet/delete/:IDNhanXet', isAuthenticated,isAdmin, xoaNhanXet);
//endpoint xem chi tiết nhận xét
nhanXetRouter.get('/nhan-xet/:IDNhanXet', isAuthenticated,isAdmin, layChiTietNhanXet);


export default nhanXetRouter;
