import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class HOCVIEN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_hoc_vien: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email"
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ngay_dang_ky: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    trang_thai: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    role: {
      type: DataTypes.ENUM('hoc_vien'),
      allowNull: true,
      defaultValue: "hoc_vien"
    }
  }, {
    sequelize,
    tableName: 'HOCVIEN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_hoc_vien" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
