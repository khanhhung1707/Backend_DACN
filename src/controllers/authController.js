import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { responseData } from "../config/response.js";
import { createToken } from "../config/jwt.js";
import { sendEmail } from "../config/mail.js";
import crypto from "crypto";

import { OAuth2Client } from "google-auth-library";

const model = initModels(sequelize);
const client = new OAuth2Client(
  "570267955759-aclm1247o0pncpdj9nihpev3q55odurh.apps.googleusercontent.com"
);

export const googleLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return responseData(res, 400, "Token không được cung cấp");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "570267955759-aclm1247o0pncpdj9nihpev3q55odurh.apps.googleusercontent.com", // Thay 570267955759-aclm1247o0pncpdj9nihpev3q55odurh.apps.googleusercontent.com bằng client ID của bạn
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await model.NguoiDung.findOne({ where: { Email: email } });

    if (!user) {
      return responseData(
        res,
        404,
        "Người dùng chưa đăng ký. Vui lòng sử dụng đăng ký Google."
      );
    }

    // Tạo JWT Token
    const jwtToken = createToken(user.toJSON());

    // Trả về thông tin người dùng
    return responseData(res, 200, "Đăng nhập thành công", {
      token: jwtToken,
      user: { ...user.toJSON(), MatKhau: undefined },
    });
  } catch (error) {
    console.log(error);
    return responseData(res, 500, "Lỗi xác minh Google Token", error);
  }
};

// Google Register
export const googleRegister = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return responseData(res, 400, "Token không được cung cấp");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "570267955759-aclm1247o0pncpdj9nihpev3q55odurh.apps.googleusercontent.com", // Thay 570267955759-aclm1247o0pncpdj9nihpev3q55odurh.apps.googleusercontent.com bằng client ID của bạn
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await model.NguoiDung.findOne({ where: { Email: email } });

    if (user) {
      return responseData(
        res,
        400,
        "Người dùng đã tồn tại. Vui lòng đăng nhập."
      );
    }

    // Tạo người dùng mới
    const newUser = await model.NguoiDung.create({
      TenDangNhap: name || `user_${sub}`,
      Email: email,
      MatKhau: await bcrypt.hash(sub, 10), // Mã hóa sub làm mật khẩu
      HoTen: name,
      SDT: "",
      Role: "hocvien",
      AnhDaiDien: picture || "", // URL hình đại diện từ Google
      GioiTinh: "nam", // Không xác định từ Google
    });

    // Tạo JWT Token
    const jwtToken = createToken(newUser.IDNguoiDung);

    // Trả về thông tin người dùng
    return responseData(res, 201, "Đăng ký Google thành công", {
      token: jwtToken,
      user: { ...newUser.toJSON(), MatKhau: undefined },
    });
  } catch (error) {
    return responseData(res, 500, "Lỗi xác minh Google Token", error);
  }
};
//Đăng ký
export const signUp = async (req, res) => {
  const {
    TenDangNhap,
    Email,
    MatKhau,
    HoTen,
    SDT,
    Role,
    AnhDaiDien,
    GioiTinh,
  } = req.body;

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
      Role: "hocvien",
      GioiTinh,
      AnhDaiDien,
    });

    const token = createToken(newUser.IDNguoiDung);
    return responseData(res, 201, "Đăng ký thành công", {
      token,
      user: newUser,
    });
  } catch (error) {
    return responseData(res, 500, "Lỗi khi đăng ký", error);
  }
};

//Đăng nhập
export const signIn = async (req, res) => {
  const { Email, MatKhau } = req.body;

  if (!Email || !MatKhau) {
    return responseData(res, 400, "Email và mật khẩu là bắt buộc");
  }

  try {
    const user = await model.NguoiDung.findOne({ where: { Email } });

    if (!user) {
      return responseData(res, 404, "Người dùng không tồn tại");
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(MatKhau, user.MatKhau);
    if (!isMatch) {
      return responseData(res, 401, "Mật khẩu không chính xác");
    }

    const token = createToken(user.toJSON()); // Chuyển đối tượng user thành JSON để lấy các thuộc tính

    // Trả về thông tin người dùng
    return responseData(res, 200, "Đăng nhập thành công", {
      token,
      user: { ...user.toJSON(), MatKhau: undefined },
    });
  } catch (error) {
    return responseData(res, 500, "Lỗi khi đăng nhập", error);
  }
};

// Tạo mật khẩu ngẫu nhiên
const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

// API quên mật khẩu
export const forgotPassword = async (req, res) => {
  const { Email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại trong hệ thống không
    const user = await model.NguoiDung.findOne({ where: { Email } });

    if (!user) {
      return responseData(res, 404, "Người dùng không tồn tại với email này");
    }

    // Tạo mật khẩu mới
    const newPassword = generateRandomPassword();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    await model.NguoiDung.update(
      { MatKhau: hashedPassword },
      { where: { Email } }
    );

    // Gửi mật khẩu mới qua email
    const subject = "Đặt lại mật khẩu";
    const text = `Mật khẩu mới của bạn là: ${newPassword}`;
    await sendEmail(Email, subject, text);

    // Trả về thông báo thành công
    return responseData(res, 200, "Mật khẩu mới đã được gửi qua email của bạn");
  } catch (error) {
    return responseData(res, 500, "Lỗi máy chủ", error);
  }
};

// Đổi mật khẩu (reset password)
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await model.NguoiDung.findByPk(req.user.id);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return responseData(res, 404, "Người dùng không tồn tại", null);
    }

    // So sánh mật khẩu cũ nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(oldPassword, user.MatKhau);
    if (!isMatch) {
      return responseData(res, 401, "Mật khẩu cũ không chính xác", null);
    }

    // Nếu mật khẩu cũ đúng, mã hóa mật khẩu mới và lưu vào cơ sở dữ liệu
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.MatKhau = hashedNewPassword;
    await user.save();

    return responseData(res, 200, "Đã thay đổi mật khẩu thành công", null);
  } catch (error) {
    return responseData(res, 500, "Có lỗi xảy ra", null);
  }
};
