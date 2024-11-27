import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KhoaHoc extends Model {
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
      allowNull: true,
      references: {
        model: 'KhuyenMai',
        key: 'IDKhuyenMai'
      }
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
    NgayDang: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    LuotXem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    SoLuongHocVien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    GiamGia: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    LoaiKhoaHoc: {
      type: DataTypes.ENUM('tra_phi','mien_phi'),
      allowNull: false,
      defaultValue: "mien_phi"
    },
    GiaTien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IDHashTag: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Hashtag',
        key: 'IDHashTag'
      }
    },
    LinkVideo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KhoaHoc',
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
      {
        name: "IDKhuyenMai",
        using: "BTREE",
        fields: [
          { name: "IDKhuyenMai" },
        ]
      },
      {
        name: "IDHashTag",
        using: "BTREE",
        fields: [
          { name: "IDHashTag" },
        ]
      },
    ]
  });
  }
}
