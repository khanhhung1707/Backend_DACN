import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class GIANGVIEN extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_giang_vien: {
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
    trang_thai: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    role: {
      type: DataTypes.ENUM('giang_vien'),
      allowNull: true,
      defaultValue: "giang_vien"
    }
  }, {
    sequelize,
    tableName: 'GIANGVIEN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_giang_vien" },
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
