import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ThanhToan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDThanhToan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NgayThanhToan: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    PhuongThucThanhToan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NoiDungThanhToan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    TongTien: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IDDonHang: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DonHang',
        key: 'IDDonHang'
      }
    },
    IDNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    requestId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shortLink: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ThanhToan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDThanhToan" },
        ]
      },
      {
        name: "FK_ThanhToan_DonHang",
        using: "BTREE",
        fields: [
          { name: "IDDonHang" },
        ]
      },
      {
        name: "FK_ThanhToan_NguoiDung",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDung" },
        ]
      },
    ]
  });
  }
}
