import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ReplyBinhLuan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDRepLyBinhLuan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDBinhLuan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'BinhLuan',
        key: 'IDBinhLuan'
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
    NoiDung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'ReplyBinhLuan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDRepLyBinhLuan" },
        ]
      },
      {
        name: "IDBinhLuan",
        using: "BTREE",
        fields: [
          { name: "IDBinhLuan" },
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
