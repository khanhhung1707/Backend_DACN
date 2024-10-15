import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class NguoiDung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDNguoiDung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenDangNhap: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MatKhau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    HoTen: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    GioiTinh: {
      type: DataTypes.ENUM('nam','nu'),
      allowNull: false
    },
    SDT: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Role: {
      type: DataTypes.ENUM('hocvien','giangvien','admin'),
      allowNull: false
    },
    AnhDaiDien: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'NguoiDung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDNguoiDung" },
        ]
      },
    ]
  });
  }
}
