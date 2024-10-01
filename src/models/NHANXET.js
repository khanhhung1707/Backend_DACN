import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class NHANXET extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_nhan_xet: {
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
    xep_hang: {
      type: DataTypes.ENUM('tích cực','tiêu cực'),
      allowNull: true
    },
    ngay_nhan_xet: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'NHANXET',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_nhan_xet" },
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
