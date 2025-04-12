import initModels from "../models/init-models.js";
import { responseData } from '../config/response.js';
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);

// Lấy danh sách tất cả các khóa học
export const getAllCourses = async (req, res) => {
    try {
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
        // Lấy ID người dùng từ token đã xác thực
        const userId = req.user.id; 

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
            attributes: ['IDDanhMuc'] 
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
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học miễn phí", error);
    }
};

// Lấy danh sách khóa học hot (5 khóa học có lượng XepLoai tích cực nhiều nhất)
export const getHotCourses = async (req, res) => {
    try {
        const hotCourses = await sequelize.query(`
            SELECT KhoaHoc.IDKhoaHoc, KhoaHoc.TenKhoaHoc, KhoaHoc.MoTaKhoaHoc, KhoaHoc.HinhAnh, COUNT(*) AS SoLuongTichCuc
            FROM NhanXet
            JOIN KhoaHoc ON NhanXet.IDKhoaHoc = KhoaHoc.IDKhoaHoc
            WHERE NhanXet.XepLoai = 'tích cực'
            GROUP BY KhoaHoc.IDKhoaHoc
            ORDER BY SoLuongTichCuc DESC
            LIMIT 5;
        `, { type: sequelize.QueryTypes.SELECT });

        if (!hotCourses || hotCourses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học hot nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học hot thành công", hotCourses);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học hot", error);
    }
};


// Lấy danh sách khóa học xu hướng (5 khóa học có lượng XepLoai tích cực từ top 6 tới top 10)
export const getTrendingCourses = async (req, res) => {
    try {
        const trendingCourses = await sequelize.query(`
            SELECT KhoaHoc.IDKhoaHoc, KhoaHoc.TenKhoaHoc, KhoaHoc.MoTaKhoaHoc, KhoaHoc.HinhAnh, COUNT(*) AS SoLuongTichCuc
            FROM NhanXet
            JOIN KhoaHoc ON NhanXet.IDKhoaHoc = KhoaHoc.IDKhoaHoc
            WHERE NhanXet.XepLoai = 'tích cực'
            GROUP BY KhoaHoc.IDKhoaHoc
            ORDER BY SoLuongTichCuc DESC
            LIMIT 5 OFFSET 5; -- Bỏ qua 5 khóa học đầu
        `, { type: sequelize.QueryTypes.SELECT });

        if (!trendingCourses || trendingCourses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học xu hướng nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học xu hướng thành công", trendingCourses);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy danh sách khóa học xu hướng", error);
    }
};

// Xem chi tiết khóa học theo IDKhoaHoc
export const getCourseDetail = async (req, res) => {
    try {
        const { id } = req.params; 

        // Tìm khóa học theo ID
        const course = await model.KhoaHoc.findOne({
            where: {
                IDKhoaHoc: id
            },
            include: [
                {
                    model: model.NguoiDung,
                    as: 'IDNguoiDung_NguoiDung', 
                    attributes: ['IDNguoiDung', 'HoTen'] 
                },
                {
                    model: model.DanhMucKhoaHoc,
                    as: 'IDDanhMuc_DanhMucKhoaHoc', 
                    attributes: ['IDDanhMuc', 'TenDanhMuc']
                },
                {
                    model: model.KhuyenMai,
                    as: 'IDKhuyenMai_KhuyenMai', 
                    attributes: ['IDKhuyenMai', 'TenKhuyenMai']
                },
                {
                    model: model.Hashtag,
                    as: 'Hashtags',  
                    attributes: ['IDHashTag', 'HashTagName']
                }
            ]
        });

        // Kiểm tra nếu khóa học không tồn tại
        if (!course) {
            return responseData(res, 404, "Không tìm thấy khóa học", null);
        }

        // Trả về thông tin chi tiết khóa học
        return responseData(res, 200, "Lấy chi tiết khóa học thành công", course);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi lấy chi tiết khóa học", error);
    }
};


// Tìm kiếm khóa học theo tên
export const searchCoursesByName = async (req, res) => {
    const { name } = req.query; // Lấy tên khóa học từ query parameters

    if (!name) {
        return responseData(res, 400, "Tên khóa học là bắt buộc", null);
    }

    try {
        const courses = await model.KhoaHoc.findAll({
            where: {
                TenKhoaHoc: {
                    [Op.like]: `%${name}%` // Sử dụng Op.like để tìm kiếm tương đối
                }
            }
        });

        if (!courses || courses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học thành công", courses);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi tìm kiếm khóa học", error);
    }
};

// Tìm kiếm khóa học theo tên danh mục
export const searchCoursesByCategory = async (req, res) => {
    const { categoryName } = req.query; 

    if (!categoryName) {
        return responseData(res, 400, "Tên danh mục là bắt buộc", null);
    }

    try {
        const courses = await model.KhoaHoc.findAll({
            include: [{
                model: model.DanhMucKhoaHoc,
                as: "IDDanhMuc_DanhMucKhoaHoc", 
                where: {
                    tenDanhMuc: { 
                        [Op.like]: `%${categoryName}%`
                    }
                }
            }]
        });

        if (!courses || courses.length === 0) {
            return responseData(res, 404, "Không tìm thấy khóa học nào trong danh mục này", null);
        }

        return responseData(res, 200, "Lấy danh sách khóa học thành công", courses);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi tìm kiếm khóa học", error.message);
    }
};

