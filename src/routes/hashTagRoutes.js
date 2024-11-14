import express from 'express';
import {  isAdmin, isAuthenticated, isGiangVien } from '../middleware/auth.js';
import { addHashtagToCourse, deleteHashtag, getHashtag, postHashtag } from '../controllers/hasgTagController.js';


const hashTagRoutes = express.Router();

hashTagRoutes.post('/hashtag/add',isAuthenticated,isGiangVien, postHashtag);  // Thêm hashtag
hashTagRoutes.get('/hashtag/all',isAuthenticated, getHashtag);    // Lấy danh sách hashtag
hashTagRoutes.delete('/hashtag/delete/:IDHashTag',isAuthenticated, deleteHashtag); // Xóa hashtag theo ID

hashTagRoutes.post('/hashtags/course/:IDKhoaHoc',isAuthenticated,isAdmin, addHashtagToCourse); // thêm hashtag vào khóa học
export default hashTagRoutes;
