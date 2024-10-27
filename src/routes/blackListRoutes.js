import express from 'express';
import { isAdmin, isAuthenticated, isGiangVien } from '../middleware/auth.js';

const blackListRoute = express.Router();


export default blackListRoute;
