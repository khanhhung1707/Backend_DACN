import express from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.js';
import { createVideo, getVideoById } from '../controllers/videoController.js';

const videoRoutes = express.Router();

// Route lấy video theo IDKhoaHoc
videoRoutes.get('/videos/:IDKhoaHoc',isAuthenticated,isAdmin, getVideoById); 

// thêm video
videoRoutes.post('/videos',isAuthenticated,isAdmin, createVideo);

export default videoRoutes;