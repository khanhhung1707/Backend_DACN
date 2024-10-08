import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// lấy đơn hàng của người dùng đó
export const layDonHangNguoiDung = async (req, res) => {
    try {
        const userId = req.user.id; // ID người dùng từ token đã xác thực
        
        // Truy vấn để lấy đơn hàng của người dùng
        const donHang = await model.DonHang.findAll({
            where: { IDNguoiDung: userId }, // Lọc theo IDNguoiDung
            include: [
                {
                    model: model.KhoaHoc,  // Liên kết với bảng KhoaHoc
                    as: 'IDKhoaHoc_KhoaHoc' // Đừng quên chỉ định alias nếu có
                },
                {
                    model: model.ThanhToan, // Liên kết với bảng ThanhToan
                    as: 'IDThanhToan_ThanhToan' // Alias cho ThanhToan
                }
            ]
        });

        if (!donHang || donHang.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào' });
        }

        // Trả về dữ liệu đơn hàng
        res.json(donHang);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
}; 

// Lấy tất cả các đơn hàng
export const layTatCaDonHang = async (req, res) => {
    try {
        // Truy vấn để lấy tất cả đơn hàng
        const donHang = await model.DonHang.findAll({
            include: [
                {
                    model: model.KhoaHoc,
                    as: 'IDKhoaHoc_KhoaHoc' 
                },
                {
                    model: model.ThanhToan,
                    as: 'IDThanhToan_ThanhToan'
                }
            ]
        });

        if (!donHang || donHang.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào' });
        }

        // Trả về dữ liệu đơn hàng
        res.json(donHang);

    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
};