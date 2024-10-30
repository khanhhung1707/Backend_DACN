import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

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

// kiểm duyệt khóa học 
export const kiemDuyetKhoaHoc = async (req, res) => {
    const { idKhoaHoc, trangThai, lyDo } = req.body;

    // Log giá trị đầu vào
    console.log("idKhoaHoc:", idKhoaHoc);
    console.log("trangThai:", trangThai);

    try {
        const khoaHoc = await model.KhoaHocChuaDuyet.findOne({
            where: { IDKhoaHoc: idKhoaHoc },
        });

        if (!khoaHoc) {
            return responseData(res, 404, "Khóa học không tồn tại");
        }

        // Log dữ liệu khóa học để kiểm tra từng trường
        console.log("Dữ liệu khóa học:", khoaHoc.dataValues);

        const {
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
        } = khoaHoc.dataValues;

        if (trangThai === "duyet") {
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

            await model.KhoaHocChuaDuyet.destroy({
                where: { IDKhoaHoc: idKhoaHoc },
            });

            return responseData(res, 200, "Khóa học đã được duyệt và thêm vào danh sách khóa học");
        } else if (trangThai === "tu_choi") {
            // Kiểm tra và log dữ liệu để đảm bảo tính nhất quán trước khi chèn vào BlackList
            console.log("Chuyển khóa học vào BlackList với các giá trị sau:");
            console.log("IDNguoiDung:", IDNguoiDung);
            console.log("IDKhoaHoc:", idKhoaHoc);
            console.log("LyDo:", lyDo);
            console.log("TenKhoaHoc:", TenKhoaHoc);
            console.log("MoTaKhoaHoc:", MoTaKhoaHoc);
            console.log("HinhAnh:", HinhAnh);
            console.log("LoaiKhoaHoc:", LoaiKhoaHoc);
            console.log("IDDanhMuc:", IDDanhMuc);
            console.log("GiaTien:", GiaTien);
            console.log("IDKhuyenMai:", IDKhuyenMai);
            console.log("GiamGia:", GiamGia);

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

            return responseData(res, 200, "Khóa học đã bị từ chối và thêm vào danh sách đen");
        } else {
            return responseData(res, 400, "Trạng thái không hợp lệ");
        }
    } catch (error) {
        console.error("Error processing course approval:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};





