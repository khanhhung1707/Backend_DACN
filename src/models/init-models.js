import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _ADMIN from  "./ADMIN.js";
import _BINHLUAN from  "./BINHLUAN.js";
import _BLACKLIST from  "./BLACKLIST.js";
import _DANHMUC from  "./DANHMUC.js";
import _GIANGVIEN from  "./GIANGVIEN.js";
import _GIOHANG from  "./GIOHANG.js";
import _HASHTAG from  "./HASHTAG.js";
import _HOCVIEN from  "./HOCVIEN.js";
import _KHOAHOC from  "./KHOAHOC.js";
import _NHANXET from  "./NHANXET.js";
import _THANHTOAN from  "./THANHTOAN.js";
import _THEODOI from  "./THEODOI.js";

export default function initModels(sequelize) {
  const ADMIN = _ADMIN.init(sequelize, DataTypes);
  const BINHLUAN = _BINHLUAN.init(sequelize, DataTypes);
  const BLACKLIST = _BLACKLIST.init(sequelize, DataTypes);
  const DANHMUC = _DANHMUC.init(sequelize, DataTypes);
  const GIANGVIEN = _GIANGVIEN.init(sequelize, DataTypes);
  const GIOHANG = _GIOHANG.init(sequelize, DataTypes);
  const HASHTAG = _HASHTAG.init(sequelize, DataTypes);
  const HOCVIEN = _HOCVIEN.init(sequelize, DataTypes);
  const KHOAHOC = _KHOAHOC.init(sequelize, DataTypes);
  const NHANXET = _NHANXET.init(sequelize, DataTypes);
  const THANHTOAN = _THANHTOAN.init(sequelize, DataTypes);
  const THEODOI = _THEODOI.init(sequelize, DataTypes);

  KHOAHOC.belongsTo(DANHMUC, { as: "ma_danh_muc_DANHMUC", foreignKey: "ma_danh_muc"});
  DANHMUC.hasMany(KHOAHOC, { as: "KHOAHOCs", foreignKey: "ma_danh_muc"});
  KHOAHOC.belongsTo(GIANGVIEN, { as: "ma_giang_vien_GIANGVIEN", foreignKey: "ma_giang_vien"});
  GIANGVIEN.hasMany(KHOAHOC, { as: "KHOAHOCs", foreignKey: "ma_giang_vien"});
  THEODOI.belongsTo(GIANGVIEN, { as: "ma_giang_vien_GIANGVIEN", foreignKey: "ma_giang_vien"});
  GIANGVIEN.hasMany(THEODOI, { as: "THEODOIs", foreignKey: "ma_giang_vien"});
  BINHLUAN.belongsTo(HOCVIEN, { as: "ma_hoc_vien_HOCVIEN", foreignKey: "ma_hoc_vien"});
  HOCVIEN.hasMany(BINHLUAN, { as: "BINHLUANs", foreignKey: "ma_hoc_vien"});
  GIOHANG.belongsTo(HOCVIEN, { as: "ma_hoc_vien_HOCVIEN", foreignKey: "ma_hoc_vien"});
  HOCVIEN.hasMany(GIOHANG, { as: "GIOHANGs", foreignKey: "ma_hoc_vien"});
  NHANXET.belongsTo(HOCVIEN, { as: "ma_hoc_vien_HOCVIEN", foreignKey: "ma_hoc_vien"});
  HOCVIEN.hasMany(NHANXET, { as: "NHANXETs", foreignKey: "ma_hoc_vien"});
  THANHTOAN.belongsTo(HOCVIEN, { as: "ma_hoc_vien_HOCVIEN", foreignKey: "ma_hoc_vien"});
  HOCVIEN.hasMany(THANHTOAN, { as: "THANHTOANs", foreignKey: "ma_hoc_vien"});
  THEODOI.belongsTo(HOCVIEN, { as: "ma_hoc_vien_HOCVIEN", foreignKey: "ma_hoc_vien"});
  HOCVIEN.hasMany(THEODOI, { as: "THEODOIs", foreignKey: "ma_hoc_vien"});
  BINHLUAN.belongsTo(KHOAHOC, { as: "ma_khoa_hoc_KHOAHOC", foreignKey: "ma_khoa_hoc"});
  KHOAHOC.hasMany(BINHLUAN, { as: "BINHLUANs", foreignKey: "ma_khoa_hoc"});
  BLACKLIST.belongsTo(KHOAHOC, { as: "ma_khoa_hoc_KHOAHOC", foreignKey: "ma_khoa_hoc"});
  KHOAHOC.hasMany(BLACKLIST, { as: "BLACKLISTs", foreignKey: "ma_khoa_hoc"});
  GIOHANG.belongsTo(KHOAHOC, { as: "ma_khoa_hoc_KHOAHOC", foreignKey: "ma_khoa_hoc"});
  KHOAHOC.hasMany(GIOHANG, { as: "GIOHANGs", foreignKey: "ma_khoa_hoc"});
  NHANXET.belongsTo(KHOAHOC, { as: "ma_khoa_hoc_KHOAHOC", foreignKey: "ma_khoa_hoc"});
  KHOAHOC.hasMany(NHANXET, { as: "NHANXETs", foreignKey: "ma_khoa_hoc"});
  THANHTOAN.belongsTo(KHOAHOC, { as: "ma_khoa_hoc_KHOAHOC", foreignKey: "ma_khoa_hoc"});
  KHOAHOC.hasMany(THANHTOAN, { as: "THANHTOANs", foreignKey: "ma_khoa_hoc"});

  return {
    ADMIN,
    BINHLUAN,
    BLACKLIST,
    DANHMUC,
    GIANGVIEN,
    GIOHANG,
    HASHTAG,
    HOCVIEN,
    KHOAHOC,
    NHANXET,
    THANHTOAN,
    THEODOI,
  };
}
