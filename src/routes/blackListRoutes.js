import express from 'express';
import { isAdmin, isAuthenticated, isGiangVien } from '../middleware/auth.js';
import { goBoKhoaHocKhoiBlackList, layDanhSachKhoaHocTrongBlackList } from '../controllers/blackListController.js';

const blackListRoute = express.Router();
// Route để lấy danh sách khóa học trong blacklist
blackListRoute.get('/blacklist/all', isAuthenticated,isAdmin, layDanhSachKhoaHocTrongBlackList);
//Route để lấy gỡ khóa học khỏi blacklist
blackListRoute.delete('/blacklist/remove/:idKhoaHoc',isAuthenticated,isAdmin, goBoKhoaHocKhoiBlackList);

export default blackListRoute;
