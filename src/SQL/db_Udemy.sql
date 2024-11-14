/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `BinhLuan`;
CREATE TABLE `BinhLuan` (
  `IDBinhLuan` int NOT NULL AUTO_INCREMENT,
  `IDKhoaHoc` int NOT NULL,
  `IDNguoiDung` int NOT NULL,
  `NoiDung` text NOT NULL,
  `ThoiGian` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDBinhLuan`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `BlackList`;
CREATE TABLE `BlackList` (
  `IDBlackList` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhuyenMai` int DEFAULT NULL,
  `IDDanhMuc` int DEFAULT NULL,
  `TenKhoaHoc` varchar(255) DEFAULT NULL,
  `MoTaKhoaHoc` text,
  `IDKhoaHoc` int NOT NULL,
  `LyDo` varchar(255) DEFAULT 'không phù hợp',
  `NgayThemVaoBlackList` datetime DEFAULT CURRENT_TIMESTAMP,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `LoaiKhoaHoc` varchar(255) DEFAULT NULL,
  `GiaTien` int DEFAULT NULL,
  `GiamGia` int DEFAULT NULL,
  PRIMARY KEY (`IDBlackList`),
  KEY `IDNguoiDungAdmin` (`IDNguoiDung`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `BlackList_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DangKyKhoaHoc`;
CREATE TABLE `DangKyKhoaHoc` (
  `IDDangKyKhoaHoc` int NOT NULL AUTO_INCREMENT,
  `IDKhoaHoc` int DEFAULT NULL,
  `IDNguoiDung` int DEFAULT NULL,
  `ngayDangKy` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDDangKyKhoaHoc`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  CONSTRAINT `DangKyKhoaHoc_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `DangKyKhoaHoc_ibfk_2` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DanhMucKhoaHoc`;
CREATE TABLE `DanhMucKhoaHoc` (
  `IDDanhMuc` int NOT NULL AUTO_INCREMENT,
  `TenDanhMuc` varchar(255) NOT NULL,
  PRIMARY KEY (`IDDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `DonHang`;
CREATE TABLE `DonHang` (
  `IDDonHang` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `NgayMua` date NOT NULL,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `TrangThai` varchar(255) DEFAULT NULL,
  `IDThanhToan` int DEFAULT NULL,
  `IDKhoaHoc` int DEFAULT NULL,
  PRIMARY KEY (`IDDonHang`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `FK_DonHang_ThanhToan` (`IDThanhToan`),
  KEY `FK_DonHang_KhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `DonHang_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `FK_DonHang_KhoaHoc` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `FK_DonHang_ThanhToan` FOREIGN KEY (`IDThanhToan`) REFERENCES `ThanhToan` (`IDThanhToan`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `FollowAuthor`;
CREATE TABLE `FollowAuthor` (
  `IDFollowAuthor` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDNguoiDungGiangVien` int NOT NULL,
  `NgayFollow` date NOT NULL,
  PRIMARY KEY (`IDFollowAuthor`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDNguoiDungGiangVien` (`IDNguoiDungGiangVien`),
  CONSTRAINT `FollowAuthor_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `FollowAuthor_ibfk_2` FOREIGN KEY (`IDNguoiDungGiangVien`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `GhiDanh`;
CREATE TABLE `GhiDanh` (
  `IDGhiDanh` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhoaHoc` int NOT NULL,
  `ThoiGianGhiDanh` datetime NOT NULL,
  PRIMARY KEY (`IDGhiDanh`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `GhiDanh_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `GhiDanh_ibfk_2` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `GioHang`;
CREATE TABLE `GioHang` (
  `IDGioHang` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhoaHoc` int NOT NULL,
  `SoLuong` int NOT NULL,
  PRIMARY KEY (`IDGioHang`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `GioHang_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `GioHang_ibfk_2` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Hashtag`;
CREATE TABLE `Hashtag` (
  `IDHashTag` int NOT NULL AUTO_INCREMENT,
  `HashTagName` varchar(255) NOT NULL,
  `IDKhoaHoc` int NOT NULL,
  PRIMARY KEY (`IDHashTag`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `Hashtag_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `KhoaHoc`;
CREATE TABLE `KhoaHoc` (
  `IDKhoaHoc` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhuyenMai` int DEFAULT NULL,
  `IDDanhMuc` int NOT NULL,
  `TenKhoaHoc` varchar(255) NOT NULL,
  `MoTaKhoaHoc` text,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `NgayDang` date NOT NULL,
  `LuotXem` int DEFAULT '0',
  `SoLuongHocVien` int DEFAULT '0',
  `GiamGia` decimal(5,2) DEFAULT NULL,
  `LoaiKhoaHoc` enum('tra_phi','mien_phi') NOT NULL DEFAULT 'mien_phi',
  `GiaTien` int DEFAULT NULL,
  `IDHashTag` int DEFAULT NULL,
  PRIMARY KEY (`IDKhoaHoc`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDDanhMuc` (`IDDanhMuc`),
  KEY `IDKhuyenMai` (`IDKhuyenMai`),
  KEY `IDHashTag` (`IDHashTag`),
  CONSTRAINT `KhoaHoc_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `KhoaHoc_ibfk_2` FOREIGN KEY (`IDDanhMuc`) REFERENCES `DanhMucKhoaHoc` (`IDDanhMuc`),
  CONSTRAINT `KhoaHoc_ibfk_3` FOREIGN KEY (`IDKhuyenMai`) REFERENCES `KhuyenMai` (`IDKhuyenMai`),
  CONSTRAINT `KhoaHoc_ibfk_4` FOREIGN KEY (`IDHashTag`) REFERENCES `Hashtag` (`IDHashTag`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `KhoaHocChuaDuyet`;
CREATE TABLE `KhoaHocChuaDuyet` (
  `IDKhoaHoc` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhuyenMai` int DEFAULT NULL,
  `IDDanhMuc` int NOT NULL,
  `TenKhoaHoc` varchar(255) NOT NULL,
  `MoTaKhoaHoc` text,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `LoaiKhoaHoc` enum('mien_phi','tra_phi') NOT NULL,
  `GiaTien` int DEFAULT NULL,
  `NgayGuiKiemDuyet` date NOT NULL,
  `TrangThai` enum('chua_duyet','da_duyet','tu_choi') NOT NULL,
  PRIMARY KEY (`IDKhoaHoc`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDDanhMuc` (`IDDanhMuc`),
  CONSTRAINT `KhoaHocChuaDuyet_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `KhoaHocChuaDuyet_ibfk_2` FOREIGN KEY (`IDDanhMuc`) REFERENCES `DanhMucKhoaHoc` (`IDDanhMuc`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `KhoaHocYeuThich`;
CREATE TABLE `KhoaHocYeuThich` (
  `IDKhoaHocYeuThich` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `IDKhoaHoc` int NOT NULL,
  PRIMARY KEY (`IDKhoaHocYeuThich`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `KhoaHocYeuThich_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `KhoaHocYeuThich_ibfk_2` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `KhuyenMai`;
CREATE TABLE `KhuyenMai` (
  `IDKhuyenMai` int NOT NULL AUTO_INCREMENT,
  `TenKhuyenMai` varchar(255) DEFAULT NULL,
  `MoTaKhuyenMai` text,
  `LoaiKhuyenMai` varchar(255) DEFAULT NULL,
  `GiaTri` decimal(5,2) DEFAULT NULL,
  `NgayBatDau` date DEFAULT NULL,
  `NgayKetThuc` date DEFAULT NULL,
  PRIMARY KEY (`IDKhuyenMai`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NguoiDung`;
CREATE TABLE `NguoiDung` (
  `IDNguoiDung` int NOT NULL AUTO_INCREMENT,
  `TenDangNhap` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `HoTen` varchar(255) NOT NULL,
  `GioiTinh` enum('nam','nu') NOT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `Role` enum('hocvien','giangvien','admin') NOT NULL,
  `AnhDaiDien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NguoiDungChan`;
CREATE TABLE `NguoiDungChan` (
  `IDNguoiDung` int NOT NULL,
  `TenDangNhap` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `HoTen` varchar(255) NOT NULL,
  `SDT` varchar(15) DEFAULT NULL,
  `Role` enum('ban') NOT NULL,
  `GioiTinh` enum('nam','nu') NOT NULL,
  PRIMARY KEY (`IDNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `NhanXet`;
CREATE TABLE `NhanXet` (
  `IDNhanXet` int NOT NULL AUTO_INCREMENT,
  `IDKhoaHoc` int NOT NULL,
  `IDNguoiDung` int NOT NULL,
  `NoiDung` text NOT NULL,
  `XepLoai` enum('tích cực','tiêu cực') NOT NULL,
  `ThoiGian` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDNhanXet`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  CONSTRAINT `NhanXet_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `NhanXet_ibfk_2` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ReplyBinhLuan`;
CREATE TABLE `ReplyBinhLuan` (
  `IDRepLyBinhLuan` int NOT NULL AUTO_INCREMENT,
  `IDBinhLuan` int DEFAULT NULL,
  `IDNguoiDung` int DEFAULT NULL,
  `NoiDung` text,
  `ThoiGian` datetime DEFAULT NULL,
  `IDKhoaHoc` int DEFAULT NULL,
  PRIMARY KEY (`IDRepLyBinhLuan`),
  KEY `IDBinhLuan` (`IDBinhLuan`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `ReplyBinhLuan_ibfk_1` FOREIGN KEY (`IDBinhLuan`) REFERENCES `BinhLuan` (`IDBinhLuan`),
  CONSTRAINT `ReplyBinhLuan_ibfk_2` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `ReplyBinhLuan_ibfk_3` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ThanhToan`;
CREATE TABLE `ThanhToan` (
  `IDThanhToan` int NOT NULL AUTO_INCREMENT,
  `NgayThanhToan` date NOT NULL,
  `PhuongThucThanhToan` varchar(255) DEFAULT NULL,
  `NoiDungThanhToan` text,
  `TongTien` decimal(10,2) DEFAULT NULL,
  `IDDonHang` int DEFAULT NULL,
  `IDNguoiDung` int DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `requestId` varchar(255) DEFAULT NULL,
  `payUrl` varchar(255) DEFAULT NULL,
  `shortLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IDThanhToan`),
  KEY `FK_ThanhToan_DonHang` (`IDDonHang`),
  KEY `FK_ThanhToan_NguoiDung` (`IDNguoiDung`),
  CONSTRAINT `FK_ThanhToan_DonHang` FOREIGN KEY (`IDDonHang`) REFERENCES `DonHang` (`IDDonHang`),
  CONSTRAINT `FK_ThanhToan_NguoiDung` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ThanhToan_DonHang`;
CREATE TABLE `ThanhToan_DonHang` (
  `IDThanhToan` int NOT NULL,
  `IDDonHang` int NOT NULL,
  PRIMARY KEY (`IDThanhToan`,`IDDonHang`),
  KEY `IDDonHang` (`IDDonHang`),
  CONSTRAINT `ThanhToan_DonHang_ibfk_1` FOREIGN KEY (`IDThanhToan`) REFERENCES `ThanhToan` (`IDThanhToan`),
  CONSTRAINT `ThanhToan_DonHang_ibfk_2` FOREIGN KEY (`IDDonHang`) REFERENCES `DonHang` (`IDDonHang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ThongBao`;
CREATE TABLE `ThongBao` (
  `IDThongBao` int NOT NULL AUTO_INCREMENT,
  `IDNguoiDung` int NOT NULL,
  `NoiDungThongBao` text NOT NULL,
  `NgayThongBao` date NOT NULL,
  PRIMARY KEY (`IDThongBao`),
  KEY `IDNguoiDung` (`IDNguoiDung`),
  CONSTRAINT `ThongBao_ibfk_1` FOREIGN KEY (`IDNguoiDung`) REFERENCES `NguoiDung` (`IDNguoiDung`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `TracNghiem`;
CREATE TABLE `TracNghiem` (
  `IDTracNghiem` int NOT NULL AUTO_INCREMENT,
  `IDKhoaHoc` int NOT NULL,
  `CauHoi` text NOT NULL,
  `CauTraLoi` text NOT NULL,
  PRIMARY KEY (`IDTracNghiem`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `TracNghiem_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `Video`;
CREATE TABLE `Video` (
  `IDVideo` int NOT NULL AUTO_INCREMENT,
  `IDKhoaHoc` int NOT NULL,
  `TenVideo` varchar(255) NOT NULL,
  `MoTaVideo` text,
  `LinkVideo` varchar(255) NOT NULL,
  `NgayDang` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IDVideo`),
  KEY `IDKhoaHoc` (`IDKhoaHoc`),
  CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`IDKhoaHoc`) REFERENCES `KhoaHoc` (`IDKhoaHoc`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`IDBinhLuan`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `ThoiGian`) VALUES
(1, 21, 1, 'Khóa học này rất hữu ích, tôi đã học được nhiều kiến thức mới!', '2024-10-08 12:35:28');
INSERT INTO `BinhLuan` (`IDBinhLuan`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `ThoiGian`) VALUES
(2, 21, 2, 'Giảng viên rất nhiệt tình và dễ hiểu.', '2024-10-08 12:35:28');
INSERT INTO `BinhLuan` (`IDBinhLuan`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `ThoiGian`) VALUES
(3, 22, 1, 'Nội dung bài giảng cần cải thiện hơn một chút.', '2024-10-08 12:35:28');
INSERT INTO `BinhLuan` (`IDBinhLuan`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `ThoiGian`) VALUES
(4, 22, 2, 'Tôi rất thích cách giảng dạy của giảng viên trong khóa học này.', '2024-10-08 12:35:28'),
(5, 23, 1, 'Khóa học này có những thông tin rất thú vị!', '2024-10-08 12:35:28'),
(6, 23, 2, 'Tôi đã có thể áp dụng kiến thức vào công việc của mình.', '2024-10-08 12:35:28'),
(7, 24, 1, 'Một trải nghiệm tuyệt vời! Tôi rất hài lòng.', '2024-10-08 12:35:28'),
(8, 25, 1, 'Nội dung khóa học phong phú, nhưng cần thời gian để tiếp thu.', '2024-10-08 12:35:28'),
(9, 26, 2, 'Khóa học rất tuyệt vời, tôi sẽ giới thiệu cho bạn bè.', '2024-10-08 12:35:28'),
(11, 21, 2, 'Đây là bình luận của tôi!', '2024-10-14 16:00:11'),
(12, 23, 2, 'Đây là bình luận của tôi!', '2024-10-18 11:53:16'),
(13, 23, 2, 'Đây là bình luận của tôi!', '2024-11-06 11:24:26'),
(14, 23, 2, 'Nội dung bình luận của tôi!', '2024-11-06 11:26:33');

INSERT INTO `BlackList` (`IDBlackList`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `IDKhoaHoc`, `LyDo`, `NgayThemVaoBlackList`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `GiamGia`) VALUES
(10, 4, 1, 2, 'Lập trình JavaScript 7', 'Khóa học về JavaScript cơ bản và nâng cao', 28, 'không phù hợp', '2024-11-14 10:01:34', 'https://example.com/image.jpg', 'tra_phi', 500000, NULL);
INSERT INTO `BlackList` (`IDBlackList`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `IDKhoaHoc`, `LyDo`, `NgayThemVaoBlackList`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `GiamGia`) VALUES
(11, 4, 1, 2, 'Lập trình JavaScript 8', 'Khóa học về JavaScript cơ bản và nâng cao', 29, 'không phù hợp', '2024-11-14 10:01:38', 'https://example.com/image.jpg', 'tra_phi', 500000, NULL);


INSERT INTO `DangKyKhoaHoc` (`IDDangKyKhoaHoc`, `IDKhoaHoc`, `IDNguoiDung`, `ngayDangKy`) VALUES
(1, 21, 2, '2024-10-08 13:13:22');
INSERT INTO `DangKyKhoaHoc` (`IDDangKyKhoaHoc`, `IDKhoaHoc`, `IDNguoiDung`, `ngayDangKy`) VALUES
(2, 22, 2, '2024-10-08 13:13:22');
INSERT INTO `DangKyKhoaHoc` (`IDDangKyKhoaHoc`, `IDKhoaHoc`, `IDNguoiDung`, `ngayDangKy`) VALUES
(3, 23, 2, '2024-10-08 13:13:22');
INSERT INTO `DangKyKhoaHoc` (`IDDangKyKhoaHoc`, `IDKhoaHoc`, `IDNguoiDung`, `ngayDangKy`) VALUES
(4, 24, 2, '2024-10-08 13:13:22'),
(5, 27, 2, '2024-10-08 13:13:22'),
(6, 29, 2, '2024-10-08 13:13:22'),
(7, 30, 2, '2024-10-08 13:13:22'),
(8, 25, 2, '2024-10-08 14:26:18'),
(9, 25, 1, '2024-10-08 16:28:40'),
(10, 26, 2, '2024-10-09 07:08:46');

INSERT INTO `DanhMucKhoaHoc` (`IDDanhMuc`, `TenDanhMuc`) VALUES
(1, 'Lập trình Java');
INSERT INTO `DanhMucKhoaHoc` (`IDDanhMuc`, `TenDanhMuc`) VALUES
(2, 'Lập trình Python');
INSERT INTO `DanhMucKhoaHoc` (`IDDanhMuc`, `TenDanhMuc`) VALUES
(3, 'Phát triển Web');
INSERT INTO `DanhMucKhoaHoc` (`IDDanhMuc`, `TenDanhMuc`) VALUES
(4, 'Lập trình C#'),
(5, 'Khoa học Dữ liệu'),
(6, 'Trí tuệ Nhân tạo'),
(7, 'Phát triển Ứng dụng Di động'),
(8, 'An ninh Mạng'),
(9, 'Phân tích Dữ liệu'),
(10, 'Máy học');

INSERT INTO `DonHang` (`IDDonHang`, `IDNguoiDung`, `NgayMua`, `TongTien`, `TrangThai`, `IDThanhToan`, `IDKhoaHoc`) VALUES
(1, 1, '2024-10-01', '150000.00', 'Đang xử lý', 1, 21);
INSERT INTO `DonHang` (`IDDonHang`, `IDNguoiDung`, `NgayMua`, `TongTien`, `TrangThai`, `IDThanhToan`, `IDKhoaHoc`) VALUES
(2, 1, '2024-10-02', '300000.00', 'Đã hoàn thành', 2, 22);
INSERT INTO `DonHang` (`IDDonHang`, `IDNguoiDung`, `NgayMua`, `TongTien`, `TrangThai`, `IDThanhToan`, `IDKhoaHoc`) VALUES
(11, 2, '2024-11-14', '500000.00', 'da_thanh_toan', 12, 50);
INSERT INTO `DonHang` (`IDDonHang`, `IDNguoiDung`, `NgayMua`, `TongTien`, `TrangThai`, `IDThanhToan`, `IDKhoaHoc`) VALUES
(12, 2, '2024-11-14', '500000.00', 'da_thanh_toan', 12, 51);

INSERT INTO `FollowAuthor` (`IDFollowAuthor`, `IDNguoiDung`, `IDNguoiDungGiangVien`, `NgayFollow`) VALUES
(1, 2, 4, '2024-10-14');
INSERT INTO `FollowAuthor` (`IDFollowAuthor`, `IDNguoiDung`, `IDNguoiDungGiangVien`, `NgayFollow`) VALUES
(2, 1, 4, '2024-10-15');






INSERT INTO `Hashtag` (`IDHashTag`, `HashTagName`, `IDKhoaHoc`) VALUES
(2, '#khoahocbanchay', 29);
INSERT INTO `Hashtag` (`IDHashTag`, `HashTagName`, `IDKhoaHoc`) VALUES
(3, '#khoahocnoibat', 28);
INSERT INTO `Hashtag` (`IDHashTag`, `HashTagName`, `IDKhoaHoc`) VALUES
(6, '#khoahocnoibat', 51);

INSERT INTO `KhoaHoc` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `NgayDang`, `LuotXem`, `SoLuongHocVien`, `GiamGia`, `LoaiKhoaHoc`, `GiaTien`, `IDHashTag`) VALUES
(21, 1, 1, 1, 'Khóa học Lập trình Java', 'Khóa học cơ bản đến nâng cao về lập trình Java.', 'java.jpg', '2024-10-01', 100, 50, '10.00', 'mien_phi', 150000, NULL);
INSERT INTO `KhoaHoc` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `NgayDang`, `LuotXem`, `SoLuongHocVien`, `GiamGia`, `LoaiKhoaHoc`, `GiaTien`, `IDHashTag`) VALUES
(22, 1, 2, 2, 'Khóa học Lập trình Python', 'Khóa học học lập trình Python từ cơ bản đến nâng cao.', 'python.jpg', '2024-10-02', 150, 60, '20.00', 'mien_phi', 200000, NULL);
INSERT INTO `KhoaHoc` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `NgayDang`, `LuotXem`, `SoLuongHocVien`, `GiamGia`, `LoaiKhoaHoc`, `GiaTien`, `IDHashTag`) VALUES
(23, 1, 3, 3, 'Phát triển Web với HTML, CSS và JavaScript', 'Khóa học giúp bạn xây dựng các trang web chuyên nghiệp.', 'web.jpg', '2024-10-03', 200, 70, '30.00', 'tra_phi', 300000, NULL);
INSERT INTO `KhoaHoc` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `NgayDang`, `LuotXem`, `SoLuongHocVien`, `GiamGia`, `LoaiKhoaHoc`, `GiaTien`, `IDHashTag`) VALUES
(24, 1, 2, 1, 'Khóa học Lập trình Python nâng cao', 'Khóa học học lập trình Python nâng cao.', 'python.jpg', '2024-10-02', 150, 60, '20.00', 'tra_phi', 150000, NULL),
(25, 1, 3, 1, 'Python trick', 'Khóa học giúp bạn có thêm những cách code ngắn gọn và nhanh hơn trong ngôn ngữ Python.', 'web.jpg', '2024-10-03', 200, 70, '30.00', 'mien_phi', 200000, NULL),
(26, 1, 1, 4, 'Khóa học Lập trình C#', 'Khóa học cơ bản lập trình C#.', 'java.jpg', '2024-10-01', 100, 50, '10.00', 'mien_phi', 350000, NULL),
(27, 1, 2, 5, 'Khóa học khoa học dữ liệu', 'Những kiến thức cơ bản về khoa học dữ liệu', 'python.jpg', '2024-10-02', 150, 60, '20.00', 'mien_phi', 400000, NULL),
(28, 4, 3, 6, 'Khóa học trí tuệ nhân tạo', 'Khóa học giúp bạn hiểu thêm về trí tuệ nhân tạo', 'link_hinh_anh_moi.jpg', '2024-10-03', 200, 70, '30.00', 'mien_phi', 1000000, NULL),
(29, 4, 2, 7, 'Khóa học Phát triển ứng dụng di động', 'Khóa học cơ bản Phát triển ứng dụng di động', 'python.jpg', '2024-10-02', 150, 60, '20.00', 'mien_phi', 500000, NULL),
(30, 4, 3, 8, 'Khóa học An ninh mạng', 'Hiểu thêm về an ninh mạng thông qua khóa học', 'web.jpg', '2024-10-03', 200, 70, '30.00', 'mien_phi', 900000, NULL),
(35, 4, NULL, 6, 'Khóa học java', 'Học java từ cơ bản đến nâng cao', 'https://link-to-image.com/hinhanh.jpg', '2024-10-27', 0, 0, NULL, 'tra_phi', 500000, NULL),
(36, 4, NULL, 3, 'Khóa Học nâng cao AI', 'Học AI nâng cao', 'https://link-to-image.com/hinhanh.jpg', '2024-10-30', 0, 0, NULL, 'tra_phi', 600000, NULL),
(50, 4, 1, 2, 'Lập trình JavaScript 3', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', '2024-11-06', 0, 0, NULL, 'tra_phi', 500000, NULL),
(51, 4, 1, 2, 'Lập trình JavaScript 4', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', '2024-11-06', 0, 0, NULL, 'tra_phi', 500000, 6);

INSERT INTO `KhoaHocChuaDuyet` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `NgayGuiKiemDuyet`, `TrangThai`) VALUES
(3, 4, 1, 10, 'Khóa Học nâng cao AI', 'Học AI nâng cao', 'https://link-to-image.com/hinhanh.jpg', 'tra_phi', 250000, '2024-10-30', 'chua_duyet');
INSERT INTO `KhoaHocChuaDuyet` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `NgayGuiKiemDuyet`, `TrangThai`) VALUES
(9, 4, 1, 2, 'Lập trình JavaScript 5', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', 'tra_phi', 500000, '2024-11-14', 'chua_duyet');
INSERT INTO `KhoaHocChuaDuyet` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `NgayGuiKiemDuyet`, `TrangThai`) VALUES
(10, 4, 1, 2, 'Lập trình JavaScript 6', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', 'tra_phi', 500000, '2024-11-14', 'chua_duyet');
INSERT INTO `KhoaHocChuaDuyet` (`IDKhoaHoc`, `IDNguoiDung`, `IDKhuyenMai`, `IDDanhMuc`, `TenKhoaHoc`, `MoTaKhoaHoc`, `HinhAnh`, `LoaiKhoaHoc`, `GiaTien`, `NgayGuiKiemDuyet`, `TrangThai`) VALUES
(30, 4, 1, 2, 'Lập trình JavaScript 9', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', 'tra_phi', 500000, '2024-11-14', 'chua_duyet'),
(31, 4, 1, 2, 'Lập trình JavaScript 10', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', 'tra_phi', 500000, '2024-11-14', 'chua_duyet'),
(32, 4, 1, 2, 'Lập trình JavaScript 10', 'Khóa học về JavaScript cơ bản và nâng cao', 'https://example.com/image.jpg', 'tra_phi', 500000, '2024-11-14', 'chua_duyet');

INSERT INTO `KhoaHocYeuThich` (`IDKhoaHocYeuThich`, `IDNguoiDung`, `IDKhoaHoc`) VALUES
(1, 1, 21);
INSERT INTO `KhoaHocYeuThich` (`IDKhoaHocYeuThich`, `IDNguoiDung`, `IDKhoaHoc`) VALUES
(2, 1, 22);
INSERT INTO `KhoaHocYeuThich` (`IDKhoaHocYeuThich`, `IDNguoiDung`, `IDKhoaHoc`) VALUES
(3, 1, 23);
INSERT INTO `KhoaHocYeuThich` (`IDKhoaHocYeuThich`, `IDNguoiDung`, `IDKhoaHoc`) VALUES
(4, 1, 24),
(5, 1, 25),
(6, 2, 26),
(7, 2, 27),
(8, 2, 28),
(9, 2, 29),
(10, 2, 30),
(11, 2, 21);

INSERT INTO `KhuyenMai` (`IDKhuyenMai`, `TenKhuyenMai`, `MoTaKhuyenMai`, `LoaiKhuyenMai`, `GiaTri`, `NgayBatDau`, `NgayKetThuc`) VALUES
(1, 'Khuyến mãi 10%', 'Giảm giá 10% cho khóa học lập trình', 'Giảm giá trực tiếp', '10.00', '2024-01-01', '2024-12-31');
INSERT INTO `KhuyenMai` (`IDKhuyenMai`, `TenKhuyenMai`, `MoTaKhuyenMai`, `LoaiKhuyenMai`, `GiaTri`, `NgayBatDau`, `NgayKetThuc`) VALUES
(2, 'Khuyến mãi 20%', 'Giảm giá 20% cho khóa học khoa học dữ liệu', 'Giảm giá trực tiếp', '20.00', '2024-01-01', '2024-12-31');
INSERT INTO `KhuyenMai` (`IDKhuyenMai`, `TenKhuyenMai`, `MoTaKhuyenMai`, `LoaiKhuyenMai`, `GiaTri`, `NgayBatDau`, `NgayKetThuc`) VALUES
(3, 'Khuyến mãi 30%', 'Giảm giá 30% cho khóa học trí tuệ nhân tạo', 'Giảm giá trực tiếp', '30.00', '2024-01-01', '2024-12-31');
INSERT INTO `KhuyenMai` (`IDKhuyenMai`, `TenKhuyenMai`, `MoTaKhuyenMai`, `LoaiKhuyenMai`, `GiaTri`, `NgayBatDau`, `NgayKetThuc`) VALUES
(4, 'Khuyến mãi 40%', 'Giảm giá 40% cho khóa học phát triển ứng dụng di động', 'Giảm giá trực tiếp', '40.00', '2024-01-01', '2024-12-31'),
(5, 'Khuyến mãi 50%', 'Giảm giá 50% cho khóa học máy học', 'Giảm giá trực tiếp', '50.00', '2024-01-01', '2024-12-31');

INSERT INTO `NguoiDung` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `GioiTinh`, `SDT`, `Role`, `AnhDaiDien`) VALUES
(1, 'khanhhungAdmin', '$2b$10$5YPdewSAwkHDcl6NMuohHeW73BiW7JuyGU1Aq9CG0IqU5ukV.MBV6', 'khanhhungAdmin@gmail.com', 'Khánh Hưng Admin', 'nam', '0942212265', 'admin', 'url.png');
INSERT INTO `NguoiDung` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `GioiTinh`, `SDT`, `Role`, `AnhDaiDien`) VALUES
(2, 'khanhhungUser', '$2b$10$W3/7wSzkyltMzfQaCExZaO7P9ZGS83xvSMkUxT8NRbpYVG63M5ToW', 'khanhhunguserdacn@gmail.com', 'Khánh Hưng User cập nhật 2', 'nam', '0942212265', 'hocvien', 'new-avatar-url2.jpg');
INSERT INTO `NguoiDung` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `GioiTinh`, `SDT`, `Role`, `AnhDaiDien`) VALUES
(3, 'khanhhungTest1', '$2b$10$lhSoQ.NW8ZowqY152epxAeWEatTgraIrUsWWtczGGYUOOLLF2rH7u', 'pjlatao999@gmail.com', 'Khánh Hưng Test 1', 'nam', '0942212265', 'giangvien', 'url.png');
INSERT INTO `NguoiDung` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `GioiTinh`, `SDT`, `Role`, `AnhDaiDien`) VALUES
(4, 'khanhhungTeacher', '$2b$10$igxGPRnAEVdWiX4igyaEx.UQFFKtz1jnJzOKRv1HowPbmhEVhGSTq', 'khanhhung.dacs@gmail.com', 'Khánh Hưng Teacher', 'nam', '0942212265', 'giangvien', 'url.png'),
(10, 'test', '$2b$10$tM3ZKkSvRA4SqIzhC2F.lefi00VhuuisdYeWVoS6d.Xp5jDOfOo/e', 'test@gmail.com', 'test', 'nam', '09422212222', 'hocvien', NULL);

INSERT INTO `NguoiDungChan` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `SDT`, `Role`, `GioiTinh`) VALUES
(2, 'khanhhungUser', '$2b$10$W3/7wSzkyltMzfQaCExZaO7P9ZGS83xvSMkUxT8NRbpYVG63M5ToW', 'khanhhunguserdacn@gmail.com', 'Khánh Hưng User cập nhật 2', '0942212265', 'ban', 'nam');
INSERT INTO `NguoiDungChan` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `SDT`, `Role`, `GioiTinh`) VALUES
(7, 'user123', '$2b$10$UZ402FowISrrNVQ/4OaChOQ29pjujoGXiEGcGZeSz2EJlcfHVlmvq', 'user@example.com', 'Nguyen Van A', '0123456789', 'ban', 'nam');
INSERT INTO `NguoiDungChan` (`IDNguoiDung`, `TenDangNhap`, `MatKhau`, `Email`, `HoTen`, `SDT`, `Role`, `GioiTinh`) VALUES
(9, 'giangvien1', '$2b$10$Js8kBvWQolZFF7QG89/LeOT4Py/BgwS04oS1JloGnuCoZ/KKLwrLG', 'giangvien1@example.com', 'Giang Vien 1', '0123456789', 'ban', 'nam');

INSERT INTO `NhanXet` (`IDNhanXet`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `XepLoai`, `ThoiGian`) VALUES
(1, 21, 1, 'Khóa học rất bổ ích, tôi đã học được nhiều kiến thức mới.', 'tích cực', '2024-10-08 09:48:14');
INSERT INTO `NhanXet` (`IDNhanXet`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `XepLoai`, `ThoiGian`) VALUES
(2, 21, 1, 'Giảng viên không nhiệt tình, cần cải thiện chất lượng giảng dạy.', 'tích cực', '2024-10-08 09:48:14');
INSERT INTO `NhanXet` (`IDNhanXet`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `XepLoai`, `ThoiGian`) VALUES
(3, 22, 2, 'Nội dung khóa học rất thực tế và dễ hiểu.', 'tích cực', '2024-10-08 09:48:14');
INSERT INTO `NhanXet` (`IDNhanXet`, `IDKhoaHoc`, `IDNguoiDung`, `NoiDung`, `XepLoai`, `ThoiGian`) VALUES
(4, 23, 2, 'Mong muốn có thêm bài tập thực hành để áp dụng kiến thức.', 'tích cực', '2024-10-08 09:48:14'),
(5, 24, 1, 'Khóa học không đạt yêu cầu, tôi cảm thấy không hài lòng.', 'tiêu cực', '2024-10-08 09:48:14'),
(6, 25, 1, 'Khóa học rất bổ ích, tôi đã học được nhiều kiến thức mới.', 'tích cực', '2024-10-08 09:48:14'),
(7, 26, 1, 'Giảng viên không nhiệt tình, cần cải thiện chất lượng giảng dạy.', 'tiêu cực', '2024-10-08 09:48:14'),
(8, 27, 2, 'Nội dung khóa học rất thực tế và dễ hiểu.', 'tích cực', '2024-10-08 09:48:14'),
(9, 28, 2, 'Mong muốn có thêm bài tập thực hành để áp dụng kiến thức.', 'tích cực', '2024-10-08 09:48:14'),
(10, 29, 1, 'Khóa học không đạt yêu cầu, tôi cảm thấy không hài lòng.', 'tiêu cực', '2024-10-08 09:48:14'),
(11, 30, 1, 'Khóa học rất bổ ích, tôi đã học được nhiều kiến thức mới.', 'tích cực', '2024-10-08 09:48:14'),
(12, 21, 1, 'Giảng viên không nhiệt tình, cần cải thiện chất lượng giảng dạy.', 'tích cực', '2024-10-08 09:48:14'),
(13, 30, 2, 'Nội dung khóa học rất thực tế và dễ hiểu.', 'tích cực', '2024-10-08 09:48:14'),
(14, 23, 2, 'Mong muốn có thêm bài tập thực hành để áp dụng kiến thức.', 'tích cực', '2024-10-08 09:48:14'),
(15, 24, 1, 'Khóa học hay, tôi cảm thấy hài lòng.', 'tích cực', '2024-10-08 09:48:14'),
(16, 26, 1, 'Khóa học rất bổ ích, tôi đã học được nhiều kiến thức mới.', 'tích cực', '2024-10-08 09:48:14'),
(17, 26, 1, 'Giảng viên nhiệt tình', 'tích cực', '2024-10-08 09:48:14'),
(18, 27, 2, 'Nội dung khóa học hơi sao nhãng', 'tiêu cực', '2024-10-08 09:48:14'),
(19, 28, 2, 'Hơi ít bài tập, mong muốn có thêm bài tập thực hành để áp dụng kiến thức.', 'tiêu cực', '2024-10-08 09:48:14'),
(20, 29, 1, 'Khóa học đạt yêu cầu, tôi cảm thấy hài lòng.', 'tích cực', '2024-10-08 09:48:14'),
(21, 21, 2, 'Khóa học rất hữu ích!', 'tích cực', '2024-10-08 12:34:56'),
(22, 21, 2, 'Khóa học rất dài dòng!', 'tiêu cực', '2024-10-08 12:34:56'),
(23, 22, 2, 'Khóa học rất dễ hiểu!', 'tích cực', '2024-10-08 12:34:56');

INSERT INTO `ReplyBinhLuan` (`IDRepLyBinhLuan`, `IDBinhLuan`, `IDNguoiDung`, `NoiDung`, `ThoiGian`, `IDKhoaHoc`) VALUES
(1, 14, 4, 'Đây là phản hồi của tôi', '2024-11-06 11:42:03', 23);


INSERT INTO `ThanhToan` (`IDThanhToan`, `NgayThanhToan`, `PhuongThucThanhToan`, `NoiDungThanhToan`, `TongTien`, `IDDonHang`, `IDNguoiDung`, `orderId`, `requestId`, `payUrl`, `shortLink`) VALUES
(1, '2024-10-01', 'Thẻ tín dụng', 'Thanh toán cho đơn hàng 1', '150000.00', 1, 1, NULL, NULL, NULL, NULL);
INSERT INTO `ThanhToan` (`IDThanhToan`, `NgayThanhToan`, `PhuongThucThanhToan`, `NoiDungThanhToan`, `TongTien`, `IDDonHang`, `IDNguoiDung`, `orderId`, `requestId`, `payUrl`, `shortLink`) VALUES
(2, '2024-10-02', 'Chuyển khoản', 'Thanh toán cho đơn hàng 2', '300000.00', 2, 1, NULL, NULL, NULL, NULL);
INSERT INTO `ThanhToan` (`IDThanhToan`, `NgayThanhToan`, `PhuongThucThanhToan`, `NoiDungThanhToan`, `TongTien`, `IDDonHang`, `IDNguoiDung`, `orderId`, `requestId`, `payUrl`, `shortLink`) VALUES
(3, '2024-11-12', 'credit_card', 'Thanh toán đơn hàng', '600000.00', NULL, 2, NULL, NULL, NULL, NULL);
INSERT INTO `ThanhToan` (`IDThanhToan`, `NgayThanhToan`, `PhuongThucThanhToan`, `NoiDungThanhToan`, `TongTien`, `IDDonHang`, `IDNguoiDung`, `orderId`, `requestId`, `payUrl`, `shortLink`) VALUES
(7, '2024-11-12', 'Chuyển khoản', 'Thanh toán cho đơn hàng số 123', '1600000.00', NULL, 2, NULL, NULL, NULL, NULL),
(8, '2024-11-12', 'credit_card', 'Thanh toán đơn hàng', '1600000.00', NULL, 2, NULL, NULL, NULL, NULL),
(10, '2024-11-14', 'credit_card', 'Thanh toán đơn hàng', '1000000.00', NULL, 2, NULL, NULL, NULL, NULL),
(11, '2024-11-14', 'credit_card', 'Thanh toán đơn hàng', '1000000.00', NULL, 2, NULL, NULL, NULL, NULL),
(12, '2024-11-14', 'credit_card', 'Thanh toán đơn hàng', '1000000.00', NULL, 2, NULL, NULL, NULL, NULL);

INSERT INTO `ThanhToan_DonHang` (`IDThanhToan`, `IDDonHang`) VALUES
(11, 11);
INSERT INTO `ThanhToan_DonHang` (`IDThanhToan`, `IDDonHang`) VALUES
(12, 11);
INSERT INTO `ThanhToan_DonHang` (`IDThanhToan`, `IDDonHang`) VALUES
(11, 12);
INSERT INTO `ThanhToan_DonHang` (`IDThanhToan`, `IDDonHang`) VALUES
(12, 12);





INSERT INTO `Video` (`IDVideo`, `IDKhoaHoc`, `TenVideo`, `MoTaVideo`, `LinkVideo`, `NgayDang`) VALUES
(1, 51, 'backend 1', NULL, 'https://youtube.com/your-video-link', '2024-11-14 04:44:32');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;