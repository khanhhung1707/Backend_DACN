import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Lấy danh sách tất cả các khóa học
export const getAllCourses = async (req, res) => {
    try {
        // Lấy danh sách khóa học từ cơ sở dữ liệu
        const courses = await model.KhoaHoc.findAll();

        // Kiểm tra nếu không có khóa học nào
        if (!courses || courses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học thành công", courses);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học", error);
    }
};
// Lấy danh sách khóa học dựa trên lịch sử mua khóa học của người dùng
export const getRecommendedCourses = async (req, res) => {
    try {
        // Lấy ID người dùng từ token đã xác thực (req.user đã được gán từ middleware)
        const userId = req.user.id; // Lấy ID từ dữ liệu đã giải mã
        console.log('User ID:', userId); // Kiểm tra userId trong log

        if (!userId) {
            return responseData(res, 400, "Không tìm thấy ID người dùng", null);
        }

        // Lấy danh sách các khóa học đã mua của người dùng
        const purchasedCourses = await model.DonHang.findAll({
            where: {
                IDNguoiDung: userId  
            }
        });

        // Nếu người dùng chưa mua khóa học nào, không thể đề xuất
        if (!purchasedCourses || purchasedCourses.length === 0) {
            return responseData(res, 404, "Người dùng chưa mua khóa học nào", null);
        }

        const purchasedCourseIds = purchasedCourses.map(course => course.IDKhoaHoc); // Lấy ID các khóa học đã mua

        // Lấy danh sách danh mục của các khóa học đã mua
        const purchasedCourseCategories = await model.KhoaHoc.findAll({
            where: {
                IDKhoaHoc: {
                    [Op.in]: purchasedCourseIds // Sử dụng Op.in để tìm khóa học
                }
            },
            attributes: ['IDDanhMuc'] // Sử dụng đúng tên cột
        });

        const categoryIds = purchasedCourseCategories.map(course => course.IDDanhMuc);

        // Tìm các khóa học khác (không phải đã mua) trong cùng danh mục để đề xuất
        const recommendedCourses = await model.KhoaHoc.findAll({
            where: {
                IDKhoaHoc: {
                    [Op.not]: purchasedCourseIds // Tìm khóa học không nằm trong danh sách đã mua
                },
                IDDanhMuc: {
                    [Op.in]: categoryIds // Trong danh mục đã mua
                }
            }
        });

        // Kiểm tra nếu không có khóa học nào được đề xuất
        if (!recommendedCourses || recommendedCourses.length === 0) {
            return responseData(res, 404, "Không có khóa học nào được đề xuất", null);
        }

        // Trả về danh sách khóa học được đề xuất
        return responseData(res, 200, "Lấy danh sách khóa học đề xuất thành công", recommendedCourses);
    } catch (error) {
        console.error('Error details:', error);
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học đề xuất", error);
    }
};

// Lấy danh sách khóa học trả phí
export const getPaidCourses = async (req, res) => {
    try {
        const paidCourses = await model.KhoaHoc.findAll({
            where: {
                LoaiKhoaHoc: 'tra_phi' // Lấy khóa học có loại trả phí
            }
        });

        if (!paidCourses || paidCourses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học trả phí nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học trả phí thành công", paidCourses);
    } catch (error) {
        console.error('Error details:', error);
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học trả phí", error);
    }
};

// Lấy danh sách khóa học miễn phí
export const getFreeCourses = async (req, res) => {
    try {
        const freeCourses = await model.KhoaHoc.findAll({
            where: {
                LoaiKhoaHoc: 'mien_phi' // Lấy khóa học có loại miễn phí
            }
        });

        if (!freeCourses || freeCourses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học miễn phí nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học miễn phí thành công", freeCourses);
    } catch (error) {
        console.error('Error details:', error);
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học miễn phí", error);
    }
};




