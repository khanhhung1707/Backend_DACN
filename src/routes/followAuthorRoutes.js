import express from 'express';
import { isAuthenticated, isGiangVien } from '../middleware/auth.js';
import { followAuthor, getFollowers } from '../controllers/followAuthorController.js';


const followAuthorRouter = express.Router();

// Route học viên theo dõi giảng viên
followAuthorRouter.post('/follow/:IDNguoiDungGiangVien',isAuthenticated, followAuthor);
// Route lấy danh sách học viên theo dõi
followAuthorRouter.get('/followers', isAuthenticated,isGiangVien, getFollowers);

export default followAuthorRouter;
