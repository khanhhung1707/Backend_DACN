import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// API chỉnh sửa thông tin cá nhân của người dùng (trừ mật khẩu và role)
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const { TenDangNhap, Email, HoTen, SDT, AnhDaiDien } = req.body;

        // Validate Email 
        if (Email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(Email)) {
                return responseData(res, 400, "Email không đúng định dạng", null);
            }
        }

        // Validate Vietnamese phone number 
        if (SDT) {
            const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})\b$/;
            if (!phoneRegex.test(SDT)) {
                return responseData(res, 400, "Số điện thoại phải đúng định dạng", null);
            }
        }

        const user = await model.NguoiDung.findByPk(id);
        if (!user) {
            return responseData(res, 404, "Người dùng không tồn tại", null);
        }

        // Prepare update data
        const updateData = {
            TenDangNhap: TenDangNhap || user.TenDangNhap,
            Email: Email || user.Email,
            HoTen: HoTen || user.HoTen,
            SDT: SDT || user.SDT,
            AnhDaiDien: AnhDaiDien || user.AnhDaiDien
        };

        if (Email && Email !== user.Email) {
            const existingUser = await model.NguoiDung.findOne({ where: { Email } });
            if (existingUser) {
                return responseData(res, 400, "Email đã được sử dụng bởi tài khoản khác", null);
            }
        }

        await user.update(updateData);

        return responseData(res, 200, "Cập nhật thông tin cá nhân thành công", user);
    } catch (error) {
        console.error("Error updating user profile:", error);
        return responseData(res, 500, "Lỗi khi cập nhật thông tin cá nhân", error.message);
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
      // Validate Email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
          return responseData(res, 400, "Email không đúng định dạng", null);
      }

      // Validate Vietnamese phone number format (10-11 digits, starting with 03, 05, 07, 08, 09)
      const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})\b$/;
      if (!phoneRegex.test(SDT)) {
          return responseData(res, 400, "Số điện thoại không đúng định dạng Việt Nam", null);
      }

      // Validate Password (must contain both letters and numbers, lowercase only)
      const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
      if (!passwordRegex.test(MatKhau)) {
          return responseData(res, 400, "Mật khẩu phải chứa cả chữ thường và số", null);
      }

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
    const { idNguoiDung } = req.params;
    const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;
  
    try {
        // Validate Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (Email && !emailRegex.test(Email)) {
            return responseData(res, 400, "Email không đúng định dạng", null);
        }
  
        // Validate Vietnamese phone number format
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})\b$/;
        if (SDT && !phoneRegex.test(SDT)) {
            return responseData(res, 400, "Số điện thoại phải đúng định dạng", null);
        }
  
        // Validate Password (only if provided)
        if (MatKhau) {
            const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
            if (!passwordRegex.test(MatKhau)) {
                return responseData(res, 400, "Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất 1 chữ thường và 1 số", null);
            }
        }
  
        const hocVien = await model.NguoiDung.findByPk(idNguoiDung);
  
        if (!hocVien || hocVien.Role !== 'hocvien') {
            return responseData(res, 404, "Người dùng không tồn tại hoặc không phải học viên");
        }
  
        const updateData = {
            TenDangNhap,
            Email,
            HoTen,
            GioiTinh,
            SDT,
            AnhDaiDien
        };
  
        // Only update password if provided
        if (MatKhau) {
            updateData.MatKhau = await bcrypt.hash(MatKhau, 10);
        }
  
        await hocVien.update(updateData);
  
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
        // Validate Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return responseData(res, 400, "Email không đúng định dạng", null);
        }

        // Validate Vietnamese phone number format (10-11 digits, starting with 03, 05, 07, 08, 09)
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})\b$/;
        if (!phoneRegex.test(SDT)) {
            return responseData(res, 400, "Số điện thoại không đúng định dạng Việt Nam", null);
        }

        // Validate Password (must contain both letters and numbers, lowercase only)
        const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
        if (!passwordRegex.test(MatKhau)) {
            return responseData(res, 400, "Mật khẩu phải chứa cả chữ thường và số", null);
        }

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
    const { idNguoiDung } = req.params;
    const { TenDangNhap, MatKhau, Email, HoTen, GioiTinh, SDT, AnhDaiDien } = req.body;

    try {
        // Validate Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (Email && !emailRegex.test(Email)) {
            return responseData(res, 400, "Email không đúng định dạng", null);
        }

        // Validate Vietnamese phone number format
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8,9})\b$/;
        if (SDT && !phoneRegex.test(SDT)) {
            return responseData(res, 400, "Số điện thoại phải đúng định dạng", null);
        }

        // Validate Password (only if provided)
        if (MatKhau) {
            const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
            if (!passwordRegex.test(MatKhau)) {
                return responseData(res, 400, "Mật khẩu phải có ít nhất 6 ký tự, chứa ít nhất 1 chữ thường và 1 số", null);
            }
        }

        const giangVien = await model.NguoiDung.findByPk(idNguoiDung);

        if (!giangVien || giangVien.Role !== 'giangvien') {
            return responseData(res, 404, "Người dùng không tồn tại hoặc không phải giảng viên");
        }

        const updateData = {
            TenDangNhap,
            Email,
            HoTen,
            GioiTinh,
            SDT,
            AnhDaiDien
        };

        // Only update password if provided
        if (MatKhau) {
            updateData.MatKhau = await bcrypt.hash(MatKhau, 10);
        }

        await giangVien.update(updateData);

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