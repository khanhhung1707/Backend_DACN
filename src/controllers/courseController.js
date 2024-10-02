import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

export const getCourses = async (req, res) => {
    try {
        // Lấy danh sách khóa học cùng với thông tin giảng viên và danh mục
        const courses = await model.KHOAHOC.findAll({
            include: [
                {
                    model: model.GIANGVIEN, // Mối quan hệ với giảng viên
                    attributes: ['ten'], // Chỉ lấy tên giảng viên
                    as: 'ma_giang_vien_GIANGVIEN'
                },
                {
                    model: model.DANHMUC, // Mối quan hệ với danh mục
                    attributes: ['ten_danh_muc'], // Chỉ lấy tên danh mục
                    as: 'ma_danh_muc_DANHMUC'
                }
            ]
        });

        if (!courses.length) {
            return responseData("", "Không tìm thấy khóa học", 404, res);
        }

        // Trả về phản hồi với thông tin khóa học
        return responseData(courses, "Lấy danh sách khóa học thành công", 200, res);
    } catch (error) {
        console.error(error); // In ra lỗi để kiểm tra
        return responseData("", "Lỗi khi lấy danh sách khóa học", 500, res);
    }
};
// Lấy danh sách khóa học hot (top 5 khóa học có nhận xét tích cực nhiều nhất)
export const getHotCourses = async (req, res) => {
    try {
        const hotCourses = await sequelize.query(`
            SELECT 
                KHOAHOC.ma_khoa_hoc,
                KHOAHOC.ten_khoa_hoc,
                COUNT(NHANXET.ma_nhan_xet) AS tong_nhan_xet_tich_cuc
            FROM 
                KHOAHOC
            LEFT JOIN 
                NHANXET ON KHOAHOC.ma_khoa_hoc = NHANXET.ma_khoa_hoc
            WHERE 
                NHANXET.xep_hang = 'tích cực'
            GROUP BY 
                KHOAHOC.ma_khoa_hoc, KHOAHOC.ten_khoa_hoc
            ORDER BY 
                tong_nhan_xet_tich_cuc DESC
            LIMIT 5;
        `, { type: sequelize.QueryTypes.SELECT });

        if (!hotCourses.length) {
            return responseData("", "Không tìm thấy khóa học hot", 404, res);
        }

        // Trả về phản hồi với danh sách khóa học hot
        return responseData(hotCourses, "Lấy danh sách khóa học hot thành công", 200, res);
    } catch (error) {
        console.error(error); // In ra lỗi để kiểm tra
        return responseData("", "Lỗi khi lấy danh sách khóa học hot", 500, res);
    }
};
// Lấy danh sách khóa học xu hướng (top 6 đến 10 khóa học có nhận xét tích cực)
export const getTrendingCourses = async (req, res) => {
    try {
        const trendingCourses = await sequelize.query(`
            SELECT 
                ma_khoa_hoc, 
                ten_khoa_hoc, 
                tong_nhan_xet_tich_cuc
            FROM (
                SELECT 
                    KHOAHOC.ma_khoa_hoc,
                    KHOAHOC.ten_khoa_hoc,
                    COUNT(NHANXET.ma_nhan_xet) AS tong_nhan_xet_tich_cuc,
                    ROW_NUMBER() OVER (ORDER BY COUNT(NHANXET.ma_nhan_xet) DESC) AS xep_hang
                FROM 
                    KHOAHOC
                LEFT JOIN 
                    NHANXET ON KHOAHOC.ma_khoa_hoc = NHANXET.ma_khoa_hoc
                WHERE 
                    NHANXET.xep_hang = 'tích cực'
                GROUP BY 
                    KHOAHOC.ma_khoa_hoc, KHOAHOC.ten_khoa_hoc
            ) AS top_khoa_hoc
            WHERE xep_hang BETWEEN 6 AND 10;
        `, { type: sequelize.QueryTypes.SELECT });

        if (!trendingCourses.length) {
            return responseData("", "Không tìm thấy khóa học xu hướng", 404, res);
        }

        // Trả về phản hồi với danh sách khóa học xu hướng
        return responseData(trendingCourses, "Lấy danh sách khóa học xu hướng thành công", 200, res);
    } catch (error) {
        console.error(error); // In ra lỗi để kiểm tra
        return responseData("", "Lỗi khi lấy danh sách khóa học xu hướng", 500, res);
    }
};

