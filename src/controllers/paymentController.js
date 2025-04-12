import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Tạo thanh toán
export const taoThanhToan = async (req, res) => {
    const userId = req.user.id;
    const { PhuongThucThanhToan, NoiDungThanhToan } = req.body;

    try {
        // Kiểm tra bắt buộc phải có phương thức thanh toán
        if (!PhuongThucThanhToan) {
            return responseData(res, 400, "Vui lòng chọn phương thức thanh toán", null);
        }

        // Lấy tất cả các đơn hàng pending của người dùng
        const donHangCuaNguoiDung = await model.DonHang.findAll({
            where: { 
                IDNguoiDung: userId, 
                TrangThai: 'pending',
                IDThanhToan: null // Chỉ lấy đơn hàng chưa được thanh toán
            },
            include: [{ model: model.KhoaHoc, as: 'IDKhoaHoc_KhoaHoc', attributes: ['IDKhoaHoc'] }]  
        });

        // Kiểm tra nếu không có đơn hàng nào
        if (!donHangCuaNguoiDung || donHangCuaNguoiDung.length === 0) {
            return responseData(res, 400, "Không có đơn hàng nào để thanh toán. Vui lòng tạo đơn hàng trước.", null);
        }

        // Kiểm tra nếu tổng tiền = 0 (trường hợp đặc biệt)
        const tongTien = donHangCuaNguoiDung.reduce((acc, donHang) => acc + parseFloat(donHang.TongTien), 0);
        if (tongTien <= 0) {
            return responseData(res, 400, "Tổng tiền thanh toán không hợp lệ", null);
        }

        // Tạo thanh toán
        const thanhToanMoi = await model.ThanhToan.create({
            NgayThanhToan: new Date(),
            PhuongThucThanhToan,
            NoiDungThanhToan,
            TongTien: tongTien,
            IDNguoiDung: userId
        });

        // Lưu thông tin thanh toán cho từng đơn hàng
        for (const donHang of donHangCuaNguoiDung) {
            const idKhoaHoc = donHang.KhoaHoc ? donHang.KhoaHoc.IDKhoaHoc : null; 

            await model.ThanhToan_DonHang.create({
                IDThanhToan: thanhToanMoi.IDThanhToan,
                IDDonHang: donHang.IDDonHang,
                IDKhoaHoc: idKhoaHoc 
            });

            await model.DonHang.update(
                { TrangThai: 'da_thanh_toan', IDThanhToan: thanhToanMoi.IDThanhToan },
                { where: { IDDonHang: donHang.IDDonHang } }
            );
        }

        return responseData(res, 200, "Thanh toán thành công", {
            thanhToan: thanhToanMoi,
            soDonHang: donHangCuaNguoiDung.length,
            tongTien: tongTien
        });
    } catch (error) {
        console.error("Lỗi khi tạo thanh toán:", error);
        return responseData(res, 500, "Lỗi hệ thống khi xử lý thanh toán", error.message);
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
