import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// API chỉnh sửa thông tin cá nhân của người dùng (trừ mật khẩu và role)
export const updateUserProfile = async (req, res) => {
    try {
        // Lấy ID người dùng từ token đã xác thực (req.user được gán từ middleware isAuthenticated)
        const { id } = req.user;

        // Dữ liệu cần cập nhật từ body
        const { TenDangNhap, Email, HoTen, SDT, AnhDaiDien } = req.body;

        // Kiểm tra xem người dùng có tồn tại không
        const user = await model.NguoiDung.findByPk(id);
        if (!user) {
            return responseData(res, 404, "Người dùng không tồn tại", null);
        }

        // Cập nhật thông tin cá nhân (trừ mật khẩu)
        user.TenDangNhap = TenDangNhap || user.TenDangNhap;
        user.Email = Email || user.Email;
        user.HoTen = HoTen || user.HoTen;
        user.SDT = SDT || user.SDT;
        user.AnhDaiDien = AnhDaiDien || user.AnhDaiDien;

        // Lưu thông tin đã chỉnh sửa vào cơ sở dữ liệu
        await user.save();

        return responseData(res, 200, "Cập nhật thông tin cá nhân thành công", user);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi cập nhật thông tin cá nhân", error);
    }
};

// tìm kiếm tên giảng viên sẽ đề xuất khóa học của giảng viên đó
export const getKhoaHocByGiangVien = async (req, res) => {
    try {
      const { tenGiangVien } = req.query;
  
      // Tìm kiếm người dùng có role là "giangvien" và tên giảng viên khớp
      const giangVien = await model.NguoiDung.findOne({
        where: {
          HoTen: tenGiangVien,
          Role: 'giangvien'
        }
      });
  
      // Kiểm tra nếu giảng viên không tồn tại
      if (!giangVien) {
        return res.status(404).json({ message: 'Giảng viên không tồn tại' });
      }
  
      // Tìm khóa học do giảng viên đó tạo
      const khoaHocList = await model.KhoaHoc.findAll({
        where: {
          IDNguoiDung: giangVien.IDNguoiDung
        }
      });
  
      return res.json(khoaHocList);
    } catch (error) {
      return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
  };