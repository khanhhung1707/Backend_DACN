import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';
import querystring from 'querystring';
import crypto from 'crypto';

const model = initModels(sequelize);

// lấy đơn hàng của người dùng đó
export const layDonHangNguoiDung = async (req, res) => {
    try {
        const userId = req.user.id; // ID người dùng từ token đã xác thực
        
        // Truy vấn để lấy đơn hàng của người dùng, chỉ lấy những đơn hàng chưa thanh toán
        const donHang = await model.DonHang.findAll({
            where: { 
                IDNguoiDung: userId, // Lọc theo IDNguoiDung
            },
            include: [
                {
                    model: model.KhoaHoc,  // Liên kết với bảng KhoaHoc
                    as: 'IDKhoaHoc_KhoaHoc', // Đừng quên chỉ định alias nếu có
                    where: {
                        TrangThai: { [Op.ne]: 'da_thanh_toan' } // Loại trừ các khóa học có TrangThai = 'da_thanh_toan'
                    }
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

//thêm đơn hàng
export const themDonHang = async (req, res) => {
    const IDNguoiDung = req.user.id; // Lấy IDNguoiDung từ token đã giải mã
    const { IDKhoaHoc } = req.params; // Lấy IDKhoaHoc từ params

    try {
        // Kiểm tra xem khóa học có tồn tại không
        const khoaHoc = await model.KhoaHoc.findByPk(IDKhoaHoc);
        
        if (!khoaHoc) {
            return responseData(res, 404, "Khóa học không tồn tại", null);
        }

        // Tạo đơn hàng mới với giá tiền từ KhoaHoc
        const newDonHang = await model.DonHang.create({
            IDNguoiDung: IDNguoiDung,
            IDKhoaHoc: IDKhoaHoc,
            NgayMua: new Date(),
            TongTien: khoaHoc.GiaTien, // Lấy giá tiền từ khóa học
            TrangThai: 'pending'
        });

        return responseData(res, 200, "Tạo đơn hàng thành công", newDonHang);
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return responseData(res, 500, "Lỗi khi tạo đơn hàng", error);
    }
};
// Xóa đơn hàng
export const xoaDonHang = async (req, res) => {
    const { IDDonHang } = req.params;

    try {
        // Kiểm tra đơn hàng có tồn tại không
        const donHang = await model.DonHang.findByPk(IDDonHang);
        if (!donHang) {
            return responseData(res, 404, "Đơn hàng không tồn tại", null);
        }

        // Xóa đơn hàng
        await donHang.destroy();
        return responseData(res, 200, "Xóa đơn hàng thành công", null);
    } catch (error) {
        console.error("Lỗi khi xóa đơn hàng:", error);
        return responseData(res, 500, "Lỗi khi xóa đơn hàng", error);
    }
};
// Cập nhật đơn hàng
export const capNhatDonHang = async (req, res) => {
    const { IDDonHang } = req.params;
    const { TongTien, TrangThai } = req.body;  // Ngày mua sẽ lấy trực tiếp từ new Date()

    try {
        // Kiểm tra đơn hàng có tồn tại không
        const donHang = await model.DonHang.findByPk(IDDonHang);
        if (!donHang) {
            return responseData(res, 404, "Đơn hàng không tồn tại", null);
        }

        // Lấy thông tin khóa học từ đơn hàng (khóa học đã được liên kết với đơn hàng)
        const khoaHoc = await model.KhoaHoc.findByPk(donHang.IDKhoaHoc);
        if (!khoaHoc) {
            return responseData(res, 404, "Khóa học không tồn tại", null);
        }

        // Cập nhật thông tin đơn hàng
        await donHang.update({
            IDKhoaHoc: donHang.IDKhoaHoc,  // Không cần thay đổi IDKhoaHoc
            NgayMua: new Date(),  // Cập nhật NgàyMua với thời gian hiện tại
            TongTien: TongTien || khoaHoc.GiaTien, // Nếu không truyền TongTien, lấy giá từ khóa học
            TrangThai
        });

        return responseData(res, 200, "Cập nhật đơn hàng thành công", donHang);
    } catch (error) {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
        return responseData(res, 500, "Lỗi khi cập nhật đơn hàng", error);
    }
};
