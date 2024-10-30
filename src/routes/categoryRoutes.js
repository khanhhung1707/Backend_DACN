import express from 'express';
import { isAdmin, isAuthenticated, isGiangVien } from '../middleware/auth.js';
import { getChiTietDanhMuc, getDanhMucKhoaHoc, suaDanhMuc, themDanhMuc, xoaDanhMuc } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

// Route để lấy danh sách danh mục
categoryRoutes.get('/danhmuc/all', getDanhMucKhoaHoc);

// Route để xem chi tiết danh mục theo IDDanhMuc
categoryRoutes.get('/danhmuc/:idDanhMuc',isAuthenticated, getChiTietDanhMuc);

// Route để chỉnh sửa danh mục theo IDDanhMuc
categoryRoutes.put('/danhmuc/put/:idDanhMuc',isAuthenticated, isAdmin, suaDanhMuc);

// Route để xóa danh mục theo IDDanhMuc
categoryRoutes.delete('/danhmuc/delete/:idDanhMuc',isAuthenticated, isAdmin, xoaDanhMuc);

// Route để thêm danh mục mới
categoryRoutes.post('/danhmuc/add',isAuthenticated, isAdmin, themDanhMuc);

export default categoryRoutes;
