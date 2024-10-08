import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { layDonHangNguoiDung, layTatCaDonHang } from '../controllers/orderController.js';


const ordertRouter = express.Router();

// Route lấy đơn hàng theo người dùng
ordertRouter.get('/don-hang', isAuthenticated, layDonHangNguoiDung);
// Route lấy tất cả đơn hàng
ordertRouter.get('/don-hang/all', isAuthenticated, isAdmin, layTatCaDonHang);


export default ordertRouter;
