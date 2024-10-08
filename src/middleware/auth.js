import { responseData } from '../config/response.js';
import { verifyToken } from '../config/jwt.js';

// Middleware kiểm tra xem người dùng có phải admin không
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return responseData(res, 403, "Không tìm thấy thông tin người dùng", null);
  }

  if (!req.user.role) {
    return responseData(res, 403, "Không tìm thấy quyền truy cập của người dùng", null);
  }

  const { role } = req.user;

  if (role !== 'admin') {
    return responseData(res, 403, "Bạn không có quyền truy cập", null);
  }

  next();  // Nếu role là admin, tiếp tục thực hiện request
};

// Middleware kiểm tra người dùng đã đăng nhập
export const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('Token from request:', token);
    if (!token) {
        console.log('Token is missing');
        return responseData(res, 401, "Chưa đăng nhập", null);
    }

    try {
        const decoded = verifyToken(token);  
        console.log('Decoded token:', decoded);
        if (!decoded || !decoded.data || !decoded.data.role) {
            console.log('Decoded data is missing or role is undefined');
            return responseData(res, 401, "Token không hợp lệ", null);
        }

        console.log('Decoded user data:', decoded.data);
        req.user = decoded.data;

        next();
    } catch (error) {
        console.log('Token verification error:', error.message);
        return responseData(res, 401, "Token không hợp lệ", null);
    }
};

