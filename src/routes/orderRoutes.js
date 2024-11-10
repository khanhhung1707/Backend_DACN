import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { capNhatDonHang, layDonHangNguoiDung, layTatCaDonHang, themDonHang, xoaDonHang } from '../controllers/orderController.js';


const ordertRouter = express.Router();

// Route lấy đơn hàng theo người dùng
ordertRouter.get('/don-hang', isAuthenticated, layDonHangNguoiDung);
// Route lấy tất cả đơn hàng
ordertRouter.get('/don-hang/all', isAuthenticated, isAdmin, layTatCaDonHang);

// Route thêm đơn hàng 
ordertRouter.post('/don-hang/add/:IDKhoaHoc', isAuthenticated, themDonHang);

// Route xóa đơn hàng 
ordertRouter.delete('/don-hang/delete/:IDDonHang', isAuthenticated, xoaDonHang);

// Route cập nhật đơn hàng 
ordertRouter.put('/don-hang/put/:IDDonHang', isAuthenticated, capNhatDonHang);

//Route thanh toán vnpay
// ordertRouter.post('/don-hang/thanh-toan-vnpay',  thanhToanVnPay);


export default ordertRouter;
