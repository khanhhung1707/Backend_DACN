import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

export const chanNguoiDung = async (req, res) => {
  const idNguoiDung = req.params.id;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const nguoiDung = await model.NguoiDung.findOne({
      where: { IDNguoiDung: idNguoiDung }
    });

    if (!nguoiDung) {
      return responseData(res, 404, "Người dùng không tồn tại", null);
    }

    // Chuyển thông tin người dùng sang bảng NguoiDungChan
    await model.NguoiDungChan.create({
      IDNguoiDung: nguoiDung.IDNguoiDung,
      TenDangNhap: nguoiDung.TenDangNhap,
      MatKhau: nguoiDung.MatKhau,
      Email: nguoiDung.Email,
      HoTen: nguoiDung.HoTen,
      SDT: nguoiDung.SDT,
      Role: 'ban', 
      GioiTinh: nguoiDung.GioiTinh
    });

    // Cập nhật trạng thái người dùng trong bảng NguoiDung để đánh dấu là bị chặn
    await model.NguoiDung.update(
      { Status: 'blocked' }, // Hoặc trường khác mà bạn muốn dùng để đánh dấu
      { where: { IDNguoiDung: idNguoiDung } }
    );

    return responseData(res, 200, "Người dùng đã được chặn thành công", null);
  } catch (error) {
    console.error("Lỗi khi chặn người dùng:", error);
    return responseData(res, 500, "Lỗi khi chặn người dùng", error);
  }
};


//xem danh sách tất cả người dùng bị chặn
export const xemDanhSachNguoiDungChan = async (req, res) => {
    try {
      // Lấy danh sách tất cả người dùng từ bảng NguoiDungChan
      const danhSachNguoiDungChan = await model.NguoiDungChan.findAll();
  
      if (!danhSachNguoiDungChan || danhSachNguoiDungChan.length === 0) {
        return responseData(res, 404, "Không có người dùng bị chặn nào.", null);
      }
  
      return responseData(res, 200, "Danh sách người dùng bị chặn", danhSachNguoiDungChan);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng bị chặn:", error);
      return responseData(res, 500, "Lỗi khi lấy danh sách người dùng bị chặn", error);
    }
};