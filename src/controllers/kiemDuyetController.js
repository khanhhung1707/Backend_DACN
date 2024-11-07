import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';
import { sendEmail } from "../config/mail.js";

const model = initModels(sequelize);

export const layDanhSachKhoaHocKiemDuyet = async (req, res) => {
    try {
        // Lấy danh sách tất cả khóa học
        const danhSachKhoaHoc = await model.KhoaHoc.findAll({
            include: [
                {
                    model: model.NguoiDung,
                    as: "IDNguoiDung_NguoiDung", 
                    attributes: ['IDNguoiDung', 'HoTen', 'email'],
                },
                {
                    model: model.DanhMucKhoaHoc,
                    as: "IDDanhMuc_DanhMucKhoaHoc", 
                    attributes: ['IDDanhMuc', 'TenDanhMuc'],
                },
            ],
        });

        // Kiểm tra nếu không có khóa học nào
        if (danhSachKhoaHoc.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào");
        }

        return responseData(res, 200, "Danh sách tất cả khóa học kiểm duyệt", danhSachKhoaHoc);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

// Hàm gửi email thông báo đến các học viên đã follow giảng viên
export const sendNotificationToFollowers = async (giangVienId, tenKhoaHoc,res) => {
    try {
        // Lấy danh sách học viên theo dõi giảng viên từ bảng FollowAuthor
        const followers = await model.FollowAuthor.findAll({
            where: { IDNguoiDungGiangVien: giangVienId }
        });

        if (followers.length === 0) {
            return responseData(res, 404, "Không có học viên theo dõi giảng viên này");
        }

        // Lấy thông tin học viên và gửi thông báo
        const sendNotificationPromises = followers.map(async (follower) => {
            const hocVien = await model.NguoiDung.findByPk(follower.IDNguoiDung);
            if (hocVien) {
                const subject = "Thông báo khóa học mới được duyệt!";
                const text = `Khóa học "${tenKhoaHoc}" của giảng viên bạn đang theo dõi mới được đăng. Hãy tham gia ngay!`;
                await sendEmail(hocVien.Email, subject, text);
            }
        });

        // Chờ tất cả các thông báo được gửi
        await Promise.all(sendNotificationPromises);

        return responseData(res, 200, "Thông báo đã được gửi cho các học viên");

    } catch (error) {
        console.error("Error sending notifications:", error);
        return responseData(res, 500, "Lỗi gửi thông báo");
    }
};



// kiểm duyệt khóa học
export const kiemDuyetKhoaHoc = async (req, res) => {
    const { idKhoaHoc, trangThai, lyDo } = req.body;

    try {
        // Lấy thông tin khóa học từ bảng KhoaHocChuaDuyet
        const khoaHoc = await model.KhoaHocChuaDuyet.findOne({
            where: { IDKhoaHoc: idKhoaHoc },
        });

        if (!khoaHoc) {
            if (!res.headersSent) {
                return responseData(res, 404, "Khóa học không tồn tại");
            }
        }

        const {
            IDNguoiDung, // ID giảng viên
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh,
            LoaiKhoaHoc,
            IDDanhMuc,
            GiaTien,
            IDKhuyenMai,
            LuotXem,
            SoLuongHocVien,
            GiamGia,
        } = khoaHoc.dataValues;

        // Kiểm tra trạng thái
        if (trangThai === "duyet") {
            // Thêm khóa học vào bảng KhoaHoc
            await model.KhoaHoc.create({
                IDNguoiDung,
                TenKhoaHoc,
                MoTaKhoaHoc,
                HinhAnh,
                LoaiKhoaHoc,
                IDDanhMuc,
                GiaTien,
                IDKhuyenMai,
                LuotXem,
                SoLuongHocVien,
                GiamGia,
                TrangThai: 'da_duyet',
                NgayDang: new Date()
            });

            // Xóa khóa học khỏi bảng KhoaHocChuaDuyet
            await model.KhoaHocChuaDuyet.destroy({
                where: { IDKhoaHoc: idKhoaHoc },
            });

            // Gửi thông báo qua email cho các học viên theo dõi giảng viên
            await sendNotificationToFollowers(IDNguoiDung, TenKhoaHoc, res); // Truyền IDNguoiDung của giảng viên và TenKhoaHoc làm thông điệp

            if (!res.headersSent) {
                return responseData(res, 200, "Khóa học đã được duyệt và thêm vào danh sách khóa học");
            }
        } else if (trangThai === "tu_choi") {
            // Nếu từ chối, thêm vào danh sách đen
            await model.BlackList.create({
                IDNguoiDung,
                IDKhoaHoc: idKhoaHoc,
                LyDo: lyDo,
                TenKhoaHoc,
                MoTaKhoaHoc,
                HinhAnh,
                LoaiKhoaHoc,
                IDDanhMuc,
                GiaTien,
                IDKhuyenMai,
                GiamGia,
                NgayThemVaoBlackList: new Date()
            });

            await model.KhoaHocChuaDuyet.destroy({
                where: { IDKhoaHoc: idKhoaHoc },
            });

            if (!res.headersSent) {
                return responseData(res, 200, "Khóa học đã bị từ chối và thêm vào danh sách đen");
            }
        } else {
            if (!res.headersSent) {
                return responseData(res, 400, "Trạng thái không hợp lệ");
            }
        }
    } catch (error) {
        if (!res.headersSent) {
            return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
        }
    }
};



