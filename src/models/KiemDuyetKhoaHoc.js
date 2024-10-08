import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class KiemDuyetKhoaHoc extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDKiemDuyet: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDNguoiDungAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    },
    TrangThai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NgayGuiKiemDuyet: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NgayDuyet: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KiemDuyetKhoaHoc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDKiemDuyet" },
        ]
      },
      {
        name: "IDNguoiDungAdmin",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDungAdmin" },
        ]
      },
      {
        name: "IDKhoaHoc",
        using: "BTREE",
        fields: [
          { name: "IDKhoaHoc" },
        ]
      },
    ]
  });
  }
}
