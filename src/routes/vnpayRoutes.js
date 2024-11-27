import express from "express";
import { createVideo, getVideoById } from "../controllers/videoController.js";
import { createOrder, orderReturn } from "../controllers/orderController.js";

const vnpayRoutes = express.Router();

// Route lấy video theo IDKhoaHoc
vnpayRoutes.get("/vnpay/payment", createOrder);

// thêm video
vnpayRoutes.get("/vnpay/paymentReturn", orderReturn);

export default vnpayRoutes;
