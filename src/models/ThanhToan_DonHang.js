import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ThanhToan_DonHang extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDThanhToan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ThanhToan',
        key: 'IDThanhToan'
      }
    },
    IDDonHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DonHang',
        key: 'IDDonHang'
      }
    }
  }, {
    sequelize,
    tableName: 'ThanhToan_DonHang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDThanhToan" },
          { name: "IDDonHang" },
        ]
      },
      {
        name: "IDDonHang",
        using: "BTREE",
        fields: [
          { name: "IDDonHang" },
        ]
      },
    ]
  });
  }
}
