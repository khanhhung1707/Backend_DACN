import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';
import { sendEmail } from "../config/mail.js";

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

//lấy bình luận theo ID Khóa học
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

// Hàm gửi email thông báo đến giảng viên hoặc học viên khi có bình luận hoặc phản hồi
export const sendNotificationToCommenters = async (commenterId, replyToId, commentType) => {
    try {
        // Lấy thông tin người bình luận và người nhận thông báo từ bảng NguoiDung
        const commenter = await model.NguoiDung.findByPk(commenterId);
        const replyToUser = await model.NguoiDung.findByPk(replyToId);

        if (!commenter || !replyToUser) {
            return { status: 404, message: "Người dùng không tồn tại" };
        }

        const { HoTen: HoTenNguoiBinhLuan, Email: EmailNguoiBinhLuan } = commenter.dataValues;
        const { HoTen: HoTenNguoiNhanThongBao, Email: EmailNguoiNhanThongBao } = replyToUser.dataValues;

        // Tạo chủ đề và nội dung thông báo tùy theo loại bình luận hoặc phản hồi
        let subject, text;
        if (commentType === 'comment') {
            subject = "Thông báo về bình luận khóa học";
            text = `${HoTenNguoiBinhLuan} đã bình luận về khóa học của bạn. Hãy vào xem ngay!`;
        } else if (commentType === 'reply') {
            subject = "Thông báo phản hồi bình luận";
            text = `${HoTenNguoiBinhLuan} đã trả lời bình luận của bạn về khóa học. Hãy vào xem ngay!`;
        }

        // Gửi email thông báo
        await sendEmail(EmailNguoiNhanThongBao, subject, text);

        return { status: 200, message: `Thông báo đã được gửi tới ${HoTenNguoiNhanThongBao}` };

    } catch (error) {
        console.error("Lỗi gửi thông báo:", error);
        return { status: 500, message: "Lỗi gửi thông báo" };
    }
};

// Gửi bình luận theo ID khóa học
export const postCommentByCourseId = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID khóa học từ params
        const { NoiDung } = req.body; // Lấy nội dung bình luận từ body của request

        // Lấy ID người dùng từ token đã được giải mã trong middleware isAuthenticated
        const IDNguoiDung = req.user.id;

        // Kiểm tra xem nội dung bình luận có tồn tại hay không
        if (!NoiDung) {
            return responseData(res, 400, "Thiếu nội dung bình luận", null);
        }

        // Tạo bình luận mới trong cơ sở dữ liệu
        const newComment = await model.BinhLuan.create({
            IDKhoaHoc: id,          
            IDNguoiDung: IDNguoiDung, 
            NoiDung: NoiDung,       
            ThoiGian: new Date(),  
        });

        // Sau khi tạo bình luận thành công, gửi thông báo cho giảng viên (người tạo khóa học)
        const khoaHoc = await model.KhoaHoc.findOne({ where: { IDKhoaHoc: id } });
        if (khoaHoc) {
            const { IDNguoiDung: giangVienId } = khoaHoc; // Lấy ID giảng viên tạo khóa học
            await sendNotificationToCommenters(IDNguoiDung, giangVienId, 'comment', res); // Gửi thông báo cho giảng viên
        }

        // Trả về kết quả sau khi tạo thành công
        return responseData(res, 201, "Gửi bình luận thành công", newComment);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi gửi bình luận", error);
    }
};

// reply comment 
export const postReplyToComment = async (req, res) => {
    try {
        const { commentId } = req.params; // Sử dụng commentId từ params
        const { NoiDung } = req.body;

        const IDNguoiDung = req.user.id;

        if (!NoiDung) {
            return responseData(res, 400, "Thiếu nội dung phản hồi", null);
        }

        const originalComment = await model.BinhLuan.findByPk(Number(commentId)); // Đảm bảo commentId là kiểu số
        if (!originalComment) {
            return responseData(res, 404, "Bình luận không tồn tại", null);
        }

        const newReply = await model.ReplyBinhLuan.create({
            IDBinhLuan: commentId,
            IDNguoiDung: IDNguoiDung,
            NoiDung: NoiDung,
            ThoiGian: new Date(),
            IDKhoaHoc: originalComment.IDKhoaHoc
        });

        await sendNotificationToCommenters(IDNguoiDung, originalComment.IDNguoiDung, 'reply', res);

        return responseData(res, 201, "Gửi phản hồi thành công", newReply);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi gửi phản hồi", error);
    }
};

