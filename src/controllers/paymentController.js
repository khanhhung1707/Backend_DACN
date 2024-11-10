import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Tạo thanh toán
// export const taoThanhToan = async (req, res) => {
//     const userId = req.user.id; // Lấy IDNguoiDung từ token đã xác thực
//     const { PhuongThucThanhToan, NoiDungThanhToan } = req.body;

//     try {
//         // Lấy tất cả các đơn hàng của người dùng và tính tổng tiền
//         const donHangCuaNguoiDung = await model.DonHang.findAll({
//             where: { IDNguoiDung: userId }
//         });

//         if (!donHangCuaNguoiDung || donHangCuaNguoiDung.length === 0) {
//             return responseData(res, 404, "Không có đơn hàng nào cho người dùng này", null);
//         }

//         // Tính tổng tiền từ các đơn hàng của người dùng
//         const tongTien = donHangCuaNguoiDung.reduce((acc, donHang) => acc + parseFloat(donHang.TongTien), 0);

//         // Tạo bản ghi mới trong bảng ThanhToan
//         const thanhToanMoi = await model.ThanhToan.create({
//             NgayThanhToan: new Date(),
//             PhuongThucThanhToan,
//             NoiDungThanhToan,
//             TongTien: tongTien
//         });

//         return responseData(res, 200, "Tạo thanh toán thành công", thanhToanMoi);
//     } catch (error) {
//         console.error("Lỗi khi tạo thanh toán:", error);
//         return responseData(res, 500, "Lỗi khi tạo thanh toán", error);
//     }
// };

// Lấy tất cả các thanh toán của người dùng hiện tại
// export const layThanhToanNguoiDung = async (req, res) => {
//     const IDNguoiDung = req.user.id; // Lấy IDNguoiDung từ token đã xác thực

//     try {
//         // Lấy danh sách thanh toán của người dùng
//         const thanhToans = await model.ThanhToan.findAll({
//             where: { IDNguoiDung: IDNguoiDung },
//             order: [['NgayThanhToan', 'DESC']] // Sắp xếp theo ngày thanh toán mới nhất trước
//         });

//         if (!thanhToans || thanhToans.length === 0) {
//             return responseData(res, 404, "Không có thanh toán nào", null);
//         }

//         // Trả về danh sách thanh toán
//         return responseData(res, 200, "Lấy danh sách thanh toán thành công", thanhToans);
//     } catch (error) {
//         console.error("Lỗi khi lấy danh sách thanh toán:", error);
//         return responseData(res, 500, "Lỗi khi lấy danh sách thanh toán", error);
//     }
// };

// Cập nhật trạng thái thanh toán
// export const capNhatTrangThaiThanhToan = async (req, res) => {
//     const { IDThanhToan } = req.params;
//     const { TrangThai } = req.body; // Trạng thái thanh toán mới

//     try {
//         // Kiểm tra thanh toán có tồn tại không
//         const thanhToan = await model.ThanhToan.findByPk(IDThanhToan);
//         if (!thanhToan) {
//             return responseData(res, 404, "Thanh toán không tồn tại", null);
//         }

//         // Cập nhật trạng thái thanh toán
//         await thanhToan.update({
//             TrangThai: TrangThai
//         });

//         return responseData(res, 200, "Cập nhật trạng thái thanh toán thành công", thanhToan);
//     } catch (error) {
//         console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
//         return responseData(res, 500, "Lỗi khi cập nhật trạng thái thanh toán", error);
//     }
// };