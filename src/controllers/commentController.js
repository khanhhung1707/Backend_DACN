import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

//Lấy tất cả bình luận
export const getAllComments = async (req, res) => {
    try {
        // Lấy danh sách bình luận từ cơ sở dữ liệu
        const comments = await model.BinhLuan.findAll();

        // Kiểm tra nếu không có bình luận nào
        if (!comments || comments.length === 0) {
            return responseData(res, 404, "Không tìm thấy bình luận nào", null);
        }

        return responseData(res, 200, "Lấy danh sách bình luận thành công", comments);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy danh sách bình luận", error);
    }
};

export const getCommentsByCourseId = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID khóa học từ params

        // Tìm bình luận theo ID khóa học
        const comments = await model.BinhLuan.findAll({
            where: {
                IDKhoaHoc: id
            },
            include: [
                {
                    model: model.NguoiDung,
                    as: 'IDNguoiDung_NguoiDung', 
                    attributes: ['IDNguoiDung', 'HoTen'] 
                }
            ]
        });

        // Kiểm tra nếu không có bình luận
        if (!comments.length) {
            return responseData(res, 404, "Không tìm thấy bình luận cho khóa học này", null);
        }

        // Trả về danh sách bình luận
        return responseData(res, 200, "Lấy bình luận thành công", comments);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy bình luận", error);
    }
};

