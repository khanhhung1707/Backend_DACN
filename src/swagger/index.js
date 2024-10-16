
/**
 * @swagger
 * /signup:
 *   post:
 *     description: Đăng ký học viên mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenDangNhap:
 *                 type: string
 *               Email:
 *                 type: string
 *               MatKhau:
 *                 type: string
 *               HoTen:
 *                 type: string
 *               SDT:
 *                 type: string
 *               Role:
 *                 type: string
 *               GioiTinh:
 *                 type: string
 *               AnhDaiDien:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã tồn tại
 *       500:
 *         description: Lỗi khi đăng ký

 * /login:
 *   post:
 *     description: Đăng nhập học viên
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               MatKhau:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Email và mật khẩu là bắt buộc
 *       404:
 *         description: Người dùng không tồn tại
 *       401:
 *         description: Mật khẩu không chính xác
 *       500:
 *         description: Lỗi khi đăng nhập
 
 * /forgot-password:
 *   post:
 *     description: Quên mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mật khẩu mới đã được gửi qua email của bạn
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi máy chủ

 * /change-password:
 *   post:
 *     description: Đổi mật khẩu cho học viên đã đăng nhập
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []  # Đảm bảo người dùng đã xác thực
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã thay đổi mật khẩu thành công
 *       401:
 *         description: Mật khẩu cũ không chính xác
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Có lỗi xảy ra
 */

/**
 * @swagger
 * /binh-luan:
 *   get:
 *     summary: Lấy tất cả bình luận
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDBinhLuan:
 *                     type: integer
 *                     description: ID của bình luận
 *                   IDNguoiDung:
 *                     type: integer
 *                     description: ID của người dùng đã bình luận
 *                   NoiDung:
 *                     type: string
 *                     description: Nội dung của bình luận
 *       404:
 *         description: Không tìm thấy bình luận
 *       500:
 *         description: Lỗi máy chủ
 
 * /binh-luan/{id}:
 *   get:
 *     summary: Lấy bình luận theo ID khóa học
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của khóa học
 *     responses:
 *       200:
 *         description: Lấy bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDBinhLuan:
 *                     type: integer
 *                     description: ID của bình luận
 *                   IDNguoiDung:
 *                     type: integer
 *                     description: ID của người dùng đã bình luận
 *                   NoiDung:
 *                     type: string
 *                     description: Nội dung của bình luận
 *       404:
 *         description: Không tìm thấy bình luận
 *       500:
 *         description: Lỗi máy chủ
 
 * /binh-luan/{id}:
 *   post:
 *     summary: Gửi bình luận theo ID khóa học
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của khóa học
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NoiDung:
 *                 type: string
 *                 description: Nội dung bình luận
 *                 example: Đây là nội dung bình luận
 *     responses:
 *       201:
 *         description: Gửi bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDBinhLuan:
 *                   type: integer
 *                   description: ID của bình luận
 *                 NoiDung:
 *                   type: string
 *                   description: Nội dung bình luận
 *       400:
 *         description: Thiếu nội dung bình luận
 *       500:
 *         description: Lỗi máy chủ
 */

