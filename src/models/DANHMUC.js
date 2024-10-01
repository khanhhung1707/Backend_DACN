import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DANHMUC extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_danh_muc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_danh_muc: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'DANHMUC',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_danh_muc" },
        ]
      },
    ]
  });
  }
}
