import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DangKyKhoaHoc extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDDangKyKhoaHoc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
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
    ngayDangKy: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    RoomId: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DangKyKhoaHoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDDangKyKhoaHoc" },
        ]
      },
      {
        name: "IDKhoaHoc",
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
    ]
  });
  }
}
