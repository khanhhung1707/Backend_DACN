import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _BinhLuan from  "./BinhLuan.js";
import _BlackList from  "./BlackList.js";
import _DangKyKhoaHoc from  "./DangKyKhoaHoc.js";
import _DanhMucKhoaHoc from  "./DanhMucKhoaHoc.js";
import _DonHang from  "./DonHang.js";
import _FollowAuthor from  "./FollowAuthor.js";
import _GhiDanh from  "./GhiDanh.js";
import _GioHang from  "./GioHang.js";
import _Hashtag from  "./Hashtag.js";
import _KhoaHoc from  "./KhoaHoc.js";
import _KhoaHocChuaDuyet from  "./KhoaHocChuaDuyet.js";
import _KhoaHocYeuThich from  "./KhoaHocYeuThich.js";
import _KhuyenMai from  "./KhuyenMai.js";
import _NguoiDung from  "./NguoiDung.js";
import _NhanXet from  "./NhanXet.js";
import _ThanhToan from  "./ThanhToan.js";
import _ThongBao from  "./ThongBao.js";
import _TracNghiem from  "./TracNghiem.js";

export default function initModels(sequelize) {
  const BinhLuan = _BinhLuan.init(sequelize, DataTypes);
  const BlackList = _BlackList.init(sequelize, DataTypes);
  const DangKyKhoaHoc = _DangKyKhoaHoc.init(sequelize, DataTypes);
  const DanhMucKhoaHoc = _DanhMucKhoaHoc.init(sequelize, DataTypes);
  const DonHang = _DonHang.init(sequelize, DataTypes);
  const FollowAuthor = _FollowAuthor.init(sequelize, DataTypes);
  const GhiDanh = _GhiDanh.init(sequelize, DataTypes);
  const GioHang = _GioHang.init(sequelize, DataTypes);
  const Hashtag = _Hashtag.init(sequelize, DataTypes);
  const KhoaHoc = _KhoaHoc.init(sequelize, DataTypes);
  const KhoaHocChuaDuyet = _KhoaHocChuaDuyet.init(sequelize, DataTypes);
  const KhoaHocYeuThich = _KhoaHocYeuThich.init(sequelize, DataTypes);
  const KhuyenMai = _KhuyenMai.init(sequelize, DataTypes);
  const NguoiDung = _NguoiDung.init(sequelize, DataTypes);
  const NhanXet = _NhanXet.init(sequelize, DataTypes);
  const ThanhToan = _ThanhToan.init(sequelize, DataTypes);
  const ThongBao = _ThongBao.init(sequelize, DataTypes);
  const TracNghiem = _TracNghiem.init(sequelize, DataTypes);

  KhoaHoc.belongsTo(DanhMucKhoaHoc, { as: "IDDanhMuc_DanhMucKhoaHoc", foreignKey: "IDDanhMuc"});
  DanhMucKhoaHoc.hasMany(KhoaHoc, { as: "KhoaHocs", foreignKey: "IDDanhMuc"});
  KhoaHocChuaDuyet.belongsTo(DanhMucKhoaHoc, { as: "IDDanhMuc_DanhMucKhoaHoc", foreignKey: "IDDanhMuc"});
  DanhMucKhoaHoc.hasMany(KhoaHocChuaDuyet, { as: "KhoaHocChuaDuyets", foreignKey: "IDDanhMuc"});
  ThanhToan.belongsTo(DonHang, { as: "IDDonHang_DonHang", foreignKey: "IDDonHang"});
  DonHang.hasMany(ThanhToan, { as: "ThanhToans", foreignKey: "IDDonHang"});
  BinhLuan.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "IDKhoaHoc"});
  BlackList.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(BlackList, { as: "BlackLists", foreignKey: "IDKhoaHoc"});
  DangKyKhoaHoc.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(DangKyKhoaHoc, { as: "DangKyKhoaHocs", foreignKey: "IDKhoaHoc"});
  DonHang.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(DonHang, { as: "DonHangs", foreignKey: "IDKhoaHoc"});
  GhiDanh.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(GhiDanh, { as: "GhiDanhs", foreignKey: "IDKhoaHoc"});
  GioHang.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(GioHang, { as: "GioHangs", foreignKey: "IDKhoaHoc"});
  Hashtag.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(Hashtag, { as: "Hashtags", foreignKey: "IDKhoaHoc"});
  KhoaHocYeuThich.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(KhoaHocYeuThich, { as: "KhoaHocYeuThiches", foreignKey: "IDKhoaHoc"});
  NhanXet.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(NhanXet, { as: "NhanXets", foreignKey: "IDKhoaHoc"});
  TracNghiem.belongsTo(KhoaHoc, { as: "IDKhoaHoc_KhoaHoc", foreignKey: "IDKhoaHoc"});
  KhoaHoc.hasMany(TracNghiem, { as: "TracNghiems", foreignKey: "IDKhoaHoc"});
  KhoaHoc.belongsTo(KhuyenMai, { as: "IDKhuyenMai_KhuyenMai", foreignKey: "IDKhuyenMai"});
  KhuyenMai.hasMany(KhoaHoc, { as: "KhoaHocs", foreignKey: "IDKhuyenMai"});
  BinhLuan.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "IDNguoiDung"});
  BlackList.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(BlackList, { as: "BlackLists", foreignKey: "IDNguoiDung"});
  DangKyKhoaHoc.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(DangKyKhoaHoc, { as: "DangKyKhoaHocs", foreignKey: "IDNguoiDung"});
  DonHang.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(DonHang, { as: "DonHangs", foreignKey: "IDNguoiDung"});
  FollowAuthor.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(FollowAuthor, { as: "FollowAuthors", foreignKey: "IDNguoiDung"});
  FollowAuthor.belongsTo(NguoiDung, { as: "IDNguoiDungGiangVien_NguoiDung", foreignKey: "IDNguoiDungGiangVien"});
  NguoiDung.hasMany(FollowAuthor, { as: "IDNguoiDungGiangVien_FollowAuthors", foreignKey: "IDNguoiDungGiangVien"});
  GhiDanh.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(GhiDanh, { as: "GhiDanhs", foreignKey: "IDNguoiDung"});
  GioHang.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(GioHang, { as: "GioHangs", foreignKey: "IDNguoiDung"});
  KhoaHoc.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(KhoaHoc, { as: "KhoaHocs", foreignKey: "IDNguoiDung"});
  KhoaHocChuaDuyet.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(KhoaHocChuaDuyet, { as: "KhoaHocChuaDuyets", foreignKey: "IDNguoiDung"});
  KhoaHocYeuThich.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(KhoaHocYeuThich, { as: "KhoaHocYeuThiches", foreignKey: "IDNguoiDung"});
  NhanXet.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(NhanXet, { as: "NhanXets", foreignKey: "IDNguoiDung"});
  ThongBao.belongsTo(NguoiDung, { as: "IDNguoiDung_NguoiDung", foreignKey: "IDNguoiDung"});
  NguoiDung.hasMany(ThongBao, { as: "ThongBaos", foreignKey: "IDNguoiDung"});
  DonHang.belongsTo(ThanhToan, { as: "IDThanhToan_ThanhToan", foreignKey: "IDThanhToan"});
  ThanhToan.hasMany(DonHang, { as: "DonHangs", foreignKey: "IDThanhToan"});

  return {
    BinhLuan,
    BlackList,
    DangKyKhoaHoc,
    DanhMucKhoaHoc,
    DonHang,
    FollowAuthor,
    GhiDanh,
    GioHang,
    Hashtag,
    KhoaHoc,
    KhoaHocChuaDuyet,
    KhoaHocYeuThich,
    KhuyenMai,
    NguoiDung,
    NhanXet,
    ThanhToan,
    ThongBao,
    TracNghiem,
  };
}
