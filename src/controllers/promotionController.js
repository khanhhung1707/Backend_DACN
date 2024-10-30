import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';

const model = initModels(sequelize);

// Lấy danh sách tất cả mã khuyến mãi
export const getAllKhuyenMai = async (req, res) => {
    try {
      const khuyenMaiList = await model.KhuyenMai.findAll();
      return res.status(200).json({
        message: "Danh sách mã khuyến mãi",
        data: khuyenMaiList
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách mã khuyến mãi:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };
  
  // Thêm mã khuyến mãi mới
  export const createKhuyenMai = async (req, res) => {
    try {
      const { TenKhuyenMai, MoTaKhuyenMai, LoaiKhuyenMai, GiaTri, NgayBatDau, NgayKetThuc } = req.body;
      const newKhuyenMai = await model.KhuyenMai.create({
        TenKhuyenMai,
        MoTaKhuyenMai,
        LoaiKhuyenMai,
        GiaTri,
        NgayBatDau,
        NgayKetThuc
      });
      return res.status(201).json({
        message: "Thêm mã khuyến mãi thành công",
        data: newKhuyenMai
      });
    } catch (error) {
      console.error("Lỗi khi thêm mã khuyến mãi:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };
  
  // Sửa mã khuyến mãi (theo ID)
  export const updateKhuyenMai = async (req, res) => {
    try {
      const { IDKhuyenMai } = req.params;
      const { TenKhuyenMai, MoTaKhuyenMai, LoaiKhuyenMai, GiaTri, NgayBatDau, NgayKetThuc } = req.body;
      const khuyenMai = await model.KhuyenMai.findByPk(IDKhuyenMai);
  
      if (!khuyenMai) {
        return res.status(404).json({ message: "Không tìm thấy mã khuyến mãi" });
      }
  
      await khuyenMai.update({
        TenKhuyenMai,
        MoTaKhuyenMai,
        LoaiKhuyenMai,
        GiaTri,
        NgayBatDau,
        NgayKetThuc
      });
  
      return res.status(200).json({
        message: "Cập nhật mã khuyến mãi thành công",
        data: khuyenMai
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật mã khuyến mãi:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };
  
  // Xem chi tiết mã khuyến mãi (theo ID)
  export const getKhuyenMaiById = async (req, res) => {
    try {
      const { IDKhuyenMai } = req.params;
      const khuyenMai = await model.KhuyenMai.findByPk(IDKhuyenMai);
  
      if (!khuyenMai) {
        return res.status(404).json({ message: "Không tìm thấy mã khuyến mãi" });
      }
  
      return res.status(200).json({
        message: "Thông tin mã khuyến mãi",
        data: khuyenMai
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin mã khuyến mãi:", error);
      return res.status(500).json({ message: "Có lỗi xảy ra", error });
    }
  };

// Xóa mã khuyến mãi theo ID
export const deleteKhuyenMai = async (req, res) => {
    try {
      const { IDKhuyenMai } = req.params; // Lấy IDKhuyenMai từ params
      console.log("ID để xóa:", IDKhuyenMai); // Log ID để kiểm tra
  
      if (!IDKhuyenMai) {
        return res.status(400).json({ message: "IDKhuyenMai không hợp lệ" });
      }
  
      const result = await model.KhuyenMai.destroy({
        where: { IDKhuyenMai: IDKhuyenMai }
      });
  
      if (result) {
        res.status(200).json({ message: "Xóa mã khuyến mãi thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy mã khuyến mãi" });
      }
    } catch (error) {
      console.error("Lỗi khi xóa mã khuyến mãi:", error);
      res.status(500).json({ message: "Lỗi khi xóa mã khuyến mãi" });
    }
  };