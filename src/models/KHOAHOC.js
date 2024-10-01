import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KHOAHOC extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_khoa_hoc: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_khoa_hoc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ma_giang_vien: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GIANGVIEN',
        key: 'ma_giang_vien'
      }
    },
    ma_danh_muc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DANHMUC',
        key: 'ma_danh_muc'
      }
    },
    gia: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    loai_khoa_hoc: {
      type: DataTypes.ENUM('miễn phí','trả phí'),
      allowNull: true,
      defaultValue: "trả phí"
    },
    trang_thai: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'KHOAHOC',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_khoa_hoc" },
        ]
      },
      {
        name: "ma_giang_vien",
        using: "BTREE",
        fields: [
          { name: "ma_giang_vien" },
        ]
      },
      {
        name: "ma_danh_muc",
        using: "BTREE",
        fields: [
          { name: "ma_danh_muc" },
        ]
      },
    ]
  });
  }
}