/**
 * @swagger
 * /khoa-hoc:
 *   get:
 *     summary: Lấy danh sách tất cả các khóa học
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Không tìm thấy khóa học nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học

 * /khoa-hoc-de-xuat:
 *   get:
 *     summary: Lấy danh sách khóa học dựa trên lịch sử mua khóa học của người dùng
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học đề xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Người dùng chưa mua khóa học nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học đề xuất
 
 * /khoa-hoc-tra-phi:
 *   get:
 *     summary: Lấy danh sách khóa học trả phí
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học trả phí thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Không tìm thấy khóa học trả phí nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học trả phí
 
 * /khoa-hoc-mien-phi:
 *   get:
 *     summary: Lấy danh sách khóa học miễn phí
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học miễn phí thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Không tìm thấy khóa học miễn phí nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học miễn phí

 * /khoa-hoc/hot:
 *   get:
 *     summary: Lấy danh sách khóa học hot
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học hot thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Không tìm thấy khóa học hot nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học hot
 
 * /khoa-hoc/trending:
 *   get:
 *     summary: Lấy danh sách khóa học xu hướng
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học xu hướng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       404:
 *         description: Không tìm thấy khóa học xu hướng nào
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học xu hướng
 
 * /khoa-hoc/xem-chi-tiet/{id}:
 *   get:
 *     summary: Lấy chi tiết khóa học theo IDKhoaHoc
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lấy chi tiết khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDKhoaHoc:
 *                   type: integer
 *                   description: ID của khóa học
 *                 TenKhoaHoc:
 *                   type: string
 *                   description: Tên của khóa học
 *                 MoTaKhoaHoc:
 *                   type: string
 *                   description: Mô tả của khóa học
 *                 HinhAnh:
 *                   type: string
 *                   description: Đường dẫn hình ảnh của khóa học
 *                 NguoiTao:
 *                   type: object
 *                   properties:
 *                     IDNguoiDung:
 *                       type: integer
 *                       description: ID người dùng
 *                     HoTen:
 *                       type: string
 *                       description: Họ tên người tạo
 *                 DanhMuc:
 *                   type: object
 *                   properties:
 *                     IDDanhMuc:
 *                       type: integer
 *                       description: ID danh mục
 *                     TenDanhMuc:
 *                       type: string
 *                       description: Tên danh mục
 *                 KhuyenMai:
 *                   type: object
 *                   properties:
 *                     IDKhuyenMai:
 *                       type: integer
 *                       description: ID khuyến mãi
 *                     TenKhuyenMai:
 *                       type: string
 *                       description: Tên khuyến mãi
 *       404:
 *         description: Không tìm thấy khóa học
 *       500:
 *         description: Lỗi khi lấy chi tiết khóa học
 
 * /khoa-hoc/tim-kiem-theo-ten:
 *   get:
 *     summary: Tìm kiếm khóa học theo tên
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Tên khóa học
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       400:
 *         description: Tên khóa học là bắt buộc
 *       404:
 *         description: Không tìm thấy khóa học nào
 *       500:
 *         description: Lỗi khi tìm kiếm khóa học

 * /khoa-hoc/tim-kiem-theo-danh-muc:
 *   get:
 *     summary: Tìm kiếm khóa học theo tên danh mục
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: categoryName
 *         required: true
 *         description: Tên danh mục
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy danh sách khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học
 *                   TenKhoaHoc:
 *                     type: string
 *                     description: Tên của khóa học
 *                   MoTaKhoaHoc:
 *                     type: string
 *                     description: Mô tả của khóa học
 *                   HinhAnh:
 *                     type: string
 *                     description: Đường dẫn hình ảnh của khóa học
 *       400:
 *         description: Tên danh mục là bắt buộc
 *       404:
 *         description: Không tìm thấy khóa học nào trong danh mục
 *       500:
 *         description: Lỗi khi tìm kiếm khóa học
 
 * /khoa-hoc:
 *   post:
 *     summary: Tạo khóa học (chỉ giảng viên)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenKhoaHoc:
 *                 type: string
 *                 description: Tên của khóa học
 *               MoTaKhoaHoc:
 *                 type: string
 *                 description: Mô tả của khóa học
 *               HinhAnh:
 *                 type: string
 *                 description: Đường dẫn hình ảnh của khóa học
 *               LoaiKhoaHoc:
 *                 type: string
 *                 description: Loại của khóa học
 *               IDDanhMuc:
 *                 type: integer
 *                 description: ID danh mục của khóa học
 *               GiaTien:
 *                 type: number
 *                 description: Giá tiền của khóa học
 *     responses:
 *       201:
 *         description: Tạo khóa học thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDKhoaHoc:
 *                   type: integer
 *                   description: ID của khóa học mới tạo
 *       400:
 *         description: Thiếu dữ liệu đầu vào
 *       500:
 *         description: Lỗi khi tạo khóa học

 * /khoa-hoc/{id}:
 *   put:
 *     summary: Chỉnh sửa khóa học của giảng viên
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TenKhoaHoc:
 *                 type: string
 *                 description: Tên của khóa học
 *               MoTaKhoaHoc:
 *                 type: string
 *                 description: Mô tả của khóa học
 *               HinhAnh:
 *                 type: string
 *                 description: Đường dẫn hình ảnh của khóa học
 *               LoaiKhoaHoc:
 *                 type: string
 *                 description: Loại của khóa học
 *               IDDanhMuc:
 *                 type: integer
 *                 description: ID danh mục của khóa học
 *               GiaTien:
 *                 type: number
 *                 description: Giá tiền của khóa học
 *     responses:
 *       200:
 *         description: Cập nhật khóa học thành công
 *       404:
 *         description: Không tìm thấy khóa học
 *       403:
 *         description: Bạn không có quyền chỉnh sửa khóa học này
 *       400:
 *         description: Thiếu dữ liệu đầu vào
 *       500:
 *         description: Lỗi khi cập nhật khóa học
 
 * /khoa-hoc/{id}:
 *   delete:
 *     summary: Xóa khóa học của giảng viên
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khóa học
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Xóa khóa học thành công
 *       404:
 *         description: Không tìm thấy khóa học
 *       403:
 *         description: Bạn không có quyền xóa khóa học này
 *       500:
 *         description: Lỗi khi xóa khóa học
 */

