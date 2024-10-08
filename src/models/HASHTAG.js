import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Hashtag extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDHashTag: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    HashTagName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    }
  }, {
    sequelize,
    tableName: 'Hashtag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDHashTag" },
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
