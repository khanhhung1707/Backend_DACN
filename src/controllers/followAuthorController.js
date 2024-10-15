import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

export const followAuthor = async (req, res) => {
    const IDNguoiDung = req.user.id; 
    const { IDNguoiDungGiangVien } = req.params; 

    try {
        // Kiểm tra xem học viên có tồn tại không
        const hocVien = await model.NguoiDung.findByPk(IDNguoiDung);

        if (!hocVien) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Tìm giảng viên trong bảng NguoiDung
        const giangVien = await model.NguoiDung.findOne({
            where: {
                IDNguoiDung: IDNguoiDungGiangVien,
                role: 'giangvien'
            }
        });

        if (!giangVien) {
            return res.status(404).json({ message: 'Giảng viên không tồn tại' });
        }

        // Kiểm tra xem học viên đã follow giảng viên này chưa
        const alreadyFollowed = await model.FollowAuthor.findOne({
            where: {
                IDNguoiDung: IDNguoiDung,
                IDNguoiDungGiangVien: giangVien.IDNguoiDung 
            }
        });

        if (alreadyFollowed) {
            return res.status(400).json({ message: 'Bạn đã theo dõi giảng viên này' });
        }

        // Tạo bản ghi follow mới
        const newFollow = await model.FollowAuthor.create({
            IDNguoiDung,
            IDNguoiDungGiangVien: giangVien.IDNguoiDung, 
            NgayFollow: new Date()
        });

        return res.status(200).json({
            message: 'Theo dõi thành công',
            follow: newFollow
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


