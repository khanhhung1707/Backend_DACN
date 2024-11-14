import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// thêm hashtag
export const postHashtag = async (req, res) => {
    try {
      const { HashTagName } = req.body;
  
      // Thêm hashtag mới vào bảng
      const newHashtag = await model.Hashtag.create({
        HashTagName,
        IDKhoaHoc,
      });
  
      return res.status(201).json({
        message: "Thêm hashtag thành công",
        data: newHashtag,
      });
    } catch (error) {
      console.error("Lỗi khi thêm hashtag:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };

// lấy hashtag all 
export const getHashtag = async (req, res) => {
    try {
      const hashtags = await model.Hashtag.findAll();
  
      return res.status(200).json({
        message: "Danh sách hashtag",
        data: hashtags,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hashtag:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };

// xóa hashtag 
export const deleteHashtag = async (req, res) => {
    try {
      const { IDHashTag } = req.params;
  
      const result = await model.Hashtag.destroy({
        where: { IDHashTag },
      });
  
      if (result) {
        return res.status(200).json({ message: "Xóa hashtag thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy hashtag" });
      }
    } catch (error) {
      console.error("Lỗi khi xóa hashtag:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };
  

// thêm hashtag cho khóa học
export const addHashtagToCourse = async (req, res) => {
    try {
        const { IDKhoaHoc } = req.params;
        const { HashTagName } = req.body;

        // Kiểm tra khóa học có tồn tại không
        const course = await model.KhoaHoc.findOne({
            where: { IDKhoaHoc }
        });

        if (!course) {
            return responseData(res, 404, "Khóa học không tồn tại", null);
        }

        // Tạo hashtag mới
        const newHashtag = await model.Hashtag.create({
            HashTagName,
            IDKhoaHoc
        });

        // Cập nhật IDHashTag trong bảng KhoaHoc
        await course.update({
            IDHashTag: newHashtag.IDHashTag
        });

        return responseData(res, 201, "Thêm hashtag vào khóa học thành công", newHashtag);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi thêm hashtag vào khóa học", error);
    }
};
