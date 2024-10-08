import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Thêm nhận xét cho khóa học theo IDKhoaHoc
export const themNhanXet = async (req, res) => {
    const { noiDung, xepLoai, thoiGian } = req.body; 
    const userId = req.user.id; 

    try {
        // Tiến hành thêm nhận xét vào cơ sở dữ liệu
        const nhanXetMoi = await model.NhanXet.create({
            IDNguoiDung: userId, 
            NoiDung: noiDung,
            XepLoai: xepLoai,
            ThoiGian: thoiGian,
            IDKhoaHoc: req.params.id 
        });

        return responseData(res, 201, "Thêm nhận xét thành công", nhanXetMoi);
    } catch (error) {
        return responseData(res, 500, "Có lỗi xảy ra", error);
    }
};