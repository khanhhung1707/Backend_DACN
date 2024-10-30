import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

//lấy danh sách tất cả khóa học trong blacklist
export const layDanhSachKhoaHocTrongBlackList = async (req, res) => {
    try {
        // Lấy danh sách tất cả khóa học trong blacklist
        const danhSachBlackList = await model.BlackList.findAll({
            attributes: ['IDBlackList', 'IDNguoiDung', 'IDKhoaHoc', 'LyDo', 'NgayThemVaoBlackList', 'HinhAnh', 'LoaiKhoaHoc', 'GiaTien', "TenHoaHoc", "MoTaKhoaHoc"],
        });

        // Kiểm tra nếu không có khóa học nào trong blacklist
        if (danhSachBlackList.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào trong blacklist");
        }

        return responseData(res, 200, "Danh sách khóa học trong blacklist", danhSachBlackList);
    } catch (error) {
        console.error(error); // In lỗi ra console để dễ kiểm tra
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};

//gỡ bỏ khóa học khỏi blacklist (chuyến qua KhoaHocChuaDuyet)
export const goBoKhoaHocKhoiBlackList = async (req, res) => {
    const { idKhoaHoc } = req.params; // Lấy idKhoaHoc từ params

    // Log giá trị đầu vào
    console.log("Bắt đầu xử lý gỡ khóa học khỏi blacklist");
    console.log("idKhoaHoc từ request params:", idKhoaHoc);

    try {
        // Tìm khóa học trong bảng BlackList
        const blackListEntry = await model.BlackList.findOne({
            where: { IDKhoaHoc: idKhoaHoc },
        });

        // Log kết quả truy vấn
        console.log("Kết quả tìm kiếm BlackList:", blackListEntry);

        // Kiểm tra nếu khóa học không tồn tại trong BlackList
        if (!blackListEntry) {
            console.log("Khóa học không tồn tại trong danh sách đen");
            return responseData(res, 404, "Khóa học không tồn tại trong danh sách đen");
        }

        // Tiếp tục chuyển dữ liệu như trước
        const { 
            IDNguoiDung,
            IDKhoaHoc,
            IDKhuyenMai,
            IDDanhMuc,
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh, 
            NgayGuiKiemDuyet,
            LuotXem,
            SoLuongHocVien,
            GiamGia,
            LoaiKhoaHoc, 
            GiaTien 
        } = blackListEntry.dataValues;

        console.log("Dữ liệu khóa học tìm thấy:", {
            IDNguoiDung,
            IDKhoaHoc,
            IDKhuyenMai,
            IDDanhMuc,
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh, 
            NgayGuiKiemDuyet,
            LuotXem,
            SoLuongHocVien,
            GiamGia,
            LoaiKhoaHoc, 
            GiaTien
        });

        await model.KhoaHocChuaDuyet.create({
            IDKhoaHoc,
            IDNguoiDung,
            IDDanhMuc,
            IDKhuyenMai, 
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh,
            NgayGuiKiemDuyet: new Date(),
            LuotXem,
            SoLuongHocVien,
            GiamGia,
            LoaiKhoaHoc,
            GiaTien,
            TrangThai: 'chua_duyet'
        });

        console.log("Khóa học đã được chuyển sang bảng KhoaHocChuaDuyet");

        // Xóa khóa học khỏi BlackList
        await model.BlackList.destroy({
            where: { IDKhoaHoc: idKhoaHoc },
        });

        console.log("Khóa học đã được xóa khỏi BlackList");

        return responseData(res, 200, "Khóa học đã được gỡ khỏi danh sách đen và chuyển về danh sách chờ duyệt");
    } catch (error) {
        console.error("Lỗi khi gỡ bỏ khóa học khỏi danh sách đen:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};


