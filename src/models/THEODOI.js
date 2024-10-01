import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class THEODOI extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_theo_doi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_hoc_vien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HOCVIEN',
        key: 'ma_hoc_vien'
      }
    },
    ma_giang_vien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GIANGVIEN',
        key: 'ma_giang_vien'
      }
    }
  }, {
    sequelize,
    tableName: 'THEODOI',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_theo_doi" },
        ]
      },
      {
        name: "ma_hoc_vien",
        using: "BTREE",
        fields: [
          { name: "ma_hoc_vien" },
        ]
      },
      {
        name: "ma_giang_vien",
        using: "BTREE",
        fields: [
          { name: "ma_giang_vien" },
        ]
      },
    ]
  });
  }
}
