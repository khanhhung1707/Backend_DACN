import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

export const addFavoriteCourse = async (req, res) => {
    const { IDKhoaHoc } = req.params; // Lấy IDKhoaHoc từ params

    if (!IDKhoaHoc) {
        return responseData(res, 400, "ID khóa học là bắt buộc", null);
    }

    try {
        const newFavorite = await model.KhoaHocYeuThich.create({
            IDKhoaHoc, // Gán ID khóa học
            IDNguoiDung: req.user.id, // Nếu bạn lưu ID người dùng
        });

        return responseData(res, 201, "Thêm khóa học yêu thích thành công", newFavorite);
    } catch (error) {
        console.error(error);
        return responseData(res, 500, "Có lỗi xảy ra khi thêm khóa học yêu thích", error);
    }
};

// Lấy danh sách khóa học yêu thích theo người dùng
export const getFavoriteCoursesByUser = async (req, res) => {
    // Lấy ID người dùng từ token
    const IDNguoiDung = req.user.id; 

    try {
        // Tìm tất cả các khóa học yêu thích theo ID người dùng
        const favoriteCourses = await model.KhoaHocYeuThich.findAll({
            where: { IDNguoiDung },
            include: [
                {
                    model: model.KhoaHoc, // Bảng khóa học được alias với KhoaHocYeuThich
                    as: 'IDKhoaHoc_KhoaHoc', // Sử dụng alias từ init-models.js
                    attributes: ['IDKhoaHoc', 'TenKhoaHoc', 'MoTaKhoaHoc', 'HinhAnh', 'GiaTien']
                }
            ]
        });

        // Nếu không có khóa học nào, trả về thông báo
        if (favoriteCourses.length === 0) {
            return responseData(res, 404, "Người dùng chưa có khóa học yêu thích", null);
        }

        // Trả về danh sách khóa học yêu thích
        return responseData(res, 200, "Danh sách khóa học yêu thích", favoriteCourses);
    } catch (error) {
        // Ghi log lỗi để kiểm tra chi tiết
        console.error("Lỗi khi lấy danh sách khóa học yêu thích:", error);

        // Trả về lỗi
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học yêu thích", error);
    }
};

// bỏ khóa học yêu thích
export const removeFavoriteCourse = async (req, res) => {
    const { IDKhoaHoc } = req.params; // Lấy ID khóa học từ params

    if (!IDKhoaHoc) {
        return responseData(res, 400, "ID khóa học là bắt buộc", null);
    }

    try {
        const deleted = await model.KhoaHocYeuThich.destroy({
            where: {
                IDKhoaHoc,
                IDNguoiDung: req.user.id 
            }
        });

        // Kiểm tra nếu khóa học không tồn tại trong danh sách yêu thích
        if (deleted === 0) {
            return responseData(res, 404, "Khóa học không có trong danh sách yêu thích", null);
        }

        return responseData(res, 200, "Bỏ khóa học yêu thích thành công", null);
    } catch (error) {
        console.error("Lỗi khi bỏ khóa học yêu thích:", error);
        return responseData(res, 500, "Lỗi khi bỏ khóa học yêu thích", error);
    }
};

