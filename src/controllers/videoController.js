import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// Lấy danh sách Video theo IDKhoaHoc
export const getVideoById = async (req, res) => {
    try {
      const { IDKhoaHoc } = req.params;
  
      const videoList = await model.Video.findAll({
        where: { IDKhoaHoc },
        include: [{
          model: model.KhoaHoc, 
          as: 'IDKhoaHoc_KhoaHoc', 
          attributes: ['TenKhoaHoc'] // Chỉ lấy tên khóa học nếu cần
        }]
      });
  
      return res.status(200).json({
        message: `Danh sách video của khóa học ${IDKhoaHoc}`,
        data: videoList
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách video:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };
  

// Thêm video mới
export const createVideo = async (req, res) => {
  try {
    const { IDKhoaHoc, TenVideo, MoTaVideo, LinkVideo, ThoiLuong } = req.body;
    
    // Tạo video mới
    const newVideo = await model.Video.create({
      IDKhoaHoc,
      TenVideo,
      MoTaVideo,
      LinkVideo,
      ThoiLuong,
      NgayDang: new Date() // Set ngày đăng là ngày hiện tại
    });

    return res.status(201).json({
      message: "Thêm video thành công",
      data: newVideo
    });
  } catch (error) {
    console.error("Lỗi khi thêm video:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra", error });
  }
};
