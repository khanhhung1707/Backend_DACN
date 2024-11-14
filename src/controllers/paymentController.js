import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Tạo thanh toán
export const taoThanhToan = async (req, res) => {
    const userId = req.user.id; // Lấy IDNguoiDung từ token đã xác thực
    const { PhuongThucThanhToan, NoiDungThanhToan } = req.body;

    try {
        console.log("User ID:", userId);  // Kiểm tra xem ID người dùng có đúng không
        console.log("Payment Method:", PhuongThucThanhToan);  // Kiểm tra thông tin phương thức thanh toán
        console.log("Payment Content:", NoiDungThanhToan);  // Kiểm tra nội dung thanh toán

        // Lấy tất cả các đơn hàng của người dùng và tính tổng tiền
        const donHangCuaNguoiDung = await model.DonHang.findAll({
            where: { IDNguoiDung: userId, TrangThai: 'pending' },
            include: [{ model: model.KhoaHoc, as: 'IDKhoaHoc_KhoaHoc', attributes: ['IDKhoaHoc'] }]  // Sử dụng alias 'KhoaHoc'
        });

        console.log("DonHang records found:", donHangCuaNguoiDung);  // In ra kết quả tìm kiếm đơn hàng

        if (!donHangCuaNguoiDung || donHangCuaNguoiDung.length === 0) {
            return responseData(res, 404, "Không có đơn hàng nào cho người dùng này", null);
        }

        // Tính tổng tiền từ các đơn hàng của người dùng
        const tongTien = donHangCuaNguoiDung.reduce((acc, donHang) => acc + parseFloat(donHang.TongTien), 0);

        // Tạo bản ghi mới trong bảng ThanhToan
        const thanhToanMoi = await model.ThanhToan.create({
            NgayThanhToan: new Date(),
            PhuongThucThanhToan,
            NoiDungThanhToan,
            TongTien: tongTien,
            IDNguoiDung: userId // Lưu thông tin người dùng vào thanh toán
        });

        // Lưu mối quan hệ giữa ThanhToan và DonHang vào bảng trung gian ThanhToan_DonHang
        for (const donHang of donHangCuaNguoiDung) {
            const idKhoaHoc = donHang.KhoaHoc ? donHang.KhoaHoc.IDKhoaHoc : null;  // Lấy IDKhoaHoc từ alias 'KhoaHoc'

            await model.ThanhToan_DonHang.create({
                IDThanhToan: thanhToanMoi.IDThanhToan,
                IDDonHang: donHang.IDDonHang,
                IDKhoaHoc: idKhoaHoc  // Lưu thông tin IDKhoaHoc trong bảng ThanhToan_DonHang
            });
        }

        // Cập nhật trạng thái các đơn hàng đã thanh toán (gắn thêm IDThanhToan vào)
        for (const donHang of donHangCuaNguoiDung) {
            await model.DonHang.update(
                { TrangThai: 'da_thanh_toan', IDThanhToan: thanhToanMoi.IDThanhToan },
                { where: { IDDonHang: donHang.IDDonHang } }
            );
        }

        // Trả về kết quả
        return responseData(res, 200, "Tạo thanh toán thành công", thanhToanMoi);
    } catch (error) {
        console.error("Lỗi khi tạo thanh toán:", error);
        return responseData(res, 500, "Lỗi khi tạo thanh toán", error);
    }
};



// Lấy tất cả các thanh toán của người dùng hiện tại
export const layThanhToanNguoiDung = async (req, res) => {
    const IDNguoiDung = req.user.id; // Lấy IDNguoiDung từ token đã xác thực

    try {
        // Lấy danh sách thanh toán của người dùng
        const thanhToans = await model.ThanhToan.findAll({
            where: { IDNguoiDung: IDNguoiDung },
            order: [['NgayThanhToan', 'DESC']] // Sắp xếp theo ngày thanh toán mới nhất trước
        });

        if (!thanhToans || thanhToans.length === 0) {
            return responseData(res, 404, "Không có thanh toán nào", null);
        }

        // Trả về danh sách thanh toán
        return responseData(res, 200, "Lấy danh sách thanh toán thành công", thanhToans);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách thanh toán:", error);
        return responseData(res, 500, "Lỗi khi lấy danh sách thanh toán", error);
    }
};

