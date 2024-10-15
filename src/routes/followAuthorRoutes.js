import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { followAuthor } from '../controllers/followAuthorController.js';


const followAuthorRouter = express.Router();
followAuthorRouter.post('/follow/:IDNguoiDungGiangVien',isAuthenticated, followAuthor);

export default followAuthorRouter;
