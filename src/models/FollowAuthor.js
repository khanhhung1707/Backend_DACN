import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class FollowAuthor extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDFollowAuthor: {
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
    IDNguoiDungGiangVien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    NgayFollow: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'FollowAuthor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDFollowAuthor" },
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
        name: "IDNguoiDungGiangVien",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDungGiangVien" },
        ]
      },
    ]
  });
  }
}
