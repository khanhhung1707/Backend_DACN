import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const paymentRoutes = express.Router();


export default paymentRoutes;