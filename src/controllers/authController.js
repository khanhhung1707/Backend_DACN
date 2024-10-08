import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import bcrypt from 'bcrypt';
import { responseData } from '../config/response.js';
import { createToken } from '../config/jwt.js';
import { sendEmail } from '../config/mail.js';

const model = initModels(sequelize);

//Đăng ký
export const signUp = async (req, res) => {
    const { TenDangNhap, Email, MatKhau, HoTen, SDT, Role, AnhDaiDien } = req.body;

    try {
        const existingUser = await model.NguoiDung.findOne({ where: { Email } });
        if (existingUser) {
            return responseData(res, 400, "Email đã tồn tại", null);
        }

        const hashedPassword = await bcrypt.hash(MatKhau, 10);
        const newUser = await model.NguoiDung.create({
            TenDangNhap,
            Email,
            MatKhau: hashedPassword,
            HoTen,
            SDT,
            Role,
            AnhDaiDien,
        });

        const token = createToken(newUser.IDNguoiDung);
        return responseData(res, 201, "Đăng ký thành công", { token, user: newUser });
    } catch (error) {
        return responseData(res, 500, "Lỗi khi đăng ký", error);
    }
};

//Đăng nhập
export const signIn = async (req, res) => {
    const { Email, MatKhau } = req.body;

    // Kiểm tra xem có email và mật khẩu được cung cấp hay không
    if (!Email || !MatKhau) {
        return responseData(res, 400, "Email và mật khẩu là bắt buộc");
    }

    try {
        // Tìm người dùng theo email
        const user = await model.NguoiDung.findOne({ where: { Email } });

        if (!user) {
            return responseData(res, 404, "Người dùng không tồn tại");
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
        if (!isMatch) {
            return responseData(res, 401, "Mật khẩu không chính xác");
        }

        // Tạo token với toàn bộ thông tin người dùng
        const token = createToken(user.toJSON()); // Chuyển đối tượng user thành JSON để lấy các thuộc tính

        // Trả về thông tin người dùng (bao gồm cả AnhDaiDien)
        return responseData(res, 200, "Đăng nhập thành công", { token, user: { ...user.toJSON(), MatKhau: undefined } });
    } catch (error) {
        return responseData(res, 500, "Lỗi khi đăng nhập", error);
    }
};
