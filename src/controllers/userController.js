import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

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

// Lấy danh sách người dùng có role là hocvien
export const getNguoiDungHocVien = async (req, res) => {
  try {
      const hocVienList = await model.NguoiDung.findAll({
          where: { Role: 'hocvien' }
      });

      return responseData(res, 200, "Danh sách học viên", hocVienList);
  } catch (error) {
      console.error("Error fetching hoc vien list:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
  }
};

// Thêm người dùng mới có role là hocvien
export const themNguoiDungHocVien = async (req, res) => {
  const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;

  try {
      const existingUser = await model.NguoiDung.findOne({ where: { Email } });
      if (existingUser) {
          return responseData(res, 400, "Email đã tồn tại", null);
      }

      const hashedPassword = await bcrypt.hash(MatKhau, 10); // Mã hóa mật khẩu
      const newHocVien = await model.NguoiDung.create({
          TenDangNhap,
          MatKhau: hashedPassword,
          Email,
          HoTen,
          GioiTinh,
          SDT,
          Role: 'hocvien',
          AnhDaiDien
      });

      return responseData(res, 201, "Học viên đã được thêm thành công", newHocVien);
  } catch (error) {
      console.error("Error adding hoc vien:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
  }
};

// Sửa thông tin người dùng có role là hocvien theo IDNguoiDung
export const suaNguoiDungHocVien = async (req, res) => {
  const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params
  const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;

  try {
      const hocVien = await model.NguoiDung.findByPk(idNguoiDung);

      if (!hocVien || hocVien.Role !== 'hocvien') {
          return responseData(res, 404, "Người dùng không tồn tại hoặc không phải học viên");
      }

      const hashedPassword = await bcrypt.hash(MatKhau, 10); // Mã hóa mật khẩu
      await hocVien.update({
          TenDangNhap,
          MatKhau: hashedPassword,
          Email,
          HoTen,
          GioiTinh,
          SDT,
          AnhDaiDien
      });

      return responseData(res, 200, "Thông tin học viên đã được cập nhật", hocVien);
  } catch (error) {
      console.error("Error updating hoc vien:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
  }
};

// Xóa thông tin người dùng có role là hocvien theo IDNguoiDung
export const xoaNguoiDungHocVien = async (req, res) => {
  const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params

  try {
      const hocVien = await model.NguoiDung.findByPk(idNguoiDung);

      if (!hocVien || hocVien.Role !== 'hocvien') {
          return responseData(res, 404, "Người dùng không tồn tại hoặc không phải học viên");
      }

      await hocVien.destroy();

      return responseData(res, 200, "Học viên đã được xóa thành công");
  } catch (error) {
      console.error("Error deleting hoc vien:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
  }
};

// Xem chi tiết thông tin người dùng có role là hocvien theo IDNguoiDung
export const getChiTietNguoiDungHocVien = async (req, res) => {
  const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params

  try {
      const hocVien = await model.NguoiDung.findByPk(idNguoiDung);

      if (!hocVien || hocVien.Role !== 'hocvien') {
          return responseData(res, 404, "Người dùng không tồn tại hoặc không phải học viên");
      }

      return responseData(res, 200, "Chi tiết học viên", hocVien);
  } catch (error) {
      console.error("Error fetching hoc vien details:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
  }
};

// cấp quyền giangvien cho hocvien
export const capNhatRoleHocVien = async (req, res) => {
    const { id } = req.params; // Lấy id từ params
    const { newRole } = req.body; // Lấy role mới từ body
  
    console.log("Đang thực hiện cập nhật role cho ID:", id); // Log ID
    console.log("Giá trị role mới:", newRole); // Log role mới
  
    try {
      // Kiểm tra nếu role mới không hợp lệ
      if (newRole !== 'giangvien') {
        return responseData(res, 400, "Role không hợp lệ. Chỉ có thể thay đổi thành giảng viên.", null);
      }
  
      // Cập nhật role trong cơ sở dữ liệu
      const hocVien = await model.NguoiDung.update(
        { Role: newRole },
        { where: { IDNguoiDung: id } } // Sử dụng ID để tìm học viên
      );
  
      if (!hocVien[0]) { // Kiểm tra nếu không có bản ghi nào được cập nhật
        return responseData(res, 404, "Không tìm thấy học viên để cập nhật role.", null);
      }
  
      return responseData(res, 200, "Cập nhật role thành công.", null);
    } catch (error) {
      console.error("Lỗi khi cập nhật role:", error);
      return responseData(res, 500, "Lỗi khi cập nhật role", error);
    }
  };  

// lấy danh sách tất cả người dùng có role là giangvien
export const getNguoiDungGiangVien = async (req, res) => {
  try {
    const giangVienList = await model.NguoiDung.findAll({
        where: { Role: 'giangvien' }
    });

    return responseData(res, 200, "Danh sách giảng viên", giangVienList);
} catch (error) {
    console.error("Error fetching hoc vien list:", error);
    return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
}
};
  
  

//thêm người dùng mới có role là giangvien
export const themNguoiDungGiangVien = async (req, res) => {
    const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;
  
    try {
        const existingUser = await model.NguoiDung.findOne({ where: { Email } });
        if (existingUser) {
            return responseData(res, 400, "Email đã tồn tại", null);
        }
  
        const hashedPassword = await bcrypt.hash(MatKhau, 10); // Mã hóa mật khẩu
        const newGiangVien = await model.NguoiDung.create({
            TenDangNhap,
            MatKhau: hashedPassword,
            Email,
            HoTen,
            GioiTinh,
            SDT,
            Role: 'giangvien',
            AnhDaiDien
        });
  
        return responseData(res, 201, "Giảng viên đã được thêm thành công", newGiangVien);
    } catch (error) {
        console.error("Error adding giang vien:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
  };

//sửa thông tin người dùng có role là giangvien
export const suaNguoiDungGiangVien = async (req, res) => {
    const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params
    const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;
  
    try {
        const giangVien = await model.NguoiDung.findByPk(idNguoiDung);
  
        if (!giangVien || giangVien.Role !== 'giangvien') {
            return responseData(res, 404, "Người dùng không tồn tại hoặc không phải giảng viên");
        }
  
        const hashedPassword = await bcrypt.hash(MatKhau, 10); // Mã hóa mật khẩu
        await giangVien.update({
            TenDangNhap,
            MatKhau: hashedPassword,
            Email,
            HoTen,
            GioiTinh,
            SDT,
            AnhDaiDien
        });
  
        return responseData(res, 200, "Thông tin giảng viên đã được cập nhật", giangVien);
    } catch (error) {
        console.error("Error updating giang vien:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
  };

//xóa thông tin người dùng có role là giangvien
export const xoaNguoiDungGiangVien = async (req, res) => {
    const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params
  
    try {
        const giangVien = await model.NguoiDung.findByPk(idNguoiDung);
  
        if (!giangVien || giangVien.Role !== 'giangvien') {
            return responseData(res, 404, "Người dùng không tồn tại hoặc không phải giảng viên");
        }
  
        await giangVien.destroy();
  
        return responseData(res, 200, "Giảng viên đã được xóa thành công");
    } catch (error) {
        console.error("Error deleting giang vien:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
  };

// xem chi tiết thông tin người dùng có role là giangvien
export const getChiTietNguoiDungGiangVien = async (req, res) => {
    const { idNguoiDung } = req.params; // Lấy IDNguoiDung từ params
  
    try {
        const giangVien = await model.NguoiDung.findByPk(idNguoiDung);
  
        if (!giangVien || giangVien.Role !== 'giangvien') {
            return responseData(res, 404, "Người dùng không tồn tại hoặc không phải giảng viên");
        }
  
        return responseData(res, 200, "Chi tiết giảng viên", giangVien);
    } catch (error) {
        console.error("Error fetching giang vien details:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
  };
  

// lấy danh sách tất cả người dùng có role là giangvien
export const getNguoiDungAdmin = async (req, res) => {
  try {
    const adminList = await model.NguoiDung.findAll({
        where: { Role: 'admin' }
    });

    return responseData(res, 200, "Danh sách giảng viên", adminList);
} catch (error) {
    console.error("Error fetching hoc vien list:", error);
    return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
}
};