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
                attributes: ['IDKhoaHoc', 'TenKhoaHoc', 'MoTaKhoaHoc',"HinhAnh", "SoLuongHocVien", "LoaiKhoaHoc","GiaTien" ], 
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

// API lấy danh sách học viên đã đăng ký khóa học
export const layDanhSachHocVienDangKyKhoaHoc = async (req, res) => {
    const IDKhoaHoc = req.params.id; // Lấy ID khóa học từ params
    console.log("ID khóa học:", IDKhoaHoc); // Log ID khóa học

    try {
        // Kiểm tra khóa học có tồn tại hay không và lấy thông tin danh mục liên kết
        const khoaHoc = await model.KhoaHoc.findOne({
            where: { IDKhoaHoc: IDKhoaHoc },
            attributes: ['IDKhoaHoc', 'TenKhoaHoc'],
            include: [{
                model: model.DanhMucKhoaHoc, // Thông tin danh mục khóa học
                as: "IDDanhMuc_DanhMucKhoaHoc", 
                attributes: ['IDDanhMuc', 'TenDanhMuc'], // Chọn các thuộc tính cần lấy
            }]
        });

        if (!khoaHoc) {
            console.log("Khóa học không tồn tại:", IDKhoaHoc); // Log khi không tìm thấy khóa học
            return responseData(res, 404, "Không tìm thấy khóa học");
        }

        console.log("Khóa học tìm thấy:", khoaHoc); // Log thông tin khóa học

        // Lấy danh sách học viên đã đăng ký khóa học này
        const danhSachHocVien = await model.DangKyKhoaHoc.findAll({
            where: { IDKhoaHoc: IDKhoaHoc },
            include: [{
                model: model.NguoiDung, // Thông tin người dùng
                as: "IDNguoiDung_NguoiDung",
                attributes: ['IDNguoiDung', 'HoTen', 'Email', 'AnhDaiDien'], 
            }],
        });

        console.log("Số học viên đăng ký:", danhSachHocVien.length); // Log số lượng học viên đăng ký

        // Kiểm tra nếu không có học viên nào đăng ký khóa học
        if (danhSachHocVien.length === 0) {
            console.log("Không có học viên nào đăng ký khóa học:", IDKhoaHoc); // Log khi không có học viên
            return responseData(res, 404, "Không có học viên nào đã đăng ký khóa học này");
        }

        console.log("Danh sách học viên:", danhSachHocVien); // Log danh sách học viên

        return responseData(res, 200, "Danh sách học viên đã đăng ký khóa học", {
            khoaHoc, // Bao gồm thông tin khóa học và danh mục liên kết
            danhSachHocVien
        });
    } catch (error) {
        console.error("Lỗi xảy ra trong quá trình lấy danh sách học viên:", error); // Log chi tiết lỗi
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

// thống kê số lượt đăng ký 1 khóa học
export const thongKeSoLuotDangKyKhoaHoc = async (req, res) => {
    try {
        const { IDKhoaHoc } = req.params;

        // Đếm số lượt đăng ký cho khóa học với IDKhoaHoc
        const soLuotDangKy = await model.DangKyKhoaHoc.count({
            where: { IDKhoaHoc },
        });

        // Kiểm tra nếu không có lượt đăng ký nào
        if (soLuotDangKy === 0) {
            return responseData(res, 404, `Không có lượt đăng ký cho khóa học với IDKhoaHoc: ${IDKhoaHoc}`);
        }

        return responseData(res, 200, `Số lượt đăng ký cho khóa học với IDKhoaHoc: ${IDKhoaHoc}`, { soLuotDangKy });
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};
