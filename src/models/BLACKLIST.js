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
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    },
    LyDo: {
      type: DataTypes.TEXT,
      allowNull: true
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
