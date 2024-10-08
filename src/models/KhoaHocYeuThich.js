import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KhoaHocYeuThich extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDKhoaHocYeuThich: {
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
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    }
  }, {
    sequelize,
    tableName: 'KhoaHocYeuThich',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDKhoaHocYeuThich" },
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
        name: "IDKhoaHoc",
        using: "BTREE",
        fields: [
          { name: "IDKhoaHoc" },
        ]
      },
    ]
  });
  }
}