/**
 * @swagger
 * /follow/{IDNguoiDungGiangVien}:
 *   post:
 *     summary: Học viên theo dõi giảng viên
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IDNguoiDungGiangVien
 *         required: true
 *         description: ID của giảng viên mà học viên muốn theo dõi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Theo dõi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *                 follow:
 *                   type: object
 *                   properties:
 *                     IDNguoiDung:
 *                       type: integer
 *                       description: ID của học viên
 *                     IDNguoiDungGiangVien:
 *                       type: integer
 *                       description: ID của giảng viên
 *                     NgayFollow:
 *                       type: string
 *                       format: date-time
 *                       description: Ngày học viên theo dõi giảng viên
 *       400:
 *         description: Học viên đã theo dõi giảng viên này
 *       404:
 *         description: Học viên hoặc giảng viên không tồn tại
 *       500:
 *         description: Lỗi khi theo dõi giảng viên
 
 * /followers:
 *   get:
 *     summary: Lấy danh sách học viên theo dõi giảng viên
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách học viên theo dõi giảng viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID của học viên
 *                       fullName:
 *                         type: string
 *                         description: Họ tên của học viên
 *                       email:
 *                         type: string
 *                         description: Email của học viên
 *                       gioiTinh:
 *                         type: string
 *                         description: Giới tính của học viên
 *                       avatar:
 *                         type: string
 *                         description: Đường dẫn hình ảnh đại diện của học viên
 *                       followDate:
 *                         type: string
 *                         format: date-time
 *                         description: Ngày theo dõi
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi khi lấy danh sách học viên theo dõi
 */

