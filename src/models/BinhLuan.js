import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BinhLuan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDBinhLuan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    },
    IDNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    NoiDung: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'BinhLuan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDBinhLuan" },
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
