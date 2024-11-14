import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { capNhatThanhToan, layTatCaThanhToan, layThanhToanNguoiDung, layThanhToanTheoID, taoThanhToan, thongKeThuNhapTheoKhoaHoc, xoaThanhToan } from '../controllers/paymentController.js';

const paymentRoutes = express.Router();

// Tạo thanh toán
paymentRoutes.post('/thanh-toan/add', isAuthenticated, taoThanhToan);

// Lấy tất cả các thanh toán của người dùng hiện tại
paymentRoutes.get('/thanh-toan-nguoi-dung',isAuthenticated, layThanhToanNguoiDung);

// Cập nhật trạng thái thanh toán
paymentRoutes.put('/thanh-toan/put/:IDThanhToan',isAuthenticated,isAdmin, capNhatThanhToan);

// Xóa thanh toán
paymentRoutes.delete('/thanh-toan/delete/:IDThanhToan',isAuthenticated,isAdmin, xoaThanhToan);

// Lấy tất cả thanh toán của mọi người dùng
paymentRoutes.get('/thanh-toan/all',isAuthenticated,isAdmin, layTatCaThanhToan);

// Lấy thanh toán theo IDThanhToan
paymentRoutes.get('/thanh-toan/:IDThanhToan',isAuthenticated,isAdmin, layThanhToanTheoID);

// thống kê thu nhập theo khóa học
paymentRoutes.get('/thong-ke-thu-nhap',isAuthenticated,isAdmin, thongKeThuNhapTheoKhoaHoc);

export default paymentRoutes;