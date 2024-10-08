import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DonHang extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDDonHang: {
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
    NgayMua: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TongTien: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    IDThanhToan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ThanhToan',
        key: 'IDThanhToan'
      }
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    }
  }, {
    sequelize,
    tableName: 'DonHang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDDonHang" },
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
        name: "FK_DonHang_ThanhToan",
        using: "BTREE",
        fields: [
          { name: "IDThanhToan" },
        ]
      },
      {
        name: "FK_DonHang_KhoaHoc",
        using: "BTREE",
        fields: [
          { name: "IDKhoaHoc" },
        ]
      },
    ]
  });
  }
}