// đề xuất khóa học dựa trên lịch sử thanh toán
export const suggestCourses = async (req, res) => {
    const ma_hoc_vien = req.params.ma_hoc_vien;

    try {
        // Lấy danh sách các khóa học đã thanh toán của học viên
        const purchasedCourses = await model.THANHTOAN.findAll({
            where: { ma_hoc_vien },
            attributes: ['ma_khoa_hoc'] // Chỉ lấy ma_khoa_hoc
        });

        // Nếu không có khóa học nào đã thanh toán
        if (!purchasedCourses.length) {
            return responseData([], "Học viên chưa thanh toán khóa học nào", 404, res);
        }

        // Lấy danh sách ma_khoa_hoc đã thanh toán
        const purchasedCourseIds = purchasedCourses.map(course => course.ma_khoa_hoc);

        // Lấy danh mục của các khóa học đã thanh toán
        const categories = await model.KHOAHOC.findAll({
            where: { ma_khoa_hoc: purchasedCourseIds },
            attributes: ['ma_danh_muc']
        });

        // Nếu không tìm thấy danh mục
        if (!categories.length) {
            return responseData([], "Không tìm thấy danh mục cho khóa học đã thanh toán", 404, res);
        }

        // Lấy danh sách ma_danh_muc
        const categoryIds = categories.map(category => category.ma_danh_muc);

        // Lấy các khóa học trong cùng danh mục mà chưa được thanh toán
        const suggestedCourses = await model.KHOAHOC.findAll({
            where: {
                ma_danh_muc: categoryIds,
                ma_khoa_hoc: { [Op.notIn]: purchasedCourseIds } // Loại bỏ khóa học đã thanh toán
            },
            include: [
                {
                    model: model.GIANGVIEN,
                    attributes: ['ten'],
                    as: 'ma_giang_vien_GIANGVIEN'
                },
                {
                    model: model.DANHMUC,
                    attributes: ['ten_danh_muc'],
                    as: 'ma_danh_muc_DANHMUC'
                }
            ]
        });

        // Trả về kết quả
        return responseData(suggestedCourses, "Đề xuất khóa học thành công", 200, res);
    } catch (error) {
        console.error(error);
        return responseData("", "Lỗi khi đề xuất khóa học", 500, res);
    }
};

// lấy danh sách khóa học miễn phí
export const getFreeCourses = async (req, res) => {
    try {
        // Lấy danh sách khóa học miễn phí
        const freeCourses = await model.KHOAHOC.findAll({
            where: {
                loai_khoa_hoc: 'miễn phí'
            },
            include: [
                {
                    model: model.GIANGVIEN,
                    attributes: ['ten'],
                    as: 'ma_giang_vien_GIANGVIEN'
                },
                {
                    model: model.DANHMUC,
                    attributes: ['ten_danh_muc'],
                    as: 'ma_danh_muc_DANHMUC'
                }
            ]
        });

        if (!freeCourses.length) {
            return responseData("", "Không tìm thấy khóa học miễn phí", 404, res);
        }

        return responseData(freeCourses, "Lấy danh sách khóa học miễn phí thành công", 200, res);
    } catch (error) {
        console.error(error);
        return responseData("", "Lỗi khi lấy danh sách khóa học miễn phí", 500, res);
    }
};
//lấy danh sách khóa học trả phí 
export const getPaidCourses = async (req, res) => {
    try {
        // Lấy danh sách khóa học trả phí
        const paidCourses = await model.KHOAHOC.findAll({
            where: {
                loai_khoa_hoc: 'trả phí'
            },
            include: [
                {
                    model: model.GIANGVIEN,
                    attributes: ['ten'],
                    as: 'ma_giang_vien_GIANGVIEN'
                },
                {
                    model: model.DANHMUC,
                    attributes: ['ten_danh_muc'],
                    as: 'ma_danh_muc_DANHMUC'
                }
            ]
        });

        if (!paidCourses.length) {
            return responseData("", "Không tìm thấy khóa học trả phí", 404, res);
        }

        return responseData(paidCourses, "Lấy danh sách khóa học trả phí thành công", 200, res);
    } catch (error) {
        console.error(error);
        return responseData("", "Lỗi khi lấy danh sách khóa học trả phí", 500, res);
    }
};

// xem chi tiết khóa học
export const getCourseDetails = async (req, res) => {
    const { ma_khoa_hoc } = req.params; // Lấy mã khóa học từ tham số URL

    try {
        // Tìm khóa học theo mã khóa học
        const course = await model.KHOAHOC.findOne({
            where: { ma_khoa_hoc },
            include: [
                {
                    model: model.GIANGVIEN, // Mối quan hệ với giảng viên
                    attributes: ['ten'], // Chỉ lấy tên giảng viên
                    as: 'ma_giang_vien_GIANGVIEN'
                },
                {
                    model: model.DANHMUC, // Mối quan hệ với danh mục
                    attributes: ['ten_danh_muc'], // Chỉ lấy tên danh mục
                    as: 'ma_danh_muc_DANHMUC'
                },
                {
                    model: model.NHANXET, // Thêm thông tin đánh giá nếu cần
                    attributes: ['ma_nhan_xet', 'noi_dung', 'xep_hang'], // Thông tin cần thiết từ bảng NHANXET
                    as: 'NHANXETs' // Sửa lại alias để khớp với alias đã định nghĩa
                }
            ]
        });

        if (!course) {
            return responseData("", "Không tìm thấy khóa học", 404, res);
        }

        return responseData(course, "Lấy chi tiết khóa học thành công", 200, res);
    } catch (error) {
        console.error(error);
        return responseData("", "Lỗi khi lấy chi tiết khóa học", 500, res);
    }
};