// Cập nhật trạng thái thanh toán
export const capNhatThanhToan = async (req, res) => {
    const { IDThanhToan } = req.params;
    const { PhuongThucThanhToan, NoiDungThanhToan } = req.body; // Dữ liệu cần cập nhật

    try {
        // Kiểm tra thanh toán có tồn tại không
        const thanhToan = await model.ThanhToan.findByPk(IDThanhToan);
        if (!thanhToan) {
            return responseData(res, 404, "Thanh toán không tồn tại", null);
        }

        // Cập nhật phương thức thanh toán và nội dung thanh toán
        await thanhToan.update({
            PhuongThucThanhToan,
            NoiDungThanhToan
        });

        return responseData(res, 200, "Cập nhật thanh toán thành công", thanhToan);
    } catch (error) {
        console.error("Lỗi khi cập nhật thanh toán:", error);
        return responseData(res, 500, "Lỗi khi cập nhật thanh toán", error);
    }
};


//xóa thanh toán
export const xoaThanhToan = async (req, res) => {
    const { IDThanhToan } = req.params;

    try {
        // Kiểm tra thanh toán có tồn tại không
        const thanhToan = await model.ThanhToan.findByPk(IDThanhToan);
        if (!thanhToan) {
            return responseData(res, 404, "Thanh toán không tồn tại", null);
        }

        // Xóa thanh toán
        await thanhToan.destroy();
        
        return responseData(res, 200, "Xóa thanh toán thành công", null);
    } catch (error) {
        console.error("Lỗi khi xóa thanh toán:", error);
        return responseData(res, 500, "Lỗi khi xóa thanh toán", error);
    }
};

//lấy tất cả thanh toán
export const layTatCaThanhToan = async (req, res) => {
    try {
        // Lấy tất cả thanh toán
        const thanhToans = await model.ThanhToan.findAll({
            order: [['NgayThanhToan', 'DESC']]
        });

        if (!thanhToans || thanhToans.length === 0) {
            return responseData(res, 404, "Không có thanh toán nào", null);
        }

        // Trả về danh sách thanh toán
        return responseData(res, 200, "Lấy tất cả thanh toán thành công", thanhToans);
    } catch (error) {
        console.error("Lỗi khi lấy tất cả thanh toán:", error);
        return responseData(res, 500, "Lỗi khi lấy tất cả thanh toán", error);
    }
};

//lấy thanh toán theo id
export const layThanhToanTheoID = async (req, res) => {
    const { IDThanhToan } = req.params;

    try {
        // Tìm thanh toán theo ID
        const thanhToan = await model.ThanhToan.findByPk(IDThanhToan);
        if (!thanhToan) {
            return responseData(res, 404, "Thanh toán không tồn tại", null);
        }

        // Trả về chi tiết thanh toán
        return responseData(res, 200, "Lấy chi tiết thanh toán thành công", thanhToan);
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết thanh toán:", error);
        return responseData(res, 500, "Lỗi khi lấy chi tiết thanh toán", error);
    }
};


// thống kê thu nhập theo khóa học
export const thongKeThuNhapTheoKhoaHoc = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng đã thanh toán
        const donHangCuaNguoiDung = await model.DonHang.findAll({
            where: {
                TrangThai: 'da_thanh_toan',  // Lọc các đơn hàng đã thanh toán
            },
            include: [
                {
                    model: model.KhoaHoc,  // Liên kết với bảng KhoaHoc
                    as: 'IDKhoaHoc_KhoaHoc',
                    attributes: ['TenKhoaHoc', 'IDKhoaHoc'],  // Lấy tên và ID khóa học
                    required: true
                }
            ]
        });

        // Nếu không có đơn hàng nào, trả về lỗi
        if (!donHangCuaNguoiDung || donHangCuaNguoiDung.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào đã thanh toán' });
        }

        // Tính tổng thu nhập theo ID khóa học
        const thuNhapTheoKhoaHoc = donHangCuaNguoiDung.reduce((acc, donHang) => {
            const idKhoaHoc = donHang.IDKhoaHoc_KhoaHoc.IDKhoaHoc;
            const tenKhoaHoc = donHang.IDKhoaHoc_KhoaHoc.TenKhoaHoc;
            const tongTien = parseFloat(donHang.TongTien);  // Chuyển TongTien thành số

            // Kiểm tra nếu khóa học đã có trong accumulator (acc), nếu có thì cộng thêm, nếu không thì tạo mới
            if (acc[idKhoaHoc]) {
                acc[idKhoaHoc].TongThuNhap += tongTien;
            } else {
                acc[idKhoaHoc] = {
                    IDKhoaHoc: idKhoaHoc,
                    TenKhoaHoc: tenKhoaHoc,
                    TongThuNhap: tongTien
                };
            }

            return acc;
        }, {});

        // Chuyển kết quả từ object sang mảng để dễ dàng trả về dưới dạng JSON
        const result = Object.values(thuNhapTheoKhoaHoc);

        // Trả về kết quả thống kê thu nhập
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi máy chủ', error });
    }
};