/**
 * @swagger
 * /add-favorite/{IDKhoaHoc}:
 *   post:
 *     summary: Thêm khóa học vào danh sách yêu thích của người dùng
 *     tags: [Favorite Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IDKhoaHoc
 *         required: true
 *         description: ID của khóa học cần thêm vào danh sách yêu thích
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Thêm khóa học yêu thích thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDKhoaHocYeuThich:
 *                   type: integer
 *                   description: ID của khóa học yêu thích vừa tạo
 *       400:
 *         description: ID khóa học là bắt buộc
 *       500:
 *         description: Có lỗi xảy ra khi thêm khóa học yêu thích
 
 * /favorites:
 *   get:
 *     summary: Lấy danh sách khóa học yêu thích theo người dùng
 *     tags: [Favorite Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách khóa học yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông điệp trả về
 *                 favoriteCourses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IDKhoaHoc:
 *                         type: integer
 *                         description: ID của khóa học
 *                       TenKhoaHoc:
 *                         type: string
 *                         description: Tên của khóa học
 *                       MoTaKhoaHoc:
 *                         type: string
 *                         description: Mô tả của khóa học
 *                       HinhAnh:
 *                         type: string
 *                         description: Hình ảnh của khóa học
 *                       GiaTien:
 *                         type: number
 *                         description: Giá tiền của khóa học
 *       404:
 *         description: Người dùng chưa có khóa học yêu thích
 *       500:
 *         description: Lỗi khi lấy danh sách khóa học yêu thích
 
 * /favorites/{IDKhoaHoc}:
 *   delete:
 *     summary: Bỏ khóa học ra khỏi danh sách yêu thích
 *     tags: [Favorite Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IDKhoaHoc
 *         required: true
 *         description: ID của khóa học cần bỏ khỏi danh sách yêu thích
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bỏ khóa học yêu thích thành công
 *       404:
 *         description: Khóa học không có trong danh sách yêu thích
 *       400:
 *         description: ID khóa học là bắt buộc
 *       500:
 *         description: Lỗi khi bỏ khóa học yêu thích
 
 * /khoa-hoc/nhan-xet/{id}:
 *   post:
 *     summary: Thêm nhận xét cho khóa học theo IDKhoaHoc
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khóa học mà nhận xét sẽ được thêm vào
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noiDung:
 *                 type: string
 *                 description: Nội dung của nhận xét
 *               xepLoai:
 *                 type: integer
 *                 description: Xếp loại của khóa học (ví dụ: 1-5)
 *               thoiGian:
 *                 type: string
 *                 format: date-time
 *                 description: Thời gian tạo nhận xét
 *     responses:
 *       201:
 *         description: Thêm nhận xét thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IDNhanXet:
 *                   type: integer
 *                   description: ID của nhận xét vừa tạo
 *       500:
 *         description: Có lỗi xảy ra
 */

/**
 * @swagger
 * /don-hang:
 *   get:
 *     summary: Lấy đơn hàng của người dùng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDDonHang:
 *                     type: integer
 *                     description: ID của đơn hàng
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học liên quan
 *                   IDNguoiDung:
 *                     type: integer
 *                     description: ID của người dùng
 *                   IDThanhToan:
 *                     type: integer
 *                     description: ID của phương thức thanh toán
 *                   ThoiGianMua:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian mua đơn hàng
 *                   KhoaHoc:
 *                     type: object
 *                     properties:
 *                       TenKhoaHoc:
 *                         type: string
 *                         description: Tên của khóa học
 *                       MoTaKhoaHoc:
 *                         type: string
 *                         description: Mô tả khóa học
 *                   ThanhToan:
 *                     type: object
 *                     properties:
 *                       PhuongThuc:
 *                         type: string
 *                         description: Phương thức thanh toán
 *       404:
 *         description: Không có đơn hàng nào
 *       500:
 *         description: Lỗi máy chủ

 * /don-hang/all:
 *   get:
 *     summary: Lấy tất cả các đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách tất cả đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDDonHang:
 *                     type: integer
 *                     description: ID của đơn hàng
 *                   IDKhoaHoc:
 *                     type: integer
 *                     description: ID của khóa học liên quan
 *                   IDNguoiDung:
 *                     type: integer
 *                     description: ID của người dùng
 *                   IDThanhToan:
 *                     type: integer
 *                     description: ID của phương thức thanh toán
 *                   ThoiGianMua:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian mua đơn hàng
 *                   KhoaHoc:
 *                     type: object
 *                     properties:
 *                       TenKhoaHoc:
 *                         type: string
 *                         description: Tên của khóa học
 *                       MoTaKhoaHoc:
 *                         type: string
 *                         description: Mô tả khóa học
 *                   ThanhToan:
 *                     type: object
 *                     properties:
 *                       PhuongThuc:
 *                         type: string
 *                         description: Phương thức thanh toán
 *       404:
 *         description: Không có đơn hàng nào
 *       500:
 *         description: Lỗi máy chủ
 */
