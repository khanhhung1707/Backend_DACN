import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class GIOHANG extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_gio_hang: {
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
    ma_khoa_hoc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'KHOAHOC',
        key: 'ma_khoa_hoc'
      }
    },
    so_luong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'GIOHANG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_gio_hang" },
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
