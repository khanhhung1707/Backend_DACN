import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BINHLUAN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_binh_luan: {
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
    ma_hoc_vien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HOCVIEN',
        key: 'ma_hoc_vien'
      }
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ngay_binh_luan: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'BINHLUAN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_binh_luan" },
        ]
      },
      {
        name: "ma_khoa_hoc",
        using: "BTREE",
        fields: [
          { name: "ma_khoa_hoc" },
        ]
      },
      {
        name: "ma_hoc_vien",
        using: "BTREE",
        fields: [
          { name: "ma_hoc_vien" },
        ]
      },
    ]
  });
  }
}
