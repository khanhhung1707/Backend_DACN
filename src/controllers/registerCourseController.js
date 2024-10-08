import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Đăng ký khóa học theo IDKhoaHoc
export const regisCourse = async (req, res) => {
    const userId = req.user.id; 
    const IDKhoaHoc = req.params.id; 

    try {
        // Kiểm tra xem người dùng đã đăng ký khóa học này chưa
        const existingRegistration = await model.DangKyKhoaHoc.findOne({
            where: {
                IDNguoiDung: userId,
                IDKhoaHoc: IDKhoaHoc,
            },
        });

        if (existingRegistration) {
            return responseData(res, 400, "Bạn đã đăng ký khóa học này trước đó");
        }

        // thêm đăng ký khóa học vào cơ sở dữ liệu
        const registrationMoi = await model.DangKyKhoaHoc.create({
            IDNguoiDung: userId,
            IDKhoaHoc: IDKhoaHoc, 
        });

        return responseData(res, 201, "Đăng ký khóa học thành công", registrationMoi);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

// API lấy danh sách khóa học đã đăng ký của người dùng
export const layDanhSachKhoaHocDaDangKy = async (req, res) => {
    const userId = req.user.id;

    try {
        // Lấy danh sách khóa học đã đăng ký
        const danhSachKhoaHoc = await model.DangKyKhoaHoc.findAll({
            where: { IDNguoiDung: userId },
            include: [{
                model: model.KhoaHoc,
                as: "IDKhoaHoc_KhoaHoc",
                attributes: ['IDKhoaHoc', 'TenKhoaHoc', 'MoTaKhoaHoc',"HinhAnh", "SoLuongHocVien", "LoaiKhoaHoc" ], 
            }],
        });

        // Kiểm tra nếu không có khóa học nào
        if (danhSachKhoaHoc.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào đã đăng ký");
        }

        return responseData(res, 200, "Danh sách khóa học đã đăng ký", danhSachKhoaHoc);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

// API lấy tất cả khóa học đã được đăng ký
export const layTatCaKhoaHocDaDangKy = async (req, res) => {
    try {
        // Lấy tất cả đăng ký khóa học
        const danhSachDangKy = await model.DangKyKhoaHoc.findAll({
            include: [{
                model: model.KhoaHoc, 
                as: "IDKhoaHoc_KhoaHoc",
                attributes: ['IDKhoaHoc', 'TenKhoaHoc', 'MoTaKhoaHoc',"HinhAnh", "SoLuongHocVien", "LoaiKhoaHoc" ],
            }],
        });

        // Kiểm tra nếu không có khóa học nào
        if (danhSachDangKy.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào đã đăng ký");
        }

        return responseData(res, 200, "Danh sách tất cả khóa học đã đăng ký", danhSachDangKy);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};