//Tạo khóa học (only giảng viên)
export const createCourse = async (req, res) => {
    try {
        const { 
            TenKhoaHoc, 
            MoTaKhoaHoc, 
            HinhAnh, 
            LoaiKhoaHoc, 
            IDDanhMuc, 
            GiaTien, 
            IDKhuyenMai, 
            LuotXem, 
            SoLuongHocVien, 
            GiamGia, 
            LinkVideo 
        } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (typeof TenKhoaHoc !== "string" || 
            typeof MoTaKhoaHoc !== "string" || 
            typeof HinhAnh !== "string" ||
            typeof LoaiKhoaHoc !== "string" ||
            typeof IDDanhMuc !== "number" ||
            typeof GiaTien !== "number" ||
            typeof IDKhuyenMai !== "number" ||
            typeof LuotXem !== "number" ||
            typeof SoLuongHocVien !== "number" ||
            typeof GiamGia !== "number" ||
            typeof LinkVideo !== "string") {
            return responseData(res, 400, "Thiếu dữ liệu đầu vào", null);
        }

        // Tạo khóa học trong bảng KhoaHocChuaDuyet
        const newCourse = await model.KhoaHocChuaDuyet.create({
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh,
            LoaiKhoaHoc,
            IDDanhMuc,
            GiaTien,
            IDKhuyenMai,
            LuotXem,
            SoLuongHocVien, 
            GiamGia,
            LinkVideo,
            TrangThai: 'chua_duyet', 
            NgayGuiKiemDuyet: new Date(),  
            IDNguoiDung: req.user.id 
        });

        return responseData(res, 201, "Tạo khóa học thành công, chờ duyệt", newCourse);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi tạo khóa học", error);
    }
};


// Chỉnh sửa khóa học của giảng viên đó tạo
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params; 
        const { 
            TenKhoaHoc, 
            MoTaKhoaHoc, 
            HinhAnh, 
            LoaiKhoaHoc, 
            IDDanhMuc, 
            GiaTien, 
            IDKhuyenMai, 
            LuotXem, 
            SoLuongHocVien, 
            GiamGia, 
            LinkVideo 
        } = req.body;

        const userId = req.user.id; 

        // Kiểm tra dữ liệu đầu vào
        if (!TenKhoaHoc || !MoTaKhoaHoc || !HinhAnh || !LoaiKhoaHoc || !IDDanhMuc || !GiaTien || !IDKhuyenMai || !LuotXem || !SoLuongHocVien || !GiamGia || !LinkVideo) {
            return responseData(res, 400, "Thiếu dữ liệu đầu vào", null);
        }

        // Tìm khóa học cần cập nhật
        const course = await model.KhoaHoc.findByPk(id);

        if (!course) {
            return responseData(res, 404, "Không tìm thấy khóa học", null);
        }

        // Kiểm tra xem giảng viên đang đăng nhập có phải là người tạo ra khóa học không
        if (course.IDNguoiDung !== userId) {
            return responseData(res, 403, "Bạn không có quyền chỉnh sửa khóa học này", null);
        }

        // Cập nhật khóa học
        await course.update({
            TenKhoaHoc,
            MoTaKhoaHoc,
            HinhAnh,
            LoaiKhoaHoc,
            IDDanhMuc,
            GiaTien,
            IDKhuyenMai,
            LuotXem,
            SoLuongHocVien, 
            GiamGia,
            LinkVideo, 
            NgayCapNhat: new Date()  
        });

        return responseData(res, 200, "Cập nhật khóa học thành công", course);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi cập nhật khóa học", error);
    }
};


// xóa khóa học
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id; 

        // Tìm khóa học cần xóa
        const course = await model.KhoaHoc.findByPk(id);
        if (!course) {
            return responseData(res, 404, "Không tìm thấy khóa học", null);
        }

        // Kiểm tra xem giảng viên đang đăng nhập có phải là người tạo ra khóa học không
        if (course.IDNguoiDung !== userId) {
            return responseData(res, 403, "Bạn không có quyền xóa khóa học này", null);
        }

        // Xóa tất cả các phản hồi bình luận liên quan trước
        const relatedComments = await model.BinhLuan.findAll({
            where: { IDKhoaHoc: id },
            attributes: ['IDBinhLuan'],
            raw: true
        });

        const commentIds = relatedComments.map(binhLuan => binhLuan.IDBinhLuan);

        if (commentIds.length > 0) {
            await model.ReplyBinhLuan.destroy({
                where: {
                    IDBinhLuan: commentIds
                }
            });
        }

        // Xóa tất cả các bình luận liên quan
        await model.BinhLuan.destroy({ where: { IDKhoaHoc: id } });

        // Xóa khóa học
        await course.destroy();

        return responseData(res, 200, "Xóa khóa học thành công", null);
    } catch (error) {
        return responseData(res, 500, "Lỗi khi xóa khóa học", error);
    }
};




