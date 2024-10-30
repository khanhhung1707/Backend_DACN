import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BlackList extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDBlackList: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'NguoiDung',
        key: 'IDNguoiDung'
      }
    },
    IDKhuyenMai: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    IDDanhMuc: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TenKhoaHoc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    MoTaKhoaHoc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LyDo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "không phù hợp"
    },
    NgayThemVaoBlackList: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    HinhAnh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LoaiKhoaHoc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    GiaTien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GiamGia: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BlackList',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDBlackList" },
        ]
      },
      {
        name: "IDNguoiDungAdmin",
        using: "BTREE",
        fields: [
          { name: "IDNguoiDung" },
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
