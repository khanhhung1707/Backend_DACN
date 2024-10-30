import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// Thêm nhận xét cho khóa học theo IDKhoaHoc
export const themNhanXet = async (req, res) => {
    const { noiDung, xepLoai} = req.body; 
    const userId = req.user.id; 

    try {
        // Tiến hành thêm nhận xét vào cơ sở dữ liệu
        const nhanXetMoi = await model.NhanXet.create({
            IDNguoiDung: userId, 
            NoiDung: noiDung,
            XepLoai: xepLoai,
            ThoiGian: new Date(),
            IDKhoaHoc: req.params.IDKhoaHoc 
        });

        return responseData(res, 201, "Thêm nhận xét thành công", nhanXetMoi);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

//lấy danh sách tất cả các nhận xét
export const layDanhSachNhanXet = async (req, res) => {
    try {
        const danhSachNhanXet = await model.NhanXet.findAll({
            include: [{ model: model.NguoiDung, as: 'IDNguoiDung_NguoiDung' }] 
        });

        return responseData(res, 200, "Lấy danh sách nhận xét thành công", danhSachNhanXet);
    } catch (error) {
        console.error(error); // Log lỗi để dễ dàng theo dõi
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};



// Xóa nhận xét theo IDNhanXet
export const xoaNhanXet = async (req, res) => {
    const idNhanXet = req.params.IDNhanXet; // Lấy IDNhanXet từ params

    try {
        const deleted = await model.NhanXet.destroy({
            where: { IDNhanXet: idNhanXet }
        });

        if (deleted) {
            return responseData(res, 200, "Xóa nhận xét thành công");
        }
        return responseData(res, 404, "Nhận xét không tồn tại");
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

// Lấy chi tiết nhận xét theo IDNhanXet
export const layChiTietNhanXet = async (req, res) => {
    const idNhanXet = req.params.IDNhanXet; // Lấy IDNhanXet từ params

    try {
        const nhanXet = await model.NhanXet.findOne({
            where: { IDNhanXet: idNhanXet },
            include: [{ model: model.NguoiDung, as: 'IDNguoiDung_NguoiDung' }] 
        });

        if (nhanXet) {
            return responseData(res, 200, "Lấy chi tiết nhận xét thành công", nhanXet);
        }
        return responseData(res, 404, "Nhận xét không tồn tại");
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};
