import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { responseData } from '../config/response.js';

const model = initModels(sequelize);

// lấy danh sách tất cả danh mục
export const getDanhMucKhoaHoc = async (req, res) => {
    try {
      // Lấy danh sách danh mục từ cơ sở dữ liệu
      const danhMucList = await model.DanhMucKhoaHoc.findAll();
  
      // Kiểm tra xem có danh mục nào không
      if (!danhMucList.length) {
        return responseData(res, 404, "Không tìm thấy danh mục nào");
      }
  
      // Trả về danh sách danh mục
      return responseData(res, 200, "Danh sách danh mục", danhMucList);
    } catch (error) {
      console.error("Error fetching danh mục:", error);
      return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};

//get khóa học theo id
export const getChiTietDanhMuc = async (req, res) => {
    const { idDanhMuc } = req.params; // Lấy IDDanhMuc từ params

    try {
        // Tìm danh mục theo IDDanhMuc
        const danhMuc = await model.DanhMucKhoaHoc.findOne({
            where: { IDDanhMuc: idDanhMuc }
        });

        // Kiểm tra nếu danh mục không tồn tại
        if (!danhMuc) {
            return responseData(res, 404, "Danh mục không tồn tại");
        }

        return responseData(res, 200, "Chi tiết danh mục", danhMuc);
    } catch (error) {
        console.error("Error fetching danh mục details:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};

//chỉnh sửa danh mục
export const suaDanhMuc = async (req, res) => {
    const { idDanhMuc } = req.params; // Lấy IDDanhMuc từ params
    const { TenDanhMuc } = req.body; // Lấy tên danh mục từ request body

    try {
        // Cập nhật danh mục theo IDDanhMuc
        const [updated] = await model.DanhMucKhoaHoc.update(
            { TenDanhMuc },
            { where: { IDDanhMuc: idDanhMuc } }
        );

        if (!updated) {
            return responseData(res, 404, "Không tìm thấy danh mục để cập nhật");
        }

        return responseData(res, 200, "Danh mục đã được cập nhật");
    } catch (error) {
        console.error("Error updating danh mục:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};

//xóa danh mục
export const xoaDanhMuc = async (req, res) => {
    const { idDanhMuc } = req.params; // Lấy IDDanhMuc từ params

    try {
        // Xóa danh mục theo IDDanhMuc
        const deleted = await model.DanhMucKhoaHoc.destroy({
            where: { IDDanhMuc: idDanhMuc }
        });

        if (!deleted) {
            return responseData(res, 404, "Không tìm thấy danh mục để xóa");
        }

        return responseData(res, 200, "Danh mục đã được xóa");
    } catch (error) {
        console.error("Error deleting danh mục:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};

//thêm danh mục
export const themDanhMuc = async (req, res) => {
    const { TenDanhMuc } = req.body; // Lấy tên danh mục từ request body

    try {
        // Kiểm tra nếu tên danh mục đã tồn tại
        const existingCategory = await model.DanhMucKhoaHoc.findOne({
            where: { TenDanhMuc }
        });

        if (existingCategory) {
            return responseData(res, 400, "Danh mục đã tồn tại");
        }

        // Tạo danh mục mới
        const newCategory = await model.DanhMucKhoaHoc.create({
            TenDanhMuc
        });

        return responseData(res, 201, "Danh mục đã được thêm thành công", newCategory);
    } catch (error) {
        console.error("Error adding danh mục:", error);
        return responseData(res, 500, "Có lỗi xảy ra: " + error.message);
    }
};
