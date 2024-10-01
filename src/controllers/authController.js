import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import bcrypt from 'bcrypt';
import { responseData } from '../config/response.js';
import { createToken } from '../config/jwt.js';
import { sendEmail } from '../config/mail.js';

const model = initModels(sequelize);

// Đăng ký học viên
export const signUpHocVien = async (req, res) => {
    const { ho_ten, email, mat_khau, anh_dai_dien } = req.body;

    try {
        // Kiểm tra email đã tồn tại trong bảng HOCVIEN
        const existingUser = await model.HOCVIEN.findOne({ where: { email } });

        if (existingUser) {
            return responseData("", "Email đã tồn tại!", 409, res);
        }

        // Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(mat_khau, 10);

        // Tạo học viên mới
        const newUser = {
            email,
            mat_khau: hashedPassword,
            ten: ho_ten,
            anh_dai_dien
        };
        
        // Lưu học viên mới vào cơ sở dữ liệu và lấy bản ghi đã tạo
        const createdUser = await model.HOCVIEN.create(newUser); 

        // Tạo token cho người dùng mới, sử dụng ma_hoc_vien từ createdUser
        const token = createToken({ id: createdUser.ma_hoc_vien, email: createdUser.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: createdUser.ma_hoc_vien, // Lấy ma_hoc_vien từ đối tượng vừa tạo
                ho_ten: createdUser.ho_ten,
                email: createdUser.email
            }
        }, "Đăng ký thành công", 201, res);
    } catch (error) {
        console.error(error); // Ghi log chi tiết
        return responseData("", "Lỗi khi đăng ký", 500, res);
    }
};


// Đăng nhập học viên
export const loginHocVien = async (req, res) => {
    const { email, mat_khau } = req.body;

    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await model.HOCVIEN.findOne({ where: { email } });

        if (!user) {
            return responseData("", "Email không tồn tại!", 404, res);
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
        const isPasswordValid = bcrypt.compareSync(mat_khau, user.mat_khau);

        if (!isPasswordValid) {
            return responseData("", "Mật khẩu không chính xác!", 401, res);
        }

        // Tạo token cho người dùng
        const token = createToken({ id: user.ma_hoc_vien, email: user.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: user.ma_hoc_vien,
                ho_ten: user.ten, // Đảm bảo lấy tên từ trường ten
                email: user.email
            }
        }, "Đăng nhập thành công", 200, res);
    } catch (error) {
        console.error(error); // Ghi log chi tiết
        return responseData("", "Lỗi khi đăng nhập", 500, res);
    }
};
export const signUpGiangVien = async (req, res) => {
    const { ho_ten, email, mat_khau } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await model.GIANGVIEN.findOne({ where: { email } });

        if (existingUser) {
            return responseData("", "Email đã tồn tại!", 409, res);
        }

        // Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(mat_khau, 10);

        // Tạo giảng viên mới
        const newGiangVien = {
            email,
            mat_khau: hashedPassword,
            ten:ho_ten
        };

        await model.GIANGVIEN.create(newGiangVien);

        // Tạo token cho giảng viên mới
        const token = createToken({ id: newGiangVien.ma_giang_vien, email: newGiangVien.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: newGiangVien.ma_giang_vien,
                ho_ten: newGiangVien.ho_ten,
                email: newGiangVien.email
            }
        }, "Đăng ký giảng viên thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi đăng ký giảng viên", 500, res);
    }
};
export const loginGiangVien = async (req, res) => {
    const { email, mat_khau } = req.body;

    try {
        // Tìm giảng viên theo email
        const user = await model.GIANGVIEN.findOne({
            where: { email }
        });

        if (!user) {
            return responseData("", "Email không tồn tại!", 404, res);
        }

        // So sánh mật khẩu
        const isPasswordValid = bcrypt.compareSync(mat_khau, user.mat_khau);

        if (!isPasswordValid) {
            return responseData("", "Mật khẩu không chính xác!", 401, res);
        }

        // Tạo token cho giảng viên
        const token = createToken({ id: user.ma_giang_vien, email: user.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: user.ma_giang_vien,
                ho_ten: user.ten,
                email: user.email
            }
        }, "Đăng nhập giảng viên thành công", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi đăng nhập giảng viên", 500, res);
    }
};
// đăng ký admin 
export const signUpAdmin = async (req, res) => {
    const { ho_ten, email, mat_khau } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await model.ADMIN.findOne({ where: { email } });

        if (existingUser) {
            return responseData("", "Email đã tồn tại!", 409, res);
        }

        // Mã hóa mật khẩu
        const hashedPassword = bcrypt.hashSync(mat_khau, 10);

        // Tạo giảng viên mới
        const newAdmin = {
            email,
            mat_khau: hashedPassword,
            ten:ho_ten
        };

        await model.ADMIN.create(newAdmin);

        // Tạo token cho giảng viên mới
        const token = createToken({ id: newAdmin.ma_admin, email: newAdmin.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: newAdmin.ma_admin,
                ho_ten: newAdmin.ten,
                email: newAdmin.email
            }
        }, "Đăng ký admin thành công", 201, res);
    } catch (error) {
        return responseData("", "Lỗi khi đăng ký admin", 500, res);
    }
};
// Đăng nhập Admin
export const loginAdmin = async (req, res) => {
    const { email, mat_khau } = req.body;

    try {
        // Tìm admin theo email
        const user = await model.ADMIN.findOne({ where: { email } });

        if (!user) {
            return responseData("", "Email không tồn tại!", 404, res);
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
        const isPasswordValid = bcrypt.compareSync(mat_khau, user.mat_khau);

        if (!isPasswordValid) {
            return responseData("", "Mật khẩu không chính xác!", 401, res);
        }

        // Tạo token cho admin
        const token = createToken({ id: user.ma_admin, email: user.email });

        // Trả về phản hồi với token
        return responseData({
            token,
            user: {
                id: user.ma_admin,
                ho_ten: user.ten,
                email: user.email
            }
        }, "Đăng nhập admin thành công", 200, res);
    } catch (error) {
        console.error(error); // Ghi log chi tiết
        return responseData("", "Lỗi khi đăng nhập admin", 500, res);
    }
};

//quên mật khẩu
export const forgotPassword = async (req, res) => {
    const { email, role } = req.body;

    try {
        // Kiểm tra xem email có tồn tại trong HOCVIEN hoặc GIANGVIEN không
        let user;
        if (role === 'hoc_vien') {
            user = await model.HOCVIEN.findOne({ where: { email } });
        } else if (role === 'giang_vien') {
            user = await model.GIANGVIEN.findOne({ where: { email } });
        }

        if (!user) {
            return responseData("", "Email không tồn tại!", 404, res);
        }

        // Tạo mật khẩu mới ngẫu nhiên
        const newPassword = Math.random().toString(36).slice(-8); // Mật khẩu ngẫu nhiên 8 ký tự

        // Mã hóa mật khẩu mới
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        // Cập nhật mật khẩu mới vào cơ sở dữ liệu
        if (role === 'hoc_vien') {
            await model.HOCVIEN.update({ mat_khau: hashedNewPassword }, { where: { email } });
        } else {
            await model.GIANGVIEN.update({ mat_khau: hashedNewPassword }, { where: { email } });
        }

        // Gửi email với mật khẩu mới
        await sendEmail(email, 'Yêu cầu đặt lại mật khẩu', `Mật khẩu mới của bạn là: ${newPassword}`);

        return responseData("", "Mật khẩu mới đã được gửi qua email!", 200, res);
    } catch (error) {
        return responseData("", "Lỗi khi thực hiện yêu cầu quên mật khẩu", 500, res);
    }
};