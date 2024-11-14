import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Video extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    IDVideo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IDKhoaHoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KhoaHoc',
        key: 'IDKhoaHoc'
      }
    },
    TenVideo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MoTaVideo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    LinkVideo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    NgayDang: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Video',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IDVideo" },
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
