import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DanhMucKhoaHoc extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDDanhMuc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenDanhMuc: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DanhMucKhoaHoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDDanhMuc" },
        ]
      },
    ]
  });
  }
}
