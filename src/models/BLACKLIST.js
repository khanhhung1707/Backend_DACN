import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BLACKLIST extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_blacklist: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_khoa_hoc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'KHOAHOC',
        key: 'ma_khoa_hoc'
      }
    },
    ly_do: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BLACKLIST',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_blacklist" },
        ]
      },
      {
        name: "ma_khoa_hoc",
        using: "BTREE",
        fields: [
          { name: "ma_khoa_hoc" },
        ]
      },
    ]
  });
  }
}
