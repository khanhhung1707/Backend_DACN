import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { createKhuyenMai, deleteKhuyenMai, getAllKhuyenMai, getKhuyenMaiById, updateKhuyenMai } from '../controllers/promotionController.js';


const promotionRoute = express.Router();
// Route Xem danh sách tất cả mã khuyến mãi
promotionRoute.get("/khuyenmai/all",isAuthenticated, getAllKhuyenMai);  
// Route Thêm mã khuyến mãi mới               
promotionRoute.post("/khuyenmai/add",isAuthenticated,  createKhuyenMai);  
// Route Cập nhật mã khuyến mãi theo ID              
promotionRoute.put("/khuyenmai/put/:IDKhuyenMai",isAuthenticated,  updateKhuyenMai); 
// Route Xem chi tiết mã khuyến mãi theo ID
promotionRoute.get("/khuyenmai/:IDKhuyenMai",isAuthenticated,  getKhuyenMaiById);
// Xóa mã khuyến mãi
promotionRoute.delete("/khuyenmai/delete/:IDKhuyenMai",isAuthenticated, deleteKhuyenMai); 


export default promotionRoute;
