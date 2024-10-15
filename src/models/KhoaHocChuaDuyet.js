import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KhoaHocChuaDuyet extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDKhoaHoc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    IDKhuyenMai: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IDDanhMuc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DanhMucKhoaHoc',
        key: 'IDDanhMuc'
      }
    },
    TenKhoaHoc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MoTaKhoaHoc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    HinhAnh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LoaiKhoaHoc: {
      type: DataTypes.ENUM('mien_phi','tra_phi'),
      allowNull: false
    },
    GiaTien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NgayGuiKiemDuyet: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TrangThai: {
      type: DataTypes.ENUM('chua_duyet','da_duyet'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'KhoaHocChuaDuyet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDKhoaHoc" },
        ]
      },
      {
        name: "IDNguoiDung",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDung" },
        ]
      },
      {
        name: "IDDanhMuc",
        using: "BTREE",
        fields: [
          { name: "IDDanhMuc" },
        ]
      },
    ]
  });
  }
}
