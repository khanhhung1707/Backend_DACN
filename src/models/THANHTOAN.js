import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class THANHTOAN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_thanh_toan: {
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
    so_tien: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    ngay_thanh_toan: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'THANHTOAN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_thanh_toan" },
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
