import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KhuyenMai extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDKhuyenMai: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenKhuyenMai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MoTaKhuyenMai: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LoaiKhuyenMai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    GiaTri: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true
    },
    NgayBatDau: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NgayKetThuc: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KhuyenMai',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDKhuyenMai" },
        ]
      },
    ]
  });
  }
}
