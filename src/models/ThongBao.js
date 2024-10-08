import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ThongBao extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDThongBao: {
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
    NoiDungThongBao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    NgayThongBao: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ThongBao',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDThongBao" },
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
